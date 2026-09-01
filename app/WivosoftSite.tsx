"use client";

import Image from "next/image";
import {
  AnimatePresence,
  animate,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type ExplanationMode = "simple" | "technical";
type ApplicationView = "legacy" | "modern";

const serviceHistory = [
  { date: "2025-04-09", event: "Annual service", type: "ANNL", reference: "SRV-4012" },
  { date: "2023-06-18", event: "Pump replacement", type: "REPL", reference: "SRV-3428" },
  { date: "2020-11-03", event: "Emergency repair", type: "EMRG", reference: "SRV-2671" },
  { date: "2019-04-12", event: "Inspection", type: "INSP", reference: "SRV-1933" },
];

const simpleProblems = [
  {
    title: "Your software has become difficult to change.",
    copy: "Small changes create unexpected problems, and releases require too much manual work.",
  },
  {
    title: "Your technology is getting old.",
    copy: "Critical systems may rely on unsupported components or knowledge held by very few people.",
  },
  {
    title: "You need a new system — but need to keep the old data.",
    copy: "Historical customers, cases, documents, transactions and workflows cannot simply disappear.",
  },
  {
    title: "You are spending too much time working around your software.",
    copy: "Manual processes, duplicate data entry and fragile integrations make everyday work slower.",
  },
];

const technicalAreas = [
  {
    code: "01 / RUNTIME",
    title: "Framework modernization",
    copy: ".NET Framework to modern .NET, older Java versions to supported releases, and unmaintained libraries to maintained dependencies.",
  },
  {
    code: "02 / CODEBASE",
    title: "Incremental architecture",
    copy: "Identify technical debt, risky areas and coupling. Improve structure where it helps without defaulting to a big-bang rewrite.",
  },
  {
    code: "03 / TESTING",
    title: "Behavioral protection",
    copy: "Automated regression, API and integration coverage, performance validation, and direct comparison of legacy and modern behavior.",
  },
  {
    code: "04 / DELIVERY",
    title: "Repeatable delivery",
    copy: "Build, test and deploy pipelines with repeatable releases, useful quality gates and fewer manual handovers.",
  },
  {
    code: "05 / MIGRATION",
    title: "Controlled data movement",
    copy: "Schema mapping, transformation rules, reconciliation, rollback planning, validation and clear migration reporting.",
  },
  {
    code: "06 / INTEGRATIONS",
    title: "Reliable boundaries",
    copy: "Modern APIs, improved observability and error handling, and deliberate removal of fragile point-to-point integrations.",
  },
];

const services = [
  {
    number: "01",
    title: "Modernize",
    copy: "Bring critical software onto supported, maintainable technology without throwing away the parts that already work.",
    items: [
      "Framework upgrades",
      "Architecture improvements",
      "Dependency upgrades",
      "Frontend modernization",
      "CI/CD",
      "Integrations",
      "Incremental replacement",
    ],
  },
  {
    number: "02",
    title: "Migrate",
    copy: "Move systems and historical data while preserving the information and business rules your organization depends on.",
    items: [
      "Application migration",
      "Database migration",
      "System replacement",
      "Data transformation",
      "Historical data preservation",
      "Validation and reconciliation",
    ],
  },
  {
    number: "03",
    title: "Verify",
    copy: "Prove that the modernized system still behaves the way the business expects.",
    items: [
      "Automated regression tests",
      "Integration and API tests",
      "Performance testing",
      "Migration validation",
      "Test automation",
      "CI/CD quality gates",
    ],
  },
];

const journeySteps = [
  {
    title: "Understand",
    copy: "Map the existing application, integrations, data and critical workflows.",
    signal: "SYSTEM MAP",
  },
  {
    title: "Protect",
    copy: "Establish automated tests around the behavior that must not change.",
    signal: "BASELINE SET",
  },
  {
    title: "Plan",
    copy: "Choose what to modernize, migrate, replace or leave alone.",
    signal: "SCOPE AGREED",
  },
  {
    title: "Modernize",
    copy: "Upgrade or replace the system incrementally where possible.",
    signal: "CHANGE CONTROLLED",
  },
  {
    title: "Migrate",
    copy: "Move historical data using explicit mapping and validation rules.",
    signal: "DATA RECONCILED",
  },
  {
    title: "Verify",
    copy: "Compare behavior, data and performance before switching over.",
    signal: "EVIDENCE READY",
  },
  {
    title: "Release",
    copy: "Move to the new system with monitoring, rollback options and confidence.",
    signal: "READY TO SWITCH",
  },
];

const migrationRecords = [
  { label: "Customers", total: "12,481" },
  { label: "Machines", total: "37,892" },
  { label: "Service Cases", total: "108,291" },
  { label: "Historical Notes", total: "284,109" },
];

const migrationChecks = [
  { label: "Missing records", result: "0", status: "ok" },
  { label: "Duplicate customers", result: "14", status: "warning" },
  { label: "Broken references", result: "3", status: "warning" },
  { label: "Financial totals", result: "MATCH", status: "ok" },
  { label: "Service history", result: "MATCH", status: "ok" },
] as const;

function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Wivosoft home">
        <Image
          src="/wivosoft-logo.png"
          alt="Wivosoft"
          width={188}
          height={38}
          priority
        />
      </a>

      <button
        ref={menuButton}
        className="mobile-menu-button"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>

      <nav
        id="primary-navigation"
        aria-label="Primary navigation"
        data-open={menuOpen}
      >
        <a href="#what-we-do" onClick={closeMenu}>What we do</a>
        <a href="#how-we-work" onClick={closeMenu}>How we work</a>
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
        <a className="nav-cta" href="#contact" onClick={closeMenu}>
          Talk to us <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}

