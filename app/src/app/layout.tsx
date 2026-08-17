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

type SanityNavigation = {
  navLeft?: SanityLabeledLink[] | null;
  navRight?: SanityLabeledLink[] | null;
} | null;

type SanityFooter = {
  paragraph?: string | null;
  linkGroups?: Array<{
    title?: string | null;
    links?: SanityLabeledLink[] | null;
  } | null> | null;
  copyright?: string | null;
} | null;

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
    client.fetch<SanityNavigation>(NAVIGATION_QUERY, {}, options),
    client.fetch<SanityFooter>(FOOTER_QUERY, {}, options),
  ]);

  const navLeft = asNavLinks(navigation?.navLeft);
  const navRight = asNavLinks(navigation?.navRight);

  const linkGroups: FooterLinkGroup[] = (footer?.linkGroups ?? [])
    .filter((group): group is { title: string; links?: SanityLabeledLink[] | null } =>
      Boolean(group?.title),
    )
    .map((group) => ({
      title: group.title,
      links: asNavLinks(group.links),
    }));

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
        <SiteHeader navLeft={navLeft} navRight={navRight} />
        {children}
        <SiteFooter linkGroups={linkGroups} copyright={footer?.copyright} />
        <WhatsAppButton />
      </body>
    </html>
  );
}
