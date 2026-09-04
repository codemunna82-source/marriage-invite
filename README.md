# Ravi Pandey Weds Shristi Pandey

A cinematic, mobile-first Indian wedding invitation. It opens on a royal palace
gate rendered in **Three.js** — carved doors that physically swing open on their
hinges while the camera moves through the doorway into the invitation, with
golden dust, falling petals and warm lamplight along the way.

Plain **HTML + CSS + vanilla JavaScript**. No build step, no framework, no
bundler. Three.js and GSAP load from a CDN. Drop it on Vercel and it is live.

---

## Project structure

```
/
├── index.html          markup + SEO/social metadata
├── style.css           the entire design system
├── script.js           config, 3D scene, intro timeline, all interactions
├── vercel.json         static hosting config + cache headers
├── README.md
└── assets/
    ├── images/         gallery placeholders + og-image.png
    ├── music/          wedding.mp3 (an original instrumental, ready to replace)
    └── icons/          favicon, apple touch icon, webmanifest
```

---

## Editing the wedding details

**Everything you need to change lives in one object** at the top of `script.js`:
`weddingData`. Nothing else needs to be touched.

```js
const weddingData = {
  groom: "Ravi Pandey",
  bride: "Shristi Pandey",
  groomFirst: "Ravi",
  brideFirst: "Shristi",

  date: "25 December 2026",
  countdownDate: "2026-12-25T18:00:00",   // local time, YYYY-MM-DDTHH:mm:ss

  venue: "[EDIT VENUE NAME]",
  address: "[EDIT ADDRESS]",
  city: "India",
  googleMapsUrl: "https://maps.google.com/",

  whatsapp: "919999999999",               // country code + number, digits only
  music: "assets/music/wedding.mp3",

  storyQuote: "...", storyBody: "...",
  groomFamily: "...", brideFamily: "...",

  events: { haldi: { name, tagline, icon, date, time, venue }, ... },
  gallery: [ { src, alt }, ... ]
};
```

| I want to change… | Edit |
| --- | --- |
| Names, date, city | `groom`, `bride`, `groomFirst`, `brideFirst`, `date`, `city` |
| The countdown | `countdownDate` — when it passes, the section reads *"Today is the day! ❤️"* |
| Haldi / Mehendi / Sangeet / Wedding / Reception | `events.<name>.date`, `.time`, `.venue`, `.tagline` |
| Our Story text | `storyQuote`, `storyBody` |
| Family names | `groomFamily`, `brideFamily`, and their `…Note` lines |
| Venue + map button | `venue`, `address`, `city`, `googleMapsUrl` |
| Where the RSVP goes | `whatsapp` |
| The save-the-date card's reverse | `saveTheDateNote` |
| Dress code colours | `dressCode` — one entry per event, with any number of hex colours |
| Blessings in the 3D carousel | `blessings` — add or remove lines freely |
| Travel & stay cards | `travel` — title and body per card |

Two things live in `index.html` because search engines and WhatsApp previews
read them before JavaScript runs: the `<title>`/`<meta>` block and the
`canonical` / `og:url` links. Update the canonical and `og:url` to your real
domain after deploying.

### Event icons

`events.<name>.icon` takes the name of a built-in gold ornament — `marigold`,
`paisley`, `sangeet`, `rings`, `lotus` — or your own inline `<svg>…</svg>`, or
any emoji.

---

## Replacing the photos

The gallery ships with generated ornamental placeholders so it never looks
broken. To use real photos:

1. Put them in `assets/images/` (e.g. `photo-01.jpg`).
2. Point `weddingData.gallery` at them, with real alt text:

```js
gallery: [
  { src: "assets/images/photo-01.jpg", alt: "Ravi and Shristi at their engagement" },
  { src: "assets/images/photo-02.jpg", alt: "Haldi morning with the family" }
]
```

Add or remove entries freely — the masonry grid, the lightbox counter and the
arrow/keyboard navigation all follow the array. Images are lazy-loaded, so keep
each one under roughly 300 KB and around 1600 px on the long edge; portrait and
landscape mix well.

**Social preview:** replace `assets/images/og-image.png` (1200×630) with a real
photo of the couple — that is the image WhatsApp and Instagram show when the
link is shared.

