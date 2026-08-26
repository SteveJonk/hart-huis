import type { JsonLdNode } from '@/lib/json-ld';

/**
 * Zet één graaf in de pagina. `<` wordt ge-escaped: een adres of
 * aanbiedingstekst met `</script>` erin zou het script anders afbreken.
 */
export function JsonLd({ data }: { data: JsonLdNode | null | undefined }) {
  if (!data) return null;

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
