# Registration email setup (Google Apps Script)

This sends a **confirmation email to the submitter only** when Startup / Sponsor / Partner / Speaker / Delegate forms are submitted. Data is saved to your Sheet’s tabs.

## Switch to a Sheet you own (fixes “no permission” on deploy)

Deploy fails when the Apps Script is attached to a Sheet you don’t own / can’t deploy for.

Do this instead:

1. Sign into **your** Google account in Chrome.
2. Create a **new** Google Sheet (or open one you own).
3. Rename tabs to exactly:
   - `Startup`
   - `Sponsor`
   - `Partner`
   - `Speaker`
   - `Delegate`
4. Copy the Sheet ID from the browser URL:
   `https://docs.google.com/spreadsheets/d/`**`SHEET_ID_HERE`**`/edit`
5. Go to [script.google.com](https://script.google.com) → **New project** (same account).
6. Paste [`google-apps-script/Code.gs`](../google-apps-script/Code.gs).
7. Set this line near the top — **ID only, not the full URL**:
   ```js
   // GOOD:
   var SPREADSHEET_ID = '11mb5ve-0zL5jlt4KhEjHgnNdlH9tlfULf7u7Z1o8Qmw';
   // BAD (causes "Illegal spreadsheet id"):
   // var SPREADSHEET_ID = 'https://docs.google.com/spreadsheets/d/.../edit';
   ```
8. Save → Run `doGet` → **Allow** → Deploy as Web app (**Execute as: Me**, **Anyone**).

Do **not** try to redeploy the old script that lives on someone else’s Sheet.

## 1. Prepare the Sheet

1. Use a spreadsheet **owned by your Google account**.
2. Make sure you have **exactly these 5 tab names** (case-sensitive):
   - `Startup`
   - `Sponsor`
   - `Partner`
   - `Speaker`
   - `Delegate`
3. Headers are created automatically on first submit (or you can leave the first row empty).

If your tabs use different names, edit `SHEET_NAMES` at the top of [`google-apps-script/Code.gs`](../google-apps-script/Code.gs).

## 2. Paste the script

**Option A (recommended):** standalone project at [script.google.com](https://script.google.com) + set `SPREADSHEET_ID`.

**Option B:** open *your* Sheet → **Extensions → Apps Script** → paste code (leave `SPREADSHEET_ID` empty).

1. Delete any default code in `Code.gs`
2. Copy everything from [`google-apps-script/Code.gs`](../google-apps-script/Code.gs)
3. Paste into `Code.gs` → set `SPREADSHEET_ID` if using Option A → **Save**

## 3. Authorize

1. In Apps Script, select function `doGet` → click **Run**
2. Choose your Google account → **Allow** (Sheets + Gmail/Mail)
3. You should see a JSON “Web app is live” style response if you later open the URL

## 4. Deploy Web App

1. **Deploy → New deployment**
2. Gear icon → **Web app**
3. Settings:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. **Deploy** → copy the **Web app URL** (`…/exec`)

## 5. Connect the website

Option A — env file (recommended):

1. Create `.env` in the project root:

```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

2. Restart `npm run dev`

Option B — paste the URL into `GOOGLE_SCRIPT_URL` in `src/components/RegistrationModal.tsx`.

## 6. Redeploy after every script change

**Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy**

If you skip this, the live URL keeps the old code (no emails).

## 7. Test

1. Run the site locally
2. Submit each form type with **your real email**
3. Check:
   - New row on the correct Sheet tab
   - Confirmation email in Inbox (and Spam once)

## Troubleshooting

| Problem | Fix |
|---|---|
| Sheet updates, no email | Re-authorize Mail permissions; check Spam; confirm `email` field is filled |
| Missing sheet tab error | Rename tabs to `Startup`, `Sponsor`, `Partner`, `Speaker`, `Delegate` |
| Website still uses old behavior | Create a **New version** deployment |
| Daily send limit | Gmail/MailApp quotas apply; fine for typical event volume |

## Email content

Submitters get a **form-specific** confirmation email (not a generic message):

- **Startup** — startup details, stall/accommodation/pitch summary + next steps
- **Sponsor** — sponsorship type, amount, organization + partnership follow-up
- **Partner** — partner category + review next steps
- **Speaker** — speaker name, topic, organization + curation next steps
- **Delegate / Visitor** — name, selected events, ID reminder + check-in next steps

Each email also includes contact: `startupconfluence@ugi.edu.in` · +91-6390903018 · +91-89536 15232