function ArchitectureVisual() {
  return (
    <div
      className="architecture-visual"
      role="img"
      aria-label="A system map showing protected data moving from a legacy core to a modern application with validation in between"
    >
      <div className="architecture-grid" aria-hidden="true" />
      <div className="architecture-caption">
        <span>CONTROLLED CHANGE</span>
        <span>FIG. 01</span>
      </div>
      <div className="architecture-path path-one" aria-hidden="true" />
      <div className="architecture-path path-two" aria-hidden="true" />
      <div className="architecture-node node-legacy">
        <small>01 / EXISTING</small>
        <b>Legacy core</b>
        <span>Business rules</span>
      </div>
      <div className="architecture-node node-data">
        <small>DATA</small>
        <b>10y</b>
        <span>History</span>
      </div>
      <div className="architecture-node node-tests">
        <small>02 / PROTECT</small>
        <b>Regression suite</b>
        <span className="node-status"><i /> Baseline passing</span>
      </div>
      <div className="architecture-node node-modern">
        <small>03 / MODERN</small>
        <b>Supported system</b>
        <span>Verified behavior</span>
      </div>
      <div className="architecture-readout">
        <span>DATA</span><b>PRESERVED</b>
        <span>BEHAVIOR</span><b>VERIFIED</b>
        <span>RELEASE</span><b>CONTROLLED</b>
      </div>
    </div>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero" id="top">
      <motion.div
        className="hero-copy"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="eyebrow">
          <span /> Software modernization · Migration · Quality engineering
        </p>
        <h1>
          Modernizing software without breaking <em>what already works.</em>
        </h1>
        <p className="hero-lead">
          Wivosoft helps organizations modernize legacy applications, migrate
          critical systems and data, and build automated quality assurance
          around the software their business depends on.
        </p>
        <div className="hero-actions">
          <a className="button button-secondary" href="#how-we-work">
            See how we work <span aria-hidden="true">↘</span>
          </a>
          <a className="button button-primary" href="#contact">
            Talk to Wivosoft
          </a>
        </div>
        <p className="tech-line">
          <span>.NET</span><i /> <span>Java</span><i /> <span>Migration</span><i />
          <span>Test Automation</span><i /> <span>Business-Critical Systems</span>
        </p>
      </motion.div>
      <motion.div
        className="hero-visual-wrap"
        initial={reduceMotion ? false : { opacity: 0, x: 18 }}
        animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        <ArchitectureVisual />
      </motion.div>
    </section>
  );
}

