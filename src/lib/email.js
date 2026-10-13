import { Resend } from 'resend';
import { normalizeContactInput, validateContactInput } from './contactSchema.js';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/* Site palette, inlined because email clients ignore stylesheets. */
const INK = '#101a26';
const AMBER = '#f59e0b';
const PAPER = '#f7f6f2';
const PAPER_2 = '#efede6';
const HEADING = '#1b2937';
const BODY = '#3d4c5c';
const MUTED = '#5b6b7c';
const RULE = '#d6dce4'; /* hairline rules, solid for old Outlook */

/** Longest name we are willing to put in a subject line. */
const SUBJECT_NAME_MAX = 60;
const SUBJECT_ADDRESS_MAX = 80;

/**
 * Escape the five characters that have meaning in HTML text and
 * attribute contexts, so user input can be interpolated into markup.
 *
 * Precondition:  `value` is coerced to a string.
 * Postcondition: the result contains none of & < > " ' unescaped; the
 *                ampersand is replaced first so later replacements are
 *                not themselves re-escaped.
 */
export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Make a string safe to place in a mail header (Subject, display name)
 * or a single-line field of the plain-text body: strip every control
 * character including CR and LF (so no "\r\nBcc: ..." can be injected),
 * collapse runs of whitespace, and cap the length.
 *
 * Precondition:  `value` is coerced to a string; `max` is a positive int.
 * Postcondition: a single-line string of at most `max` characters with
 *                no control characters; truncation is marked with "…".
 */
