/**
 * De studio wordt door Vite gebouwd, dat `process.env.SANITY_STUDIO_*`
 * bij het bouwen vervangt door de letterlijke waarde. Er is hier geen
 * @types/node, dus declareren we alleen de variabelen die we echt gebruiken.
 *
 * Zet ze in `studio-hart-huis/.env` — zie de README.
 */
declare const process: {
  env: {
    /** Volledige URL van de scraper-route, bijv. https://<site>/api/scrape-funda-reviews */
    SANITY_STUDIO_SCRAPER_URL?: string
    /** Zelfde waarde als FUNDA_SCRAPER_SECRET op Vercel. */
    SANITY_STUDIO_SCRAPER_SECRET?: string
  }
}
