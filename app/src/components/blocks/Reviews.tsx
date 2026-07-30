"use client";

import { ArrowLink } from "@/components/ui/ArrowLink";
import { IconArrow, IconArrowLeft } from "@/components/ui/IconArrow";
import { Reveal } from "@/components/ui/Reveal";
import { Wrap } from "@/components/ui/Wrap";
import { useReviewsCarousel } from "@/hooks/useReviewsCarousel";
import { cn } from "@/lib/cn";
import { REVIEWS, type Review } from "@/lib/home-content";
import { SITE } from "@/lib/site";

function ReviewCard({ review }: { review: Review }) {
  return (
    <article
      data-review-card
      className={cn(
        "flex shrink-0 basis-[400px] snap-start flex-col rounded bg-white px-[34px] pt-9 pb-[30px]",
        "transition-[transform,box-shadow] duration-500 ease-brand hover:-translate-y-1.5 hover:shadow-card",
        "max-md:basis-[320px] max-sm:basis-[min(83vw,330px)] max-sm:px-[26px] max-sm:pt-[30px] max-sm:pb-[26px]",
      )}
    >
      <span className="mb-5 block h-[26px] font-display text-[3.4rem] leading-[0.55] text-sand">
        &rdquo;
      </span>
      <p className="flex-1 font-display text-[1.18rem] leading-[1.55] text-ink italic max-sm:text-[1.06rem]">
        {review.quote}
      </p>
      <footer className="mt-7 flex items-center gap-[13px] border-t border-cream bg-transparent pt-5">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sand text-[0.8rem] font-semibold tracking-[0.02em] text-white">
          {review.initials}
        </span>
        <span className="min-w-0 flex-1 leading-[1.35]">
          <b className="block text-[0.9rem] font-semibold">{review.name}</b>
          <span className="text-[0.78rem] text-ink-45">{review.place}</span>
        </span>
        <span className="rounded-pill border border-sage-deep/32 px-[11px] py-1.5 text-[0.6rem] font-semibold tracking-[0.16em] text-sage-deep uppercase max-sm:text-[0.64rem]">
          {review.source}
        </span>
      </footer>
    </article>
  );
}

export function Reviews() {
  const { trackRef, progress, prev, next } = useReviewsCarousel();

  return (
    <section className="py-[126px] max-sm:py-[82px]">
      <Wrap>
        <Reveal
          className={cn(
            "mb-12 flex flex-wrap items-end justify-between gap-9",
            "max-sm:mb-12 max-sm:gap-[22px]",
          )}
        >
          <div className="flex items-center gap-[26px] max-sm:gap-[18px]">
            <div
              className={cn(
                "grid size-[132px] shrink-0 place-items-center rounded-full bg-sand text-center",
                "max-md:size-[110px] max-sm:size-[98px]",
              )}
            >
              <div>
                <b
                  className={cn(
                    "block font-display text-[2.6rem] leading-none font-normal",
                    "max-md:text-[2.1rem] max-sm:text-[1.85rem]",
                  )}
                >
                  {SITE.fundaScore}
                </b>
                <small className="mt-1.5 block text-[0.57rem] font-semibold tracking-[0.2em] text-ink-70">
                  OP FUNDA
                </small>
              </div>
            </div>
            <div className="max-w-[230px] text-[0.9rem] leading-[1.6] text-ink-70">
              <b className="mb-1.5 block font-display text-[1.5rem] leading-[1.2] font-normal text-ink max-sm:text-[1.25rem]">
                {SITE.reviewCount} keer beoordeeld
              </b>
              Door kopers én verkopers, rechtstreeks vanuit Funda en Google.
            </div>
          </div>
          <div className="flex gap-2.5 max-sm:hidden">
            <button
              type="button"
              aria-label="Vorige"
              onClick={prev}
              className="grid size-11 place-items-center rounded-full border border-ink/22 transition duration-300 ease-brand hover:border-ink hover:bg-ink hover:text-cream"
            >
              <IconArrowLeft size={15} />
            </button>
            <button
              type="button"
              aria-label="Volgende"
              onClick={next}
              className="grid size-11 place-items-center rounded-full border border-ink/22 transition duration-300 ease-brand hover:border-ink hover:bg-ink hover:text-cream"
            >
              <IconArrow size={15} />
            </button>
          </div>
        </Reveal>

        <Reveal>
          <div
            ref={trackRef}
            className={cn(
              "flex gap-6 overflow-x-auto pb-2 [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden",
              "max-sm:-mx-wrap-md max-sm:scroll-pl-wrap-md max-sm:px-wrap-md",
              "max-xs:-mx-wrap-sm max-xs:scroll-pl-wrap-sm max-xs:px-wrap-sm",
            )}
          >
            {REVIEWS.map((review) => (
              <ReviewCard key={review.initials} review={review} />
            ))}
          </div>
        </Reveal>

        <Reveal className="relative mt-[30px] h-0.5 max-w-[300px] bg-ink/11 max-sm:mt-6 max-sm:max-w-none">
          <span
            className="absolute top-0 left-0 h-full bg-ink transition-[width] duration-[250ms] ease-brand"
            style={{ width: `${progress}%` }}
          />
        </Reveal>

        <Reveal className="mt-[38px]">
          <ArrowLink href="#">Alle beoordelingen bekijken</ArrowLink>
        </Reveal>
      </Wrap>
    </section>
  );
}
