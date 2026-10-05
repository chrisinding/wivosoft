import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(new URL(pathname, "https://wivosoft.example"), {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
      IMAGES: {
        input() {
          throw new Error("The test renderer does not request optimized image bodies.");
        },
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the public Wivosoft homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Wivosoft — Software Consulting<\/title>/i);
  assert.match(html, /Hands-on software consultants in Copenhagen/);
  assert.match(html, /Better software/);
  assert.match(html, /Built together/);
  assert.match(html, /Software development/);
  assert.match(html, /Quality engineering/);
  assert.match(html, /Modernization &amp; migration/);
  assert.match(html, /A consultant in your corner/);
  assert.match(html, /A focused project, clearly scoped/);
  assert.match(html, /Engineering experience from both sides of the release/);
  assert.match(html, /Christian Volck/);
  assert.match(html, /Tobias Wiik/);
  assert.match(html, /Software Development &amp; Quality Engineering/);
  assert.match(html, /Who we are/);
  assert.match(html, /Netcompany/);
  assert.match(html, /Nearly five years of software development experience/);
  assert.match(html, /christian-volck\.webp/);
  assert.match(html, /tobias-wiik\.webp/);
  assert.match(html, /mailto:hello@wivosoft\.dk/);
  assert.match(html, /og\.png/);
  assert.match(html, /wivosoft-icon-v2\.png/);
  assert.match(html, /wivosoft-favicon\.svg/);
  assert.match(html, /wivosoft-brand\.png/);
  for (const anchor of ["main-content", "services", "working-together", "people", "contact", "top"]) {
    assert.match(html, new RegExp(`id="${anchor}"`));
    assert.match(html, new RegExp(`href="#${anchor}"`));
  }
  assert.doesNotMatch(html, /\[TO BE ADDED\]|\[placeholder\]|href="\/demo"/i);
  assert.doesNotMatch(html, /Interactive example|Nordic Pumps A\/S|Example migration/i);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

test("server-renders the complete modernization website at /demo", async () => {
  const response = await render("/demo");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Wivosoft — Software Modernization Demo<\/title>/i);
  assert.match(html, /Modernizing software without breaking/);
  assert.match(html, /Interactive example/i);
  assert.match(html, /Nordic Pumps A\/S/);
  assert.match(html, /Modernize/);
  assert.match(html, /Migrate/);
  assert.match(html, /Verify/);
  assert.match(html, /A safer path from legacy to modern/);
  assert.match(html, /Example migration/i);
  assert.match(html, /Engineering experience from both sides of the release/);
  assert.match(html, /mailto:hello@wivosoft\.dk/);
  assert.match(html, /CVR: \[TO BE ADDED\]/);
  assert.match(html, /og\.png/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

test("removes starter-only assets and keeps required production dependencies", async () => {
  const [packageJson, page, demoPage, layout] = await Promise.all([
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/demo/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(packageJson, /"framer-motion"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(page, /public-site/);
  assert.doesNotMatch(page, /WivosoftSite/);
  assert.match(demoPage, /WivosoftSite/);
  assert.match(layout, /metadataBase/);
  assert.match(layout, /wivosoft-icon-v2\.png/);

  await assert.rejects(
    access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)),
  );
  await access(new URL("../public/wivosoft-logo.png", import.meta.url));
  await access(new URL("../public/wivosoft-icon.png", import.meta.url));
  await access(new URL("../public/wivosoft-icon-v2.png", import.meta.url));
  await access(new URL("../public/wivosoft-favicon.svg", import.meta.url));
  await access(new URL("../public/christian-volck.webp", import.meta.url));
  await access(new URL("../public/tobias-wiik.webp", import.meta.url));
  await access(new URL("../public/og.png", import.meta.url));
  await access(new URL("../public/wivosoft-brand.png", import.meta.url));
});
