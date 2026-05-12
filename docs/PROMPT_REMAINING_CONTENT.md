# Prompt — write 23 Tipitaka book/section overview MDX files

> Paste into Codex.

You are extending the TripiThai dharma wiki. Existing MDX files use a known template (frontmatter + Thai numerals + Pali italic + tables). Mirror that style.

## Target — 23 overview files

Each file is a **book-level / section-level overview** (NOT a deep dive on one concept). Explain: what this book/section is, who compiled it, what's inside, why a modern reader should care, key topics within (link to existing wiki slugs where applicable).

### Vinaya Piṭaka subdivisions (3)
| Slug | Title | Notes |
|------|-------|-------|
| `content/vinaya/suttavibhanga.mdx` | สุตตวิภังค์ | ภิกขุวิภังค์ + ภิกขุนีวิภังค์ — explains ปาฏิโมกข์ rules with story for each; ref: วินัยปิฎก เล่ม ๑-๓ |
| `content/vinaya/khandhaka.mdx` | ขันธกะ | มหาวรรค + จุลวรรค — ordination, kathina, uposatha, dwellings, schism; ref: วินัยปิฎก เล่ม ๔-๗ |
| `content/vinaya/parivara.mdx` | ปริวาร | Appendix/synopsis of the entire Vinaya; ref: วินัยปิฎก เล่ม ๘ |

### Abhidhamma Piṭaka books still missing (5)
| Slug | Title | Notes |
|------|-------|-------|
| `content/abhidhamma/dhatukatha.mdx` | ธาตุกถา | Discussion of khandha-ayatana-dhatu correspondences; ref: อภิธรรมปิฎก เล่ม ๓๖ |
| `content/abhidhamma/puggalapannatti.mdx` | ปุคคลบัญญัติ | Classification of persons (10 categories: by group, by pair, etc.); ref: อภิธรรมปิฎก เล่ม ๓๖ |
| `content/abhidhamma/kathavatthu.mdx` | กถาวัตถุ | Debates against schismatic views compiled at the 3rd council; ref: อภิธรรมปิฎก เล่ม ๓๗ |
| `content/abhidhamma/yamaka.mdx` | ยมก | Paired-question logical analysis of dhammas; ref: อภิธรรมปิฎก เล่ม ๓๘-๓๙ |
| `content/abhidhamma/patthana.mdx` | ปัฏฐาน | Great Book of Conditional Relations — 24 paccaya; ref: อภิธรรมปิฎก เล่ม ๔๐-๔๕ |

