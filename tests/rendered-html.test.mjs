import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://wivosoft.example/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the complete Wivosoft homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Wivosoft \| Software modernization, migration and verification<\/title>/i);
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
  const [packageJson, page, layout] = await Promise.all([
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(packageJson, /"framer-motion"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(page, /WivosoftSite/);
  assert.match(layout, /generateMetadata/);
  assert.match(layout, /openGraph/);

  await assert.rejects(
    access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)),
  );
  await access(new URL("../public/wivosoft-logo.png", import.meta.url));
  await access(new URL("../public/og.png", import.meta.url));
});
