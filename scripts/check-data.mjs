/**
 * check-data.mjs — assert that src/data/projectData.js and the image
 * folders under public/assets/portfolio agree. Runs at the start of
 * `npm run build` (and on demand via `npm run check:data`).
 *
 * Invariants checked, for the set P of projects and the set F of folders:
 *   1. folder(p) ∈ F for every p ∈ P            (no project without images)
 *   2. every f ∈ F is folder(p) for some p ∈ P   (no orphaned image folder)
 *   3. |{*.jpg in folder(p)}| = p.imageCount      (gallery length is exact)
 *   4. the jpgs are exactly 1.jpg … imageCount.jpg (the gallery builds
 *      src="<folder>/<i>.jpg" for i = 1..imageCount, so a gap in the
 *      numbering is a broken image even if the count matches)
 *
 * Exit status: 0 when every invariant holds, 1 otherwise, with one line
 * per failure. Complexity O(|P| + |F| + total files): a single pass.
 */
import { readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { projects } from "../src/data/projectData.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const portfolioDir = join(root, "public", "assets", "portfolio");

const folders = readdirSync(portfolioDir).filter((name) =>
  statSync(join(portfolioDir, name)).isDirectory()
);

const problems = [];

/** Sorted integer basenames of the .jpg files in a folder, e.g. [1,2,3]. */
function jpgNumbers(folder) {
  return readdirSync(join(portfolioDir, folder))
    .filter((f) => /\.jpg$/i.test(f))
    .map((f) => f.replace(/\.jpg$/i, ""))
    .map((stem) => (/^\d+$/.test(stem) ? Number(stem) : NaN))
    .sort((a, b) => a - b);
}

const claimed = new Set();
for (const p of projects) {
  if (!folders.includes(p.folder)) {
    problems.push(`${p.slug}: folder "${p.folder}" does not exist under public/assets/portfolio`);
    continue;
  }
  claimed.add(p.folder);

  const numbers = jpgNumbers(p.folder);
  if (numbers.length !== p.imageCount) {
    problems.push(
      `${p.slug}: imageCount is ${p.imageCount} but "${p.folder}" holds ${numbers.length} .jpg file(s)`
    );
  }
  // Expect exactly 1..imageCount with no gaps and no non-numeric names.
  const expected = Array.from({ length: p.imageCount }, (_, i) => i + 1);
  const matches =
    numbers.length === expected.length && numbers.every((n, i) => n === expected[i]);
  if (!matches && numbers.length === p.imageCount) {
    problems.push(
      `${p.slug}: "${p.folder}" .jpg names are not exactly 1..${p.imageCount} (found ${numbers.join(", ")})`
    );
  }
}

for (const f of folders) {
  if (!claimed.has(f)) {
    problems.push(`folder "${f}" has no entry in src/data/projectData.js`);
  }
}

if (problems.length > 0) {
  console.error("check-data: portfolio data and image folders disagree:");
  for (const line of problems) console.error(`  - ${line}`);
  process.exit(1);
}

console.log(`check-data: ${projects.length} projects match ${folders.length} image folders.`);
