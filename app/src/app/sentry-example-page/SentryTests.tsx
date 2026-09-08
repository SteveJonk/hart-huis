'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

class SentryExampleFrontendError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SentryExampleFrontendError';
  }
}

/**
 * True when the three Sentry.init() calls actually send. They are gated on
 * NODE_ENV === 'production', met NEXT_PUBLIC_SENTRY_FORCE_ENABLED als
 * ontsnappingsluik om lokaal te kunnen testen.
 */
const SENDING_ENABLED =
  process.env.NODE_ENV === 'production' ||
  process.env.NEXT_PUBLIC_SENTRY_FORCE_ENABLED === '1';

type Reachability = 'checking' | 'ok' | 'blocked' | 'unknown';

/** Available since @sentry/nextjs 9; typed defensively so a version bump can't break the build. */
const diagnoseSdkConnectivity = (
  Sentry as unknown as {
    diagnoseSdkConnectivity?: () => Promise<string | null>;
  }
).diagnoseSdkConnectivity;

export function SentryTests() {
  const [reachable, setReachable] = useState<Reachability>(
    diagnoseSdkConnectivity ? 'checking' : 'unknown',
  );
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    if (!diagnoseSdkConnectivity) return;
    let cancelled = false;
    diagnoseSdkConnectivity()
      .then((result) => {
        if (cancelled) return;
        // 'sentry-unreachable' = geblokkeerd (adblocker/DNS). null = alles goed.
        // 'no-client-active' = de SDK staat uit, wat SENDING_ENABLED al vertelt.
        setReachable(result === 'sentry-unreachable' ? 'blocked' : 'ok');
      })
      .catch(() => {
        if (!cancelled) setReachable('unknown');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const note = (line: string) =>
    setLog((lines) => [`${new Date().toLocaleTimeString('nl-NL')} — ${line}`, ...lines]);

  /** Throw in an event handler: no React boundary catches it, so Sentry's
   *  window.onerror handler picks it up — precies zoals een echte bug. */
  const throwFrontendError = () => {
    note('Frontend-fout gegooid. Kijk in de console én in Sentry.');
    Sentry.startSpan({ name: 'Sentry-testpagina — frontend', op: 'test' }, () => {
      throw new SentryExampleFrontendError(
        'Sentry-testfout vanaf de browser (/sentry-example-page)',
      );
    });
  };

  /** Captures explicitly and waits for the flush, so we get a hard yes/no
   *  plus the event id — de enige test die zelf bevestigt dat hij aankwam. */
  const captureManually = async () => {
    const eventId = Sentry.captureException(
      new SentryExampleFrontendError(
        'Sentry-testfout, handmatig verstuurd (/sentry-example-page)',
      ),
    );
    note(`Verstuurd, event id ${eventId}. Wachten op bevestiging…`);
    const flushed = await Sentry.flush(5000);
    note(
      flushed
        ? `Sentry bevestigde de ontvangst van ${eventId}.`
        : `Geen bevestiging binnen 5s voor ${eventId} — SDK uit, geblokkeerd of geen netwerk.`,
    );
  };

  /** Server-side: the route throws, instrumentation's onRequestError reports it. */
  const throwBackendError = async () => {
    note('Server-route aangeroepen…');
    await Sentry.startSpan(
      { name: 'Sentry-testpagina — backend', op: 'test' },
      async () => {
        try {
          const response = await fetch('/api/sentry-example-api');
          note(
            response.ok
              ? `Onverwacht: de route gaf ${response.status} in plaats van een fout.`
              : `De route gaf ${response.status} — dat hoort zo. De fout zou nu in Sentry moeten staan.`,
          );
        } catch (error) {
          note(`Aanroep mislukt: ${String(error)}`);
        }
      },
    );
  };

  return (
    <>
      <dl className='mb-10 grid gap-px overflow-hidden rounded-2xl bg-ink/12 sm:grid-cols-3'>
        <Status label='Omgeving' value={process.env.NODE_ENV} tone='neutral' />
        <Status
          label='Verstuurt naar Sentry'
          value={SENDING_ENABLED ? 'ja' : 'nee — alleen in productie'}
          tone={SENDING_ENABLED ? 'good' : 'warn'}
        />
        <Status
          label='Sentry bereikbaar'
          value={
            reachable === 'checking'
              ? 'controleren…'
              : reachable === 'ok'
                ? 'ja'
                : reachable === 'blocked'
                  ? 'geblokkeerd (adblocker?)'
                  : 'onbekend'
          }
          tone={
            reachable === 'ok'
              ? 'good'
              : reachable === 'blocked'
                ? 'warn'
                : 'neutral'
          }
        />
      </dl>

      {!SENDING_ENABLED && (
        <p className='mb-10 rounded-2xl border border-burgundy/30 bg-burgundy/8 p-5 text-sm leading-[1.7] text-ink-70'>
          De drie <code>Sentry.init()</code>-bestanden staan op{' '}
          <code>enabled: NODE_ENV === &apos;production&apos;</code>. In{' '}
          <code>npm run dev</code> gooien de knoppen hieronder dus wel een fout,
          maar er gaat niets naar Sentry. Test op de gedeployde site, of zet{' '}
          <code>NEXT_PUBLIC_SENTRY_FORCE_ENABLED=1</code> in <code>.env</code> en
          herstart de dev-server.
        </p>
      )}

      <div className='grid gap-4 sm:grid-cols-3'>
        <TestCard
          title='1. Fout in de browser'
          body='Gooit een fout in een klik-handler. Sentry vangt hem op via window.onerror, net als een echte bug.'
          action='Gooi frontend-fout'
          onClick={throwFrontendError}
        />
        <TestCard
          title='2. Fout op de server'
          body='Roept /api/sentry-example-api aan; die route gooit. onRequestError in instrumentation.ts meldt hem.'
          action='Gooi server-fout'
          onClick={throwBackendError}
        />
        <TestCard
          title='3. Handmatig versturen'
          body='captureException + flush. De enige test die zelf terugkoppelt of Sentry het event echt aannam.'
          action='Verstuur en bevestig'
          onClick={captureManually}
        />
      </div>

      {log.length > 0 && (
        <div className='mt-10'>
          <h2 className='mb-3 text-lg'>Log</h2>
          <ul className='space-y-2 rounded-2xl border border-ink/12 bg-white/50 p-5 font-mono text-xs leading-[1.7] text-ink-70'>
            {log.map((line, index) => (
              <li key={`${line}-${index}`}>{line}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

function Status({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'good' | 'warn' | 'neutral';
}) {
  return (
    <div className='bg-cream p-5'>
      <dt className='mb-1.5 text-eyebrow font-semibold uppercase text-ink-45'>
        {label}
      </dt>
      <dd
        className={cn(
          'text-sm font-semibold',
          tone === 'good' && 'text-sage-deep',
          tone === 'warn' && 'text-burgundy',
          tone === 'neutral' && 'text-ink',
        )}
      >
        {value}
      </dd>
    </div>
  );
}

function TestCard({
  title,
  body,
  action,
  onClick,
}: {
  title: string;
  body: string;
  action: string;
  onClick: () => void;
}) {
  return (
    <div className='flex flex-col rounded-2xl border border-ink/12 bg-white/50 p-6'>
      <h2 className='mb-2 text-lg'>{title}</h2>
      <p className='mb-6 flex-1 text-sm leading-[1.7] text-ink-70'>{body}</p>
      <button
        type='button'
        onClick={onClick}
        className='inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-pill border border-transparent bg-sage px-6 py-[14px] text-btn-sm font-semibold text-moss transition-[background,translate] duration-300 hover:-translate-y-0.5 hover:bg-sage-hover focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-burgundy'
      >
        {action}
      </button>
    </div>
  );
}
