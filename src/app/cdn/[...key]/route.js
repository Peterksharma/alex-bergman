import { getObject } from "@/lib/storage";
import { isValidMediaKey } from "@/lib/media";

/**
 * GET /cdn/<bucket key>
 *
 * Railway buckets are private, so this handler is the public face of the
 * arbergman-media bucket. It streams the object through and tags the
 * response `public, max-age=31536000, immutable`: Vercel's edge cache keeps
 * a copy per region, and browsers keep theirs for a year. Keys are
 * content-addressed in practice (an edit uploads a new key and deletes
 * the old one; nothing is ever overwritten in place), so "immutable" is a
 * true statement, not an optimisation gamble.
 *
 * Only keys that pass `isValidMediaKey` are looked up, which rules out
 * traversal and anything outside the key alphabet before the SDK is
 * involved. Unknown keys 404.
 */
export async function GET(_request, { params }) {
  const { key: segments } = await params;
  const key = (segments ?? []).map((s) => decodeURIComponent(s)).join("/");
  if (!isValidMediaKey(key)) {
    return new Response("Bad key", { status: 400 });
  }

  const object = await getObject(key);
  if (!object) {
    return new Response("Not found", {
      status: 404,
      headers: { "Cache-Control": "public, max-age=60" },
    });
  }

  const headers = new Headers({
    "Content-Type": object.contentType,
    "Cache-Control": "public, max-age=31536000, immutable",
    "Accept-Ranges": "bytes",
  });
  if (object.contentLength != null) headers.set("Content-Length", String(object.contentLength));
  if (object.etag) headers.set("ETag", object.etag);

  // The SDK body is a Node Readable in the Node runtime; Response accepts a
  // web ReadableStream, which `transformToWebStream` provides without
  // buffering the whole object in memory.
  const body = typeof object.body.transformToWebStream === "function"
    ? object.body.transformToWebStream()
    : object.body;

  return new Response(body, { status: 200, headers });
}
