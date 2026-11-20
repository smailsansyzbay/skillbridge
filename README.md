# SkillBridge — Frontend Demo Prototype

SkillBridge is an interactive frontend demo of a managed marketplace for small, fixed-scope digital tasks. Businesses order defined deliverables, and an administrator matches available performers by task-specific skills and checks the result before customer acceptance. Performers can include students, homemakers, retirees and other specialists with relevant skills.

**All users, transactions, reviews and displayed sample cases are fictional demonstration data. No real money is processed. This is not a secure production marketplace.**

## Demo entry

The home page offers Performer and Customer entry. Each opens demo profiles for that role. Start Demonstration opens separate Customer and Performer groups. Select a profile to enter immediately, without registration, passwords or email verification. Each group has an Add Performer or Add Customer button. Creating a demo profile opens it immediately and saves it in browser storage and JSON exports. New performers start without skill qualifications.

A subtle Administrator link at the bottom of the home page opens the local administrative demo workspace. All demo accounts are publicly accessible and intended for fictional data.

Existing local JSON records remain available, including profiles created in earlier versions. Login credentials are no longer used. Open index.html in a modern browser or serve the folder using a local static server.

## Three standard services

| Service | Deliverable | Buyer price |
| --- | --- | ---: |
| Spreadsheet Cleanup | Up to 100 rows plus change log | 20 000 ₸ |
| Product Catalog | Up to 20 structured product listings | 20 000 ₸ |
| Competitor Snapshot | Comparison of five publicly documented competitors | 20 000 ₸ |

Nominal performer share: **85% = 17 000 ₸**. Platform transaction commission: **15% = 3 000 ₸**. The commission is platform revenue **before** expenses, not net profit. Delivery target: three working days after an accepted complete brief, with one in-scope revision. No actual price, banking, tax or delivery commitments are offered by this prototype.

Custom Order is the fourth catalog option. Customers select a competency category and provide a title, brief, price (1–10,000,000 ₸) and duration (1–365 working days). Matching and QA use the selected category. The platform commission remains 15%. Existing standard services retain their demo prices and delivery targets.

## Home page and languages

The editorial home page presents role entry, task categories, the workflow and six expanded questions and answers. Pricing and financial demo details appear inside the order flow. The language button cycles Russian → Kazakh → English. Interface text, service descriptions, criteria and test questions use the selected language. Names, user-entered tasks and messages retain their original wording.

## Specialist rewards

The rewards page shows earned funds, available balance, pending operator credits and a combined credit/withdrawal history. Withdraw to Account records a simulated Freedom withdrawal after a separate confirmation. Only four fictional account digits are requested and stored. Amounts are limited to the available credited balance, duplicate requests are idempotent, and withdrawal records persist in JSON. No bank is contacted or real money transferred.

## Features

- Landing page, service catalog and responsive dashboards for customer, performer and administrator.
- Grouped demo profile selection, profile editing and return to the home page.
- Task-specific skill tests and matching by qualification and availability.
- Structured order creation, order statuses, performer applications and admin assignment.
- Demo payments, task delivery, QA, one revision, dispute/refund decisions, acceptance and non-duplicating demo payouts.
- Order messages, notifications, performer completion history and reviews.
- Russian/Kazakh/English interface wording and tenge prices.
- Local browser persistence, JSON download/import, optional file-save dialog where supported, reset and backup/restore.

## Interactive messages (new)

The **Messages** section now contains a dedicated two-column inbox: a searchable conversation list, unread badges, order context, message bubbles, and a composer. Open any visible order conversation directly from the inbox, including orders without earlier messages. The UI works on desktop and mobile (the mobile layout switches between conversations and the selected thread).

- Send with **Enter**, insert a line break with **Shift+Enter**, or click **Send**. Messages may contain up to 1,500 characters.
- Messages, sender, timestamp and recipient read state are saved automatically in the same browser JSON dataset as orders. The inbox also exports them via **Save JSON**. The preloaded example conversations are fictional.
- Sign into a participating account to view its order-linked conversations. Unread markers update when the thread is opened.
- Search by order, participant or message text; filter for unread threads.
- No real-time network messaging, device synchronization, genuine account authentication or end-to-end encryption is provided. This remains a **single-browser demonstration**.

## Data storage and security limitations

- `js/seed.js` provides the **fictional initial data**. `data/example-demo.json` is a schema example; it is not a real user database.
- New snapshots use schema version 2. Version 1 snapshots are upgraded on load, import and restore, preserving account IDs, assignments and demo payment history.
- The application saves state to **`localStorage`** in the current browser. Data does not synchronize across devices.
- **Export JSON** downloads a snapshot. **Import JSON** loads a saved snapshot. **Save JSON** may use the browser's File System Access API if available; otherwise it downloads a JSON file. Browser permission is required for direct file writing.
- Role and status checks are **frontend-only demonstrations**, not server-enforced security. Data is accessible to someone who controls the browser.
- Financial actions are simulated locally. The demo has no banking integration, identity or legal-status verification.
- Attachments are for demonstration. Small text attachments may be stored as part of the JSON state; some other files store only metadata. Do not upload personal or confidential records.
- All examples should use synthetic data. Do not use this code for real customer orders or payments.

## Repository layout

```text
index.html                 HTML entry point
css/styles.css             Responsive UI and animation
js/seed.js                 Fictional users, microtasks, skills tests
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

The smoke test checks price/commission, permissions, payment and assignment, qualification, task lifecycle, QA, review, duplicate payouts and JSON import/export. Browser testing covers grouped profile selection and access to each demo role. **Passing smoke tests does not certify every visual control or production security.**

## Publish with GitHub Pages (optional)

For a public repository, GitHub Pages may serve this static site without any backend: Repository **Settings → Pages → Deploy from a branch → `main` → `/ (root)`**. Confirm Pages availability and permissions for your GitHub plan; no service keys are needed. Pages is appropriate **only for fictional demo data**, not real customer information.

## Team / license

An academic SkillBridge demonstration project. The code is supplied for project review and development; no open-source license is assumed.