# Prompt — batch write 5 dharma articles (MDX only)

> Paste into Codex. Goal: ship five articles in one run.

## Hard rules

- **NO EMOJI anywhere.** MDX text, JSX, comments, commit message. Use plain words or Lucide icons.
- **NO fabricated sutta references.** Refs at "เล่ม X" level only — never invent ข้อ numbers unless they appear in the prompt.
- Thai numerals (๐-๙). Pali in `_italic_` (e.g. `_abhiññā_`).
- Mirror the style of existing articles. Read at least these 3 first:
  - `content/suttanta/digha/ariyasacca.mdx`
  - `content/suttanta/anguttara/kalama.mdx`
  - `content/suttanta/anguttara/asubha.mdx`

## 5 articles to create

| # | File path | Title | ref |
|---|-----------|-------|-----|
| 1 | `content/suttanta/anguttara/katannuta.mdx` | กตัญญูกตเวที | กตัญญูสูตร อังคุตตรนิกาย ทุกนิบาต เล่มที่ ๒๐ |
| 2 | `content/suttanta/digha/abhinna.mdx` | อภิญญา ๖ | สามัญญผลสูตร ทีฆนิกาย สีลขันธวรรค เล่มที่ ๙ |
| 3 | `content/suttanta/anguttara/sangahavatthu.mdx` | สังคหวัตถุ ๔ | สังคหสูตร อังคุตตรนิกาย จตุกกนิบาต เล่มที่ ๒๑ |
| 4 | `content/suttanta/majjhima/mahabhuta.mdx` | มหาภูตรูป ๔ | มหาหัตถิปโทปมสูตร มัชฌิมนิกาย มูลปัณณาสก์ เล่มที่ ๑๒ |
| 5 | `content/suttanta/samyutta/ayatana.mdx` | อายตนะ ๖ | สฬายตนสังยุตต์ สังยุตตนิกาย เล่มที่ ๑๘ |

## Each article — required structure (110-180 lines each)

```mdx
---
title: "<title>"
ref: "<ref>"
nikaya: "suttanta"
collection: "<digha|majjhima|samyutta|anguttara>"
description: "1-2 ประโยคสรุปสำหรับ Google + AI search"
tags: ["5-7 Thai tags"]
related: ["2-4 existing slugs only"]
---

{intro paragraph — definition + opening hook}

## ความหมาย / โครงร่าง
{1-2 short paragraphs}

## <รายละเอียดหลัก — H3 ต่อแต่ละข้อย่อย>
{ใช้เลขไทย ๑ ๒ ๓ ... ใน H3 prefix}

(เลือกใช้ table ถ้าเหมาะ — เปรียบเทียบ ๓ มิติขึ้นไป)

## ความสัมพันธ์กับธรรมอื่น
{link ไปยัง related slugs}

## การปฏิบัติ / การนำไปใช้
{ปฏิบัติจริงในชีวิต}

(blockquote บาลีท้ายไฟล์ ถ้าเหมาะ — copy ตรงจากต้นฉบับเท่านั้น ห้ามแต่ง)
```

## ข้อสำคัญต่อแต่ละบทความ

### 1. กตัญญูกตเวที (katannuta)
- กตัญญู = รู้คุณ, กตเวที = ตอบคุณ
- เริ่มจากบิดามารดา → ครู → ผู้มีพระคุณ → พระพุทธ-ธรรม-สงฆ์
- พระพุทธองค์ตรัสว่า "บุคคลที่หาได้ยาก ๒ ประเภท" — กตัญญูบุคคล + ปุพพการีบุคคล
- related: `suttanta/digha/singalaka`, `suttanta/khuddaka/mangala`

