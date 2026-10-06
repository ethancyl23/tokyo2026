# Tokyo 2026 Itinerary Site

A small Astro site so you and your wife can browse the Japan trip itinerary on
your phones, instead of scrolling through WhatsApp. Each day is its own page;
editing a day means editing one Markdown file.

This is a **first draft for review** — content, running it locally, and
deploying it are all covered below.

---

## 1. One-time setup (do this once)

You'll need three things installed. If you already have any of these, skip
that step.

1. **Node.js** (version 18 or newer) — download from https://nodejs.org
   (choose the "LTS" version). This lets you run the site on your own
   computer before it goes online.
2. **Git** — download from https://git-scm.com/downloads. This is what
   uploads your changes to GitHub.
3. **A GitHub account** — sign up free at https://github.com/join if you
   don't have one.

Check they installed correctly by opening a terminal (Terminal on Mac,
Command Prompt/PowerShell on Windows) and running:

```bash
node -v
git --version
```

Both should print a version number.

---

## 2. Run the site on your own computer

1. Unzip this project folder somewhere convenient, e.g. `Documents/tokyo-2026-itinerary`.
2. Open a terminal **inside that folder** (on Mac: right-click the folder →
   "New Terminal at Folder"; on Windows: open the folder in File Explorer,
   type `cmd` in the address bar and press Enter).
3. Install the project's dependencies (only needed once, or whenever
   `package.json` changes):
   ```bash
   npm install
   ```
4. Start the local preview:
   ```bash
   npm run dev
   ```
5. Open the link it prints (usually **http://localhost:4321**) in your
   browser. Leave this running — any file you save will refresh the page
   automatically.
6. Press `Ctrl+C` in the terminal to stop the local server when you're done.

---

## 3. Editing content

All trip content lives in `src/content/days/day-01.md`, `day-02.md`, etc.
Each file looks like this:

```md
---
dayNumber: 3
date: "10 Oct 2026 (Sat)"
title: "Yokohama → Hakone/Gotemba → Lake Yamanakako"
location: "Hakone / Gotemba / Yamanakako"
hotel: "Solana Smart INN Mt. Fuji Yamanakako"
heroImage: "images/day-03.svg"
mapQuery: "Lake Yamanakako, Japan"
status: "tentative"
---
Road trip day — leaving Yokohama...

## Ideas to consider
- Which Hakone/Gotemba stop(s)
```

- The part between the `---` lines is structured data (date, hotel, map
  location, etc.) — keep the quote marks, just change the text.
- `status` can be `"confirmed"`, `"tentative"`, or `"tbd"` — this controls
  the little badge shown next to the day.
- `mapQuery` is just a place name or address; it's used to embed a Google
  Map on that day's page — no API key needed.
- Everything below the second `---` is normal Markdown: paragraphs, and
  `##` for sub-headings, `-` for bullet lists.
- **To add a photo:** drop an image file into `public/images/` (e.g.
  `day-03-fuji.jpg`) and change `heroImage` to `"images/day-03-fuji.jpg"`.
  The placeholder coloured images are just there so the layout isn't empty.

**To add a brand-new day:** copy an existing `.md` file, rename it (e.g.
`day-11.md`), and update its frontmatter — it'll appear automatically on the
homepage, sorted by `dayNumber`.

---

## 4. Publish it to GitHub Pages

### a) Create the GitHub repository
1. Go to https://github.com/new
2. Name it e.g. `tokyo-2026-itinerary` (or anything you like)
3. Leave it set to whatever visibility you choose (see the note on privacy
   below) and click **Create repository**.

### b) Push this project to it
In the terminal, inside the project folder:

```bash
git init
git add .
git commit -m "Initial itinerary site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

(GitHub will prompt you to sign in the first time you push.)

### c) Update the config with your real URL
In `astro.config.mjs`, replace:
```js
site: 'https://your-username.github.io',
base: '/tokyo-2026-itinerary',
```
with your actual GitHub username and repo name, then commit and push that
change too (`git add -A && git commit -m "update site config" && git push`).

### d) Turn on GitHub Pages
1. On GitHub, open your repo → **Settings** → **Pages** (left sidebar).
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. That's it — the workflow in `.github/workflows/deploy.yml` will build and
   deploy the site automatically every time you push to `main`. Check the
   **Actions** tab to watch it run; the site URL appears there once it
   finishes (and also under Settings → Pages).

From then on, **any edit + `git add -A && git commit -m "..."; git push`
updates the live site** within a minute or two — no separate "refresh"
step needed.

---

## 5. About privacy — worth deciding before you make the repo

GitHub Pages sites built from a **public** repository are visible to
anyone with the link (not listed anywhere, but not access-controlled
either). To actually restrict it to selected people, you have a few
options:

| Option | Cost | What it gives you |
|---|---|---|
| **Public repo** (default above) | Free | Anyone with the URL can view. Fine if you're comfortable with "unlisted but technically public." |
| **Private repo + GitHub Pro** | ~US$4/month | GitHub Pages can be restricted to only people you invite as collaborators on the repo — real access control. |
| **Public repo + password lock** (e.g. the [`staticrypt`](https://github.com/robinmoisson/staticrypt) tool) | Free | Adds a password prompt in front of the whole site at build time. Not bank-grade security, but stops casual visitors. |

If keeping it to just the two (or a few) of you matters, the GitHub Pro
route is the cleanest — happy to add the password-lock option instead if
you'd rather stay free.

---

## 6. Known open items in this draft

- Day 10's return-flight details as given (HND departing 0220hrs "8 Oct
  2026") land on the same date as arrival — likely a typo worth
  double-checking so that page and the airport-transfer plan are correct.
- Oct 15–16 hotels/plans are marked "TBD" pending your decisions.
- Placeholder colour blocks stand in for photos — swap in real ones anytime
  (see "Editing content" above).
