/**
 * Toegang tot de import-routes (Funda-reviews, Realworks-objecten).
 *
 * Twee sleutels, met opzet gescheiden:
 *   - CRON_SECRET           Vercels cron stuurt hem als `Authorization: Bearer …`
 *   - FUNDA_SCRAPER_SECRET  de knoppen in de studio, als `x-scraper-secret`
 *
 * Een gedeployde studio is een publieke JS-bundle, dus die tweede sleutel is
 * leesbaar voor wie zoekt. Houd hem daarom los van CRON_SECRET — het ergste wat
 * ermee kan is dat iemand een import start.
 */
import { createHash, timingSafeEqual } from 'node:crypto';

function equalSecret(received: string, expected: string): boolean {
  // hashen zodat timingSafeEqual geen gelijke lengtes nodig heeft
  const a = createHash('sha256').update(received).digest();
  const b = createHash('sha256').update(expected).digest();
  return timingSafeEqual(a, b);
}

export function isAuthorized(request: Request): boolean {
  const cronSecret = process.env.CRON_SECRET;
  const studioSecret = process.env.FUNDA_SCRAPER_SECRET;

  if (!cronSecret && !studioSecret) return false;

  const bearer = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (bearer && cronSecret && equalSecret(bearer, cronSecret)) return true;

  const header = request.headers.get('x-scraper-secret');
  if (header && studioSecret && equalSecret(header, studioSecret)) return true;

  return false;
}

/** De studio draait op een andere origin, dus de knoppen hebben CORS nodig. */
export function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get('origin') ?? '';
  const allowed = (process.env.STUDIO_ORIGIN ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  const permitted =
    allowed.includes(origin) || /^https:\/\/[a-z0-9-]+\.sanity\.studio$/.test(origin);

  if (!permitted) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Headers': 'content-type, x-scraper-secret',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    Vary: 'Origin',
  };
}
