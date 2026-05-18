# Prompt — อจินไตย ๔ + Acinteyya4 component

> Paste into Codex.

Add a new dharma article on **อจินไตย ๔** (the four unconjecturables) with an embedded SVG component that visualises the four spheres and their cross-links to existing wiki articles.

## Hard rules

- **NO EMOJI anywhere.** MDX text, JSX, comments, commit message.
- **NO fabricated sutta references.** Refs at "เล่ม X" level only.
- Thai numerals (๐-๙). Pali in `_italic_`.

## Deliverable 1 — MDX wiki page

Create `content/suttanta/anguttara/acinteyya.mdx`.

Frontmatter:

```yaml
---
title: "อจินไตย ๔ — สิ่งที่ไม่ควรคิด"
ref: "อจินตัยสูตร อังคุตตรนิกาย จตุกกนิบาต เล่มที่ ๒๑"
nikaya: "suttanta"
collection: "anguttara"
description: "วิสัย ๔ อย่างที่พระพุทธองค์ตรัสว่ายิ่งคิดยิ่งคับแค้น — พุทธวิสัย ฌานวิสัย กรรมวิบาก โลกจินตา"
tags: ["อจินไตย", "พุทธวิสัย", "ฌาน", "กรรมวิบาก", "โลกจินตา", "หลักธรรมหลัก"]
related: ["suttanta/majjhima/kamma-vibhanga", "suttanta/anguttara/kappa", "suttanta/anguttara/niraya"]
---
```

Body 130-180 บรรทัด, structure:

```
{intro paragraph - อจินไตยคืออะไร พระพุทธองค์ตรัสว่าทำไม}

> _จตฺตาริ อิมานิ ภิกฺขเว อจินฺเตยฺยานิ_ ฯลฯ
{อ้างพระพุทธพจน์โดยย่อ — บอกว่าผู้พยายามคิดจะถึงอุนมาทะ (วิกลจริต) หรือวิฆาตะ (คับแค้นใจ)}

## ๔ อจินไตย

### ๑. พุทธวิสัย — _buddhavisaya_
ขอบเขตของพระพุทธญาณ ความรู้ที่พระพุทธเจ้าทรงรู้แจ้งทั้งหมด ปุถุชนคิดตามไม่ทัน เช่น "พระพุทธเจ้าทรงเห็นอะไรได้ขนาดไหน"

### ๒. ฌานวิสัย — _jhānavisaya_
วิสัยของผู้ได้ฌาน อภิญญา ปาฏิหาริย์ คนที่ยังไม่ได้ฌานคิดเดาเอาจากภายนอกไม่ได้

### ๓. กรรมวิบาก — _kammavipāka_
การออกผลของกรรมในรายละเอียด ใครทำอะไรเมื่อไรแล้วจะออกผลเป็นอะไรเมื่อไร เห็นเฉพาะ "พระพุทธเจ้า" เท่านั้น
ปุถุชนเห็นได้แค่หลักการ (ทำดีได้ดี ทำชั่วได้ชั่ว) — รายละเอียดเชิง "วันเวลา ที่ตั้ง" คิดไม่ได้
link ไป [กรรม-วิบาก](/wiki/suttanta/majjhima/kamma-vibhanga)

### ๔. โลกจินตา — _lokacintā_
ขนาด ที่มา และความเป็นไปของจักรวาล/โลก เช่น "จักรวาลใหญ่แค่ไหน" "เริ่มเมื่อใด" — ไม่ใช่เรื่องที่คิดสรุปได้ด้วยปุถุชน
link ไป [กัป กับ อสงไขย](/wiki/suttanta/anguttara/kappa), [มหานรก ๘](/wiki/suttanta/anguttara/niraya) — แม้ตำราจะแสดงตัวเลข แต่นั่นคือ "อุปมา" ไม่ใช่สิ่งที่คิดเอาเอง

## <Acinteyya4 />   ← embed component here

## ทำไมพระพุทธองค์ตรัสห้ามคิด
- ไม่ใช่ห้าม "ความรู้" แต่ห้าม "การพยายามสรุปคำตอบเด็ดขาด" ที่เกินวิสัยปัญญาปุถุชน
- ผู้คิดมากจะถึงสองอย่าง: **อุนมาทะ** (วิกลจริต) หรือ **วิฆาตะ** (เครียดคับแค้นใจ)
- ไม่ใช่ "ไม่ให้สงสัย" แต่ "ให้เปลี่ยนคำถามไปสู่ทุกข์-ปฏิบัติเพื่อพ้นทุกข์" แทน

## ความสัมพันธ์กับสติปัฏฐาน ๔ และอริยสัจ
- พระพุทธองค์ทรงเทียบเสมือนคนถูกยิงด้วยลูกศรอาบยาพิษ ที่ไม่ยอมรับการรักษาก่อนรู้ทุกเรื่องว่าใครยิง ทำด้วยอะไร — เปรียบกับคนที่อยากรู้ "โลกเที่ยงหรือไม่เที่ยง" "อาตมันมีหรือไม่มี" ก่อนปฏิบัติ (จากจูฬมาลุงกยสูตร — มิใช่ acinteyya sutta โดยตรง แต่เป็น cross-reference เชิงตรรกะ)
- คำถามที่ "ตอบได้และมีประโยชน์" คืออริยสัจ ๔ ไม่ใช่อจินไตย

## หมายเหตุเชิงวิชาการ
- พระสูตรนี้อยู่ในจตุกกนิบาต อังคุตตรนิกาย เล่ม ๒๑ — ตรงพระไตรปิฎก
- บางสำนักขยายความเชิงปรัชญาเพิ่มเติม แต่หลักดั้งเดิมมี ๔ ข้อตรงตามพระสูตร
```

