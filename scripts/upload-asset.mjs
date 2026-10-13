#!/usr/bin/env node
/*
 * upload-asset.mjs — push one local file to the arbergman-media bucket.
 *
 *   node scripts/upload-asset.mjs <localfile> <bucketKey>
 *   node scripts/upload-asset.mjs out/hero.mp4 assets/hero.mp4
 *
 * The file is uploaded verbatim (no resizing) with a content-type inferred
 * from its extension, and is then reachable at mediaUrl(bucketKey), i.e.
 * /cdn/<bucketKey> on the site. Re-uploading the same key overwrites it;
 * because the cdn route marks responses immutable, use a new key (e.g. a
 * version suffix) when the content changes, or caches will keep the old
 * bytes for up to a year.
 */
import { readFile } from "node:fs/promises";
import { extname } from "node:path";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { makeS3 } from "./_env.mjs";

const [, , localFile, key] = process.argv;
if (!localFile || !key) {
  console.error("usage: node scripts/upload-asset.mjs <localfile> <bucketKey>");
  process.exit(1);
}
if (key.startsWith("/") || key.includes("..")) {
  console.error("bucketKey must be a relative key like assets/hero.mp4");
  process.exit(1);
}

const CONTENT_TYPES = {
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
};
const contentType = CONTENT_TYPES[extname(localFile).toLowerCase()] ?? "application/octet-stream";

const { client, bucket } = makeS3();
const body = await readFile(localFile);
await client.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: body, ContentType: contentType }));
console.log(`uploaded ${localFile} (${(body.length / 1024 / 1024).toFixed(2)} MB, ${contentType}) -> ${key}`);
console.log(`serve at: /cdn/${key}`);
