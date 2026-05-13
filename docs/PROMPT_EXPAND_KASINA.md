# Prompt — expand content/suttanta/anguttara/kasina.mdx

> Paste into Codex.

You are extending one specific dharma article in the TripiThai wiki:
**`content/suttanta/anguttara/kasina.mdx`** — currently 75 lines, too brief
to be a real reference. Target 150-220 lines after expansion.

## Read first
- `content/suttanta/anguttara/kasina.mdx` (the file you'll expand — DO
  NOT rewrite the frontmatter or change the file path)
- `content/suttanta/majjhima/anapanasati.mdx` (length + structure target)
- `content/suttanta/khuddaka/kammatthana40.mdx` (cross-reference)
- `content/anbidhamma/citta-cetasika.mdx` for naming conventions
  (note: it's actually at `content/abhidhamma/citta-cetasika.mdx`)

## What's missing in the current draft

Current draft lists the 10 kasiṇa with short descriptions + 3 nimitta
stages + a chart of jhāna reachable. That's the skeleton. The reader
who wants to actually practice still has no guidance on:

1. **Preparation of the kasiṇa object** — for each of the 10:
   - Size (Visuddhimagga says ~1 spann / 1 vidatthi = ~22cm)
   - Surface / material (how to make a paṭhavī disk, how to set up an
     āpo bowl, how to focus on tejo without burning your eyes, etc.)
   - Where to place it, distance from the meditator
   - Lighting
2. **The 3 nimitta stages in detail** — what each looks like in
   experience, how to know when you've shifted, common mistakes
3. **Choosing a kasiṇa by jariya (character / temperament)** —
   reference จริต ๖ from kammatthana40 — which kasiṇa suits which
   temperament and why
4. **Per-kasiṇa special outcomes** — which abhiññā each enables:
   - ปฐวีกสิณ → multiplication of forms, walking on water
   - อาโป → liquefaction, multiplying forms
   - เตโช → manifesting fire, light
   - วาโย → quick movement
   - วัณณกสิณ ๔ → จิตเปลี่ยนสี
   - อาโลก → ทิพยจักษุ (divine eye), seeing through obstacles
   - อากาส → base for the first arūpa jhāna
   (Use the standard Theravāda commentarial list; if a specific outcome
   is uncertain, write it generically rather than inventing specifics.)
5. **Step-by-step beginner procedure** — what to do in your first sit,
   what to expect by day 3, when to escalate
6. **Common pitfalls** — eye strain, sleepiness, attachment to the
   nimitta, mistaking visual hallucination for paṭibhāganimitta
7. **Relation to vipassanā** — kasiṇa is samatha; how the practitioner
   bridges to insight after attaining jhāna

## Style rules (mirror existing files exactly)

- Frontmatter: leave as-is (title, ref, nikaya, collection, description,
  tags, related). Do not change slugs or break the related links.
- Thai numerals (๐-๙) throughout — never Arabic
- Pali in italic underscore form: `_pathavī-kasiṇa_`
- Headings: `## H2` for top sections, `### H3` for subsections,
  Thai numeral prefix `### ๑. หัวข้อ — ขยายความ`
- Tables: 3-column markdown when comparing per-kasiṇa attributes
- Blockquote `> ` for Pali phrases or pivotal direct citations only
- Practical advice in **bold**: e.g. **อุปมา**:, **ละด้วย**:, **เหมาะกับจริต**:
- Avoid emoji
- Length 150-220 lines body

## Hard constraints

- **NO fabricated sutta references.** Current `ref` field stays as
  "กสิณสูตร อังคุตตรนิกาย ทสกนิบาต เล่มที่ ๒๔" — do not invent ข้อ.
- **NO new Pali quotes** beyond what's already in the file unless you
  cite Visuddhimagga (commentary) explicitly as the source — and even
  then, mark it: `(วิสุทธิมรรค — อรรถกถา ไม่ใช่พระไตรปิฎกโดยตรง)`
- If you reference a specific abhiññā outcome that's uncertain, say
  "ตามอรรถกถา" rather than asserting it as canonical
- Keep ทุก existing section header in the file; you can expand them and
  add new sections, but don't delete

## Validation (run after writing)

1. `npm run build` exit 0
2. `wc -l content/suttanta/anguttara/kasina.mdx` shows 150-220 lines
3. `grep -E "^##" content/suttanta/anguttara/kasina.mdx` shows at least
   6 H2 sections
4. `curl -s -o /dev/null -w '%{http_code}' http://localhost:3001/wiki/suttanta/anguttara/kasina`
   returns 200
5. `git diff --stat content/suttanta/anguttara/kasina.mdx` shows only
   that one file modified (not new file, not deletion)

## Out of scope

- Don't touch other files
- Don't add or change related slugs (they're already linked correctly)
- Don't fabricate volume/ข้อ numbers — refs stay at "เล่ม ๒๔" level only

## When done

Run the validations above and print results. If anything failed, fix it
in-place and rerun. Summarize the new section structure in 4-6 bullets.