export function headerSafe(value, max = 200) {
  const oneLine = String(value)
    .replace(/[\u0000-\u001f\u007f]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return oneLine.length > max ? `${oneLine.slice(0, max - 1)}…` : oneLine;
}

/**
 * Google Maps search URL for a free-text address. The query is
 * URL-encoded, so punctuation in the address cannot break the link.
 */
export function mapsUrlFor(address) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

/**
 * Render the HTML part of the lead email. Every interpolated value has
 * been passed through escapeHtml (and headerSafe for single-line
 * fields) by the time it reaches this template; the template itself
 * adds no user text.
 *
 * Table-based, inline-styled layout: the only thing that renders
 * consistently across Gmail, Outlook and Apple Mail.
 */
function renderHtml(safe) {
  const row = (label, valueHtml) => `
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid ${RULE};vertical-align:top;width:132px;font-family:'IBM Plex Mono',Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${MUTED};">${label}</td>
              <td style="padding:10px 0;border-bottom:1px solid ${RULE};vertical-align:top;font-family:'Public Sans',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.5;color:${HEADING};">${valueHtml}</td>
            </tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>New lead</title></head>
<body style="margin:0;padding:0;background:${PAPER};">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${PAPER};">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;">
          <tr>
            <td style="background:${INK};border-top:4px solid ${AMBER};padding:22px 28px;">
              <div style="font-family:'IBM Plex Mono',Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${AMBER};">A.R.Bergman Drafting · Website lead</div>
              <div style="font-family:'Public Sans',Helvetica,Arial,sans-serif;font-size:22px;font-weight:700;line-height:1.25;color:#f5f7fa;margin-top:8px;">${safe.projectType} at ${safe.address}</div>
              <div style="font-family:'Public Sans',Helvetica,Arial,sans-serif;font-size:14px;color:#c3cfdd;margin-top:4px;">from ${safe.name}</div>
            </td>
          </tr>
          <tr>
            <td style="background:#ffffff;border:1px solid ${RULE};border-top:0;padding:8px 28px 20px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                ${row('Name', safe.name)}
                ${row('Email', `<a href="mailto:${safe.email}" style="color:${HEADING};">${safe.email}</a>`)}
                ${row('Phone', `<a href="tel:${safe.phoneHref}" style="color:${HEADING};">${safe.phone}</a>`)}
                ${row('Project type', safe.projectType)}
                ${row(
                  'Address',
                  `${safe.address}<br><a href="${safe.mapsUrl}" style="display:inline-block;margin-top:8px;padding:8px 14px;background:${AMBER};color:${INK};font-family:'Public Sans',Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;text-decoration:none;border-radius:6px;">Open in Google Maps</a>`
                )}
              </table>
              <div style="margin-top:18px;font-family:'IBM Plex Mono',Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${MUTED};">Message</div>
              <div style="margin-top:8px;padding:14px 16px;background:${PAPER_2};border-left:3px solid ${AMBER};border-radius:4px;font-family:'Public Sans',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:${BODY};white-space:pre-wrap;">${safe.message}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:14px 28px;font-family:'IBM Plex Mono',Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.06em;color:${MUTED};">Reply to this email to answer ${safe.name} directly.</td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Render the plain-text part. Single-line fields have already had
 * newlines stripped by headerSafe; the message keeps its own newlines
 * (it is body text, not a header) but every line is indented so none
 * can masquerade as a "Field: value" line of this layout.
 */
function renderText(line) {
  const indentedMessage = line.message
    .split('\n')
    .map((l) => `  ${l}`)
    .join('\n');

  return [
    'NEW WEBSITE LEAD — A.R.Bergman Drafting',
    '',
    `Name:          ${line.name}`,
    `Email:         ${line.email}`,
    `Phone:         ${line.phone}`,
    `Project type:  ${line.projectType}`,
    `Address:       ${line.address}`,
    `Google Maps:   ${line.mapsUrl}`,
    '',
    'Message:',
    indentedMessage,
    '',
    `Reply to this email to answer ${line.name} directly.`,
  ].join('\n');
}

/**
 * Send the lead email for a contact-form submission.
 *
 * Precondition:  `data` has the CONTACT_FIELDS keys (message may be
 *                under `body`). It is normalized and validated again
 *                here so this function is safe to call from anywhere,
 *                not only from the already-validating server action.
 * Postcondition: resolves to { success: true, messageId } or
 *                { success: false, error, fieldErrors? }. Never throws.
 */
export async function sendContactEmail(data) {
  const values = normalizeContactInput(data);
  const fieldErrors = validateContactInput(values);
  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, error: 'Please correct the highlighted fields.', fieldErrors };
  }

  if (!resend) {
    console.error('RESEND_API_KEY is not configured');
    return { success: false, error: 'Email service is not configured' };
  }

  const recipientEmail = process.env.CONTACT_EMAIL;
  if (!recipientEmail) {
    console.error('CONTACT_EMAIL is not configured');
    return { success: false, error: 'Email service is not configured' };
  }

  /* Single-line, header-safe versions for the subject and text part. */
  const line = {
    name: headerSafe(values.name, SUBJECT_NAME_MAX),
    email: headerSafe(values.email),
    phone: headerSafe(values.phone),
    projectType: headerSafe(values.projectType),
    address: headerSafe(values.address, SUBJECT_ADDRESS_MAX),
    message: values.message.replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, ''),
    mapsUrl: mapsUrlFor(values.address),
  };

  /* HTML-escaped versions of the same. */
  const safe = {
    name: escapeHtml(line.name),
    email: escapeHtml(line.email),
    phone: escapeHtml(line.phone),
    phoneHref: escapeHtml(line.phone.replace(/[^\d+]/g, '')),
    projectType: escapeHtml(line.projectType),
    address: escapeHtml(line.address),
    message: escapeHtml(line.message),
    mapsUrl: escapeHtml(line.mapsUrl),
  };

  const subject = `New lead: ${line.projectType} at ${line.address} — ${line.name}`;

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: recipientEmail,
      replyTo: values.email,
      subject,
      html: renderHtml(safe),
      text: renderText(line),
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: 'Failed to send email' };
    }

    return { success: true, messageId: emailData?.id };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: 'Internal server error' };
  }
}
