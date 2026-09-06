/* @ds-bundle: {"format":4,"namespace":"JoVEAnalyticsDesignSystem_9803c3","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"ChangeValue","sourcePath":"components/data/ChangeValue.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"LineChart","sourcePath":"components/data/LineChart.jsx"},{"name":"ChartLegend","sourcePath":"components/data/LineChart.jsx"},{"name":"MetricCard","sourcePath":"components/data/MetricCard.jsx"},{"name":"InsightBox","sourcePath":"components/feedback/InsightBox.jsx"},{"name":"FilterControl","sourcePath":"components/inputs/FilterControl.jsx"},{"name":"SearchField","sourcePath":"components/inputs/SearchField.jsx"},{"name":"SegmentedToggle","sourcePath":"components/navigation/SegmentedToggle.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"64bca2d98707","components/core/Icon.jsx":"283ca951af5f","components/data/ChangeValue.jsx":"12bc313197ec","components/data/DataTable.jsx":"56ba6a07790b","components/data/LineChart.jsx":"e2dd2cfd7d62","components/data/MetricCard.jsx":"e7c85c36afed","components/feedback/InsightBox.jsx":"2e2d7896373c","components/inputs/FilterControl.jsx":"c2233fbcc6b7","components/inputs/SearchField.jsx":"1016f27f81d9","components/navigation/SegmentedToggle.jsx":"3a558362d7da","components/navigation/Tabs.jsx":"ef19741b9436","ui_kits/analytics/Chrome.jsx":"f08f59523551","ui_kits/analytics/Pieces.jsx":"303acc4ca3d0","ui_kits/analytics/Screens.jsx":"abe9f468721e","ui_kits/analytics/data.js":"4b181bf15ca1"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.JoVEAnalyticsDesignSystem_9803c3 = window.JoVEAnalyticsDesignSystem_9803c3 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Button.jsx
try { (() => {
/**
 * Button — JoVE Analytics action button.
 * Variants: primary (blue fill), line (white, blue outline), ghost (neutral
 * outline), icon (36×36 square), link (inline text link with optional chevron).
 */
