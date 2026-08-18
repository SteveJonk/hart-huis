import { AanbodHeader } from '@/components/blocks/AanbodHeader';
import { Assurances } from '@/components/blocks/Assurances';
import { Benefits } from '@/components/blocks/Benefits';
import { BeoordelingenHero } from '@/components/blocks/BeoordelingenHero';
import { CompareCards } from '@/components/blocks/CompareCards';
import { ContactForm, type ContactFormField } from '@/components/blocks/ContactForm';
import { ContactWays } from '@/components/blocks/ContactWays';
import { CrossLinks } from '@/components/blocks/CrossLinks';
import { CtaBand } from '@/components/blocks/CtaBand';
import { DuoPhotos } from '@/components/blocks/DuoPhotos';
import { FactBar } from '@/components/blocks/FactBar';
import { Faq } from '@/components/blocks/Faq';
import { Hero } from '@/components/blocks/Hero';
import { HighlightStrip } from '@/components/blocks/HighlightStrip';
import { Intro } from '@/components/blocks/Intro';
import { Listings, toListing } from '@/components/blocks/Listings';
import { MediaText } from '@/components/blocks/MediaText';
import { ObjectGrid } from '@/components/blocks/ObjectGrid';
import { PageHero } from '@/components/blocks/PageHero';
import { PageOpener } from '@/components/blocks/PageOpener';
import { Person } from '@/components/blocks/Person';
import { QuoteBand } from '@/components/blocks/QuoteBand';
import { RegionBlock } from '@/components/blocks/RegionBlock';
import { RouteBlock } from '@/components/blocks/RouteBlock';
import { ReviewGrid } from '@/components/blocks/ReviewGrid';
import { Reviews } from '@/components/blocks/Reviews';
import { Services } from '@/components/blocks/Services';
import { SplitHero } from '@/components/blocks/SplitHero';
import { Steps } from '@/components/blocks/Steps';
import { Stories } from '@/components/blocks/Stories';
import { Timeline } from '@/components/blocks/Timeline';
import { UitgelichteReview } from '@/components/blocks/UitgelichteReview';
import { ValueCards } from '@/components/blocks/ValueCards';
import { Werkwijze, type WerkwijzeItem } from '@/components/blocks/Werkwijze';
import type { BlockIconName } from '@/components/ui/BlockIcon';
import { imageSrc, toImage, type SanityImage } from '@/sanity/image';
import type { PAGE_QUERY_RESULT } from '@/sanity/sanity.types';
import { resolveHref, type SanityLabeledLink, type SanityLink } from '@/lib/links';
import {
  reviewCountLabel,
  reviewCountNoun,
  reviewScore,
  type ReviewItem,
  type ReviewStats,
} from '@/lib/reviews';

type SanityCta = SanityLabeledLink;

type SanityWoningCard = {
  slug: string;
  adres: string;
  plaats: string;
  status?: string | null;
  prijs?: number | null;
  woonoppervlak?: number | null;
  kamers?: number | null;
  aangebodenSinds?: string | null;
  foto?: SanityImage | null;
};

type PageBlock = NonNullable<NonNullable<PAGE_QUERY_RESULT>['content']>[number];

function toCta(cta: SanityCta | undefined | null) {
  const href = resolveHref(cta);
  if (!cta?.label || !href) return undefined;
  return { label: cta.label, href };
}

function toLabeledLink(
  item: { label?: string; link?: SanityLink } | undefined | null,
): { label: string; href: string } | undefined {
  const href = resolveHref(item?.link);
  if (!item?.label || !href) return undefined;
  return { label: item.label, href };
}

/** Reviews zonder quote of naam zijn onbruikbaar op een kaart en vallen af. */
function toReviews(value: unknown): ReviewItem[] | undefined {
  if (!Array.isArray(value)) return undefined;
  return (value as Array<Partial<ReviewItem> | null>)
    .filter((review): review is ReviewItem => Boolean(review?.quote && review?.name))
    .map((review) => ({ ...review }));
}

