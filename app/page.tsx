import type { Metadata } from "next";
import Link from "next/link";
import Brand from "./Brand";

const title = "Wivosoft — Software Consulting";
const description =
  "Hands-on software consultants in Copenhagen. Development, quality engineering and modernization, through team support or scoped projects.";
const contactHref = "mailto:hello@wivosoft.dk?subject=Let%E2%80%99s%20talk%20about%20a%20project";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Wivosoft",
    title,
    description,
    images: [
      {
        url: "/og.png",
        width: 1731,
        height: 909,
        alt: "Wivosoft — software consulting across development, technical testing and business-critical systems.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

const services = [
  {
    number: "01",
    title: "Software development",
    copy: "Extra engineering capacity, a new feature, or a system that needs attention. We work with your team to build software that is easier to maintain and move forward.",
    capabilities: ".NET · Java · Python · Integrations",
    situation: "When your team needs another pair of hands.",
  },
  {
    number: "02",
    title: "Quality engineering",
    copy: "Make quality part of delivery. We build automated tests, investigate performance, and improve release pipelines so your team can make changes with more confidence.",
    capabilities: "Test automation · Performance testing · CI/CD",
    situation: "When releases take more effort than they should.",
  },
  {
    number: "03",
    title: "Modernization & migration",
    copy: "Move an existing application or its data to a better foundation. We help you understand what matters, plan the change, and verify the behavior and data along the way.",
    capabilities: "Legacy applications · Data migration · Verification",
    situation: "When your current system is holding you back.",
  },
];

const founders = [
  {
    name: "Christian Volck",
    initials: "C",
    focus: "Software Development & Quality Engineering",
    copy: "Project experience with Groovy, .NET and C#, including framework upgrades and modernization of existing applications.",
  },
  {
    name: "Tobias Wiik",
    initials: "T",
    focus: "Software Development & Quality Engineering",
    copy: "Project experience with Java, application development and migration, helping existing systems and their data move forward.",
  },
];

const firstSteps = [
  { title: "Talk it through", copy: "Tell us about your team, your software and the challenge in front of you." },
  { title: "Agree on the work", copy: "Together, we define the scope, responsibilities and a practical way to get started." },
  { title: "Get to work", copy: "We work closely with you, share progress and hand over knowledge as we go." },
];

export default function Home() {
  return (
    <div className="public-site consulting-site" id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="consulting-header consulting-container">
        <Link className="consulting-brand-link" href="/" aria-label="Wivosoft home">
          <Brand />
        </Link>
        <nav className="consulting-nav" aria-label="Primary navigation">
          <a href="#services">What we do</a>
          <a href="#working-together">How we work</a>
          <a href="#people">Who we are</a>
        </nav>
        <a className="consulting-header-contact" href="#contact">Let’s talk</a>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="consulting-hero consulting-container" aria-labelledby="public-title">
          <div className="consulting-hero-copy">
            <p className="consulting-eyebrow"><span className="consulting-dot" /> Independent software consultants</p>
            <h1 id="public-title">Better software.<br /><span>Built together.</span></h1>
            <p className="consulting-lead">
              Hands-on expertise in development, quality engineering and modernization.
              We join your team or take on a focused project to help your software move forward.
            </p>
            <div className="consulting-hero-actions">
              <a className="consulting-button" href={contactHref}>Let’s talk about your project</a>
              <a className="consulting-text-link" href="#services">Explore our services</a>
            </div>
            <p className="consulting-location">Based in Copenhagen, Denmark</p>
          </div>
        </section>

        <div className="consulting-capabilities consulting-container" aria-label="Technology and capabilities">
          <span>Built on practical experience</span>
          <ul>{[".NET", "Java", "Python", "Test automation", "Migration", "CI/CD"].map((item) => <li key={item}>{item}</li>)}</ul>
        </div>

        <section className="consulting-services consulting-band" id="services" aria-labelledby="services-title">
          <div className="consulting-container consulting-section">
            <div className="consulting-section-heading">
              <p className="consulting-eyebrow">01 / What we do</p>
              <div><h2 id="services-title">The right expertise.<br />Where you need it.</h2><p>From writing the code to making sure it works, we help with the parts of software delivery that need attention.</p></div>
            </div>
            <div className="consulting-service-grid">
              {services.map((service) => (
                <article className="consulting-service" key={service.number}>
                  <div className="consulting-service-top"><span>{service.number}</span></div>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                  <p className="consulting-service-capabilities">{service.capabilities}</p>
                  <div className="consulting-service-situation">{service.situation}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="consulting-working" id="working-together" aria-labelledby="working-title">
          <div className="consulting-container consulting-section">
            <div className="consulting-section-heading">
              <p className="consulting-eyebrow">02 / How we work</p>
              <div><h2 id="working-title">Your team. Your challenge.<br />A way forward, together.</h2><p>Some teams need an extra colleague. Others need a specific piece of work delivered. We can help with both.</p></div>
            </div>
            <div className="consulting-engagements">
              <article><span className="consulting-engagement-label">Alongside your team</span><h3>A consultant in your corner.</h3><p>We join your existing team, contribute to your day-to-day work, and bring experience where it is needed. Development, quality engineering, or support for a change already underway.</p><span className="consulting-engagement-detail">Team support · Ongoing collaboration</span></article>
              <article><span className="consulting-engagement-label">A defined piece of work</span><h3>A focused project, clearly scoped.</h3><p>We agree on the challenge, the deliverables and the responsibilities. Whether it is a migration, test automation or an application improvement, the work starts with a shared understanding.</p><span className="consulting-engagement-detail">Scoped projects · Agreed deliverables</span></article>
            </div>
            <div className="consulting-first-steps">
              <p>Getting started<br /><span>A conversation comes first.</span></p>
              <ol>{firstSteps.map((step, index) => <li key={step.title}><span className="consulting-step-number">0{index + 1}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div></li>)}</ol>
            </div>
          </div>
        </section>

        <section className="consulting-people consulting-band" id="people" aria-labelledby="people-title">
          <div className="consulting-container consulting-section">
            <div className="consulting-section-heading">
              <p className="consulting-eyebrow">03 / Who we are</p>
              <div><h2 id="people-title">A small team.<br />A shared background.</h2><p>We both started in quality engineering at Netcompany before moving into software development. That shared experience shapes how we build, test and improve software. At Wivosoft, you work directly with us.</p></div>
            </div>
            <div className="consulting-founder-grid">
              {founders.map((founder) => (
                <article className="consulting-founder" key={founder.name}>
                  <span className="consulting-founder-initial" aria-hidden="true">{founder.initials}</span>
                  <div><p className="consulting-founder-label">Co-founder / Consultant</p><h3>{founder.name}</h3><p className="consulting-founder-focus">{founder.focus}</p><p>{founder.copy}</p></div>
                </article>
              ))}
            </div>
            <div className="consulting-principle"><p>Engineering experience from both sides of the release.<br /><span>We think about how software is built, how it is tested, and what happens when it reaches the people who rely on it.</span></p></div>
            <p className="consulting-name-note">Wivosoft takes its name from Wiik and Volck.</p>
          </div>
        </section>

        <section className="consulting-contact consulting-container" id="contact" aria-labelledby="contact-title">
          <div><p className="consulting-eyebrow">04 / Let’s talk</p><h2 id="contact-title">What are you<br /><span>working on?</span></h2></div>
          <div className="consulting-contact-copy"><p>Tell us a little about your project, your team and the kind of help you need. We’ll start with a conversation about whether we’re a good fit.</p><a className="consulting-contact-email" href={contactHref}>hello@wivosoft.dk</a><p className="consulting-contact-hint">A few lines about the challenge and your timing is a good start.</p></div>
        </section>
      </main>

      <footer className="consulting-footer">
        <div className="consulting-container">
          <div className="consulting-footer-top"><Link href="/" aria-label="Wivosoft home"><Brand light /></Link><p>Software consulting.<br />A human approach.</p><a href="#top">Back to top</a></div>
          <div className="consulting-footer-bottom"><span>© {new Date().getFullYear()} Wivosoft</span><span>Copenhagen, Denmark</span><a href="mailto:hello@wivosoft.dk">hello@wivosoft.dk</a></div>
        </div>
      </footer>
    </div>
  );
}
