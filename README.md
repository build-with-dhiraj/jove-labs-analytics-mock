# JoVE Labs Analytics Mock

A clickable, static copy of analytics.jove.com, rendered with fictional sample data.

`main` is the **target design**: the production analytics-ui application (`main`
`a773c7b`, 1 Oct 2026) with the JoVE Labs changes ruled on 25 Sep, 1 Oct and 5 Oct
2026 built in, rendered against fictional sample data and saved as flat HTML.
Institution names, people, ids and numbers are samples, not real records. No
application source is included here.

Open `index.html` (it redirects to `site/leadership.html`).

## Other versions

| Version | Where |
|---|---|
| Production-identical baseline (every page as live on 1 Oct 2026, plus the 7 Sep JoVE Labs page) | tag `v2026-10-04-production`, deployment `dpl_6KLRrBfybwo4YZFBFXV5Gd5X1NGT`, https://jove-labs-analytics-mock-fbff524hb-build-with-dhirajs-projects.vercel.app/site/leadership.html (Vercel asks for a sign-in to the build-with-dhiraj team on deployment URLs) |
| The 7 Sep JoVE Labs page, as it rendered at `e11a636` | `site/jove-labs-7-sep.html`, linked from the JoVE Labs tab footer ("Earlier design, 7 Sep") |
| The 7 Sep 2026 mock, with its own Labs UI | tag `v2026-09-07` |

## What is in it

| File | Page |
|---|---|
| `site/leadership.html` | Leadership dashboard, with the JoVE Labs card in Video Views Distribution and the three-option JoVE Labs card in Feature Usage |
| `site/institutions.html` | All institutions |
| `site/institution-detail.html` | One institution (Harvard University, CRM ID 2179), with Professor Wise Usage set to "JoVE Labs" |
| `site/education.html` | Education |
| `site/jove-labs.html` | JoVE Labs, Summary: who viewed (customers and JoVE staff), customer page views by month, how labs are used, adoption, follow-up, top labs, How we count |
| `site/jove-labs-adoption.html` | JoVE Labs, Labs: institution, lab, module, article, with rollups, trainees, co-trainers, quizzes and methods kept / edited |
| `site/jove-labs-methods.html` | JoVE Labs, Unavailable methods: each lab's methods with no matching article, counted on the lab and the institution |
| `site/jove-labs-7-sep.html` | The 7 Sep JoVE Labs page |
| `site/detailed-reports-is-lab.html` | Detailed reports, JoVE Labs Analysis tab (all twelve tabs are exported) |
| `site/cs-report.html` | CS report |

Detailed reports and the JoVE Labs tab are shown the way a CS member sees them:
production loads nothing on Detailed reports until an institution or a CS member is
chosen, so both are rendered for the fictional CS member Nadia Bramwell, whose
institutions include Harvard University. The JoVE Labs tab's customer totals equal
the Detailed reports JoVE Labs Analysis tab for that scope.

`stills/` holds full-page 1440-wide screenshots of those pages, for pasting into a
doc or a deck. `site/_check/` holds the verification screenshots the export takes
of its own output.

The pages carry no JavaScript, so charts and tables are frozen at the state they
were rendered in. The Detailed reports tabs and the JoVE Labs sub-tabs are real
links between the exported files; dropdowns, menus and expanders do not respond to
clicks. "How we count" opens and closes, as a plain HTML disclosure.

## What differs from production

Everything not listed here is production code and production layout.

1. The "JoVE Labs" item in the left rail, directly after Education. It is selected on the JoVE Labs pages.
2. The JoVE Labs tab (Summary, Labs, Unavailable methods) and the 7 Sep page at its own address.
3. Feature Usage, on Leadership and the institution page: the JoVE Labs card offers Views, Labs created and Modules created, and still opens on Labs created. Modules created counts modules by their own created date.
4. Detailed Reports, JoVE Labs Analysis: Neli's column order and labels (33 columns, with Product line and Subject), header tooltips, a data freshness note above the table and six totals under it. Views follow the house rules: sectional is an article page, non-sectional is every other Labs page, and Research plus Education equals the two. An article row counts only the views inside its own module. One lab is open through its first module.

## How it was produced

Rendered from a local branch of `analytics-ui` (`labs-mock-2026-10-05`, on `main`
`a773c7b`) with fixture data; no application source is included.

1. On that branch, `MOCK_DATA=1` swaps the data-source modules for in-repo fixture
   modules: the Postgres pools (main, education, subscription and the research-svc
   database that holds labs), a fake Cassandra driver that answers the grained and
   daily feature-usage tables from fixture rows, the Key Insights artifact and the
   sign-in session. The app's own query, aggregation and format code runs on top.
2. `MOCK_DATA=1 npx next build && MOCK_DATA=1 npx next start -p 3717` runs it
   locally (started with `TZ=UTC`, as the production container runs, and a
   placeholder `CASSANDRA_HOST` so the own-articles table loads from the fake driver).
3. `npx tsx scripts/check-labs-mock.ts` on that branch asserts the arithmetic
   against the running server and stops the export if any check fails: Sectional
   plus Non-Sectional equals Research plus Education on every Analysis row, the six
   totals equal the lab rows, activated institutions are at least the institutions
   with a lab, invited is at least joined, the JoVE Labs tab equals Detailed reports
   for the same scope, the monthly trend equals the customer total, institution
   rows equal their labs, the Unavailable methods counts add up, and Modules created
   equals the sample's modules in the period.
4. `node scripts/export-static.mjs` drives headless Chrome over that server, waits
   for hydration and for the charts, then writes each route to `site/` with all
   JavaScript stripped, CSS and fonts copied alongside, and every URL rewritten to a
   relative path. It reports console errors and failed requests, and screenshots
   each written file into `site/_check/`.
5. `node scripts/shoot-stills.mjs` re-takes `stills/01..07` from the exported files.

Both scripts need `npm install` here (puppeteer-core) and Google Chrome installed.

## Sensitivity

The site is public. Numbers are sample data, not JoVE production figures.
