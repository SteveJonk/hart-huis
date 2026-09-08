import type { Metadata } from 'next';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Wrap } from '@/components/ui/Wrap';
import { SentryTests } from './SentryTests';

export const metadata: Metadata = {
  title: 'Sentry-testpagina',
  robots: { index: false, follow: false },
};

/**
 * Handmatige controle of Sentry echt fouten ontvangt — het equivalent van de
 * pagina die de Sentry-wizard aanmaakt, in de huisstijl van deze site.
 * Staat niet in de navigatie of de sitemap en is op noindex gezet.
 * Verwijderen kan zonder gevolgen: deze map plus src/app/api/sentry-example-api.
 */
export default function SentryExamplePage() {
  return (
    <main className='py-24 max-sm:py-16'>
      <Wrap className='max-w-3xl'>
        <Eyebrow>Diagnose</Eyebrow>
        <h1 className='mb-5 text-[clamp(2rem,4vw,3rem)]'>Werkt Sentry?</h1>
        <p className='mb-10 max-w-[52ch] leading-[1.7] text-ink-70'>
          Elke knop veroorzaakt met opzet een fout. Verschijnt die daarna in het
          Sentry-project <code>stef-43 / javascript-nextjs</code>, dan is de
          koppeling in orde. Deze pagina is een testgereedschap, geen onderdeel
          van de site.
        </p>
        <SentryTests />
      </Wrap>
    </main>
  );
}