function Button({
  variant = "primary",
  children,
  icon,
  iconRight,
  onClick,
  disabled = false,
  type = "button",
  style = {}
}) {
  const base = {
    font: "500 14px/20px var(--font-ui)",
    borderRadius: "var(--radius-sm)",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    cursor: disabled ? "not-allowed" : "pointer",
    border: "1px solid transparent",
    padding: "8px 16px",
    transition: "background .12s, border-color .12s, color .12s",
    opacity: disabled ? 0.5 : 1,
    whiteSpace: "nowrap"
  };
  const variants = {
    primary: {
      background: "var(--blue-600)",
      color: "#fff",
      borderColor: "var(--blue-600)"
    },
    line: {
      background: "#fff",
      color: "var(--blue-600)",
      borderColor: "var(--blue-300)"
    },
    ghost: {
      background: "transparent",
      color: "var(--ink-600)",
      borderColor: "var(--border)"
    },
    icon: {
      background: "#fff",
      color: "var(--ink-500)",
      borderColor: "var(--border)",
      padding: 8,
      width: 36,
      height: 36,
      justifyContent: "center"
    },
    link: {
      background: "none",
      color: "var(--blue-600)",
      border: "none",
      padding: "8px 0",
      fontWeight: 500
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    onClick: disabled ? undefined : onClick,
    disabled: disabled,
    style: {
      ...base,
      ...variants[variant],
      ...style
    }
  }, icon, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
/**
 * Icon — thin wrapper over Lucide outline icons (2px stroke), the JoVE Analytics
 * icon system. Renders an <i data-lucide> element and asks lucide to hydrate it.
 * Requires the Lucide UMD script on the page (loaded from CDN in cards / kits).
 */
function Icon({
  name,
  size = 16,
  color,
  strokeWidth = 2,
  style = {}
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (window.lucide && ref.current) {
      // hydrate just this node's placeholder into an <svg>
      window.lucide.createIcons({
        nameAttr: "data-lucide",
        attrs: {
          "stroke-width": strokeWidth
        }
      });
    }
  });
  return /*#__PURE__*/React.createElement("i", {
    ref: ref,
    "data-lucide": name,
    "data-sw": strokeWidth,
    style: {
      width: size,
      height: size,
      display: "inline-flex",
      flex: "none",
      color,
      ...style
    }
  });
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/data/ChangeValue.jsx
try { (() => {
/**
 * ChangeValue — a signed, colored delta. Positive (+) reads green, negative (−)
 * reads red. Pass the pre-formatted string ("+172%", "−60%"); the sign drives the
 * color unless `dir` is given explicitly.
 */
function ChangeValue({
  children,
  dir,
  style = {}
}) {
  const text = typeof children === "string" ? children : "";
  const down = dir ? dir === "down" : text.trim().startsWith("−") || text.trim().startsWith("-");
  return /*#__PURE__*/React.createElement("span", {
    style: {
      color: down ? "var(--red-600)" : "var(--green-600)",
      fontWeight: 500,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { ChangeValue });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ChangeValue.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
/**
 * DataTable — the JoVE Analytics data table. Quiet 12px gray headers, hairline
 * row dividers, a light-gray hover tint. Columns declare alignment and kind:
 *   kind "num"    → Inter tabular figures, right-aligned by default
 *   kind "change" → colored ChangeValue (green/red)
 *   kind "name"   → darker ink-900 (primary label column)
 * Each column may carry a `sub` line (e.g. a date range) under its header.
 */
function DataTable({
  columns = [],
  rows = [],
  style = {}
}) {
  const alignOf = c => c.align || (c.kind === "num" || c.kind === "change" ? "right" : "left");
  return /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      ...style
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map((c, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      font: "400 12px/16px var(--font-ui)",
      color: "var(--ink-400)",
      textAlign: alignOf(c),
      padding: "10px 16px",
      borderBottom: "1px solid var(--border)",
      fontWeight: 400,
      whiteSpace: "nowrap"
    }
  }, c.header, c.sub && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "400 11px/14px var(--font-ui)",
      color: "var(--ink-300)"
    }
  }, c.sub))))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, ri) => /*#__PURE__*/React.createElement(Row, {
    key: ri,
    row: r,
    columns: columns,
    alignOf: alignOf
  }))));
}
function Row({
  row,
  columns,
  alignOf
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("tr", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, columns.map((c, ci) => {
    const val = row[c.key];
    const isNum = c.kind === "num";
    return /*#__PURE__*/React.createElement("td", {
      key: ci,
      style: {
        font: "400 14px/20px var(--font-ui)",
        fontFamily: isNum ? "var(--font-num)" : "var(--font-ui)",
        color: c.kind === "name" ? "var(--ink-900)" : "var(--ink-700)",
        textAlign: alignOf(c),
        padding: "14px 16px",
        borderBottom: "1px solid var(--border-2)",
        background: hover ? "var(--surface-3)" : "transparent",
        whiteSpace: c.kind === "name" ? "normal" : "nowrap"
      }
    }, c.kind === "change" ? /*#__PURE__*/React.createElement(__ds_scope.ChangeValue, {
      dir: row[c.dirKey || c.key + "Dir"]
    }, val) : val);
  }));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/LineChart.jsx
try { (() => {
/**
 * LineChart — the dual-series SVG line chart. Current period is a solid 2.5px blue
 * line; the comparison period is a 2px dashed lighter-blue line. Faint horizontal
 * gridlines, 12px gray axis labels, and a shadow-popped hover tooltip comparing
 * the two periods at the hovered point. No fills, no 3D, no rainbow series.
 */
function fmtAxis(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(n % 1e6 === 0 ? 0 : 1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(0) + "K";
  return "" + n;
}
function fmtFull(n) {
  return n.toLocaleString("en-US");
}
function LineChart({
  months = [],
  current = [],
  compare = [],
  height = 320,
  maxY = 12e6,
  curLabel = "Last 12 months",
  cmpLabel = "Same Period last year",
  cmpDateLabel
}) {
  const [hover, setHover] = React.useState(null);
  const padL = 56,
    padR = 16,
    padT = 16,
    padB = 28;
  const w = 1040,
    h = height;
  const innerW = w - padL - padR,
    innerH = h - padT - padB;
  const n = months.length;
  const x = i => padL + (n === 1 ? 0 : i / (n - 1) * innerW);
  const y = v => padT + innerH - v / maxY * innerH;
  const toPath = arr => arr.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const ticks = [];
  for (let v = 0; v <= maxY; v += maxY / 6) ticks.push(Math.round(v));
  const onMove = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width * w;
    let idx = Math.round((px - padL) / innerW * (n - 1));
    idx = Math.max(0, Math.min(n - 1, idx));
    setHover(idx);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${w} ${h}`,
    width: "100%",
    style: {
      display: "block",
      overflow: "visible"
    },
    onMouseMove: onMove,
    onMouseLeave: () => setHover(null)
  }, ticks.map((t, i) => /*#__PURE__*/React.createElement("g", {
    key: i
  }, /*#__PURE__*/React.createElement("line", {
    x1: padL,
    x2: w - padR,
    y1: y(t),
    y2: y(t),
    stroke: "var(--border-2)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("text", {
    x: padL - 12,
    y: y(t) + 4,
    textAnchor: "end",
    fontSize: "12",
    fontFamily: "var(--font-ui)",
    fill: "var(--ink-400)"
  }, fmtAxis(t)))), months.map((m, i) => /*#__PURE__*/React.createElement("text", {
    key: i,
    x: x(i),
    y: h - 6,
    textAnchor: "middle",
    fontSize: "12",
    fontFamily: "var(--font-ui)",
    fill: "var(--ink-400)"
  }, m)), /*#__PURE__*/React.createElement("path", {
    d: toPath(compare),
    fill: "none",
    stroke: "var(--blue-500)",
    strokeWidth: "2",
    strokeDasharray: "5 5",
    opacity: "0.85",
    strokeLinejoin: "round",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: toPath(current),
    fill: "none",
    stroke: "var(--blue-600)",
    strokeWidth: "2.5",
    strokeLinejoin: "round",
    strokeLinecap: "round"
  }), hover != null && /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("line", {
    x1: x(hover),
    x2: x(hover),
    y1: padT,
    y2: padT + innerH,
    stroke: "var(--grid-line)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: x(hover),
    cy: y(current[hover]),
    r: "4.5",
    fill: "var(--blue-600)",
    stroke: "#fff",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: x(hover),
    cy: y(compare[hover]),
    r: "4.5",
    fill: "var(--blue-500)",
    stroke: "#fff",
    strokeWidth: "2"
  }))), hover != null && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      pointerEvents: "none",
      left: `${x(hover) / w * 100}%`,
      top: 8,
      transform: "translateX(-50%)",
      background: "#fff",
      boxShadow: "var(--shadow-pop)",
      borderRadius: 8,
      padding: "12px 16px",
      display: "flex",
      gap: 24,
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderLeft: "2px solid var(--blue-600)",
      paddingLeft: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "400 12px/16px var(--font-ui)",
      color: "var(--ink-400)"
    }
  }, months[hover]), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "700 16px/22px var(--font-num)",
      color: "var(--ink-900)"
    }
  }, fmtFull(current[hover]))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderLeft: "2px dashed var(--blue-500)",
      paddingLeft: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "400 12px/16px var(--font-ui)",
      color: "var(--ink-400)"
    }
  }, cmpDateLabel || cmpLabel), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "700 16px/22px var(--font-num)",
      color: "var(--ink-900)"
    }
  }, fmtFull(compare[hover])))));
}

/** ChartLegend — the two-line legend that sits above a LineChart, right-aligned. */
function ChartLegend({
  curLabel = "Last 12 months",
  cmpLabel = "Same Period last year"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 24,
      justifyContent: "flex-end",
      font: "400 14px/20px var(--font-ui)",
      color: "var(--ink-550)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 0,
      borderTop: "2px solid var(--blue-600)"
    }
  }), curLabel), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 0,
      borderTop: "2px dashed var(--blue-500)"
    }
  }), cmpLabel));
}
Object.assign(__ds_scope, { LineChart, ChartLegend });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/LineChart.jsx", error: String((e && e.message) || e) }); }

// components/data/MetricCard.jsx
try { (() => {
/**
 * MetricCard — a KPI tile. Label on top, big Inter figure, and a change indicator
 * (arrow + percent). `active` gives the selected pale-blue treatment used when a
 * KPI card drives the chart below it. `interactive` adds the hover border.
 */
function MetricCard({
  label,
  value,
  dir = "up",
  pct,
  active = false,
  interactive = true,
  onClick,
  style = {}
}) {
  const [hover, setHover] = React.useState(false);
  const borderColor = active || interactive && hover ? "var(--blue-300)" : "var(--border)";
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: active ? "var(--blue-100)" : "var(--surface-1)",
      border: `1px solid ${borderColor}`,
      borderRadius: "var(--radius-md)",
      padding: 20,
      cursor: interactive ? "pointer" : "default",
      transition: "background .12s, border-color .12s",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "400 14px/20px var(--font-ui)",
      color: "var(--ink-550)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 12,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "700 24px/32px var(--font-num)",
      color: "var(--ink-900)",
      letterSpacing: "-0.02em"
    }
  }, value), pct != null && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 2,
      font: "400 14px/20px var(--font-ui)",
      color: "var(--ink-550)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: dir === "down" ? "arrow-down" : "arrow-up",
    size: 16
  }), pct)));
}
Object.assign(__ds_scope, { MetricCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/MetricCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/InsightBox.jsx
try { (() => {
/**
 * InsightBox — the AI "Insight" callout. A subtle surface-1 panel with the orange
 * Lucide sparkles mark and an orange label, followed by one or more comparative,
 * present-tense sentences. Orange is used ONLY here.
 */
function InsightBox({
  lines = [],
  label = "Insight",
  style = {}
}) {
  const rows = Array.isArray(lines) ? lines : [lines];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-1)",
      border: "1px solid var(--border-2)",
      borderRadius: "var(--radius-md)",
      padding: "16px 20px",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 24,
      color: "var(--orange-600)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "sparkles",
    size: 18,
    color: "var(--orange-600)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "500 14px/20px var(--font-ui)",
      color: "var(--orange-700)"
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "400 14px/22px var(--font-ui)",
      color: "var(--ink-600)",
      marginTop: 8
    }
  }, rows.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, l))));
}
Object.assign(__ds_scope, { InsightBox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/InsightBox.jsx", error: String((e && e.message) || e) }); }

// components/inputs/FilterControl.jsx
try { (() => {
/**
 * FilterControl — a filter-bar control chip (36px tall, white, hairline border).
 * Used for dropdowns ("All CS/Sales Member ▾"), date pickers ("From: …"), and the
 * "Filters" toggle. `active` gives it the pale-blue selected treatment. `placeholder`
 * renders the label muted (ink-400) as an unset value.
 */
function FilterControl({
  label,
  leadingIcon,
  trailingIcon,
  active = false,
  placeholder = false,
  onClick,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      height: 36,
      padding: "0 12px",
      background: active ? "var(--blue-100)" : "#fff",
      border: `1px solid ${active ? "var(--blue-300)" : "var(--border)"}`,
      borderRadius: "var(--radius-sm)",
      font: "400 14px/20px var(--font-ui)",
      color: active ? "var(--blue-600)" : placeholder ? "var(--ink-400)" : "var(--ink-700)",
      whiteSpace: "nowrap",
      userSelect: "none",
      cursor: onClick ? "pointer" : "default",
      transition: "background .12s, border-color .12s, color .12s",
      ...style
    }
  }, leadingIcon, /*#__PURE__*/React.createElement("span", null, label), trailingIcon);
}
Object.assign(__ds_scope, { FilterControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/inputs/FilterControl.jsx", error: String((e && e.message) || e) }); }

// components/inputs/SearchField.jsx
try { (() => {
/**
 * SearchField — the top-bar search input. Rounded 6px, hairline border, a muted
 * Lucide search glyph on the right. Pass an <Icon name="search" /> as `icon`.
 */
function SearchField({
  value,
  onChange,
  placeholder = "Search for institutions",
  icon,
  width = 360,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      width,
      maxWidth: "100%",
      height: 36,
      padding: "0 12px",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-sm)",
      background: "#fff",
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: value,
    onChange: onChange ? e => onChange(e.target.value) : undefined,
    placeholder: placeholder,
    style: {
      border: "none",
      outline: "none",
      flex: 1,
      minWidth: 0,
      font: "400 14px/20px var(--font-ui)",
      color: "var(--ink-700)",
      background: "none"
    }
  }), icon);
}
Object.assign(__ds_scope, { SearchField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/inputs/SearchField.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SegmentedToggle.jsx
try { (() => {
/**
 * SegmentedToggle — compact 2–3 option pill switch used inside card headers
 * ("Views / Generations", "Subscribers / Non Subscribed"). The selected option
 * gets a white chip with a subtle shadow.
 */
function SegmentedToggle({
  options = [],
  value,
  onChange,
  defaultValue = 0,
  style = {}
}) {
  const [internal, setInternal] = React.useState(defaultValue);
  const active = value != null ? value : internal;
  const select = i => {
    if (value == null) setInternal(i);
    onChange && onChange(i);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      background: "var(--surface-1)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-sm)",
      padding: 3,
      ...style
    }
  }, options.map((o, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => select(i),
    style: {
      font: "500 13px/18px var(--font-ui)",
      border: "none",
      background: i === active ? "#fff" : "none",
      color: i === active ? "var(--ink-900)" : "var(--ink-500)",
      padding: "5px 14px",
      borderRadius: "var(--radius-xs)",
      boxShadow: i === active ? "var(--shadow-xs)" : "none",
      cursor: "pointer"
    }
  }, o)));
}
Object.assign(__ds_scope, { SegmentedToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SegmentedToggle.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
/**
 * Tabs — underline tab bar. Active tab is blue with a 2px blue underline; the
 * others are muted. Controlled via `value` (index) + `onChange`, or uncontrolled.
 */
function Tabs({
  tabs = [],
  value,
  onChange,
  defaultValue = 0,
  style = {}
}) {
  const [internal, setInternal] = React.useState(defaultValue);
  const active = value != null ? value : internal;
  const select = i => {
    if (value == null) setInternal(i);
    onChange && onChange(i);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 24,
      borderBottom: "1px solid var(--border)",
      ...style
    }
  }, tabs.map((t, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => select(i),
    style: {
      font: "500 14px/20px var(--font-ui)",
      color: i === active ? "var(--blue-600)" : "var(--ink-400)",
      padding: "8px 2px 12px",
      border: "none",
      borderBottom: `2px solid ${i === active ? "var(--blue-600)" : "transparent"}`,
      background: "none",
      cursor: "pointer"
    }
  }, t)));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/analytics/Chrome.jsx
try { (() => {
// Chrome.jsx — TopBar, FilterBar, Sidebar
function TopBar({
  query,
  setQuery
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/jove-logo.svg",
    alt: "JoVE"
  }), /*#__PURE__*/React.createElement("span", {
    className: "word"
  }, "Analytics")), /*#__PURE__*/React.createElement("div", {
    className: "right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "search"
  }, /*#__PURE__*/React.createElement("input", {
    value: query,
    onChange: e => setQuery(e.target.value),
    placeholder: "Search for institutions"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    className: "avatar"
  }, "A")));
}
function FilterBar() {
  const [member, setMember] = React.useState(false);
  const [filters, setFilters] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: "filterbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctrl" + (member ? " active" : ""),
    onClick: () => setMember(!member)
  }, /*#__PURE__*/React.createElement("span", null, "All CS/Sales Member"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ctrl"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ph"
  }, "Select Region/Country"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ctrl"
  }, /*#__PURE__*/React.createElement("span", null, "Custom"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ctrl"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar"
  }), /*#__PURE__*/React.createElement("span", null, "From: 23-02-2025")), /*#__PURE__*/React.createElement("div", {
    className: "ctrl"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar"
  }), /*#__PURE__*/React.createElement("span", null, "To: 23-02-2026")), /*#__PURE__*/React.createElement("div", {
    className: "spacer"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ctrl"
  }, /*#__PURE__*/React.createElement("span", null, "Compare: None"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ctrl" + (filters ? " active" : ""),
    onClick: () => setFilters(!filters)
  }, /*#__PURE__*/React.createElement("span", null, "Filters"), /*#__PURE__*/React.createElement(Icon, {
    name: "list-filter"
  })));
}
function Sidebar({
  active,
  setActive
}) {
  const items = [{
    key: "leadership",
    label: "Leadership",
    icon: "home"
  }, {
    key: "institutions",
    label: "Institutions",
    icon: "briefcase"
  }, {
    key: "content",
    label: "Content Details",
    icon: "list-tree"
  }];
  return /*#__PURE__*/React.createElement("aside", {
    className: "sidebar"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "nav"
  }, items.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.key,
    className: "item" + (active === it.key ? " active" : ""),
    onClick: () => setActive(it.key)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: it.icon,
    size: 18
  }), " ", it.label))));
}
Object.assign(window, {
  TopBar,
  FilterBar,
  Sidebar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/analytics/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/analytics/Pieces.jsx
try { (() => {
// Pieces.jsx — MetricRow, InsightBox, ChartPanel, FeatureUsage, ChangeCell, Pager

function ChangeCell({
  dir,
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: dir === "down" ? "down" : "up"
  }, children);
}
function MetricRow({
  items,
  active,
  setActive
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "metric-row"
  }, items.map(m => /*#__PURE__*/React.createElement("div", {
    key: m.key,
    className: "metric" + (active === m.key ? " active" : ""),
    onClick: () => setActive(m.key)
  }, /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, m.label), /*#__PURE__*/React.createElement("div", {
    className: "valrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "val"
  }, m.value), /*#__PURE__*/React.createElement("span", {
    className: "chg"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: m.dir === "down" ? "arrow-down" : "arrow-up"
  }), m.pct)))));
}
function InsightBox({
  lines
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "insight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "spark"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkles",
    size: 18
  })), /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "Insight")), /*#__PURE__*/React.createElement("div", {
    className: "b"
  }, lines.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, l))));
}
function ChartPanel({
  months,
  series,
  maxY,
  height = 320,
  cmpDateLabel
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "panel chart"
  }, /*#__PURE__*/React.createElement(ChartLegend, null), /*#__PURE__*/React.createElement(LineChart, {
    months: months,
    current: series.current,
    compare: series.compare,
    maxY: maxY,
    height: height,
    cmpDateLabel: cmpDateLabel
  }));
}
function FeatureUsage({
  features,
  series
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "feature-grid"
  }, features.map(f => {
    const [tab, setTab] = React.useState(0);
    return /*#__PURE__*/React.createElement("div", {
      className: "feature",
      key: f.key
    }, /*#__PURE__*/React.createElement("div", {
      className: "fhead"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ftitle"
    }, f.title), /*#__PURE__*/React.createElement("div", {
      className: "seg"
    }, /*#__PURE__*/React.createElement("button", {
      className: tab === 0 ? "active" : "",
      onClick: () => setTab(0)
    }, "Views"), /*#__PURE__*/React.createElement("button", {
      className: tab === 1 ? "active" : "",
      onClick: () => setTab(1)
    }, "Generations"))), /*#__PURE__*/React.createElement("div", {
      style: {
        font: "400 13px/18px var(--font-ui)",
        color: "var(--ink-550)",
        marginTop: 14
      }
    }, f.metric), /*#__PURE__*/React.createElement("div", {
      className: "fval",
      style: {
        marginTop: 2
      }
    }, /*#__PURE__*/React.createElement("span", null, f.value), /*#__PURE__*/React.createElement("span", {
      className: "chg",
      style: {
        fontWeight: 400
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-up"
    }), f.pct)), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12
      }
    }, /*#__PURE__*/React.createElement(ChartLegend, {
      curLabel: "Current Period",
      cmpLabel: "Same Period last year"
    }), /*#__PURE__*/React.createElement(LineChart, {
      months: MONTHS,
      current: series.current,
      compare: series.compare,
      maxY: 520,
      height: 180,
      curLabel: "Current Period",
      cmpLabel: "Same Period last year"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        textAlign: "left"
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: "link",
      style: {
        paddingLeft: 0
      }
    }, f.link, " ", /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-right",
      size: 14
    }))));
  }));
}
function Pager({
  pages = 12,
  current = 1
}) {
  const [pg, setPg] = React.useState(current);
  const shown = [1, 2, 3];
  return /*#__PURE__*/React.createElement("div", {
    className: "pager"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setPg(Math.max(1, pg - 1))
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-left",
    size: 14
  })), shown.map(p => /*#__PURE__*/React.createElement("button", {
    key: p,
    className: pg === p ? "active" : "",
    onClick: () => setPg(p)
  }, p)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink-400)",
      padding: "0 4px"
    }
  }, "\u2026"), /*#__PURE__*/React.createElement("button", {
    className: pg === pages ? "active" : "",
    onClick: () => setPg(pages)
  }, pages), /*#__PURE__*/React.createElement("button", {
    onClick: () => setPg(Math.min(pages, pg + 1))
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 14
  })));
}
Object.assign(window, {
  ChangeCell,
  MetricRow,
  InsightBox,
  ChartPanel,
  FeatureUsage,
  Pager
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/analytics/Pieces.jsx", error: String((e && e.message) || e) }); }

// ui_kits/analytics/Screens.jsx
try { (() => {
// Screens.jsx — Leadership (overview), Institutions, ContentDetails

function ContentTable({
  withPager = true
}) {
  const [tab, setTab] = React.useState(0);
  const tabs = ["Products", "Subjects", "Articles"];
  return /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 16px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "tabs"
  }, tabs.map((t, i) => /*#__PURE__*/React.createElement("button", {
    key: t,
    className: "tab" + (i === tab ? " active" : ""),
    onClick: () => setTab(i)
  }, t)))), /*#__PURE__*/React.createElement("table", {
    className: "data"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", {
    className: "r"
  }, "Views", /*#__PURE__*/React.createElement("div", {
    style: {
      font: "400 11px/14px var(--font-ui)",
      color: "var(--ink-300)"
    }
  }, "(Mar 24 \u2013 Feb 26)")), /*#__PURE__*/React.createElement("th", {
    className: "r"
  }, "Views", /*#__PURE__*/React.createElement("div", {
    style: {
      font: "400 11px/14px var(--font-ui)",
      color: "var(--ink-300)"
    }
  }, "(Mar 23 \u2013 Feb 24)")), /*#__PURE__*/React.createElement("th", {
    className: "r"
  }, "Change"), /*#__PURE__*/React.createElement("th", {
    className: "r"
  }, "Time Spent", /*#__PURE__*/React.createElement("div", {
    style: {
      font: "400 11px/14px var(--font-ui)",
      color: "var(--ink-300)"
    }
  }, "(Mar 24 \u2013 Feb 26)")), /*#__PURE__*/React.createElement("th", {
    className: "r"
  }, "Time Spent", /*#__PURE__*/React.createElement("div", {
    style: {
      font: "400 11px/14px var(--font-ui)",
      color: "var(--ink-300)"
    }
  }, "(Mar 23 \u2013 Feb 24)")))), /*#__PURE__*/React.createElement("tbody", null, CONTENT_ROWS.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("td", {
    className: "name"
  }, r.name), /*#__PURE__*/React.createElement("td", {
    className: "r num"
  }, r.views), /*#__PURE__*/React.createElement("td", {
    className: "r num"
  }, r.pviews), /*#__PURE__*/React.createElement("td", {
    className: "r"
  }, /*#__PURE__*/React.createElement(ChangeCell, {
    dir: r.dir
  }, r.change)), /*#__PURE__*/React.createElement("td", {
    className: "r num"
  }, r.time), /*#__PURE__*/React.createElement("td", {
    className: "r num"
  }, r.ptime))))), withPager && /*#__PURE__*/React.createElement(Pager, null));
}
function Leadership() {
  const [metric, setMetric] = React.useState("research");
  const insightLines = ["Core (30% up) and EoE (12% up) saw the most growth while Business (12% down) saw the most decline.", "Australia (50% up) and Singapore (25% up) saw the most growth while China (14% down) saw the most decline."];
  return /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-title"
  }, "Overview"), /*#__PURE__*/React.createElement("div", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "Views"), /*#__PURE__*/React.createElement(MetricRow, {
    items: KPI_VIEWS,
    active: metric,
    setActive: setMetric
  }), /*#__PURE__*/React.createElement(ChartPanel, {
    months: MONTHS,
    series: SERIES_VIEWS,
    maxY: 12e6,
    cmpDateLabel: "Oct 2025"
  }), /*#__PURE__*/React.createElement(InsightBox, {
    lines: insightLines
  })), /*#__PURE__*/React.createElement("div", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "Page Sessions"), /*#__PURE__*/React.createElement("div", {
    className: "metric",
    style: {
      maxWidth: 260,
      cursor: "default"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "Total Page Sessions"), /*#__PURE__*/React.createElement("div", {
    className: "valrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "val"
  }, "24,011,942"), /*#__PURE__*/React.createElement("span", {
    className: "chg"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up"
  }), "12%"))), /*#__PURE__*/React.createElement(ChartPanel, {
    months: MONTHS,
    series: SERIES_SESSIONS,
    maxY: 12e6,
    cmpDateLabel: "Oct 2025"
  }), /*#__PURE__*/React.createElement(InsightBox, {
    lines: insightLines
  })), /*#__PURE__*/React.createElement("div", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "Sales Opportunity"), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, "Page view growth in last 30 days")), /*#__PURE__*/React.createElement("div", {
    className: "ctrl",
    style: {
      cursor: "default"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink-400)"
    }
  }, "Minimum Page views"), /*#__PURE__*/React.createElement("span", {
    className: "num"
  }, "250"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "14px 16px 4px",
      font: "600 14px/20px var(--font-ui)",
      color: "var(--ink-700)"
    }
  }, "Non Subscribed"), /*#__PURE__*/React.createElement("table", {
    className: "data"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Institution Name"), /*#__PURE__*/React.createElement("th", {
    className: "r"
  }, "Views", /*#__PURE__*/React.createElement("div", {
    style: {
      font: "400 11px/14px var(--font-ui)",
      color: "var(--ink-300)"
    }
  }, "(Mar 24 \u2013 Feb 26)")), /*#__PURE__*/React.createElement("th", {
    className: "r"
  }, "Sessions", /*#__PURE__*/React.createElement("div", {
    style: {
      font: "400 11px/14px var(--font-ui)",
      color: "var(--ink-300)"
    }
  }, "(Mar 24 \u2013 Feb 26)")), /*#__PURE__*/React.createElement("th", {
    className: "r"
  }, "Percentage Change"))), /*#__PURE__*/React.createElement("tbody", null, SALES_OPP.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("td", {
    className: "name"
  }, r.name), /*#__PURE__*/React.createElement("td", {
    className: "r"
  }, /*#__PURE__*/React.createElement(ChangeCell, {
    dir: r.dir
  }, r.views)), /*#__PURE__*/React.createElement("td", {
    className: "r"
  }, /*#__PURE__*/React.createElement(ChangeCell, {
    dir: r.dir
  }, r.sessions)), /*#__PURE__*/React.createElement("td", {
    className: "r"
  }, /*#__PURE__*/React.createElement(ChangeCell, {
    dir: r.dir
  }, r.change)))))), /*#__PURE__*/React.createElement("button", {
    className: "link"
  }, "View All Institutes ", /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 14
  })))), /*#__PURE__*/React.createElement("div", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "Subscribers usage report"), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, "Page view change in last 30 days YOY for subscribed content")), /*#__PURE__*/React.createElement("div", {
    className: "two-col"
  }, [{
    title: "Decline",
    rows: DECLINE,
    dir: "down"
  }, {
    title: "Growth",
    rows: GROWTH,
    dir: "up"
  }].map(col => /*#__PURE__*/React.createElement("div", {
    className: "panel",
    key: col.title,
    style: {
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "14px 16px 4px",
      font: "600 14px/20px var(--font-ui)",
      color: "var(--ink-700)"
    }
  }, col.title), /*#__PURE__*/React.createElement("table", {
    className: "data"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Institution Name"), /*#__PURE__*/React.createElement("th", {
    className: "r"
  }, "Percentage Change"))), /*#__PURE__*/React.createElement("tbody", null, col.rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("td", {
    className: "name"
  }, r.name), /*#__PURE__*/React.createElement("td", {
    className: "r"
  }, /*#__PURE__*/React.createElement(ChangeCell, {
    dir: r.change.startsWith("−") ? "down" : "up"
  }, r.change)))))), /*#__PURE__*/React.createElement("button", {
    className: "link"
  }, "View All Institutes ", /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 14
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "Feature Usage"), /*#__PURE__*/React.createElement(FeatureUsage, {
    features: FEATURES,
    series: FEATURE_SERIES
  })), /*#__PURE__*/React.createElement("div", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "Content Performance"), /*#__PURE__*/React.createElement(ContentTable, null)));
}
function Institutions() {
  return /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-title"
  }, "Institutions"), /*#__PURE__*/React.createElement("div", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "All Institutions"), /*#__PURE__*/React.createElement("div", {
    className: "seg"
  }, /*#__PURE__*/React.createElement("button", {
    className: "active"
  }, "Subscribers"), /*#__PURE__*/React.createElement("button", null, "Non Subscribed"))), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("table", {
    className: "data"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Institution Name"), /*#__PURE__*/React.createElement("th", {
    className: "r"
  }, "Views"), /*#__PURE__*/React.createElement("th", {
    className: "r"
  }, "Sessions"), /*#__PURE__*/React.createElement("th", {
    className: "r"
  }, "Avg. Time"), /*#__PURE__*/React.createElement("th", {
    className: "r"
  }, "Change"))), /*#__PURE__*/React.createElement("tbody", null, [...SALES_OPP, ...DECLINE.map(d => ({
    name: d.name,
    views: "12,400",
    sessions: "3,210",
    change: d.change,
    dir: "down"
  }))].map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("td", {
    className: "name"
  }, r.name), /*#__PURE__*/React.createElement("td", {
    className: "r num"
  }, r.views && r.views.includes("%") ? "84,210" : r.views || "84,210"), /*#__PURE__*/React.createElement("td", {
    className: "r num"
  }, r.sessions && r.sessions.includes("%") ? "12,003" : r.sessions || "12,003"), /*#__PURE__*/React.createElement("td", {
    className: "r num"
  }, "7m 18s"), /*#__PURE__*/React.createElement("td", {
    className: "r"
  }, /*#__PURE__*/React.createElement(ChangeCell, {
    dir: (r.change || "+12%").startsWith("−") ? "down" : "up"
  }, r.change || "+12%")))))), /*#__PURE__*/React.createElement(Pager, null))));
}
function ContentDetails() {
  return /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-title"
  }, "Content Details"), /*#__PURE__*/React.createElement("div", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-row"
  }, [{
    l: "Total Articles",
    v: "18,402"
  }, {
    l: "Total Views",
    v: "24,011,942"
  }, {
    l: "Avg. Time Spent",
    v: "6m 42s"
  }, {
    l: "Avg. Completion",
    v: "68%"
  }].map((m, i) => /*#__PURE__*/React.createElement("div", {
    className: "metric",
    style: {
      cursor: "default"
    },
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, m.l), /*#__PURE__*/React.createElement("div", {
    className: "valrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "val"
  }, m.v), /*#__PURE__*/React.createElement("span", {
    className: "chg"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up"
  }), "12%")))))), /*#__PURE__*/React.createElement("div", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "Content Performance"), /*#__PURE__*/React.createElement(ContentTable, null)));
}
Object.assign(window, {
  Leadership,
  Institutions,
  ContentDetails,
  ContentTable
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/analytics/Screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/analytics/data.js
try { (() => {
// data.js — mock dataset for the JoVE Analytics dashboard
const MONTHS = ["Mar/25", "Apr/25", "May/25", "Jun/25", "Jul/25", "Aug/25", "Sep/25", "Oct/25", "Nov/25", "Dec/25", "Jan/26", "Feb/26"];
const SERIES_VIEWS = {
  current: [3.0, 3.7, 2.7, 3.0, 2.5, 3.8, 3.1, 4.2, 5.6, 5.1, 5.6, 8.0].map(v => Math.round(v * 1e6)),
  compare: [2.9, 4.0, 2.5, 3.1, 3.2, 5.1, 4.2, 4.8, 5.4, 7.1, 9.2, 10.7].map(v => Math.round(v * 1e6))
};
const SERIES_SESSIONS = {
  current: [2.0, 2.6, 2.3, 3.0, 3.4, 4.0, 4.6, 5.0, 6.6, 7.0, 8.6, 9.6].map(v => Math.round(v * 1e6)),
  compare: [2.2, 2.4, 2.9, 3.4, 4.1, 4.8, 5.4, 6.0, 6.6, 7.8, 9.0, 10.0].map(v => Math.round(v * 1e6))
};
const KPI_VIEWS = [{
  key: "total",
  label: "Total Page Views",
  value: "24,011,942",
  dir: "up",
  pct: "12%"
}, {
  key: "research",
  label: "Research Views",
  value: "15,582,901",
  dir: "up",
  pct: "12%"
}, {
  key: "education",
  label: "Education Views",
  value: "14,920,385",
  dir: "up",
  pct: "12%"
}, {
  key: "business",
  label: "Business Views",
  value: "1,295,753",
  dir: "down",
  pct: "12%"
}];
const SALES_OPP = [{
  name: "Nilolikan University",
  views: "+75%",
  sessions: "+75%",
  change: "+75%",
  dir: "up"
}, {
  name: "University of Southern Maine",
  views: "+172%",
  sessions: "+172%",
  change: "+172%",
  dir: "up"
}, {
  name: "Universidad Contifutonde de Madrid (UCM)",
  views: "+97%",
  sessions: "+97%",
  change: "+97%",
  dir: "up"
}, {
  name: "Birla Institute of Technology & Science (BITS), India",
  views: "+44%",
  sessions: "+44%",
  change: "+44%",
  dir: "up"
}, {
  name: "University of Bonn",
  views: "+42%",
  sessions: "+42%",
  change: "+42%",
  dir: "up"
}];
const DECLINE = [{
  name: "University of Massachusetts Amherst",
  change: "−60%"
}, {
  name: "University of Melbourne",
  change: "−41%"
}, {
  name: "University of Melbourne",
  change: "−20%"
}, {
  name: "Universidad Andrés Bello",
  change: "−15%"
}, {
  name: "Northwestern University",
  change: "−13%"
}];
const GROWTH = [{
  name: "Alma Mater Studiorum - Università di Bologna",
  change: "+176%"
}, {
  name: "Loyola University Chicago",
  change: "+94%"
}, {
  name: "University of Witwatersrand",
  change: "+34%"
}, {
  name: "University of Illinois at Chicago",
  change: "+70%"
}, {
  name: "Universidad Nacional Autónoma de México",
  change: "+31%"
}];
const CONTENT_ROWS = [{
  name: "Semi-Automated Phenotypic Analysis of H...",
  views: "7,900",
  pviews: "4,009",
  change: "+84%",
  dir: "up",
  time: "9hr 9min",
  ptime: "9hr 0min"
}, {
  name: "Characterization of Adipocyte-Derived Exo...",
  views: "4,000",
  pviews: "6,900",
  change: "−11%",
  dir: "down",
  time: "6.7y 9min",
  ptime: "9hr 5min"
}, {
  name: "Introduction to Light Microscopy",
  views: "7,700",
  pviews: "9,966",
  change: "+22%",
  dir: "up",
  time: "22y 7min",
  ptime: "8.8y 11min"
}, {
  name: "An Introduction to the Microplsetron",
  views: "7,100",
  pviews: "5,890",
  change: "+45%",
  dir: "up",
  time: "9.6y 9min",
  ptime: "4.4y 4min"
}, {
  name: "Mitosis and Cytokinesis",
  views: "4,601",
  pviews: "9,656",
  change: "+72%",
  dir: "up",
  time: "6.7y 9min",
  ptime: "7.9y 11min"
}, {
  name: "What are Membranes?",
  views: "7,900",
  pviews: "9,966",
  change: "+87%",
  dir: "up",
  time: "4.5y 8min",
  ptime: "22y 9min"
}];
const FEATURE_SERIES = {
  current: [120, 150, 180, 160, 210, 240, 260, 300, 330, 360, 420, 500],
  compare: [100, 140, 160, 180, 200, 230, 250, 280, 310, 340, 380, 460]
};
const FEATURES = [{
  key: "quiz",
  title: "Quiz",
  metric: "Total Submissions",
  value: "6,234",
  pct: "12%",
  link: "View Quiz Analysis"
}, {
  key: "lti",
  title: "LTI",
  metric: "Total Integrations",
  value: "6,234",
  pct: "12%",
  link: "View LTI Analysis"
}, {
  key: "embed",
  title: "Embed",
  metric: "Total Integrations",
  value: "6,234",
  pct: "11%",
  link: "View Embed Analysis"
}, {
  key: "playlist",
  title: "Playlist",
  metric: "Total Creations",
  value: "6,234",
  pct: "12%",
  link: "View Playlist Analysis"
}];
Object.assign(window, {
  MONTHS,
  SERIES_VIEWS,
  SERIES_SESSIONS,
  KPI_VIEWS,
  SALES_OPP,
  DECLINE,
  GROWTH,
  CONTENT_ROWS,
  FEATURE_SERIES,
  FEATURES
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/analytics/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.ChangeValue = __ds_scope.ChangeValue;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.LineChart = __ds_scope.LineChart;

__ds_ns.ChartLegend = __ds_scope.ChartLegend;

__ds_ns.MetricCard = __ds_scope.MetricCard;

__ds_ns.InsightBox = __ds_scope.InsightBox;

__ds_ns.FilterControl = __ds_scope.FilterControl;

__ds_ns.SearchField = __ds_scope.SearchField;

__ds_ns.SegmentedToggle = __ds_scope.SegmentedToggle;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
