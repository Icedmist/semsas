# GoSEMSAS Design System — Healixx Based

This document describes the single-source design system for **GoSEMSAS** (Gombe State Emergency Medical Services and Ambulance System). The implementation is a faithful reconstruction of the **Healixx Framer template** (`healixx.framer.website`) with GoSEMSAS content, preserving geometry, spacing, and tokens while introducing GoSEMSAS branding, red accents, and Supabase-ready data.

## 1. Philosophy — Helix Only

No dot pills, no ad-hoc gradients. Every surface uses Healixx geometry:
- Outer containers: `rounded-[40px]` `bg-[#f0f5f6]` `border border-black/5` `p-6 md:p-10`
- Inner cards: `rounded-[24px]` `bg-white` `border border-black/5` `shadow-[0_8px_30px_rgba(0,0,0,0.06)]`
- Navigation: outer `rounded-[66px]`, inner nav `rounded-[16px]` `border black/5` `shadow`
- Primary CTA: `rounded-full` `bg-[#0a0a0a]` `border black` `px-6 py-3` `text-sm font-bold` (emergency variant `bg-[#dc2626] border-[#b91c1c]`)
- Section tags: Healixx clean pill `rounded-full` `bg-[#F1F5F9]` `border #E2E8F0` — **no `::before` dot** (removed from `globals.css:141`)

If you need a new block, copy an existing Healixx block — do not invent a new pill style.

## 2. Single Font — Urbanist

**One font for the entire app** (both `semsas` and `admin`):

- **Font:** `Urbanist` (weights 400,500,600,700,800,900) via `next/font/google`
- **Variable:** `--font-sans`
- **Usage:** `font-sans` on `<body>` — every heading, paragraph, and label inherits it. No Inter, no Fredoka, no Sora.
- **Config:** `src/app/layout.tsx:5` and `admin/app/layout.tsx:5` import only `Urbanist`; `globals.css:3` sets `--font-heading` and `--font-sans` to `Urbanist`; `body { font-family: var(--font-sans) }`.

Why Urbanist: Matches Healixx primary typeface, supports 900 for hero, clean for data.

## 3. Tokens & Colors

Base Healixx tokens (merged into `globals.css:394`):
```
--token-bg: #fff
--token-bg-muted: #f0f5f6
--token-text-muted: #3b3b3b
--token-text: #0a0a0a
--token-accent: #ffce8a
--gosemsas-green: #0a7a3a
--gosemsas-red: #dc2626
--color-primary-navy: #0052A5 (legacy, kept for admin charts)
--color-bg-gray: #F5F7FA → overridden to #ffffff for body
```

Semantic:
- **Primary:** `#0a0a0a` (buttons, headings)
- **Emergency:** `#dc2626` (emergency CTA, stats accent, selection, focus ring, `::selection`)
- **Muted:** `#f0f5f6` (section backgrounds)
- **Accent:** `#ffce8a` (badge, legacy)
- **Red tint:** `#fef2f2` `border-red-100` (partners strip, testimonial cards)

Never use emerald dots for pills; use red `#dc2626` only for emergency affordances.

## 4. Spacing & Layout

- **Max width:** `max-w-[1280px]` centered `px-4`
- **Section gap:** `mt-6` between sections
- **Hero:** `grid lg:grid-cols-2` left `p-8 md:p-10 lg:p-12`, right `bg-[#f0f5f6] p-4 lg:p-6` + `aspect-[4/3] rounded-[24px]` image `UOMUepVQXzu9Z4Iu7nm30ARGDI.png`
- **Why Choose / Simple Steps:** `rounded-[40px] bg-[#f0f5f6]`
- **Partners:** bottom `rounded-[32px] bg-[#fef2f2] border-red-100` → inner `rounded-full border-black/5 bg-[#f0f5f6]` marquee `animate-[marquee_22s_linear_infinite]` with **acronyms underlined red** (`underline decoration-[#dc2626] decoration-2 underline-offset-4 text-[#dc2626]`)

## 5. Typography Scale

- **Hero H1:** `text-3xl md:text-5xl font-black leading-[0.95] tracking-tight` `fontFamily: var(--font-urbanist)`
- **Section H2:** `text-2xl md:text-3xl font-black` `fontFamily: var(--font-urbanist)`
- **Body:** `text-[15px] leading-7 text-black/60`
- **Label:** `text-xs font-bold tracking-widest uppercase`
- **Numbers:** `text-2xl font-black` or `text-4xl` for dashboard

