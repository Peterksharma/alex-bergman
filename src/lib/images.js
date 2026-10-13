import "server-only";
import sharp from "sharp";

/** Longest edge we store. Larger originals are downscaled; smaller kept. */
export const MAX_IMAGE_WIDTH = 2000;

/**
 * Normalise an uploaded image for the gallery.
 *
 * Postconditions:
 *   - output is JPEG (mozjpeg, quality 82), width <= MAX_IMAGE_WIDTH,
 *     aspect ratio preserved, EXIF orientation applied and metadata
 *     stripped (no location data leaks from client photos);
 *   - returned `width`/`height` are the dimensions of the bytes returned,
 *     so the DB row and the object never disagree.
 *
 * Precondition: `input` is a Buffer sharp can decode (JPEG/PNG/WebP/HEIC
 * where libvips supports it). Throws otherwise.
 *
 * @param {Buffer} input
 * @returns {Promise<{buffer: Buffer, width: number, height: number, contentType: "image/jpeg"}>}
 */
export async function normalizeImage(input) {
  const { data, info } = await sharp(input)
    .rotate()
    .resize({ width: MAX_IMAGE_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer({ resolveWithObject: true });
  return { buffer: data, width: info.width, height: info.height, contentType: "image/jpeg" };
}
