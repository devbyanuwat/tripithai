# Prompt — มหานรก ๘ + HellTimeline component

> Paste into Codex.

Same project rules as before. Add a new dharma article about the **เวลาในนรก** (time in the eight great hells) compared to human years,
plus a small React infographic that visualises the multiplier.

## Hard rules

- **NO EMOJI anywhere.** MDX text, JSX, comments, commit message. Use plain words or Lucide icons.
- **NO fabricated sutta references.** Refs stay at "เล่ม X" level. Hell time numbers come from อรรถกถา (Visuddhimagga / Lokapaññatti), NOT direct Sutta — tag every numeric claim with `(ตามอรรถกถา)` or `(ตามวิสุทธิมรรค)`.
- Thai numerals (๐-๙). Pali in `_italic_`.

## Deliverable 1 — MDX wiki page

Create `content/suttanta/anguttara/niraya.mdx`.

Frontmatter:

```yaml
---
title: "มหานรก ๘ และเวลาในนรก"
ref: "เทวทูตสูตร, นรกสูตร อังคุตตรนิกาย เล่มที่ ๒๐, ๒๒"
nikaya: "suttanta"
collection: "anguttara"
description: "มหานรก ๘ ขุม เหตุที่นำพาไปเกิด เวลาเทียบกับปีมนุษย์ และทางพ้น"
tags: ["นรก", "อบายภูมิ", "กรรม", "ภพภูมิ", "เวลาในจักรวาล"]
related: ["suttanta/anguttara/bhumi", "suttanta/anguttara/kappa", "suttanta/majjhima/kamma-vibhanga"]
---
```

Body 160-220 บรรทัด, structure:

```
{intro — niraya คืออะไร ตำราเรียก, เป็นภพหนึ่งใน ๓๑ ภูมิ}

## มหานรก ๘ — โครงร่าง
H3 ของแต่ละนรก พร้อมความหมายชื่อสั้น ๆ:
1. สัญชีวนรก
2. กาฬสุตตนรก
3. สังฆาฏนรก
4. โรรุวนรก
5. มหาโรรุวนรก
6. ตาปนรก
7. มหาตาปนรก
8. อเวจีนรก
สั้น ๆ ว่าแต่ละนรกมีโทษคืออะไรตามอุปมาในตำรา

## เวลาในนรกเทียบกับปีมนุษย์
อธิบาย pattern: ๑ วันในนรกบนสุด = ๙ ล้านปีมนุษย์ (สัญชีวนรก ตามอรรถกถา), อายุในนรกนับเป็น "ปีนรก" ต่ออีกหลายร้อย/พันปี เพิ่มเป็นทวีคูณตามชั้น
ตารางเปรียบเทียบ:

| ลำดับ | นรก | ๑ วันนรก = ปีมนุษย์ | อายุในนรก (ปีนรก) |
|------|------|--------------------|--------------------|
| ๑ | สัญชีวนรก | ๙,๐๐๐,๐๐๐ | ๕๐๐ |
| ๒ | กาฬสุตตนรก | ๓๖,๐๐๐,๐๐๐ | ๑,๐๐๐ |
| ๓ | สังฆาฏนรก | ๑๔๔,๐๐๐,๐๐๐ | ๒,๐๐๐ |
| ๔ | โรรุวนรก | ๕๗๖,๐๐๐,๐๐๐ | ๔,๐๐๐ |
| ๕ | มหาโรรุวนรก | ๒,๓๐๔,๐๐๐,๐๐๐ | ๘,๐๐๐ |
| ๖ | ตาปนรก | ๙,๒๑๖,๐๐๐,๐๐๐ | ๑๖,๐๐๐ |
| ๗ | มหาตาปนรก | — (ครึ่งอันตรกัป) | — |
| ๘ | อเวจีนรก | — (๑ อันตรกัป) | — |

ใต้ตารางอธิบายว่าเลขเหล่านี้มาจากอรรถกถา ไม่ใช่จากพระสูตรตรง

## <HellTimeline />   ← embed component here

## เหตุที่นำไปเกิดในแต่ละนรก
ตามแนวอรรถกถา/เทวทูตสูตร — โดยทั่วไปคือ "อกุศลกรรมหนัก" (พฺยาปาทกรรม) ที่จงใจ ทำสำเร็จ ไม่สำนึก
แต่ละนรกผูกกับลักษณะกรรม เช่น
- สัญชีวนรก — ฆ่าสัตว์
- กาฬสุตตนรก — ผูกอาฆาต ก่อทุกข์ผู้บริสุทธิ์
- สังฆาฏนรก — เบียดเบียนผู้อ่อนแอ
- ฯลฯ
(ระบุเชิงสรุป ไม่ระบุข้อตำราเฉพาะข้อ)

## ทางพ้นจากการเกิดในนรก
- ละ ปาณาติบาต อทินนาทาน กาเมสุมิจฉาจาร มุสาวาท สุราเมรย์
- รักษาศีล ๕ เป็นพื้นฐาน
- เจริญหิริ-โอตตัปปะ
- link ไป [ศีล ๕](/wiki/vinaya/sila), [หิริ-โอตตัปปะ](/wiki/suttanta/anguttara/hiri-ottappa), [กรรม-วิบาก](/wiki/suttanta/majjhima/kamma-vibhanga)

## หมายเหตุเชิงวิชาการ
- ตัวเลขเวลานรกอ้างอิงอรรถกถา/วิสุทธิมรรค ไม่ใช่พุทธพจน์ตรง
- บางคัมภีร์ระบุตัวคูณต่าง ใช้ค่าที่นิยมในสำนัก Theravāda เป็นหลัก
- มหาตาปนรก-อเวจีนรกใช้หน่วย "อันตรกัป" จึงเทียบกับ [กัป](/wiki/suttanta/anguttara/kappa)
```

