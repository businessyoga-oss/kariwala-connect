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

## Step 1 — Load the ready-made sheet structure

A quick honest note: I don't have a way to type directly into your Google
Sheet from here, so instead I've built the three tabs (with headers and
Aikyam 5's real schedule already filled in) as a file — **`kariwala-connect-seed.xlsx`**
in this folder. Bringing it into your sheet is three clicks, no typing:

1. Open your sheet: **Kariwala connect** (the one you shared with me)
2. Go to **File → Import**
3. Click **Upload**, choose `kariwala-connect-seed.xlsx`
4. When asked "Import location," choose **Replace spreadsheet** (your sheet is currently empty, so this is safe) → **Import data**

You'll now have three tabs — `Events`, `Schedule`, `Attachments` — with Aikyam 5
already in there as a working example. The app is already pointed at this exact
sheet, so as soon as you do this import, the app will show real data.

**Adding a new event later** — no typing formulas needed, just fill in a new row:
- A new row in `Events` (give it a short `EventID` like `diwali2026`, no spaces)
- Its agenda rows in `Schedule`, using that same `EventID`
- Its files in `Attachments`, using that same `EventID` — upload the file to Drive first, right-click → **Share** → **"Anyone with the link – Viewer"**, then paste that link into `FileURL`

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
- The app never modifies the Sheet — it only reads it, so it's safe to hand the sheet-editing job to anyone without worrying about them breaking the app.
- If a tab name in your Sheet doesn't match `Events` / `Schedule` / `Attachments` exactly, update the `TABS` names in the same `CONFIG` block in `index.html`.
- Want a different accent color, or to add an "Announcements" tab like FTS Connect has? Tell me and I'll hand you an updated file.
