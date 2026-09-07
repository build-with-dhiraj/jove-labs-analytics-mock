#!/usr/bin/env node
/**
 * Full-page 1440-wide stills of the exported site/ pages, written to stills/.
 * Reads the static files, so the stills show exactly what a reader of site/ sees.
 */
import { mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT = join(ROOT, "stills");
const SITE = join(ROOT, "site");

const SHOTS = [
  ["01-leadership.png", "leadership.html"],
  ["02-education.png", "education.html"],
  ["03-jove-labs.png", "jove-labs.html"],
  ["04-detailed-reports.png", "detailed-reports-is-lab.html"],
  ["05-cs-report.png", "cs-report.html"],
  ["06-institution-detail.png", "institution-detail.html"],
  ["07-institutions.png", "institutions.html"],
];

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--force-device-scale-factor=1"],
  defaultViewport: { width: 1440, height: 1200, deviceScaleFactor: 1 },
});

for (const [out, file] of SHOTS) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1200, deviceScaleFactor: 1 });
  await page.goto(`file://${join(SITE, file)}`, { waitUntil: "networkidle0" });
  // The shell is h-screen with an internally scrolling <main>, so grow the
  // viewport to the scroll height instead of relying on fullPage alone.
  const needed = await page.evaluate(() => {
    const main = document.querySelector("main");
    if (!main) return document.documentElement.scrollHeight;
    return main.scrollHeight + (window.innerHeight - main.clientHeight) + 24;
  });
  await page.setViewport({
    width: 1440,
    height: Math.min(Math.max(needed, 1200), 30000),
    deviceScaleFactor: 1,
  });
  await page.evaluate(() => new Promise((r) => setTimeout(r, 900)));
  await page.screenshot({ path: join(OUT, out), fullPage: true });
  await page.close();
  console.log(`  ${out} <- ${file}`);
}

await browser.close();
