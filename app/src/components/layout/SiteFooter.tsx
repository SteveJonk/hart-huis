import { LogoMark } from '@/components/ui/LogoMark';
import { Wrap } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';
import { FOOTER_CERTS, SITE, type FooterLinkGroup, type NavLink } from '@/lib/site';
import Link from 'next/link';

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

type SiteFooterProps = {
  paragraph?: string | null;
  linkGroups?: FooterLinkGroup[] | null;
  copyright?: string | null;
};

export function SiteFooter({ linkGroups = [], copyright }: SiteFooterProps) {
  const groups = linkGroups ?? [];

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
            <LogoMark variant='footer' />
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
          <div className='flex gap-2.5 max-sm:flex-wrap'>
            {FOOTER_CERTS.map((cert) => (
              <span
                key={cert}
                className='rounded-pill border border-white/22 px-[13px] py-[5px] text-[0.65rem] tracking-[0.14em]'
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </Wrap>
    </footer>
  );
}
