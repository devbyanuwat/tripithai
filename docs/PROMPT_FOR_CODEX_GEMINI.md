# Prompt — fix mobile burger menu

> Paste this whole block into Codex / Gemini / Cursor / etc.

---

You are working on the TripiThai Next.js 16 + Tailwind v4 project at this repo.

**Bug**: The burger menu button in `components/ui/Header.tsx` does nothing — it has an icon but no `onClick` handler. The `<Sidebar>` is `hidden lg:flex`, so mobile users have zero navigation. Fix this.

**Files involved**
- `components/ui/Header.tsx` — burger button (lines 9-11)
- `components/ui/Sidebar.tsx` — sidebar component, contains `<WikiTree>` (keep its logic intact)
- `app/layout.tsx` — mounts both Header + Sidebar (may need a provider here)

**Required behavior**

Mobile (viewport < 1024px / Tailwind `lg`):
1. Tap burger → drawer slides in from the left (~280px wide, ~250ms ease)
2. Semi-transparent black backdrop dims the rest of the screen
3. Tap backdrop / press Escape / tap any link inside the drawer → drawer closes
4. While drawer is open, lock `body` scroll
5. Drawer has its own close (×) button in its header

Desktop (≥ 1024px):
- Sidebar stays static and visible exactly as today
- Burger button hides via `lg:hidden`
- No regressions to the existing `<WikiTree>` accordion behavior or pathname-based active link styling

**Constraints**
- No new UI libraries (only Tailwind + lucide-react that are already installed)
- Keep all Thai labels and existing routes
- Use Tailwind classes; rely on transforms for animation (`-translate-x-full lg:translate-x-0`)
- Component code is `'use client'`-based already
- Don't refactor unrelated code

**Acceptance gates (must all pass)**
1. `npm run build` succeeds with no TypeScript errors
2. Manually verifiable: at 375px viewport, burger toggles drawer; at 1280px, sidebar is static and burger is hidden
3. ESC key, backdrop click, and link tap all close the drawer
4. `body` overflow returns to default when drawer is closed (don't leak the `hidden` style)

**Implementation suggestion** (you can deviate if cleaner)
- Lift `isOpen` state into a small React Context provider (e.g. `MobileMenuProvider` in `components/ui/MobileMenuContext.tsx`) wrapped in `app/layout.tsx`
- `Header` reads `setOpen` from context; `Sidebar` reads `isOpen + setOpen`
- Render Sidebar in both layouts: as a `fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300 -translate-x-full lg:translate-x-0 lg:static lg:w-64` element so the same component covers both modes
- Backdrop: a sibling `<div className="fixed inset-0 bg-black/40 z-30 lg:hidden">` rendered only while open, with `onClick` to close
- ESC + body lock via `useEffect` in the provider or Sidebar

**Out of scope** — don't redesign visuals, don't add dark mode, don't touch search/ask pages, don't change the wiki content.

When you're done, run `npm run build` and confirm the output, then summarize the diff briefly.
