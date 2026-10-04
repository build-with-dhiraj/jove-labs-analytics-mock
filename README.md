# JoVE Labs Analytics Mock

A clickable, static copy of analytics.jove.com, rendered with fictional sample data.

Every page under `site/` is the production analytics-ui application, rendered from
analytics-ui `main` at `a773c7b` (production, 1 Oct 2026) against fictional sample
data and saved as flat HTML. Institution names, people, ids and numbers are samples,
not real records. No application source is included here.

Open `index.html` (it redirects to `site/leadership.html`).

## What is in it

| File | Page |
|---|---|
| `site/leadership.html` | Leadership dashboard, including the JoVE Labs card in Video Views Distribution and the JoVE Labs card in Feature Usage |
| `site/institutions.html` | All institutions |
| `site/institution-detail.html` | One institution (Harvard University, CRM ID 2179), with Professor Wise Usage set to "JoVE Labs" |
| `site/education.html` | Education |
| `site/jove-labs.html` | JoVE Labs, Summary: who viewed, how labs are used, adoption, page views, follow-up, top labs |
| `site/jove-labs-adoption.html` | JoVE Labs, Labs: institution, lab, module, article, with rollups |
| `site/jove-labs-methods.html` | JoVE Labs, Unavailable methods: a count on the institution and on the lab |
| `site/detailed-reports-is-lab.html` | Detailed reports, JoVE Labs Analysis tab (all twelve tabs are exported) |
| `site/cs-report.html` | CS report |

Detailed reports are shown the way a CS member sees them: production loads nothing
there until an institution or a CS member is chosen, so the tabs are rendered for the
fictional CS member Nadia Bramwell, whose institutions include Harvard University. The
JoVE Labs page is rendered for the same CS member, so its JoVE Labs Analysis table shows
the same rows and count as the Detailed reports JoVE Labs Analysis tab.

`stills/` holds full-page 1440-wide screenshots of those pages, for pasting into a
doc or a deck. `site/_check/` holds the verification screenshots the export takes
of its own output.

The pages carry no JavaScript, so charts and tables are frozen at the state they
were rendered in; tabs, dropdowns, menus and expanders do not respond to clicks.

## What is production and what is not

Everything on the pages is production code and production layout, with two
exceptions that exist only on the local branch the mock is rendered from:

1. The "JoVE Labs" item in the left rail, directly after Education. It is selected on the JoVE Labs pages.
2. The JoVE Labs page: three tabs (Summary, Adoption, Unavailable methods). Summary shows client views and JoVE staff views. No trials table.
3. Feature Usage on Leadership and the institution page adds Modules created beside Views and Labs created. The card still opens on Labs created.
4. Detailed Reports, JoVE Labs Analysis, follows Neli's 25 Sep column order with Dhanur's reading rules: Total Sectional Views, Total Non-Sectional Views, Total Research Views, Total Education Views, Total Trial Views, Trainer Views then Trainee Views, Module Name, trainees invited, product and product line, CRM ID and institution at the end, CS and AM email only. One lab is open through its first module.

## How it was produced

Rendered from a local branch of `analytics-ui` (`labs-mock-2026-10-04`, on `main`
`a773c7b`) with fixture data; no application source is included.

1. On that branch, `MOCK_DATA=1` swaps the data-source modules for in-repo fixture
   modules: the Postgres pools (main, education, subscription and the research-svc
   database that holds labs), a fake Cassandra driver that answers the grained and
   daily feature-usage tables from fixture rows, the Key Insights artifact and the
   sign-in session. Production's query, aggregation and format code runs on top, so
   every number, label and column on the pages is computed the way production
   computes it.
2. `MOCK_DATA=1 npx next build && MOCK_DATA=1 npx next start -p 3717` runs it
   locally (started with `TZ=UTC`, as the production container runs, and a
   placeholder `CASSANDRA_HOST` so the own-articles table loads from the fake driver).
3. `node scripts/export-static.mjs` drives headless Chrome over that server, waits
   for hydration and for the charts, then writes each route to `site/` with all
   JavaScript stripped, CSS and fonts copied alongside, and every URL rewritten to a
   relative path. It reports console errors and failed requests, and screenshots
   each written file into `site/_check/`.
4. `node scripts/shoot-stills.mjs` re-takes `stills/01..07` from the exported files.

Both scripts need `npm install` here (puppeteer-core) and Google Chrome installed.

## Earlier version

The 7 Sep 2026 version, rendered from analytics-ui `main` `e1e31303` with the mock's
own JoVE Labs page and additions, is tag `v2026-09-07`.

## Sensitivity

The site is public. Numbers are sample data, not JoVE production figures.
