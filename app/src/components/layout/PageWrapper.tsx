import { JsonLd } from '@/components/JsonLd';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { siteJsonLd } from '@/lib/json-ld';
import { toLabeledHref, type SanityLabeledLink } from '@/lib/links';
import { type FooterLinkGroup, type NavLink } from '@/lib/site';
import { client } from '@/sanity/client';
import {
  FOOTER_QUERY,
  NAVIGATION_QUERY,
  REVIEW_STATS_QUERY,
} from '@/sanity/queries';

const options = { next: { revalidate: 30 } };

function asNavLinks(links: SanityLabeledLink[] | null | undefined): NavLink[] {
  return (links ?? [])
    .map((link) => toLabeledHref(link))
    .filter((link): link is NavLink => Boolean(link));
}

type PageWrapperProps = {
  minimal?: boolean;
  children: React.ReactNode;
};

export async function PageWrapper({
  minimal = false,
  children,
}: PageWrapperProps) {
  const [navigation, footer, stats] = await Promise.all([
    client.fetch(NAVIGATION_QUERY, {}, options),
    client.fetch(FOOTER_QUERY, {}, options),
    client.fetch(REVIEW_STATS_QUERY, {}, options),
  ]);

  const navLeft = asNavLinks(navigation?.navLeft);
  const navRight = asNavLinks(navigation?.navRight);

  // flatMap in plaats van filter + type-predicate: het queryresultaat is een
  // union (een ontbrekend document geeft overal null), en een predicate zou
  // daar een eigen vorm overheen leggen die niet meer klopt.
  const linkGroups: FooterLinkGroup[] = (footer?.linkGroups ?? []).flatMap(
    (group) =>
      group.title
        ? [{ title: group.title, links: asNavLinks(group.links) }]
        : [],
  );

  // De organisatie en de site staan op elke pagina; adres, telefoon, logo en
  // socials komen uit dezelfde documenten als de footer die eronder staat.
  const site = siteJsonLd({
    address: footer?.contactInfo?.address,
    phone: footer?.contactInfo?.phone,
    email: footer?.contactInfo?.email,
    description: footer?.paragraph,
    logoUrl: navigation?.logo?.url ?? footer?.logo?.url,
    sameAs: (footer?.socialLinks ?? []).map((link) => link.url),
    stats,
  });

  return (
    <>
      <JsonLd data={site} />
      <SiteHeader
        navLeft={navLeft}
        navRight={navRight}
        logo={navigation?.logo}
        minimal={minimal}
      />
      {children}
      <SiteFooter
        logo={footer?.logo}
        paragraph={footer?.paragraph}
        contactInfo={footer?.contactInfo}
        linkGroups={linkGroups}
        copyright={footer?.copyright}
        certificationLogos={footer?.certificationLogos}
        socialLinks={footer?.socialLinks}
      />
      {footer?.whatsapp && <WhatsAppButton href={footer.whatsapp} />}
    </>
  );
}
