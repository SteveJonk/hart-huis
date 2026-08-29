# Hart en Huis

Sanity-powered website for **Hart en Huis makelaars**.

## Structure

| Folder | Description |
| --- | --- |
| `app/` | Next.js frontend |
| `studio-hart-huis/` | Sanity Studio (content management) |

Content is managed in Sanity Studio and rendered by the Next.js app.

## Docs

- [Funda-review-scraper](docs/funda-review-scraper.md) — haalt de beoordelingen
  van Funda op en zet ze in Sanity, dagelijks via de Vercel-cron of met de knop
  in de studio.
- [Realworks-objecten-import](docs/realworks-import.md) — haalt het actieve
  aanbod op bij Realworks en zet het als objecten in Sanity, dagelijks via de
  Vercel-cron of met de knop in de studio.
- [Mediabeheer](docs/mediabeheer.md) — het Media-paneel in de studio: overzicht
  van alle uploads, zoeken, detailgegevens, uploaden en verwijderen van
  bestanden die nergens gebruikt worden.
