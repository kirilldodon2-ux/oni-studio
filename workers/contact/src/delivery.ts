import type { StoredAttachment } from "./storage";

export type DeliveryPayload = {
  name: string;
  contact: string;
  project: string;
  attachments: StoredAttachment[];
  timestamp: string;
  submissionId: string;
};

const TELEGRAM_LEAD_SEPARATOR = "⎯⎯⎯⎯⎯⎯⦿⎯⎯⎯⎯⎯⎯";
const TELEGRAM_PROJECT_EXPANDABLE_MIN_CHARS = 280;
const TELEGRAM_HTML_MAX_LENGTH = 4096;
const TELEGRAM_LEAD_TIMEZONE = "Europe/Moscow";

function escapeTelegramHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatLeadDateTime(iso: string): string {
  const date = new Date(iso);
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TELEGRAM_LEAD_TIMEZONE,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const pick = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";

  return `${pick("day")}.${pick("month")}.${pick("year")} ${pick("hour")}:${pick("minute")}`;
}

function formatTelegramAttachments(attachments: StoredAttachment[]): string {
  if (attachments.length === 0) return "None";

  return attachments
    .map(
      (a) =>
        `<a href="${escapeTelegramHtml(a.url)}">${escapeTelegramHtml(a.name)}</a>`
    )
    .join("\n");
}

function formatTelegramProjectBlockquote(project: string): string {
  const body = escapeTelegramHtml(project);
  const expandable =
    project.length >= TELEGRAM_PROJECT_EXPANDABLE_MIN_CHARS ||
    project.split("\n").length > 6;

  if (expandable) {
    return `<blockquote expandable>${body}</blockquote>`;
  }
  return `<blockquote>${body}</blockquote>`;
}

function formatTelegramHtml(p: DeliveryPayload): string {
  const sections = [
    "<b>🪙 ЗАЯВКА С САЙТА</b>",
    "",
    TELEGRAM_LEAD_SEPARATOR,
    "",
    "<b>Имя:</b>",
    "",
    escapeTelegramHtml(p.name),
    "",
    "<b>Связь:</b>",
    "",
    escapeTelegramHtml(p.contact),
    "",
    TELEGRAM_LEAD_SEPARATOR,
    "",
    "<b>Инфа о проекте:</b>",
    "",
    formatTelegramProjectBlockquote(p.project),
    "",
    TELEGRAM_LEAD_SEPARATOR,
    "",
    "<b>Файлы / ТЗ / ссылки:</b>",
    "",
    formatTelegramAttachments(p.attachments),
    "",
    "<b>Дата / Время:</b>",
    "",
    escapeTelegramHtml(formatLeadDateTime(p.timestamp)),
  ];

  let text = sections.join("\n");
  if (text.length > TELEGRAM_HTML_MAX_LENGTH) {
    const overhead = text.length - escapeTelegramHtml(p.project).length;
    const maxProjectChars = Math.max(
      120,
      TELEGRAM_HTML_MAX_LENGTH - overhead - 40
    );
    const trimmed = `${p.project.slice(0, maxProjectChars)}…`;
    return formatTelegramHtml({ ...p, project: trimmed });
  }

  return text;
}

