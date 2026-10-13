#!/usr/bin/env node
/*
 * hash-password.mjs — produce the bcrypt hash for ADMIN_PASSWORD_HASH.
 *
 *   node scripts/hash-password.mjs 'the password'
 *   node scripts/hash-password.mjs            # prompts, input hidden
 *
 * Cost factor 12: ~250ms per verification on a laptop, which is slow
 * enough to blunt online guessing and fast enough for a login form.
 * Paste the printed hash into your .env.local / Vercel env as-is; it
 * contains `$` characters, so quote it if your shell expands them.
 */
import bcrypt from "bcryptjs";
import { createInterface } from "node:readline";

async function readHidden(prompt) {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    process.stdout.write(prompt);
    rl._writeToOutput = () => {}; // suppress echo
    rl.question("", (answer) => {
      process.stdout.write("\n");
      rl.close();
      resolve(answer);
    });
  });
}

const password = process.argv[2] ?? (await readHidden("Password: "));
if (!password || password.length < 8) {
  console.error("Password must be at least 8 characters.");
  process.exit(1);
}
console.log(await bcrypt.hash(password, 12));