## 6. Components

### Header (`src/components/Header.tsx:5`)
Healixx faithful: outer `rounded-[66px]`, nav `rounded-[16px]`, logo `gosemsas-logo.svg` (144×36), menu `rounded-[10px]` `text-sm font-medium`, emergency `bg-[#dc2626]` pill.

### Footer (`src/components/Footer.tsx:7`)
Healixx: outer `rounded-[24px] bg-[#f0f5f6] md:rounded-[32px]`, inner white `rounded-[20px]` with logo, 3-column menus, `© 2025 GoSEMSAS`, socials `w-8 h-8 rounded-full bg-black`.

### PageHero (`src/components/PageHero.tsx`)
Unified: accepts `kicker`/`crumb`/`badge` + `title`/`subtitle`, renders `bg-[#f0f5f6] border-b` with `label` in `text-[#0a7a3a] uppercase`.

### Dashboard — 11 Slides (`src/components/dashboard/slides/DashboardSlides.tsx:243`)
- **SlideWrapper:** Healixx `rounded-[40px] bg-[#f0f5f6] p-4 md:p-6` → left `380px` card `rounded-[24px] bg-white border-black/5 shadow-[0_8px_30px...]` with illustration centered, title `font-black var(--font-urbanist)`, `w-12 h-1 bg-[#dc2626]` divider; right `flex-1 rounded-[24px] bg-white border-black/5 p-6 md:p-8 overflow-auto`.
- **Slides:** `SlideOverview`, `SlideAmbulanceFleet`, `SlideResmatTeam`, `SlideMedicalFacilities`, `SlideEmergencyCalls`, `SlidePatientTransport`, `SlideEmergencyTypes`, `SlidePerformance`, `SlideCensus`, `SlideLaborDelivery`, `SlideServiceRuns` — all use `rounded-[24px]` cards, `recharts` with Healixx palette, no slate borders (`border-black/5`), red bar `bg-[#dc2626]`.
- **Layout:** `src/app/dashboard/layout.tsx:46` `min-h-screen bg-[#f5f7fa]` → overridden to white, `DashboardHeader`/`Footer` TV-ready; `src/app/dashboard/page.tsx:142` `AnimatePresence` `x:20` `duration 0.35`, poll `/api/live-stats` every `15s`, auto-rotate `48s`, arrow keys.

## 7. Data & Backend

- **Firebase:** `src/lib/firebase.ts:1` (`gosemsas-mock` project, `live_dashboard/{year}` with `updatedAt`, fallback to `data/live-dashboard.json`). `src/app/api/live-stats/route.ts:4` tries Firebase first, then local.
- **Mockups:** `public/mockups/dashboard-mockup.svg`, `phone-mockup.svg`, `ambulance-mockup.png.svg` — removed from landing per request (section deleted), but retained in `public/` for admin/docs.

## 8. Rules

1. **Never add dots** to pills — if you see `::before` with dot, delete it (fixed in `globals.css:141`).
2. **One font:** Import only `Urbanist` in layouts; do not add `Inter`/`Fredoka`/`Sora`.
3. **Red only for emergency:** Use `#dc2626` for emergency CTAs, marquee underlines, and focus rings — not for decoration.
4. **Partners:** acronyms only, red underline `decoration-[#dc2626] decoration-2`, full name in muted `text-black/40` hidden on `sm`.
5. **Test sub-pages:** `/about`, `/services`, `/leadership`, `/organizational-structure`, `/partners`, `/emergency-information`, `/news`, `/gallery`, `/downloads`, `/contact`, `/dashboard` must remain `○ Static` (build verified).

## 9. Verification

```bash
npm run build # semsas 13 routes, admin 2 routes — both ✓
grep -r "gosemsas-logo.svg" src --include="*.tsx" | wc -l  # header/footer
grep -r "OUR PARTNERS" src/app/\(marketing\)/page.tsx # partners below, moving right
grep -r "w-1.5.*bg-\[#dc2626\]" src | wc -l  # 0 (dots removed)
grep -r "section-tag::before" src/app/globals.css # display: none
grep -r "Urbanist" src/app/layout.tsx # single font
```

Keep dev servers open for visual check:
- `http://localhost:3000` semsas
- `http://localhost:3001` semsas/admin
- `http://localhost:8080` healixx static
