#!/usr/bin/env node
/**
 * Static export of the analytics-ui CS mock.
 *
 * Drives headless Chrome over a locally running `MOCK_DATA=1` analytics-ui, waits
 * for hydration and for the recharts SVGs, then serialises each route to a
 * self-contained HTML file under site/ with all JavaScript stripped. CSS, fonts
 * and images are copied next to it and every URL is rewritten to a relative path,
 * so site/ opens straight from the filesystem.
 *
 *   node scripts/export-static.mjs [--base http://localhost:3717] [--out site] [--shots-only]
 *
 * Nothing is fetched from the public internet; the only origin touched is --base.
 */
import { mkdir, writeFile, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const argOf = (flag, fallback) => {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
};
const BASE = argOf("--base", "http://localhost:3717").replace(/\/$/, "");
const OUT = join(ROOT, argOf("--out", "site"));
const SHOTS_ONLY = process.argv.includes("--shots-only");

const VIEWPORT = { width: 1440, height: 1200, deviceScaleFactor: 1 };

/** Detailed reports selects its tab from ?tab=<dimension> on the client. */
const DETAILED_TABS = [
  "daywise_usage",
  "is_embed",
  "is_lti",
  "lti_engagement",
  "professor",
  "is_quiz",
  "playlist_analysis",
  "quiz_per_video",
  "playlist_per_video",
  "my_class_analysis",
  "is_lab",
  "fam_access_codes",
];

const PAGES = [
  { file: "leadership.html", url: "/", charts: true },
  { file: "institutions.html", url: "/institutions", charts: false },
  { file: "institution-detail.html", url: "/institutions/2179", charts: true },
  { file: "education.html", url: "/education", charts: true },
  { file: "jove-labs.html", url: "/jove-labs", charts: false },
  { file: "detailed-reports.html", url: "/detailed-reports", charts: false },
  { file: "cs-report.html", url: "/cs-report", charts: false },
  ...DETAILED_TABS.map((tab) => ({
    file: `detailed-reports-${tab.replace(/_/g, "-")}.html`,
    url: `/detailed-reports?tab=${tab}`,
    charts: false,
  })),
];

/** Route path -> exported file, applied to every internal href in the HTML. */
const LINK_MAP = new Map([
  ["/", "leadership.html"],
  ["/institutions", "institutions.html"],
  ["/institutions/2179", "institution-detail.html"],
  ["/education", "education.html"],
  ["/jove-labs", "jove-labs.html"],
  ["/detailed-reports", "detailed-reports.html"],
  ["/cs-report", "cs-report.html"],
]);

// ---------------------------------------------------------------------------
// Asset collection
// ---------------------------------------------------------------------------

/** Original absolute path -> relative path written into site/. */
const assets = new Map();

function assetName(urlPath) {
  return urlPath.split("?")[0].split("/").filter(Boolean).slice(-1)[0];
}

async function fetchAsset(urlPath) {
  const res = await fetch(`${BASE}${urlPath}`);
  if (!res.ok) throw new Error(`${urlPath} -> HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

/** Fetch a stylesheet, pull in everything it url()s, and rewrite it to relative paths. */
async function saveStylesheet(urlPath) {
  if (assets.has(urlPath)) return assets.get(urlPath);
  let css = (await fetchAsset(urlPath)).toString("utf8");

  // Absolute refs get rewritten; Next's own font URLs are already ../media/… and
  // stay as they are, because site/assets/css → site/assets/media has the same shape.
  for (const ref of new Set(
    [...css.matchAll(/url\(\s*['"]?(\/[^)'"]+)['"]?\s*\)/g)].map((m) => m[1])
  )) {
    const rel = await saveMedia(ref);
    css = css.split(ref).join(`../${rel.replace("assets/", "")}`);
  }
  for (const ref of new Set(
    [...css.matchAll(/url\(\s*['"]?\.\.\/media\/([^)'"]+)['"]?\s*\)/g)].map((m) => m[1])
  )) {
    await saveMedia(`/_next/static/media/${ref}`);
  }

  const rel = `assets/css/${assetName(urlPath)}`;
  await mkdir(join(OUT, "assets/css"), { recursive: true });
  await writeFile(join(OUT, rel), css);
  assets.set(urlPath, rel);
  return rel;
}

async function saveMedia(urlPath) {
  if (assets.has(urlPath)) return assets.get(urlPath);
  const rel = `assets/media/${assetName(urlPath)}`;
  await mkdir(join(OUT, "assets/media"), { recursive: true });
  await writeFile(join(OUT, rel), await fetchAsset(urlPath));
  assets.set(urlPath, rel);
  return rel;
}

// ---------------------------------------------------------------------------
// HTML rewriting
// ---------------------------------------------------------------------------

function stripScripts(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<script\b[^>]*\/>/gi, "")
    .replace(/<link\b[^>]*\brel=["']?(?:preload|modulepreload|prefetch)["']?[^>]*>/gi, "")
    .replace(/<template\b[^>]*id=["']?__NEXT[^>]*>[\s\S]*?<\/template>/gi, "");
}

/** Turn every internal route href into its exported filename; neutralise the rest. */
function rewriteLinks(html) {
  return html.replace(/href="(\/[^"#]*)"/g, (whole, href) => {
    const [path] = href.split("?");
    if (path.startsWith("/_next/") || path.startsWith("/assets/")) return whole;
    const mapped = LINK_MAP.get(path);
    if (mapped) return `href="${mapped}"`;
    if (/^\/institutions\/\d+$/.test(path)) return `href="institution-detail.html"`;
    return `href="#"`;
  });
}

async function rewriteAssetUrls(html) {
  const paths = new Set(
    [...html.matchAll(/["'(](\/_next\/static\/[^"')\s]+)["')\s]/g)].map((m) => m[1])
  );
  let out = html;
  for (const p of paths) {
    const rel = p.endsWith(".css") ? await saveStylesheet(p) : await saveMedia(p);
    out = out.split(`"${p}"`).join(`"${rel}"`);
    out = out.split(`'${p}'`).join(`'${rel}'`);
    out = out.split(`(${p})`).join(`(${rel})`);
  }
  return out.replace(/(src|href)="\/(icon\.svg|favicon\.ico)"/g, '$1="#"');
}

// ---------------------------------------------------------------------------
// Page capture
// ---------------------------------------------------------------------------

async function waitForContent(page, wantCharts) {
  await page.waitForFunction(
    () => document.querySelectorAll("table tbody tr").length > 0,
    { timeout: 120000 }
  );
  if (wantCharts) {
    await page.waitForFunction(
      () => document.querySelectorAll("svg.recharts-surface").length >= 2,
      { timeout: 120000 }
    );
  }
  // Let recharts finish its enter animation and any late Suspense boundary resolve.
  await page.evaluate(() => new Promise((r) => setTimeout(r, 2500)));
}

async function main() {
  await mkdir(join(OUT, "_check"), { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--force-device-scale-factor=1"],
    defaultViewport: VIEWPORT,
  });

  const failures = [];
  const consoleErrors = [];

  for (const spec of PAGES) {
    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);
    page.on("console", (m) => {
      if (m.type() === "error") consoleErrors.push(`${spec.file}: ${m.text()}`);
    });
    page.on("requestfailed", (r) => {
      // Next prefetches sibling routes with ?_rsc=…; they abort when the tab closes
      // and are irrelevant to a page with no JavaScript in it.
      if (r.url().includes("_rsc=")) return;
      failures.push(`${spec.file}: ${r.url()} ${r.failure()?.errorText}`);
    });
    page.on("response", (r) => {
      if (r.status() >= 400) failures.push(`${spec.file}: ${r.url()} HTTP ${r.status()}`);
    });

    process.stdout.write(`  ${spec.file} … `);
    await page.goto(`${BASE}${spec.url}`, { waitUntil: "networkidle0", timeout: 180000 });
    await waitForContent(page, spec.charts);

    if (!SHOTS_ONLY) {
      const raw = await page.evaluate(() => document.documentElement.outerHTML);
      let html = stripScripts(raw);
      html = await rewriteAssetUrls(html);
      html = rewriteLinks(html);
      await writeFile(join(OUT, spec.file), `<!doctype html>\n${html}`);
    }

    await page.close();
    process.stdout.write("ok\n");
  }

  await writeFile(
    join(OUT, "index.html"),
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>JoVE Analytics — CS mock</title>
    <meta http-equiv="refresh" content="0; url=leadership.html" />
  </head>
  <body><p><a href="leadership.html">Continue to the Leadership dashboard</a></p></body>
</html>
`
  );

  // Verification pass: screenshot the written files themselves, not the live app,
  // so _check/ shows exactly what a reader of site/ sees with no JavaScript.
  console.log("\nverifying exported files");
  for (const spec of PAGES) {
    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);
    page.on("console", (m) => {
      if (m.type() === "error") consoleErrors.push(`static ${spec.file}: ${m.text()}`);
    });
    page.on("requestfailed", (r) =>
      failures.push(`static ${spec.file}: ${r.url()} ${r.failure()?.errorText}`)
    );
    await page.goto(`file://${join(OUT, spec.file)}`, { waitUntil: "networkidle0" });
    // The dashboard shell is h-screen with an internally scrolling <main>, so a
    // fullPage shot would only ever show the first viewport. Grow the viewport to
    // the scroll height instead — the page itself is untouched.
    const needed = await page.evaluate(() => {
      const main = document.querySelector("main");
      if (!main) return document.documentElement.scrollHeight;
      return main.scrollHeight + (window.innerHeight - main.clientHeight) + 24;
    });
    await page.setViewport({ ...VIEWPORT, height: Math.min(Math.max(needed, 1200), 30000) });
    await page.evaluate(() => new Promise((r) => setTimeout(r, 900)));
    await page.screenshot({
      path: join(OUT, "_check", spec.file.replace(/\.html$/, ".png")),
      fullPage: true,
    });
    await page.close();
  }

  await browser.close();

  console.log(`\nassets: ${assets.size} files`);
  console.log(`console errors: ${consoleErrors.length}`);
  consoleErrors.slice(0, 20).forEach((e) => console.log(`  ! ${e}`));
  console.log(`failed requests: ${failures.length}`);
  failures.slice(0, 20).forEach((e) => console.log(`  ! ${e}`));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
