# JoVE Analytics — Design System

A design system for **JoVE Analytics**, the institutional usage-analytics product
from JoVE (Journal of Visualized Experiments — the science-education video and
methods platform). The product gives JoVE's leadership, customer-success, and
sales teams a window into how subscribing and prospective institutions consume
content: page views, sessions, time-on-page, feature adoption (Quiz, LTI, Embed,
Playlist), and content-level performance — sliced by member, region, and period,
and surfaced with AI-written "Insight" summaries.

The aesthetic is a **clean, data-dense, light analytics UI**: white cards on a
soft gray canvas, a single confident blue as the brand/active color, an orange
accent reserved for AI insights, and disciplined neutral grays for everything
else. It should feel calm, precise, and trustworthy — a tool people read numbers
in all day.

---

## Sources

- **Figma:** `Usage Stat Dashboard.fig`. This system was rebuilt from the polished
  `Final-Designs → Section 1 → Leadership Part 4/5` frames and the
  `Final-Designs/components` library. No public URL was provided; the binary was
  the source of truth.
- Delivered as a pre-built kit (`colors_and_type.css`, `ui_kit.css`, React
  components, and preview cards), reconstructed here into the compiler's layout.
- No live codebase or URL was supplied. Mock data (`ui_kits/analytics/data.js`)
  is illustrative.

---

## Content fundamentals

