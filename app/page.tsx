import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const title = "Wivosoft — Software Consulting";
const description =
  "Software consulting across development, technical testing and business-critical systems.";

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

const capabilities = [
  ".NET",
  "Java",
  "Python",
  "Test Automation",
  "Migration",
  "CI/CD",
];

const founders = [
  {
    name: "Christian",
    focus: "Quality Engineering & Software Development",
  },
  {
    name: "Tobias",
    focus: "Software Modernization & Migration",
  },
];

export default function Home() {
  return (
    <div className="public-site">
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="public-header">
        <Link className="public-wordmark" href="/" aria-label="Wivosoft home">
          <Image
            src="/wivosoft-logo.png"
            alt="Wivosoft"
            width={188}
            height={38}
            priority
          />
        </Link>
        <a className="public-header-contact" href="mailto:hello@wivosoft.dk">
          Get in touch <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main className="public-main" id="main-content">
        <section className="public-hero" aria-labelledby="public-title">
          <p className="public-kicker"><span /> Wivosoft / Software consulting</p>
          <h1 id="public-title">Engineering experience from both sides of the release.</h1>
          <p className="public-lead">
            Software consulting across development, technical testing and business-critical systems.
          </p>
          <div className="public-actions">
            <a className="public-primary-action" href="mailto:hello@wivosoft.dk">Get in touch</a>
            <a className="public-email" href="mailto:hello@wivosoft.dk">hello@wivosoft.dk</a>
          </div>
        </section>

        <div className="public-capabilities" aria-label="Technology and capabilities">
          {capabilities.map((capability, index) => (
            <span key={capability}>{capability}{index < capabilities.length - 1 && <i />}</span>
          ))}
        </div>

        <section className="public-about" aria-labelledby="public-about-title">
          <div className="public-about-label">
            <p>About Wivosoft</p>
            <span>Development · Testing · Delivery</span>
          </div>
          <div className="public-about-content">
            <h2 id="public-about-title">Wivosoft is founded by two software consultants.</h2>
            <div className="public-about-copy">
              <p>
                Our backgrounds span software development, technical testing and business-critical systems.
              </p>
              <p>
                Our experience includes development, migration, test automation, performance testing and CI/CD — giving us a strong focus on changing software safely rather than simply changing it quickly.
              </p>
            </div>

            <div className="public-founders" aria-label="Wivosoft founders">
              {founders.map((founder) => (
                <div className="public-founder" key={founder.name}>
                  <b>{founder.name}</b>
                  <span>{founder.focus}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="public-footer">
        <span>Wivosoft · Copenhagen / Denmark</span>
        <a href="mailto:hello@wivosoft.dk">hello@wivosoft.dk</a>
      </footer>
    </div>
  );
}
