import { ListingCard, type ListingItem } from '@/components/blocks/Listings';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Wrap } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';
import { OBJECT_SIMILAR } from '@/lib/object-content';

type SimilarObjectsProps = {
  items: ListingItem[];
};

/** "Vergelijkbare woningen" — the home page's listing card on a sand band. */
export function SimilarObjects({ items }: SimilarObjectsProps) {
  if (items.length === 0) return null;

  return (
    <section className='bg-sand py-28 max-sm:py-[82px]'>
      <Wrap>
        <Reveal
          className={cn(
            'mb-11 flex flex-wrap items-end justify-between gap-7',
            'max-sm:mb-[30px] max-sm:[&>a]:w-full max-sm:[&>a]:justify-center',
          )}
        >
          <div>
            <Eyebrow>{OBJECT_SIMILAR.eyebrow}</Eyebrow>
            <h2 className='text-[clamp(1.9rem,3.4vw,2.7rem)]'>{OBJECT_SIMILAR.title}</h2>
          </div>
          <Button href={OBJECT_SIMILAR.cta.href} variant='ink'>
            {OBJECT_SIMILAR.cta.label}
          </Button>
        </Reveal>

        <div className='grid grid-cols-3 gap-7 max-md:grid-cols-2 max-sm:grid-cols-1'>
          {items.map((item) => (
            <ListingCard key={item.href} listing={item} />
          ))}
        </div>
      </Wrap>
    </section>
  );
}
