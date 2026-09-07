/**
 * Bewaart een geschiedenis van elke cron-run (Funda-reviews, Realworks-import)
 * als `cronLog`-document, zodat een mislukte nachtelijke run zichtbaar is in de
 * studio zonder in Vercels functielogs te hoeven kijken.
 *
 * Puur schrijven — geen fetch, geen scrape-logica. Wordt aangeroepen vanuit
 * beide route-handlers, ná de eigenlijke run, en mag die nooit laten mislukken:
 * fouten hierin worden alleen gelogd naar de server-console.
 */
import { getWriteClient } from '@/sanity/write-client';

export const CRON_TASKS = ['funda-reviews', 'import-realworks'] as const;
export type CronTask = (typeof CRON_TASKS)[number];

export type CronTrigger = 'cron' | 'studio' | 'onbekend';

export type CronLogEntry = {
  task: CronTask;
  trigger: CronTrigger;
  ok: boolean;
  dryRun: boolean;
  startedAt: string;
  durationMs: number;
  message: string;
  warnings: string[];
  error?: string;
};

/** Hoeveel logs per taak bewaard blijven; de rest wordt na het schrijven opgeruimd. */
const MAX_LOGS_PER_TASK = 200;

/**
 * Ids van logs voor een taak voorbij de meest recente `MAX_LOGS_PER_TASK`.
 * De grenzen staan als getal in de query: een slice-grens mag in GROQ geen
 * parameter zijn.
 */
const OVERTOLLIGE_LOGS_QUERY = `*[_type == "cronLog" && task == $task] | order(startedAt desc) [${MAX_LOGS_PER_TASK}...100000]._id`;

export async function recordCronRun(entry: CronLogEntry): Promise<void> {
  const client = getWriteClient();

  try {
    await client.create({
      _type: 'cronLog',
      ...entry,
    });

    const overtollig = await client.fetch<string[]>(OVERTOLLIGE_LOGS_QUERY, {
      task: entry.task,
    });
    if (overtollig.length > 0) {
      const transaction = client.transaction();
      for (const id of overtollig) transaction.delete(id);
      await transaction.commit({ visibility: 'async' });
    }
  } catch (error) {
    console.error(
      '[cron-log] Kon de run niet loggen:',
      error instanceof Error ? error.message : String(error),
    );
  }
}
