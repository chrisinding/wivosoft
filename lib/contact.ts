export const CONTACT_EMAIL = "hello@wivosoft.dk";
export const contactIntents = {
  team: "An extra hand for our team",
  project: "Something built or improved",
  unsure: "Help figuring it out",
} as const;

export type ContactIntent = keyof typeof contactIntents;
export type ContactConfig = {
  apiKey?: string;
  fromEmail?: string;
  turnstileSecret?: string;
  turnstileSiteKey?: string;
};

export function contactIsEnabled(config: ContactConfig) {
  return Boolean(config.apiKey && config.fromEmail && config.turnstileSecret && config.turnstileSiteKey);
}

export function getContactConfig(): ContactConfig {
  return {
    apiKey: process.env.RESEND_API_KEY,
    fromEmail: process.env.CONTACT_FROM_EMAIL,
    turnstileSecret: process.env.TURNSTILE_SECRET_KEY,
    turnstileSiteKey: process.env.TURNSTILE_SITE_KEY,
  };
}

function reply(status: number, error?: string) {
  return Response.json(error ? { error } : { ok: true }, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

async function readBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("Missing body");
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 20_000) {
        await reader.cancel();
        throw new Error("Body too large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(bytes)) as Record<string, unknown>;
}

function field(value: unknown, max: number, multiline = false) {
  if (typeof value !== "string" || value.length > max) return null;
  const result = value.trim();
  // eslint-disable-next-line no-control-regex -- Reject control characters in contact fields and mail headers.
  if ((multiline ? /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/ : /[\u0000-\u001f\u007f]/).test(result)) return null;
  return result;
}

/** Validates and sends an enquiry. No enquiry text or credentials are logged. */
export async function handleContact(request: Request, config: ContactConfig, fetcher: typeof fetch = fetch) {
  if (request.method !== "POST") return reply(405, "Please use the contact form.");
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return reply(403, "Please send your enquiry from this website.");
  }
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get("content-type") ?? "")) {
    return reply(415, "Please use the contact form.");
  }
  let body: Record<string, unknown>;
  try {
    body = await readBody(request);
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("Invalid body");
  } catch {
    return reply(400, "We couldn’t read your enquiry. Please check the form and try again.");
  }

  const name = field(body.name, 100);
  const email = field(body.email, 254);
  const company = field(body.company ?? "", 150);
  const timing = field(body.timing ?? "", 150);
  const message = field(body.message, 3000, true);
  const intent = body.intent as ContactIntent;
  const requestId = field(body.requestId, 36);
  const token = field(body.token, 2048);
  if (body.website || !name || !email || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)
    || company === null || timing === null || !message || message.length < 10
    || typeof intent !== "string" || !Object.hasOwn(contactIntents, intent)
    || !requestId || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestId)) {
    return reply(400, "Please check your name, email and message (at least 10 characters).");
  }
  if (!contactIsEnabled(config)) {
    return reply(503, "The form is temporarily unavailable. Please email hello@wivosoft.dk instead.");
  }
  if (!token) return reply(400, "Please complete the security check and try again.");

  try {
    const verification = await fetcher("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret: config.turnstileSecret!, response: token }),
      signal: AbortSignal.timeout(8000),
    });
    const result = await verification.json() as { success?: boolean; hostname?: string; action?: string };
    if (!verification.ok || !result.success || result.hostname !== new URL(request.url).hostname || result.action !== "contact") {
      return reply(400, "The security check expired or couldn’t be verified. Please try again.");
    }

    const sent = await fetcher("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `contact-${requestId}`,
      },
      body: JSON.stringify({
        from: config.fromEmail,
        to: [CONTACT_EMAIL],
        reply_to: email,
        subject: `Website enquiry: ${contactIntents[intent]}`,
        text: [
          `Enquiry: ${contactIntents[intent]}`,
          `Name: ${name}`,
          `Email: ${email}`,
          `Company: ${company || "Not provided"}`,
          `Timing: ${timing || "Not provided"}`,
          "", message,
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!sent.ok) return reply(502, "We couldn’t send your enquiry. Your message is still here — try again or email us directly.");
    const receipt = await sent.json() as { id?: string };
    if (!receipt.id) throw new Error("Missing delivery receipt");
    return reply(200);
  } catch {
    return reply(502, "We couldn’t confirm that your enquiry was sent. Your message is still here — try again or email us directly.");
  }
}
