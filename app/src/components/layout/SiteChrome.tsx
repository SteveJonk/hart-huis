import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { toLabeledHref, type SanityLabeledLink } from '@/lib/links';
import { type FooterLinkGroup, type NavLink } from '@/lib/site';
import { client } from '@/sanity/client';
import { FOOTER_QUERY, NAVIGATION_QUERY } from '@/sanity/queries';

const options = { next: { revalidate: 30 } };

function asNavLinks(links: SanityLabeledLink[] | null | undefined): NavLink[] {
  return (links ?? [])
    .map((link) => toLabeledHref(link))
    .filter((link): link is NavLink => Boolean(link));
}

type SiteChromeProps = {
  minimal?: boolean;
  children: React.ReactNode;
};

export async function SiteChrome({
  minimal = false,
  children,
}: SiteChromeProps) {
  const [navigation, footer] = await Promise.all([
    client.fetch(NAVIGATION_QUERY, {}, options),
    client.fetch(FOOTER_QUERY, {}, options),
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

  return (
    <>
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
