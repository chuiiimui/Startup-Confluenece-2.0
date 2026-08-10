# Hostinger deployment guide — Startup Confluence 2.0

Complete guide for deploying and **starting** this Next.js site on Hostinger Node.js Web Apps (hPanel).

Official Hostinger references:

- [Node.js overview](https://docs.hostinger.com/node.js/overview)
- [Next.js on Hostinger](https://docs.hostinger.com/node.js/overview-1/next)
- [Creating a Node.js app](https://docs.hostinger.com/node.js/creating-an-app)

---

## 1. What you need

| Requirement | Details |
|-------------|---------|
| Hostinger plan | **Business** or **Cloud** hosting with **Node.js Web Apps** enabled |
| Node.js | **20** or **22** (recommended). This project needs Node **20+** |
| Code on GitHub | Recommended for auto-deploy (or upload a ZIP) |
| Domain | Connected in hPanel (or use the temporary Hostinger URL first) |

This app is a **Next.js SSR / Node server** app (not a static HTML export). Hostinger must run `next start` and keep the Node process alive.

---

## 2. How the site starts on the server

When Hostinger deploys this project, the platform does roughly this:

```text
1. Clone repo (or unpack upload)
2. npm install / npm ci
3. npm run build          → creates .next/
4. npm run start -- -p $PORT
5. Reverse-proxy your domain → that Node process
```

### What each step does

| Step | Command | Result |
|------|---------|--------|
| Install | `npm ci` or `npm install` | Installs dependencies from `package.json` |
| Build | `npm run build` | Runs `next build`, outputs production files into `.next/` |
| Start | `next start -p $PORT` | Starts the Next.js production server on the **port Hostinger assigns** (`$PORT`) |
| Keep alive | Hostinger process manager | Restarts the app if it crashes; use **Restart** in hPanel when needed |

**Important:** Do **not** run `npm run dev` on Hostinger. That is for local development only.

After a successful deploy you should see the app status as **Running** in hPanel. Opening your domain hits the live Next.js server.

---

## 3. Exact hPanel settings for this project

When creating the Node.js Web App, use:

| Field | Value |
|-------|--------|
| Framework / application type | **Next.js** (`next`) |
| Node.js version | **20** or **22** |
| Root directory | `/` (repo root — where `package.json` lives) |
| Install command | `npm ci` (or `npm install`) |
| Build command | `npm run build` |
| Output directory | `.next` |
| Start / entry | Leave empty if Hostinger auto-runs Next, **or** set explicitly: `npm run start -- -p $PORT` |
| Entry file | Leave empty for Next.js SSR (Hostinger runs `next start`) |

### `package.json` scripts this repo already has

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "preview": "next start"
  }
}
```

On Hostinger, always prefer:

```bash
npm run start -- -p $PORT
```

so the app listens on the platform port (not a hard-coded `3000`).

---

## 4. Deploy from GitHub (recommended)

### A. Prepare the repo

1. Push this project to a GitHub repository (`main` or `master`).
2. Confirm locally before deploy:

```bash
npm ci
npm run build
npm run start -- -p 3000
```

Open `http://localhost:3000` and verify the site loads.

### B. Create the Web App in hPanel

1. Log in to **Hostinger hPanel**.
2. Go to **Websites** → **Add Website**.
3. Choose **Node.js web app** (may appear as **Node.js Apps** / **Deploy Web App**).
4. Select **Import Git repository** → **Connect with GitHub**.
5. Authorize the Hostinger GitHub App and select this repository.
6. Pick the branch (usually `main`).
7. Apply the settings from **section 3** above.
8. Add environment variables (section 5).
9. Click **Deploy**.

Hostinger will install, build, and start the app. When status is **Running**, open your domain.

### C. Later updates

Push to the connected branch → Hostinger rebuilds and restarts automatically (if auto-deploy is enabled).  
Or trigger a manual redeploy from the Web App dashboard.

To restart without rebuilding: open the app → **Running** → **Restart**.

---

## 5. Environment variables (required)

In the Hostinger Web App → **Environment variables** (or Build settings → Env), add:

| Name | Example | Required |
|------|---------|----------|
| `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` | `https://script.google.com/macros/s/XXXX/exec` | Yes — registration & partner forms |
| `NODE_ENV` | `production` | Usually set automatically |

Copy the value from your local `.env` / `.env.example`.

```env
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

### Notes

- Variables prefixed with `NEXT_PUBLIC_` are baked into the **client bundle at build time**. If you change them, you must **redeploy / rebuild**, not only restart.
- Do not commit real secrets into Git if you rotate keys; set them only in Hostinger.
- Forms backend setup: [`EMAIL_SETUP.md`](./EMAIL_SETUP.md).

After changing env vars → **Redeploy** (full build), not just Restart.

---

## 6. Domain, SSL, and DNS

1. In hPanel, attach your domain to the Node.js Web App (or point DNS A/CNAME as Hostinger instructs).
2. Enable **SSL** (Let's Encrypt) from hPanel for HTTPS.
3. Wait for DNS propagation, then visit `https://your-domain.com`.

If the domain was already used by another Hostinger site, remove or reassign that site first (take a backup).

---

## 7. Alternative: deploy by file upload

If you are not using GitHub:

1. On your PC, ensure the project builds:

```bash
npm ci
npm run build
```

2. Zip the project **including** source files and `package.json` (Hostinger will install & build on the server).  
   Typically **exclude**: `node_modules/`, `.next/` (optional — Hostinger rebuilds anyway), `.git/`.

3. hPanel → **Add Website** → **Node.js web app** → **Upload**.
4. Use the same build/start settings as section 3.
5. Add env vars → Deploy.

Uploading a pre-built `.next` folder alone is **not** enough unless Hostinger’s UI is configured for a custom start layout; prefer letting Hostinger run `npm run build` on the server.

---

## 8. Optional: VPS / Cloud VPS with PM2

If you use a Hostinger **VPS** instead of managed Node Web Apps:

```bash
# SSH into the VPS
git clone <your-repo-url> app
cd app
cp .env.example .env   # edit NEXT_PUBLIC_GOOGLE_SCRIPT_URL
npm ci
npm run build

# Install PM2
npm install -g pm2

# Start on port 3000 (or put Nginx in front)
PORT=3000 pm2 start npm --name "startup-confluence" -- start -- -p 3000
pm2 save
pm2 startup
```

Put **Nginx** (or Caddy) in front as a reverse proxy to `127.0.0.1:3000`, and terminate SSL there.

---

## 9. Verify the live site

Checklist after **Running**:

- [ ] Home page loads (`/`)
- [ ] Other routes work (`/team`, `/register`, `/partner`, etc.)
- [ ] Theme toggle works
- [ ] Registration modal submits (check Google Sheet)
- [ ] Partner/sponsor form submits
- [ ] HTTPS padlock is valid
- [ ] Mobile layout looks correct

---

## 10. Troubleshooting

| Problem | What to do |
|---------|------------|
| Build fails on Hostinger | Run `npm run build` locally and fix errors. Check Node version is 20+. |
| App builds but site is blank / 502 | Confirm start command uses `-p $PORT`. Click **Restart**. Check deploy logs. |
| Env var not applied | Rebuild/redeploy after changing `NEXT_PUBLIC_*` vars. |
| Forms fail | Verify `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` and Apps Script web app deployment (Anyone access). See `EMAIL_SETUP.md`. |
| Old content after push | Hard-refresh browser; confirm latest deploy succeeded; clear CDN cache if enabled. |
| Out of memory on build | Upgrade plan / Node resources; avoid building huge assets on tiny instances. |
| Wrong root directory | Root must contain this repo’s `package.json` and `app/` folder. |

### Useful local commands that mirror the server

```bash
# Clean install + production build
npm ci
npm run build

# Same start style as Hostinger
npm run start -- -p 3000
```

---

## 11. Quick reference card

```text
Plan:     Hostinger Business / Cloud (Node.js Web Apps)
Runtime:  Node 20 or 22
Mode:     Next.js SSR (next start) — NOT static export
Install:  npm ci
Build:    npm run build
Start:    npm run start -- -p $PORT
Output:   .next
Env:      NEXT_PUBLIC_GOOGLE_SCRIPT_URL=...
Restart:  hPanel → Web App → Running → Restart
```

---

## 12. Project files related to hosting

| Path | Role |
|------|------|
| `package.json` | `build` / `start` scripts Hostinger runs |
| `next.config.ts` | Next.js production config |
| `app/` | App Router pages |
| `.env.example` | Template for Hostinger env vars |
| `docs/EMAIL_SETUP.md` | Google Apps Script forms |
| `docs/HOSTINGER_DEPLOYMENT.md` | This document |

---

If deployment still fails, copy the **Build logs** and **Runtime logs** from the Hostinger Web App dashboard — those usually show the exact missing env var, port bind error, or build failure.
