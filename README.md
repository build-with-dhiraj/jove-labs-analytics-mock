# JoVE Labs Analytics Mock

A clickable, static copy of analytics.jove.com, rendered with fictional sample data.

`main` is the **target design**: the production analytics-ui application (`main`
`a773c7b`, 1 Oct 2026) with the JoVE Labs changes ruled on 25 Sep, 1 Oct and 5 Oct
2026 built in, rendered against fictional sample data and saved as flat HTML.
Institution names, people, ids and numbers are samples, not real records. No
application source is included here.

Open `index.html` for the three versions below.

## Versions

| Version | Where |
|---|---|
| Target design | `site/leadership.html` |
| Production today (4 Oct): every page as live on analytics.jove.com on 1 Oct 2026, with sample data, plus the 7 Sep JoVE Labs page | `production-2026-10-04/site/leadership.html` (tag `v2026-10-04-production`, deployment `dpl_6KLRrBfybwo4YZFBFXV5Gd5X1NGT`) |
| Earlier design, 7 Sep: the 7 Sep JoVE Labs page, without the two captions production does not have | `site/jove-labs-7-sep.html`, linked from the JoVE Labs tab footer |
| The 7 Sep 2026 mock, with its own Labs UI | tag `v2026-09-07` |

## What is in the target design

| File | Page |
|---|---|
| `site/leadership.html` | Leadership dashboard, with the JoVE Labs card in Video Views Distribution and the three-option JoVE Labs card in Feature Usage |
| `site/institutions.html` | All institutions |
| `site/institution-detail.html` | One institution (Harvard University, CRM ID 2179), with Professor Wise Usage set to "JoVE Labs" |
| `site/education.html` | Education |
| `site/jove-labs.html` | JoVE Labs, Summary: adoption counts with their change in the period, customer page views by month with JoVE staff beside them, top labs, How we count |
| `site/jove-labs-adoption.html` | JoVE Labs, Adoption: institution, lab, module, article, with labs, status, trainees, co-trainers, modules, quizzes, methods kept / edited and unavailable methods; the Unavailable methods lists at the bottom |
| `site/jove-labs-usage.html` | JoVE Labs, Usage: the living usage sheet's three parts, label for label (Who viewed JoVE Labs, How lab members used their labs, the per-lab table) |
| `site/jove-labs-trial.html` | JoVE Labs, Trial, for Sales (approved 5 Oct): the 7 Sep Trial Summary's four cards, Trial Days Left and Trials by institution, plus four cards, the Labs PI trial path (ending at "In Salesforce", which Labs trials do not reach yet), Trials ending soon as the account manager's work list, more institution columns, other trials at these institutions, weekly trends and How we count |
| `site/jove-labs-methods.html` | Redirects to the Unavailable methods section of Adoption |
| `site/detailed-reports-is-lab.html` | Detailed reports, JoVE Labs Analysis tab (all twelve tabs are exported) |
| `site/cs-report.html` | CS report |
| `site/cs-report-labs.html` | CS report, JoVE Labs: CSS, institute, lab, with CSM, Region and labs in use against the target of 3 per CSS |

The JoVE Labs tab and the CS report open on all institutions. Detailed reports load
nothing in production until an institution or a CS member is chosen, so its tabs are
rendered for the fictional CS member Nadia Bramwell, whose institutions include
Harvard University.

`stills/` holds full-page 1440-wide screenshots of those pages, for pasting into a
doc or a deck. `site/_check/` holds the verification screenshots the export takes
of its own output.

The pages carry no JavaScript, so charts and tables are frozen at the state they
were rendered in. The Detailed reports tabs, the JoVE Labs sub-tabs and the CS report
tabs are real links between the exported files; dropdowns, menus and expanders do not
respond to clicks. "How we count" opens and closes, as a plain HTML disclosure.

## What differs from production

Everything not listed here is production code and production layout.

