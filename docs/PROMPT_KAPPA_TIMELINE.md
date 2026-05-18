# Prompt — kappa cosmic time infographic (MDX + embedded React)

> Paste into Codex.

You are adding a new article to the TripiThai dharma wiki that explains
**กัป (kappa)** and **อสงไขย (asaṅkheyya)** as cosmic time units, with
an embedded React component for a scale-comparison visual.

## Hard rules

- **NO EMOJI anywhere.** Not in MDX text, not in JSX, not in commit
  messages, not in comments. Use plain words or Lucide icons only.
- NO fabricated sutta references. Volumes/section numbers must be at
  the "เล่ม X" level only, never "ข้อ NN" unless you can quote it.
- All content in Thai with Pali in `_italic_` form. Thai numerals (๐-๙).

## Deliverable 1 — MDX wiki page

Create `content/suttanta/anguttara/kappa.mdx`.

Frontmatter (exact slugs to use in `related`):

```yaml
---
title: "กัป กับ อสงไขย — หน่วยเวลาในจักรวาลพุทธ"
ref: "อายุสูตร, อัสสุสูตร อังคุตตรนิกาย เล่มที่ ๒๓"
nikaya: "suttanta"
collection: "anguttara"
description: "กัป ๓ ระดับ อันตรกัป อสงไขยกัป มหากัป และอสงไขยในฐานะจำนวนที่นับไม่ได้"
tags: ["กัป", "อสงไขย", "จักรวาลพุทธ", "ภพภูมิ", "หลักธรรมหลัก"]
related: ["suttanta/anguttara/bhumi", "suttanta/samyutta/paticca", "suttanta/khuddaka/buddhavamsa"]
---
```

Body structure (140-200 lines):

```
{intro paragraph — กัป/อสงไขยคืออะไร เกี่ยวกับอะไร}

## อสงไขย — จำนวนที่นับไม่ได้
- ความหมายเชิงภาษา (_asaṅkheyya_ = นับไม่ได้)
- ในคัมภีร์อภิธรรมเชิงนับ ระบุประมาณ 10^140
- ใช้เป็นทั้งจำนวนและคุณศัพท์ของกัป

## กัป ๓ ระดับซ้อนกัน
H3 สำหรับ อันตรกัป, อสงไขยกัป, มหากัป — บอกความสัมพันธ์
รวมตารางขนาดเทียบกัน

## <KappaTimeline />   ← embed component here

## ระยะ ๔ ของมหากัป
- สังวรรต — โลกพินาศ
- สังวรรตัฏฐายี — ว่างเปล่า
- วิวรรต — ก่อตัวใหม่
- วิวรรตัฏฐายี — มีสัตว์อาศัย (ปัจจุบันอยู่ตรงนี้)

## มาตรวัดเวลาแบบอุปมา
อุปมา: หินภูเขาขนาด ๑ โยชน์ × ๑ โยชน์ × ๑ โยชน์ ทุก ๑๐๐ ปีมีคนเอาผ้าเช็ดครั้งเดียว
หินสึกหมดก่อน ๑ กัป ยังไม่หมด — แสดงความยาวของกัปแบบอุปมา (จากปัพพตสูตร สังยุตตนิกาย)

## ความสัมพันธ์กับ ภพภูมิ และ ปฏิจจสมุปบาท
สั้น ๆ ว่าทำไมต้องเข้าใจกัป — สังสารวัฏยาวนาน เกิดดับในกัปต่าง ๆ
link ไปยัง related slugs ที่ระบุใน frontmatter

## หมายเหตุเชิงวิชาการ
- เลขที่อ้างจากอภิธรรม/อรรถกถา ไม่ใช่พุทธพจน์ตรง
- สัทธิตามแนว Theravāda; สำนักอื่นอาจใช้นิยามต่าง
```

## Deliverable 2 — React component

Create `components/wiki/KappaTimeline.tsx`.

- **Client component** (`'use client'`)
- Pure SVG/CSS. NO three.js, NO heavy animations, NO external libs.
- Layout: nested rectangles (or nested rings) showing
  มหากัป → ๔ อสงไขยกัป → ๒๐ อันตรกัป
- Each layer click-toggleable to expand (use `useState`) OR
  hover-highlightable on desktop
- Reduced-motion fallback: static layout, no animation
- All Thai labels with Thai numerals
- Width: full container, aspect-ratio 16/9 or 4/3
- Use Tailwind for styling, brand amber/stone palette
- Add `<figcaption>` underneath explaining scale + that the diagram is
  not to scale (ratios are huge)

## Deliverable 3 — wire component into MDX renderer

Edit `app/wiki/[...slug]/page.tsx`:

- Import `KappaTimeline` from `@/components/wiki/KappaTimeline`
- Pass it to `<MDXRemote>` via the `components` prop:

```tsx
<MDXRemote
  source={doc.content}
  options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
  components={{ KappaTimeline }}
/>
```

This makes `<KappaTimeline />` resolvable inside any future MDX file.

## Validation gates

1. `npm run build` exit 0
2. `wc -l content/suttanta/anguttara/kappa.mdx` shows 140-200
3. `grep -c "^## " content/suttanta/anguttara/kappa.mdx` ≥ 5
4. `curl -s -o /dev/null -w '%{http_code}' http://localhost:3001/wiki/suttanta/anguttara/kappa` returns 200
5. Component renders inside the article (look for unique class/id from
   KappaTimeline in HTML output)
6. `git status --short` shows exactly 3 changed/created files (the MDX,
   the component, the wiki page route)

## Out of scope

- Don't change taxonomy.ts (kappa is a topic, not a folder)
- Don't add to KNOWN_FOLDERS
- Don't introduce new dependencies
- Don't touch other wiki pages or content

## When done

Print:
- Final file tree of changed files
- 5-bullet summary of what changed
- Confirmation that NO emoji appears in any file (grep for common
  emoji codepoints before finishing)