## Deliverable 2 — React component

Create `components/wiki/HellTimeline.tsx`.

- **Client component** (`'use client'`)
- Pure SVG/Tailwind. NO three.js, NO external libs.
- Visual concept: a horizontal exponential ladder OR vertical bars showing each of ๘ นรก, with its "๑ วัน = X ปีมนุษย์" multiplier
- Each row clickable/hoverable to highlight that row
- Use **log scale** for the bars (linear would make สัญชีวนรก invisible against อเวจี)
- Bottom row(s) for ตาปนรก/อเวจี mark explicitly "= อันตรกัป" since they're outside the numeric scale
- Brand amber/stone palette, full-width 16:9 or 4:3
- Numbers in Thai numerals
- Below the SVG, `<figcaption>` reminds reader:
  "ตัวเลขเปรียบเทียบจากอรรถกถา/วิสุทธิมรรค — ไม่ใช่พุทธพจน์ตรง"
- Reduced-motion: skip any transitions

## Deliverable 3 — wire into MDX renderer

Edit `app/wiki/[...slug]/page.tsx`:

- Import `HellTimeline` next to existing `KappaTimeline` import
- Add to MDXRemote `components` prop:

```tsx
components={{ KappaTimeline, HellTimeline }}
```

## Validation gates

1. `npm run build` exit 0
2. `wc -l content/suttanta/anguttara/niraya.mdx` shows 160-220
3. `grep -c "^## " content/suttanta/anguttara/niraya.mdx` ≥ 5
4. `curl -s -o /dev/null -w '%{http_code}' http://localhost:3001/wiki/suttanta/anguttara/niraya` returns 200
5. HellTimeline renders inside the article (check for unique marker e.g. `data-hell-timeline` or class `hell-timeline` in HTML output)
6. NO emoji in any file: `perl -CSD -ne 'print if /[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]/' <files>` → 0 lines
7. `git status --short` shows: 1 modified (page.tsx), 2 new (.mdx + component)

## Out of scope

- Don't touch taxonomy.ts, don't add to KNOWN_FOLDERS
- Don't introduce new dependencies
- Don't modify other wiki pages or content/*.mdx

## When done

Print:
- Final tree of changed files
- 5-bullet summary
- Confirmation NO emoji in any deliverable
