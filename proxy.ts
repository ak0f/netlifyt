import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Website-seitiger Teil des Not-Aus-Schalters im slide-dashboard-Projekt
 * (lib/systemStatus.ts dort, docs/TODO.md). Diese Seite hat keine eigene DB
 * und kein gemeinsames Deployment mit dem Dashboard, deshalb pollt Proxy
 * hier dessen öffentlichen Status-Endpunkt.
 *
 * Fail-open bei Fetch-Fehlern/Timeout (Dashboard nicht erreichbar) — eine
 * Störung dort darf nicht zusätzlich auch noch die Website lahmlegen. Kurzer
 * In-Memory-Cache (5s, wie drüben), damit nicht jeder Seitenaufruf einen
 * Live-Request ans Dashboard auslöst.
 *
 * Das Sperrbild wird **nicht** hier serverseitig geholt und eingebettet —
 * das lief anfangs über einen serverseitigen Fetch + Base64-data:-URI, war
 * aber mit dem knappen Timeout für den (deutlich grösseren) Bild-Download
 * unzuverlässig (Netlify-Function-Kaltstart) und fiel dann still auf reinen
 * Text zurück. Stattdessen lädt der Browser das Bild ganz normal per
 * <img src="https://dashboard...">, dafür ist die dashboard-Domain gezielt
 * in der CSP freigegeben (netlify.toml, img-src).
 */

const STATUS_URL =
  process.env.DASHBOARD_STATUS_URL ?? "https://dashboard.slideagentur.ch/api/downmode-status";
const CACHE_TTL_MS = 5_000;
const FETCH_TIMEOUT_MS = 3_000;

type DownStatus = { down: boolean; imageUrl: string | null };

const g = globalThis as unknown as { slideDownStatusCache?: { status: DownStatus; loadedAt: number } };

async function loadStatus(): Promise<DownStatus> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(STATUS_URL, { signal: controller.signal, cache: "no-store" });
  } finally {
    clearTimeout(timer);
  }
  if (!res.ok) throw new Error(`Status-Endpunkt antwortete mit ${res.status}`);
  const data = (await res.json()) as { down?: boolean; imageUrl?: string | null };

  // Nur https-URLs von der eigenen Dashboard-Domain übernehmen — die CSP
  // erlaubt ohnehin nur diese eine Quelle, das ist nur eine zweite Sicherung.
  const imageUrl =
    data.down && typeof data.imageUrl === "string" && data.imageUrl.startsWith("https://dashboard.slideagentur.ch/")
      ? data.imageUrl
      : null;

  const status: DownStatus = { down: Boolean(data.down), imageUrl };
  g.slideDownStatusCache = { status, loadedAt: Date.now() };
  return status;
}

async function getStatus(): Promise<DownStatus> {
  const cache = g.slideDownStatusCache;
  if (cache && Date.now() - cache.loadedAt < CACHE_TTL_MS) return cache.status;
  return loadStatus().catch(() => cache?.status ?? { down: false, imageUrl: null });
}

function lockdownHtml(imageUrl: string | null): string {
  // Ist ein Bild gesetzt, spricht es für sich — kein Text-Overlay darüber
  // (der lag vorher sichtbar über dem Bild). Der Text ist nur der Fallback,
  // wenn (noch) kein Bild hochgeladen ist.
  const body = imageUrl
    ? `<img class="bg" src="${imageUrl}" alt=""/>`
    : `<div class="content"><p>SLIDE ist vorübergehend nicht erreichbar. Bitte versuchen Sie es später erneut.</p></div>`;
  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta name="robots" content="noindex, nofollow"/>
<title>SLIDE — vorübergehend nicht erreichbar</title>
<style>
html,body{margin:0;height:100%;background:#0a0a0a;}
.bg{position:fixed;inset:0;width:100%;height:100%;object-fit:cover;}
.content{position:relative;min-height:100%;display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif;color:#fff;text-align:center;padding:24px;box-sizing:border-box;}
p{max-width:480px;font-size:15px;font-weight:300;opacity:.85;line-height:1.5;}
</style>
</head>
<body>
${body}
</body>
</html>`;
}

export async function proxy(request: NextRequest) {
  const status = await getStatus();
  if (status.down) {
    return new NextResponse(lockdownHtml(status.imageUrl), {
      status: 503,
      headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
