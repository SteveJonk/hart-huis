import { LogoMark } from '@/components/ui/LogoMark';
import { Wrap } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';
import { SITE, type FooterLinkGroup, type NavLink } from '@/lib/site';
import { imageSrc, type SanityImage } from '@/sanity/image';
import Image from 'next/image';
import Link from 'next/link';
import { FOOTER_QUERY_RESULT } from '@/sanity/sanity.types';

function FooterLinkList({ links }: { links: NavLink[] }) {
  return (
    <ul className='list-none'>
      {links.map((link) => (
        <li key={link.label} className='mb-[11px] text-[0.92rem] max-md:mb-0.5'>
          <Link
            href={link.href}
            className='opacity-90 transition-opacity duration-200 hover:underline hover:opacity-100 hover:underline-offset-4 max-md:inline-block max-md:py-3'
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

type CertificationLogo = {
  alt: string;
  url?: string | null;
  asset: SanityImage | null;
};

type SiteFooterProps = {
  logo?: {
    alt: string;
    url: string | null;
  } | null;
  paragraph?: string | null;
  linkGroups?: FooterLinkGroup[] | null;
  copyright?: string | null;
  certificationLogos?: CertificationLogo[] | null;
};

export function SiteFooter({
  linkGroups = [],
  copyright,
  certificationLogos,
  logo,
}: SiteFooterProps) {
  const groups = linkGroups ?? [];
  const logos = certificationLogos?.map((logo) => ({
    src: imageSrc(logo.asset, 160),
    url: logo.url ?? '',
    alt: logo.alt ?? '',
  }));

  return (
    <footer className='bg-ink pt-24 pb-[34px] text-mist max-sm:pt-[74px]'>
      <Wrap>
        <div
          className={cn(
            'mb-[70px] grid grid-cols-[1.5fr_1fr_1fr_1.1fr] gap-12',
            'max-md:grid-cols-2 max-md:gap-10',
            'max-sm:mb-[46px] max-sm:grid-cols-1 max-sm:gap-[38px]',
          )}
        >
          <div>
            <LogoMark variant='footer' logo={logo} />
            <p className='max-w-[270px] text-[0.9rem] leading-[1.75] text-taupe'>
              Jouw NVM-makelaar voor verkoop, aankoop en taxaties in Haarlem en
              omstreken.
            </p>
          </div>
          {groups.map((group) => (
            <div key={group.title}>
              <h5 className='mb-5 text-eyebrow font-semibold tracking-[0.22em] text-stone uppercase'>
                {group.title}
              </h5>
              <FooterLinkList links={group.links ?? []} />
            </div>
          ))}
          <div>
            <h5 className='mb-5 text-eyebrow font-semibold tracking-[0.22em] text-stone uppercase'>
              Contact
            </h5>
            <ul className='list-none'>
              <li className='mb-[11px] text-[0.92rem] max-md:mb-0.5'>
                {SITE.address[0]}
                <br />
                {SITE.address[1]}
              </li>
              <li className='mb-[11px] text-[0.92rem] max-md:mb-0.5'>
                <Link
                  href={SITE.phoneHref}
                  className='opacity-90 transition-opacity duration-200 hover:underline hover:opacity-100 hover:underline-offset-4 max-md:inline-block max-md:py-3'
                >
                  {SITE.phone}
                </Link>
              </li>
              <li className='mb-[11px] text-[0.92rem] max-md:mb-0.5'>
                <Link
                  href={SITE.emailHref}
                  className='opacity-90 transition-opacity duration-200 hover:underline hover:opacity-100 hover:underline-offset-4 max-md:inline-block max-md:py-3'
                >
                  {SITE.email}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div
          className={cn(
            'flex flex-wrap items-center justify-between gap-4 border-t border-white/13 pt-[26px]',
            'text-[0.78rem] text-stone max-sm:gap-[18px] max-sm:text-[0.74rem]',
          )}
        >
          <span>
            {copyright ||
              '© 2026 Hart & Huis Makelaardij — Algemene voorwaarden · Privacy'}
          </span>
          {logos && (
            <div className='flex flex-wrap items-center gap-5'>
              {logos.map(
                (logo, index) =>
                  logo.src &&
                  (logo.url ? (
                    <Link key={logo.alt || index} href={logo.url} target='_blank'>
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={72}
                        height={40}
                        className='h-8 w-auto object-contain opacity-70 brightness-80 transition-opacity duration-200 hover:opacity-100'
                      />
                    </Link>
                  ) : (
                    <Image
                      key={logo.alt || index}
                      src={logo.src}
                      alt={logo.alt}
                      width={72}
                      height={40}
                      className='h-8 w-auto object-contain opacity-70 brightness-80 transition-opacity duration-200 hover:opacity-100'
                    />
                  )),
              )}
            </div>
          )}
        </div>
      </Wrap>
    </footer>
  );
}