### Khuddaka Nikāya — 15 books (one of which, khuddakapatha, already has the mangala leaf; write an overview for the book itself)
| Slug | Title | Ref base |
|------|-------|----------|
| `content/suttanta/khuddaka/khuddakapatha.mdx` | ขุททกปาฐะ | ขุททกนิกาย เล่ม ๒๕ |
| `content/suttanta/khuddaka/dhammapada.mdx` | ธรรมบท | ขุททกนิกาย เล่ม ๒๕ (423 คาถา 26 วรรค) |
| `content/suttanta/khuddaka/udana.mdx` | อุทาน | ขุททกนิกาย เล่ม ๒๕ (8 วรรค 80 พระสูตร) |
| `content/suttanta/khuddaka/itivuttaka.mdx` | อิติวุตตกะ | ขุททกนิกาย เล่ม ๒๕ (4 นิบาต 112 พระสูตร) |
| `content/suttanta/khuddaka/suttanipata.mdx` | สุตตนิบาต | ขุททกนิกาย เล่ม ๒๕ (5 วรรค รวมพระสูตรเก่าที่สุด เช่น อัฏฐกวรรค ปารายนวรรค) |
| `content/suttanta/khuddaka/vimanavatthu.mdx` | วิมานวัตถุ | ขุททกนิกาย เล่ม ๒๖ — stories of beings in vimana (heavenly mansions) |
| `content/suttanta/khuddaka/petavatthu.mdx` | เปตวัตถุ | ขุททกนิกาย เล่ม ๒๖ — stories of petas |
| `content/suttanta/khuddaka/theragatha.mdx` | เถรคาถา | ขุททกนิกาย เล่ม ๒๖ — verses of arahant elder monks |
| `content/suttanta/khuddaka/therigatha.mdx` | เถรีคาถา | ขุททกนิกาย เล่ม ๒๖ — verses of arahant elder nuns |
| `content/suttanta/khuddaka/jataka.mdx` | ชาดก | ขุททกนิกาย เล่ม ๒๗-๒๘ — 547 birth stories of the Bodhisatta |
| `content/suttanta/khuddaka/niddesa.mdx` | นิทเทส | ขุททกนิกาย เล่ม ๒๙-๓๐ — มหานิทเทส + จูฬนิทเทส (Sariputta's commentary on Suttanipāta) |
| `content/suttanta/khuddaka/patisambhidamagga.mdx` | ปฏิสัมภิทามรรค | ขุททกนิกาย เล่ม ๓๑ — analytical knowledge texts attributed to Sariputta |
| `content/suttanta/khuddaka/apadana.mdx` | อปทาน | ขุททกนิกาย เล่ม ๓๒-๓๓ — past lives of arahants (mainly Buddha & elders) |
| `content/suttanta/khuddaka/buddhavamsa.mdx` | พุทธวงศ์ | ขุททกนิกาย เล่ม ๓๓ — lineage of 25 past Buddhas |
| `content/suttanta/khuddaka/cariyapitaka.mdx` | จริยาปิฎก | ขุททกนิกาย เล่ม ๓๓ — Bodhisatta's perfections (parami) demonstrated in past lives |

## Authoring template (per file)

```mdx
---
title: "ชื่อภาษาไทย"
ref: "ที่มา (เลขเล่ม + เล่มไหน เช่น 'วินัยปิฎก เล่ม ๔-๗')"
nikaya: "vinaya" | "suttanta" | "abhidhamma"
collection: "khuddaka"  # only for khuddaka files; omit for vinaya/abhidhamma direct children
description: "1-2 ประโยคสรุปสำหรับ Google + AI search"
tags: ["array", "of", "5-7", "Thai", "tags"]
related: ["existing/wiki/slugs"]
---

{intro paragraph — definition + opening hook}

## ความสำคัญ
ทำไมคัมภีร์นี้สำคัญ จุดเด่นคืออะไร

## โครงสร้าง / เนื้อหา
แบ่งเป็นกี่ส่วน อะไรบ้าง (ใช้ heading ๓ หรือ table ถ้าเหมาะ)

## ที่มาและการรวบรวม
ใครเป็นผู้รวบรวม สังคายนาครั้งไหน

## หัวข้อสำคัญ (ถ้ามี wiki article แล้ว ให้ link ไป)
- เช่น สำหรับขุททกปาฐะ → link ไป [มงคล ๓๘](/wiki/suttanta/khuddaka/mangala)

## การนำไปใช้ในยุคปัจจุบัน
จะอ่าน/ศึกษาอย่างไรให้ได้ประโยชน์

(ถ้าเหมาะ — เพิ่ม blockquote บาลีท้ายไฟล์)
```

## Constraints

- ตัวเลขใน frontmatter `ref` และในเนื้อหา ใช้ **เลขไทย** (๑ ๒ ๓ ...)
- ศัพท์บาลีให้เป็น italic underscore `_pali_`
- Tables 3-column ถ้ามี enumeration เปรียบเทียบ
- `related` ต้องชี้ไป file ที่มีจริง (ตรวจกับไฟล์ปัจจุบันใน `content/`); 2-4 รายการต่อไฟล์
- ความยาว 60-110 บรรทัด — overview ไม่ลึก
- คงข้อมูลที่ถูกต้องตามแบบ Theravāda กระแสหลัก; ถ้าไม่แน่ใจเลขข้อ/เล่ม **ระบุเฉพาะที่แน่ใจ** (เช่น "ขุททกนิกาย เล่ม ๒๕") **แทนการเดาเลขข้อ**

## Style references (อ่านก่อนเริ่ม — 3 ไฟล์)
- `content/suttanta/digha/ariyasacca.mdx` — long form
- `content/suttanta/anguttara/kalama.mdx` — list-heavy + table
- `content/abhidhamma/citta-cetasika.mdx` — abhidhamma technical style

## Validation gates (must all pass after writing)

1. `npm run build` exit 0
2. ทุก 23 ไฟล์ exist ตาม slug ในตาราง
3. ทุก `related` slug ใน frontmatter resolve to existing files
4. ไม่แก้ไฟล์เก่า (`git diff content/` แสดงเฉพาะ A — added)

## Out of scope

- ❌ ห้ามเขียนสรุปทุก sutta ใน Tipitaka (จะเป็น 84,000 — ใหญ่เกิน)
- ❌ ห้ามแก้ไฟล์ที่มีอยู่
- ❌ ห้ามแก้ `lib/taxonomy.ts` หรือ wiki page logic
- ❌ ห้ามแก้ภาพ/hero/สไตล์

## When done

- รัน `npm run build` แล้วยืนยัน output
- ระบุไฟล์ที่เขียนทั้งหมด + cite reference สำหรับ ref field
- หาก content บางคัมภีร์ไม่แน่ใจ ให้ระบุไว้ในส่วน "การนำไปใช้" ว่า "เนื้อหาเชิงลึกควรอ้างอิงจากต้นฉบับ etipitaka.com" และคง overview ระดับโครงสร้างไว้