## Deliverable 2 — React component

Create `components/wiki/Acinteyya4.tsx`.

- **Client component** (`'use client'`)
- Pure SVG + Tailwind. NO external libs.
- Visual concept: **2x2 grid** (or compass-like cross) of ๔ วงกลม/การ์ด each representing one acinteyya:
  - Top-left: พุทธวิสัย
  - Top-right: ฌานวิสัย
  - Bottom-left: กรรมวิบาก  → link to /wiki/suttanta/majjhima/kamma-vibhanga
  - Bottom-right: โลกจินตา  → link to /wiki/suttanta/anguttara/kappa AND /wiki/suttanta/anguttara/niraya
- ใจกลาง diagram = ข้อความสั้น "อย่าคิด → ปฏิบัติแทน" หรือ "อริยสัจ ๔"
- Each card hoverable/clickable (highlighted) showing short caption
- Cards with relevant cross-links should be `<a>` tags
- Brand amber/stone palette
- Mobile responsive (stack to single column on narrow widths)
- Reduced-motion respected
- figcaption underneath: brief reminder ของ message: "พระพุทธองค์ห้ามไม่ใช่เพื่อปิดกั้นปัญญา แต่เพื่อรักษาจิตให้ตั้งมั่นในทางพ้นทุกข์"
- Marker for verification: `data-acinteyya="4"` or class `acinteyya-4`

## Deliverable 3 — wire into MDX renderer

Edit `app/wiki/[...slug]/page.tsx`:

- Import `Acinteyya4` next to existing imports
- Add to MDXRemote `components` prop:

```tsx
components={{ KappaTimeline, HellTimeline, Acinteyya4 }}
```

## Validation gates

1. `npm run build` exit 0
2. `wc -l content/suttanta/anguttara/acinteyya.mdx` shows 130-180
3. `grep -c "^## " content/suttanta/anguttara/acinteyya.mdx` ≥ 4
4. `curl -s -o /dev/null -w '%{http_code}' http://localhost:3001/wiki/suttanta/anguttara/acinteyya` returns 200
5. Acinteyya4 component renders (check for marker `acinteyya-4` or `data-acinteyya` in HTML output)
6. NO emoji: `perl -CSD -ne 'print if /[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]/' <files>` → 0 lines
7. `git status --short` shows 1 modified (page.tsx) + 2 new (mdx + component)

## Out of scope

- Don't change taxonomy.ts
- Don't introduce new dependencies
- Don't modify other wiki pages or content

## When done

Print:
- Final file tree
- 5-bullet summary
- Confirmation NO emoji anywhere
