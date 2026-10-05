import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Brand from "./Brand";
import ContactForm from "./ContactForm";

const title = "Wivosoft — Software Consulting";
const description =
  "Independent .NET and Java consultants in Copenhagen. Development, integrations, testing and migration for business-critical software. Available for new assignments.";
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
        url: "/wivosoft-social.png",
        width: 1200,
        height: 630,
        alt: "Wivosoft — Independent .NET and Java consultants in Copenhagen. Better software. Built together.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/wivosoft-social.png"],
  },
};

const services = [
  {
    number: "01",
    title: "Software development",
    copy: "Build features, connect systems and improve existing applications. Our experience includes .NET services, Java backends, payment and signing flows, and integrations with public-sector data.",
    capabilities: "C# / .NET · Java / Spring Boot · REST & GraphQL",
    situation: "For a defined project or extra capacity in your team.",
  },
  {
    number: "02",
    title: "Quality engineering",
    copy: "Make releases easier to trust. We build automated tests, investigate performance and integrate quality checks into delivery pipelines, drawing on experience in both testing and development.",
    capabilities: "Integration tests · Browser automation · CI/CD",
    situation: "For important workflows that need to keep working.",
  },
  {
    number: "03",
    title: "Modernization & migration",
    copy: "Upgrade frameworks and move data between systems with checks along the way. We’ve worked on .NET and Grails upgrades, REST-to-GraphQL integration changes and insurance data migrations.",
    capabilities: "Framework upgrades · SQL · Data migration",
    situation: "For changes where existing behaviour and data matter.",
  },
];

const founders = [
  {
    name: "Christian Volck Sinding",
    photo: "/christian-volck.webp",
    photoWidth: 1065,
    photoHeight: 1477,
    photoClass: "consulting-portrait-christian",
    focus: ".NET & Java / Team Lead / Scrum Master",
    copy: "Nearly five years in consulting, spanning testing and software development. Christian has worked on public-sector systems for Erhvervsstyrelsen and Domstolsstyrelsen, with hands-on .NET, Java and Groovy development alongside Team Lead and Scrum Master responsibilities.",
    linkedin: "https://www.linkedin.com/in/christian-volck-sinding-86545682/",
    cv: "/cv/Christian_Volck_Sinding_CV.pdf",
  },
  {
    name: "Tobias Wiik Thalbitzer",
    photo: "/tobias-wiik.webp",
    photoWidth: 1024,
    photoHeight: 1536,
    photoClass: "consulting-portrait-tobias",
    focus: "Java & Spring Boot / Data Migration / Tech Lead",
    copy: "Nearly five years in consulting, spanning testing and software development. Tobias has worked on insurance systems and data migrations for Topdanmark and If, including technical and team leadership on a migration to Guidewire, alongside Java backend development and test automation.",
    linkedin: "https://www.linkedin.com/in/tobias-thalbitzer-b36055146/",
    cv: "/cv/Tobias_Wiik_Thalbitzer_CV.pdf",
  },
];

