"use client";

import { ArrowLink } from "@/components/ui/ArrowLink";
import { IconArrow, IconArrowLeft } from "@/components/ui/IconArrow";
import { Reveal } from "@/components/ui/Reveal";
import { useReviewsCarousel } from "@/hooks/useReviewsCarousel";
import { REVIEWS } from "@/lib/home-content";
import { SITE } from "@/lib/site";

export function Reviews() {
  const { trackRef, progress, prev, next } = useReviewsCarousel();

  return (
    <section className="reviews">
      <div className="wrap">
        <Reveal className="reviews__top">
          <div className="reviews__score">
            <div className="scoreringr">
              <div>
                <b>{SITE.fundaScore}</b>
                <small>OP FUNDA</small>
              </div>
            </div>
            <div className="meta">
              <b>{SITE.reviewCount} keer beoordeeld</b>
              Door kopers én verkopers, rechtstreeks vanuit Funda en Google.
            </div>
          </div>
          <div className="rnav">
            <button type="button" aria-label="Vorige" onClick={prev}>
              <IconArrowLeft size={15} />
            </button>
            <button type="button" aria-label="Volgende" onClick={next}>
              <IconArrow size={15} />
            </button>
          </div>
        </Reveal>

        <Reveal>
          <div className="rtrack" ref={trackRef}>
            {REVIEWS.map((review) => (
              <article key={review.initials} className="rcard">
                <span className="qm">&rdquo;</span>
                <p>{review.quote}</p>
                <footer>
                  <span className="ini">{review.initials}</span>
                  <span className="who">
                    <b>{review.name}</b>
                    <span>{review.place}</span>
                  </span>
                  <span className="src">{review.source}</span>
                </footer>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal className="rprog">
          <span style={{ width: `${progress}%` }} />
        </Reveal>

        <Reveal className="mt-[38px]">
          <ArrowLink href="#">Alle beoordelingen bekijken</ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}
