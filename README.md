# GoSEMSAS — Gombe State Emergency Medical Services and Ambulance System

> Official digital platform for the Gombe State implementation of Nigeria's National Emergency Medical Services and Ambulance System (NEMSAS). **Emergency Dispatch: `0703 382 5646` — 24/7 statewide.**

Gombe State Emergency Medical Services and Ambulance System (GoSEMSAS) bridges the critical gap between medical emergencies — road traffic accidents, trauma, maternal complications, sudden illness — and health facilities. The platform delivers rapid ambulance dispatch, pre-hospital stabilization, and coordinated hospital referrals across all **11 LGAs** of Gombe State: Gombe, Akko, Balanga, Kwami, Kaltungo, Yamaltu Deba, Billiri, Dukku, Funakaye, Nafada, and Shongom.

This repository contains two applications: the **public website + live dashboard** (`/`), and the **internal admin console** (`/admin`).

---

## What It Does

GoSEMSAS is a **public-facing operational portal + real-time transparency dashboard + internal data management system**, organized around four functional pillars:

### 1. Public Information & Trust Building
Educates citizens on what SEMSAS is, how it fits under the National framework (FMOH → NEMSAS → Gombe SEMSAS), who leads it, and who partners support it.

### 2. Emergency Access & Guidance
Makes it immediate to **request help** and know what to do **before help arrives** — hotlines, triage rules, step-by-step first-aid, and FAQ.

### 3. Transparency & Live Reporting
Publishes live operational metrics — fleet distribution, response times, survival rates, maternal transport volumes — through an auto-rotating public dashboard backed by yearly datasets.

### 4. Operational Data Management
Provides authorized staff a dedicated console to update every dashboard metric without code deploys, with yearly versioning (2025/2026) and live publishing.

---

## Key Functionalities

### Marketing & Informational Site (`src/app/(marketing)/`)

| Route | Purpose | Key Functional Content |
|---|---|---|
| **`/` Homepage** | Entry point + emergency action | Hero with emergency CTA, coverage claim (11 LGAs, 24/7), 6 service cards (Ambulance, Pre-hospital Care, Dispatch, Patient Transport, Road Crash Response, Training), 6-step workflow (Call → Verify → Assign → Dispatch → Stabilization → Transit), Mission/Vision, Why Choose SEMSAS, stats with animated counters, news preview, partners strip |
| **`/about`** | Institutional credibility | Who We Are (SEMSAS as NEMSAS bridge), Mission & Vision cards, 6 Core Values (Professionalism, Integrity, Compassion, Rapid Response, Teamwork, Excellence), 8 Strategic Objectives (statewide rapid response, referral strengthening, workforce capacity, disaster support etc.) |
| **`/services`** | Service catalogue | 12 detailed services: Emergency Ambulance, Dispatch (0703 382 5646 routing), Pre-hospital Care (BLS/ACLS), Road Traffic Crash Response (joint FRSC), Patient Referral, Disaster & Mass Casualty, Training, Community Awareness, Medical Event Coverage, Fleet Management, Equipment Support, Hospital Coordination + infographic patient-care workflow (6 steps) |
| **`/leadership`** | Accountability | State Coordinator message (Dr. Suraj Abdulkarim — “Securing Health, Preserving Lives”), Management Team cards: Head of Admin (Dr. Bello Abdulkadir), Head of Claims (Dr. Maspara Gideon), Head of M&E (Halima Musa Miyabe), Strategic Information (Muhammad Sanusi Ahmad), ICT Focal Person |
| **`/organizational-structure`** | Governance clarity | Interactive 7-level hierarchy (Federal Ministry of Health → NEMSAS National → Gombe SEMSAS → Emergency Communication & Dispatch Centre → Ambulance Operations → Receiving Health Facilities → Strategic Partners) with expandable responsibility descriptions + 3-tier responsibility matrix (Federal Policy / State Governance / Community Field Operations) |
| **`/partners`** | Partnership network | 8 partners filterable by category: FMOH, NEMSAS National, FRSC, NEMA, Gombe SEMA, Gombe State Specialist Hospital, Nigerian Police Force, Nigerian Red Cross; category filters (Government, Emergency Agencies, Healthcare Institutions, NGOs) |
| **`/emergency-information`** | Triage & education (critical) | 6 emergency hotlines (SEMSAS Primary, Ambulance, SEMA, FRSC 122, Fire Service 112, Police 999), 10 triggers for when to call (chest pain, breathing difficulty, road accidents, severe bleeding, stroke, unconsciousness, labour emergencies, poisoning, burns, mass casualty), 7 pre-arrival first-aid steps (stay calm → clear airway → wait safely), 8-item FAQ accordion (24/7 availability, who can call, free 48-hour stabilization under NEMSAS, inter-hospital transfers) |
| **`/news` + `/news/[id]`** | Newsroom | Featured article, search + category filter (Emergency Response, Road Safety, Training, Community Outreach, Government, Public Health etc.), 6+ articles: RESMAT onboarding in Malam Sidi/Kwami, Community sensitization with pregnant mothers, Ambulance service launch by Commissioner of Health, CEMTTOS/NURTW orientation, SEMSAS Room launch |
| **`/gallery`** | Media evidence | Photos / Videos tabs, category filter (Emergency Response, Ambulances, Training, Community Outreach, Events), ~25+ images (advocacy visits, ambulance fleet inspection, maternal outreach), masonry grid with lightbox (next/prev, metadata: location, date, category) |
| **`/downloads`** | Resource portal | 8 official documents: Emergency Preparedness Guide, First Aid & BLS Manual, Referral Handover Form, Emergency Contact Pocket Card, Public Awareness Booklet, Annual Review Report, Strategic Expansion Plan 2026-2030, Operational Triage Policy; searchable, filterable by 9 categories; View Online / Download actions |
| **`/contact`** | Access & enquiries | HQ address (Ministry of Health Complex, Gombe), Admin line + Emergency dispatch line, office hours (Admin Mon–Fri 8–4, Emergency 24/7), validated contact form (name/email/phone/subject/message + consent), 5-department directory (Emergency Operations, Administration, Clinical Training, Media & Relations, Fleet Management) |
| **Header / Footer** | Global navigation | Sticky header with utility bar (24/7 notice, email, hotline), nav with dropdowns (About, Media Room), active-state indicators, mobile drawer; footer with brand, quick links, emergency contact card, resources, socials, copyright |

