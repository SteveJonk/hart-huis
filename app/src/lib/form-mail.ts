/**
 * De opmaak van de mails die `POST /api/submit-form` verstuurt.
 *
 * Losse module omdat een route-bestand alleen route-exports mag exporteren, en
 * omdat `check:form` de HTML zo kan controleren zonder Mailjet of Sanity.
 *
 * Mailclients doen niet aan `<style>`, flexbox of grid — vandaar tabellen met
 * inline styles. Kleuren en logo komen uit Form settings, zodat dit sjabloon
 * generiek blijft: er staat geen enkele merknaam of vaste kleur in.
 */

/** Terugval als Form settings nog geen kleuren heeft. */
const DEFAULT_PRIMARY = '#5f7057';
const DEFAULT_TEXT = '#241f1c';

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Alleen een hexkleur mag door: de waarde belandt ongeciteerd in een
 * `style=""`, dus een vrije string zou HTML kunnen openbreken.
 */
function color(value: string | null | undefined, fallback: string) {
  return /^#[0-9a-fA-F]{6}$/.test(value ?? '') ? value! : fallback;
}

/** #rrggbb -> rgba(), voor de zachte tint achter de kop en de rijen. */
function tint(hex: string, alpha: number) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return `rgba(${r},${g},${b},${alpha})`;
}

export type MailBranding = {
  logoUrl?: string | null;
  logoAlt?: string | null;
  primaryColor?: string | null;
  textColor?: string | null;
  /** Onder de streep, bv. de afzendernaam. */
  footer?: string | null;
};

/**
 * Dezelfde inhoud als de HTML, maar plat: voor clients die geen HTML tonen en
 * voor spamfilters, die een mail zonder tekstdeel zwaarder wegen.
 */
function renderText({
  title,
  intro,
  answers,
  footer,
}: {
  title: string;
  intro: string;
  answers: { label: string; value: string }[];
  footer?: string | null;
}) {
  const blocks = [
    `${title}\n${'='.repeat(title.length)}`,
    intro,
    // Een meerregelig antwoord komt ingesprongen onder zijn label te staan.
    answers
      .map(({ label, value }) =>
        value.includes('\n')
          ? `${label}:\n${value.replace(/^(?!$)/gm, '  ')}`
          : `${label}: ${value}`,
      )
      .join('\n'),
    footer,
  ];
  return blocks.filter(Boolean).join('\n\n') + '\n';
}

/**
 * Kop met logo, introtekst, de antwoorden als label/waarde-rijen en een
 * afsluitende regel. `title` en `intro` zijn platte tekst; nieuwe regels in de
 * intro worden `<br>`. Levert beide delen van de mail: `html` en `text`.
 */
export function renderFormMail({
  title,
  intro,
  answers,
  branding = {},
}: {
  title: string;
  intro: string;
  answers: { label: string; value: string }[];
  branding?: MailBranding;
}) {
  const primary = color(branding.primaryColor, DEFAULT_PRIMARY);
  const text = color(branding.textColor, DEFAULT_TEXT);
  const muted = tint(text, 0.65);
  const line = tint(text, 0.12);
  const font =
    "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";

  const logo = branding.logoUrl
    ? `<img src="${escapeHtml(branding.logoUrl)}" alt="${escapeHtml(
        branding.logoAlt || '',
      )}" width="150" style="display:block;border:0;max-width:150px;height:auto;">`
    : '';

  const rows = answers
    .map(
      ({ label, value }, index) => `
              <tr style="background:${index % 2 ? tint(text, 0.03) : 'transparent'};">
                <td style="padding:12px 16px;font-size:13px;line-height:1.4;color:${muted};border-bottom:1px solid ${line};vertical-align:top;width:38%;">${escapeHtml(
                  label,
                )}</td>
                <td style="padding:12px 16px;font-size:15px;line-height:1.5;color:${text};border-bottom:1px solid ${line};vertical-align:top;font-weight:600;">${escapeHtml(
                  value,
                ).replace(/\n/g, '<br>')}</td>
              </tr>`,
    )
    .join('');

  const html = `<!doctype html>
<html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background:${tint(text, 0.04)};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(intro)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${tint(
    text,
    0.04,
  )};padding:24px 12px;font-family:${font};">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid ${line};">
        <tr><td style="height:6px;background:${primary};font-size:0;line-height:0;">&nbsp;</td></tr>
        ${
          logo
            ? `<tr><td style="padding:28px 32px 0 32px;">${logo}</td></tr>`
            : ''
        }
        <tr><td style="padding:24px 32px 0 32px;">
          <h1 style="margin:0;font-size:20px;line-height:1.3;font-weight:700;color:${text};">${escapeHtml(
            title,
          )}</h1>
          ${
            intro
              ? `<p style="margin:12px 0 0 0;font-size:15px;line-height:1.6;color:${muted};">${escapeHtml(
                  intro,
                ).replace(/\n/g, '<br>')}</p>`
              : ''
          }
        </td></tr>
        <tr><td style="padding:24px 32px 8px 32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-top:2px solid ${primary};">
            ${rows}
          </table>
        </td></tr>
        ${
          branding.footer
            ? `<tr><td style="padding:16px 32px 28px 32px;">
          <p style="margin:0;font-size:12px;line-height:1.5;color:${muted};">${escapeHtml(
            branding.footer,
          )}</p>
        </td></tr>`
            : '<tr><td style="height:20px;">&nbsp;</td></tr>'
        }
      </table>
    </td></tr>
  </table>
</body></html>`;

  return {
    html,
    text: renderText({ title, intro, answers, footer: branding.footer }),
  };
}
