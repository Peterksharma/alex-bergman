import "server-only";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";

/**
 * storage.js — server-side access to the Railway bucket (S3-compatible).
 *
 * Railway buckets use virtual-hosted-style URLs (bucket as subdomain of the
 * endpoint), which is the AWS SDK default, so no `forcePathStyle`.
 * The client is memoised on globalThis for the same reason as the DB pool:
 * one per process, surviving dev hot reloads.
 */
function createClient() {
  const endpoint = process.env.RAILWAY_BUCKET_ENDPOINT;
  const accessKeyId = process.env.RAILWAY_BUCKET_ACCESS_KEY_ID;
  const secretAccessKey = process.env.RAILWAY_BUCKET_SECRET_ACCESS_KEY;
  if (!endpoint || !accessKeyId || !secretAccessKey) {
    throw new Error("RAILWAY_BUCKET_* environment variables are not set");
  }
  return new S3Client({
    endpoint,
    region: process.env.RAILWAY_BUCKET_REGION || "auto",
    credentials: { accessKeyId, secretAccessKey },
  });
}

const s3 = globalThis.__arbS3 ?? createClient();
if (process.env.NODE_ENV !== "production") globalThis.__arbS3 = s3;

export const BUCKET = process.env.RAILWAY_BUCKET_NAME;

/** Upload bytes under `key`. Overwrites silently (S3 semantics). */
export async function putObject(key, body, contentType) {
  await s3.send(
    new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: body, ContentType: contentType })
  );
}

/**
 * Fetch an object. Returns `null` when the key does not exist so the
 * caller can 404 without parsing SDK error names.
 * @returns {Promise<{body: ReadableStream|import('stream').Readable, contentType: string, contentLength?: number, etag?: string}|null>}
 */
export async function getObject(key) {
  try {
    const res = await s3.send(new GetObjectCommand({ Bucket: BUCKET, Key: key }));
    return {
      body: res.Body,
      contentType: res.ContentType || "application/octet-stream",
      contentLength: res.ContentLength,
      etag: res.ETag,
    };
  } catch (err) {
    if (err?.name === "NoSuchKey" || err?.$metadata?.httpStatusCode === 404) return null;
    throw err;
  }
}

/** True if the key exists. Used by the migration script for idempotence. */
export async function objectExists(key) {
  try {
    await s3.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }));
    return true;
  } catch (err) {
    if (err?.name === "NotFound" || err?.$metadata?.httpStatusCode === 404) return false;
    throw err;
  }
}

/** Delete an object; deleting a missing key is a no-op in S3 and here. */
export async function deleteObject(key) {
  await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
}