function LegacyApplication() {
  return (
    <article className="legacy-app" aria-label="Legacy service administration application">
      <div className="legacy-titlebar">
        <strong>SERVICE ADMINISTRATION v4.2</strong>
        <span>Nordic Service Administration</span>
        <div aria-hidden="true">_ □ ×</div>
      </div>
      <div className="legacy-menu">File&nbsp;&nbsp; Edit&nbsp;&nbsp; Customer&nbsp;&nbsp; Equipment&nbsp;&nbsp; Service&nbsp;&nbsp; Reports&nbsp;&nbsp; Help</div>
      <div className="legacy-toolbar" aria-hidden="true">
        {[
          "New", "Open", "Save", "Print", "Search", "Refresh", "Close",
        ].map((item) => <span key={item}>▣<small>{item}</small></span>)}
      </div>
      <div className="legacy-tabs">
        <b>Customer</b><span>Equipment</span><span>Service Cases</span><span>History</span>
      </div>
      <div className="legacy-body">
        <fieldset>
          <legend>Customer / Equipment</legend>
          <div className="legacy-form-grid">
            <label>Customer No:<input value="10442" readOnly tabIndex={-1} /></label>
            <label className="wide">Customer:<input value="Nordic Pumps A/S" readOnly tabIndex={-1} /></label>
            <label>Machine ID:<input value="XR-442" readOnly tabIndex={-1} /></label>
            <label className="wide">Machine:<input value="Industrial Pump XR-442" readOnly tabIndex={-1} /></label>
            <label>Status:<input value="A" readOnly tabIndex={-1} /></label>
            <label>Site code:<input value="CPH-04" readOnly tabIndex={-1} /></label>
          </div>
        </fieldset>
        <fieldset>
          <legend>Service History</legend>
          <table>
            <thead><tr><th>DATE</th><th>TYPE</th><th>DESCRIPTION</th><th>REF.ID</th><th>STS</th></tr></thead>
            <tbody>
              {serviceHistory.slice().reverse().map((record) => (
                <tr key={record.date}>
                  <td data-label="Date">{record.date}</td><td data-label="Type">{record.type}</td>
                  <td data-label="Description">{record.event}</td><td data-label="Reference">{record.reference}</td><td data-label="Status">C</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="legacy-table-footer">Records: 4&nbsp;&nbsp; Selected: 0&nbsp;&nbsp; Archive: 2015–2025&nbsp;&nbsp; Filter: ALL</div>
        </fieldset>
      </div>
      <div className="legacy-functions">F1 Help&nbsp;&nbsp; F3 Search&nbsp;&nbsp; F5 Refresh&nbsp;&nbsp; F8 History&nbsp;&nbsp; F10 Save&nbsp;&nbsp; Esc Close</div>
    </article>
  );
}

function ModernApplication() {
  return (
    <article className="modern-app" aria-label="Modern service administration application">
      <aside className="modern-sidebar" aria-hidden="true">
        <b>W</b><span className="active" /><span /><span /><span />
      </aside>
      <div className="modern-content">
        <div className="modern-appbar">
          <div className="modern-app-identity"><small>NORDIC SERVICE ADMINISTRATION</small><b>Equipment</b></div>
          <div className="modern-search" aria-hidden="true"><span>⌕</span><span>Search equipment</span></div>
        </div>

        <div className="modern-desktop-layout">
          <div className="modern-ops-head">
            <div>
              <small>EQUIPMENT / XR-442</small>
              <h3>Industrial Pump XR-442</h3>
              <p>Nordic Pumps A/S <span>·</span> Customer no. 10442</p>
            </div>
            <div className="modern-ops-status">
              <span className="active-badge"><i /> Active <small>CODE A</small></span>
              <div className="modern-latest"><small>LATEST SERVICE</small><b>Annual service</b><time dateTime="2025-04-09">2025-04-09</time></div>
            </div>
          </div>

          <dl className="modern-summary" aria-label="Equipment summary">
            <div className="summary-customer"><dt>Customer</dt><dd>Nordic Pumps A/S <small>10442</small></dd></div>
            <div className="summary-equipment"><dt>Equipment</dt><dd>Industrial Pump XR-442 <small>XR-442</small></dd></div>
            <div className="summary-site"><dt>Site</dt><dd>CPH-04</dd></div>
            <div className="summary-status"><dt>Status</dt><dd><i /> Active <small>Code A</small></dd></div>
            <div className="summary-service"><dt>Latest service</dt><dd>Annual service <small>2025-04-09</small></dd></div>
          </dl>

          <div className="modern-history modern-history-desktop">
            <div className="modern-history-title">
              <div><small>SERVICE HISTORY</small><b>4 completed records</b></div>
              <div className="modern-history-tools" aria-hidden="true"><span>⌕&nbsp; Search history</span><span>All records&nbsp; ▾</span></div>
            </div>
            <table className="modern-history-table">
              <thead><tr><th>Date</th><th>Service</th><th>Reference</th><th>Status</th></tr></thead>
              <tbody>
                {serviceHistory.map((record) => (
                  <tr key={record.date}>
                    <td><time dateTime={record.date}>{record.date}</time></td>
                    <td><b>{record.event}</b><small>{record.type}</small></td>
                    <td><code>{record.reference}</code></td>
                    <td><span className="completed-status"><i /> Completed <small>CODE C</small></span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="preservation-note preservation-note-compact"><span>✓</span><div><b>10 years of service history preserved</b><small>Archive coverage 2015–2025 · 4 of 4 displayed records reconciled</small></div></div>
        </div>

        <div className="modern-mobile-layout">
          <div className="modern-heading">
            <div><small>EQUIPMENT / XR-442</small><h3>Industrial Pump XR-442</h3><p>Nordic Pumps A/S <span>·</span> Customer no. 10442</p></div>
            <span className="active-badge"><i /> Active <small>CODE A</small></span>
          </div>
          <div className="modern-facts">
            <div><small>Customer</small><b>Nordic Pumps A/S</b><span>10442</span></div>
            <div><small>Equipment</small><b>Industrial Pump XR-442</b><span>XR-442 · SITE CPH-04</span></div>
            <div><small>Latest service</small><b>Annual service</b><span>2025-04-09</span></div>
          </div>
          <div className="modern-history">
            <div className="modern-history-title"><div><small>SERVICE HISTORY</small><b>4 completed records</b></div><span className="modern-filter" aria-hidden="true">Filter&nbsp; ▾</span></div>
            <div className="modern-timeline">
              {serviceHistory.map((record) => (
                <div key={record.date}>
                  <span className="timeline-dot">✓</span>
                  <div><b>{record.event}</b><small>{record.type} · {record.reference} · STATUS C</small></div>
                  <time>{record.date}</time>
                </div>
              ))}
            </div>
          </div>
          <div className="preservation-note"><span>✓</span><div><b>10 years of service history preserved</b><small>Archive coverage 2015–2025 · 4 of 4 displayed records reconciled</small></div></div>
        </div>
      </div>
    </article>
  );
}

export function LegacyModernSlider() {
  const [position, setPosition] = useState(48);
  const [mobileView, setMobileView] = useState<ApplicationView>("modern");
  const stageRef = useRef<HTMLDivElement>(null);
  const sliderTouched = useRef(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || reduceMotion) return;

    let nudge: ReturnType<typeof animate> | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || sliderTouched.current) return;
      observer.disconnect();
      nudge = animate(48, [48, 50.2, 45.8, 48], {
        delay: 0.35,
        duration: 1.15,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (value) => setPosition(value),
      });
    }, { threshold: 0.55 });

    observer.observe(stage);
    return () => {
      observer.disconnect();
      nudge?.stop();
    };
  }, [reduceMotion]);

  const updatePosition = (value: number) => {
    sliderTouched.current = true;
    setPosition(value);
  };

  return (
    <section className="comparison-section section-shell" aria-labelledby="comparison-title">
      <FadeIn className="comparison-intro">
        <div>
          <p className="section-kicker"><span>INTERACTIVE EXAMPLE</span> / FICTIONAL SYSTEM</p>
          <h2 id="comparison-title">Modernization does not mean starting from zero.</h2>
        </div>
        <p>Keep the data, workflows and business knowledge that matter. Replace the technology that no longer does.</p>
      </FadeIn>

      <FadeIn className="comparison-frame" delay={0.08}>
        <div className="comparison-meta">
          <span><i className="legacy-key" /> Legacy · 2011</span>
          <span><b aria-hidden="true">↔</b> Drag to compare</span>
          <span><i className="modern-key" /> Modern · Today</span>
        </div>

        <div className="desktop-comparison">
          <div
            className="comparison-stage"
            ref={stageRef}
            style={{ "--comparison-position": `${position}%` } as CSSProperties}
          >
            <div className="compare-layer modern-layer" aria-hidden="true"><ModernApplication /></div>
            <div className="compare-layer legacy-layer" aria-hidden="true"><LegacyApplication /></div>
            <div className="compare-divider" aria-hidden="true">
              <div className="compare-handle"><span>↔</span></div>
            </div>
            <input
              className="comparison-range"
              type="range"
              min="4"
              max="96"
              value={position}
              aria-label="Reveal legacy versus modern application"
              aria-describedby="comparison-description"
              aria-valuetext={`${position}% legacy and ${100 - position}% modern`}
              onChange={(event) => updatePosition(Number(event.target.value))}
            />
            <p className="sr-only" id="comparison-description">A fictional service administration system shown before and after modernization. Customer Nordic Pumps A/S, equipment XR-442 and its complete service archive are preserved in both versions. Use the arrow keys to change the visual split.</p>
          </div>
        </div>

        <div className="mobile-comparison">
          <div className="application-toggle" role="group" aria-label="Choose application version">
            <button type="button" aria-pressed={mobileView === "legacy"} onClick={() => setMobileView("legacy")}>Legacy</button>
            <button type="button" aria-pressed={mobileView === "modern"} onClick={() => setMobileView("modern")}>Modern</button>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mobileView}
              className="mobile-application-view"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {mobileView === "legacy" ? <LegacyApplication /> : <ModernApplication />}
            </motion.div>
          </AnimatePresence>
        </div>
      </FadeIn>
    </section>
  );
}