1. The "JoVE Labs" item in the left rail, directly after Education. It is selected on the JoVE Labs pages.
2. The JoVE Labs tab (Summary, Adoption, Usage, Trial) and the 7 Sep page at its own address.
3. Feature Usage, on Leadership and the institution page: the JoVE Labs card offers Views, Labs created and Modules created, and still opens on Labs created. Modules created counts modules by their own created date.
4. Detailed Reports, JoVE Labs Analysis: Neli's column order and labels (with Product line and Subject), with "lab" taken out of the headers so each one reads on a lab, module or article row, and the Usage tab's six trainee columns after No. of trainees joined, on lab rows only (39 columns), header tooltips, a data freshness note above the table and six totals under it. Views follow the house rules: sectional is an article page, non-sectional is every other Labs page, and Research plus Education equals the two. An article row counts only the views inside its own module. One lab is open through its first module.
5. CS report: a JoVE Labs tab beside the existing report (named "Institution usage" there).

## How it was produced

Rendered from a local branch of `analytics-ui` (`labs-mock-2026-10-05`, on `main`
`a773c7b`) with fixture data; no application source is included.

1. On that branch, `MOCK_DATA=1` swaps the data-source modules for in-repo fixture
   modules: the Postgres pools (main, education, subscription and the research-svc
   database that holds labs), a fake Cassandra driver that answers the grained and
   daily feature-usage tables from fixture rows, the Labs data the new tabs read, the
   Key Insights artifact and the sign-in session. The app's own query, aggregation and
   format code runs on top.
2. `MOCK_DATA=1 npx next build && MOCK_DATA=1 npx next start -p 3717` runs it
   locally (started with `TZ=UTC`, as the production container runs, and a
   placeholder `CASSANDRA_HOST` so the own-articles table loads from the fake driver).
3. `npx tsx scripts/check-labs-mock.ts` on that branch asserts the arithmetic against
   the running server and stops the export if any check fails:
   - Analysis rows: Sectional plus Non-Sectional equals Research plus Education; the six totals equal the lab rows; invited is at least joined.
   - Analysis trainees, lab by lab: joined via invite link plus via email equals joined; joined via email from CS plus from PI equals joined via email; invited by CS plus by PI equals invited; joins from CS or the PI never exceed their invites; module and article rows leave the six blank; all eight trainee columns equal the Usage tab's lab table.
   - Usage: every line's children add up to it, staff plus client is all, Sectional plus Non-sectional equals RPV plus EPV; the lab table's total equals How lab members used their labs; each lab matches Detailed reports.
   - Summary: activated institutions exceed institutions with a lab; the trend equals the client line; the counts equal Adoption; Leadership's JoVE Labs card equals all Labs page views.
   - Adoption institution rows equal their labs; Unavailable methods counts add up.
   - CS report totals equal the JoVE Labs tab; Trial tiles equal Trials by institution and Trial Days Left; Modules created equals the sample's modules in the period.
   - Trial: active plus ended equals started; ending in 14 days is at most active and the Days Left buckets add up to active; calendar booked is at most asked for a demo, which is at most the trial PIs; new subscriptions after trial are at most the trial PIs whose institution had no paid subscription when the trial began; trainees who recommended are at most those covered; the institution table's columns add up to the cards; the work list holds every active trial, fewest days left first; personal-trial status counts add up to their total; Labs views made on trial equals the Analysis table's Total Trial Views summed over every lab, and the weekly charts add up to the cards.
4. `node scripts/export-static.mjs` drives headless Chrome (in UTC) over that server,
   waits for hydration and for the charts, then writes each route to `site/` with all
   JavaScript stripped, CSS and fonts copied alongside, and every URL rewritten to a
   relative path. It reports console errors and failed requests, and screenshots each
   written file into `site/_check/`.
5. `node scripts/shoot-stills.mjs` re-takes `stills/01..07` from the exported files.

Both scripts need `npm install` here (puppeteer-core) and Google Chrome installed.

## Sensitivity

The site is public. Numbers are sample data, not JoVE production figures.
