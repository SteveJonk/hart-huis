/**
 * Schrijfclient voor server-side routes. Los van `client.ts`, dat leesbaar
 * moet blijven vanuit React-componenten en juist géén token mag dragen.
 *
 * Vereist SANITY_API_WRITE_TOKEN (Editor of hoger) — dezelfde token als de
 * seed-scripts gebruiken. Zet hem in app/.env en in Vercel.
 */
import { createClient, type SanityClient } from 'next-sanity';

export function getWriteClient(): SanityClient {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!projectId) throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID');
  if (!token) {
    throw new Error(
      'Missing SANITY_API_WRITE_TOKEN. Maak een token met Editor-rechten aan op https://www.sanity.io/manage',
    );
  }

  return createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2026-07-26',
    token,
    useCdn: false,
  });
}
