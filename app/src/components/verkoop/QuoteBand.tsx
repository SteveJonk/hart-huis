import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Wrap } from "@/components/ui/Wrap";
import { VERKOOP_QUOTE } from "@/lib/verkoop-content";

export function QuoteBand() {
  const q = VERKOOP_QUOTE;

  return (
    <section className="py-[124px] max-sm:py-[84px]">
      <Wrap className="grid grid-cols-[0.78fr_1.22fr] items-center gap-[70px] max-lg:gap-[52px] max-md:grid-cols-1">
        <Reveal className="overflow-hidden rounded-arch max-md:aspect-[3/4] max-md:max-w-[440px] max-sm:max-w-none">
          <div className="relative aspect-[4/5] max-md:aspect-[3/4]">
            <Image
              src={q.image}
              alt={q.imageAlt}
              fill
              sizes="(max-width: 960px) 440px, 38vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={1}>
          <Eyebrow>Een verkoper vertelt</Eyebrow>
          <blockquote className="mb-7 font-display text-[clamp(1.4rem,2.5vw,2.15rem)] leading-[1.42] italic max-sm:mb-6 max-sm:text-[1.3rem]">
            “{q.quote}”
          </blockquote>
          <div className="flex items-center gap-3.5">
            <span className="grid size-[46px] place-items-center rounded-full bg-sand text-[0.82rem] font-semibold">
              {q.initials}
            </span>
            <span>
              <b className="block text-[0.95rem]">{q.name}</b>
              <span className="text-[0.82rem] text-ink-45">{q.place}</span>
            </span>
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}
