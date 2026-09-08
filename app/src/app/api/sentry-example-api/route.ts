export const runtime = 'nodejs';
// Without this the handler is evaluated at build time — and it throws on purpose.
export const dynamic = 'force-dynamic';

class SentryExampleAPIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SentryExampleAPIError';
  }
}

/**
 * Test endpoint for /sentry-example-page. Throws on purpose so the error is
 * picked up server-side by `onRequestError` in src/instrumentation.ts.
 * Not part of the site — mag weg zodra Sentry bevestigd werkt.
 */
export function GET() {
  throw new SentryExampleAPIError(
    'Sentry-testfout vanaf de server (/api/sentry-example-api)',
  );
}
