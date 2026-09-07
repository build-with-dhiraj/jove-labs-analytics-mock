# JoVE Labs Analytics Mock

A clickable, static mock of analytics.jove.com with the JoVE Labs additions built in.

Every page under `site/` is the **real analytics-ui application**, rendered against
fictional sample data and saved as flat HTML. Institution names, people, ids and
numbers are samples, not real records. No application source is included here.

Open `index.html` (it redirects to `site/leadership.html`).

## What is in it

| File | Page |
|---|---|
| `site/leadership.html` | Leadership dashboard, with the fifth "JoVE Labs" bucket in Video Views Distribution and the JoVE Labs card in Feature Usage |
| `site/institutions.html` | All institutions |
| `site/institution-detail.html` | One institution (Harvard University, CRM ID 2179) |
| `site/education.html` | Education |
| `site/jove-labs.html` | The new JoVE Labs page: Trial Summary, Adoption, Book a Demo and Recommend, Curation quality, Method Gaps, JoVE Labs Analysis |
| `site/detailed-reports-is-lab.html` | Detailed reports, JoVE Labs Analysis tab (the other eleven tabs are exported too) |
| `site/cs-report.html` | CS report, with the two Labs video plays columns |

`stills/` holds full-page 1440-wide screenshots of those pages, for pasting into a
doc or a deck. `site/_check/` holds the verification screenshots the export takes
of its own output.

The pages carry no JavaScript, so charts and tables are frozen at the state they
were rendered in; tabs, dropdowns and expanders do not respond to clicks.

## How it was produced

Rendered from a local branch of `analytics-ui` with fixture data; no application
source is included.

1. On that branch, `MOCK_DATA=1` swaps eleven data-source modules for in-repo
   fixture modules. Nothing else about the app changes, so the pages, sections and
   components are the production ones.
2. `MOCK_DATA=1 npx next build && MOCK_DATA=1 npx next start -p 3717` runs it locally.
3. `node scripts/export-static.mjs` drives headless Chrome over that server, waits
   for hydration and for the charts, then writes each route to `site/` with all
   JavaScript stripped, CSS and fonts copied alongside, and every URL rewritten to a
   relative path. It reports console errors and failed requests, and screenshots
   each written file into `site/_check/`.
4. `node scripts/shoot-stills.mjs` re-takes `stills/01..07` from the exported files.

Both scripts need `npm install` here (puppeteer-core) and Google Chrome installed.

## Sensitivity

The Vercel URL is sensitive. Do not paste it into Jira.
