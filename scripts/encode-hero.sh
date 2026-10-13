#!/usr/bin/env bash
#
# encode-hero.sh — build the silent, seamlessly looping hero video.
#
# ─────────────────────────────────────────────────────────────────────
# The "overlap crossfade" loop
# ─────────────────────────────────────────────────────────────────────
# Let T be the loop length and D the crossfade length (seconds).
#
#   main    = SRC[D .. T+D]   (length T)
#   overlay = SRC[0 .. D]     (length D)
#
# The last D seconds of `main` are crossfaded into `overlay` with
# xfade(offset = T-D, duration = D). Why this loops seamlessly:
#
#   * The output's first frame is main[0]   = SRC[D].
#   * During the fade the picture converges to overlay's last frame,
#     which is SRC[D - 1/fps] — i.e. the frame immediately before
#     SRC[D].
#
# So output.last ≈ output.first (one source frame apart, blended with
# opacity ≈ 1), and when the player jumps from the last frame back to
# the first there is no visible cut. Output length = T + D - D = T.
#
# The loop is rendered ONCE into a near-lossless mezzanine, then every
# delivery variant is encoded from that mezzanine, so the xfade filter
# runs a single time and all variants are frame-identical.
#
# ─────────────────────────────────────────────────────────────────────
# Usage
# ─────────────────────────────────────────────────────────────────────
#   SRC=/path/to/raw.mov [T=15] [D=1] [OUT=public/assets/hero] \
#   [WORK=/tmp/dir] scripts/encode-hero.sh
#
# Preconditions: ffmpeg/ffprobe on PATH (or FFMPEG/FFPROBE set) with
# libx264 and libvpx-vp9. SRC must be at least T+D seconds long.
#
# Postconditions (all silent, yuv420p, faststart, exactly T seconds):
#   OUT/hero-loop-1080.mp4   libx264, ≤ 3.5 MB
#   OUT/hero-loop-1080.webm  libvpx-vp9, ≤ 3.5 MB
#   OUT/hero-loop-720.mp4    libx264 at 1280×720, ≤ 1.5 MB
#   OUT/hero-poster.jpg      first frame of the loop, ≤ 250 KB
#
# Idempotent: re-running overwrites the outputs with identical results
# for the same inputs and parameters. The x264 budgets are met by a
# galloping CRF search (higher CRF ⇒ smaller file, monotone); the VP9
# budget by two-pass constrained quality at a budget-derived bitrate.
# ─────────────────────────────────────────────────────────────────────
set -euo pipefail

SRC="${SRC:?set SRC to the raw source clip}"
T="${T:-15}"            # loop length, seconds
D="${D:-1}"             # crossfade length, seconds
OUT="${OUT:-public/assets/hero}"
WORK="${WORK:-$(mktemp -d -t hero-encode)}"
FFMPEG="${FFMPEG:-ffmpeg}"
FFPROBE="${FFPROBE:-ffprobe}"

BUDGET_1080_MP4=$((3500 * 1024))
BUDGET_1080_WEBM=$((3500 * 1024))
BUDGET_720_MP4=$((1500 * 1024))
BUDGET_POSTER=$((250 * 1024))

mkdir -p "$OUT" "$WORK"
MEZZ="$WORK/hero-loop-mezz.mp4"

size_of() { stat -f %z "$1" 2>/dev/null || stat -c %s "$1"; }
mb()      { awk -v b="$1" 'BEGIN { printf "%.2f MB", b / 1048576 }'; }
log()     { printf '\n== %s\n' "$*" >&2; }

# ── 1. Render the loop once, near-losslessly ─────────────────────────
log "Rendering ${T}s loop with ${D}s overlap crossfade → mezzanine"
"$FFMPEG" -hide_banner -loglevel error -y \
  -ss "$D" -t "$T" -i "$SRC" \
  -t "$D" -i "$SRC" \
  -an \
  -filter_complex "[0:v][1:v]xfade=transition=fade:duration=${D}:offset=$((T - D)),format=yuv420p[v]" \
  -map "[v]" \
  -c:v libx264 -preset fast -crf 10 -g 30 \
  "$MEZZ"

# ── 2. Verify the mezzanine ──────────────────────────────────────────
FPS_RATIONAL=$("$FFPROBE" -v error -select_streams v:0 \
  -show_entries stream=r_frame_rate -of csv=p=0 "$MEZZ")
DURATION=$("$FFPROBE" -v error -show_entries format=duration -of csv=p=0 "$MEZZ")
NUM_AUDIO=$("$FFPROBE" -v error -select_streams a -show_entries stream=index -of csv=p=0 "$MEZZ" | wc -l | tr -d ' ')
FRAME_S=$(awk -v r="$FPS_RATIONAL" 'BEGIN { split(r, p, "/"); printf "%.6f", p[2] / p[1] }')

