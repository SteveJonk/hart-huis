import type { SanityImageSource } from '@sanity/image-url';
import { Benefits } from '@/components/blocks/Benefits';
import { CrossLinks } from '@/components/blocks/CrossLinks';
import { CtaBand } from '@/components/blocks/CtaBand';
import { FactBar } from '@/components/blocks/FactBar';
import { Faq } from '@/components/blocks/Faq';
import { Hero } from '@/components/blocks/Hero';
import { Intro } from '@/components/blocks/Intro';
import { Listings } from '@/components/blocks/Listings';
import { PageHero } from '@/components/blocks/PageHero';
import { QuoteBand } from '@/components/blocks/QuoteBand';
import { RegionBlock } from '@/components/blocks/RegionBlock';
import { Reviews } from '@/components/blocks/Reviews';
import { Services } from '@/components/blocks/Services';
import { Steps } from '@/components/blocks/Steps';
import { Stories } from '@/components/blocks/Stories';
import { urlFor } from '@/sanity/image';

type SanityImage = SanityImageSource & {
  _key?: string;
  alt?: string;
};

type Cta = { label?: string; href?: string };

type PageBlock = {
  _type: string;
  _key: string;
  [key: string]: unknown;
};

function imageSrc(
  source: SanityImage | undefined | null,
  width: number,
  height?: number,
): string | null {
  if (!source) return null;
  let builder = urlFor(source)?.width(width);
  if (height) builder = builder?.height(height).fit('crop');
  return builder?.url() ?? null;
}

function toImage(
  source: SanityImage | undefined | null,
  width: number,
  height?: number,
): { src: string; alt: string } | undefined {
  const src = imageSrc(source, width, height);
  if (!src) return undefined;
  return { src, alt: source?.alt ?? '' };
}

function toCta(cta: Cta | undefined | null) {
  if (!cta?.label || !cta?.href) return undefined;
  return { label: cta.label, href: cta.href };
}

