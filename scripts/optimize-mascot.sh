#!/usr/bin/env bash
# Optimize raw Meshy GLB → web-ready GLB
# Usage: ./scripts/optimize-mascot.sh

set -e

IN="public/mascot/dhamma-raw.glb"
OUT="public/mascot/dhamma.glb"
TMP_DIR="public/mascot/.tmp"

if [ ! -f "$IN" ]; then
  echo "❌ ไม่พบไฟล์ $IN"
  echo "   วาง textured GLB จาก Meshy ไว้ที่นั่นก่อน"
  exit 1
fi

mkdir -p "$TMP_DIR"
SIZE_BEFORE=$(du -h "$IN" | cut -f1)
echo "📦 Input: $IN ($SIZE_BEFORE)"

echo ""
echo "🔧 Step 1/4 — Prune + Dedupe (ล้างของไม่ใช้)"
npx --yes @gltf-transform/cli prune "$IN" "$TMP_DIR/step1.glb" --quiet
npx --yes @gltf-transform/cli dedup "$TMP_DIR/step1.glb" "$TMP_DIR/step2.glb" --quiet

echo "🔧 Step 2/4 — Simplify mesh (decimate ลด triangle)"
# ratio 0.05 = เหลือ 5% ของ faces เดิม → 378K → ~19K
npx --yes @gltf-transform/cli simplify "$TMP_DIR/step2.glb" "$TMP_DIR/step3.glb" --ratio 0.05 --error 0.001

echo "🔧 Step 3/4 — Compress textures (WebP)"
# Note: KTX2 ดีกว่าแต่ต้องลง toktx; WebP ก็ลดได้เยอะแล้ว
npx --yes @gltf-transform/cli webp "$TMP_DIR/step3.glb" "$TMP_DIR/step4.glb" --quality 80

echo "🔧 Step 4/4 — Meshopt + Draco compression"
npx --yes @gltf-transform/cli meshopt "$TMP_DIR/step4.glb" "$OUT" --level medium

SIZE_AFTER=$(du -h "$OUT" | cut -f1)
echo ""
echo "✅ Done!"
echo "   Before: $SIZE_BEFORE"
echo "   After:  $SIZE_AFTER"
echo "   Output: $OUT"

# Cleanup
rm -rf "$TMP_DIR"
