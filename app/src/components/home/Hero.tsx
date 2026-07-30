import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { HERO_SLIDES } from "@/lib/home-content";
import { SITE } from "@/lib/site";

export function Hero() {
  return (
    <header className="hero">
      <div className="hero__slides">
        {HERO_SLIDES.map((slide, index) => (
          <div key={slide.src} className="hero__slide">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <div className="hero__veil" />
      <div className="hero__inner">
        <div className="hero__grid">
          <span className="eyebrow eyebrow--light">
            NVM-makelaar in Haarlem en omstreken
          </span>
          <h1>
            Je voelt je thuis bij <em>Hart &amp; Huis</em>
          </h1>
          <p>
            Verkopen, kopen of taxeren in Haarlem — met twee makelaars die je bij
            naam kennen, de buurt op hun duimpje kennen en de tijd nemen voor jouw
            verhaal.
          </p>
          <div className="hero__actions">
            <Button href="#" variant="primary">
              Wat is mijn huis waard?
            </Button>
            <Button href="#" variant="line">
              Bekijk het aanbod
            </Button>
          </div>
        </div>
      </div>
      <div className="hero__bar">
        <div className="scrollcue">
          <i /> Scroll
        </div>
        <div className="fundabadge">
          <div>
            <b>{SITE.fundaScore}</b>
            <small>OP FUNDA</small>
          </div>
        </div>
      </div>
    </header>
  );
}
