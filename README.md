# Kariwala Connect — v2

Splash screen, Google sign-in (only @kariwala.com), the green-and-yellow
redesign, per-person app access, access requests, birthdays (with the daily
team email), and an Admin panel to manage all of it from inside the app.

## What's in this folder

```
index.html                      the app
sw.js                           keeps it fast + updates showing on next open
manifest.json                   makes it installable on phones
icons/                          logos and app icons (9 files)
kariwala-connect-api.gs.txt     the Apps Script code (goes into Google, not GitHub)
```

---

## Step 1 — Update the Apps Script (5 minutes)

1. Open your Kariwala connect Sheet → **Extensions → Apps Script**
2. Click inside the code, press **Ctrl+A**, then **Delete** — the editor is now empty
3. Open `kariwala-connect-api.gs.txt`, copy everything, paste it in. Press **Ctrl+S**
   (Nothing to fill in — your Sheet ID and Client ID are already inside.)
4. In the toolbar, open the function dropdown (next to "Debug"), choose **setup**, click **Run**
   - Google will ask for permission → choose your account → **Advanced** → **Go to project** → **Allow**
   - This creates any missing tabs (Requests, Users…) in your Sheet automatically
5. Click **Deploy → Manage deployments** → click the **pencil icon** on your existing deployment
6. Under **Version**, choose **New version** → click **Deploy**

Using "Manage deployments" (not "New deployment") keeps the same web address,
so the app keeps working without any change.

## Step 1b — Move birthdays over (one time, 3 clicks)

Still in the Apps Script editor, after Step 1 above:

1. Function dropdown → **importBirthdays** → **Run**
   Copies every name and birthday from the old "D.O.B List" sheet into a new
   **Birthdays** tab in this sheet. Check **Execution log** — it says how many
   were imported, and names any row it couldn't read.
   (If it says it can't open the old sheet: share "D.O.B List" with
   content@kariwala.com as Viewer, then run it again.)
2. Function dropdown → **previewBirthdayEmail** → **Run**
   Sends today's birthday email only to content@kariwala.com, as a test.
   (If nobody has a birthday today it just says so — that's fine.)
3. Function dropdown → **installBirthdayTrigger** → **Run**
   From now on the email goes to kariwala-team@kariwala.com every morning at 8 am.

**Important — turn off the old one, or everyone gets two emails:**
open the old "D.O.B List" sheet → **Extensions → Apps Script** → click the
**clock icon (Triggers)** on the left → delete the trigger for
`dailyBirthdayEmail`. After that the old sheet isn't needed — add and edit
birthdays from the app (**Admin → Content → Birthdays**).

**Only if the website shows a birthday banner:** that banner came from the old
script's link. Replace it with your Kariwala Connect script link with
`?view=birthday-banner` added at the end. It looks exactly the same.

## Step 2 — Upload to GitHub

1. In your `kariwala-connect` repo: **Add file → Upload files**
2. Drag in `index.html`, `sw.js`, `manifest.json` → **Commit changes**
3. Click into the **icons** folder → **Add file → Upload files**
4. Select **all 9 files** from the `icons` folder → **Commit changes**

Vercel redeploys on its own within a minute or two.

## Step 3 — First time setup in the app

1. Open the app, sign in with **content@kariwala.com** (always an admin)
2. Go to **Admin → Apps**. Tap each app and choose **Who can use it**:
   - **Everyone** — every employee can open it (e.g. Kariwala Website)
   - **Only people I approve** — everyone sees it greyed out and can request it
   - **Hidden** — only approved people can even see it (for payroll/finance)
3. Done. From now on:
   - Requests show up under **Admin → Requests** with Approve / Decline
   - **Admin → People** lists everyone who has signed in — tap a person to switch apps on/off
   - **+ Email** lets you set up someone's apps before they've ever signed in
   - **Admin → Content** edits Events, Programme, Files, Notices, Birthdays and Admins
   - In **People**, tap a person to set their department too

---

## Good to know

- **The Sheet can now stay private.** The app never reads it directly any
  more — everything goes through the Apps Script, which checks the sign-in
  first. The "Kariwala settings prevent sharing" message no longer matters.
- **Dates are safe now.** Events added from the app use a date picker and are
  saved as plain text, so the date-format problem from before can't happen.
- **Connect controls the door, not the room.** Someone who already knows an
  app's direct link (e.g. suraksha-lemon.vercel.app) can still type it into a
  browser. For apps with sensitive data, that app should also have its own
  login — the way Suraksha already does.
- **Sign-in lasts about an hour** (a Google rule). After that, the app signs
  people back in automatically with one tap — no password.
