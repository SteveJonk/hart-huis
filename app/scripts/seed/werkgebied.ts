/** Seeds the `werkgebied` documents (/werkgebied/<slug>) from the stad-template. */
import {
  WERKGEBIEDEN,
  werkgebiedHref,
  type Werkgebied,
} from '../../src/lib/werkgebied-content'
import {cta, externalLink, key, uploadImage, upsertFaq, upsertPage} from './shared'

async function buildContent(w: Werkgebied, faqIds: string[]) {
  const k = (part: string) => key(`werkgebied-${w.slug}-${part}`)
  const heroImage = await uploadImage(w.hero.image, w.hero.imageAlt)
  const introImage = await uploadImage(w.intro.image.src, w.intro.image.alt)
  const quoteImage = w.quote ? await uploadImage(w.quote.image, w.quote.imageAlt) : null
  const ctaImage = await uploadImage(w.cta.image, w.cta.imageAlt)

  return [
    {
      _type: 'pageHero',
      _key: k('hero'),
      image: heroImage,
      breadcrumbLabel: w.title,
      eyebrow: w.hero.eyebrow,
      title: w.hero.titleBefore,
      titleHighlight: w.hero.titleEm,
      titleAfter: w.hero.titleAfter,
      lead: w.hero.lead,
      primaryCta: cta(w.hero.primary.label, w.hero.primary.href),
      secondaryCta: cta(w.hero.secondary.label, w.hero.secondary.href),
    },
    ...(w.facts
      ? [
          {
            _type: 'factBar',
            _key: k('facts'),
            facts: w.facts.items.map((fact) => ({...fact, _key: k(fact.label)})),
            note: w.facts.note,
          },
        ]
      : []),
    {
      // Geen cta: mediaText toont dan geen knop (de design heeft er hier geen).
      _type: 'mediaText',
      _key: k('intro'),
      eyebrow: w.intro.eyebrow,
      title: w.intro.title,
      paragraphs: [...w.intro.paragraphs],
      image: introImage,
    },
    {
      _type: 'iconCards',
      _key: k('diensten'),
      eyebrow: w.dienstenIntro.eyebrow,
      title: w.dienstenIntro.title,
      lead: w.dienstenIntro.lead,
      items: w.diensten.map((item) => ({
        _key: k(item.title),
        icon: item.icon,
        title: item.title,
        body: item.body,
        cta: cta(item.cta.label, item.cta.href),
      })),
    },
    {
      // Wijken zonder link: RegionBlock toont ze als tekst.
      _type: 'regionBlock',
      _key: k('wijken'),
      eyebrow: w.wijkenIntro.eyebrow,
      title: w.wijkenIntro.title,
      lead: w.wijkenIntro.lead,
      places: w.wijken.map((label) => ({_key: k(`wijk-${label}`), label})),
    },
    ...(w.quote && quoteImage
      ? [
          {
            _type: 'quoteBand',
            _key: k('quote'),
            image: quoteImage,
            eyebrow: w.quote.eyebrow,
            quote: w.quote.quote,
            initials: w.quote.initials,
            name: w.quote.name,
            place: w.quote.place,
          },
        ]
      : []),
    {
      _type: 'faqs',
      _key: k('faqs'),
      eyebrow: w.faqIntro.eyebrow,
      title: w.faqIntro.title,
      intro: w.faqIntro.lead,
      link: cta(w.faqIntro.link.label, w.faqIntro.link.href),
      faqs: faqIds.map((id) => ({_type: 'reference' as const, _ref: id, _key: key(id)})),
    },
    {
      _type: 'regionBlock',
      _key: k('omgeving'),
      eyebrow: w.omgevingIntro.eyebrow,
      title: w.omgevingIntro.title,
      lead: w.omgevingIntro.lead,
      places: w.omgeving.map((label) => ({
        _key: k(`omgeving-${label}`),
        label,
        link: externalLink(werkgebiedHref(label)),
      })),
    },
    {
      _type: 'ctaBand',
      _key: k('cta'),
      image: ctaImage,
      eyebrow: w.cta.eyebrow,
      title: w.cta.title,
      body: w.cta.body,
      primaryCta: cta(w.cta.primary.label, w.cta.primary.href),
      secondaryCta: cta(w.cta.secondary.label, w.cta.secondary.href),
    },
  ]
}

export async function seedWerkgebied() {
  for (const w of WERKGEBIEDEN) {
    console.log(`\nWerkgebied ${w.title}: FAQs`)
    const faqIds: string[] = []
    for (const faq of w.faq) faqIds.push(await upsertFaq(faq))

    console.log(`Werkgebied ${w.title}: page`)
    await upsertPage(w.slug, w.title, await buildContent(w, faqIds), w.seo, 'werkgebied')
  }
}
