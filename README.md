# The Wayfinder's Reckoning

A companion-app prototype for a location-based narrative experience. A guest is
quietly recruited on Main Street and spends a visit recovering four **embers** —
still-glowing splinters of the park's founding promise, one resting in each
original outer land. Each ember is gated by an observation only answerable by
standing in the right place — no GPS, no camera, no backend. The player is never
told what they are until the end: recover all four, return to the hub, and the
embers join into a single flame as the player is named a **Lamplighter**.

A running thread of light — lamps, torches, beacons, stars — hides in every
ember and is never named as the theme until the finale.

Built as an installable **PWA** (Ionic + React + Vite), hostable free on GitHub Pages.

## Run locally

```bash
npm install
npm run dev
```

Open the printed URL. (Sensor-free, so desktop and `localhost` work fine.)

## The core loop

1. **Intro** — recruitment beat; the player is told they were chosen. "Start walking" begins it.
2. **Home** — "The Park Remembers": the four embers, found in any order (Main Street is the hub, not a clue site).
3. **Clue** — a riddle sends you to a spot; answer the gate question to prove you're there.
4. **Reveal** — the ember's story appears ("what it remembers"); the ember lights on the list (saved locally).
5. A **midpoint beat** fires after the 2nd ember; when all four are caught, return to the hub → **finale**.
6. **Finale** — the four embers join into a single flame; the player is named a **Lamplighter** (the first and only time the word is spoken).

## Where to edit

- **Story & puzzles:** [`src/data/hours.js`](src/data/hours.js) — the four embers: clues, gate
  questions, accepted answers, and ember (reveal) text. Gate answers are prototype placeholders
  keyed to the cipher designs (TORCH / BEACON / LANTERN / SMALLWORLD) — confirm against the real
  in-park objects before shipping.
- **Beats:** recruitment in [`src/pages/Intro.jsx`](src/pages/Intro.jsx), midpoint in
  [`src/pages/Home.jsx`](src/pages/Home.jsx), the assembly/naming/closing sequence in
  [`src/pages/Finale.jsx`](src/pages/Finale.jsx).
- **The flame:** [`src/components/Flame.jsx`](src/components/Flame.jsx) — the four-tongue flame
  the embers assemble into (replaces the earlier clock visual).
- **Look & feel (re-skin here):** [`src/theme/variables.css`](src/theme/variables.css) for
  the palette and display font, [`src/theme/app.css`](src/theme/app.css) for layout/animation
  and the Art Deco motifs (starfield, sunburst, deco dividers, corner frames).

## Deploy to GitHub Pages

1. Create a GitHub repo named **`disney-compass`** and push this folder to `main`.
   (If you use a different repo name, update `base` in [`vite.config.js`](vite.config.js)
   to `'/<your-repo-name>/'`.)
2. In the repo: **Settings → Pages → Source: GitHub Actions**.
3. The included workflow builds and deploys on every push to `main`. Your app lands at
   `https://<username>.github.io/disney-compass/`.
4. On a phone, open that URL and **Add to Home Screen** for the standalone app feel.

## Not included yet (deliberately)

- Real gate answers (placeholders keyed to the cipher designs; verify on-site)
- Path-personalized finale text (the assembly beat is currently fixed, not reordered by find-order)
- The Bearing Cipher (embers taking their place as flame-tongues by compass bearing from the hub)
- App icons (`public/icon-192.png`, `public/icon-512.png` — add before shipping)
