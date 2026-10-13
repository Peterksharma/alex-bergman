#!/usr/bin/env node
/*
 * migrate-projects.mjs — one-time move of the static portfolio into the
 * database and the arbergman-media bucket.
 *
 *   node scripts/migrate-projects.mjs            # run
 *   node scripts/migrate-projects.mjs --dry-run  # report, change nothing
 *
 * For each project in src/data/projectData.js:
 *   1. upsert-by-slug a `projects` row (skipped if the slug exists);
 *   2. for n in 1..imageCount, read public/assets/portfolio/<folder>/<n>.jpg,
 *      normalise it with sharp (max 2000px wide, JPEG q82 mozjpeg, EXIF
 *      applied/stripped), upload to projects/<slug>/<n>.jpg, and insert a
 *      project_images row with the real width/height (skipped if the key
 *      already exists in the DB).
 *
 * Idempotent: re-running after a partial failure only does the missing
 * work. The source file's array order becomes `sort_order` for projects
 * and the image number n-1 becomes `sort_order` for images, so the site
 * looks exactly as it did before.
 *
 * Optional fields on the source rows are honoured when present:
 *   tags: string[]   summary: string
 */
import { readFile, stat } from "node:fs/promises";
import { resolve, join } from "node:path";
import { pathToFileURL } from "node:url";
import sharp from "sharp";
import { PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { repoRoot, makeSql, makeS3 } from "./_env.mjs";

const DRY_RUN = process.argv.includes("--dry-run");
const MAX_WIDTH = 2000;

const { projects: source } = await import(pathToFileURL(resolve(repoRoot, "src/data/projectData.js")).href);
const sql = makeSql();
const { client: s3, bucket } = makeS3();

/** A one-sentence summary when the source has none: first sentence of the description. */
function defaultSummary(description) {
  const m = /^(.+?[.!?])(\s|$)/.exec(description.trim());
  const first = m ? m[1] : description.trim();
  return first.length > 180 ? `${first.slice(0, 177).trimEnd()}…` : first;
}

/** Sensible default tags: everything here is residential drafting work. */
function defaultTags(name) {
  const tags = ["Residential"];
  const n = name.toLowerCase();
  if (/remodel/.test(n)) tags.push("Remodel");
  if (/addition/.test(n)) tags.push("Addition");
  if (/adu|dadu|duplex/.test(n)) tags.push("ADU");
  if (/garage/.test(n)) tags.push("Garage");
  if (/new custom|rebuild/.test(n)) tags.push("New Construction");
  if (/concept/.test(n)) tags.push("Concept Design");
  return tags;
}

async function keyExistsInBucket(key) {
  try {
    await s3.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
    return true;
  } catch (err) {
    if (err?.name === "NotFound" || err?.$metadata?.httpStatusCode === 404) return false;
    throw err;
  }
}

const totals = { projectsInserted: 0, projectsSkipped: 0, imagesInserted: 0, imagesSkipped: 0, bytesUploaded: 0 };

for (const [index, p] of source.entries()) {
  const tags = Array.isArray(p.tags) && p.tags.length ? p.tags : defaultTags(p.name);
  const summary = typeof p.summary === "string" && p.summary.trim() ? p.summary.trim() : defaultSummary(p.description ?? "");

  let [row] = await sql`select id from projects where slug = ${p.slug}`;
  if (row) {
    totals.projectsSkipped++;
    console.log(`= project ${p.slug} exists (id ${row.id})`);
  } else if (DRY_RUN) {
    console.log(`+ project ${p.slug} would be inserted (sort ${index})`);
    row = { id: null };
  } else {
    [row] = await sql`
      insert into projects (slug, name, summary, description, tags, sort_order, published)
      values (${p.slug}, ${p.name}, ${summary}, ${p.description ?? ""}, ${tags}, ${index}, true)
      returning id`;
    totals.projectsInserted++;
    console.log(`+ project ${p.slug} inserted (id ${row.id}, sort ${index})`);
  }

  const folder = join(repoRoot, "public/assets/portfolio", p.folder);
  for (let n = 1; n <= (p.imageCount ?? 0); n++) {
    const file = join(folder, `${n}.jpg`);
    const key = `projects/${p.slug}/${n}.jpg`;
    try {
      await stat(file);
    } catch {
      console.warn(`  ! missing source file ${file}; skipping`);
      continue;
    }

    if (row.id != null) {
      const [existing] = await sql`select id from project_images where key = ${key}`;
      if (existing) {
        totals.imagesSkipped++;
        continue;
      }
    }

    const { data, info } = await sharp(await readFile(file))
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer({ resolveWithObject: true });

    if (DRY_RUN) {
      console.log(`  + ${key} ${info.width}x${info.height} ${(data.length / 1024).toFixed(0)}KB (dry run)`);
      continue;
    }

    if (!(await keyExistsInBucket(key))) {
      await s3.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: data, ContentType: "image/jpeg" }));
      totals.bytesUploaded += data.length;
    }
    await sql`
      insert into project_images (project_id, key, width, height, alt, sort_order)
      values (${row.id}, ${key}, ${info.width}, ${info.height}, ${`${p.name} – image ${n}`}, ${n - 1})
      on conflict (key) do nothing`;
    totals.imagesInserted++;
    console.log(`  + ${key} ${info.width}x${info.height} ${(data.length / 1024).toFixed(0)}KB`);
  }
}

await sql.end();
console.log("\nDone.", { ...totals, mbUploaded: (totals.bytesUploaded / 1024 / 1024).toFixed(2) });
