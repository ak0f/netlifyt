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
 * Wenn "down": das Bild wird serverseitig geholt und als data:-URI inline
 * eingebettet (kein <img src="https://dashboard...">), damit die bestehende
 * strikte CSP (netlify.toml, img-src 'self' data: blob:) unverändert bleibt
 * und die Sperrseite ganz ohne externe Abhängigkeiten auskommt.
 */

const STATUS_URL =
  process.env.DASHBOARD_STATUS_URL ?? "https://dashboard.slideagentur.ch/api/downmode-status";
const CACHE_TTL_MS = 5_000;
const FETCH_TIMEOUT_MS = 2_000;

type DownStatus = { down: boolean; imageDataUri: string | null };

const g = globalThis as unknown as { slideDownStatusCache?: { status: DownStatus; loadedAt: number } };

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, { signal: controller.signal, cache: "no-store" });
  } finally {
    clearTimeout(timer);
  }
}

async function loadStatus(): Promise<DownStatus> {
  const res = await fetchWithTimeout(STATUS_URL);
  if (!res.ok) throw new Error(`Status-Endpunkt antwortete mit ${res.status}`);
  const data = (await res.json()) as { down?: boolean; imageUrl?: string | null };

  let imageDataUri: string | null = null;
  if (data.down && data.imageUrl) {
    try {
      const imgRes = await fetchWithTimeout(data.imageUrl);
      if (imgRes.ok) {
        const buf = Buffer.from(await imgRes.arrayBuffer());
        const mime = imgRes.headers.get("content-type") || "image/jpeg";
        imageDataUri = `data:${mime};base64,${buf.toString("base64")}`;
      }
    } catch {
      // Kein Bild ist kein Grund, die Sperre selbst scheitern zu lassen.
    }
  }

  const status: DownStatus = { down: Boolean(data.down), imageDataUri };
  g.slideDownStatusCache = { status, loadedAt: Date.now() };
  return status;
}

async function getStatus(): Promise<DownStatus> {
  const cache = g.slideDownStatusCache;
  if (cache && Date.now() - cache.loadedAt < CACHE_TTL_MS) return cache.status;
  return loadStatus().catch(() => cache?.status ?? { down: false, imageDataUri: null });
}

function lockdownHtml(imageDataUri: string | null): string {
  const bg = imageDataUri
    ? `background-image:linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.55)),url('${imageDataUri}');background-size:cover;background-position:center;`
    : "background:#0a0a0a;";
  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta name="robots" content="noindex, nofollow"/>
<title>SLIDE — vorübergehend nicht erreichbar</title>
<style>
html,body{margin:0;height:100%;}
body{${bg}display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif;color:#fff;text-align:center;padding:24px;box-sizing:border-box;}
p{max-width:480px;font-size:15px;font-weight:300;opacity:.85;line-height:1.5;}
</style>
</head>
<body>
<p>SLIDE ist vorübergehend nicht erreichbar. Bitte versuchen Sie es später erneut.</p>
</body>
</html>`;
}

export async function proxy(request: NextRequest) {
  const status = await getStatus();
  if (status.down) {
    return new NextResponse(lockdownHtml(status.imageDataUri), {
      status: 503,
      headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
