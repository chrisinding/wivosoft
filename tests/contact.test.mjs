import assert from "node:assert/strict";
import test from "node:test";
import { contactIsEnabled, handleContact } from "../lib/contact.ts";

const config = { apiKey: "test-resend-key", fromEmail: "Wivosoft <website@wivosoft.dk>", turnstileSecret: "test-turnstile-secret", turnstileSiteKey: "test-public-site-key" };
const enquiry = { intent: "team", name: " Test Person ", email: "person@example.com", company: "Example", timing: "November", message: "We could use a hand with a .NET integration.\nCan we talk?", token: "test-token", requestId: "31a3f274-79c8-4c4a-9262-cb6b2a229e58", website: "" };
function request(body = enquiry, headers = {}) {
  return new Request("https://wivosoft.dk/api/contact", { method: "POST", headers: { origin: "https://wivosoft.dk", "content-type": "application/json", ...headers }, body: typeof body === "string" ? body : JSON.stringify(body) });
}
function providers(verification = { success: true, hostname: "wivosoft.dk", action: "contact" }, sendStatus = 200) {
  const calls = [];
  return { calls, fetch: async (url, options) => {
    calls.push({ url, options });
    if (url.includes("siteverify")) return Response.json(verification);
    if (url === "https://api.resend.com/emails") return Response.json(sendStatus === 200 ? { id: "test-receipt" } : { message: "Private provider diagnostic" }, { status: sendStatus });
    throw new Error("Unexpected outbound request");
  } };
}

test("sends a verified enquiry to the fixed inbox with reply-to and retry protection", async () => {
  const mock = providers();
  const response = await handleContact(request(), config, mock.fetch);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(mock.calls.length, 2);
  const verification = new URLSearchParams(mock.calls[0].options.body);
  assert.equal(verification.get("secret"), config.turnstileSecret);
  assert.equal(verification.get("response"), enquiry.token);
  const email = JSON.parse(mock.calls[1].options.body);
  assert.deepEqual(email.to, ["hello@wivosoft.dk"]);
  assert.equal(email.from, config.fromEmail);
  assert.equal(email.reply_to, enquiry.email);
  assert.match(email.text, /Name: Test Person\n/);
  assert.match(email.text, /November/);
  assert.match(email.text, /Can we talk\?/);
  assert.equal(email.html, undefined);
  assert.equal(mock.calls[1].options.headers.Authorization, `Bearer ${config.apiKey}`);
  assert.equal(mock.calls[1].options.headers["Idempotency-Key"], `contact-${enquiry.requestId}`);
  assert.ok(mock.calls.every((call) => call.options.signal instanceof AbortSignal));
  await handleContact(request({ ...enquiry, token: "fresh-token" }), config, mock.fetch);
  assert.equal(mock.calls[1].options.headers["Idempotency-Key"], mock.calls[3].options.headers["Idempotency-Key"]);
  assert.equal(mock.calls[1].options.body, mock.calls[3].options.body);
});

test("requires every delivery setting and never claims to send when disabled", async () => {
  assert.equal(contactIsEnabled(config), true);
  for (const key of Object.keys(config)) {
    const incomplete = { ...config, [key]: undefined };
    assert.equal(contactIsEnabled(incomplete), false);
    const mock = providers();
    const response = await handleContact(request(), incomplete, mock.fetch);
    assert.equal(response.status, 503);
    assert.match((await response.json()).error, /email hello@wivosoft.dk/);
    assert.equal(mock.calls.length, 0);
  }
});

test("rejects invalid enquiries, header injection, oversized input and the spam trap before calling providers", async () => {
  for (const invalid of [
    { name: "" }, { name: "Person\nBcc: other@example.com" }, { email: "not-an-email" },
    { email: "person@example.com\r\nBcc: other@example.com" }, { company: "x".repeat(151) },
    { message: "short" }, { message: "x".repeat(3001) }, { message: "Bad\u0000message" },
    { intent: "__proto__" }, { intent: { toString: "no" } }, { requestId: "not-a-uuid" },
    { website: "spam.example.com" }, { name: 123 },
  ]) {
    const mock = providers();
    assert.equal((await handleContact(request({ ...enquiry, ...invalid }), config, mock.fetch)).status, 400, JSON.stringify(invalid));
    assert.equal(mock.calls.length, 0);
  }
  const mock = providers();
  for (const invalid of ["not JSON", "null", "[]", JSON.stringify({ text: "x".repeat(20001) })]) assert.equal((await handleContact(request(invalid), config, mock.fetch)).status, 400);
  assert.equal(mock.calls.length, 0);
});

test("rejects cross-origin requests, wrong content types and missing origin", async () => {
  const mock = providers();
  assert.equal((await handleContact(request(enquiry, { origin: "https://other.example" }), config, mock.fetch)).status, 403);
  assert.equal((await handleContact(request(enquiry, { "content-type": "text/plain" }), config, mock.fetch)).status, 415);
  const noOrigin = request();
  noOrigin.headers.delete("origin");
  assert.equal((await handleContact(noOrigin, config, mock.fetch)).status, 403);
  assert.equal(mock.calls.length, 0);
});

test("requires a verified token for the matching hostname and contact action", async () => {
  const noToken = providers();
  assert.equal((await handleContact(request({ ...enquiry, token: "" }), config, noToken.fetch)).status, 400);
  assert.equal(noToken.calls.length, 0);
  for (const verification of [{ success: false }, { success: true, hostname: "other.example", action: "contact" }, { success: true, hostname: "wivosoft.dk", action: "login" }]) {
    const mock = providers(verification);
    assert.equal((await handleContact(request(), config, mock.fetch)).status, 400);
    assert.equal(mock.calls.length, 1);
  }
});

test("delivery errors and network failures return an actionable error without leaking provider details", async () => {
  for (const status of [401, 429, 500]) {
    const mock = providers(undefined, status);
    const response = await handleContact(request(), config, mock.fetch);
    assert.equal(response.status, 502);
    const error = (await response.json()).error;
    assert.match(error, /message is still here/);
    assert.doesNotMatch(error, /Private provider diagnostic|test-resend-key/);
  }
  const response = await handleContact(request(), config, async () => { throw new Error("Private network details"); });
  assert.equal(response.status, 502);
  assert.match((await response.json()).error, /couldn’t confirm/);
});
