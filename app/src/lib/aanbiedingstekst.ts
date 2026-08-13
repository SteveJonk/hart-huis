/**
 * Realworks does not deliver HTML. `aanbiedingsTekst` is one long string with
 * `<br>` line breaks, `**vet**` for emphasis and lines starting with "- " as
 * bullets, and it usually carries the English version behind an `**English**`
 * heading even though `aanbiedingstekstEngels` exists separately.
 *
 * `parseAanbiedingstekst` turns that into blocks and drops the English half;
 * `splitBold` handles the inline `**vet**` markers at render time.
 */
export type TekstBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] };

/** "**English**" — everything from here on is a translation of what came before. */
const ENGLISH_HEADING = /^english$/i;
/** "**English below**", "**Scroll down for English**" — a pointer, not content. */
const ENGLISH_POINTER = /^(english below|scroll down for english)\b/i;

const BULLET = /^[-–•]\s+/;

const stripMarkers = (line: string) => line.replace(/\*/g, '').trim();

export function parseAanbiedingstekst(raw: string | null | undefined): TekstBlock[] {
  if (!raw) return [];

  const lines = raw
    .replace(/<br\s*\/?>/gi, '\n')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const blocks: TekstBlock[] = [];

  for (const line of lines) {
    const bare = stripMarkers(line);

    if (ENGLISH_HEADING.test(bare)) break;
    if (ENGLISH_POINTER.test(bare)) continue;

    if (BULLET.test(line)) {
      const item = line.replace(BULLET, '').trim();
      const last = blocks[blocks.length - 1];
      if (last?.type === 'list') {
        last.items.push(item);
      } else {
        blocks.push({ type: 'list', items: [item] });
      }
      continue;
    }

    blocks.push({ type: 'paragraph', text: line });
  }

  return blocks;
}

/** Split on `**vet**` markers: even indices are plain, odd indices are bold. */
export function splitBold(text: string): { text: string; bold: boolean }[] {
  return text
    .split(/\*\*(.+?)\*\*/g)
    .map((part, index) => ({ text: part, bold: index % 2 === 1 }))
    .filter((part) => part.text !== '');
}
