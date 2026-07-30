import type { SanityImageSource } from '@sanity/image-url';
import { Hero, type HeroProps } from '@/components/blocks/Hero';
import { urlFor } from '@/sanity/image';

type SanityCta = {
  label?: string;
  href?: string;
};

type SanityHeroSlide = SanityImageSource & {
  _key?: string;
  alt?: string;
};

type HeroBlock = {
  _type: 'hero';
  _key: string;
  slides?: SanityHeroSlide[];
  eyebrow?: string;
  title?: string;
  titleHighlight?: string;
  lead?: string;
  primaryCta?: SanityCta;
  secondaryCta?: SanityCta;
  badgeValue?: string;
  badgeLabel?: string;
};

type PageBlock = HeroBlock | { _type: string; _key: string };

function toHeroProps(block: HeroBlock): HeroProps {
  return {
    slides: block.slides
      ?.map((slide) => {
        const src = urlFor(slide)?.width(2400).height(1600).fit('crop').url();
        if (!src) return null;
        return { src, alt: slide.alt ?? '' };
      })
      .filter((slide): slide is { src: string; alt: string } => slide !== null),
    eyebrow: block.eyebrow,
    title: block.title,
    titleHighlight: block.titleHighlight,
    lead: block.lead,
    primaryCta:
      block.primaryCta?.label && block.primaryCta?.href
        ? { label: block.primaryCta.label, href: block.primaryCta.href }
        : undefined,
    secondaryCta:
      block.secondaryCta?.label && block.secondaryCta?.href
        ? { label: block.secondaryCta.label, href: block.secondaryCta.href }
        : undefined,
    badgeValue: block.badgeValue,
    badgeLabel: block.badgeLabel,
  };
}

const blockMap = {
  hero: (block: HeroBlock) => <Hero key={block._key} {...toHeroProps(block)} />,
} as const;

export function PageBuilder({ content }: { content?: PageBlock[] | null }) {
  if (!Array.isArray(content) || content.length === 0) return null;

  return (
    <>
      {content.map((block) => {
        if (block._type === 'hero') {
          return blockMap.hero(block as HeroBlock);
        }

        console.warn(`Unknown page builder block type: ${block._type}`);
        return null;
      })}
    </>
  );
}
