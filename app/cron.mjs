/**
 * Aanroeper voor de importroutes, bedoeld voor een geplande taak (Coolify,
 * systemd-timer, of gewoon crontab). Vervangt `curl` — dat zit niet in het
 * `node:22-alpine`-image, maar node zelf natuurlijk wel, en die heeft sinds
 * versie 18 een ingebouwde `fetch`.
 *
 * Gebruik:
 *   node cron.mjs reviews            de Funda-reviews ophalen
 *   node cron.mjs realworks          het aanbod importeren
 *   node cron.mjs reviews --dry-run  uitproberen zonder iets weg te schrijven
 *
 * Draait binnen de container, dus standaard gaat het verzoek naar
 * 127.0.0.1:3000 — het hoeft het internet niet op. Wijk daarvan af met
 * `CRON_TARGET_URL` als de app ergens anders luistert.
 *
 * Vereist `CRON_SECRET`; dezelfde waarde die de route verwacht. De uitvoer
 * gaat naar stdout en belandt zo in het uitvoerlogboek van de geplande taak;
 * een mislukte run eindigt met exitcode 1, zodat de planner hem rood kleurt.
 */

const ROUTES = {
  reviews: '/api/scrape-funda-reviews',
  realworks: '/api/import-realworks',
};

/** Ruim boven de langste run: de eerste Realworks-import laadt honderden foto's. */
const DEFAULT_TIMEOUT_MS = 15 * 60 * 1000;

function fail(message) {
  console.error(message);
  process.exit(1);
}

const args = process.argv.slice(2);
const taak = args.find((arg) => !arg.startsWith('-'));
const dryRun = args.includes('--dry-run');

if (!taak || !(taak in ROUTES)) {
  fail(`Kies een taak: ${Object.keys(ROUTES).join(' of ')}. Bijvoorbeeld: node cron.mjs reviews`);
}

const secret = process.env.CRON_SECRET;
if (!secret) {
  fail('CRON_SECRET ontbreekt. Zet hem in de omgevingsvariabelen van de container.');
}

const base = process.env.CRON_TARGET_URL || 'http://127.0.0.1:3000';
const timeout = Number(process.env.CRON_TIMEOUT_MS) || DEFAULT_TIMEOUT_MS;

const url = new URL(ROUTES[taak], base);
if (dryRun) url.searchParams.set('dryRun', '1');

const gestart = Date.now();
console.log(`[cron] ${taak}${dryRun ? ' (testrun)' : ''} → ${url}`);

let response;
try {
  response = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${secret}` },
    signal: AbortSignal.timeout(timeout),
  });
} catch (error) {
  // Een afgebroken verbinding of een time-out: de route draait mogelijk nog
  // door, maar deze run telt als mislukt.
  fail(`[cron] ${taak} mislukt na ${Math.round((Date.now() - gestart) / 1000)}s: ${error.message}`);
}

const tekst = await response.text();
let body;
try {
  body = JSON.parse(tekst);
} catch {
  body = null;
}

console.log(body ? JSON.stringify(body, null, 2) : tekst.slice(0, 2000));

const duur = `${Math.round((Date.now() - gestart) / 1000)}s`;

// De routes geven bij een lege Realworks-feed een HTTP 200 mét `ok: false`,
// dus de status alleen is niet genoeg om de run geslaagd te noemen.
if (!response.ok || body?.ok === false || body?.error) {
  fail(`[cron] ${taak} mislukt (HTTP ${response.status}) na ${duur}`);
}

console.log(`[cron] ${taak} klaar in ${duur}`);