function renderBlock(block: PageBlock) {
  switch (block._type) {
    case 'hero': {
      const slides = block.slides
        ?.map((slide) => toImage(slide, 2400, 1600))
        .filter((slide): slide is { src: string; alt: string } => Boolean(slide));
      return (
        <Hero
          key={block._key}
          slides={slides}
          eyebrow={block.eyebrow}
          title={block.title}
          titleHighlight={block.titleHighlight}
          lead={block.lead}
          primaryCta={toCta(block.primaryCta)}
          secondaryCta={toCta(block.secondaryCta)}
          // Geen redactionele fallback: `badgeValue` staat niet in het
          // hero-schema, dus die kwam altijd leeg terug. Blijft het afgeleide
          // cijfer leeg, dan vult Hero zelf SITE.fundaScore in.
          badgeValue={reviewScore(block)}
          badgeLabel={block.badgeLabel}
        />
      );
    }
    case 'intro': {
      return (
        <Intro
          key={block._key}
          image={toImage(block.image, 800, 1000)}
          stampValue={block.stampValue}
          stampLabel={block.stampLabel}
          eyebrow={block.eyebrow}
          title={block.title}
          titleHighlight={block.titleHighlight}
          leads={block.leads}
          facts={block.facts as { value: string; label: string }[] | undefined}
          link={toCta(block.link)}
        />
      );
    }
    case 'services': {
      const items = (
        block.items as
          | Array<{
              label: string;
              title: string;
              description: string;
              image: SanityImage;
              link?: SanityLink;
            }>
          | undefined
      )
        ?.map((item, index) => {
          const href = resolveHref(item.link);
          if (!href) return null;
          return {
            label: item.label,
            title: item.title,
            description: item.description,
            href,
            image: toImage(item.image, 640, 768) ?? { src: '', alt: '' },
            delay: (index === 0 ? undefined : index) as 1 | 2 | 3 | undefined,
          };
        })
        .filter((item): item is NonNullable<typeof item> => Boolean(item));
      const nvm = block.nvm as
        { badge?: string; title?: string; body?: string; cta?: SanityCta } | undefined;
      return (
        <Services
          key={block._key}
          title={block.title}
          lead={block.lead}
          items={items}
          nvm={
            nvm
              ? {
                  badge: nvm.badge ?? 'NVM',
                  title: nvm.title ?? '',
                  body: nvm.body ?? '',
                  cta: toCta(nvm.cta),
                }
              : undefined
          }
        />
      );
    }
    case 'story': {
      return (
        <Stories
          key={block._key}
          image={toImage(block.image, 900, 1200)}
          secondaryImage={toImage(block.secondaryImage, 600, 400)}
          eyebrow={block.eyebrow}
          title={block.title}
          quote={block.quote}
          attribution={block.attribution}
          cta={toCta(block.cta)}
        />
      );
    }
    case 'reviews': {
      const reviews = toReviews(block.reviews);
      const stats = block as ReviewStats;
      return (
        <Reviews
          key={block._key}
          score={reviewScore(stats, block.score)}
          scoreLabel={block.scoreLabel}
          reviewCountLabel={reviewCountLabel(stats, block.reviewCountLabel)}
          intro={block.intro}
          reviews={reviews}
          link={toCta(block.link)}
          showGrades={Boolean(block.showGrades)}
        />
      );
    }
    case 'beoordelingenHero': {
      const stats = block as ReviewStats;
      return (
        <BeoordelingenHero
          key={block._key}
          breadcrumbLabel={block.breadcrumbLabel}
          eyebrow={block.eyebrow}
          title={block.title}
          titleHighlight={block.titleHighlight}
          lead={block.lead}
          primaryCta={toCta(block.primaryCta)}
          secondaryCta={toCta(block.secondaryCta)}
          score={reviewScore(stats)}
          scoreLabel={block.scoreLabel}
          countLabel={reviewCountNoun(stats)}
          scoreNote={block.scoreNote}
          stats={stats}
        />
      );
    }
    case 'uitgelichteReview': {
      return (
        <UitgelichteReview
          key={block._key}
          eyebrow={block.eyebrow}
          image={toImage(block.image, 900, 1125)}
          review={toReviews([block.review])?.[0]}
        />
      );
    }
    case 'reviewGrid': {
      return (
        <ReviewGrid
          key={block._key}
          title={block.title}
          items={toReviews(block.items)}
          more={block.more}
          empty={block.empty}
        />
      );
    }
    case 'werkwijze': {
      return (
        <Werkwijze
          key={block._key}
          eyebrow={block.eyebrow}
          title={block.title}
          lead={block.lead}
          items={block.items as WerkwijzeItem[] | undefined}
        />
      );
    }
    case 'listings': {
      // De drie nieuwste woningen, dezelfde kaart als op /aanbod.
      const items = (block.objecten as SanityWoningCard[] | undefined)?.map(
        (woning, index) => ({
          ...toListing({
            slug: woning.slug,
            adres: woning.adres,
            plaats: woning.plaats,
            status: woning.status,
            prijs: woning.prijs,
            woonoppervlak: woning.woonoppervlak,
            kamers: woning.kamers,
            image: toImage(woning.foto, 800, 600),
          }),
          delay: (index === 0 ? undefined : index) as 1 | 2 | 3 | undefined,
        }),
      );
      const regions = (
        block.regions as Array<{ label?: string; link?: SanityLink }> | undefined
      )
        ?.map(toLabeledLink)
        .filter((region): region is { label: string; href: string } => Boolean(region));
      return (
        <Listings
          key={block._key}
          title={block.title}
          cta={toCta(block.cta)}
          items={items}
          regionsLabel={block.regionsLabel}
          regions={regions}
        />
      );
    }
    case 'ctaBand': {
      return (
        <CtaBand
          key={block._key}
          image={toImage(block.image, 2400, 1200)}
          eyebrow={block.eyebrow}
          title={block.title}
          body={block.body}
          primaryCta={toCta(block.primaryCta)}
          secondaryCta={toCta(block.secondaryCta)}
        />
      );
    }
    case 'pageHero': {
      return (
        <PageHero
          key={block._key}
          image={toImage(block.image, 2400, 1600)}
          breadcrumbLabel={block.breadcrumbLabel}
          eyebrow={block.eyebrow}
          title={block.title}
          titleHighlight={block.titleHighlight}
          lead={block.lead}
          primaryCta={toCta(block.primaryCta)}
          secondaryCta={toCta(block.secondaryCta)}
        />
      );
    }
    case 'factBar': {
      return (
        <FactBar
          key={block._key}
          facts={block.facts as { value: string; label: string }[] | undefined}
        />
      );
    }
    case 'benefits': {
      return (
        <Benefits
          key={block._key}
          eyebrow={block.eyebrow}
          title={block.title}
          lead={block.lead}
          image={toImage(block.image, 900, 1125)}
          items={
            block.items as
              | Array<{
                  icon: 'person' | 'camera' | 'chart' | 'doc';
                  title: string;
                  body: string;
                }>
              | undefined
          }
        />
      );
    }
    case 'steps': {
      const items = (
        block.items as
          | Array<{
              number: string;
              title: string;
              body: string;
              image: SanityImage;
            }>
          | undefined
      )?.map((item) => ({
        number: item.number,
        title: item.title,
        body: item.body,
        image: imageSrc(item.image, 900, 1125) ?? '',
      }));
      return (
        <Steps
          key={block._key}
          eyebrow={block.eyebrow}
          title={block.title}
          lead={block.lead}
          cta={toCta(block.cta)}
          items={items}
        />
      );
    }
    case 'quoteBand': {
      return (
        <QuoteBand
          key={block._key}
          image={toImage(block.image, 800, 1000)}
          eyebrow={block.eyebrow}
          quote={block.quote}
          initials={block.initials}
          name={block.name}
          place={block.place}
        />
      );
    }
    case 'faqs': {
      const items = (
        block.faqs as
          | Array<{
              title?: string;
              answer?: string;
              link?: SanityCta;
              afterLink?: string;
            }>
          | undefined
      )
        ?.filter((faq) => faq?.title && faq?.answer)
        .map((faq) => ({
          question: faq.title!,
          answer: faq.answer!,
          link: toCta(faq.link),
          afterLink: faq.afterLink,
        }));
      return (
        <Faq
          key={block._key}
          eyebrow={block.eyebrow}
          title={block.title}
          intro={block.intro}
          link={toCta(block.link)}
          items={items}
        />
      );
    }
    case 'regionBlock': {
      const places = (
        block.places as Array<{ label?: string; link?: SanityLink }> | undefined
      )
        ?.map(toLabeledLink)
        .filter((place): place is { label: string; href: string } => Boolean(place));
      return (
        <RegionBlock
          key={block._key}
          eyebrow={block.eyebrow}
          title={block.title}
          lead={block.lead}
          places={places}
        />
      );
    }
    case 'crossLinks': {
      const items = (
        block.items as
          Array<{ title?: string; body?: string; link?: SanityLink }> | undefined
      )
        ?.map((item) => {
          const href = resolveHref(item.link);
          if (!item.title || !item.body || !href) return null;
          return { title: item.title, body: item.body, href };
        })
        .filter((item): item is { title: string; body: string; href: string } =>
          Boolean(item),
        );
      return <CrossLinks key={block._key} items={items} />;
    }
    case 'aanbodHeader': {
      const aside = block.aside as
        { title?: string; body?: string; cta?: SanityCta } | undefined;
      return (
        <AanbodHeader
          key={block._key}
          breadcrumbLabel={block.breadcrumbLabel}
          eyebrow={block.eyebrow}
          title={block.title}
          titleHighlight={block.titleHighlight}
          lead={block.lead}
          asideTitle={aside?.title}
          asideBody={aside?.body}
          asideCta={toCta(aside?.cta)}
        />
      );
    }
    case 'objectGrid': {
      const items = (block.objecten as SanityWoningCard[] | undefined)?.map(
        (woning) => ({
          slug: woning.slug,
          adres: woning.adres,
          plaats: woning.plaats,
          status: woning.status,
          prijs: woning.prijs,
          woonoppervlak: woning.woonoppervlak,
          kamers: woning.kamers,
          aangebodenSinds: woning.aangebodenSinds,
          image: toImage(woning.foto, 800, 600),
        }),
      );
      const ctaCard = block.ctaCard as
        { title?: string; body?: string; cta?: SanityCta } | undefined;
      return (
        <ObjectGrid
          key={block._key}
          items={items}
          ctaCard={
            ctaCard
              ? { title: ctaCard.title, body: ctaCard.body, cta: toCta(ctaCard.cta) }
              : undefined
          }
          emptyTitle={block.emptyTitle}
          emptyBody={block.emptyBody}
        />
      );
    }
    case 'pageOpener': {
      return (
        <PageOpener
          key={block._key}
          eyebrow={block.eyebrow}
          title={block.title}
          titleHighlight={block.titleHighlight}
          lead={block.lead}
          motto={block.motto}
          attribution={block.attribution}
        />
      );
    }
    case 'duoPhotos': {
      return (
        <DuoPhotos
          key={block._key}
          image={toImage(block.image, 900, 1125)}
          stampValue={block.stampValue}
          stampLabel={block.stampLabel}
          secondaryImage={toImage(block.secondaryImage, 700, 933)}
          caption={block.caption}
        />
      );
    }
    case 'timeline': {
      const items = (
        block.items as
          | Array<{
              year: string;
              title: string;
              body: string;
              image?: SanityImage;
            }>
          | undefined
      )?.map((item) => ({
        year: item.year,
        title: item.title,
        body: item.body,
        image: toImage(item.image, 1400, 875),
      }));
      return (
        <Timeline
          key={block._key}
          eyebrow={block.eyebrow}
          title={block.title}
          lead={block.lead}
          items={items}
        />
      );
    }
    case 'valueCards': {
      return (
        <ValueCards
          key={block._key}
          eyebrow={block.eyebrow}
          title={block.title}
          lead={block.lead}
          items={
            block.items as
              | Array<{
                  icon: 'heart' | 'rings' | 'lines';
                  title: string;
                  body: string;
                }>
              | undefined
          }
        />
      );
    }
    case 'mediaText': {
      return (
        <MediaText
          key={block._key}
          eyebrow={block.eyebrow}
          title={block.title}
          paragraphs={block.paragraphs}
          cta={toCta(block.cta)}
          image={toImage(block.image, 900, 720)}
        />
      );
    }
    case 'compareCards': {
      const cards = (
        block.cards as
          | Array<{
              label: string;
              title: string;
              body: string;
              items: { text: string; included?: boolean }[];
              cta?: SanityCta;
              dark?: boolean;
            }>
          | undefined
      )
        ?.map((card) => {
          const cardCta = toCta(card.cta);
          if (!cardCta) return null;
          return {
            label: card.label,
            title: card.title,
            body: card.body,
            items: card.items ?? [],
            cta: cardCta,
            dark: card.dark,
          };
        })
        .filter((card): card is NonNullable<typeof card> => Boolean(card));
      return (
        <CompareCards
          key={block._key}
          eyebrow={block.eyebrow}
          title={block.title}
          lead={block.lead}
          cards={cards}
        />
      );
    }
    case 'assurances': {
      return (
        <Assurances
          key={block._key}
          eyebrow={block.eyebrow}
          title={block.title}
          lead={block.lead}
          items={block.items as { title: string; body: string }[] | undefined}
        />
      );
    }
    case 'splitHero': {
      return (
        <SplitHero
          key={block._key}
          breadcrumbLabel={block.breadcrumbLabel}
          eyebrow={block.eyebrow}
          title={block.title}
          titleHighlight={block.titleHighlight}
          lead={block.lead}
          primaryCta={toCta(block.primaryCta)}
          secondaryCta={toCta(block.secondaryCta)}
          image={toImage(block.image, 1400, 1700)}
        />
      );
    }
    case 'contactWays': {
      const items = (
        block.items as
          | Array<{
              icon: 'phone' | 'whatsapp' | 'mail' | 'pin';
              title: string;
              body: string;
              value: string;
              note?: string;
              link?: SanityLink;
            }>
          | undefined
      )?.map((item) => ({
        icon: item.icon,
        title: item.title,
        body: item.body,
        value: item.value,
        note: item.note ?? '',
        href: resolveHref(item.link) ?? '#',
      }));
      return <ContactWays key={block._key} items={items} />;
    }
    case 'personBlock': {
      const person = block.person as
        | {
            initials?: string;
            name?: string;
            role?: string;
            links?: Array<{ label?: string; link?: SanityLink }>;
          }
        | undefined;
      return (
        <Person
          key={block._key}
          image={toImage(block.image, 800, 1000)}
          eyebrow={block.eyebrow}
          title={block.title}
          body={block.body}
          person={
            person?.initials && person.name && person.role
              ? {
                  initials: person.initials,
                  name: person.name,
                  role: person.role,
                  links: (person.links ?? [])
                    .map(toLabeledLink)
                    .filter((link): link is { label: string; href: string } =>
                      Boolean(link),
                    ),
                }
              : undefined
          }
        />
      );
    }
    case 'contactFormSection': {
      const form = block.form as
        | {
            _id?: string;
            title?: string;
            showtitle?: boolean;
            submitButtonText?: string;
            fields?: ContactFormField[];
          }
        | undefined;
      const aside = block.aside as
        | {
            title?: string;
            body?: string;
            items?: Array<{
              icon: 'phone' | 'whatsapp' | 'mail' | 'pin';
              title: string;
              subtitle?: string;
            }>;
            cta?: SanityCta;
          }
        | undefined;
      const recaptcha = block.recaptcha as
        { recaptchaEnabled?: boolean; recaptchaSiteKey?: string } | undefined;

      return (
        <ContactForm
          key={block._key}
          eyebrow={block.eyebrow}
          title={block.title}
          lead={block.lead}
          note={block.note}
          successTitle={block.successTitle}
          successBody={block.successBody}
          form={
            form?._id && form.fields?.length
              ? {
                  id: form._id,
                  title: form.title,
                  showtitle: form.showtitle,
                  fields: form.fields,
                  submitButtonText: form.submitButtonText,
                }
              : undefined
          }
          aside={
            aside?.title && aside.body
              ? {
                  title: aside.title,
                  body: aside.body,
                  items: (aside.items ?? []).map((item) => ({
                    icon: item.icon,
                    title: item.title,
                    subtitle: item.subtitle ?? '',
                  })),
                  cta: toCta(aside.cta),
                }
              : undefined
          }
          recaptcha={
            recaptcha?.recaptchaEnabled && recaptcha.recaptchaSiteKey
              ? { enabled: true, siteKey: recaptcha.recaptchaSiteKey }
              : undefined
          }
        />
      );
    }
    case 'highlightStrip': {
      return (
        <HighlightStrip
          key={block._key}
          badge={block.badge ?? undefined}
          icon={block.icon as BlockIconName | undefined}
          title={block.title ?? undefined}
          body={block.body ?? undefined}
          cta={toCta(block.cta)}
        />
      );
    }
    case 'routeBlock': {
      return (
        <RouteBlock
          key={block._key}
          eyebrow={block.eyebrow}
          title={block.title}
          lead={block.lead}
          columns={block.columns as { title: string; body: string }[] | undefined}
          cta={toCta(block.cta)}
          image={toImage(block.image, 900, 1125)}
        />
      );
    }
    default: {
      // `block` is hier `never`: de switch dekt elk bloktype dat PAGE_QUERY kan
      // teruggeven. Een nieuw blok in het schema laat TypeScript hier stuklopen
      // — de waarschuwing blijft staan voor data die ouder is dan deze build.
      const unknownBlock: { _type: string } = block;
      console.warn(`Unknown page builder block type: ${unknownBlock._type}`);
      return null;
    }
  }
}

export function PageBuilder({ content }: { content?: PageBlock[] | null }) {
  if (!Array.isArray(content) || content.length === 0) return null;

  return <>{content.map((block) => renderBlock(block))}</>;
}
