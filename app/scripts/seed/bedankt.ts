/**
 * Seeds de /bedankt-pagina: de landingsplek voor formulieren waarvan
 * "Doorsturen na versturen" aanstaat.
 *
 * Alleen bestaande blocks — pageHero, numberedSteps, iconCards, crossLinks en
 * ctaBand — en foto's die al in de repo staan. Niet aan de navigatie
 * gekoppeld (net als /waardebepaling), dus seed:nav hoeft niet.
 *
 * Koppelen doe je in de studio: open een Form, zet "Doorsturen na versturen"
 * aan en kies deze pagina onder "Doorstuurpagina".
 */
import {
  BEDANKT_CROSSLINKS,
  BEDANKT_CTA,
  BEDANKT_HERO,
  BEDANKT_ONDERTUSSEN,
  BEDANKT_ONDERTUSSEN_INTRO,
  BEDANKT_STAPPEN,
  BEDANKT_STAPPEN_INTRO,
} from '../../src/lib/bedankt-content'
import {cta, externalLink, key, uploadImage, upsertPage} from './shared'

async function buildBedanktContent() {
  console.log('Building bedankt blocks…')

  const heroImage = await uploadImage(BEDANKT_HERO.image, BEDANKT_HERO.imageAlt)
  const ctaImage = await uploadImage(BEDANKT_CTA.image, BEDANKT_CTA.imageAlt)

  return [
    {
      _type: 'pageHero',
      _key: key('bedankt-hero'),
      image: heroImage,
      breadcrumbLabel: BEDANKT_HERO.breadcrumbLabel,
      eyebrow: BEDANKT_HERO.eyebrow,
      title: BEDANKT_HERO.titleBefore,
      titleHighlight: BEDANKT_HERO.titleEm,
      lead: BEDANKT_HERO.lead,
      primaryCta: cta(BEDANKT_HERO.primary.label, BEDANKT_HERO.primary.href),
      secondaryCta: cta(BEDANKT_HERO.secondary.label, BEDANKT_HERO.secondary.href),
    },
    {
      _type: 'numberedSteps',
      _key: key('bedankt-stappen'),
      eyebrow: BEDANKT_STAPPEN_INTRO.eyebrow,
      title: BEDANKT_STAPPEN_INTRO.title,
      lead: BEDANKT_STAPPEN_INTRO.lead,
      items: BEDANKT_STAPPEN.map((item) => ({...item, _key: key(`bedankt-${item.number}`)})),
    },
    {
      _type: 'iconCards',
      _key: key('bedankt-ondertussen'),
      eyebrow: BEDANKT_ONDERTUSSEN_INTRO.eyebrow,
      title: BEDANKT_ONDERTUSSEN_INTRO.title,
      lead: BEDANKT_ONDERTUSSEN_INTRO.lead,
      items: BEDANKT_ONDERTUSSEN.map((item) => ({...item, _key: key(`bedankt-${item.title}`)})),
    },
    {
      _type: 'crossLinks',
      _key: key('bedankt-crosslinks'),
      items: BEDANKT_CROSSLINKS.map((item) => ({
        _key: key(`bedankt-${item.title}`),
        title: item.title,
        body: item.body,
        link: externalLink(item.href),
      })),
    },
    {
      _type: 'ctaBand',
      _key: key('bedankt-cta'),
      image: ctaImage,
      eyebrow: BEDANKT_CTA.eyebrow,
      title: BEDANKT_CTA.title,
      body: BEDANKT_CTA.body,
      primaryCta: cta(BEDANKT_CTA.primary.label, BEDANKT_CTA.primary.href),
      secondaryCta: cta(BEDANKT_CTA.secondary.label, BEDANKT_CTA.secondary.href),
    },
  ]
}

export async function seedBedankt() {
  console.log('Bedankt page')
  await upsertPage('bedankt', 'Bedankt', await buildBedanktContent(), {
    // Een bedankpagina hoort niet in Google: hij zegt niets zonder de
    // inzending die eraan voorafging.
    noIndex: true,
    description:
      'Je bericht is bij ons binnengekomen. We nemen binnen één werkdag contact met je op.',
  })
}