### Live Public Dashboard (`src/app/dashboard/`)

Fullscreen, TV-ready carousel at `/dashboard` — public transparency layer. **11 auto-rotating slides** (48s interval, pause/resume, arrow-key navigation, polls `/api/live-stats` every 15s, yearly toggle 2025/2026):

1.  **Overview** — Total Emergencies (1628), Lives Saved (783), Patients Transported (1951), Total Ambulances (55), system status “All Systems Working”
2.  **Ambulance Fleet** — Total fleet + bar chart by LGA (e.g., Gombe 14, Akko 10) with color thresholds (10+ green, 4–9 amber, 1–3 red)
3.  **RESMAT Team** — CEMTTOS Offices (82) + Volunteer Drivers (580) = 662 Total Personnel, donut pie
4.  **Medical Facilities** — MAMII/Remonic (83) vs CEmoNC (28) = 111 total, donut + zonal distribution (Gombe Central/North/South/East)
5.  **Emergency Calls / Daily Dispatch** — Calls Received (47), Successful Interventions (43), Avg Response 14:30, hourly area chart (6AM–12AM)
6.  **Patient Transport (RESMAT)** — Safe Deliveries (783), Other Emergencies (236), RESMAT Cases (1000), monthly bar chart Jun–Dec 2025
7.  **Emergency Types** — Labor Complications (Prolonged Labor 36, Bleeding 18 etc.) vs Pregnancy Complications (Bleeding, Eclampsia etc.), dual pie with icons + percentages
8.  **Performance** — Survival Rate 97.2%, Satisfaction 89%, Coverage 75%, Response Time Target vs Actual
9.  **Census / Where We Serve** — Population & ambulance ratio per LGA (e.g., Gombe 1:19,181, Funakaye 1:123,323), average per LGA, grid of LGA cards
10. **Monthly Labor & Delivery Cases** — Total/average deliveries, line chart Jun–Dec 2025
11. **Ambulance Service Runs** — Total patients moved (1951), monthly bar Mar–Dec, table with % of total

Data source: `data/live-dashboard.json` + `src/lib/default-dashboard-data.ts` (yearly seeded defaults). API: `src/app/api/live-stats/route.ts` supports `GET ?year=2025|2026` and authenticated `POST` updates.

### Internal Admin Console (`admin/` — separate Next.js app, port 3001)

Dedicated operations tool for authorized SEMSAS staff — not public.

*   **Year-aware editing** — Switch 2025 / 2026 datasets, “Current” badge.
*   **11 tabbed editors** mirroring dashboard slides: Overview, Fleet (per-LGA inputs), RESMAT Team (auto-total), Facilities (zonal distribution), Emergency Calls (hourly trends), Transport (monthly breakdown with auto-total), Emergency Types (labor/pregnancy counts), Performance, Census (population/ambulances with auto-ratio `1:X`), Trends (monthly emergencies/deliveries), Service Runs (monthly runs with auto-sum).
*   **Live preview** — Renders the exact `DashboardSlides` component for the active tab, so editors see TV output in real time.
*   **State management** — Dirty indicator (Unsaved vs Live), reload, publish flow `POST /api/live-stats?year=` with `NEXT_PUBLIC_ADMIN_SECRET_KEY` bearer, success/error toasts.
*   **Header/footer fidelity** — Matches live dashboard branding (NEMSAS/FMOH/World Bank/Gombe logos), emergency hotline (112 in footer), slide indicators.

---

## Who It Is For

