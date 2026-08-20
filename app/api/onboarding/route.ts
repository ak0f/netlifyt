import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Nimmt die Anfrage aus dem Konfigurator entgegen und reicht sie ans
 * Dashboard weiter, das daraus einen Lead anlegt
 * (slide-dashboard, app/api/public/onboarding/route.ts).
 *
 * Warum der Umweg über den eigenen Server statt eines Direktaufrufs aus dem
 * Browser:
 *   - Der geteilte Schlüssel bleibt auf dem Server. Im Browser wäre er
 *     öffentlich und damit wertlos.
 *   - Die CSP in netlify.toml behält `connect-src 'self'`.
 *   - Das Dashboard braucht kein CORS und keinen offenen Schreib-Endpunkt.
 *
 * Diese Seite speichert selbst nichts. Ohne Dashboard gibt es keinen Lead,
 * deshalb meldet die Route einen Fehler zurück statt still "ok" zu sagen: der
 * Besucher sieht dann den Hinweis auf info@slideagentur.ch und schreibt
 * direkt, statt auf eine Antwort zu warten, die nie kommt.
 */

const TARGET =
  process.env.DASHBOARD_ONBOARDING_URL ?? 'https://dashboard.slideagentur.ch/api/public/onboarding'
const TIMEOUT_MS = 10_000

/** Besucher-IP für das Rate-Limit drüben. Für das Dashboard kämen sonst alle Anfragen von Netlify. */
function visitorIp(req: NextRequest): string {
  const netlify = req.headers.get('x-nf-client-connection-ip')
  if (netlify) return netlify
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }
  return req.headers.get('x-real-ip') ?? ''
}

export async function POST(req: NextRequest) {
  const key = process.env.ONBOARDING_API_KEY
  if (!key) {
    console.error('[onboarding] ONBOARDING_API_KEY fehlt, Anfrage nicht weitergeleitet')
    return NextResponse.json({ ok: false }, { status: 503 })
  }

  let payload: unknown
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(TARGET, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Onboarding-Key': key,
        'X-Visitor-Ip': visitorIp(req),
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
      signal: controller.signal,
    })

    // Validierungs- und Limit-Meldungen kommen mit ihrem Text durch, damit der
    // Besucher erfährt, woran es liegt. Alles andere bleibt hier: interne
    // Fehlermeldungen des Dashboards gehören nicht auf die Website.
    if (res.status === 400 || res.status === 429) {
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      return NextResponse.json({ ok: false, error: data.error }, { status: res.status })
    }
    if (!res.ok) {
      console.error(`[onboarding] Dashboard antwortete mit ${res.status}`)
      return NextResponse.json({ ok: false }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[onboarding] Weiterleitung fehlgeschlagen:', (e as Error).message)
    return NextResponse.json({ ok: false }, { status: 502 })
  } finally {
    clearTimeout(timer)
  }
}
