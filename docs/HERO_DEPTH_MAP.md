# สร้าง depth map สำหรับ Hero (Bodhi)

ตอนนี้ Hero ใช้ WebGL shader กับภาพ `public/hero/bodhi.jpg` แต่ depth ยังเป็น fallback (ใช้ความสว่างของภาพแทน — ผลออกมาเลื่อนนิดเดียว)

ถ้าจะให้ depth ลึกจริง — สร้างไฟล์ `public/hero/bodhi-depth.png` (grayscale, ขาว = ใกล้กล้อง, ดำ = ไกล)

## วิธีสร้าง (ฟรี, ไม่ต้อง install อะไร)

### Option A — Depth Anything v2 (แนะนำ — ความละเอียดสูงสุด)

1. ไป https://huggingface.co/spaces/depth-anything/Depth-Anything-V2
2. Upload `public/hero/bodhi.jpg`
3. รอ ~10 วินาที
4. Download depth output
5. ตรวจว่าเป็น grayscale PNG (ขาว/ดำ); ถ้าได้สี viridis ให้แปลงเป็น grayscale ใน Preview app
6. Save ที่ `public/hero/bodhi-depth.png`

### Option B — MiDaS

1. https://huggingface.co/spaces/pytorch/MiDaS
2. Upload + download
3. Save ตำแหน่งเดียวกัน

### Option C — Local (ถ้ามี Python)

```bash
pip install transformers torch pillow
python -c "
from transformers import pipeline
from PIL import Image
pipe = pipeline(task='depth-estimation', model='depth-anything/Depth-Anything-V2-Small-hf')
depth = pipe(Image.open('public/hero/bodhi.jpg'))['depth']
depth.save('public/hero/bodhi-depth.png')
"
```

## หลัง save ไฟล์

ไม่ต้องแก้โค้ดเพิ่ม — Component ของ Hero จะ auto-detect:
- ถ้ามีไฟล์ `public/hero/bodhi-depth.png` → ใช้ displacement 0.45 (3D ลึกจริง)
- ถ้าไม่มี → fallback 0.08 (ขยับนิดเดียวจาก image brightness)

Build + push → Vercel จะ deploy ใหม่อัตโนมัติ

## Tuning ความลึก

แก้ `components/hero/BodhiScene.tsx` ที่:
- `uDisplacement: { value: depthMap ? 0.45 : 0.08 }` — ปรับ 0.45 ให้สูง = ลึกกว่า (เช่น 0.6, 0.8)
- `meshRef.current.rotation.y = smoothMouse.current.x * 0.08` — ปรับ 0.08 ให้สูง = มือไวกว่า
- `<planeGeometry args={[..., 200, 120]} />` — ปรับ subdivisions ให้สูง = displacement ละเอียดกว่า (แต่ GPU โหลดมากขึ้น)
