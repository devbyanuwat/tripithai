# Bug: Mobile Burger Menu ใช้ไม่ได้

## ปัญหา

- บนหน้าจอ mobile (< 1024px / `lg`) — ปุ่ม burger ใน `<Header>` กดแล้วไม่เกิดอะไร
- Sidebar ใช้ `hidden lg:flex` — desktop เท่านั้น
- Mobile users เข้าหน้า wiki tree ผ่าน navigation ไม่ได้เลย ต้องพิมพ์ URL หรือใช้ search

## Root Cause

### `components/ui/Header.tsx:9-11`
```tsx
<button className="lg:hidden p-1.5 text-stone-500 hover:text-stone-700">
  <Menu className="w-5 h-5" />
</button>
```
ปุ่มไม่มี `onClick` ไม่ผูกกับ state ใดๆ

### `components/ui/Sidebar.tsx:91`
```tsx
<aside className="hidden lg:flex flex-col w-64 ...">
```
ซ่อนใน mobile ทั้งหมด ไม่มี drawer/overlay mode

## Expected Behavior

### Mobile (< 1024px)
1. กด burger → drawer slide-in จากซ้าย (animation 200-300ms)
2. แสดง backdrop dim ทั้งหน้าจอ (semi-transparent black)
3. กด backdrop / กด ESC / กดลิงก์ใน drawer → ปิด drawer
4. ขณะ drawer เปิด — `body` ห้าม scroll
5. ปุ่ม X (close icon) ใน drawer header — กดปิดได้
6. Width ของ drawer ~280px (เต็มความกว้าง sidebar เดิม)

### Desktop (≥ 1024px)
- Sidebar คงเดิม (static, ไม่มี drawer)
- ปุ่ม burger ซ่อน (`lg:hidden`)

## Acceptance Criteria

- [ ] กด burger บน mobile แล้ว drawer เปิด
- [ ] กด backdrop / ESC / link ใด ๆ → drawer ปิด
- [ ] Drawer slide-in animation smooth
- [ ] Backdrop dim พื้นหลัง
- [ ] Body scroll lock ขณะ drawer เปิด
- [ ] Desktop ใช้ Sidebar static เหมือนเดิม (regression-free)
- [ ] Keyboard accessible — Tab focus วนใน drawer ขณะเปิด, ESC ปิด
- [ ] `pnpm dev` / `npm run dev` แล้วทดสอบ resize viewport ทำงานถูก
- [ ] `npm run build` ผ่าน

## Files to Change

| File | Action |
|------|--------|
| `components/ui/Header.tsx` | Add menu button state + onClick |
| `components/ui/Sidebar.tsx` | Convert to mobile drawer + desktop static (responsive) |
| `app/layout.tsx` (อาจไม่ต้อง) | ถ้าใช้ context, mount provider |

## Implementation Hints

- ใช้ React Context หรือ Zustand เก็บ state `isMobileMenuOpen` ที่ shared ระหว่าง Header กับ Sidebar
- หรือ refactor ให้ Sidebar เป็น `<MobileDrawer>` + `<DesktopSidebar>` แยกกัน + drawer state ใน layout
- ใช้ Tailwind transition: `transition-transform duration-300 -translate-x-full lg:translate-x-0`
- Body scroll lock: `useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])`
- Backdrop: `<div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={close} />`
- ESC handler: `useEffect(() => { const h = (e) => e.key === 'Escape' && close(); window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h) }, [])`

## Project Context

- Next.js 16 (App Router, RSC)
- Tailwind v4 + Typography plugin
- Existing components are `'use client'`
- Sidebar already has `<WikiTree>` collapsible structure — keep it
- ไม่มี dark mode

## Test Plan

1. `npm run dev`
2. Open http://localhost:3003 บน mobile viewport (Chrome DevTools, < 1024px)
3. กด burger → drawer เปิด
4. กด link ใน drawer → navigate + drawer ปิด
5. กด backdrop → ปิด
6. กด ESC → ปิด
7. Resize viewport ไป ≥ 1024px → ปุ่ม burger หาย sidebar static
8. `npm run build` → ผ่าน

## Constraints

- ห้ามเพิ่ม UI library ใหม่ (ใช้ Tailwind + Lucide ที่มีอยู่)
- ห้ามรื้อ `<WikiTree>` logic ภายใน
- เก็บ Thai labels ทั้งหมดตามเดิม
- เก็บ existing pathname highlight (active link)