| Audience | How the Platform Serves Them |
|---|---|
| **Citizens & Residents (11 LGAs)** | Primary users — find the emergency number, understand when to call, get pre-arrival instructions; urban + rural coverage explicitly messaged |
| **Patients & Families — especially maternal health** | RESMAT-focused outreach: sensitization content, safe-delivery transport stats, contact cards, first-aid guides |
| **Callers / Bystanders** | Can call on behalf of strangers; guided via dispatcher triage steps listed on site |
| **CEMTTOs, Volunteer Drivers, NURTW Drivers, Paramedics/EMTs** | Operational workforce — training manuals, orientation content, fleet/role visibility, dispatch protocol documentation |
| **Receiving Health Facilities & Hospital Staff** | Pre-alert workflow, referral/handover forms (downloadable), facility distribution data |
| **Gombe State Government & Ministry of Health** | Oversight, budgeting, KPI review via dashboard performance/census/fleet coverage |
| **Federal Bodies (FMOH, NEMSAS National)** | Alignment with national standards, evaluation of state implementation |
| **First-Responder Partners (FRSC, NEMA/SEMA, Fire Service, Nigerian Police, Red Cross)** | Joint operation protocols, highway crash response coordination, disaster/mass-casualty workflows |
| **Donors & Development Partners (e.g., World Bank)** | Transparency metrics, annual reports, strategic expansion plan visibility |
| **Media, Researchers, NGOs** | Newsroom, gallery, downloadable policies/reports, open operational statistics |
| **SEMSAS Administrators** | Day-to-day data custodians via the `admin/` console — update live metrics without code changes |

---

## Project Structure

```
semsas/                              # Main public site (Next.js, port 3000)
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout (font, globals)
│   │   ├── globals.css
│   │   ├── (marketing)/             # Public informational site (header/footer shell)
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx             # Homepage
│   │   │   ├── about/               # About SEMSAS
│   │   │   ├── services/            # Service catalogue
│   │   │   ├── leadership/          # Coordinator + team
│   │   │   ├── organizational-structure/
│   │   │   ├── partners/
│   │   │   ├── emergency-information/
│   │   │   ├── news/ & news/[id]/
│   │   │   ├── gallery/
│   │   │   ├── downloads/
│   │   │   ├── contact/
│   │   │   └── admin/               # Public admin entry (placeholder)
│   │   ├── dashboard/               # Public live dashboard (11-slide carousel)
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx           # Dashboard shell + LiveUpdates context
│   │   └── api/live-stats/route.ts  # GET/POST API for dashboard data
│   ├── components/
│   │   ├── Header.tsx / Footer.tsx / PageHero.tsx
│   │   ├── LeaderTeamCard.tsx / AnimatedCounter.tsx / Skeleton.tsx
│   │   └── dashboard/
│   │       ├── DashboardHeader.tsx / DashboardFooter.tsx / DashboardStats.tsx
│   │       └── slides/DashboardSlides.tsx  # 11 slide visualizations + SVG illustrations
│   └── lib/
│       ├── default-dashboard-data.ts # Yearly seeds (2025 populated, 2026 zeroed)
│       ├── live-data.ts
│       └── motion-variants.ts
├── data/
│   └── live-dashboard.json          # Persistent store { 2025: {...}, 2026: {...} }
├── public/
│   └── images/                      # Ambulance, personnel, logos (nemsas, fmoh, worldbank, moh-gombe)
├── next.config.ts / tsconfig.json / eslint.config.mjs / postcss.config.mjs
└── package.json

admin/                               # Internal admin console (separate Next.js app, port 3001)
├── app/
│   ├── page.tsx                     # 11-tab editor with live slide preview + publish flow
│   ├── layout.tsx
│   └── globals.css
├── components/dashboard/slides/     # Reused slide visualizations for preview fidelity
├── lib/default-dashboard-data.ts
└── package.json
```

---

## Getting Started

### Main Site

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm start
npm run lint
```

### Admin Console

```bash
cd admin
npm install
npm run dev        # http://localhost:3001
npm run build
npm start
```

Environment (admin publishing):

```bash
NEXT_PUBLIC_API_URL=https://<main-site-url>   # where live-stats API lives
NEXT_PUBLIC_ADMIN_SECRET_KEY=<shared-secret>   # Bearer token for POST /api/live-stats
```

### Live Data

*   Default: `data/live-dashboard.json` → `GET /api/live-stats?year=2025`
*   Fallback: `src/lib/default-dashboard-data.ts` if no live data exists
*   Publish: `POST /api/live-stats?year=<year>` with JSON body matching `DashboardData` shape; requires `Authorization: Bearer <ADMIN_SECRET>`

---

## Deployment

The easiest way to deploy the Next.js apps is the [Vercel Platform](https://vercel.com/new). See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for details. Deploy `semsas/` and `admin/` as separate Vercel projects and set `NEXT_PUBLIC_API_URL` in the admin project to point to the main site.

---

## Learn More (Next.js)

*   [Next.js Documentation](https://nextjs.org/docs)
*   [Learn Next.js](https://nextjs.org/learn)
*   [Next.js GitHub](https://github.com/vercel/next.js)

## Design System
See [design.md](./design.md) for Healixx-faithful tokens, single Urbanist font, and Helix-only components.