function formatEmailHtml(p: DeliveryPayload): string {
  const attachmentHtml =
    p.attachments.length > 0
      ? `<ul>${p.attachments
          .map(
            (a) =>
              `<li><a href="${escapeHtml(a.url)}">${escapeHtml(a.name)}</a> (${a.size} bytes)</li>`
          )
          .join("")}</ul>`
      : "<p>None</p>";

  return `<!DOCTYPE html>
<html>
<body style="font-family: Inter, system-ui, sans-serif; color: #111; line-height: 1.5;">
  <h2 style="font-size: 14px; letter-spacing: 0.12em; text-transform: uppercase;">New project inquiry</h2>
  <p><strong>Name</strong><br>${escapeHtml(p.name)}</p>
  <p><strong>Contact</strong><br>${escapeHtml(p.contact)}</p>
  <p><strong>Project</strong><br>${escapeHtml(p.project).replace(/\n/g, "<br>")}</p>
  <p><strong>Attachments</strong></p>
  ${attachmentHtml}
  <p style="font-size: 12px; color: #666;">${escapeHtml(p.timestamp)} · ${escapeHtml(p.submissionId)}</p>
</body>
</html>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendTelegram(
  token: string,
  chatId: string,
  topicId: string | undefined,
  payload: DeliveryPayload
): Promise<void> {
  const body: Record<string, string | number> = {
    chat_id: chatId,
    text: formatTelegramHtml(payload),
    parse_mode: "HTML",
    disable_web_page_preview: 0,
  };
  if (topicId) {
    body.message_thread_id = Number.parseInt(topicId, 10);
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Telegram delivery failed: ${detail}`);
  }
}

export async function sendEmail(
  apiKey: string,
  from: string,
  to: string,
  payload: DeliveryPayload
): Promise<void> {
  const attachmentLines =
    payload.attachments.length > 0
      ? payload.attachments.map((a) => `${a.name}: ${a.url}`).join("\n")
      : "None";

  const text = [
    "NEW PROJECT",
    "",
    `Name: ${payload.name}`,
    `Contact: ${payload.contact}`,
    "",
    "Project:",
    payload.project,
    "",
    "Attachments:",
    attachmentLines,
    "",
    `Timestamp: ${payload.timestamp}`,
    `Ref: ${payload.submissionId}`,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `ONI — New project from ${payload.name}`,
      text,
      html: formatEmailHtml(payload),
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Email delivery failed: ${detail}`);
  }
}

export function isTelegramConfigured(env: EnvBindings): boolean {
  return Boolean(env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID);
}

export function isEmailConfigured(env: EnvBindings): boolean {
  return Boolean(
    env.RESEND_API_KEY && env.CONTACT_EMAIL_TO && env.CONTACT_EMAIL_FROM
  );
}

/**
 * TODO(production-launch): Restore dual-channel requirement before production.
 * Replace body with: return isTelegramConfigured(env) && isEmailConfigured(env);
 * Telegram-only when RESEND_API_KEY is absent is temporary for dev/testing only.
 */
export function isDeliveryConfigured(env: EnvBindings): boolean {
  return isTelegramConfigured(env);
}

/**
 * Telegram and email in parallel when both are configured — neither routes through the other.
 *
 * TODO(production-launch): Require isEmailConfigured(env) and always dispatch sendEmail
 * alongside sendTelegram; reject submissions when RESEND_API_KEY is absent.
 */
export async function deliverSubmission(
  env: EnvBindings,
  payload: DeliveryPayload
): Promise<void> {
  if (!isTelegramConfigured(env)) {
    throw new Error("Telegram is not configured.");
  }

  const tasks: Promise<void>[] = [
    sendTelegram(
      env.TELEGRAM_BOT_TOKEN!,
      env.TELEGRAM_CHAT_ID!,
      env.TELEGRAM_TOPIC_ID,
      payload
    ),
  ];

  if (isEmailConfigured(env)) {
    tasks.push(
      sendEmail(
        env.RESEND_API_KEY!,
        env.CONTACT_EMAIL_FROM!,
        env.CONTACT_EMAIL_TO!,
        payload
      )
    );
  }

  await Promise.all(tasks);
}

export type EnvBindings = {
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  TELEGRAM_TOPIC_ID?: string;
  RESEND_API_KEY?: string;
  CONTACT_EMAIL_TO?: string;
  CONTACT_EMAIL_FROM?: string;
  ATTACHMENTS_PUBLIC_BASE_URL?: string;
  ALLOWED_ORIGINS?: string;
  RATE_LIMIT_MAX?: string;
  RATE_LIMIT_WINDOW_SEC?: string;
  ATTACHMENTS?: R2Bucket;
  RATE_LIMIT?: KVNamespace;
};
