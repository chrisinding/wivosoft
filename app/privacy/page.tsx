import type { Metadata } from "next";
import Link from "next/link";
import Brand from "../Brand";

export const metadata: Metadata = {
  title: "Privacy notice — Wivosoft",
  description: "How Wivosoft handles contact enquiries and personal information.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <div className="public-site consulting-site">
      <header className="consulting-header consulting-container"><Link href="/" aria-label="Wivosoft home"><Brand /></Link><Link href="/#contact" className="consulting-header-contact">Get in touch</Link></header>
      <main className="consulting-container consulting-privacy">
        <Link href="/">← Back to Wivosoft</Link>
        <h1>Privacy notice</h1>
        <p>Last updated: 5 October 2026.</p>
        <h2>Who handles your information</h2>
        <p>Wivosoft is being established by Christian Volck Sinding and Tobias Wiik Thalbitzer, based in Copenhagen, Denmark. We are responsible for the personal information you share when contacting us. You can reach us at <a href="mailto:hello@wivosoft.dk">hello@wivosoft.dk</a>.</p>
        <h2>Contact enquiries</h2>
        <p>When you contact us, we receive your name, email address and message, along with your company and timing if you provide them. We use this information to respond, discuss potential work and follow up on the enquiry.</p>
        <p>Our legal basis is our legitimate interest in responding to business enquiries (GDPR Article 6(1)(f)). Where you ask us to take steps towards a contract with you personally, Article 6(1)(b) applies. Please avoid including passwords, sensitive personal information or confidential client material.</p>
        <h2>Services used by this website</h2>
        <ul>
          <li>Cloudflare hosts the website and processes technical request information, such as IP addresses, to deliver and protect it.</li>
          <li>When the website’s direct-send form is enabled, Cloudflare Turnstile checks for automated submissions and Resend delivers your enquiry to our email inbox.</li>
          <li>If you choose to open an email draft, your own email provider sends the message. Opening a draft does not submit it to us.</li>
        </ul>
        <p>Our form does not save enquiries in a website database. Messages are handled in our email systems. Service providers may process information outside the EU/EEA under their applicable data protection arrangements. Read more in <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">Cloudflare’s privacy policy</a> and <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Resend’s privacy policy</a>.</p>
        <h2>How long we keep information</h2>
        <p>We keep enquiry information for as long as needed to handle the conversation and relevant follow-up, and delete it when it is no longer needed. If an enquiry leads to work together, necessary correspondence may be retained as part of that business relationship and any applicable record-keeping obligations.</p>
        <h2>Your rights</h2>
        <p>You may ask for access to your information, correction, deletion or restriction of processing, and you may object to processing based on legitimate interests. Where applicable, you also have a right to data portability. Contact us at <a href="mailto:hello@wivosoft.dk">hello@wivosoft.dk</a> to make a request.</p>
        <p>You can complain to the Danish supervisory authority, <a href="https://www.datatilsynet.dk/" target="_blank" rel="noopener noreferrer">Datatilsynet</a>.</p>
      </main>
    </div>
  );
}
