import { Strip } from '@/components/ui/Strip';
import { Wrap } from '@/components/ui/Wrap';
import type { BlockIconName } from '@/components/ui/BlockIcon';
import { AANKOOP_ZOEKOPDRACHT } from '@/lib/aankoop-content';

export type HighlightStripCta = {
  label: string;
  href: string;
};

export type HighlightStripProps = {
  /** Text in the round mark. Ignored when an icon is picked. */
  badge?: string;
  icon?: BlockIconName;
  title?: string;
  body?: string;
  cta?: HighlightStripCta;
};

const DEFAULTS = {
  icon: AANKOOP_ZOEKOPDRACHT.icon,
  title: AANKOOP_ZOEKOPDRACHT.title,
  body: AANKOOP_ZOEKOPDRACHT.body,
  cta: AANKOOP_ZOEKOPDRACHT.cta as HighlightStripCta,
};

/** The dark strip from the services block, as a section of its own. */
export function HighlightStrip({
  badge,
  icon = badge ? undefined : DEFAULTS.icon,
  title = DEFAULTS.title,
  body = DEFAULTS.body,
  cta = DEFAULTS.cta,
}: HighlightStripProps = {}) {
  return (
    <section className='pb-[118px] max-sm:pb-[82px]'>
      <Wrap>
        <Strip badge={badge} icon={icon} title={title} body={body} cta={cta} />
      </Wrap>
    </section>
  );
}
