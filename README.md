# 🪷 TripiThai

ค้นหาและเรียนรู้พระไตรปิฎกภาษาไทย — Keyword Search + AI Q&A + Wiki

## Tech Stack

- **Next.js 16.2.6** + TypeScript + Tailwind v4
- **Meilisearch** — keyword search (ทำงานได้โดยไม่มี AI)
- **Typhoon AI** — AI Q&A พร้อม RAG (opentyphoon.ai)
- **Qdrant** — semantic search (Phase 3)
- **MDX** — content management

## Design Principle: LLM Optional

ทุก feature ทำงานได้โดยไม่มี AI:
- ถ้า Typhoon ไม่ตอบ → แสดง search results ดิบ
- ถ้า Meilisearch ไม่พร้อม → แจ้ง user และแสดง empty state
- ไม่มี single point of failure

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy env
cp .env.local.example .env.local
# แก้ไข TYPHOON_API_KEY

# 3. Start Meilisearch (Docker)
docker run -d \
  --name meilisearch \
  -p 7700:7700 \
  -v $(pwd)/meili_data:/meili_data \
  getmeili/meilisearch:latest

# 4. Index content
npm run index:content

# 5. Start dev server
npm run dev
```

## Content Structure

```
content/
├── vinaya/                    # พระวินัยปิฎก
├── suttanta/
│   ├── digha/                 # ทีฆนิกาย
│   ├── majjhima/              # มัชฌิมนิกาย
│   ├── samyutta/              # สังยุตตนิกาย
│   ├── anguttara/             # อังคุตตรนิกาย
│   └── khuddaka/              # ขุททกนิกาย
└── abhidhamma/                # พระอภิธรรมปิฎก
```

## Adding Content

สร้างไฟล์ `.mdx` ในโฟลเดอร์ที่เหมาะสม:

```mdx
---
title: "ชื่อหัวข้อ"
ref: "ชื่อพระสูตร นิกาย เล่มที่ X ข้อ Y"
nikaya: "suttanta"
collection: "digha"
description: "คำอธิบายสั้นๆ"
tags: ["tag1", "tag2"]
related: ["suttanta/digha/other-topic"]
---

เนื้อหา MDX...
```

แล้วรัน `npm run index:content` เพื่ออัปเดต search index

## Roadmap

- [x] Phase 1 — Wiki + Keyword Search + AI Q&A (LLM Optional)
- [ ] Phase 2 — Qdrant semantic search + bge-m3 embeddings
- [ ] Phase 3 — Mobile responsive + Dark mode
- [ ] Phase 4 — SEO + OG images
