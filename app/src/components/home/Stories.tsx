import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Wrap } from "@/components/ui/Wrap";
import { cn } from "@/lib/cn";

export function Stories() {
  return (
    <section className="relative bg-sand py-[130px] max-sm:py-[82px]">
      <Wrap
        className={cn(
          "grid grid-cols-[1.05fr_0.95fr] items-center gap-20",
          "max-md:grid-cols-1 max-md:gap-14",
        )}
      >
        <Reveal
          className={cn(
            "relative -mt-[190px] h-[600px]",
            "max-md:mt-0 max-md:h-[430px] max-sm:h-[380px] max-xs:h-[330px]",
          )}
        >
          <div className="absolute top-0 left-0 h-full w-[70%] overflow-hidden rounded-arch max-sm:w-[74%]">
            <Image
              src="/images/story-big.jpg"
              alt="Een straat in Haarlem bij zonsondergang"
              width={900}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
          <div
            className={cn(
              "absolute right-0 bottom-10 h-[42%] w-[46%] overflow-hidden rounded shadow-story",
              "max-sm:bottom-0 max-sm:h-[38%] max-sm:w-[52%]",
            )}
          >
            <Image
              src="/images/story-small.jpg"
              alt="Gevels in het centrum van Haarlem"
              width={600}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={1}>
          <Eyebrow>Klanten vertellen</Eyebrow>
          <h2 className="mb-6 max-w-[14ch] text-[clamp(2.1rem,4vw,3.5rem)]">
            Van Amsterdam naar de Kleverparkbuurt
          </h2>
          <blockquote
            className={cn(
              "mb-[26px] border-l border-ink/25 pl-[26px] font-display text-[1.32rem] leading-normal italic",
              "max-sm:pl-[18px] max-sm:text-[1.12rem]",
            )}
          >
            &ldquo;We zochten al anderhalf jaar. Binnen zes weken stonden we met
            de sleutel in onze hand — in de straat waar we stiekem altijd al
            wilden wonen.&rdquo;
          </blockquote>
          <div className="mb-[34px] text-[0.82rem] font-semibold tracking-[0.14em] text-ink-70 uppercase">
            Sanne &amp; Joost — Haarlem
          </div>
          <Button href="#" variant="ink">
            Lees hun verhaal
          </Button>
        </Reveal>
      </Wrap>
    </section>
  );
}
