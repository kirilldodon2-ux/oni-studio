import { DEFAULT_ALLOWED_ORIGINS } from "./config";
import { deliverSubmission, isDeliveryConfigured, type EnvBindings } from "./delivery";
import { checkRateLimit } from "./rateLimit";
import { storeAttachments } from "./storage";
import { parseSubmission, validateSubmission } from "./validate";

export interface Env extends EnvBindings {}

function jsonResponse(body: Record<string, unknown>, status: number, headers?: HeadersInit) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...spreadHeaders(headers),
    },
  });
}

function spreadHeaders(headers?: HeadersInit): Record<string, string> {
  if (!headers) return {};
  const out: Record<string, string> = {};
  const h = new Headers(headers);
  h.forEach((v, k) => {
    out[k] = v;
  });
  return out;
}

function corsHeaders(origin: string | null, allowed: string[]): HeadersInit | null {
  if (!origin || !allowed.includes(origin)) return null;
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

function allowedOrigins(env: Env): string[] {
  const extra = env.ALLOWED_ORIGINS?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];
  return [...DEFAULT_ALLOWED_ORIGINS, ...extra];
}

function clientIp(request: Request): string {
  return (
    request.headers.get("CF-Connecting-IP") ??
    request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const origin = request.headers.get("Origin");
    const allowed = allowedOrigins(env);
    const cors = corsHeaders(origin, allowed);

    if (request.method === "OPTIONS") {
      if (!cors) return new Response(null, { status: 204 });
      return new Response(null, { status: 204, headers: cors });
    }

    const path = new URL(request.url).pathname;
    if (request.method !== "POST" || (path !== "/" && path !== "/submit")) {
      return jsonResponse({ error: "Not found" }, 404, cors ?? undefined);
    }

    if (!cors) {
      return jsonResponse({ error: "Origin not allowed" }, 403);
    }

    if (!isDeliveryConfigured(env)) {
      return jsonResponse({ error: "Contact service unavailable" }, 503, cors);
    }

    const max = Number.parseInt(env.RATE_LIMIT_MAX ?? "8", 10);
    const windowSec = Number.parseInt(env.RATE_LIMIT_WINDOW_SEC ?? "3600", 10);
    const ip = clientIp(request);

    const allowedRequest = await checkRateLimit(env.RATE_LIMIT, ip, max, windowSec);
    if (!allowedRequest) {
      return jsonResponse({ error: "Too many requests. Try again later." }, 429, cors);
    }

    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      return jsonResponse({ error: "Invalid form data" }, 400, cors);
    }

    const submission = parseSubmission(form);

    if (submission.honeypot) {
      return jsonResponse({ message: "Received" }, 200, cors);
    }

    const validationError = validateSubmission(submission);
    if (validationError) {
      return jsonResponse({ error: validationError }, 400, cors);
    }

    const submissionId = crypto.randomUUID();
    const timestamp = new Date().toISOString();

    let attachments: Awaited<ReturnType<typeof storeAttachments>> = [];
    try {
      if (submission.files.length > 0) {
        attachments = await storeAttachments(
          env.ATTACHMENTS,
          env.ATTACHMENTS_PUBLIC_BASE_URL,
          submissionId,
          submission.files
        );
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Storage error";
      return jsonResponse({ error: msg }, 500, cors);
    }

    const payload = {
      name: submission.name,
      contact: submission.contact,
      project: submission.project,
      attachments,
      timestamp,
      submissionId,
    };

    try {
      await deliverSubmission(env, payload);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Delivery failed";
      console.error("contact delivery failed", { submissionId, msg });
      return jsonResponse({ error: "Delivery failed. Please try again." }, 502, cors);
    }

    return jsonResponse({ message: "Received" }, 200, cors);
  },
};
