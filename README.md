# Kariwala Connect

One app for every Kariwala Industries event — schedules and files, pulled live
from a Google Sheet. No server, no database. You edit the sheet, the app
picks it up.

## What's in this folder
```
index.html      the whole app
manifest.json   makes it installable on phones
sw.js           lets it open even with a poor connection
icons/          app icons
```

---

## Step 1 — Load the sheet structure

I've updated `kariwala-connect-seed.xlsx` with two new columns the app now
uses (`LogoURL` on `Events`, and `FileURL` / `FileTitle` on `Schedule`).

- **If you haven't imported the sheet yet:** open your **Kariwala connect**
  sheet → **File → Import** → **Upload** → choose `kariwala-connect-seed.xlsx`
  → **Replace spreadsheet** → **Import data**.
- **If you already imported it last time:** just add the new columns
  yourself — in `Events`, add a column called `LogoURL` after the last one;
  in `Schedule`, add `FileURL` and `FileTitle`. Existing rows are untouched,
  the app simply ignores blank cells in those columns.

### What each tab does now

**`Events`** — `EventID, Name, Badge, Location, StartDate, EndDate, Description, LogoURL`
- `LogoURL` (new) — the event's own logo. Paste a normal Google Drive share
  link (upload the logo to Drive → right-click → **Share** → **"Anyone with
  the link – Viewer"** → copy link → paste here). Leave blank and the app
  just shows the badge text instead — nothing breaks. Aikyam 5's row is
  already filled in with its real logo, which now ships inside the app
  itself (`icons/aikyam-logo.png`) — no Drive link needed for that one.

**`Schedule`** — `EventID, Day, Time, Session, Speaker, FileURL, FileTitle`
- `FileURL` / `FileTitle` (new) — attach a file to one specific agenda item.
  Fill these in and a small file icon appears in the corner of that session's
  card, opening the file directly — no need to visit a separate files list.
  Nothing shows if the row is left blank. Same Drive-sharing steps as above.

**`Attachments`** — unchanged, still there for general event-wide files that
aren't tied to one specific session (e.g. the full printed agenda as a PDF).

**Adding a new event later** — no typing formulas needed, just fill in a new row:
- A new row in `Events` (give it a short `EventID` like `diwali2026`, no spaces)
- Its agenda rows in `Schedule`, using that same `EventID`
- Its files in `Attachments`, using that same `EventID`

Always write dates as `YYYY-MM-DD` (e.g. `2026-08-15`) — that's what decides
whether an event shows as Upcoming or Past automatically.

---

## Step 2 — Put it on GitHub and deploy on Vercel

Same flow as before:

1. Create a new GitHub repo, e.g. `kariwala-connect`
2. Upload **all the files in this folder**, keeping the `icons/` folder intact (drag the whole folder in, or use "Add file → Upload files" and select everything at once)
3. On Vercel: **Add New → Project → Import** the `kariwala-connect` repo
4. Leave settings as default (static site, no build command) → **Deploy**

You'll get a live link in under a minute.

---

## Step 3 — How people install it on their phone

This is a real installable app (a "PWA") — no app store needed. There's also
an **Install** section inside the app itself (under **More**) with these same
steps shown automatically based on the person's phone.

**Android (Chrome):**
1. Open the Vercel link in Chrome
2. Tap the **⋮** menu → **Install app** (or **Add to Home screen**)
3. Confirm — the icon appears on their home screen like any other app

**iPhone (Safari):**
1. Open the link in **Safari** — it must be Safari, not Chrome, for this to work on iPhone
2. Tap the **Share** icon at the bottom
3. Scroll down, tap **Add to Home Screen** → **Add**

Once installed, it opens full-screen, with no browser bar, just like a native app.

---

## Notes
- The app's own logo (top bar and home-screen icon) is now the real Kariwala logo — already baked into `icons/`, nothing to do. If it ever changes, send me the new file and I'll regenerate the set.
- The app never modifies the Sheet — it only reads it, so it's safe to hand the sheet-editing job to anyone without worrying about them breaking the app.
- If a tab name in your Sheet doesn't match `Events` / `Schedule` / `Attachments` exactly, update the `TABS` names in the same `CONFIG` block in `index.html`.
- Want a different accent color, or to add an "Announcements" tab like FTS Connect has? Tell me and I'll hand you an updated file.
