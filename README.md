# ExamHub

A from-scratch React + TypeScript clone of an exam-prep marketplace landing page — matching layout, spacing, and interaction patterns, with original catalog content (SAT/ACT/GRE/GMAT courses, exam-day readiness checks, olympiad coaching, research mentorship, and internship matching).

## Stack

- **React 19** + **TypeScript**
- **Vite 8** for dev/build
- **Tailwind CSS v4** (via `@tailwindcss/vite`, design tokens in `src/index.css`)
- **Framer Motion** for scroll/hover animation
- **lucide-react** for icons

## Structure

```
src/
  index.css              design tokens, fonts, base styles
  data/catalog.ts         typed catalog: exam tiers, readiness, contests, tools, bundles
  lib/cn.ts                classnames helper
  components/
    primitives.tsx         Button, Pill, Sticker, Check, SectionHeading
    Header.tsx              sticky nav, dropdown, mobile menu
    Hero.tsx                 search + category filters
    CommunityBand.tsx
    JumpTo.tsx
    TrustSection.tsx        ratings, reviews, score cards
    ExamSection.tsx          per-exam tier comparison
    ProductCard.tsx          product card + tier compare grid
    CollectionSection.tsx    readiness / bundles / contests / tools
    CatalogGrid.tsx          filtered catalog with animated empty state
    ServicesSection.tsx, Footer.tsx, ChatBubble.tsx
  App.tsx                  search/category state, filtering
```

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build
npm run preview
```
