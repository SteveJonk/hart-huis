import { Eyebrow } from '@/components/ui/Eyebrow';
import { Wrap } from '@/components/ui/Wrap';
import { OVER_ONS_OPENER } from '@/lib/over-ons-content';

export type PageOpenerProps = {
  eyebrow?: string;
  title?: string;
  titleHighlight?: string;
  lead?: string;
  motto?: string;
  attribution?: string;
};

const DEFAULTS: Required<PageOpenerProps> = {
  eyebrow: OVER_ONS_OPENER.eyebrow,
  title: OVER_ONS_OPENER.title,
  titleHighlight: OVER_ONS_OPENER.titleEm,
  lead: OVER_ONS_OPENER.lead,
  motto: OVER_ONS_OPENER.motto,
  attribution: OVER_ONS_OPENER.attribution,
};

/** Centred opener for pages without a photo hero (Over ons). */
export function PageOpener({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  titleHighlight = DEFAULTS.titleHighlight,
  lead = DEFAULTS.lead,
  motto = DEFAULTS.motto,
  attribution = DEFAULTS.attribution,
}: PageOpenerProps = {}) {
  return (
    <section
      className='pt-[168px] text-center max-md:pt-[132px] max-sm:pt-[118px]'
      data-solid-header=''
    >
      <Wrap>
        <div className='mx-auto max-w-[940px]'>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1
            className={[
              'mx-auto mb-[26px] max-w-[18ch] text-[clamp(2.5rem,5.4vw,4.4rem)]',
              'max-sm:mb-5 max-sm:max-w-none max-sm:text-[clamp(2.05rem,8.6vw,3.2rem)]',
              'max-xs:text-[2rem]',
            ].join(' ')}
          >
            {title}
            {titleHighlight ? (
              <em className='text-burgundy italic'>{titleHighlight}</em>
            ) : null}
          </h1>
          <p
            className={[
              'mx-auto mb-[34px] max-w-[56ch] text-[1.1rem] leading-[1.75] text-ink-70',
              'max-sm:mb-7 max-sm:max-w-none max-sm:text-[0.99rem]',
            ].join(' ')}
          >
            {lead}
          </p>
          <p
            className={[
              'mx-auto mb-4 max-w-[26ch] font-display text-[clamp(1.2rem,2.2vw,1.7rem)]',
              'leading-[1.45] text-burgundy italic max-sm:max-w-none',
            ].join(' ')}
          >
            {motto}
          </p>
          <p className='text-[0.8rem] font-semibold tracking-[0.18em] text-ink-45 uppercase'>
            {attribution}
          </p>
        </div>
      </Wrap>
    </section>
  );
}
