import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { Wrap } from "@/components/ui/Wrap";
import {
  WAARDEBEPALING_REVIEWS,
  WAARDEBEPALING_REVIEWS_INTRO,
  type WaardebepalingReview,
} from "@/lib/waardebepaling-content";

export type WaardebepalingReviewsCta = { label: string; href: string };

export type WaardebepalingReviewsProps = {
  score?: string;
  scoreLabel?: string;
  title?: string;
  lead?: string;
  link?: WaardebepalingReviewsCta;
  items?: WaardebepalingReview[];
};

const DEFAULTS: Required<WaardebepalingReviewsProps> = {
  score: WAARDEBEPALING_REVIEWS_INTRO.score,
  scoreLabel: WAARDEBEPALING_REVIEWS_INTRO.scoreLabel,
  title: WAARDEBEPALING_REVIEWS_INTRO.title,
  lead: WAARDEBEPALING_REVIEWS_INTRO.lead,
  link: WAARDEBEPALING_REVIEWS_INTRO.link,
  items: WAARDEBEPALING_REVIEWS,
};

/** Donkere band met scorebadge en drie reviewcitaten naast elkaar. */
export function WaardebepalingReviews({
  score = DEFAULTS.score,
  scoreLabel = DEFAULTS.scoreLabel,
  title = DEFAULTS.title,
  lead = DEFAULTS.lead,
  link = DEFAULTS.link,
  items = DEFAULTS.items,
}: WaardebepalingReviewsProps = {}) {
  return (
    <section className="relative overflow-hidden bg-ink py-[92px] text-cream">
      <div
        className="pointer-events-none absolute -top-[220px] -right-[160px] size-[520px] rounded-full border border-cream/12"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-[240px] -left-[150px] size-[500px] rounded-full bg-cream/4"
        aria-hidden="true"
      />
      <Wrap className="relative z-[2]">
        <Reveal className="mb-[46px] flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="grid size-[74px] shrink-0 place-items-center rounded-full bg-sand text-burgundy">
              <div className="text-center leading-none">
                <b className="block font-display text-[1.5rem]">{score}</b>
                <small className="mt-[3px] block text-[0.5rem] font-semibold tracking-[0.16em]">
                  {scoreLabel}
                </small>
              </div>
            </div>
            <div className="min-w-0">
              <h2 className="mb-[7px] text-[clamp(1.5rem,2.6vw,2.05rem)] leading-[1.15] text-white">
                {title}
              </h2>
              <p className="text-[0.89rem] text-[#b0a09a]">{lead}</p>
            </div>
          </div>
          {link ? (
            <ArrowLink href={link.href} className="text-cream">
              {link.label}
            </ArrowLink>
          ) : null}
        </Reveal>

        <div className="grid grid-cols-3 items-stretch max-md:grid-cols-1 max-md:gap-9">
          {items.map((review, index) => (
            <Reveal
              key={review.meta}
              delay={index === 0 ? undefined : (index as 1 | 2)}
              className="flex flex-col border-l border-cream/16 px-9 first:border-l-0 first:pl-0 last:pr-0 max-md:border-l-0 max-md:px-0"
            >
              <span className="mb-1 font-display text-[2.6rem] leading-none text-cream/25">
                &rdquo;
              </span>
              <p className="mb-[22px] flex-1 text-[0.97rem] leading-[1.72] text-[#ded2cd]">
                {review.quote}
              </p>
              <footer className="mt-auto flex items-center gap-[11px] text-[0.83rem] text-[#b0a09a]">
                <span className="font-display text-[0.95rem] text-sand">{review.score}</span>
                <span>{review.meta}</span>
              </footer>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