---

## The music

`assets/music/wedding.mp3` is an original instrumental written for this
invitation — shehnai and bansuri over a tanpura drone with a soft keherwa on the
tabla, in raag Bhoop. It is 48 seconds and loops seamlessly. Nothing is
licensed from anyone, so it is yours to keep, edit or throw away.

**Music is on by default.** It never autoplays cold — it starts the moment the
visitor taps **ENTER WEDDING**, which is the user gesture mobile browsers
require — and the floating **♪** button turns it off and on. The choice is
remembered in `localStorage`, so a guest who mutes it stays muted next visit.

The track is loaded through the Web Audio API so the loop has no gap at the
seam; if that is unavailable (or the page is opened straight off the
filesystem) it falls back to the plain `<audio>` element. If the file is
missing entirely the button simply stays on *OFF* and nothing breaks.

To use your own: drop it in as `assets/music/wedding.mp3`, or point
`weddingData.music` at a different name. Keep it under a couple of megabytes,
and use music you have the right to use.

---

## Features

**The entrance**
- A real Three.js scene: carved double doors with depth, frame, arch, tympanum,
  kalash finials, hinges, handles and studs, flanked by brass lamp stands
- Doors rotate on their hinges around the Y axis in opposite directions
- GSAP timeline: button → handles → light through the gap → doors open →
  particles → petals → camera forward → camera through the doorway → names →
  invitation revealed (~3.9s)
- The camera frames the whole gate on any screen, portrait phones included
- Mouse parallax on desktop, gentle automatic drift on touch

**The invitation**
- Hero with layered parallax, floral frame and flickering diyas
- Live countdown whose digits turn over in 3D as they change
- Five event cards with pointer-tracked 3D tilt, a moving glare and staggered
  scroll reveals
- Our Story and a family invitation
- A save-the-date card that genuinely flips in 3D — and turns itself over once,
  unprompted, as it scrolls into view
- Dress code: a colour palette per celebration, the swatches stacked in depth
- Masonry gallery with a lightbox (arrows, keyboard, swipe, Escape, focus trap)
- Blessings on a rotating 3D cylinder — auto-advancing, with arrows, dots,
  keyboard and swipe
- Venue card with a Google Maps button, and Travel & Stay cards
- RSVP that composes a WhatsApp message — no backend, no data collected

**The 3D does not stop at the door**
Once you are inside, the Three.js scene rebuilds itself into a world you scroll
through: a marigold garland strung across the top of the view, a column of
mandalas you drift past as the page moves, diyas floating up through the depth,
and the dust and petals still falling. The whole layer sits behind the words at
reduced opacity, so it reads as atmosphere rather than decoration.

**Everything else**
- One `requestAnimationFrame` loop for the whole site, paused when the tab is hidden
- Particle counts, pixel ratio, antialiasing and shadows all step down on mobile
- Full CSS 3D fallback if WebGL is unavailable — the invitation still opens
- `prefers-reduced-motion` respected: fewer particles, no camera travel, all
  content and functionality intact
- Keyboard navigable, ARIA-labelled, visible focus states, semantic headings
- No secrets, no API keys, no tracking

---

## Running it locally

Any static server works:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` directly from the filesystem mostly works, but a server is
closer to production.

---

## Deploying to Vercel

This is a static site — no build command, no output directory.

```bash
npm i -g vercel      # first time only
vercel login
vercel --prod
```

Or from the dashboard: **Add New → Project → import this repository → Deploy**.
Framework preset **Other**, build command empty, output directory `.`.

`vercel.json` already sets sensible security headers and caches `assets/` for a
year while keeping `index.html`, `style.css` and `script.js` always fresh.

The live deployment is https://marriage-invite-blond.vercel.app — `canonical`
and `og:url` in `index.html` already point at it. If you attach a custom domain
later, update those two tags to match.

Note that Vercel Authentication (deployment protection) must stay **off** for a
public invitation, otherwise guests are asked to log in to Vercel before they
can open the link: *Project → Settings → Deployment Protection*.

---

## Browser support

Chrome, Safari, Firefox and Edge, on desktop and mobile — iOS Safari and
Android Chrome included. Anything without WebGL gets the CSS fallback.