export function ExplanationModeToggle() {
  const [mode, setMode] = useState<ExplanationMode>("simple");
  const reduceMotion = useReducedMotion();

  return (
    <section className="explanation-section section-shell" aria-labelledby="detail-title">
      <FadeIn className="explanation-topline">
        <div><p className="section-kicker">THE SAME PROBLEM / TWO PERSPECTIVES</p><h2 id="detail-title">How much detail do you want?</h2></div>
        <div className="mode-toggle" role="group" aria-label="Explanation detail">
          <button type="button" aria-pressed={mode === "technical"} onClick={() => setMode("technical")}>Technical</button>
          <button type="button" aria-pressed={mode === "simple"} onClick={() => setMode("simple")}>Keep it simple</button>
        </div>
      </FadeIn>

      <div className="explanation-panel">
        <AnimatePresence mode="wait" initial={false}>
          {mode === "simple" ? (
            <motion.div
              key="simple"
              className="simple-explanation"
              initial={reduceMotion ? false : { opacity: 0, y: 6, filter: "blur(2px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -4, filter: "blur(2px)" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="problem-list">
                {simpleProblems.map((problem, index) => (
                  <article key={problem.title}><span>0{index + 1}</span><div><h3>{problem.title}</h3><p>{problem.copy}</p></div></article>
                ))}
              </div>
              <aside className="simple-answer"><span>WHAT WIVOSOFT DOES</span><p>We help understand what should be kept, what should be replaced and how to move safely from the old system to the new one.</p><small>Measure before replacing. Test before migrating. Move deliberately.</small></aside>
            </motion.div>
          ) : (
            <motion.div
              key="technical"
              className="technical-explanation"
              initial={reduceMotion ? false : { opacity: 0, y: 6, filter: "blur(2px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -4, filter: "blur(2px)" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="technical-header"><p>Pragmatic architecture means choosing the lowest-risk route that fits the system. It does not automatically mean microservices, Kubernetes or a cloud migration.</p><span>CHANGE WHAT EARNS ITS KEEP</span></div>
              <div className="technical-grid">
                {technicalAreas.map((area) => <article key={area.code}><small>{area.code}</small><h3>{area.title}</h3><p>{area.copy}</p></article>)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export function ServicePillars() {
  return (
    <section className="services-section section-shell" id="what-we-do" aria-labelledby="services-title">
      <FadeIn className="services-heading">
        <div><p className="section-kicker">WHAT WE DO</p><h2 id="services-title">Modernize. Migrate. Verify.</h2></div>
        <p>Three connected disciplines for changing software safely — from the first technical decision to the final release.</p>
      </FadeIn>
      <div className="services-flow">
        {services.map((service, index) => (
          <div className="service-flow-item" key={service.title}>
            <FadeIn className="service-pillar" delay={index * 0.08}>
              <div className="service-number"><span>{service.number}</span><i /></div>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
              <ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </FadeIn>
            {index < services.length - 1 && <span className="service-connector" aria-hidden="true">→</span>}
          </div>
        ))}
      </div>
    </section>
  );
}

export function ModernizationJourney() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="journey-section section-shell" id="how-we-work" aria-labelledby="journey-title">
      <div className="journey-layout">
        <FadeIn className="journey-intro">
          <p className="section-kicker">AN EXAMPLE APPROACH / NOT A CUSTOMER CASE</p>
          <h2 id="journey-title">A safer path from legacy to modern.</h2>
          <p>Understand the system, protect its behavior, then change it in steps that can be observed and verified.</p>
          <div className="journey-principle"><span>PRINCIPLE</span><b>Evidence before confidence.</b></div>
        </FadeIn>
        <div className="journey-steps">
          {journeySteps.map((step, index) => (
            <motion.article
              key={step.title}
              initial={reduceMotion ? false : { opacity: 0, x: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.42, delay: Math.min(index * 0.045, 0.18) }}
            >
              <span className="journey-index">{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{step.title}</h3><p>{step.copy}</p></div>
              <small><i /> {step.signal}</small>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MigrationDemo() {
  const [phase, setPhase] = useState(-1);
  const [running, setRunning] = useState(false);
  const [complete, setComplete] = useState(false);
  const [announcement, setAnnouncement] = useState("Example migration ready to run.");
  const timer = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => () => {
    if (timer.current !== null) window.clearInterval(timer.current);
  }, []);

  const runMigration = () => {
    if (timer.current !== null) window.clearInterval(timer.current);
    setPhase(-1);
    setComplete(false);
    setRunning(true);
    setAnnouncement("Example migration running.");

    if (reduceMotion) {
      setPhase(migrationRecords.length);
      setRunning(false);
      setComplete(true);
      setAnnouncement("Example migration complete. All record groups migrated; two data quality warnings found.");
      return;
    }

    let nextPhase = 0;
    timer.current = window.setInterval(() => {
      setPhase(nextPhase);
      if (nextPhase >= migrationRecords.length) {
        if (timer.current !== null) window.clearInterval(timer.current);
        timer.current = null;
        setRunning(false);
        setComplete(true);
        setAnnouncement("Example migration complete. All record groups migrated; two data quality warnings found.");
      }
      nextPhase += 1;
    }, 430);
  };

  const progress = Math.max(0, Math.min(100, ((phase + 1) / (migrationRecords.length + 1)) * 100));

  return (
    <section className="migration-section section-shell" aria-labelledby="migration-title">
      <FadeIn className="migration-heading">
        <div><p className="section-kicker"><span>EXAMPLE MIGRATION</span> / MOCK DATA</p><h2 id="migration-title">Migration is not just moving rows.</h2></div>
        <p>A professional migration finds imperfect data, reports it clearly and resolves it deliberately.</p>
      </FadeIn>
      <FadeIn className="migration-console" delay={0.08}>
        <div className="migration-console-top">
          <div><span className="console-lights" aria-hidden="true"><i /><i /><i /></span><small>MIGRATION_RUN / NORDIC_SERVICE_DEMO</small></div>
          <span className={running ? "console-state running" : complete ? "console-state complete" : "console-state"}><i /> {running ? "RUNNING" : complete ? "COMPLETE" : "READY"}</span>
        </div>
        <div className="migration-console-body">
          <div className="migration-records">
            <div className="migration-progress" aria-hidden="true"><i style={{ width: `${progress}%` }} /></div>
            {migrationRecords.map((record, index) => {
              const done = phase >= index;
              const active = running && phase + 1 === index;
              return (
                <div className={done ? "record-row done" : active ? "record-row active" : "record-row"} key={record.label}>
                  <span>{record.label}</span>
                  <b>{done ? `${record.total} / ${record.total}` : active ? "VALIDATING…" : `— / ${record.total}`}</b>
                  <i aria-label={done ? "Complete" : "Pending"}>{done ? "✓" : "·"}</i>
                </div>
              );
            })}
            <button className="run-button" type="button" onClick={runMigration} disabled={running}>
              <span aria-hidden="true">{complete ? "↻" : "▶"}</span>{running ? "Running example…" : complete ? "Run again" : "Run example migration"}
            </button>
            <p className="sr-only" aria-live="polite">{announcement}</p>
          </div>
          <div className="migration-validation">
            <div className="validation-title"><span>VALIDATION REPORT</span><small>{complete ? "5 CHECKS" : "WAITING"}</small></div>
            {migrationChecks.map((check) => (
              <div className={`validation-row ${complete ? check.status : "pending"}`} key={check.label}>
                <span>{check.label}</span><b>{complete ? check.result : "—"}</b><i>{complete ? check.status === "ok" ? "✓" : "⚠" : "·"}</i>
              </div>
            ))}
            <AnimatePresence>
              {complete && (
                <motion.p className="warning-note" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }}>
                  <span>2 WARNINGS</span> No records were hidden or discarded. Duplicates and broken references are now explicit items to resolve.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

export function AboutSection() {
  return (
    <section className="about-section section-shell" id="about" aria-labelledby="about-title">
      <FadeIn className="about-grid">
        <div className="about-heading"><p className="section-kicker">ABOUT WIVOSOFT</p><h2 id="about-title">Engineering experience from both sides of the release.</h2></div>
        <div className="about-copy">
          <p>Wivosoft is founded by two software consultants with backgrounds across software development, technical testing and business-critical systems.</p>
          <p>Our experience spans development, migration, test automation, performance testing and CI/CD — giving us a strong focus on changing software safely rather than simply changing it quickly.</p>
          <div className="founders" aria-label="Wivosoft founders">
            <article className="founder-entry">
              <div><h3>Christian</h3><p>Quality Engineering &amp; Software Development</p></div>
              <span className="founder-link" aria-label="LinkedIn profile placeholder">LinkedIn <span aria-hidden="true">↗</span></span>
            </article>
            <article className="founder-entry">
              <div><h3>Tobias</h3><p>Software Modernization &amp; Migration</p></div>
              <span className="founder-link" aria-label="LinkedIn profile placeholder">LinkedIn <span aria-hidden="true">↗</span></span>
            </article>
          </div>
          <div className="about-stack"><span>PRIMARY ECOSYSTEMS</span><b>.NET</b><b>Java</b><b>Python</b></div>
          <small>We choose technology based on the system rather than forcing every customer into the same stack.</small>
        </div>
      </FadeIn>
    </section>
  );
}

export function ContactCTA() {
  return (
    <section className="contact-section section-shell" id="contact" aria-labelledby="contact-title">
      <FadeIn className="contact-panel">
        <div className="contact-marker" aria-hidden="true"><span>START WITH</span><b>01</b></div>
        <div className="contact-copy"><p className="section-kicker">A CONVERSATION, NOT A SALES PROCESS</p><h2 id="contact-title">Working with software that is becoming difficult to maintain?</h2><p>Whether you are considering a system replacement, migration or incremental modernization, we can start by understanding what you already have.</p></div>
        <div className="contact-actions"><a className="button button-primary" href="mailto:hello@wivosoft.dk">Talk to Wivosoft <span aria-hidden="true">↗</span></a><a className="email-link" href="mailto:hello@wivosoft.dk">hello@wivosoft.dk</a></div>
      </FadeIn>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div><Image src="/wivosoft-logo.png" alt="Wivosoft" width={150} height={30} /><p>Software modernization · Migration · Quality Engineering</p></div>
        <nav aria-label="Footer navigation"><a href="#what-we-do">What we do</a><a href="#about">About</a><a href="#contact">Contact</a><span>LinkedIn [placeholder]</span></nav>
      </div>
      <div className="footer-legal"><span>CVR: [TO BE ADDED]</span><span>Copenhagen · Denmark</span><span>© {new Date().getFullYear()} Wivosoft</span></div>
    </footer>
  );
}

export default function WivosoftSite() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <LegacyModernSlider />
        <ExplanationModeToggle />
        <ServicePillars />
        <ModernizationJourney />
        <MigrationDemo />
        <AboutSection />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
