/**
 * Schrijfvorm voor het `richText`-blok, plus de omzetting naar Portable Text.
 *
 * Een lange lopende tekst (privacyverklaring, voorwaarden) is in de repo
 * prettiger te lezen en te reviewen als platte regels dan als Portable Text
 * met _key's. De seed schrijft die vorm om; de studio is daarna de baas over
 * de tekst — dit is een startpunt, geen bron die de seed blijft afdwingen.
 *
 * Links binnen een alinea schrijf je als [label](href) en vet als **vet**. Een href die met "/"
 * begint wordt een interne link (linkType `internal` kan de seed niet zetten
 * zonder document-id, dus het blijft een pad); de rest — https:, mailto:,
 * tel: — is extern.
 */

export type RichNode =
  | { style: 'h2' | 'h3' | 'normal' | 'blockquote'; text: string }
  | { list: 'bullet' | 'number'; items: string[] };

type Span = {
  _type: 'span';
  _key: string;
  text: string;
  marks: string[];
};

type MarkDef = {
  _type: 'link';
  _key: string;
  linkType: 'external';
  href: string;
};

export type PortableTextParagraph = {
  _type: 'block';
  _key: string;
  style: string;
  listItem?: 'bullet' | 'number';
  level?: number;
  markDefs: MarkDef[];
  children: Span[];
};

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;
const STRONG = /\*\*([^*]+)\*\*/g;

/** Splitst een stuk tekst zonder links op **vet**. */
function withStrong(text: string, marks: string[], key: (seed: string) => string): Span[] {
  const spans: Span[] = [];
  let cursor = 0;

  for (const match of text.matchAll(STRONG)) {
    const [full, bold] = match;
    const start = match.index ?? 0;
    if (start > cursor) {
      const plain = text.slice(cursor, start);
      spans.push({ _type: 'span', _key: key(plain), text: plain, marks });
    }
    spans.push({ _type: 'span', _key: key(bold), text: bold, marks: [...marks, 'strong'] });
    cursor = start + full.length;
  }

  if (cursor < text.length) {
    const rest = text.slice(cursor);
    spans.push({ _type: 'span', _key: key(rest), text: rest, marks });
  }

  return spans;
}

/**
 * Knipt een regel in spans en verzamelt de links eruit. `key` moet per aanroep
 * een unieke sleutel geven — de seed hangt er een teller aan zodat dezelfde
 * tekst twee keer geen botsende _key oplevert.
 */
function toSpans(text: string, key: (seed: string) => string) {
  const children: Span[] = [];
  const markDefs: MarkDef[] = [];
  let cursor = 0;

  for (const match of text.matchAll(LINK)) {
    const [full, label, href] = match;
    const start = match.index ?? 0;
    if (start > cursor) {
      children.push(...withStrong(text.slice(cursor, start), [], key));
    }
    const markKey = key(`link:${href}:${label}`);
    markDefs.push({ _type: 'link', _key: markKey, linkType: 'external', href });
    children.push(...withStrong(label, [markKey], key));
    cursor = start + full.length;
  }

  if (cursor < text.length) {
    children.push(...withStrong(text.slice(cursor), [], key));
  }

  return { children, markDefs };
}

/** Zet de schrijfvorm om naar wat het `body`-veld van een `richText` verwacht. */
export function toPortableText(
  nodes: readonly RichNode[],
  key: (seed: string) => string,
): PortableTextParagraph[] {
  let counter = 0;
  const uniqueKey = (seed: string) => key(`${counter++}:${seed}`);

  return nodes.flatMap<PortableTextParagraph>((node) => {
    if ('list' in node) {
      return node.items.map((item) => ({
        _type: 'block' as const,
        _key: uniqueKey(item),
        style: 'normal',
        listItem: node.list,
        level: 1,
        ...toSpans(item, uniqueKey),
      }));
    }

    return [
      {
        _type: 'block' as const,
        _key: uniqueKey(node.text),
        style: node.style,
        ...toSpans(node.text, uniqueKey),
      },
    ];
  });
}
