import { cn } from '@/lib/cn';

type LogoMarkProps = {
  className?: string;
  /** Header mark responds to sticky/mobile; footer is a fixed 90px mark. */
  variant?: 'header' | 'footer';
  /** When true (header only), shrinks the mark and hides the subtitle. */
  stuck?: boolean;
  /** CMS override: renders this image instead of the Hart & Huis wordmark. */
  logo?: { url: string | null; alt: string } | null;
};

export function LogoMark({
  className,
  variant = 'header',
  stuck = false,
  logo,
}: LogoMarkProps) {
  const isFooter = variant === 'footer';

  return (
    <span
      className={cn(
        'grid shrink-0 place-items-center',
        'size-[var(--mk)] transition-transform duration-[400ms] ease-brand',
        isFooter
          ? 'mb-[26px] [--mk:90px]'
          : stuck
            ? '[--mk:56px] max-md:[--mk:54px]'
            : '[--mk:80px] max-md:[--mk:66px]',
        className,
      )}
    >
      {logo?.url /* eslint-disable-next-line @next/next/no-img-element -- CMS logo may be SVG; next/image can't optimize those. */ && (
        <img
          src={logo.url}
          alt={logo?.alt ?? 'Website Logo'}
          className='object-contain'
        />
      )}
    </span>
  );
}
