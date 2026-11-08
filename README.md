# SkillBridge — Frontend Demo Prototype

An interactive **frontend-only** prototype for the university startup concept SkillBridge: a managed two-sided marketplace connecting Almaty SMEs and screened university students through fixed-scope Micro-Cases.

**All users, transactions, reviews and displayed sample cases are fictional demonstration data. No real money is processed. This is not a secure production marketplace.**

## Quick start

1. Download or clone this repository.
2. Open `index.html` in a modern browser (Chrome, Edge or Firefox). No build tools, database, server or network access are required for basic use.
3. If your browser limits some functionality when opened with `file://`, launch a **static** local server (not a backend):

   ```bash
   python3 -m http.server 8000
   ```

   Then open `http://localhost:8000/`.

4. Click **Demo account** to switch between Employer, Student and Administrator profiles.

## Five-minute demo

1. Switch to **Alma Market (SME)**, select **Product Catalog**, complete the brief and select **Pay (Demo)**. No card details are requested.
2. Switch to **SkillBridge Manager (Admin)**, open the new matching order and assign **Алия М.** (already has the relevant catalog test qualification).
3. Switch to **Алия М. (Student)**, open the assigned order, click **Start Work**, enter a synthetic result and **Submit Work**.
4. Switch to **Admin**, complete the four-point QA checklist and send the result for client review.
5. Switch to **SME**, approve the submitted deliverable.
6. Switch to **Admin**, release the **demonstration** student payout.
7. Switch to **SME**, leave a review. Switch to **Student** to view the completion history, optional portfolio and earnings.
8. Export the JSON state, refresh the page, or import it again to demonstrate persistence.

Use the **Demo Controls** to switch users, reset sample data and export JSON. Do not enter real personal or customer information.

## Three standard services

| Service | Deliverable | Buyer price |
| --- | --- | ---: |
| Spreadsheet Cleanup | Up to 100 rows plus change log | 20,000 ₸ |
| Product Catalog | Up to 20 structured product listings | 20,000 ₸ |
| Competitor Snapshot | Comparison of five publicly documented competitors | 20,000 ₸ |

Nominal student share: **85% = 17,000 ₸**. Platform transaction commission: **15% = 3,000 ₸**. The commission is platform revenue **before** expenses, not net profit. Delivery target: three working days after an accepted complete brief, with one in-scope revision. No actual price, banking, tax or delivery commitments are offered by this prototype.

## Features

- Landing page, service catalog and responsive dashboards for SME, student and administrator.
- Local demo account selection and profile editing (not real authentication).
- Task-specific skill tests and eligibility checks.
- Structured order creation, order statuses, student applications and admin assignment.
- Demo payments, task delivery, QA, one revision, dispute/refund decisions, acceptance and non-duplicating demo payouts.
- Order messages, notifications, student completion history and reviews.
- Russian/Kazakh interface wording and tenge prices.
- Local browser persistence, JSON download/import, optional file-save dialog where supported, reset and backup/restore.

## Data storage and security limitations

- `js/seed.js` provides the **fictional initial data**. `data/example-demo.json` is a schema example; it is not a real user database.
- The application saves state to **`localStorage`** in the current browser. Data does not synchronize across devices.
- **Export JSON** downloads a snapshot. **Import JSON** loads a saved snapshot. **Save JSON** may use the browser's File System Access API if available; otherwise it downloads a JSON file. Browser permission is required for direct file writing.
- Role and status checks are **frontend-only demonstrations**, not server-enforced security. Data is accessible to someone who controls the browser.
- There is no banking integration, legally protected escrow, encrypted server storage, production authorization, legal compliance certification, real task screening or verified completed sales.
- Attachments are for demonstration. Small text attachments may be stored as part of the JSON state; some other files store only metadata. Do not upload personal or confidential records.
- All examples should use synthetic data. Do not use this code for real customer orders or payments.

## Repository layout

```text
index.html                 HTML entry point
css/styles.css             Responsive UI and animation
js/seed.js                 Fictional users, Micro-Cases, skills tests
js/storage.js              State, localStorage, JSON import/export
js/data.js                 Order lifecycle and domain checks
js/ui.js                   Page templates, dashboards, navigation
js/app.js                  Browser events, forms, modals and startup
assets/favicon.svg         Brand icon
data/example-demo.json     Schema sample
tests/smoke.test.cjs       No-dependency business logic test
.github/workflows/test.yml GitHub Actions smoke tests
```

## Testing

Requires Node.js 20+ for automated logic checks (not for normal website use):

```bash
node --check js/seed.js
node --check js/storage.js
node --check js/data.js
node --check js/ui.js
node --check js/app.js
node tests/smoke.test.cjs
```

The smoke test checks price/commission, permissions, payment and assignment, qualification, task lifecycle, QA, review, duplicate payouts and JSON import/export. UI/browser testing is separate: manually run the five-minute demonstration after deployment. **Passing smoke tests does not certify every visual control or production security.**

## Publish with GitHub Pages (optional)

For a public repository, GitHub Pages may serve this static site without any backend: Repository **Settings → Pages → Deploy from a branch → `main` → `/ (root)`**. Confirm Pages availability and permissions for your GitHub plan; no service keys are needed. Pages is appropriate **only for fictional demo data**, not real customer information.

## Team / license

An academic SkillBridge demonstration project. The code is supplied for project review and development; no open-source license is assumed.