# UrbanNest — Home services marketplace UI

A responsive home-services booking experience built with Next.js App Router, React, TypeScript, Tailwind CSS and Lucide icons.

## Included

- Premium responsive landing page and service catalog with category filters and search
- Booking form with required-field validation and a confirmation state
- Demo bookings saved in browser `localStorage` and displayed on the customer dashboard
- Login and signup interface states (clearly marked as demo; no authentication is connected)
- Sample admin dashboard
- Responsive mobile navigation and accessible form labels

## Run locally

Requires Node.js 20.9 or later.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Important demo limitations

This repository is a frontend prototype. It does not include a server/database, real authentication, SMS/email notifications, provider assignment, payment processing, or live admin data. Booking requests remain in the browser that created them. Before launch, connect a secure backend (for example PostgreSQL with Prisma), authentication, payment provider, and appropriate privacy/security controls. The UrbanNest branding and sample reviews/metrics are illustrative.

## Routes

- `/` — Homepage
- `/services` — Searchable/filterable service catalog
- `/book` — Booking request form
- `/login`, `/signup` — Demo auth screens
- `/dashboard` — Locally saved demo bookings
- `/admin` — Illustrative admin dashboard
