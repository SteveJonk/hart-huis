import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { client } from '@/sanity/client';
import {
  CONTACT_FORM_QUERY,
  CONTACT_FORM_SETTINGS_QUERY,
} from '@/sanity/queries';

export const runtime = 'nodejs';

/** Bigger uploads are rejected rather than silently dropped from the mail. */
const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;

/** Google's siteverify. Returns false on any doubt — this gate fails closed. */
async function verifyRecaptcha(token: string, secret: string) {
  try {
    const response = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret, response: token }),
      },
    );
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch (error) {
    console.error('submit-form: reCAPTCHA verification failed', error);
    return false;
  }
}

function fail(message: string, status: number) {
  return NextResponse.json({ success: false, message }, { status });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request: Request) {
  let body: FormData;
  try {
    body = await request.formData();
  } catch {
    return fail('Onleesbare aanvraag.', 400);
  }

  const formId = String(body.get('formId') ?? '');
  if (!formId) return fail('Geen formulier opgegeven.', 400);

  // The form definition is the allow-list: unknown keys never reach the mail.
  const [form, settings] = await Promise.all([
    client.fetch(CONTACT_FORM_QUERY, { formId }, { cache: 'no-store' }),
    client.fetch(CONTACT_FORM_SETTINGS_QUERY, {}, { cache: 'no-store' }),
  ]);
  if (!form) return fail('Onbekend formulier.', 404);

  // Spam gate before any real work. The secret belongs in the environment: a
  // Sanity dataset is world-readable, so the studio value is only a fallback.
  const recaptchaSecret =
    process.env.RECAPTCHA_SECRET_KEY || settings?.recaptchaSecretKey;
  if (settings?.recaptchaEnabled) {
    if (!recaptchaSecret) {
      console.error('submit-form: reCAPTCHA is enabled but no secret key is set');
      return fail('Het formulier is nog niet volledig ingesteld.', 500);
    }
    const token = String(body.get('recaptchaToken') ?? '');
    if (!token || !(await verifyRecaptcha(token, recaptchaSecret))) {
      return fail('De reCAPTCHA-controle is niet gelukt. Probeer het opnieuw.', 400);
    }
  }

  const answers: { label: string; value: string }[] = [];
  const attachments: { filename: string; content: Buffer }[] = [];

  for (const field of form.fields ?? []) {
    if (!field?.name) continue;

    const values = body.getAll(field.name);
    const label = field.label || field.name;

    if (field.type === 'file') {
      const file = values.find(
        (value): value is File => value instanceof File && value.size > 0,
      );
      if (file) {
        if (file.size > MAX_ATTACHMENT_BYTES) {
          return fail(`Bestand "${file.name}" is groter dan 5 MB.`, 413);
        }
        attachments.push({
          filename: file.name,
          content: Buffer.from(await file.arrayBuffer()),
        });
        answers.push({ label, value: file.name });
      } else if (field.isRequired) {
        return fail(`Veld "${label}" is verplicht.`, 400);
      }
      continue;
    }

    const text = values
      .filter((value): value is string => typeof value === 'string')
      .map((value) => value.trim())
      .filter(Boolean)
      .join(', ');

    if (!text) {
      if (field.isRequired) return fail(`Veld "${label}" is verplicht.`, 400);
      continue;
    }
    answers.push({ label, value: text });
  }

  if (answers.length === 0) return fail('Het formulier was leeg.', 400);

  // Env wins over the Studio settings: a dataset is readable by anyone with the
  // project id, so credentials belong in the environment.
  const smtpUser = process.env.SMTP_USER || settings?.smtpUsername;
  const smtpPass = process.env.SMTP_PASSWORD || settings?.smtpPassword;
  const adminEmail = process.env.CONTACT_ADMIN_EMAIL || settings?.adminEmail;

  if (!smtpUser || !smtpPass || !adminEmail) {
    console.error('submit-form: missing SMTP settings (env or formGeneralSettings)');
    return fail(
      'Het formulier is nog niet ingesteld. Bel of mail ons in de tussentijd.',
      500,
    );
  }

  const rows = answers
    .map(
      ({ label, value }) => `
        <tr>
          <td style="padding:8px;border:1px solid #ccc;"><strong>${escapeHtml(label)}</strong></td>
          <td style="padding:8px;border:1px solid #ccc;">${escapeHtml(value).replace(/\n/g, '<br>')}</td>
        </tr>`,
    )
    .join('');

  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: `Hart & Huis website <${smtpUser}>`,
      to: adminEmail,
      replyTo: answers.find(({ label }) => /mail/i.test(label))?.value,
      subject: settings?.confirmationSubject || `Nieuw bericht via ${form.title ?? 'de website'}`,
      html: `<p>${escapeHtml(settings?.confirmationMessage || 'Er is een nieuw bericht binnengekomen via de website.')}</p>
        <table style="border-collapse:collapse;width:100%;margin-top:16px;">${rows}</table>`,
      attachments,
    });
  } catch (error) {
    console.error('submit-form: sending failed', error);
    return fail('Versturen is niet gelukt. Probeer het later opnieuw.', 502);
  }

  return NextResponse.json({ success: true });
}
