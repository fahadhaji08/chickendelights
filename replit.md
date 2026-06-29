# Chicken Delights

A premium frozen snacks menu website for Chicken Delights, Mira Road Mumbai — lets customers browse 60+ products, build a cart, and send their order via WhatsApp.

## Run & Operate

- `pnpm --filter @workspace/chicken-delights run dev` — run the frontend (port auto-assigned)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, framer-motion
- Fonts: Playfair Display, DM Sans, Bebas Neue (Google Fonts)
- No backend — pure frontend with WhatsApp ordering

## Where things live

- `artifacts/chicken-delights/src/` — all frontend source
- `artifacts/chicken-delights/src/context/CartContext.tsx` — cart state
- `artifacts/chicken-delights/src/components/` — all UI components
- `artifacts/chicken-delights/src/pages/Home.tsx` — main page

## Product

- Browse 60+ premium frozen chicken & mutton snacks in 6 categories
- Filter by category (Seekh Kabab, Kababs & Patties, Mutton, Sausages, Fried & Snacks, More Snacks)
- Add items to cart with qty steppers; cart shows total
- One-tap WhatsApp order sends a formatted itemized list to +919373295037
- Instagram link to @chickendelights.in

## Architecture decisions

- Frontend-only: no API/database — products are static data in the app
- Cart state via React Context (no persistence — resets on refresh)
- WhatsApp ordering via wa.me deeplink with URL-encoded order message
- Single dark theme (no light/dark toggle) — embers-at-night aesthetic

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Google Fonts @import must be the FIRST line of index.css (before @import "tailwindcss")
- All CSS custom property placeholders ("red") in index.css must be replaced with real values