log "Mezzanine: duration=${DURATION}s fps=${FPS_RATIONAL} audio streams=${NUM_AUDIO}"
awk -v d="$DURATION" -v t="$T" -v f="$FRAME_S" 'BEGIN { exit !((d - t) <= f && (t - d) <= f) }' \
  || { echo "Duration ${DURATION}s is not ${T}s ± one frame" >&2; exit 1; }
[ "$NUM_AUDIO" -eq 0 ] || { echo "Unexpected audio stream in output" >&2; exit 1; }

# Loop-seam sanity check. The seam is the jump from the last output
# frame back to the first. By construction those are one SOURCE frame
# apart, so the seam should be no larger a step than any ordinary
# frame-to-frame step. We therefore compare
#     SSIM(first, last)    — the seam
#     SSIM(first, second)  — an ordinary step at the same spot
# and expect them to agree. (Absolute SSIM can be low when the camera
# is moving — SSIM punishes sub-block shifts on foliage — so only the
# RATIO is meaningful, not the raw value.)
"$FFMPEG" -hide_banner -loglevel error -y -i "$MEZZ" \
  -vf "select=eq(n\,0)" -frames:v 1 "$WORK/frame-first.png"
"$FFMPEG" -hide_banner -loglevel error -y -i "$MEZZ" \
  -vf "select=eq(n\,1)" -frames:v 1 "$WORK/frame-second.png"
"$FFMPEG" -hide_banner -loglevel error -y -sseof -0.04 -i "$MEZZ" \
  -frames:v 1 -update 1 "$WORK/frame-last.png"
ssim_between() {
  "$FFMPEG" -hide_banner -loglevel info -i "$1" -i "$2" -lavfi ssim -f null - 2>&1 \
    | sed -n 's/.*All:\([0-9.]*\).*/\1/p' | tail -1
}
SEAM_SSIM=$(ssim_between "$WORK/frame-first.png" "$WORK/frame-last.png")
STEP_SSIM=$(ssim_between "$WORK/frame-first.png" "$WORK/frame-second.png")
log "Loop seam: SSIM(first,last)=${SEAM_SSIM} vs ordinary step SSIM(first,second)=${STEP_SSIM}  (frames in $WORK)"
awk -v s="$SEAM_SSIM" -v n="$STEP_SSIM" 'BEGIN { exit !(s >= 0.9 * n) }' \
  || { echo "Seam is markedly worse than an ordinary frame step — loop is not seamless" >&2; exit 1; }

# ── 3. Encode each variant to its byte budget ────────────────────────
# encode_x264_under_budget OUTFILE BUDGET_BYTES START_CRF MAX_CRF ENCODER_ARGS...
#
# Galloping CRF search. Size is a decreasing function of CRF, shrinking
# by roughly 12–15 % per step on this kind of content. From the current
# (crf, size) we *estimate* how many steps reach the budget, assuming an
# optimistic 25 % shrink per step. Because the real shrink is smaller,
# the estimate never overshoots the budget, so once we land under it
# we hold the highest-quality CRF that fits — the same answer a plain
# +1 walk would reach, in far fewer encodes.
encode_x264_under_budget() {
  local out="$1" budget="$2" crf="$3" max_crf="$4"; shift 4
  local size jump
  while :; do
    "$FFMPEG" -hide_banner -loglevel error -y -i "$MEZZ" -an \
      "$@" -crf "$crf" -pix_fmt yuv420p -movflags +faststart "$out"
    size=$(size_of "$out")
    if [ "$size" -le "$budget" ]; then
      printf '   %s  crf=%s  %s\n' "$out" "$crf" "$(mb "$size")" >&2
      return 0
    fi
    [ "$crf" -lt "$max_crf" ] || { echo "Could not get $out under budget (crf=$crf, $(mb "$size"))" >&2; return 1; }
    jump=$(awk -v s="$size" -v b="$budget" 'BEGIN { j = int(log(s / b) / log(1.25)); print (j < 1 ? 1 : j) }')
    printf '   %s  crf=%s  %s > budget, crf += %s\n' "$out" "$crf" "$(mb "$size")" "$jump" >&2
    crf=$((crf + jump)); [ "$crf" -le "$max_crf" ] || crf=$max_crf
  done
}