function renderBlock(block: PageBlock) {
  switch (block._type) {
    case 'hero': {
      const slides = (block.slides as SanityImage[] | undefined)
        ?.map((slide) => toImage(slide, 2400, 1600))
        .filter((slide): slide is { src: string; alt: string } => Boolean(slide));
      return (
        <Hero
          key={block._key}
          slides={slides}
          eyebrow={block.eyebrow as string | undefined}
          title={block.title as string | undefined}
          titleHighlight={block.titleHighlight as string | undefined}
          lead={block.lead as string | undefined}
          primaryCta={toCta(block.primaryCta as Cta)}
          secondaryCta={toCta(block.secondaryCta as Cta)}
          badgeValue={block.badgeValue as string | undefined}
          badgeLabel={block.badgeLabel as string | undefined}
        />
      );
    }
    case 'intro': {
      return (
        <Intro
          key={block._key}
          image={toImage(block.image as SanityImage, 800, 1000)}
          stampValue={block.stampValue as string | undefined}
          stampLabel={block.stampLabel as string | undefined}
          eyebrow={block.eyebrow as string | undefined}
          title={block.title as string | undefined}
          titleHighlight={block.titleHighlight as string | undefined}
          leads={block.leads as string[] | undefined}
          facts={block.facts as { value: string; label: string }[] | undefined}
          link={toCta(block.link as Cta)}
        />
      );
    }
    case 'services': {
      const items = (block.items as Array<{
        label: string;
        title: string;
        description: string;
        image: SanityImage;
        href: string;
      }> | undefined)?.map((item, index) => ({
        label: item.label,
        title: item.title,
        description: item.description,
        href: item.href,
        image: toImage(item.image, 640, 768) ?? { src: '', alt: '' },
        delay: (index === 0 ? undefined : index) as 1 | 2 | 3 | undefined,
      }));
      const nvm = block.nvm as
        | { badge?: string; title?: string; body?: string; cta?: Cta }
        | undefined;
      return (
        <Services
          key={block._key}
          title={block.title as string | undefined}
          lead={block.lead as string | undefined}
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
          image={toImage(block.image as SanityImage, 900, 1200)}
          secondaryImage={toImage(block.secondaryImage as SanityImage, 600, 400)}
          eyebrow={block.eyebrow as string | undefined}
          title={block.title as string | undefined}
          quote={block.quote as string | undefined}
          attribution={block.attribution as string | undefined}
          cta={toCta(block.cta as Cta)}
        />
      );
    }
    case 'reviews': {
      const reviews = (
        block.reviews as Array<{
          quote?: string;
          initials?: string;
          name?: string;
          place?: string;
          source?: string;
        }> | undefined
      )
        ?.filter((review) => review?.quote && review?.name)
        .map((review) => ({
          quote: review.quote!,
          initials: review.initials ?? '',
          name: review.name!,
          place: review.place ?? '',
          source: review.source ?? '',
        }));
      return (
        <Reviews
          key={block._key}
          score={block.score as string | undefined}
          scoreLabel={block.scoreLabel as string | undefined}
          reviewCountLabel={block.reviewCountLabel as string | undefined}
          intro={block.intro as string | undefined}
          reviews={reviews}
          link={toCta(block.link as Cta)}
        />
      );
    }
    case 'listings': {
      const items = (
        block.items as Array<{
          status: string;
          sold?: boolean;
          place: string;
          title: string;
          meta: string;
          price: string;
          image: SanityImage;
          href: string;
        }> | undefined
      )?.map((item, index) => ({
        status: item.status,
        sold: item.sold,
        place: item.place,
        title: item.title,
        meta: item.meta,
        price: item.price,
        href: item.href,
        image: toImage(item.image, 800, 600) ?? { src: '', alt: '' },
        delay: (index === 0 ? undefined : index) as 1 | 2 | 3 | undefined,
      }));
      return (
        <Listings
          key={block._key}
          title={block.title as string | undefined}
          cta={toCta(block.cta as Cta)}
          items={items}
          regionsLabel={block.regionsLabel as string | undefined}
          regions={block.regions as { label: string; href: string }[] | undefined}
        />
      );
    }
    case 'ctaBand': {
      return (
        <CtaBand
          key={block._key}
          image={toImage(block.image as SanityImage, 2400, 1200)}
          eyebrow={block.eyebrow as string | undefined}
          title={block.title as string | undefined}
          body={block.body as string | undefined}
          primaryCta={toCta(block.primaryCta as Cta)}
          secondaryCta={toCta(block.secondaryCta as Cta)}
        />
      );
    }
    case 'pageHero': {
      return (
        <PageHero
          key={block._key}
          image={toImage(block.image as SanityImage, 2400, 1600)}
          breadcrumbLabel={block.breadcrumbLabel as string | undefined}
          eyebrow={block.eyebrow as string | undefined}
          title={block.title as string | undefined}
          titleHighlight={block.titleHighlight as string | undefined}
          lead={block.lead as string | undefined}
          primaryCta={toCta(block.primaryCta as Cta)}
          secondaryCta={toCta(block.secondaryCta as Cta)}
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
          eyebrow={block.eyebrow as string | undefined}
          title={block.title as string | undefined}
          lead={block.lead as string | undefined}
          image={toImage(block.image as SanityImage, 900, 1125)}
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
        block.items as Array<{
          number: string;
          title: string;
          body: string;
          image: SanityImage;
        }> | undefined
      )?.map((item) => ({
        number: item.number,
        title: item.title,
        body: item.body,
        image: imageSrc(item.image, 900, 1125) ?? '',
      }));
      return (
        <Steps
          key={block._key}
          eyebrow={block.eyebrow as string | undefined}
          title={block.title as string | undefined}
          lead={block.lead as string | undefined}
          cta={toCta(block.cta as Cta)}
          items={items}
        />
      );
    }
    case 'quoteBand': {
      return (
        <QuoteBand
          key={block._key}
          image={toImage(block.image as SanityImage, 800, 1000)}
          eyebrow={block.eyebrow as string | undefined}
          quote={block.quote as string | undefined}
          initials={block.initials as string | undefined}
          name={block.name as string | undefined}
          place={block.place as string | undefined}
        />
      );
    }
    case 'faqs': {
      const items = (
        block.faqs as Array<{
          title?: string;
          answer?: string;
          link?: Cta;
          afterLink?: string;
        }> | undefined
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
          eyebrow={block.eyebrow as string | undefined}
          title={block.title as string | undefined}
          intro={block.intro as string | undefined}
          link={toCta(block.link as Cta)}
          items={items}
        />
      );
    }
    case 'regionBlock': {
      return (
        <RegionBlock
          key={block._key}
          eyebrow={block.eyebrow as string | undefined}
          title={block.title as string | undefined}
          lead={block.lead as string | undefined}
          places={block.places as { label: string; href: string }[] | undefined}
        />
      );
    }
    case 'crossLinks': {
      return (
        <CrossLinks
          key={block._key}
          items={
            block.items as
              | Array<{ title: string; body: string; href: string }>
              | undefined
          }
        />
      );
    }
    default:
      console.warn(`Unknown page builder block type: ${block._type}`);
      return null;
  }
}

export function PageBuilder({ content }: { content?: PageBlock[] | null }) {
  if (!Array.isArray(content) || content.length === 0) return null;

  return <>{content.map((block) => renderBlock(block))}</>;
}
