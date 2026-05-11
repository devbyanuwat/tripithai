# Prompt — refactor into composable layouts (layout 2 system)

> Paste this whole block into Codex.

---

You are working on the TripiThai Next.js 16 + Tailwind v4 project at this repo.

**Goal**: Refactor the current single-layer `app/layout.tsx` into a **composable two-layout system** so we can swap visual themes later without rewriting `app/layout.tsx`. This is the "layout 2" architecture.

## Target structure

Create a new folder `components/layouts/` with these files:

```
components/layouts/
├── ChromeLayout.tsx    # navbar (Header) + sidebar (Sidebar) shell — handles MobileMenuProvider, sticky positioning, responsive flex
├── ContentLayout.tsx   # wraps children in a content container — handles padding, max-width, prose defaults (NOT MDX prose — just spacing)
└── index.ts            # named exports + a composed `<AppLayout>` that wraps content in Chrome → Content
```

### ChromeLayout.tsx
- Renders `<MobileMenuProvider>` → `<div flex>` with `<Sidebar />` and the right column (with `<Header />` + slot for children)
- Accepts `children` prop
- Same DOM tree as the current `app/layout.tsx` `<body>` content
- Animation classes preserved (`animate-fade-in`)

### ContentLayout.tsx
- Accepts `children`
- Provides consistent page padding/spacing wrappers around content
- Optional prop `width?: 'narrow' | 'default' | 'wide'` controlling max-width
- Default `'default'` = `max-w-5xl`

### index.ts
- Re-export `ChromeLayout`, `ContentLayout`
- Export `AppLayout = ({ children }) => <ChromeLayout><ContentLayout>{children}</ContentLayout></ChromeLayout>`

## Wire into root

Refactor `app/layout.tsx`:
- Keep `metadata`, `<html lang="th">`, fonts, JSON-LD `<script>`, `<body>` shell
- Replace the current inline navbar+sidebar JSX with `<AppLayout>{children}</AppLayout>`
- DO NOT remove the JSON-LD WebSite block or any metadata
- DO NOT remove the `<MobileMenuProvider>` — move it inside `ChromeLayout`

## Acceptance gates

1. `npm run build` succeeds; static + dynamic routes unchanged
2. Visual diff is **zero** (open `/` and `/wiki/suttanta/digha/ariyasacca` on dev — looks identical)
3. Mobile burger drawer still opens/closes the same way (MobileMenuProvider preserved)
4. `<Sidebar />` + `<Header />` not modified
5. No new dependencies
6. No changes to existing pages or content files

## Constraints

- All new files must include `'use client'` only if they use hooks; `ChromeLayout` likely doesn't (it just renders the provider which is client). Decide based on what's used.
- Keep imports tidy: relative inside `components/layouts/` is fine, but prefer `@/components/ui/...` for cross-folder.
- Don't introduce a new state library or context — only what's needed.

## Out of scope

- No visual redesign — just structural refactor
- No new theme variants (will be added later in a separate change)
- No image generation — keep the existing `<BodhiHero>` in `app/page.tsx` as-is
- Don't touch `components/ui/*`, `components/wiki/*`, `components/hero/*`

## When done

- Run `npm run build` and confirm output
- Print the file tree of `components/layouts/`
- Summarize the diff in 3-5 bullets
