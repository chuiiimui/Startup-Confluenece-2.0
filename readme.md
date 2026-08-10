# Startup Confluence 2.0

Official website for **Startup Confluence 2.0** — India’s premier startup summit at United Incubation Hub (UIH), Prayagraj.

Built with **Next.js** (App Router) so pages ship server-rendered HTML first, then hydrate for animations, 3D, and forms.

## Stack

- [Next.js](https://nextjs.org/) 16 + React 19 + TypeScript
- Tailwind CSS
- Framer Motion, Lenis (smooth scroll)
- React Three Fiber (optional 3D, gated on low-end devices)
- Google Apps Script + Sheets for registration / partner forms

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Next.js development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run optimize:gallery` | Compress gallery assets (`scripts/optimize-gallery.mjs`) |

## Environment

Copy `.env.example` to `.env`:

```env
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Form submissions (register / partner / sponsor) POST to this Apps Script web app. Setup notes: [`docs/EMAIL_SETUP.md`](docs/EMAIL_SETUP.md).

## Routes

| Path | Page |
|------|------|
| `/` | Home (hero, about, highlights, team, register, contact) |
| `/speakers` | Speakers |
| `/experience` | Experience + pitching arena |
| `/schedule` | Event schedule |
| `/expo` | Startup expo |
| `/gallery` | Photo gallery |
| `/sponsors` | Sponsors |
| `/team` | Organizers & organizing team |
| `/venue` | Venue + FAQ |
| `/register` | Registration guidelines + form |
| `/partner` | Partner / sponsor offerings + form |

## Project structure

```
app/                 # Next.js App Router pages + root layout
src/
  components/        # UI, navbar, modals, 3D canvas wrappers
  sections/          # Page sections (Hero, Team, Footer, …)
  views/             # Client page compositions used by app/*
  data/              # Static content (team, schedule, gallery, …)
  context/           # Theme + registration modal state
  hooks/             # Perf mode and shared hooks
  assets/            # Images (team, organizers, gallery)
google-apps-script/  # Apps Script backend for forms
public/              # Static public assets
```

## Forms backend

Registration and partner/sponsor flows live in:

- `src/components/RegistrationModal.tsx`
- `src/components/PartnerModal.tsx`

They send JSON to `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`. The Apps Script project under `google-apps-script/` writes to Google Sheets and can send confirmation emails.

## Deploy

### Hostinger (recommended for this project)

Full step-by-step guide for how the app **builds and starts** on Hostinger Node.js Web Apps:

→ **[docs/HOSTINGER_DEPLOYMENT.md](docs/HOSTINGER_DEPLOYMENT.md)**

Short version:

1. Hostinger plan with **Node.js Web Apps** (Business / Cloud).
2. Deploy from GitHub in hPanel → framework **Next.js**.
3. Build: `npm run build` · Start: `npm run start -- -p $PORT` · Output: `.next`.
4. Set env: `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`.
5. Wait until status is **Running**, then open your domain.

### Generic Node host

```bash
npm ci
npm run build
npm run start -- -p 3000
```

Or deploy to any Next.js host (Vercel, etc.) and set `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` in the host environment.

## License

Private event site for Startup Confluence / United Incubation Hub.
