/**
 * a11y-audit.mjs — automated WCAG 2.2 AA sweep with axe-core.
 *
 * Algorithm
 * ---------
 * 1. Enumerate every route the site serves. Static routes are listed
 *    here; dynamic ones (/portfolio/<slug>, /services/<id>) are derived
 *    from the same data files the App Router uses for
 *    generateStaticParams, so the audit can never drift from the site.
 *    One deliberately-missing route exercises the 404 page.
 * 2. For each route, open it in headless Chromium at a desktop viewport,
 *    wait for the network to go idle (fonts, images, hydration), and run
 *    axe with the WCAG 2.0/2.1/2.2 A+AA rule tags.
 * 3. Additionally open "/" at a 390 px phone width, press the hamburger
 *    so the mobile drawer is in the DOM, and audit that state — a menu
 *    that only exists after interaction is invisible to a plain page scan.
 * 4. Flatten every violation into one row per rule per route and print
 *    a table: route, rule id, impact, number of offending nodes, and the
 *    first node's CSS selector so the failure can be found quickly.
 * 5. Exit 1 if any violation is "serious" or "critical"; exit 0 otherwise.
 *    Minor/moderate findings are printed but do not fail the run, so the
 *    gate catches real barriers without blocking on cosmetic warnings.
 *
 * Preconditions: the production site must already be running at BASE_URL
 * (default http://localhost:3100). This script builds nothing.
 *
 * Complexity: O(R) page loads for R routes; axe itself is O(N) in DOM
 * nodes per page.
 */
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { projects } from "../src/data/projectData.js";
import { services } from "../src/data/servicesData.js";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3100";
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const FAILING_IMPACTS = new Set(["serious", "critical"]);

/** Every route the site serves, in the order a visitor might find them. */
const routes = [
  "/",
  "/about",
  "/portfolio",
  ...projects.map((p) => `/portfolio/${p.slug}`),
  "/services",
  ...services.map((s) => s.url),
  "/process",
  "/testimonials",
  "/faq",
  "/contact",
  "/this-does-not-exist",
];

/** Run axe on the page as it currently stands and return its violations. */
async function audit(page) {
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  return results.violations;
}

/** Flatten axe violations into printable rows, one per rule. */
function toRows(label, violations) {
  return violations.map((v) => ({
    route: label,
    rule: v.id,
    impact: v.impact ?? "n/a",
    nodes: v.nodes.length,
    target: v.nodes[0]?.target.join(" ") ?? "",
  }));
}

/** Pad to a fixed width for the console table. */
const pad = (s, n) => String(s).padEnd(n);

function printTable(rows) {
  const header = { route: "ROUTE", rule: "RULE", impact: "IMPACT", nodes: "NODES", target: "FIRST TARGET" };
  const widths = {
    route: Math.max(...[header, ...rows].map((r) => String(r.route).length)),
    rule: Math.max(...[header, ...rows].map((r) => String(r.rule).length)),
    impact: 8,
    nodes: 5,
  };
  const line = (r) =>
    `${pad(r.route, widths.route)}  ${pad(r.rule, widths.rule)}  ${pad(r.impact, widths.impact)}  ${pad(r.nodes, widths.nodes)}  ${r.target}`;
  console.log(line(header));
  console.log("-".repeat(widths.route + widths.rule + widths.impact + widths.nodes + 8 + 40));
  for (const r of rows) console.log(line(r));
}

async function main() {
  const browser = await chromium.launch();
  const rows = [];

  // Pass 1: every route at a desktop viewport.
  const desktop = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await desktop.newPage();
  for (const route of routes) {
    await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });
    rows.push(...toRows(route, await audit(page)));
    process.stderr.write(`audited ${route}\n`);
  }
  await desktop.close();

  // Pass 2: the mobile drawer on "/", which only exists after a tap.
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mpage = await mobile.newPage();
  await mpage.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
  await mpage.getByRole("button", { name: "Open menu" }).click();
  await mpage.locator("#mobile-menu").waitFor({ state: "visible" });
  rows.push(...toRows("/ (mobile menu open @390px)", await audit(mpage)));
  process.stderr.write("audited / (mobile menu open)\n");
  await mobile.close();

  await browser.close();

  if (rows.length === 0) {
    console.log(`No WCAG violations found across ${routes.length + 1} audited states.`);
    return 0;
  }

  printTable(rows);
  const blocking = rows.filter((r) => FAILING_IMPACTS.has(r.impact));
  console.log(`\n${rows.length} violation row(s); ${blocking.length} serious/critical.`);
  return blocking.length > 0 ? 1 : 0;
}

main()
  .then((code) => process.exit(code))
  .catch((err) => {
    console.error(err);
    process.exit(2);
  });