**Voice.** Terse, factual, analyst-style. The UI labels things and gets out of the
way; it never addresses the user as "you" and never uses first person. Copy is
descriptive ("Total Page Views", "Subscribers usage report", "Page view growth in
last 30 days"), not conversational.

**Casing.** Title Case for section and card headings ("Sales Opportunity",
"Content Performance", "Feature Usage"). Sentence case for helper/sub text
("Page view growth in last 30 days"). Metric labels are Title Case
("Total Page Views", "Research Views"). Filter chips read as set values
("All CS/Sales Member", "Compare: None", "From: 23-02-2025").

**Numbers are the content.** Big figures are always grouped with commas
(`24,011,942`), percentages are whole numbers with a direction arrow (`↑ 12%`),
durations are compact (`11m 18s`, `7m 20s`). Change is shown as signed percent in
color (`+172%` green, `−60%` red).

**Insights** are full sentences, present tense, comparative, and pattern-led:
> "Core (30% up) and EoE (12% up) saw the most growth while Business (12% down) saw the most decline."
> "Australia (50% up) and Singapore (25% up) saw the most growth while China (14% down) saw the most decline."

They lead with the winners, then the decliners, and quantify everything in parens.

**Actions** are plain verbs/verb-phrases: "Export report", "Download",
"View All Institutes", "View Quiz Analysis". Drill-downs use "View All …" or
"View … Analysis" with a trailing chevron.

**Emoji:** none. Not part of the brand. The only "decorative" glyph is the orange
Lucide `sparkles` that marks an AI Insight.

---

## Visual foundations

**Color.** One brand blue (`#137CEC`) does almost all the work — links, the active
nav item, the selected KPI card (as a pale `#E7F2FD` fill with an `#A1CBF7`
border), chart lines, and the logo bubble. Orange (`#DD6B20` icon / `#9C4221`
label) is reserved *exclusively* for AI Insight callouts. Green (`#16A24A`) and
red (`#D92D20`) appear only on change/delta values. Everything else is a
tightly-controlled neutral ramp (`#1D1D1D` → `#A3A3A3`) on near-white surfaces.
No gradients. Tokens live in `tokens/colors.css`.

**Type.** Two families. **Geist** for all UI and prose (labels, headings, nav,
table cells) — the brand typeface. **Inter** for the big metric figures and any
tabular numerals — its tighter, geometric digits read cleanly at 24–30px. Both are
self-hosted from the supplied variable TTFs (`tokens/fonts.css`). Headings are
Geist Bold 24 (page) / SemiBold 18 (section); body is Geist 14/20; table headers
are a quiet 12px gray; metric values are Inter Bold 24 with `-0.02em` tracking.

**Spacing & layout.** 4px base scale. Cards pad `20px`. Major dashboard sections
are separated by a generous `48–80px` of vertical rhythm. The app is a fixed
`68px` top bar + a sticky `68px` filter bar + a `~274px` left nav rail + a fluid
content column, designed around `1440px`. Content is single-column, long-scroll —
read top to bottom.

**Backgrounds.** Flat. App canvas is `#F6F6F6`; cards and the top bar are white;
card heads / filter bar / subtle panels are `#F9FAFB`. No imagery, no texture, no
full-bleed photography, no gradients. The "picture" is the data.

**Cards.** White, `1px #E5E7EB` border, `8px` radius, very subtle or no shadow —
elevation is implied by border + surface contrast, not heavy drop-shadows. Shadows
are reserved for floating UI; chart tooltips and menus use `shadow-pop`
(`0 8px 24px rgba(0,0,0,.12)`).

**Borders & radii.** Hairline `#E5E7EB`/`#EBEBEB` dividers everywhere. Radii:
`4px` chips/avatars, `6px` inputs & dropdowns, `8px` cards & metric tiles, pill
only for the rare toggle. Corners are gently rounded, never pill-by-default.

**Charts.** Line charts dominate. The current period is a solid `2.5px` blue line;
the comparison period is a `2px` dashed lighter-blue line. Gridlines are faint
horizontal `#EBEBEB`; axes labelled in 12px gray. Hover reveals a white,
shadow-popped tooltip comparing the two periods at that point. Calm and
restrained — no fills, no 3D, no rainbow series.

**States.** Hover = a blue-300 border or a light-gray (`#F5F5F5`) row tint.
Active/selected = pale-blue fill + blue text + blue border (nav, KPI cards,
filter chips). Transitions are short and quiet (~120ms on background/border) — no
bounces, no flourish. The product favors instant, legible feedback over motion.

**Transparency & blur.** Essentially none. This is an opaque, document-like UI.

---

## Iconography

**Lucide** (outline, 2px stroke) is the icon system — confirmed by the Figma
component names (`li:list-filter`, `li:chevron-down`, `li:loader-2`, etc.). It is
loaded from CDN (`https://unpkg.com/lucide@latest`) and used via the `Icon`
wrapper component.

Common icons: `home` (Leadership), `briefcase` (Institutions), `list-tree`
(Content Details), `search`, `calendar`, `list-filter`, `chevron-down` /
`chevron-right` / `chevron-left`, `arrow-up` / `arrow-down` (change markers),
`download`, `settings-2`, and `sparkles` (the orange AI-Insight mark).

Icons are SVG (no icon font, no PNG icons, no emoji, no unicode-as-icon). The
**logo** is a vector wordmark — see `assets/`.

> **Substitution flag:** Lucide is linked from CDN as the closest match to the
> `li:`-prefixed icons in the Figma. If the production app self-hosts a specific
> Lucide version (or a customized set), drop it into `assets/` and point the kit
> at it.

---

## Fonts

**Geist** (UI/prose) and **Inter** (metric figures) are the two brand typefaces,
both **self-hosted** from the supplied variable TTFs in `fonts/` and wired via
`@font-face` in `tokens/fonts.css` — no CDN dependency. Geist replaces the Roboto
the Figma file shipped with (a default placeholder). Both faces ship the full
`100–900` weight axis plus italics. No substitutions were needed — the real brand
fonts were supplied.

---

## Components

Reusable React primitives (each `Name.jsx` + `Name.d.ts` + `Name.prompt.md`, with
a `@dsCard` demo per directory). Import from the compiled bundle:
`const { Button } = window.<Namespace>` (run `check_design_system` for the exact
namespace).

| Component | Group | What |
|---|---|---|
| `Icon` | core | Lucide outline-icon wrapper (2px stroke). |
| `Button` | actions | Action button — primary / line / ghost / icon / link. |
| `SearchField` | inputs | Top-bar search input with trailing glyph. |
| `FilterControl` | inputs | Filter-bar control chip (dropdown / date / toggle). |
| `Tabs` | navigation | Underline tab bar. |
| `SegmentedToggle` | navigation | Compact 2–3 option pill switch. |
| `MetricCard` | data | KPI tile — label, Inter figure, change indicator. |
| `DataTable` | data | Data table with num / change / name columns. |
| `ChangeValue` | data | Signed, colored delta (green up / red down). |
| `LineChart` + `ChartLegend` | data | Dual-series comparison line chart. |
| `InsightBox` | feedback | AI "Insight" callout (the only orange in the product). |

**Intentional additions:** `Icon` is a thin wrapper the source implied (the Figma
used raw `li:`-prefixed Lucide glyphs); it is added so consumers have a typed way
to place icons. `ChangeValue` and `ChartLegend` factor out reused fragments from
the source table/chart. Everything else maps directly to a family the source
Design System showcased (Buttons, Filters, Search, Tabs, Metric Card, Table,
Insight, Line Chart).

---

## Index — what's in this folder

| Path | What |
|---|---|
| `styles.css` | Global entry point — `@import`s all tokens + base. Consumers link this. |
| `tokens/` | `fonts.css`, `colors.css`, `spacing.css`, `typography.css`, `base.css`. |
| `fonts/` | Geist + Inter variable TTFs (self-hosted). |
| `assets/` | Logo — `jove-logo.svg` (full), `-mark`, `-accent`. |
| `components/` | Reusable primitives, grouped by concern (see table above). |
| `guidelines/` | Foundation specimen cards (Colors / Type / Spacing / Brand). |
| `ui_kits/analytics/` | Interactive dashboard recreation (Leadership / Institutions / Content Details). |
| `thumbnail.html` | Homepage tile for this design system. |
| `SKILL.md` | Agent-Skill manifest for reuse in Claude Code. |

### UI kits
- **`ui_kits/analytics/`** — the JoVE Analytics dashboard. Composes the primitives
  into TopBar, FilterBar, Sidebar, KPI rows, the dual-line chart, InsightBox,
  FeatureUsage, and data tables across three screens. There is one product surface
  in scope, so there is one UI kit. No slide template was provided, so no `slides/`
  were created.