# encode_vp9_under_budget OUTFILE BUDGET_BYTES CRF ENCODER_ARGS...
#
# libvpx-vp9 in pure constant-quality mode (-b:v 0) produces 2–3× the
# bytes of x264 on noisy aerial footage, and each 1080p pass is slow, so
# a CRF walk is impractical. Instead we use VP9's two-pass *constrained
# quality* mode: -crf is a quality ceiling and -b:v is the average
# bitrate the rate controller must hit, which we derive directly from
# the byte budget (with 8 % headroom for container overhead and rate-
# control drift). If the result still exceeds the budget, scale the
# target by the observed overshoot and retry.
encode_vp9_under_budget() {
  local out="$1" budget="$2" crf="$3"; shift 3
  local dur kbps size
  dur=$("$FFPROBE" -v error -show_entries format=duration -of csv=p=0 "$MEZZ")
  kbps=$(awk -v b="$budget" -v d="$dur" 'BEGIN { printf "%d", 0.92 * b * 8 / d / 1000 }')
  while :; do
    "$FFMPEG" -hide_banner -loglevel error -y -i "$MEZZ" -an "$@" \
      -b:v "${kbps}k" -crf "$crf" -pass 1 -passlogfile "$WORK/vp9-2pass" -f null /dev/null
    "$FFMPEG" -hide_banner -loglevel error -y -i "$MEZZ" -an "$@" \
      -b:v "${kbps}k" -crf "$crf" -pass 2 -passlogfile "$WORK/vp9-2pass" \
      -pix_fmt yuv420p "$out"
    size=$(size_of "$out")
    if [ "$size" -le "$budget" ]; then
      printf '   %s  crf=%s b:v=%sk  %s\n' "$out" "$crf" "$kbps" "$(mb "$size")" >&2
      return 0
    fi
    printf '   %s  b:v=%sk  %s > budget, lowering target\n' "$out" "$kbps" "$(mb "$size")" >&2
    kbps=$(awk -v k="$kbps" -v s="$size" -v b="$budget" 'BEGIN { printf "%d", k * b / s * 0.95 }')
    [ "$kbps" -ge 300 ] || { echo "Could not get $out under budget" >&2; return 1; }
  done
}

log "Encoding delivery variants"
encode_x264_under_budget "$OUT/hero-loop-1080.mp4" "$BUDGET_1080_MP4" 26 40 \
  -c:v libx264 -preset slow -profile:v high -level 4.1 -g 60

encode_vp9_under_budget "$OUT/hero-loop-1080.webm" "$BUDGET_1080_WEBM" 34 \
  -c:v libvpx-vp9 -row-mt 1 -deadline good -cpu-used 2 -g 60

encode_x264_under_budget "$OUT/hero-loop-720.mp4" "$BUDGET_720_MP4" 27 40 \
  -vf "scale=1280:720:flags=lanczos" \
  -c:v libx264 -preset slow -profile:v high -level 4.1 -g 60

# ── 4. Poster: the loop's first frame as JPEG ────────────────────────
# ffmpeg's -q:v for mjpeg is 2 (best) … 31; 4 ≈ JPEG quality 80.
q=4
while :; do
  "$FFMPEG" -hide_banner -loglevel error -y -i "$MEZZ" \
    -vf "select=eq(n\,0)" -frames:v 1 -q:v "$q" "$OUT/hero-poster.jpg"
  size=$(size_of "$OUT/hero-poster.jpg")
  [ "$size" -le "$BUDGET_POSTER" ] && break
  [ "$q" -lt 20 ] || { echo "Poster could not be brought under budget" >&2; exit 1; }
  q=$((q + 1))
done
printf '   %s  q=%s  %s\n' "$OUT/hero-poster.jpg" "$q" "$(mb "$size")" >&2

# ── 5. Summary ───────────────────────────────────────────────────────
log "Outputs"
for f in "$OUT"/hero-loop-1080.mp4 "$OUT"/hero-loop-1080.webm "$OUT"/hero-loop-720.mp4; do
  printf '   %-36s %10s  ' "$f" "$(mb "$(size_of "$f")")" >&2
  "$FFPROBE" -v error -show_entries format=duration:stream=codec_type,codec_name,width,height \
    -of csv=p=0 "$f" | tr '\n' ' ' >&2
  echo >&2
done
printf '   %-36s %10s  ' "$OUT/hero-poster.jpg" "$(mb "$(size_of "$OUT/hero-poster.jpg")")" >&2
"$FFPROBE" -v error -show_entries stream=width,height -of csv=p=0 "$OUT/hero-poster.jpg" >&2
echo "   seam SSIM(first,last) = ${SEAM_SSIM}; ordinary step SSIM(first,second) = ${STEP_SSIM}" >&2