const projects = [
  { name: "Puppy Tracker", type: "iOS app / Christian", mark: "PT", copy: "An app for breeders to track puppy weights, growth, feeding and litter data, with authentication and database access controls.", tech: "React · JavaScript · Supabase · SQL", href: "https://apps.apple.com/dk/app/puppy-tracker/id6765893506", link: "View on the App Store" },
  { name: "Can My Dog Eat This?", type: "iOS app / Christian", mark: "?", copy: "An offline food reference for dog owners, with search in five languages, typo handling and automated tests.", tech: "React · TypeScript · Capacitor · Vitest", href: "https://apps.apple.com/dk/app/can-my-dog-eat-this/id6797205829", link: "View on the App Store" },
  { name: "JobWatcher", type: "Web application / Tobias", mark: "JW", copy: "A job-search application combining authentication, web search and structured AI outputs to help find relevant opportunities.", tech: "Supabase · OpenAI API · Web search", href: "https://jobwatcherai.com/", link: "Visit JobWatcher" },
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
          <a href="#work">Our experience</a>
          <a href="#people">Who we are</a>
        </nav>
        <a className="consulting-header-contact" href="#contact">Let’s talk</a>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="consulting-hero consulting-container" aria-labelledby="public-title">
          <div className="consulting-hero-copy">
            <p className="consulting-eyebrow"><span className="consulting-dot" /> Available for new assignments</p>
            <h1 id="public-title">Better software.<br /><span>Built together.</span></h1>
            <p className="consulting-lead">
              Independent .NET and Java consultants in Copenhagen.
              We help teams build, integrate and modernise business-critical software —
              as part of your team or through a clearly scoped project.
            </p>
            <div className="consulting-hero-actions">
              <a className="consulting-button" href="#contact">Let’s talk about your project</a>
              <a className="consulting-text-link" href="#work">Explore our experience</a>
            </div>
            <p className="consulting-location">Remote or on-site in Copenhagen · Work with one or both of us</p>
          </div>
        </section>

        <div className="consulting-capabilities consulting-container" aria-label="Technology and capabilities">
          <span>Technologies we work with</span>
          <ul>{[".NET / C#", "Java", "SQL", "React", "Python", "CI/CD"].map((item) => <li key={item}>{item}</li>)}</ul>
        </div>

        <section className="consulting-services consulting-band" id="services" aria-labelledby="services-title">
          <div className="consulting-container consulting-section">
            <div className="consulting-section-heading">
              <p className="consulting-eyebrow">01 / What we do</p>
              <div><h2 id="services-title">Build. Test.<br />Move forward.</h2><p>Hands-on development and testing for teams with existing systems, new features or a migration ahead.</p></div>
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

        <section id="work" className="consulting-work" aria-labelledby="work-title">
          <div className="consulting-container consulting-section">
            <div className="consulting-section-heading">
              <p className="consulting-eyebrow">02 / Our experience</p>
              <div><h2 id="work-title">Experience with systems<br />people depend on.</h2><p>Before starting Wivosoft, we worked as consultants at Netcompany. These examples come from those roles.</p></div>
            </div>
            <div className="consulting-experience-grid">
              <article><p className="consulting-card-label">Public sector / Christian</p><h3>Application upgrades & integrations</h3><p>Developed and maintained services for Erhvervsstyrelsen and Domstolsstyrelsen. Work included .NET and Grails upgrades, GraphQL data integrations and more robust message delivery, supported by automated tests.</p><p className="consulting-work-tech">C# · .NET · Java · Groovy · SQL Server</p></article>
              <article><p className="consulting-card-label">Insurance / Tobias</p><h3>Data migration & technical leadership</h3><p>Worked on insurance data migrations for Topdanmark and If. At If, led technical and team work on an agriculture migration to Guidewire, including migration architecture, test environments and data verification.</p><p className="consulting-work-tech">Java · Spring Boot · SQL · Guidewire</p></article>
            </div>
            <div className="consulting-projects-intro"><h3>Products we’ve built ourselves</h3><p>Independent projects developed alongside our previous roles, including two apps shipped to the App Store.</p></div>
            <div className="consulting-project-grid">
              {projects.map((project) => <article className="consulting-project" key={project.name}><div className="consulting-project-mark" aria-hidden="true">{project.mark}</div><p className="consulting-card-label">{project.type}</p><h3>{project.name}</h3><p>{project.copy}</p><p className="consulting-work-tech">{project.tech}</p><a className="consulting-text-link" href={project.href} target="_blank" rel="noopener noreferrer">{project.link}<span className="sr-only"> (opens in a new tab)</span></a></article>)}
            </div>
          </div>
        </section>

        <section className="consulting-people consulting-band" id="people" aria-labelledby="people-title">
          <div className="consulting-container consulting-section">
            <div className="consulting-section-heading">
              <p className="consulting-eyebrow">03 / Who we are</p>
              <div><h2 id="people-title">Meet the people<br />doing the work.</h2><p>We’re Christian and Tobias, two independent consultants building Wivosoft. We both started in quality engineering at Netcompany before moving into development. You work directly with us.</p></div>
            </div>
            <div className="consulting-founder-grid">
              {founders.map((founder) => (
                <article className="consulting-founder" key={founder.name}>
                  <div className={`consulting-founder-photo ${founder.photoClass}`}>
                    <Image
                      src={founder.photo}
                      alt={founder.name}
                      width={founder.photoWidth}
                      height={founder.photoHeight}
                      unoptimized
                    />
                  </div>
                  <div><p className="consulting-founder-label">Co-founder / Consultant</p><h3>{founder.name}</h3><p className="consulting-founder-focus">{founder.focus}</p><p className="consulting-founder-bio">{founder.copy}</p><div className="consulting-founder-links"><a href={founder.cv} download>Download CV <span className="sr-only">for {founder.name}</span><span aria-hidden="true">↗</span></a><a href={founder.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<span className="sr-only"> for {founder.name} (opens in a new tab)</span><span aria-hidden="true">↗</span></a></div></div>
                </article>
              ))}
            </div>
            <p className="consulting-background-note">We also share an engineering background from DTU, where we worked extensively with Python.</p>
          </div>
        </section>

        <section className="consulting-working" id="working-together" aria-labelledby="working-title">
          <div className="consulting-container consulting-section">
            <div className="consulting-section-heading"><p className="consulting-eyebrow">04 / Working together</p><div><h2 id="working-title">An extra colleague.<br />Or a project partner.</h2><p>Available for remote assignments or on-site work in Copenhagen. Bring in one of us or work with both.</p></div></div>
            <div className="consulting-engagements">
              <article><span className="consulting-engagement-label">Alongside your team</span><h3>Add experience where you need it.</h3><p>We join your team’s existing tools and routines, contributing to development, testing or a change already underway.</p></article>
              <article><span className="consulting-engagement-label">A defined piece of work</span><h3>Agree on a scope. Then get to work.</h3><p>We talk through the problem, agree on deliverables and responsibilities, and share progress and knowledge as we go.</p></article>
            </div>
            <a className="consulting-text-link consulting-working-cta" href="#contact">Tell us what you need</a>
          </div>
        </section>

        <section className="consulting-contact consulting-container" id="contact" aria-labelledby="contact-title">
          <div className="consulting-contact-copy"><p className="consulting-eyebrow">05 / Let’s talk</p><h2 id="contact-title">What are you<br /><span>working on?</span></h2><p className="consulting-contact-intro">Tell us where you could use a hand. We’ll start with a conversation about the work and whether we’re a good fit.</p><a className="consulting-contact-email" href={contactHref}>hello@wivosoft.dk</a><p className="consulting-contact-hint">Prefer to write in Danish? Det gør du bare.</p></div>
          <ContactForm />
        </section>
      </main>

      <footer className="consulting-footer">
        <div className="consulting-container">
          <div className="consulting-footer-top"><Link href="/" aria-label="Wivosoft home"><Brand light /></Link><p>Independent software consultants.<br />Copenhagen, Denmark.</p><a href="#top">Back to top</a></div>
          <div className="consulting-footer-bottom"><span>© {new Date().getFullYear()} Wivosoft</span><Link href="/privacy">Privacy notice</Link><a href="mailto:hello@wivosoft.dk">hello@wivosoft.dk</a></div>
        </div>
      </footer>
    </div>
  );
}
