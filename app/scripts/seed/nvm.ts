/** Seeds de NVM-FAQ's en de /nvm-pagina. */
import {
  NVM_BENEFITS,
  NVM_BENEFITS_IMAGE,
  NVM_BENEFITS_INTRO,
  NVM_COMPARE,
  NVM_COMPARE_INTRO,
  NVM_CROSSLINKS,
  NVM_CTA,
  NVM_ERECODE,
  NVM_ERECODE_INTRO,
  NVM_FACTS,
  NVM_FAQ,
  NVM_FAQ_INTRO,
  NVM_HERO,
  NVM_PRAKTIJK,
  NVM_PRAKTIJK_INTRO,
} from '../../src/lib/nvm-content'
import {cta, externalLink, key, uploadImage, upsertFaq, upsertPage} from './shared'

async function buildNvmContent(faqIds: string[]) {
  console.log('Building nvm blocks…')

  const heroImage = await uploadImage(NVM_HERO.image, NVM_HERO.imageAlt)
  const benefitsImage = await uploadImage(NVM_BENEFITS_IMAGE.src, NVM_BENEFITS_IMAGE.alt)
  const ctaImage = await uploadImage(NVM_CTA.image, NVM_CTA.imageAlt)

  return [
    {
      _type: 'pageHero',
      _key: key('nvm-hero'),
      image: heroImage,
      breadcrumbLabel: 'NVM',
      eyebrow: NVM_HERO.eyebrow,
      title: NVM_HERO.titleBefore,
      titleHighlight: NVM_HERO.titleEm,
      lead: NVM_HERO.lead,
      primaryCta: cta(NVM_HERO.primary.label, NVM_HERO.primary.href),
      secondaryCta: cta(NVM_HERO.secondary.label, NVM_HERO.secondary.href),
    },
    {
      _type: 'factBar',
      _key: key('nvm-facts'),
      facts: NVM_FACTS.map((fact) => ({...fact, _key: key(`nvm-${fact.label}`)})),
    },
    {
      _type: 'benefits',
      _key: key('nvm-benefits'),
      eyebrow: NVM_BENEFITS_INTRO.eyebrow,
      title: NVM_BENEFITS_INTRO.title,
      lead: NVM_BENEFITS_INTRO.lead,
      image: benefitsImage,
      items: NVM_BENEFITS.map((item) => ({...item, _key: key(`nvm-${item.title}`)})),
    },
    {
      _type: 'iconCards',
      _key: key('nvm-praktijk'),
      eyebrow: NVM_PRAKTIJK_INTRO.eyebrow,
      title: NVM_PRAKTIJK_INTRO.title,
      lead: NVM_PRAKTIJK_INTRO.lead,
      items: NVM_PRAKTIJK.map((item) => ({...item, _key: key(`nvm-${item.title}`)})),
    },
    {
      _type: 'werkwijze',
      _key: key('nvm-erecode'),
      eyebrow: NVM_ERECODE_INTRO.eyebrow,
      title: NVM_ERECODE_INTRO.title,
      lead: NVM_ERECODE_INTRO.lead,
      cta: cta(NVM_ERECODE_INTRO.cta.label, NVM_ERECODE_INTRO.cta.href),
      items: NVM_ERECODE.map((item) => ({...item, _key: key(`nvm-${item.number}`)})),
    },
    {
      _type: 'compareCards',
      _key: key('nvm-vergelijk'),
      eyebrow: NVM_COMPARE_INTRO.eyebrow,
      title: NVM_COMPARE_INTRO.title,
      lead: NVM_COMPARE_INTRO.lead,
      // Staat direct onder de donkere erecode-band.
      spaceTop: true,
      cards: NVM_COMPARE.map((card) => ({
        _key: key(`nvm-${card.title}`),
        label: card.label,
        title: card.title,
        body: card.body,
        items: card.items.map((item) => ({
          _key: key(item.text),
          text: item.text,
          included: item.included !== false,
        })),
        ...(card.cta ? {cta: cta(card.cta.label, card.cta.href)} : {}),
        dark: Boolean(card.dark),
      })),
    },
    {
      _type: 'faqs',
      _key: key('nvm-faqs'),
      eyebrow: NVM_FAQ_INTRO.eyebrow,
      title: NVM_FAQ_INTRO.title,
      intro: NVM_FAQ_INTRO.lead,
      link: cta(NVM_FAQ_INTRO.link.label, NVM_FAQ_INTRO.link.href),
      faqs: faqIds.map((id) => ({
        _type: 'reference' as const,
        _ref: id,
        _key: key(id),
      })),
    },
    {
      _type: 'crossLinks',
      _key: key('nvm-crosslinks'),
      items: NVM_CROSSLINKS.map((item) => ({
        _key: key(`nvm-${item.title}`),
        title: item.title,
        body: item.body,
        link: externalLink(item.href),
      })),
    },
    {
      _type: 'ctaBand',
      _key: key('nvm-cta'),
      image: ctaImage,
      eyebrow: NVM_CTA.eyebrow,
      title: NVM_CTA.title,
      body: NVM_CTA.body,
      primaryCta: cta(NVM_CTA.primary.label, NVM_CTA.primary.href),
      secondaryCta: cta(NVM_CTA.secondary.label, NVM_CTA.secondary.href),
    },
  ]
}

export async function seedNvm() {
  console.log('NVM FAQs')
  const faqIds: string[] = []
  for (const faq of NVM_FAQ) {
    faqIds.push(await upsertFaq(faq))
  }

  console.log('\nNVM page')
  await upsertPage('nvm', 'NVM', await buildNvmContent(faqIds))
}
