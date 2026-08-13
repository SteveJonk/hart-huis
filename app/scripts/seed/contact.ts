/**
 * Seeds the /contact page, plus the form document it points at.
 *
 * The form itself lives in the `contactForm` type from
 * @multidots/sanity-plugin-contact-form, so editors manage the fields under
 * "Forms" in the studio. Mail settings (admin address, SMTP) are NOT seeded —
 * fill those in under "Form settings", or set SMTP_USER / SMTP_PASSWORD /
 * CONTACT_ADMIN_EMAIL in the app environment.
 */
import {
  CONTACT_CROSSLINKS,
  CONTACT_FORM,
  CONTACT_FORM_FIELDS,
  CONTACT_FORM_TITLE,
  CONTACT_HERO,
  CONTACT_PERSON,
  CONTACT_ROUTE,
  CONTACT_WAYS,
} from '../../src/lib/contact-content'
import {client, cta, externalLink, key, uploadImage, upsertPage} from './shared'

const FORM_ID = 'contact'

async function upsertContactForm() {
  const existingId = await client.fetch<string | null>(
    `*[_type == "contactForm" && id == $id][0]._id`,
    {id: FORM_ID},
  )

  const doc = {
    _type: 'contactForm' as const,
    title: CONTACT_FORM_TITLE,
    showtitle: false,
    id: FORM_ID,
    submitButtonText: 'Verstuur bericht',
    fields: CONTACT_FORM_FIELDS.map((field) => ({
      _key: key(field.name),
      label: field.label,
      name: field.name,
      type: field.type,
      isRequired: field.isRequired,
      showPlaceholder: false,
      ...('placeholder' in field ? {placeholder: field.placeholder} : {}),
      ...('selectOptions' in field ? {selectOptions: [...field.selectOptions]} : {}),
      ...('checkboxOptions' in field ? {checkboxOptions: [...field.checkboxOptions]} : {}),
    })),
  }

  if (existingId) {
    await client.patch(existingId).set(doc).commit()
    console.log(`  ↻ form ${CONTACT_FORM_TITLE}`)
    return existingId
  }

  const created = await client.create(doc)
  console.log(`  + form ${CONTACT_FORM_TITLE}`)
  return created._id
}

async function buildContactContent(formId: string) {
  console.log('Building contact blocks…')

  const heroImage = await uploadImage(CONTACT_HERO.image.src, CONTACT_HERO.image.alt)
  const personImage = await uploadImage(
    CONTACT_PERSON.image.src,
    CONTACT_PERSON.image.alt,
  )
  const routeImage = await uploadImage(CONTACT_ROUTE.image.src, CONTACT_ROUTE.image.alt)

  return [
    {
      _type: 'splitHero',
      _key: key('contact-hero'),
      breadcrumbLabel: CONTACT_HERO.breadcrumbLabel,
      eyebrow: CONTACT_HERO.eyebrow,
      title: CONTACT_HERO.title,
      titleHighlight: CONTACT_HERO.titleEm,
      lead: CONTACT_HERO.lead,
      primaryCta: cta(CONTACT_HERO.primary.label, CONTACT_HERO.primary.href),
      secondaryCta: cta(CONTACT_HERO.secondary.label, CONTACT_HERO.secondary.href),
      image: heroImage,
    },
    {
      _type: 'contactWays',
      _key: key('contact-ways'),
      items: CONTACT_WAYS.map((way) => ({
        _key: key(`way-${way.title}`),
        icon: way.icon,
        title: way.title,
        body: way.body,
        value: way.value,
        note: way.note,
        link: externalLink(way.href),
      })),
    },
    {
      _type: 'personBlock',
      _key: key('contact-person'),
      image: personImage,
      eyebrow: CONTACT_PERSON.eyebrow,
      title: CONTACT_PERSON.title,
      body: CONTACT_PERSON.body,
      person: {
        initials: CONTACT_PERSON.person.initials,
        name: CONTACT_PERSON.person.name,
        role: CONTACT_PERSON.person.role,
        links: CONTACT_PERSON.person.links.map((link) => ({
          _key: key(`person-${link.label}`),
          label: link.label,
          link: externalLink(link.href),
        })),
      },
    },
    {
      _type: 'contactFormSection',
      _key: key('contact-form'),
      eyebrow: CONTACT_FORM.eyebrow,
      title: CONTACT_FORM.title,
      lead: CONTACT_FORM.lead,
      form: {_type: 'reference' as const, _ref: formId},
      note: CONTACT_FORM.note,
      successTitle: CONTACT_FORM.successTitle,
      successBody: CONTACT_FORM.successBody,
      aside: {
        title: CONTACT_FORM.aside.title,
        body: CONTACT_FORM.aside.body,
        items: CONTACT_FORM.aside.items.map((item) => ({
          _key: key(`aside-${item.title}`),
          icon: item.icon,
          title: item.title,
          subtitle: item.subtitle,
        })),
        cta: cta(CONTACT_FORM.aside.cta.label, CONTACT_FORM.aside.cta.href),
      },
    },
    {
      _type: 'routeBlock',
      _key: key('contact-route'),
      eyebrow: CONTACT_ROUTE.eyebrow,
      title: CONTACT_ROUTE.title,
      lead: CONTACT_ROUTE.lead,
      columns: CONTACT_ROUTE.columns.map((column) => ({
        _key: key(`route-${column.title}`),
        title: column.title,
        body: column.body,
      })),
      cta: cta(CONTACT_ROUTE.cta.label, CONTACT_ROUTE.cta.href),
      image: routeImage,
    },
    {
      _type: 'crossLinks',
      _key: key('contact-crosslinks'),
      items: CONTACT_CROSSLINKS.map((item) => ({
        _key: key(`contact-${item.title}`),
        title: item.title,
        body: item.body,
        link: externalLink(item.href),
      })),
    },
  ]
}

export async function seedContact() {
  console.log('Contact form')
  const formId = await upsertContactForm()

  console.log('\nContact page')
  await upsertPage('contact', 'Contact', await buildContactContent(formId))
}
