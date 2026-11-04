# UrbanNest — home-services marketplace MVP

This Next.js app now includes database-backed accounts, sessions, services, and booking requests. It is an MVP foundation, not a fully launched marketplace: provider assignment, payment collection, email/SMS, and security review are still future work.

## Required setup

1. Create a free PostgreSQL project in Supabase.
2. In Supabase, copy the PostgreSQL connection string from **Project Settings → Database**. Use the pooled connection string for Vercel if supplied by Supabase.
3. Set `DATABASE_URL` locally in `.env` and in Vercel **Project → Settings → Environment Variables**. Use the same variable in Production and Preview. Never commit your real database URL/password.
4. Install and initialize the schema:

```bash
npm install
npx prisma db push
npm run db:seed
npm run dev
```

Open http://localhost:3000.

## Vercel database setup

After setting `DATABASE_URL` in Vercel, redeploy so Prisma Client can generate and the server can connect. `prisma db push` is a one-time schema setup command; run it locally against the Supabase URL after setting `.env`. Do not put database credentials in frontend/client code.

## Included

- Signup/login with bcrypt-hashed passwords and HTTP-only session cookies
- Service API backed by PostgreSQL
- Authenticated booking creation and customer-specific booking list
- Database-backed admin summary page (admin role must be granted by an operator directly in the database)
- Server-side input validation with Zod

## Limitations and production requirements

- No payments, provider onboarding/assignment, slot conflict handling, email/SMS, or password reset yet.
- Admin role must never be selectable in public signup; grant it only through a trusted database operation.
- Add rate limiting, email verification, audit logging, backups, privacy/terms pages, and a security review before a public commercial launch.
- Vercel Hobby is intended for personal, non-commercial use; check the current provider terms before using it for a business.

## Routes

- `/` — Homepage
- `/services` — Service catalog
- `/book` — Booking request form (login required to submit)
- `/signup`, `/login` — Database-backed account screens
- `/dashboard` — Signed-in user's bookings
- `/admin` — Restricted operational dashboard
