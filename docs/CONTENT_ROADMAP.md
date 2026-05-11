# 🪷 TripiThai Content Roadmap

## Audience

| Tag | Audience | สิ่งที่ต้องการ |
|---|---|---|
| **B** | ผู้เริ่มศึกษาธรรม | ภาษาเข้าใจง่าย, ตัวอย่างชัด, เห็นภาพรวม |
| **P** | คนปฏิบัติสมาธิ/วิปัสสนา | กรรมฐาน, วิธีปฏิบัติ, ลำดับขั้น |
| **D** | คนหาคำตอบชีวิต | Daily dhamma, ใช้จริงในชีวิต |
| **S** | นักศึกษา/อ้างอิงวิชาการ | อ้างอิงเล่ม/ข้อ pinpoint, ศัพท์บาลี |

## Status

✅ done · 🚧 WIP · ⭐ MVP target · (empty) backlog

---

## MVP — Tier 1 (10 topics, ship first)

| # | Slug | หัวข้อ | ที่มา | Audience | Status |
|---|---|---|---|---|---|
| 1 | `suttanta/digha/ariyasacca` | อริยสัจ ๔ | มหาสติปัฏฐานสูตร ที.ม. เล่ม ๑๐ ข้อ ๒๗๓ | B P D S | ✅ |
| 2 | `suttanta/samyutta/tilakkhana` | ไตรลักษณ์ (อนิจจัง ทุกขัง อนัตตา) | อนัตตลักขณสูตร สํ.ขัน. เล่ม ๑๗ ข้อ ๑๒๗ | B S | ⭐ |
| 3 | `suttanta/samyutta/magga` | มรรค ๘ (อริยอัฏฐังคิกมรรค) | ธัมมจักกัปปวัตนสูตร สํ.ม. เล่ม ๑๙ ข้อ ๑๖๖๔ | B P D S | ⭐ |
| 4 | `suttanta/samyutta/khandha` | ขันธ์ ๕ | ขันธสูตร สํ.ขัน. เล่ม ๑๗ ข้อ ๙๕ | B S | ⭐ |
| 5 | `suttanta/samyutta/paticca` | ปฏิจจสมุปบาท | ปฏิจจสมุปปาทสูตร สํ.นิ. เล่ม ๑๖ ข้อ ๑ | B S | ⭐ |
| 6 | `suttanta/anguttara/nivarana` | นิวรณ์ ๕ | สามัญญผลสูตร ที.สี. เล่ม ๙ | P | ✅ |
| 7 | `suttanta/majjhima/anapanasati` | อานาปานสติ ๑๖ ขั้น | อานาปานสติสูตร ม.อุ. เล่ม ๑๔ ข้อ ๒๘๒ | P | ⭐ |
| 8 | `suttanta/digha/satipatthana` | สติปัฏฐาน ๔ | มหาสติปัฏฐานสูตร ที.ม. เล่ม ๑๐ | P S | ⭐ |
| 9 | `suttanta/anguttara/kalama` | กาลามสูตร (วิธีพิจารณาก่อนเชื่อ) | เกสปุตติยสูตร อํ.ติก. เล่ม ๒๐ ข้อ ๕๐๕ | D S | ⭐ |
| 10 | `suttanta/khuddaka/mangala` | มงคล ๓๘ | มงคลสูตร ขุ.ขุ. เล่ม ๒๕ ข้อ ๖ | B D | ⭐ |

**MVP rationale:** ครอบคลุมทั้ง ๔ audience โดยใช้หัวข้อจำนวนน้อยที่สุด — Foundation ๖ + Practice ๒ + Daily ๒

---

## Tier 2 — Practice deep-dive (next batch)

- โพชฌงค์ ๗ — `suttanta/samyutta/bojjhanga` (slot ที่ home page ลิงก์ไว้แล้ว)
- กสิณ ๑๐ — `suttanta/anguttara/kasina` (slot ที่ home page ลิงก์ไว้แล้ว)
- พรหมวิหาร ๔ (เมตตา กรุณา มุทิตา อุเบกขา) — `suttanta/digha/brahmavihara`
- กรรมฐาน ๔๐ — `suttanta/khuddaka/kammatthana40`
- อิทธิบาท ๔ (ฉันทะ วิริยะ จิตตะ วิมังสา) — `suttanta/samyutta/iddhipada`
- อาสุภะ ๑๐ — `suttanta/anguttara/asubha`
- กรณียเมตตสูตร — `suttanta/khuddaka/karaniya-metta`

## Tier 3 — Daily Life & Cosmology

- ภพภูมิ ๓๑ — `suttanta/anguttara/bhumi` (slot ที่ home page ลิงก์ไว้แล้ว)
- ทิศ ๖ (สิงคาลกสูตร) — `suttanta/digha/singalaka`
- กรรม-วิบาก (จูฬกัมมวิภังคสูตร) — `suttanta/majjhima/kamma-vibhanga`
- บุญกิริยาวัตถุ ๑๐ — `suttanta/anguttara/punna-kiriya`
- สังโยชน์ ๑๐ — `suttanta/samyutta/samyojana`
- หิริ-โอตตัปปะ (โลกบาลธรรม) — `suttanta/anguttara/hiri-ottappa`
- ทศพิธราชธรรม — `suttanta/digha/dasaraja-dhamma`

## Tier 4 — Vinaya & Abhidhamma (future)

- ศีล ๕ / ๘ / ๑๐ — `vinaya/sila`
- ปาฏิโมกข์ overview — `vinaya/patimokkha-intro`
- จิต-เจตสิก (Abhidhamma intro) — `abhidhamma/citta-cetasika`
- รูป-นาม — `abhidhamma/rupa-nama`

---

## Authoring template (per topic)

แต่ละหัวข้อให้มีโครงสร้างคงที่:

```mdx
---
title: "หัวข้อ"
ref: "ชื่อพระสูตร นิกาย เล่มที่ ข้อที่"
nikaya: "suttanta"
collection: "digha"
description: "1-2 ประโยคสรุป"
tags: ["tag1", "tag2"]
related: ["slug/อื่น"]
audience: ["B", "P"]
---

## ความหมาย
นิยามภาษาไทยง่าย ๆ + บาลีถ้าจำเป็น

## เหตุที่ตรัส (ถ้ามี)
context — ใคร ที่ไหน ทำไม

## รายละเอียด
หัวข้อย่อย เช่น ๔ ข้อ / ๕ ขั้น

## การนำไปใช้
สิ่งที่ผู้อ่านใช้ได้จริง

## หัวข้อเชื่อมโยง
อ้างถึง related dhamma
```

---

## Conventions

- **ตัวเลขไทย** (๑ ๒ ๓ ...) ในชื่อหัวข้อ + เนื้อหา
- **บาลี** ตัวเอียง _italic_ (เช่น _ariyasacca_)
- **อ้างอิงเล่ม** ใช้ตัวเลขไทย + ตัวย่อ pitaka (ที.ม. = ทีฆนิกาย มหาวรรค)
- **คำศัพท์** — ใช้ภาษาไทยก่อน วงเล็บบาลีเฉพาะเมื่อจำเป็น
