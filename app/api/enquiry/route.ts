import nodemailer from "nodemailer";
import { enquiryFieldErrors, enquirySchema } from "../../lib/enquiry-schema";
import { siteConfig } from "../../site-config";

/**
 * Receives the home page campaign enquiry form, validates it against the shared
 * Zod schema (`app/lib/enquiry-schema.ts`) and emails it through SMTP.
 *
 * Configuration lives in `.env.local` (see `.env.example`):
 *   SMTP_HOST / SMTP_PORT / SMTP_SECURE / SMTP_USER / SMTP_PASS
 *   MAIL_FROM     sender shown on the email
 *   ENQUIRY_TO    admin recipient(s), comma-separated — falls back to
 *                 `siteConfig.notificationEmails` when empty
 *   ENQUIRY_CC    optional extra recipient(s), comma-separated. Empty means
 *                 only `ENQUIRY_TO` gets the email.
 *
 * Runs on the default Node.js runtime — Cache Components is enabled, so a
 * `runtime` export is not allowed here.
 */

function asText(value: string | undefined) {
  return (value ?? "").trim();
}

/** Split a comma-separated env var into a clean list of addresses. */
function addressList(value: string | undefined) {
  return asText(value)
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character] as string,
  );
}

function mailTransport() {
  const host = asText(process.env.SMTP_HOST);
  const user = asText(process.env.SMTP_USER);
  const pass = asText(process.env.SMTP_PASS);

  if (!host || !user || !pass) return null;

  const port = Number(asText(process.env.SMTP_PORT)) || 465;
  const secure = process.env.SMTP_SECURE
    ? asText(process.env.SMTP_SECURE) === "true"
    : port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

function enquiryEmail(fields: {
  fullName: string;
  mobile: string;
  email: string;
  institution: string;
  receivedAt: string;
}) {
  const rows: Array<[string, string]> = [
    ["Full name", fields.fullName],
    ["Mobile number", fields.mobile],
    ["Work email", fields.email],
    ["Institution / company", fields.institution],
    ["Received", fields.receivedAt],
  ];

  const text = [
    `New campaign enquiry — ${siteConfig.name}`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    `Source: ${siteConfig.url}`,
  ].join("\n");

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#fff7f0;font-family:Arial,Helvetica,sans-serif;color:#16375e;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #f0e2d8;">
      <tr>
        <td style="background:#16375e;padding:20px 28px;">
          <p style="margin:0;font-size:16px;font-weight:bold;color:#ffffff;">${escapeHtml(siteConfig.name)}</p>
          <p style="margin:4px 0 0;font-size:12px;color:#c7d4e3;">${escapeHtml(siteConfig.tagline)}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:28px;">
          <p style="margin:0 0 4px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#f4701f;font-weight:bold;">New campaign enquiry</p>
          <h1 style="margin:0 0 20px;font-size:20px;color:#16375e;">A new enquiry came in from the website</h1>
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            ${rows
              .map(
                ([label, value]) => `<tr>
              <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:12px;color:#64748b;width:38%;">${escapeHtml(label)}</td>
              <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:14px;font-weight:bold;color:#16375e;">${escapeHtml(value)}</td>
            </tr>`,
              )
              .join("")}
          </table>
          <p style="margin:24px 0 0;font-size:12px;color:#64748b;">
            Reply to this email to answer ${escapeHtml(fields.fullName)} directly.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { text, html };
}

export async function POST(request: Request) {
  let raw: unknown;

  try {
    raw = await request.json();
  } catch {
    return Response.json(
      { ok: false, message: "We couldn't read that request. Please try again." },
      { status: 400 },
    );
  }

  const parsed = enquirySchema.safeParse(raw);

  if (!parsed.success) {
    return Response.json(
      {
        ok: false,
        message: "Please check the highlighted fields and try again.",
        errors: enquiryFieldErrors(parsed.error),
      },
      { status: 422 },
    );
  }

  const { fullName, mobile, email, institution, website } = parsed.data;

  // Honeypot: real people never fill a hidden field, bots usually do. Pretend
  // the enquiry succeeded so the bot moves on.
  if (website !== "") {
    return Response.json({
      ok: true,
      message: "Thanks — your enquiry is with our team.",
    });
  }

  const transport = mailTransport();
  const to = addressList(process.env.ENQUIRY_TO);
  const recipients = to.length > 0 ? to : [...siteConfig.notificationEmails];
  const cc = addressList(process.env.ENQUIRY_CC);

  if (!transport || recipients.length === 0) {
    // Keep the enquiry in the server log so nothing is lost while SMTP is not
    // configured yet.
    console.error(
      "[enquiry] SMTP is not configured — enquiry was not emailed:",
      JSON.stringify({ fullName, mobile, email, institution }),
    );

    return Response.json(
      {
        ok: false,
        message:
          "Our enquiry email is not set up yet. Please call or WhatsApp us instead.",
      },
      { status: 503 },
    );
  }

  const receivedAt = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date());

  const { text, html } = enquiryEmail({
    fullName,
    mobile,
    email,
    institution,
    receivedAt,
  });

  try {
    await transport.sendMail({
      from: asText(process.env.MAIL_FROM) || asText(process.env.SMTP_USER),
      to: recipients,
      // Absent unless ENQUIRY_CC is set, so one recipient stays the default.
      cc: cc.length > 0 ? cc : undefined,
      replyTo: `${fullName} <${email}>`,
      subject: `New campaign enquiry — ${institution}`,
      text,
      html,
    });
  } catch (error) {
    console.error("[enquiry] sending failed:", error);

    return Response.json(
      {
        ok: false,
        message:
          "We couldn't send your enquiry just now. Please try again, or call and WhatsApp us.",
      },
      { status: 502 },
    );
  }

  return Response.json({
    ok: true,
    message:
      "Thanks! Your enquiry is with our team — we'll get back to you shortly.",
  });
}
