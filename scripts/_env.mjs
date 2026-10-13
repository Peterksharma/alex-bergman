/*
 * Shared bootstrap for the one-off scripts in this folder. They run under
 * plain Node (not Next), so `.env.local` must be loaded by hand, and the
 * app's `server-only` modules cannot be imported; each script builds the
 * small clients it needs from these helpers instead.
 */
import { config } from "dotenv";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import postgres from "postgres";
import { S3Client } from "@aws-sdk/client-s3";

export const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
config({ path: resolve(repoRoot, ".env.local"), quiet: true });
config({ path: resolve(repoRoot, ".env"), quiet: true });

export function requireEnv(name) {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing ${name}; copy env.example to .env.local and fill it in.`);
    process.exit(1);
  }
  return v;
}

export function makeSql() {
  return postgres(requireEnv("DATABASE_URL"), { max: 2, prepare: false });
}

export function makeS3() {
  return {
    client: new S3Client({
      endpoint: requireEnv("RAILWAY_BUCKET_ENDPOINT"),
      region: process.env.RAILWAY_BUCKET_REGION || "auto",
      credentials: {
        accessKeyId: requireEnv("RAILWAY_BUCKET_ACCESS_KEY_ID"),
        secretAccessKey: requireEnv("RAILWAY_BUCKET_SECRET_ACCESS_KEY"),
      },
    }),
    bucket: requireEnv("RAILWAY_BUCKET_NAME"),
  };
}
