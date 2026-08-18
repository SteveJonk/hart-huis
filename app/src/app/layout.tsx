import type { Metadata } from 'next';
import { Inter_Tight, Schibsted_Grotesk } from 'next/font/google';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { toLabeledHref, type SanityLabeledLink } from '@/lib/links';
import { SITE, type FooterLinkGroup, type NavLink } from '@/lib/site';
import { client } from '@/sanity/client';
import { FOOTER_QUERY, NAVIGATION_QUERY } from '@/sanity/queries';
import './globals.css';

const display = Schibsted_Grotesk({
  variable: '--font-schibsted',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const sans = Inter_Tight({
  variable: '--font-inter-tight',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const options = { next: { revalidate: 30 } };

function asNavLinks(links: SanityLabeledLink[] | null | undefined): NavLink[] {
  return (links ?? [])
    .map((link) => toLabeledHref(link))
    .filter((link): link is NavLink => Boolean(link));
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [navigation, footer] = await Promise.all([
    client.fetch(NAVIGATION_QUERY, {}, options),
    client.fetch(FOOTER_QUERY, {}, options),
  ]);

  const navLeft = asNavLinks(navigation?.navLeft);
  const navRight = asNavLinks(navigation?.navRight);

  // flatMap in plaats van filter + type-predicate: het queryresultaat is een
  // union (een ontbrekend document geeft overal null), en een predicate zou
  // daar een eigen vorm overheen leggen die niet meer klopt.
  const linkGroups: FooterLinkGroup[] = (footer?.linkGroups ?? []).flatMap((group) =>
    group.title ? [{ title: group.title, links: asNavLinks(group.links) }] : [],
  );

  return (
    <html
      lang='nl'
      data-scroll-behavior='smooth'
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <head>
        <meta name='apple-mobile-web-app-title' content='MyWebSite' />
      </head>
      <body className='min-h-full'>
        <SiteHeader navLeft={navLeft} navRight={navRight} logo={navigation?.logo} />
        {children}
        <SiteFooter
          logo={footer?.logo}
          linkGroups={linkGroups}
          copyright={footer?.copyright}
          certificationLogos={footer?.certificationLogos}
        />
        <WhatsAppButton />
      </body>
    </html>
  );
}
