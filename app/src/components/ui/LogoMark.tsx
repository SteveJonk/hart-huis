import { cn } from '@/lib/cn';

type LogoMarkProps = {
  className?: string;
  /** Header mark responds to sticky/mobile; footer is a fixed 90px mark. */
  variant?: 'header' | 'footer';
  /** When true (header only), shrinks the mark and hides the subtitle. */
  stuck?: boolean;
};

export function LogoMark({
  className,
  variant = 'header',
  stuck = false,
}: LogoMarkProps) {
  const isFooter = variant === 'footer';

  return (
    <span
      className={cn(
        'grid shrink-0 place-items-center rounded-full bg-white',
        'size-[var(--mk)] transition-transform duration-[400ms] ease-brand',
        isFooter
          ? 'mb-[26px] [--mk:90px]'
          : stuck
            ? '[--mk:56px] max-md:[--mk:54px]'
            : '[--mk:80px] max-md:[--mk:66px]',
        className,
      )}
    >
      <span className='relative isolate text-center leading-none'>
        <span
          className={cn(
            'absolute top-[53%] z-[1] -translate-y-1/2 font-display text-sand-deep opacity-85',
            'left-[calc(var(--mk)*-0.03)] text-[length:calc(var(--mk)*0.4)]',
          )}
          aria-hidden='true'
        >
          &amp;
        </span>
        <b
          className={cn(
            'relative z-[2] mb-[calc(var(--mk)*0.028)] block border-b border-ink',
            'pb-[calc(var(--mk)*0.012)] font-display text-[length:calc(var(--mk)*0.255)]',
            'font-normal tracking-[0.005em] text-ink',
          )}
        >
          Hart
        </b>
        <b
          className={cn(
            'relative z-[2] mb-[calc(var(--mk)*0.028)] block border-b border-ink',
            'pb-[calc(var(--mk)*0.012)] font-display text-[length:calc(var(--mk)*0.255)]',
            'font-normal tracking-[0.005em] text-ink',
          )}
        >
          Huis
        </b>
        <i
          className={cn(
            'relative z-[2] mt-[calc(var(--mk)*0.055)] block pl-[0.26em] font-sans',
            'text-[length:max(8px,calc(var(--mk)*0.072))] font-normal not-italic',
            'tracking-[0.14em] text-ink',
            !isFooter && 'max-md:hidden',
            !isFooter && stuck && 'hidden',
          )}
        >
          MAKELAARDIJ
        </i>
      </span>
    </span>
  );
}