### 2. อภิญญา ๖ (abhinna)
- รายการ ๖ อภิญญา: อิทธิวิธิ, ทิพยโสตะ, เจโตปริยญาณ, ปุพเพนิวาสานุสติ, ทิพยจักษุ, อาสวักขยญาณ
- ๕ ข้อแรกเป็น "โลกียอภิญญา" — เกิดจากฌาน, ฝ่ายอิทธิ
- ข้อ ๖ (อาสวักขยญาณ) เป็น "โลกุตตรอภิญญา" — เกิดจากปัญญา, ทำให้เป็นพระอรหันต์
- คนทั่วไปไม่ควรปรารถนาอภิญญา ๕ ข้อแรก ควรมุ่งข้อ ๖
- related: `suttanta/anguttara/kasina`, `suttanta/digha/satipatthana`, `suttanta/anguttara/acinteyya` (ฌานวิสัย = อจินไตย)

### 3. สังคหวัตถุ ๔ (sangahavatthu)
- ๔ ฐานสงเคราะห์ที่ทำให้สังคมเหนียวแน่น
  - ทาน (giving)
  - ปิยวาจา (kind speech)
  - อัตถจริยา (beneficial conduct)
  - สมานัตตตา (equality / treating as equal)
- ใช้ในครอบครัว, ทีมงาน, ชุมชน
- related: `suttanta/digha/singalaka`, `suttanta/digha/brahmavihara`, `suttanta/khuddaka/mangala`

### 4. มหาภูตรูป ๔ (mahabhuta)
- ๔ ธาตุ: ปฐวี (ดิน, แข็ง/อ่อน), อาโป (น้ำ, เกาะกุม/เหลว), เตโช (ไฟ, ร้อน/เย็น), วาโย (ลม, ไหวเอียง/ตึง)
- ใช้พิจารณาในสติปัฏฐาน (กายานุปัสสนา - ธาตุมนสิการบรรพ)
- เป็นรากฐานของ "รูป" ใน รูป-นาม / ขันธ์ ๕
- related: `suttanta/samyutta/khandha`, `abhidhamma/rupa-nama`, `suttanta/digha/satipatthana`

### 5. อายตนะ ๖ (ayatana)
- อายตนะภายใน ๖: ตา หู จมูก ลิ้น กาย ใจ
- อายตนะภายนอก ๖: รูป เสียง กลิ่น รส โผฏฐัพพะ ธรรมารมณ์
- เมื่อ ภายใน + ภายนอก + วิญญาณ มาประชุมกัน = ผัสสะ → เวทนา → ตัณหา (ปฏิจจสมุปบาท)
- สำคัญในการเจริญสติเพื่อตัดวงจรที่ "ผัสสะ → เวทนา → ตัณหา"
- related: `suttanta/samyutta/paticca`, `suttanta/samyutta/khandha`, `suttanta/digha/satipatthana`

## Validation gates (run after writing all 5)

1. `npm run build` exit 0
2. ทุก 5 ไฟล์ exist:
   ```
   for f in katannuta digha/abhinna anguttara/sangahavatthu majjhima/mahabhuta samyutta/ayatana; do
     case "$f" in
       katannuta) p="suttanta/anguttara/$f.mdx" ;;
       *) p="suttanta/$f.mdx" ;;
     esac
     test -f "content/$p" && echo "OK $p" || echo "MISSING $p"
   done
   ```
3. ทุกไฟล์ 110-180 บรรทัด
4. ทุกไฟล์ มี ≥4 H2 sections
5. ทุก `related` slug resolve to existing files (no dead refs)
6. ทุก URL `/wiki/{slug}` ของ 5 ไฟล์ → HTTP 200
7. NO emoji: regex `[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}\x{1F000}-\x{1F2FF}]` → 0 matches in all 5 files
8. `git status --short` shows exactly 5 new MDX + the prompt doc

## Out of scope

- Don't create any React components (text MDX only)
- Don't modify `app/wiki/[...slug]/page.tsx` (no new component imports needed)
- Don't touch existing content files
- Don't change taxonomy / KNOWN_FOLDERS / lib code

## When done

Print:
- 5 file paths created
- Per-file line count
- 6-bullet summary covering all 5 articles
- Confirmation NO emoji anywhere
