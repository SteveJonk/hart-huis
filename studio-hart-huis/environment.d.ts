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
    /** Volledige URL van de Realworks-import, bijv. https://<site>/api/import-realworks */
    SANITY_STUDIO_REALWORKS_URL?: string
    /** Zelfde waarde als FUNDA_SCRAPER_SECRET op Vercel — geldt voor beide tools. */
    SANITY_STUDIO_SCRAPER_SECRET?: string
  }
}
