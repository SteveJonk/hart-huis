import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { RevealLink } from '@/components/ui/RevealLink';
import { SectionHead } from '@/components/ui/SectionHead';
import { Wrap } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';
import { LISTINGS, type Listing } from '@/lib/home-content';
import { REGIONS } from '@/lib/site';

function ListingCard({ listing }: { listing: Listing }) {
  return (
    <RevealLink
      href={listing.href}
      delay={listing.delay}
      className={cn(
        'group block overflow-hidden rounded bg-white',
        'transition-[transform,box-shadow] duration-500 ease-brand hover:shadow-listing',
      )}
    >
      <div className='relative aspect-[4/3] overflow-hidden'>
        <span
          className={cn(
            'absolute top-4 left-4 z-[2] rounded-pill px-[13px] py-[7px]',
            'text-[0.66rem] font-semibold tracking-[0.14em] uppercase',
            listing.sold ? 'bg-burgundy text-white' : 'bg-white text-ink',
          )}
        >
          {listing.status}
        </span>
        <Image
          src={listing.image}
          alt={listing.imageAlt}
          width={800}
          height={600}
          className='h-full w-full object-cover transition-transform duration-[1100ms] ease-brand group-hover:scale-[1.06]'
        />
      </div>
      <div className='px-[26px] pt-6 pb-[26px]'>
        <div className='mb-2 text-[0.74rem] font-semibold tracking-[0.16em] text-ink-45 uppercase'>
          {listing.place}
        </div>
        <h3 className='mb-4 font-sans text-[1.12rem] font-semibold tracking-normal'>
          {listing.title}
        </h3>
        <div className='flex items-baseline justify-between border-t border-cream pt-4 text-[0.86rem] text-ink-70'>
          <span>{listing.meta}</span>
          <b className='font-display text-[1.3rem] font-medium text-ink'>
            {listing.price}
          </b>
        </div>
      </div>
    </RevealLink>
  );
}

export function Listings() {
  return (
    <section className='pb-[126px] max-sm:pb-[82px]'>
      <Wrap>
        <Reveal>
          <SectionHead>
            <h2>Actueel aanbod</h2>
            <Button href='#' variant='ink'>
              Bekijk alle woningen
            </Button>
          </SectionHead>
        </Reveal>

        <div className='grid grid-cols-3 gap-7 max-md:grid-cols-2 max-sm:grid-cols-1'>
          {LISTINGS.map((listing) => (
            <ListingCard key={listing.title} listing={listing} />
          ))}
        </div>

        <Reveal className='mt-[46px] flex flex-wrap items-center gap-x-3.5 gap-y-2.5 text-[0.86rem] text-ink-45'>
          <span className='mr-1.5'>Ook actief in:</span>
          {REGIONS.map((region) => (
            <a
              key={region}
              href='#'
              className={cn(
                'rounded-pill border border-ink/16 px-[15px] py-[7px]',
                'transition duration-300 ease-brand hover:border-ink hover:bg-ink hover:text-cream',
              )}
            >
              {region}
            </a>
          ))}
        </Reveal>
      </Wrap>
    </section>
  );
}
