"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { CONTACT_EMAIL, contactIntents, type ContactIntent } from "../lib/contact";

type TurnstileAPI = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  remove: (id: string) => void;
  reset: (id: string) => void;
};
declare global { interface Window { turnstile?: TurnstileAPI } }

const choices: { value: ContactIntent; description: string }[] = [
  { value: "team", description: "A consultant who works alongside your existing team." },
  { value: "project", description: "An application, integration, migration or improvement." },
  { value: "unsure", description: "Let’s talk through the problem and where to start." },
];
const emptyFields = { name: "", email: "", company: "", timing: "", message: "", website: "" };

export default function ContactForm() {
  const [intent, setIntent] = useState<ContactIntent | null>(null);
  const [fields, setFields] = useState(emptyFields);
  const [config, setConfig] = useState<{ enabled: boolean; siteKey: string | null } | null>(null);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const detailsHeading = useRef<HTMLHeadingElement>(null);
  const successHeading = useRef<HTMLHeadingElement>(null);
  const choiceHeading = useRef<HTMLHeadingElement>(null);
  const widget = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const requestId = useRef<string | null>(null);
  const hadIntent = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    fetch("/api/contact", { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error(); return response.json() as Promise<{ enabled?: unknown; siteKey?: unknown }>; })
      .then((value) => setConfig({ enabled: value.enabled === true, siteKey: typeof value.siteKey === "string" ? value.siteKey : null }))
      .catch(() => { setConfig({ enabled: false, siteKey: null }); })
      .finally(() => clearTimeout(timeout));
    return () => { clearTimeout(timeout); controller.abort(); };
  }, []);

  useEffect(() => {
    if (sent) successHeading.current?.focus();
    else if (intent) { hadIntent.current = true; detailsHeading.current?.focus(); }
    else if (hadIntent.current) choiceHeading.current?.focus();
  }, [intent, sent]);

  useEffect(() => {
    if (!config?.enabled || !config.siteKey || !intent || sent) return;
    let disposed = false;
    const mount = () => {
      if (disposed || !widget.current || !window.turnstile) return;
      widgetId.current = window.turnstile.render(widget.current, {
        sitekey: config.siteKey,
        action: "contact",
        theme: "light",
        size: widget.current.clientWidth < 300 ? "compact" : "flexible",
        callback: (value: string) => setToken(value),
        "expired-callback": () => setToken(""),
        "error-callback": () => { setToken(""); setError("The security check couldn’t load. Please try again or email us directly."); },
      });
    };
    let script = document.querySelector<HTMLScriptElement>("script[data-contact-turnstile]");
    if (window.turnstile) mount();
    else {
      if (!script) {
        script = document.createElement("script");
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.dataset.contactTurnstile = "true";
        window.document.head.appendChild(script);
      }
      script.addEventListener("load", mount);
      script.addEventListener("error", failed);
    }
    function failed() { setError("The security check couldn’t load. Please email us directly."); }
    return () => {
      disposed = true;
      script?.removeEventListener("load", mount);
      script?.removeEventListener("error", failed);
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [config, intent, sent]);

  function change(field: keyof typeof fields, value: string) {
    setFields((current) => ({ ...current, [field]: value }));
    requestId.current = null;
  }

  const emailHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Website enquiry: ${intent ? contactIntents[intent] : "Let’s talk"}`)}&body=${encodeURIComponent(`Name: ${fields.name}\nEmail: ${fields.email}\nCompany: ${fields.company}\nTiming: ${fields.timing}\n\n${fields.message}`)}`;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    if (!config?.enabled) { window.location.href = emailHref; return; }
    if (!token) { setError("Please complete the security check before sending."); return; }
    setSending(true);
    setError("");
    requestId.current ??= crypto.randomUUID();
    let serverError = "";
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, intent, token, requestId: requestId.current }),
        signal: AbortSignal.timeout(30000),
      });
      const result = await response.json() as { ok?: boolean; error?: string };
      if (!response.ok || result.ok !== true) {
        serverError = typeof result.error === "string" ? result.error : "We couldn’t send your enquiry. Please try again or email us directly.";
        throw new Error(serverError);
      }
      setSent(true);
      setFields(emptyFields);
    } catch {
      setError(serverError || "We couldn’t confirm that your enquiry was sent. Your message is still here — try again or email us directly.");
    } finally {
      setSending(false);
      setToken("");
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
    }
  }

  if (sent) return (
    <div className="consulting-form-panel consulting-form-success" role="status">
      <span className="consulting-success-mark" aria-hidden="true">✓</span>
      <h3 ref={successHeading} tabIndex={-1}>Thanks for getting in touch.</h3>
      <p>Your enquiry has been sent to us. We’ll reply to the email address you provided.</p>
      <a className="consulting-text-link" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
    </div>
  );

  return (
    <div className="consulting-form-panel">
      <p className="consulting-form-step">{intent ? "02 / A little about your challenge" : "01 / What kind of help do you need?"}</p>
      {!intent ? (
        <>
          <h3 ref={choiceHeading} tabIndex={-1}>Let’s find a good starting point.</h3>
          <div className="consulting-contact-choices">
            {choices.map((choice) => (
              <button key={choice.value} type="button" onClick={() => { setIntent(choice.value); setToken(""); requestId.current = null; }}>
                <span><strong>{contactIntents[choice.value]}</strong><span>{choice.description}</span></span><span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          <noscript><p>To use this form, enable JavaScript or <a href={`mailto:${CONTACT_EMAIL}`}>email us directly</a>.</p></noscript>
        </>
      ) : (
        <form onSubmit={submit} aria-busy={sending}>
          <div className="consulting-form-title"><h3 ref={detailsHeading} tabIndex={-1}>{contactIntents[intent]}</h3><button type="button" disabled={sending} onClick={() => { setIntent(null); setToken(""); setError(""); }}>Change</button></div>
          <fieldset disabled={sending} className="consulting-form-fields">
            <legend className="sr-only">Your contact details and enquiry</legend>
            <div className="consulting-form-row">
              <label htmlFor="contact-name">Name<input id="contact-name" name="name" autoComplete="name" required maxLength={100} value={fields.name} onChange={(e) => change("name", e.target.value)} /></label>
              <label htmlFor="contact-email">Email<input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} value={fields.email} onChange={(e) => change("email", e.target.value)} /></label>
            </div>
            <div className="consulting-form-row">
              <label htmlFor="contact-company">Company <span>(optional)</span><input id="contact-company" name="company" autoComplete="organization" maxLength={150} value={fields.company} onChange={(e) => change("company", e.target.value)} /></label>
              <label htmlFor="contact-timing">Timing <span>(optional)</span><input id="contact-timing" name="timing" placeholder="e.g. November, or still exploring" maxLength={150} value={fields.timing} onChange={(e) => change("timing", e.target.value)} /></label>
            </div>
            <label htmlFor="contact-message">{intent === "team" ? "Tell us about your team and the help you need" : "Tell us about the problem you’d like to solve"}<textarea id="contact-message" name="message" rows={5} required minLength={10} maxLength={3000} aria-describedby="contact-message-hint" value={fields.message} onChange={(e) => change("message", e.target.value)} /></label>
            <p id="contact-message-hint" className="consulting-form-hint">A few lines are enough. Please leave out passwords and other sensitive information.</p>
            <div className="consulting-honeypot" aria-hidden="true"><label htmlFor="contact-website">Website<input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={fields.website} onChange={(e) => change("website", e.target.value)} /></label></div>
          </fieldset>
          {config?.enabled && <div ref={widget} className="consulting-security-check" />}
          {error && <p className="consulting-form-error" role="alert">{error}</p>}
          {config && !config.enabled && <p className="consulting-form-hint">Send your enquiry through your email app. Your details will be included in the draft.</p>}
          <p className="consulting-form-privacy">We’ll use your details to respond to your enquiry. <Link href="/privacy">Privacy notice</Link></p>
          <button className="consulting-button consulting-submit" type="submit" disabled={sending || !config || (config.enabled && !token)}>{sending ? "Sending…" : !config ? "Preparing…" : config.enabled ? "Send enquiry" : "Open email draft"}</button>
          {config?.enabled && <a className="consulting-form-email-fallback" href={emailHref}>Prefer your email app?</a>}
        </form>
      )}
    </div>
  );
}
