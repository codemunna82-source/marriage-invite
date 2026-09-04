/* ============================================================
   Ravi Pandey Weds Shristi Pandey
   A cinematic royal Indian wedding invitation.

   Sections
   1.  weddingData ....... EDIT EVERYTHING HERE
   2.  Environment helpers
   3.  Content binding
   4.  Countdown
   5.  Gallery + lightbox
   6.  RSVP (WhatsApp)
   7.  Music (no controls — it simply plays)
   8.  Three.js scene (doors, particles, petals)
   9.  CSS fallback doors
   10. Cinematic intro timeline
   11. Scroll animations
   ============================================================ */

/* ------------------------------------------------------------
   1. CONFIGURATION — the only place you need to edit
   ------------------------------------------------------------ */
const weddingData = {
  /* --- Couple --- */
  groom: "Ravi Pandey",
  bride: "Shristi Pandey",
  groomFirst: "Ravi",
  brideFirst: "Shristi",

  /* --- Main day --- */
  date: "25 December 2026",
  countdownDate: "2026-12-25T18:00:00", // local time, YYYY-MM-DDTHH:mm:ss

  /* --- Venue --- */
  venue: "[EDIT VENUE NAME]",
  address: "[EDIT ADDRESS]",
  city: "India",
  googleMapsUrl: "https://maps.google.com/",

  /* --- RSVP --- */
  whatsapp: "919999999999", // country code + number, digits only

  /* --- Music ---
     wedding.mp3: "Wedding Invitation" by Sahil Madan, from Pixabay
     (Pixabay Content License — free to use, attribution not required).
     Prepared here as a seamless 31s stereo loop.

     Bump the ?v= number whenever you replace the file. Browsers hold on to
     audio hard, and without a new address a guest who has already opened the
     invitation keeps hearing the old track. */
  music: "assets/music/wedding.mp3?v=2",

  /* A shankh (conch) sounded once as the doors open. Off by default; set it to
     "assets/music/invocation.mp3" to bring it back. */
  invocation: "",

  /* --- Story --- */
  storyQuote: "Two hearts, one beautiful journey, and a lifetime of memories waiting to be created.",
  storyBody: "[EDIT THIS PARAGRAPH] Write a few warm lines about how the two of you met, what makes your bond special, and the moment you knew forever had begun.",

  /* --- Families --- */
  groomFamily: "Mr. [EDIT FATHER'S NAME] &amp; Mrs. [EDIT MOTHER'S NAME]",
  groomFamilyNote: "Parents of the groom",
  brideFamily: "Mr. [EDIT FATHER'S NAME] &amp; Mrs. [EDIT MOTHER'S NAME]",
  brideFamilyNote: "Parents of the bride",
  familyRequest: "Your presence and blessings would make our celebration complete.",

  footerNote: "Made with love, for the people who mean the most to us.",

  /* --- Save the date card (the back of the card) --- */
  saveTheDateNote: "No cards, no formalities \u2014 just the people we love, under one roof, for the days that matter most.",

  /* --- Dress code: one entry per celebration --- */
  dressCode: [
    { event: "Haldi", note: "Yellows and marigold", colors: ["#F4C430", "#E8A33D", "#FFF0B8"] },
    { event: "Mehendi", note: "Fresh greens and ivory", colors: ["#2F6B4F", "#8FBF7A", "#F3EAD6"] },
    { event: "Sangeet", note: "Jewel tones, dance-ready", colors: ["#5B2A86", "#B3237A", "#1F5C8B"] },
    { event: "Wedding", note: "Traditional reds and gold", colors: ["#8C1C2F", "#C9A227", "#F2E2B6"] },
    { event: "Reception", note: "Midnight and champagne", colors: ["#1B2440", "#6E7BA8", "#EBD9B4"] }
  ],

  /* --- Blessings shown in the 3D carousel --- */
  blessings: [
    "May your days be long and your laughter louder still.",
    "Two families, one bond, and a lifetime of festivals ahead.",
    "May you always be each other's calm and each other's celebration.",
    "Seven vows, seven lifetimes, one promise kept every single day.",
    "May your home be filled with light, sweets and unexpected guests.",
    "Grow old together, and stay young in the way you love."
  ],

  /* --- The wedding journey: each ritual raises its own glass arrangement.
         `scene` names the 3D arrangement in GlassWorld; edit the words freely. --- */
  journey: [
    { scene: "haldi", name: "Haldi", line: "Turmeric on our skin, laughter everywhere, and a house that smells of marigold." },
    { scene: "mehndi", name: "Mehndi", line: "Henna cones, cold coffee at midnight, and a name hidden in the pattern." },
    { scene: "sangeet", name: "Sangeet", line: "Every cousin has a routine. The dhol decides how late the night runs." },
    { scene: "baraat", name: "Baraat", line: "A white horse, a brass band, and a street that has to wait for us." },
    { scene: "jaimala", name: "Jaimala", line: "Two garlands, one moment, and everyone lifting the couple higher." },
    { scene: "mandap", name: "Mandap", line: "Four pillars, a lit kalash, and the people who raised us sitting close." },
    { scene: "phere", name: "Saat Phere", line: "Seven rounds of the fire. Seven promises we intend to keep." },
    { scene: "vidaai", name: "Vidaai", line: "Rice thrown over a shoulder, a doli at the gate, and every eye wet." },
    { scene: "reception", name: "Reception", line: "Crystal, candlelight, and the first evening of the rest of it." }
  ],

  /* --- Travel & stay --- */
  travel: [
    { title: "By Air", body: "[EDIT] Nearest airport and roughly how long the drive takes." },
    { title: "By Train", body: "[EDIT] Nearest railway station and how to reach the venue." },
    { title: "By Road", body: "[EDIT] Directions, landmarks and where to park." },
    { title: "Where to Stay", body: "[EDIT] Hotels we have blocked rooms at, and who to call." }
  ],

  /* --- Events --- */
  events: {
    haldi: {
      name: "Haldi",
      tagline: "A morning of turmeric &amp; laughter",
      icon: "marigold",
      date: "22 December 2026",
      time: "10:00 AM",
      venue: "[EDIT VENUE]"
    },
    mehendi: {
      name: "Mehendi",
      tagline: "Henna, music &amp; colour",
      icon: "paisley",
      date: "23 December 2026",
      time: "04:00 PM",
      venue: "[EDIT VENUE]"
    },
    sangeet: {
      name: "Sangeet",
      tagline: "An evening of song &amp; dance",
      icon: "sangeet",
      date: "24 December 2026",
      time: "07:00 PM",
      venue: "[EDIT VENUE]"
    },
    wedding: {
      name: "Wedding",
      tagline: "Seven vows, one lifetime",
      icon: "rings",
      date: "25 December 2026",
      time: "06:00 PM",
      venue: "[EDIT VENUE]"
    },
    reception: {
      name: "Reception",
      tagline: "Celebrating with everyone we love",
      icon: "lotus",
      date: "26 December 2026",
      time: "07:30 PM",
      venue: "[EDIT VENUE]"
    }
  },

  /* --- Gallery: replace these paths with your own photos --- */
  gallery: [
    { src: "assets/images/gallery-01.svg", alt: "Golden mandala ornament from the wedding decor" },
    { src: "assets/images/gallery-02.svg", alt: "Marigold garlands at the mandap" },
    { src: "assets/images/gallery-03.svg", alt: "Traditional diyas glowing at dusk" },
    { src: "assets/images/gallery-04.svg", alt: "Hand-painted henna motif" },
    { src: "assets/images/gallery-05.svg", alt: "Royal arch of the wedding entrance" },
    { src: "assets/images/gallery-06.svg", alt: "Rose petals scattered on silk" },
    { src: "assets/images/gallery-07.svg", alt: "Golden temple bells" },
    { src: "assets/images/gallery-08.svg", alt: "Peacock ornament in gold and maroon" }
  ]
};

/* ------------------------------------------------------------
   2. ENVIRONMENT HELPERS
   ------------------------------------------------------------ */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const env = {
  reduced: motionQuery.matches,
  mobile: window.matchMedia("(max-width: 820px), (pointer: coarse)").matches,
  webgl: (() => {
    try {
      const c = document.createElement("canvas");
      return !!(window.WebGLRenderingContext &&
        (c.getContext("webgl") || c.getContext("experimental-webgl")));
    } catch (e) { return false; }
  })(),
  gsap: typeof window.gsap !== "undefined",
  three: typeof window.THREE !== "undefined"
};

motionQuery.addEventListener?.("change", (e) => { env.reduced = e.matches; });

/* Gold line ornaments used by the event cards. Set weddingData.events.*.icon
   to one of these names, to your own inline <svg>, or to any emoji. */
const ORNAMENTS = {
  marigold: `<circle cx="24" cy="24" r="6.5"/><circle cx="24" cy="24" r="15.5"/>
    ${Array.from({ length: 10 }, (_, k) => { const a = k * 36; return `<ellipse cx="24" cy="12.5" rx="3.6" ry="5.4" transform="rotate(${a} 24 24)"/>`; }).join("")}`,
  paisley: `<path d="M24 6c11 8 12 21 0 32C12 27 13 14 24 6Z"/><path d="M24 14c6 5 6.5 12 0 18-6.5-6-6-13 0-18Z"/><circle cx="24" cy="24" r="2.6"/>`,
  sangeet: `<path d="M18 32V13l16-3v19"/><ellipse cx="14.5" cy="32.5" rx="4.5" ry="3.6"/><ellipse cx="30.5" cy="29.5" rx="4.5" ry="3.6"/><path d="M18 18l16-3"/>`,
  rings: `<circle cx="18.5" cy="27" r="10"/><circle cx="29.5" cy="27" r="10"/><path d="M24 6l3.4 6.6L24 17l-3.4-4.4Z"/>`,
  lotus: `<path d="M24 8c4 6 4 12 0 17-4-5-4-11 0-17Z"/><path d="M24 25c-6-4-12-4-17 0 5 8 12 11 17 11s12-3 17-11c-5-4-11-4-17 0Z"/><path d="M12 17c5 1 9 4 12 8M36 17c-5 1-9 4-12 8"/>`
};

function ornament(name) {
  if (!name) return "";
  if (name.trim().startsWith("<svg")) return name;
  const shape = ORNAMENTS[name];
  if (!shape) return `<span>${name}</span>`;
  return `<svg viewBox="0 0 48 48" width="30" height="30" fill="none" stroke="currentColor"
    stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shape}</svg>`;
}

/* ------------------------------------------------------------
   3. CONTENT BINDING — fills every [data-wd] slot from the config
   ------------------------------------------------------------ */
function bindContent() {
  $$("[data-wd]").forEach((el) => {
    const value = weddingData[el.dataset.wd];
    if (typeof value === "string") el.innerHTML = value;
  });

  /* Events */
  const grid = $("#events-grid");
  if (grid) {
    grid.innerHTML = Object.values(weddingData.events).map((ev) => `
      <li class="event-card reveal">
        <span class="event-card__icon" aria-hidden="true">${ornament(ev.icon)}</span>
        <h3 class="event-card__name">${ev.name}</h3>
        <span class="event-card__tag">${ev.tagline}</span>
        <dl class="event-card__list">
          <div><dt class="event-card__k">Date</dt><dd class="event-card__v">${ev.date}</dd></div>
          <div><dt class="event-card__k">Time</dt><dd class="event-card__v">${ev.time}</dd></div>
          <div><dt class="event-card__k">Venue</dt><dd class="event-card__v">${ev.venue}</dd></div>
        </dl>
      </li>`).join("");
  }

  /* Gallery */
  const gal = $("#gallery-grid");
  if (gal) {
    gal.innerHTML = weddingData.gallery.map((img, i) => `
      <button class="gallery__item reveal" type="button" data-index="${i}"
              aria-label="Open photo ${i + 1} of ${weddingData.gallery.length}">
        <img src="${img.src}" alt="${img.alt}" loading="lazy" decoding="async">
      </button>`).join("");
  }

  /* The wedding journey */
  const journey = $("#journey");
  if (journey) {
    journey.innerHTML = weddingData.journey.map((r, i) => `
      <li class="ritual" data-scene="${r.scene}">
        <div class="ritual__card">
          <span class="ritual__no" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
          <h3 class="ritual__name">${r.name}</h3>
          <p class="ritual__line">${r.line}</p>
          ${r.scene === "mehndi" ? mehndiPattern() : ""}
        </div>
      </li>`).join("");
  }

  /* Dress code */
  const dress = $("#dress-grid");
  if (dress) {
    dress.innerHTML = weddingData.dressCode.map((d) => `
      <li class="dress-card tilt reveal">
        <span class="dress-card__swatches" aria-hidden="true">
          ${d.colors.map((c, i) => `<i style="background:${c}; --i:${i}"></i>`).join("")}
        </span>
        <h3 class="dress-card__event">${d.event}</h3>
        <p class="dress-card__note">${d.note}</p>
      </li>`).join("");
  }

  /* Travel & stay */
  const travel = $("#travel-grid");
  if (travel) {
    travel.innerHTML = weddingData.travel.map((t) => `
      <li class="travel-card tilt reveal">
        <h3 class="travel-card__title">${t.title}</h3>
        <p class="travel-card__body">${t.body}</p>
      </li>`).join("");
  }

  /* Venue link */
  const maps = $("#maps-btn");
  if (maps) maps.href = weddingData.googleMapsUrl;

  /* Music source */
  const audio = $("#bg-music");
  if (audio) audio.src = weddingData.music;

  document.documentElement.lang = "en";
}

/* An SVG mehndi motif that draws itself as the Mehndi ritual arrives. */
function mehndiPattern() {
  const petals = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * 360;
    return `<path d="M60 60 C 74 44, 74 22, 60 8 C 46 22, 46 44, 60 60Z" transform="rotate(${a} 60 60)"/>`;
  }).join("");
  const dots = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return `<circle cx="${(60 + Math.cos(a) * 52).toFixed(1)}" cy="${(60 + Math.sin(a) * 52).toFixed(1)}" r="2.2"/>`;
  }).join("");
  return `<svg class="mehndi" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
    <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
      ${petals}
      <circle cx="60" cy="60" r="30"/><circle cx="60" cy="60" r="44"/><circle cx="60" cy="60" r="9"/>
    </g>
    <g fill="currentColor" class="mehndi__dots">${dots}</g>
  </svg>`;
}

/* ------------------------------------------------------------
   4. COUNTDOWN
   ------------------------------------------------------------ */
function initCountdown() {
  const target = new Date(weddingData.countdownDate).getTime();
  const grid = $("#countdown-grid");
  const done = $("#countdown-done");
  const out = {
    days: $("#cd-days"), hours: $("#cd-hours"),
    mins: $("#cd-mins"), secs: $("#cd-secs")
  };
  if (!grid || Number.isNaN(target)) return;

  const pad = (n) => String(Math.max(0, n)).padStart(2, "0");
  let timer;

  /* each digit turns over on its own axis as it changes */
  const put = (el, value) => {
    if (!el || el.textContent === value) return;
    el.textContent = value;
    if (!env.gsap || env.reduced) return;
    gsap.fromTo(el,
      { rotationX: -78, y: -6, opacity: 0.35 },
      { rotationX: 0, y: 0, opacity: 1, duration: 0.55, ease: "power3.out", transformPerspective: 600 });
  };

  const tick = () => {
    const diff = target - Date.now();
    if (diff <= 0) {
      clearInterval(timer);
      grid.hidden = true;
      if (done) done.hidden = false;
      return;
    }
    const s = Math.floor(diff / 1000);
    put(out.days,  pad(Math.floor(s / 86400)));
    put(out.hours, pad(Math.floor((s % 86400) / 3600)));
    put(out.mins,  pad(Math.floor((s % 3600) / 60)));
    put(out.secs,  pad(s % 60));
  };

  tick();
  timer = setInterval(tick, 1000);
}

/* ------------------------------------------------------------
   5. GALLERY + LIGHTBOX
   ------------------------------------------------------------ */
function initGallery() {
  const box = $("#lightbox");
  const img = $("#lb-img");
  const cap = $("#lb-caption");
  const items = $$(".gallery__item");
  if (!box || !items.length) return;

  let index = 0;
  let opener = null;

  const show = (i) => {
    index = (i + weddingData.gallery.length) % weddingData.gallery.length;
    const data = weddingData.gallery[index];
    img.src = data.src;
    img.alt = data.alt;
    cap.textContent = `${index + 1} / ${weddingData.gallery.length}`;
    if (env.gsap && !env.reduced) {
      gsap.fromTo(img, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" });
    }
  };

  const open = (i, trigger) => {
    opener = trigger || null;
    box.hidden = false;
    document.body.classList.add("is-lb-open");
    show(i);
    $("#lb-close").focus();
  };

  const close = () => {
    box.hidden = true;
    document.body.classList.remove("is-lb-open");
    if (opener) opener.focus();
  };

  items.forEach((item) => {
    item.addEventListener("click", () => open(Number(item.dataset.index), item));
    /* subtle 3D tilt on pointer devices */
    if (!env.mobile && !env.reduced) {
      item.addEventListener("pointermove", (e) => {
        const r = item.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -9;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 9;
        item.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px)`;
      });
      item.addEventListener("pointerleave", () => { item.style.transform = ""; });
    }
  });

  $("#lb-close").addEventListener("click", close);
  $("#lb-prev").addEventListener("click", () => show(index - 1));
  $("#lb-next").addEventListener("click", () => show(index + 1));
  box.addEventListener("click", (e) => { if (e.target === box) close(); });

  document.addEventListener("keydown", (e) => {
    if (box.hidden) return;
    if (e.key === "Escape") { close(); return; }
    if (e.key === "ArrowLeft") { show(index - 1); return; }
    if (e.key === "ArrowRight") { show(index + 1); return; }
    if (e.key !== "Tab") return;

    /* keep focus inside the viewer while it is open */
    const stops = $$("button", box);
    const i = stops.indexOf(document.activeElement);
    e.preventDefault();
    const next = e.shiftKey ? (i <= 0 ? stops.length - 1 : i - 1)
                            : (i === -1 || i === stops.length - 1 ? 0 : i + 1);
    stops[next].focus();
  });

  /* swipe on touch */
  let startX = null;
  box.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
  box.addEventListener("touchend", (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 48) show(index + (dx < 0 ? 1 : -1));
    startX = null;
  }, { passive: true });
}

/* ------------------------------------------------------------
   6. RSVP → WhatsApp (static site, no backend)
   ------------------------------------------------------------ */
function initRsvp() {
  const form = $("#rsvp-form");
  const error = $("#rsvp-error");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#rsvp-name").value.trim();
    const guests = $("#rsvp-guests").value.trim() || "1";
    const message = $("#rsvp-message").value.trim();

    if (!name) {
      error.textContent = "Please add your name so we know who to expect.";
      error.hidden = false;
      $("#rsvp-name").focus();
      return;
    }
    error.hidden = true;

    const text =
      `Hello, I would like to RSVP for the wedding of ${weddingData.groom} & ${weddingData.bride}.\n\n` +
      `Name: ${name}\n` +
      `Guests: ${guests}\n` +
      `Message: ${message || "-"}`;

    const url = `https://wa.me/${weddingData.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener");
  });
}

/* ------------------------------------------------------------
   7. MUSIC
   ------------------------------------------------------------ */
const Music = (() => {
  const VOL = 0.42;

  let audio;
  let ac = null, gain = null, src = null, loading = false;

  const ramp = (to, secs) => {
    if (!gain) return;
    const t = ac.currentTime;
    gain.gain.cancelScheduledValues(t);
    gain.gain.setValueAtTime(gain.gain.value, t);
    gain.gain.linearRampToValueAtTime(to, t + secs);
  };

  /* the conch, once, over the opening doors — the music swells in behind it */
  async function invoke() {
    if (!weddingData.invocation || !ac) return;
    try {
      const res = await fetch(weddingData.invocation);
      if (!res.ok) return;
      const buf = await ac.decodeAudioData(await res.arrayBuffer());
      const g = ac.createGain();
      g.gain.value = 0.8;
      g.connect(ac.destination);
      const one = ac.createBufferSource();
      one.buffer = buf;
      one.connect(g);
      one.start(0);
    } catch (e) { /* a missing invocation must never hold up the music */ }
  }

  /* Web Audio loops the track with no gap at the seam; the <audio> element cannot */
  async function playWebAudio() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    if (!ac) ac = new AC();
    if (ac.state === "suspended") await ac.resume();

    const first = !src;
    if (first) {
      if (loading) return true;
      loading = true;
      const res = await fetch(weddingData.music);
      if (!res.ok) { loading = false; throw new Error("track missing"); }
      const buf = await ac.decodeAudioData(await res.arrayBuffer());
      gain = ac.createGain();
      gain.gain.value = 0;
      gain.connect(ac.destination);
      src = ac.createBufferSource();
      src.buffer = buf;
      src.loop = true;
      src.connect(gain);
      src.start(0);
      loading = false;
      invoke();
    }
    /* the first fade is slow so anything over the doors is heard on its own */
    ramp(VOL, first ? 4.5 : 1.2);
    return true;
  }

  /* fallback: the plain audio element (also covers file:// where fetch is blocked) */
  function playElement() {
    if (!audio) return Promise.reject();
    audio.volume = 0;
    const p = audio.play();
    return (p && p.then ? p : Promise.resolve()).then(() => {
      if (env.gsap) gsap.to(audio, { volume: VOL, duration: 4.5 });
      else audio.volume = VOL;
    });
  }

  return {
    init() {
      audio = $("#bg-music");

      /* nothing should keep playing into a tab nobody is looking at */
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          if (ac && ac.state === "running") ac.suspend();
          if (audio && !audio.paused) audio.pause();
        } else {
          if (ac && ac.state === "suspended") ac.resume();
          else if (audio && audio.paused && audio.currentTime) audio.play().catch(() => {});
        }
      });
    },

    /* called from the ENTER WEDDING gesture, which is what unlocks audio on mobile */
    async start() {
      try {
        if (await playWebAudio()) return;
        throw new Error("no web audio");
      } catch (e) {
        try { await playElement(); } catch (err) { /* no file yet, or the browser refused */ }
      }
    }
  };
})();

/* ------------------------------------------------------------
   7b. 3D CARD TILT — pointer-tracked perspective with a moving glare
   ------------------------------------------------------------ */
function initTilt() {
  if (env.mobile || env.reduced) return;
  $$(".tilt, .event-card, .venue-card, .count-card").forEach((el) => {
    let raf = 0, tx = 0, ty = 0;
    const apply = () => {
      raf = 0;
      el.style.transform = `perspective(900px) rotateX(${ty}deg) rotateY(${tx}deg) translateZ(14px)`;
    };
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      tx = (px - 0.5) * 13;
      ty = (py - 0.5) * -11;
      el.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
      el.classList.add("is-tilting");
      if (!raf) raf = requestAnimationFrame(apply);
    });
    el.addEventListener("pointerleave", () => {
      el.classList.remove("is-tilting");
      el.style.transform = "";
    });
  });
}

/* ------------------------------------------------------------
   7c. SAVE-THE-DATE CARD — a real 3D flip
   ------------------------------------------------------------ */
function initFlipCard() {
  const card = $("#flip-card");
  if (!card) return;
  let flipped = false;
  const set = (v) => {
    flipped = v;
    card.classList.toggle("is-flipped", v);
    card.setAttribute("aria-pressed", String(v));
  };
  card.addEventListener("click", () => set(!flipped));

  /* a first, unprompted turn as it scrolls into view, so the 3D is discovered */
  if (env.gsap && typeof ScrollTrigger !== "undefined" && !env.reduced) {
    ScrollTrigger.create({
      trigger: card, start: "top 72%", once: true,
      onEnter: () => { setTimeout(() => set(true), 700); setTimeout(() => set(false), 3000); }
    });
  }
}

/* ------------------------------------------------------------
   7d. BLESSINGS — a 3D carousel on a rotating cylinder
   ------------------------------------------------------------ */
function initCarousel() {
  const ring = $("#bless-ring");
  const dots = $("#bless-dots");
  if (!ring) return;

  const items = weddingData.blessings;
  const n = items.length;
  const step = 360 / n;
  let radius = 300;
  let index = 0, timer = 0;
  ring.innerHTML = items.map((text, i) => `
    <li class="carousel__cell" style="--angle:${i * step}deg" ${i ? 'aria-hidden="true"' : ""}>
      <span class="carousel__mark" aria-hidden="true">&#10047;</span>
      <p class="carousel__text">${text}</p>
    </li>`).join("");

  dots.innerHTML = items.map((_, i) => `
    <button class="carousel__dot${i ? "" : " is-active"}" type="button" role="tab"
      aria-selected="${i === 0}" aria-label="Blessing ${i + 1} of ${n}" data-i="${i}"></button>`).join("");

  const cells = $$(".carousel__cell", ring);
  const dotEls = $$(".carousel__dot", dots);

  /* the cylinder has to be wide enough that neighbouring cards clear each other */
  const size = () => {
    const w = cells[0].getBoundingClientRect().width || 300;
    radius = Math.round((w / 2) / Math.tan(Math.PI / n)) + 44;
    ring.style.setProperty("--radius", `${radius}px`);
    if (env.gsap) gsap.set(ring, { transformPerspective: 1400, z: -radius });
    else ring.style.transform = `translateZ(-${radius}px) rotateY(${-index * step}deg)`;
  };

  const go = (i) => {
    index = ((i % n) + n) % n;
    const rot = -index * step;
    if (env.gsap) gsap.to(ring, { rotationY: rot, duration: env.reduced ? 0.2 : 0.9, ease: "power3.out" });
    else ring.style.transform = `translateZ(-${radius}px) rotateY(${rot}deg)`;
    cells.forEach((c, k) => {
      c.classList.toggle("is-active", k === index);
      if (k === index) c.removeAttribute("aria-hidden"); else c.setAttribute("aria-hidden", "true");
    });
    dotEls.forEach((d, k) => {
      d.classList.toggle("is-active", k === index);
      d.setAttribute("aria-selected", String(k === index));
    });
  };

  size();
  go(0);

  let rt;
  window.addEventListener("resize", () => {
    clearTimeout(rt);
    rt = setTimeout(() => { size(); go(index); }, 160);
  });

  const restart = () => {
    clearInterval(timer);
    if (!env.reduced) timer = setInterval(() => go(index + 1), 6500);
  };
  restart();

  $("#bless-next").addEventListener("click", () => { go(index + 1); restart(); });
  $("#bless-prev").addEventListener("click", () => { go(index - 1); restart(); });
  dotEls.forEach((d) => d.addEventListener("click", () => { go(Number(d.dataset.i)); restart(); }));

  const stage = $(".carousel__stage");
  stage.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { go(index + 1); restart(); }
    else if (e.key === "ArrowLeft") { go(index - 1); restart(); }
  });

  let sx = null;
  stage.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener("touchend", (e) => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 42) { go(index + (dx < 0 ? 1 : -1)); restart(); }
    sx = null;
  }, { passive: true });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) clearInterval(timer); else restart();
  });
}

/* ------------------------------------------------------------
   8b. FLOATING GLASS DOODLES — a shared material kit and the
       stylised wedding objects built from it. Every builder
       returns a THREE.Group so it can be animated on its own,
       and every geometry is made once and reused.
   ------------------------------------------------------------ */
const GlassKit = (() => {
  let envMap = null, normalMap = null, ready = false;
  const cache = {};

  const TINT = { rose: 0xC4738C, amber: 0xE0A05C, maroon: 0x9B3A55, ivory: 0xF0D9B8, gold: 0xC9A227 };

  /* Frosted glass needs a surface. This is a small procedural normal map:
     smooth value noise turned into normals, so even a flat extruded face
     catches the light and shimmers instead of reading as card. */
  function frost() {
    const N = 128;
    const rnd = new Float32Array(N * N);
    for (let i = 0; i < N * N; i++) rnd[i] = Math.random();
    const at = (x, y) => rnd[((y + N) % N) * N + ((x + N) % N)];
    const height = new Float32Array(N * N);
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        let v = 0, amp = 0.5, step = 8;
        for (let o = 0; o < 3; o++) {
          const x0 = Math.floor(x / step), y0 = Math.floor(y / step);
          const fx = (x % step) / step, fy = (y % step) / step;
          const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
          const a = at(x0, y0), b = at(x0 + 1, y0), c = at(x0, y0 + 1), d = at(x0 + 1, y0 + 1);
          v += (a * (1 - sx) * (1 - sy) + b * sx * (1 - sy) + c * (1 - sx) * sy + d * sx * sy) * amp;
          amp *= 0.5; step = Math.max(2, step >> 1);
        }
        height[y * N + x] = v;
      }
    }
    const cvs = document.createElement("canvas"); cvs.width = cvs.height = N;
    const ctx2d = cvs.getContext("2d");
    const img = ctx2d.createImageData(N, N);
    const h = (x, y) => height[((y + N) % N) * N + ((x + N) % N)];
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        const dx = (h(x + 1, y) - h(x - 1, y)) * 2.2;
        const dy = (h(x, y + 1) - h(x, y - 1)) * 2.2;
        const len = Math.hypot(dx, dy, 1);
        const i = (y * N + x) * 4;
        img.data[i] = ((-dx / len) * 0.5 + 0.5) * 255;
        img.data[i + 1] = ((-dy / len) * 0.5 + 0.5) * 255;
        img.data[i + 2] = ((1 / len) * 0.5 + 0.5) * 255;
        img.data[i + 3] = 255;
      }
    }
    ctx2d.putImageData(img, 0, 0);
    const t = new THREE.CanvasTexture(cvs);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(2, 2);
    return t;
  }

  function environment(renderer) {
    const c = document.createElement("canvas"); c.width = 512; c.height = 256;
    const x = c.getContext("2d");
    const g = x.createLinearGradient(0, 0, 0, 256);
    g.addColorStop(0, "#2A0713"); g.addColorStop(0.42, "#7A2138");
    g.addColorStop(0.55, "#E7B45A"); g.addColorStop(0.72, "#4A0F20"); g.addColorStop(1, "#12030A");
    x.fillStyle = g; x.fillRect(0, 0, 512, 256);
    for (let i = 0; i < 14; i++) {
      const cx = Math.random() * 512, cy = 40 + Math.random() * 150, r = 12 + Math.random() * 44;
      const rg = x.createRadialGradient(cx, cy, 0, cx, cy, r);
      rg.addColorStop(0, "rgba(255,225,170,0.9)"); rg.addColorStop(1, "rgba(255,200,120,0)");
      x.fillStyle = rg; x.beginPath(); x.arc(cx, cy, r, 0, 6.3); x.fill();
    }
    const tex = new THREE.CanvasTexture(c);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    envMap = pmrem.fromEquirectangular(tex).texture;
    normalMap = frost();
    tex.dispose(); pmrem.dispose();
    ready = true;
    return envMap;
  }

  const glass = (tint = "rose", opacity = 0.34) => {
    const key = `g${tint}${opacity}`;
    const base = new THREE.Color(TINT[tint] || tint);
    return cache[key] || (cache[key] = new THREE.MeshPhysicalMaterial({
      color: base, metalness: 0.12, roughness: 0.08,
      clearcoat: 1, clearcoatRoughness: 0.04,
      emissive: base.clone().multiplyScalar(0.22), emissiveIntensity: 1,
      normalMap, normalScale: new THREE.Vector2(0.4, 0.4),
      transparent: true, opacity: Math.min(1, opacity + 0.12), envMap, envMapIntensity: 2.8,
      side: THREE.DoubleSide, depthWrite: false
    }));
  };

  /* Carved crystal rather than a soap bubble: writes depth, so overlapping
     forms occlude one another and a shape like a trunk actually reads. */
  const solidGlass = (tint = "rose", opacity = 0.72) => {
    const key = `s${tint}${opacity}`;
    const base = new THREE.Color(TINT[tint] || tint);
    return cache[key] || (cache[key] = new THREE.MeshPhysicalMaterial({
      color: base, metalness: 0.15, roughness: 0.14,
      clearcoat: 1, clearcoatRoughness: 0.08,
      emissive: base.clone().multiplyScalar(0.3), emissiveIntensity: 1,
      normalMap, normalScale: new THREE.Vector2(0.5, 0.5),
      transparent: true, opacity, envMap, envMapIntensity: 2.4,
      side: THREE.FrontSide, depthWrite: true
    }));
  };

  const carved = (geometry, tint = "rose", opacity = 0.72, edges = true) => {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(geometry, solidGlass(tint, opacity)));
    if (edges) {
      const e = geometry.userData.edges || (geometry.userData.edges = new THREE.EdgesGeometry(geometry, 30));
      g.add(new THREE.LineSegments(e, line()));
    }
    return g;
  };

  /* Repeated parts — petals, rays, beads — go through one instanced draw
     call instead of one call each. This is most of the frame budget. */
  function instanced(geometry, material, transforms) {
    const mesh = new THREE.InstancedMesh(geometry, material, transforms.length);
    const dummy = new THREE.Object3D();
    transforms.forEach((t, i) => {
      dummy.position.set(t.p[0], t.p[1], t.p[2]);
      if (t.r) dummy.rotation.set(t.r[0], t.r[1], t.r[2]);
      else dummy.rotation.set(0, 0, 0);
      dummy.scale.set(t.s || 1, t.sy || t.s || 1, t.s || 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }

  const gold = (emissive = 0.5) => {
    const key = `m${emissive}`;
    return cache[key] || (cache[key] = new THREE.MeshStandardMaterial({
      color: 0xC9A227, metalness: 0.95, roughness: 0.25,
      emissive: 0x6E5310, emissiveIntensity: emissive, envMap, envMapIntensity: 1.4
    }));
  };

  const line = () => cache.line || (cache.line = new THREE.LineBasicMaterial({
    color: 0xF2E2B6, transparent: true, opacity: 0.7
  }));

  const rim = () => cache.rim || (cache.rim = new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color(0xF2E2B6) }, uPower: { value: 3.2 }, uStrength: { value: 0.5 } },
    vertexShader: `varying vec3 vN; varying vec3 vV;
      void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0);
        vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `uniform vec3 uColor; uniform float uPower; uniform float uStrength;
      varying vec3 vN; varying vec3 vV;
      void main(){ float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), uPower);
        gl_FragColor = vec4(uColor, f * uStrength); }`,
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide
  }));

  const emissive = (color = 0xFFD79A) => {
    const key = `e${color}`;
    return cache[key] || (cache[key] = new THREE.MeshBasicMaterial({ color }));
  };

  /* one glass piece: body + gold edges + fresnel rim, all sharing one geometry */
  function piece(geometry, tint = "rose", opacity = 0.34, edges = true) {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(geometry, glass(tint, opacity)));
    const r = new THREE.Mesh(geometry, rim());
    r.scale.setScalar(1.012);
    g.add(r);
    if (edges) {
      const e = geometry.userData.edges || (geometry.userData.edges = new THREE.EdgesGeometry(geometry, 28));
      g.add(new THREE.LineSegments(e, line()));
    }
    return g;
  }

  const lathe = (profile, seg = 26) =>
    new THREE.LatheGeometry(profile.map(([x, y]) => new THREE.Vector2(x, y)), seg);

  /* an extruded silhouette with a soft bevel, from a path-drawing function */
  function silhouette(draw, depth = 0.09, bevel = 0.03) {
    const shape = new THREE.Shape();
    draw(shape);
    return new THREE.ExtrudeGeometry(shape, {
      depth, bevelEnabled: true, bevelThickness: bevel * 1.8, bevelSize: bevel * 1.8,
      bevelSegments: 3, curveSegments: 14
    });
  }

  return { environment, glass, solidGlass, carved, instanced, gold, line, rim, emissive, piece, lathe, silhouette, get envMap() { return envMap; }, get ready() { return ready; } };
})();

/* ===== DOODLE BUILDERS — every one returns a THREE.Group ===== */
const Doodle = (() => {
  const G = {};   // geometry cache: build each shape once, reuse everywhere

  const geo = (key, make) => G[key] || (G[key] = make());

  /* --- petals, flowers --- */
  function petalGeo() {
    return geo("petal", () => GlassKit.silhouette((s) => {
      s.moveTo(0, -0.5);
      s.bezierCurveTo(0.42, -0.18, 0.36, 0.34, 0, 0.55);
      s.bezierCurveTo(-0.36, 0.34, -0.42, -0.18, 0, -0.5);
    }, 0.06, 0.02));
  }

  function createGlassPetal(tint = "rose") {
    const g = GlassKit.piece(petalGeo(), tint, 0.36);
    const vein = new THREE.Mesh(
      new THREE.CylinderGeometry(0.006, 0.006, 0.86, 5),
      GlassKit.gold(0.8)
    );
    g.add(vein);
    return g;
  }

  function createGlassFlower(petals = 6, tint = "rose", scale = 1) {
    const g = new THREE.Group();
    const spots = [], veins = [];
    for (let i = 0; i < petals; i++) {
      const a = (i / petals) * Math.PI * 2;
      const at = [Math.cos(a) * 0.42, Math.sin(a) * 0.42, (i % 2) * 0.03];
      spots.push({ p: at, r: [0, 0, a] });
      veins.push({ p: at, r: [0, 0, a] });
    }
    g.add(GlassKit.instanced(petalGeo(), GlassKit.glass(tint, 0.36), spots));
    g.add(GlassKit.instanced(geo("vein", () => new THREE.CylinderGeometry(0.006, 0.006, 0.86, 5)),
      GlassKit.gold(0.8), veins));
    g.add(new THREE.Mesh(geo("core", () => new THREE.SphereGeometry(0.16, 12, 12)), GlassKit.gold(0.9)));
    g.scale.setScalar(scale);
    return g;
  }

  function createGlassMarigold(scale = 1) {
    const g = new THREE.Group();
    const spots = [];
    for (let ring = 0; ring < 3; ring++) {
      const r = 0.18 + ring * 0.12, n = 6 + ring * 3;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + ring * 0.4;
        spots.push({ p: [Math.cos(a) * r, Math.sin(a) * r, (ring - 1) * 0.06] });
      }
    }
    g.add(GlassKit.instanced(geo("mpetal", () => new THREE.SphereGeometry(0.1, 8, 6)),
      GlassKit.glass("amber", 0.42), spots));
    g.add(new THREE.Mesh(geo("mcore", () => new THREE.SphereGeometry(0.12, 10, 10)), GlassKit.gold(1)));
    g.scale.setScalar(scale);
    return g;
  }

  function createGlassLotus() {
    const g = new THREE.Group();
    [[8, 0.5, 1.05, 0, 1], [7, 0.34, 0.72, 0.1, 0.78], [5, 0.18, 0.4, 0.2, 0.52]].forEach(([n, r, tilt, y, sc], ring) => {
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + ring * 0.45;
        const p = GlassKit.piece(petalGeo(), ring === 0 ? "rose" : "ivory", 0.34);
        p.position.set(Math.cos(a) * r, y, Math.sin(a) * r);
        p.rotation.set(Math.PI / 2 - tilt, 0, -a);
        p.scale.setScalar(sc);
        g.add(p);
      }
    });
    g.add(new THREE.Mesh(geo("lotusCore", () => new THREE.SphereGeometry(0.09, 10, 10)), GlassKit.gold(1)));
    return g;
  }

  function createGlassLeaf() {
    const l = GlassKit.piece(geo("leaf", () => GlassKit.silhouette((s) => {
      s.moveTo(0, -0.55);
      s.bezierCurveTo(0.5, -0.1, 0.34, 0.4, 0, 0.6);
      s.bezierCurveTo(-0.34, 0.4, -0.5, -0.1, 0, -0.55);
    }, 0.05, 0.02)), "amber", 0.3);
    return l;
  }

  /* --- vessels --- */
  const bowlGeo = () => geo("bowl", () => GlassKit.lathe([
    [0.02, 0], [0.3, 0.02], [0.42, 0.1], [0.5, 0.26], [0.52, 0.38], [0.5, 0.4], [0.43, 0.26], [0.34, 0.08], [0.02, 0.04]
  ]));

  const kalashGeo = () => geo("kalash", () => GlassKit.lathe([
    [0.02, 0], [0.26, 0.02], [0.34, 0.1], [0.44, 0.34], [0.42, 0.62], [0.3, 0.84],
    [0.18, 0.94], [0.16, 1.02], [0.26, 1.1], [0.3, 1.18], [0.14, 1.22], [0.03, 1.24]
  ]));

  const diyaGeo = () => geo("diya", () => GlassKit.lathe([
    [0.02, 0], [0.22, 0.01], [0.34, 0.06], [0.4, 0.16], [0.38, 0.2], [0.3, 0.1], [0.18, 0.05], [0.02, 0.04]
  ]));

  function createGlassBowl(tint = "amber") {
    const g = GlassKit.piece(bowlGeo(), tint, 0.32);
    const fill = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.34, 0.04, 20), GlassKit.gold(1.1));
    fill.position.y = 0.28;
    g.add(fill);
    return g;
  }

  function createGlassKalash() {
    const g = GlassKit.piece(kalashGeo(), "rose", 0.3);
    const coconut = new THREE.Mesh(geo("coco", () => new THREE.SphereGeometry(0.19, 14, 12)), GlassKit.glass("amber", 0.5));
    coconut.position.y = 1.46; coconut.scale.set(1, 1.15, 1); g.add(coconut);
    for (let i = 0; i < 6; i++) {
      const leaf = createGlassLeaf();
      leaf.scale.setScalar(0.62);
      const a = (i / 6) * Math.PI * 2;
      leaf.position.set(Math.cos(a) * 0.26, 1.3, Math.sin(a) * 0.26);
      leaf.rotation.set(1.0, -a, 0.2);
      g.add(leaf);
    }
    return g;
  }

  function createGlassDiya(lit = true) {
    const g = GlassKit.piece(diyaGeo(), "amber", 0.4);
    if (lit) {
      const flame = new THREE.Mesh(geo("flame", () => new THREE.SphereGeometry(0.06, 10, 10)), GlassKit.emissive(0xFFD79A));
      flame.position.y = 0.14; flame.scale.set(0.8, 2, 0.8);
      flame.name = "flame";
      g.add(flame);
    }
    return g;
  }

  function createGlassSpoon() {
    const g = new THREE.Group();
    const b = GlassKit.piece(geo("spoonB", () => new THREE.SphereGeometry(0.1, 10, 8)), "ivory", 0.4, false);
    b.scale.set(1, 0.4, 1.3);
    const h = new THREE.Mesh(geo("spoonH", () => new THREE.CylinderGeometry(0.018, 0.018, 0.6, 6)), GlassKit.gold(0.7));
    h.position.set(0, 0.02, -0.36); h.rotation.x = Math.PI / 2;
    g.add(b, h);
    return g;
  }

  return { GlassKit, geo, createGlassPetal, createGlassFlower, createGlassMarigold, createGlassLotus,
           createGlassLeaf, createGlassBowl, createGlassKalash, createGlassDiya, createGlassSpoon,
           petalGeo, bowlGeo, kalashGeo, diyaGeo };
})();

/* ===== the rest of the doodle family ===== */
const Doodle2 = (() => {
  const geo = Doodle.geo;
  const K = GlassKit;

  /* --- mehndi --- */
  function createGlassMehndiCone() {
    const g = K.piece(geo("cone", () => new THREE.ConeGeometry(0.26, 0.9, 16, 1, true)), "maroon", 0.36);
    const tip = new THREE.Mesh(geo("tip", () => new THREE.ConeGeometry(0.05, 0.16, 8)), K.gold(0.9));
    tip.position.y = -0.52; tip.rotation.z = Math.PI;
    g.add(tip);
    const band = new THREE.Mesh(geo("band", () => new THREE.TorusGeometry(0.2, 0.015, 6, 20)), K.gold(0.8));
    band.rotation.x = Math.PI / 2; band.position.y = 0.12;
    g.add(band);
    return g;
  }

  function createGlassBangle() {
    const g = K.piece(geo("bangle", () => new THREE.TorusGeometry(0.32, 0.035, 8, 30)), "rose", 0.34, false);
    const inlay = new THREE.Mesh(geo("bangleIn", () => new THREE.TorusGeometry(0.32, 0.012, 6, 30)), K.gold(0.9));
    g.add(inlay);
    return g;
  }

  function createGlassJhumka() {
    const g = new THREE.Group();
    const dome = K.piece(geo("jhumka", () => new THREE.SphereGeometry(0.22, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2)), "rose", 0.36, false);
    dome.rotation.x = Math.PI;
    g.add(dome);
    const ring = new THREE.Mesh(geo("jring", () => new THREE.TorusGeometry(0.09, 0.014, 6, 16)), K.gold(0.9));
    ring.position.y = 0.2; g.add(ring);
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2;
      const bead = new THREE.Mesh(geo("bead", () => new THREE.SphereGeometry(0.035, 8, 8)), K.gold(1));
      bead.position.set(Math.cos(a) * 0.21, -0.06, Math.sin(a) * 0.21);
      g.add(bead);
    }
    return g;
  }

  /* --- sangeet --- */
  function createGlassDhol() {
    const g = new THREE.Group();
    const body = K.piece(geo("dhol", () => K.lathe([
      [0.02, 0], [0.32, 0], [0.34, 0.08], [0.28, 0.4], [0.28, 0.5], [0.34, 0.82], [0.32, 0.9], [0.02, 0.9]
    ], 22)), "maroon", 0.34);
    g.add(body);
    [0.02, 0.88].forEach((y) => {
      const rim = new THREE.Mesh(geo("dholRim", () => new THREE.TorusGeometry(0.33, 0.022, 6, 22)), K.gold(0.85));
      rim.rotation.x = Math.PI / 2; rim.position.y = y; g.add(rim);
    });
    for (let i = 0; i < 8; i++) {                       // lacing
      const a = (i / 8) * Math.PI * 2;
      const cord = new THREE.Mesh(geo("cord", () => new THREE.CylinderGeometry(0.008, 0.008, 0.86, 4)), K.gold(0.6));
      cord.position.set(Math.cos(a) * 0.3, 0.45, Math.sin(a) * 0.3);
      g.add(cord);
    }
    g.rotation.z = Math.PI / 2;
    return g;
  }

  function createGlassNote() {
    const g = new THREE.Group();
    const head = K.piece(geo("noteHead", () => new THREE.SphereGeometry(0.13, 12, 10)), "ivory", 0.42, false);
    head.scale.set(1.2, 0.85, 0.5);
    head.rotation.z = -0.4;
    const stem = new THREE.Mesh(geo("noteStem", () => new THREE.CylinderGeometry(0.018, 0.018, 0.6, 6)), K.gold(0.9));
    stem.position.set(0.13, 0.3, 0);
    const flag = new THREE.Mesh(geo("noteFlag", () => new THREE.TorusGeometry(0.12, 0.016, 6, 12, Math.PI)), K.gold(0.9));
    flag.position.set(0.2, 0.5, 0); flag.rotation.z = -1.1;
    g.add(head, stem, flag);
    return g;
  }

  function createGhungroo() {
    const g = new THREE.Group();
    const strand = new THREE.Mesh(geo("strand", () => new THREE.TorusGeometry(0.3, 0.008, 5, 26)), K.gold(0.7));
    g.add(strand);
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      const bell = K.piece(geo("ghung", () => new THREE.SphereGeometry(0.055, 8, 8)), "amber", 0.5, false);
      bell.position.set(Math.cos(a) * 0.3, Math.sin(a) * 0.3, 0);
      g.add(bell);
    }
    return g;
  }

  /* --- silhouettes: minimal, elegant, never cartoonish --- */
  function createGlassHorse() {
    const g = new THREE.Group();
    const body = K.piece(geo("horse", () => K.silhouette((s) => {
      s.moveTo(0.30, 0.06);
      s.lineTo(0.34, -0.86); s.lineTo(0.22, -0.86); s.lineTo(0.20, 0.06);    // foreleg
      s.lineTo(0.14, 0.06); s.lineTo(0.12, -0.80); s.lineTo(0.02, -0.80); s.lineTo(0.04, 0.04);
      s.lineTo(-0.14, 0.04);                                                 // belly
      s.lineTo(-0.16, -0.80); s.lineTo(-0.28, -0.80); s.lineTo(-0.26, 0.04);  // hind leg
      s.lineTo(-0.40, 0.04); s.lineTo(-0.44, -0.86); s.lineTo(-0.56, -0.86); s.lineTo(-0.54, 0.06);
      s.quadraticCurveTo(-0.66, 0.22, -0.48, 0.34);                          // rump
      s.quadraticCurveTo(-0.10, 0.46, 0.22, 0.36);                           // back
      s.quadraticCurveTo(0.34, 0.62, 0.44, 0.86);                            // neck
      s.quadraticCurveTo(0.50, 0.99, 0.66, 0.96);                            // crest
      s.lineTo(0.82, 0.84);                                                  // forehead
      s.quadraticCurveTo(0.92, 0.78, 0.86, 0.68);                            // muzzle
      s.lineTo(0.64, 0.70);                                                  // jaw
      s.quadraticCurveTo(0.50, 0.64, 0.44, 0.48);                            // throat
      s.quadraticCurveTo(0.36, 0.26, 0.30, 0.06);
      s.closePath();
    }, 0.11, 0.03)), "amber", 0.34);
    body.position.set(-0.11, -0.2, 0);
    g.add(body);
    const ear = new THREE.Mesh(geo("ear", () => new THREE.ConeGeometry(0.05, 0.13, 6)), K.gold(0.8));
    ear.position.set(0.49, 0.82, 0); ear.rotation.z = -0.3;
    g.add(ear);
    const tail = K.piece(geo("tail", () => K.silhouette((s) => {
      s.moveTo(0, 0.3);
      s.quadraticCurveTo(0.24, 0.05, 0.12, -0.34);
      s.quadraticCurveTo(0.06, -0.06, -0.08, 0.3);
      s.closePath();
    }, 0.06, 0.02)), "amber", 0.4, false);
    tail.position.set(-0.72, -0.08, 0);
    g.add(tail);
    return g;
  }

  function createGroomSilhouette() {
    return K.piece(geo("groom", () => K.silhouette((s) => {
      s.moveTo(-0.16, -0.6);
      s.lineTo(-0.2, 0.1); s.quadraticCurveTo(-0.22, 0.3, -0.1, 0.36);
      s.quadraticCurveTo(-0.16, 0.52, 0, 0.56);      // head
      s.quadraticCurveTo(0.16, 0.52, 0.1, 0.36);
      s.quadraticCurveTo(0.22, 0.3, 0.2, 0.1);
      s.lineTo(0.16, -0.6);
      s.closePath();
    }, 0.08, 0.025)), "ivory", 0.38);
  }

  function createBrideSilhouette() {
    return K.piece(geo("bride", () => K.silhouette((s) => {
      s.moveTo(-0.3, -0.6);
      s.quadraticCurveTo(-0.2, 0.05, -0.16, 0.2);
      s.quadraticCurveTo(-0.2, 0.36, -0.08, 0.4);
      s.quadraticCurveTo(-0.14, 0.54, 0, 0.58);
      s.quadraticCurveTo(0.14, 0.54, 0.08, 0.4);
      s.quadraticCurveTo(0.2, 0.36, 0.16, 0.2);
      s.quadraticCurveTo(0.2, 0.05, 0.3, -0.6);
      s.closePath();
    }, 0.08, 0.025)), "rose", 0.4);
  }

  function createGlassSehra() {                       // the groom's veil of flowers
    const g = new THREE.Group();
    for (let i = 0; i < 7; i++) {
      const strand = new THREE.Group();
      const len = 4 + Math.round(Math.abs(Math.sin(i * 1.3)) * 3);
      for (let j = 0; j < len; j++) {
        const bead = K.piece(geo("sehraBead", () => new THREE.SphereGeometry(0.05, 8, 8)),
          j % 3 === 0 ? "amber" : (j % 3 === 1 ? "rose" : "ivory"), 0.46, false);
        bead.position.set(Math.sin(j * 0.5 + i) * 0.03, -0.1 - j * 0.12, 0);
        bead.scale.setScalar(0.85 + (j % 2) * 0.3);
        strand.add(bead);
      }
      strand.position.x = (i - 3) * 0.085;
      g.add(strand);
    }
    const crown = new THREE.Mesh(geo("sehraTop", () => new THREE.TorusGeometry(0.3, 0.022, 6, 22, Math.PI)), K.gold(0.95));
    g.add(crown);
    for (let i = 0; i < 4; i++) {
      const f = Doodle.createGlassMarigold(0.3);
      f.position.set((i - 1.5) * 0.16, 0.06, 0.04);
      g.add(f);
    }
    return g;
  }

  function createGlassShehnai() {
    const g = K.piece(geo("shehnai", () => K.lathe([
      [0.03, 0], [0.05, 0.1], [0.055, 0.5], [0.08, 0.72], [0.16, 0.86], [0.26, 0.96], [0.24, 0.99], [0.03, 0.9]
    ], 18)), "amber", 0.4);
    return g;
  }

  function createGlassUmbrella() {
    const g = new THREE.Group();
    const canopy = K.piece(geo("umbrella", () => new THREE.SphereGeometry(0.6, 20, 8, 0, Math.PI * 2, 0, Math.PI / 2.6)), "maroon", 0.32, false);
    g.add(canopy);
    const pole = new THREE.Mesh(geo("pole", () => new THREE.CylinderGeometry(0.014, 0.014, 1.1, 6)), K.gold(0.7));
    pole.position.y = -0.4; g.add(pole);
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      const tassel = new THREE.Mesh(geo("tassel", () => new THREE.SphereGeometry(0.03, 6, 6)), K.gold(1));
      tassel.position.set(Math.cos(a) * 0.58, -0.02, Math.sin(a) * 0.58);
      g.add(tassel);
    }
    return g;
  }

  /* --- jaimala --- */
  function createGlassGarland(radius = 0.9) {
    const g = new THREE.Group();
    const n = 22;
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);
      const a = Math.PI * (0.1 + t * 0.8);
      const flower = i % 3 === 0
        ? Doodle.createGlassMarigold(0.34)
        : K.piece(geo("gbead", () => new THREE.SphereGeometry(0.1, 10, 8)), i % 3 === 1 ? "rose" : "ivory", 0.42, false);
      flower.position.set(-Math.cos(a) * radius, -Math.sin(a) * radius * 0.8, Math.sin(i * 1.7) * 0.06);
      g.add(flower);
    }
    return g;
  }

  function createGlassRing() {
    const g = K.piece(geo("ring", () => new THREE.TorusGeometry(0.22, 0.045, 10, 26)), "ivory", 0.3, false);
    const band = new THREE.Mesh(geo("ringBand", () => new THREE.TorusGeometry(0.22, 0.018, 8, 26)), K.gold(1));
    g.add(band);
    const stone = new THREE.Mesh(geo("stone", () => new THREE.OctahedronGeometry(0.075, 0)), K.emissive(0xFFF0CC));
    stone.position.y = 0.24;
    g.add(stone);
    return g;
  }

  /* --- mandap, fire, doli, reception --- */
  function createGlassMandap() {
    const g = new THREE.Group();
    const pillarGeo = geo("pillar", () => K.lathe([
      [0.12, 0], [0.16, 0.06], [0.1, 0.12], [0.1, 1.5], [0.16, 1.58], [0.12, 1.66], [0.02, 1.68]
    ], 14));
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([x, z]) => {
      const p = K.piece(pillarGeo, "rose", 0.3, false);
      p.position.set(x * 1.15, -0.85, z * 1.15);
      g.add(p);
    });
    const canopy = K.piece(geo("canopy", () => new THREE.SphereGeometry(1.9, 22, 10, 0, Math.PI * 2, 0, Math.PI / 3.4)), "maroon", 0.26, false);
    canopy.position.y = 0.7;
    g.add(canopy);
    const finial = new THREE.Mesh(geo("finial", () => new THREE.ConeGeometry(0.12, 0.4, 10)), K.gold(0.9));
    finial.position.y = 1.24; g.add(finial);
    /* floral toran between the front pillars */
    for (let i = 0; i <= 9; i++) {
      const t = i / 9;
      const bead = K.piece(geo("toran", () => new THREE.SphereGeometry(0.07, 8, 8)), i % 2 ? "amber" : "rose", 0.46, false);
      bead.position.set((t - 0.5) * 2.3, 0.62 - Math.sin(t * Math.PI) * 0.28, 1.15);
      g.add(bead);
    }
    return g;
  }

  function createSacredFire() {
    const g = new THREE.Group();
    const bowl = K.piece(geo("kund", () => K.lathe([
      [0.02, 0], [0.5, 0], [0.55, 0.06], [0.5, 0.3], [0.46, 0.32], [0.48, 0.08], [0.4, 0.04], [0.02, 0.03]
    ], 18)), "maroon", 0.34);
    g.add(bowl);
    for (let i = 0; i < 5; i++) {
      const f = new THREE.Mesh(geo("fire", () => new THREE.ConeGeometry(0.12, 0.5, 8)), K.emissive(i % 2 ? 0xFFD79A : 0xFF9A4A));
      f.position.set((Math.random() - 0.5) * 0.24, 0.34 + Math.random() * 0.12, (Math.random() - 0.5) * 0.24);
      f.name = "flame";
      f.userData.phase = Math.random() * 6.28;
      g.add(f);
    }
    return g;
  }

  function createFireRing() {
    const g = new THREE.Group();
    const ring = new THREE.Mesh(geo("fireRing", () => new THREE.TorusGeometry(1.5, 0.02, 8, 80)), K.gold(1.2));
    ring.rotation.x = Math.PI / 2;
    g.add(ring);
    for (let i = 0; i < 7; i++) {                       // the seven vows
      const a = (i / 7) * Math.PI * 2;
      const p = new THREE.Mesh(geo("vow", () => new THREE.SphereGeometry(0.075, 10, 10)), K.emissive(0xFFE0A8));
      p.position.set(Math.cos(a) * 1.5, 0, Math.sin(a) * 1.5);
      p.name = "vow"; p.userData.index = i;
      g.add(p);
    }
    return g;
  }

  function createGlassDoli() {
    const g = new THREE.Group();
    const cabin = K.piece(geo("doli", () => new THREE.BoxGeometry(1.05, 0.7, 0.7)), "maroon", 0.3);
    g.add(cabin);
    const roof = K.piece(geo("doliRoof", () => new THREE.ConeGeometry(0.85, 0.42, 4)), "rose", 0.34, false);
    roof.position.y = 0.55; roof.rotation.y = Math.PI / 4;
    g.add(roof);
    const pole = new THREE.Mesh(geo("doliPole", () => new THREE.CylinderGeometry(0.026, 0.026, 2.4, 6)), K.gold(0.7));
    pole.rotation.z = Math.PI / 2; pole.position.y = 0.42;
    g.add(pole);
    for (let i = 0; i < 6; i++) {
      const t = new THREE.Mesh(geo("doliTassel", () => new THREE.SphereGeometry(0.05, 6, 6)), K.gold(1));
      t.position.set(-0.5 + i * 0.2, -0.4, 0.36);
      g.add(t);
    }
    return g;
  }

  function createGlassGoblet() {
    return K.piece(geo("goblet", () => K.lathe([
      [0.02, 0], [0.28, 0], [0.3, 0.03], [0.06, 0.06], [0.035, 0.1], [0.035, 0.42],
      [0.26, 0.56], [0.3, 0.8], [0.28, 0.82], [0.24, 0.58], [0.03, 0.44], [0.02, 0.1]
    ], 20)), "ivory", 0.3);
  }

  function createHangingLight() {
    const g = new THREE.Group();
    const shade = K.piece(geo("shade", () => new THREE.SphereGeometry(0.22, 14, 10)), "amber", 0.34, false);
    const core = new THREE.Mesh(geo("bulb", () => new THREE.SphereGeometry(0.08, 8, 8)), K.emissive(0xFFD79A));
    const wire = new THREE.Mesh(geo("wire", () => new THREE.CylinderGeometry(0.005, 0.005, 1.2, 4)), K.gold(0.5));
    wire.position.y = 0.6;
    g.add(shade, core, wire);
    return g;
  }

  function createMandalaShard() {
    const g = K.piece(geo("shard", () => new THREE.TorusGeometry(0.3, 0.02, 6, 20)), "ivory", 0.3, false);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const p = new THREE.Mesh(geo("shardP", () => new THREE.TorusGeometry(0.09, 0.012, 5, 12)), GlassKit.gold(0.8));
      p.position.set(Math.cos(a) * 0.3, Math.sin(a) * 0.3, 0);
      p.rotation.z = a;
      g.add(p);
    }
    return g;
  }

  /* Saat Phere is a composition, not a scatter: the fire at the centre, the
     seven vows circling it, the couple turning slowly around them both. */
  function createPhereComposition() {
    const g = new THREE.Group();
    const fire = createSacredFire();
    fire.scale.setScalar(1.1);
    g.add(fire);

    const ring = createFireRing();
    ring.position.y = 0.1;
    g.add(ring);

    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(2.1, 0.012, 6, 90),
      K.gold(0.9)
    );
    halo.rotation.x = Math.PI / 2;
    halo.position.y = 0.1;
    g.add(halo);

    const groom = createGroomSilhouette();
    groom.scale.setScalar(1.5);
    groom.position.set(-1.5, 0.75, 0.4);
    groom.name = "orbitA";
    const bride = createBrideSilhouette();
    bride.scale.setScalar(1.5);
    bride.position.set(1.5, 0.75, -0.4);
    bride.name = "orbitB";
    g.add(groom, bride);
    return g;
  }

  /* the mandap with its kalash and lamps already set out beneath it */
  function createMandapComposition() {
    const g = new THREE.Group();
    g.add(createGlassMandap());
    const kalash = Doodle.createGlassKalash();
    kalash.scale.setScalar(0.7);
    kalash.position.set(-1.5, -1.4, 0.9);
    g.add(kalash);
    [[1.5, 0.9], [-0.8, 1.4], [0.9, 1.5]].forEach(([x, z], i) => {
      const d = Doodle.createGlassDiya(true);
      d.scale.setScalar(0.85);
      d.position.set(x, -1.55, z);
      g.add(d);
    });
    const fire = createSacredFire();
    fire.scale.setScalar(0.75);
    fire.position.y = -1.6;
    g.add(fire);
    return g;
  }

  return { createPhereComposition, createMandapComposition, createGlassMehndiCone, createGlassBangle, createGlassJhumka, createGlassDhol, createGlassNote,
           createGhungroo, createGlassHorse, createGroomSilhouette, createBrideSilhouette, createGlassSehra,
           createGlassShehnai, createGlassUmbrella, createGlassGarland, createGlassRing, createGlassMandap,
           createSacredFire, createFireRing, createGlassDoli, createGlassGoblet, createHangingLight, createMandalaShard };
})();

Object.assign(Doodle, Doodle2);

/* ------------------------------------------------------------
   8b-ii. THE INVOCATION MURTIS — Ganesha and Lakshmi, carved as
   translucent crystal with gold ornament. Faceless by intent: a
   jewelled glass murti reads as devotional, where a modelled face
   would read as a toy.
   ------------------------------------------------------------ */
/* ===== murtis =====
   Faceless by intent: a jewelled glass murti reads as devotional, where a
   modelled face would read as a toy. */
const Murti = (() => {
  const K = GlassKit;
  const G = {};
  const geo = (k, make) => G[k] || (G[k] = make());

  const tube = (points, r, seg = 20) =>
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p))), seg, r, 8, false);

  /* a seated body: broad lap, round belly, narrow chest */
  const bodyGeo = (k) => geo(k, () => K.lathe([
    [0.02, 0], [0.62, 0.02], [0.7, 0.12], [0.66, 0.3], [0.56, 0.5],
    [0.44, 0.66], [0.34, 0.78], [0.3, 0.9], [0.24, 0.98], [0.02, 1.0]
  ], 26));

  const lotusBase = (petals = 12, r = 0.9) => {
    const g = new THREE.Group();
    const petalGeo = geo("lp", () => K.silhouette((s) => {
      s.moveTo(0, -0.5);
      s.bezierCurveTo(0.34, -0.16, 0.28, 0.3, 0, 0.5);
      s.bezierCurveTo(-0.28, 0.3, -0.34, -0.16, 0, -0.5);
    }, 0.05, 0.02));
    for (let ring = 0; ring < 2; ring++) {
      const n = petals - ring * 3, rad = r - ring * 0.16;
      const spots = [];
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + ring * 0.3;
        spots.push({
          p: [Math.cos(a) * rad, ring * 0.12, Math.sin(a) * rad],
          r: [Math.PI / 2 - 0.85 + ring * 0.2, 0, -a],
          s: 0.55 - ring * 0.08
        });
      }
      g.add(K.instanced(petalGeo, K.solidGlass(ring ? "ivory" : "rose", 0.62), spots));
    }
    const seat = new THREE.Mesh(geo("seat", () => new THREE.CylinderGeometry(r * 0.52, r * 0.42, 0.1, 20)), K.gold(0.7));
    seat.position.y = 0.14;
    g.add(seat);
    return g;
  };

  /* crown: a temple mukut, gold, with a finial */
  const mukut = (r = 0.3, h = 0.42) => {
    const g = new THREE.Group();
    const band = new THREE.Mesh(geo("mband", () => new THREE.TorusGeometry(1, 0.07, 8, 24)), K.gold(0.9));
    band.rotation.x = Math.PI / 2;
    band.scale.setScalar(r);
    g.add(band);
    const cone = K.carved(geo("mcone", () => K.lathe([
      [0.02, 0], [1, 0.04], [1.05, 0.14], [0.82, 0.3], [0.9, 0.44], [0.7, 0.6],
      [0.66, 0.72], [0.4, 0.84], [0.3, 0.92], [0.1, 0.99], [0.02, 1]
    ], 20)), "amber", 0.82, false);
    cone.scale.set(r, h, r);
    cone.position.y = 0.05;
    g.add(cone);
    const finial = new THREE.Mesh(geo("mfin", () => new THREE.SphereGeometry(0.05, 10, 10)), K.gold(1.1));
    finial.position.y = h + 0.08;
    g.add(finial);
    const jewels = [];
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2;
      jewels.push({ p: [Math.cos(a) * r, 0.06, Math.sin(a) * r] });
    }
    g.add(K.instanced(geo("mjewel", () => new THREE.OctahedronGeometry(0.035, 0)), K.gold(1.2), jewels));
    return g;
  };

  /* a halo of light behind the head */
  const prabha = (r = 1.1, tint = 0xE7CE8E) => {
    const g = new THREE.Group();
    const ring = new THREE.Mesh(geo("prabhaR", () => new THREE.TorusGeometry(1, 0.018, 8, 64)), K.gold(1));
    ring.scale.setScalar(r);
    g.add(ring);
    const inner = new THREE.Mesh(geo("prabhaI", () => new THREE.TorusGeometry(1, 0.01, 6, 56)), K.gold(0.7));
    inner.scale.setScalar(r * 0.82);
    g.add(inner);
    const rays = [];
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      rays.push({ p: [Math.cos(a) * r * 1.1, Math.sin(a) * r * 1.1, 0], r: [0, 0, a - Math.PI / 2] });
    }
    g.add(K.instanced(geo("prabhaRay", () => new THREE.ConeGeometry(0.022, 0.16, 5)), K.gold(0.9), rays));
    return g;
  };

  const arm = (pts, r = 0.075, tint = "rose") =>
    K.carved(tube(pts, r), tint, 0.8, false);

  function createGanesha() {
    const g = new THREE.Group();

    g.add(lotusBase(12, 0.95));

    const body = K.carved(bodyGeo("gbody"), "amber", 0.74);
    body.position.y = 0.18;
    g.add(body);

    /* the belly, the most recognisable line of the murti */
    const belly = K.carved(geo("belly", () => new THREE.SphereGeometry(0.46, 20, 16)), "amber", 0.76, false);
    belly.position.set(0, 0.48, 0.16);
    belly.scale.set(1, 0.86, 0.8);
    g.add(belly);

    const sash = new THREE.Mesh(geo("sash", () => new THREE.TorusGeometry(0.44, 0.022, 6, 28)), K.gold(1));
    sash.position.set(0, 0.52, 0.2);
    sash.rotation.set(0.3, 0, 0.35);
    g.add(sash);

    /* head */
    const head = K.carved(geo("ghead", () => new THREE.SphereGeometry(0.42, 20, 16)), "amber", 0.78, false);
    head.position.y = 1.34;
    head.scale.set(1, 0.94, 0.9);
    g.add(head);

    /* ears: wide, flat, unmistakable */
    [-1, 1].forEach((side) => {
      const ear = K.piece(geo("gear", () => K.silhouette((s) => {
        s.moveTo(0, 0.4);
        s.bezierCurveTo(0.52, 0.36, 0.62, -0.12, 0.3, -0.42);
        s.bezierCurveTo(0.12, -0.56, -0.04, -0.3, 0, 0.4);
      }, 0.06, 0.03)), "amber", 0.72, false);
      ear.position.set(side * 0.52, 1.3, 0.02);
      ear.rotation.set(0, side * 0.75, 0);
      ear.scale.set(side * 1.15, 1.2, 1);
      g.add(ear);
      const rim = new THREE.Mesh(geo("gearRim", () => new THREE.TorusGeometry(0.2, 0.012, 6, 20, Math.PI * 1.3)), K.gold(0.9));
      rim.position.set(side * 0.66, 1.3, 0.08);
      rim.rotation.set(0, side * 0.5, side * 0.4);
      g.add(rim);
    });

    /* trunk, curving to the left and lifting at the tip */
    const trunk = K.piece(tube([
      [0, 1.26, 0.42], [-0.02, 1.06, 0.6], [0.06, 0.86, 0.7], [0.22, 0.7, 0.68],
      [0.32, 0.58, 0.58], [0.26, 0.48, 0.46], [0.14, 0.5, 0.44]
    ], 0.1, 30), "amber", 0.86, false);
    g.add(trunk);
    const trunkTip = new THREE.Mesh(geo("gtip", () => new THREE.SphereGeometry(0.055, 10, 10)), K.gold(0.9));
    trunkTip.position.set(0.14, 0.5, 0.44);
    g.add(trunkTip);

    /* the single tusk */
    const tusk = K.carved(geo("gtusk", () => new THREE.ConeGeometry(0.05, 0.22, 8)), "ivory", 0.9, false);
    tusk.position.set(-0.22, 1.08, 0.44);
    tusk.rotation.set(0.5, 0, 0.7);
    g.add(tusk);

    /* tilak */
    const tilak = new THREE.Mesh(geo("gtilak", () => new THREE.SphereGeometry(0.035, 8, 8)), K.gold(1.2));
    tilak.position.set(0, 1.5, 0.38);
    tilak.scale.set(0.7, 1.3, 0.5);
    g.add(tilak);

    const crown = mukut(0.3, 0.44);
    crown.position.y = 1.66;
    g.add(crown);

    const halo = prabha(1.15);
    halo.position.set(0, 1.3, -0.55);
    g.add(halo);

    /* four arms */
    g.add(arm([[-0.5, 0.86, 0.16], [-0.78, 0.94, 0.1], [-0.9, 1.16, 0.06]], 0.075, "amber"));   // upper left
    g.add(arm([[0.5, 0.86, 0.16], [0.78, 0.94, 0.1], [0.9, 1.16, 0.06]], 0.075, "amber"));      // upper right
    g.add(arm([[-0.46, 0.72, 0.24], [-0.66, 0.5, 0.3], [-0.5, 0.34, 0.42]], 0.075, "amber"));   // lower left
    g.add(arm([[0.46, 0.72, 0.24], [0.66, 0.56, 0.3], [0.62, 0.34, 0.38]], 0.075, "amber"));    // lower right

    const modak = K.piece(geo("modak", () => new THREE.ConeGeometry(0.09, 0.14, 10)), "amber", 0.5, false);
    modak.position.set(-0.5, 0.3, 0.44);
    g.add(modak);

    [[-0.9, 1.2, 0.06], [0.9, 1.2, 0.06]].forEach(([x, y, z], i) => {
      const attr = new THREE.Mesh(geo("gattr", () => new THREE.TorusGeometry(0.09, 0.014, 6, 16)), K.gold(1));
      attr.position.set(x, y + 0.08, z);
      attr.rotation.y = i ? -0.4 : 0.4;
      g.add(attr);
    });

    return g;
  }

  function createLakshmi() {
    const g = new THREE.Group();

    g.add(lotusBase(14, 1.05));

    const body = K.carved(bodyGeo("lbody"), "rose", 0.74);
    body.position.y = 0.18;
    body.scale.set(0.82, 1.16, 0.82);
    g.add(body);

    /* the sari's fall, suggested with two soft drapes */
    [-1, 1].forEach((side) => {
      const drape = K.piece(geo("drape", () => K.silhouette((s) => {
        s.moveTo(0, 0.7);
        s.bezierCurveTo(0.3, 0.3, 0.34, -0.2, 0.18, -0.7);
        s.bezierCurveTo(0.06, -0.3, 0.02, 0.2, 0, 0.7);
      }, 0.04, 0.02)), "amber", 0.7, false);
      drape.position.set(side * 0.34, 0.6, 0.24);
      drape.rotation.set(0, side * 0.4, 0);
      drape.scale.set(side * 0.9, 0.9, 1);
      g.add(drape);
    });

    const waist = new THREE.Mesh(geo("waist", () => new THREE.TorusGeometry(0.34, 0.02, 6, 26)), K.gold(1));
    waist.position.y = 0.72;
    waist.rotation.x = Math.PI / 2;
    g.add(waist);

    const head = K.carved(geo("lhead", () => new THREE.SphereGeometry(0.3, 20, 16)), "rose", 0.78, false);
    head.position.y = 1.42;
    head.scale.set(1, 1.08, 0.94);
    g.add(head);

    const bindi = new THREE.Mesh(geo("bindi", () => new THREE.SphereGeometry(0.03, 8, 8)), K.gold(1.2));
    bindi.position.set(0, 1.5, 0.25);
    bindi.scale.set(1, 1, 0.5);
    g.add(bindi);

    /* necklaces */
    [1.02, 1.14].forEach((y, i) => {
      const n = new THREE.Mesh(geo("neck", () => new THREE.TorusGeometry(0.16, 0.013, 6, 22)), K.gold(1.1));
      n.position.set(0, y, 0.1);
      n.rotation.x = Math.PI / 2 - 0.35;
      n.scale.setScalar(1 - i * 0.24);
      g.add(n);
    });

    const crown = mukut(0.26, 0.5);
    crown.position.y = 1.64;
    g.add(crown);

    const halo = prabha(1.05);
    halo.position.set(0, 1.36, -0.44);
    g.add(halo);

    /* four arms: two raised with lotuses, two in blessing and giving */
    g.add(arm([[-0.34, 1.06, 0.14], [-0.62, 1.2, 0.08], [-0.74, 1.5, 0.04]], 0.06, "rose"));
    g.add(arm([[0.34, 1.06, 0.14], [0.62, 1.2, 0.08], [0.74, 1.5, 0.04]], 0.06, "rose"));
    g.add(arm([[-0.32, 0.94, 0.2], [-0.54, 0.78, 0.28], [-0.44, 0.62, 0.36]], 0.06, "rose"));
    g.add(arm([[0.32, 0.94, 0.2], [0.56, 0.86, 0.3], [0.54, 1.02, 0.34]], 0.06, "rose"));

    /* a lotus in each raised hand */
    [-0.78, 0.78].forEach((x) => {
      const bloom = Doodle.createGlassFlower(6, "rose", 0.34);
      bloom.position.set(x, 1.62, 0.04);
      g.add(bloom);
    });

    /* coins falling from the lower right hand */
    for (let i = 0; i < 6; i++) {
      const coin = new THREE.Mesh(geo("coin", () => new THREE.CylinderGeometry(0.05, 0.05, 0.014, 12)), K.gold(1.1));
      coin.position.set(-0.44 - Math.sin(i) * 0.06, 0.5 - i * 0.11, 0.38);
      coin.rotation.set(Math.PI / 2 - 0.4, i * 0.7, 0);
      coin.name = "coin";
      coin.userData.index = i;
      g.add(coin);
    }

    return g;
  }

  /* The whole invocation: a temple arch, the two murtis on their lotuses,
     hanging lamps, flowers at the crown of the arch and diyas at their feet. */
  function createInvocation() {
    const g = new THREE.Group();

    /* a pointed temple arch, cut as one piece with a hole through it */
    const arch = K.carved(geo("arch", () => {
      const W = 2.9, H = 3.4, F = 0.36;
      const outline = (w, h) => {
        const path = new THREE.Path();
        path.moveTo(-w, -2.15);
        path.lineTo(-w, 0.4);
        path.quadraticCurveTo(-w, h * 0.74, 0, h);
        path.quadraticCurveTo(w, h * 0.74, w, 0.4);
        path.lineTo(w, -2.15);
        return path;
      };
      const shape = new THREE.Shape(outline(W, H).getPoints(60));
      const hole = new THREE.Path(outline(W - F, H - F * 1.15).getPoints(60));
      shape.holes.push(hole);
      return new THREE.ExtrudeGeometry(shape, {
        depth: 0.24, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.06,
        bevelSegments: 2, curveSegments: 20
      });
    }), "maroon", 0.6);
    arch.position.z = -1.1;
    g.add(arch);

    /* a second, thinner arch line in gold, just inside the first */
    const trim = new THREE.Mesh(
      geo("archTrim", () => new THREE.TorusGeometry(2.3, 0.028, 8, 60, Math.PI)),
      K.gold(1)
    );
    trim.position.set(0, 0.55, -0.95);
    g.add(trim);

    const ganesha = createGanesha();
    ganesha.position.set(-1.32, -1.25, 0.2);
    ganesha.scale.setScalar(1.02);
    ganesha.name = "ganesha";
    g.add(ganesha);

    const lakshmi = createLakshmi();
    lakshmi.position.set(1.32, -1.25, 0.2);
    lakshmi.scale.setScalar(1.02);
    lakshmi.name = "lakshmi";
    g.add(lakshmi);

    /* lamps hanging from the arch */
    [[-2.05, 1.5], [2.05, 1.5], [-1.25, 2.35], [1.25, 2.35]].forEach(([x, y], i) => {
      const lamp = Doodle.createHangingLight();
      lamp.scale.setScalar(0.62 + (i % 2) * 0.12);
      lamp.position.set(x, y, 0.1);
      lamp.name = "lamp";
      lamp.userData.phase = i * 1.4;
      g.add(lamp);
    });

    /* flowers at the crown of the arch and along its shoulders */
    [[0, 3.32, 1.05], [-1.9, 2.5, 0.8], [1.9, 2.5, 0.8], [-2.7, 1.1, 0.7], [2.7, 1.1, 0.7]]
      .forEach(([x, y, sc], i) => {
        const f = i % 2 ? Doodle.createGlassMarigold(sc * 0.9) : Doodle.createGlassFlower(6, "rose", sc * 0.8);
        f.position.set(x, y, 0.05);
        f.name = "bloom";
        f.userData.phase = i * 1.1;
        g.add(f);
      });

    /* diyas at their feet */
    [-2.35, -0.05, 2.35].forEach((x, i) => {
      const d = Doodle.createGlassDiya(true);
      d.scale.setScalar(0.8);
      d.position.set(x, -2.25, 0.7);
      d.rotation.x = -0.35;
      g.add(d);
    });

    return g;
  }

  return { createGanesha, createLakshmi, createInvocation, lotusBase, mukut, prabha };
})();
Object.assign(Doodle, Murti);


/* ------------------------------------------------------------
   8c. GLASS WORLD — the floating doodle stage.
       One stage group rides in front of the camera; each ritual
       owns an arrangement that is built once, then revealed,
       floated and retired as the page scrolls. Nothing is ever
       destroyed and rebuilt.
   ------------------------------------------------------------ */
const GlassWorld = (() => {
  let world = null, stage = null, ambient = null;
  const scenes = {};          // id -> { group, items[], built }
  let active = null;
  let layoutW = 6, layoutH = 4;
  const DIST = 7;             // how far the stage sits in front of the camera

  /* Each entry: builder, normalised position (-1..1 of the half viewport),
     depth (z inside the stage), scale, and how it should drift.
     `m` marks the pieces worth keeping on a small screen. */
  const RITUALS = [
    { id: "invocation", items: [
      { make: () => Doodle.createInvocation(), nx: 0, ny: 0.3, z: -0.6, s: 6.2, sm: 3.7, keep: 1, yaw: 0, pitch: 0, shrine: 1, m: 1 }
    ] },
    { id: "haldi", items: [
      { make: () => Doodle.createGlassBowl("amber"), nx: 0.3, ny: -0.22, z: 0.9, s: 2.2, spin: 0.06, pitch: -0.5, m: 1 },
      { make: () => Doodle.createGlassMarigold(1), nx: -0.42, ny: 0.42, z: -1.2, s: 1.1, spin: 0.2, m: 1 },
      { make: () => Doodle.createGlassMarigold(1), nx: 0.66, ny: 0.3, z: 0.2, s: 0.9, spin: -0.16 },
      { make: () => Doodle.createGlassDiya(true), nx: 0.82, ny: -0.5, z: 0.9, s: 1.5, spin: 0.05, pitch: -0.45, m: 1 },
      { make: () => Doodle.createGlassSpoon(), nx: -0.86, ny: 0.12, z: -0.4, s: 1.1, spin: 0.3 },
      { make: () => Doodle.createGlassFlower(6, "amber", 1), nx: 0.3, ny: -0.62, z: -1.6, s: 0.9, spin: 0.14 }
    ] },
    { id: "mehndi", items: [
      { make: () => Doodle.createGlassMehndiCone(), nx: -0.74, ny: 0.3, z: 0.7, s: 1.3, spin: 0.1, tilt: -0.5, m: 1 },
      { make: () => Doodle.createGlassBangle(), nx: 0.7, ny: 0.36, z: 0.1, s: 1.4, spin: 0.4, m: 1 },
      { make: () => Doodle.createGlassBangle(), nx: 0.82, ny: 0.06, z: -0.8, s: 1.1, spin: -0.3 },
      { make: () => Doodle.createGlassJhumka(), nx: -0.66, ny: -0.44, z: 0.4, s: 1.4, spin: 0.12, m: 1 },
      { make: () => Doodle.createGlassLeaf(), nx: 0.44, ny: -0.56, z: -1.4, s: 1.2, spin: 0.22 },
      { make: () => Doodle.createGlassPetal("rose"), nx: -0.3, ny: 0.6, z: -1.8, s: 1, spin: 0.26 }
    ] },
    { id: "sangeet", items: [
      { make: () => Doodle.createGlassDhol(), nx: -0.7, ny: -0.3, z: 0.5, s: 1.6, spin: 0.08, m: 1 },
      { make: () => Doodle.createGlassNote(), nx: 0.62, ny: 0.44, z: 0.3, s: 1.2, spin: 0.1, rise: 1, m: 1 },
      { make: () => Doodle.createGlassNote(), nx: 0.84, ny: -0.1, z: -0.9, s: 0.9, spin: -0.14, rise: 1 },
      { make: () => Doodle.createGhungroo(), nx: -0.5, ny: 0.5, z: -1.1, s: 1.3, spin: 0.34, m: 1 },
      { make: () => Doodle.createHangingLight(), nx: 0.2, ny: 0.72, z: -1.6, s: 1.1, spin: 0.05 },
      { make: () => Doodle.createGlassNote(), nx: -0.28, ny: -0.6, z: -1.5, s: 0.8, spin: 0.2, rise: 1 }
    ] },
    { id: "baraat", items: [
      { make: () => Doodle.createGlassHorse(), nx: -0.5, ny: -0.16, z: 0.2, s: 2.1, spin: 0.02, breathe: 1, m: 1 },
      { make: () => Doodle.createGroomSilhouette(), nx: -0.52, ny: 0.36, z: 0.35, s: 0.85, spin: 0, m: 1 },
      { make: () => Doodle.createGlassSehra(), nx: 0.72, ny: 0.36, z: 0.4, s: 1.3, spin: 0.05, m: 1 },
      { make: () => Doodle.createGlassShehnai(), nx: 0.84, ny: -0.32, z: -0.6, s: 1.5, spin: 0.12, tilt: 0.6 },
      { make: () => Doodle.createGlassDhol(), nx: 0.34, ny: -0.62, z: -1.3, s: 1, spin: 0.14 },
      { make: () => Doodle.createGlassUmbrella(), nx: -0.86, ny: 0.56, z: -1.7, s: 1.2, spin: 0.06 }
    ] },
    { id: "jaimala", items: [
      { make: () => Doodle.createGlassGarland(1.1), nx: 0, ny: 0.52, z: -0.4, s: 1.5, swing: 1, m: 1 },
      { make: () => Doodle.createGlassFlower(6, "rose", 1), nx: -0.78, ny: -0.1, z: 0.5, s: 1.3, spin: 0.16, m: 1 },
      { make: () => Doodle.createGlassMarigold(1), nx: 0.76, ny: -0.16, z: 0.3, s: 1.2, spin: -0.2, m: 1 },
      { make: () => Doodle.createGlassLotus(), nx: 0.44, ny: -0.6, z: -0.8, s: 1.2, spin: 0.1 },
      { make: () => Doodle.createGlassRing(), nx: -0.4, ny: -0.58, z: 0.7, s: 1.2, spin: 0.4, m: 1 },
      { make: () => Doodle.createGlassRing(), nx: -0.26, ny: -0.66, z: 0.4, s: 1, spin: -0.32 }
    ] },
    { id: "mandap", items: [
      { make: () => Doodle.createMandapComposition(), nx: 0.18, ny: 0.0, z: -1.4, s: 5.6, spin: 0.02, yaw: -0.32, pitch: -0.12, m: 1 },
      { make: () => Doodle.createGlassMarigold(1), nx: -0.8, ny: 0.5, z: 0.4, s: 0.9, spin: 0.18, m: 1 },
      { make: () => Doodle.createGlassPetal("rose"), nx: 0.86, ny: -0.5, z: 0.3, s: 0.8, spin: 0.24 }
    ] },
    { id: "phere", items: [
      { make: () => Doodle.createPhereComposition(), nx: 0.2, ny: 0.06, z: -0.9, s: 6, orbitPair: 1, yaw: -0.12, pitch: -0.5, m: 1 },
      { make: () => Doodle.createGlassPetal("amber"), nx: -0.84, ny: 0.52, z: 0.4, s: 0.8, spin: 0.22, m: 1 },
      { make: () => Doodle.createMandalaShard(), nx: 0.9, ny: 0.56, z: -1.6, s: 1, spin: 0.08 }
    ] },
    { id: "vidaai", items: [
      { make: () => Doodle.createGlassDoli(), nx: -0.36, ny: -0.2, z: 0.1, s: 1.5, spin: 0.02, sway: 1, m: 1 },
      { make: () => Doodle.createGlassPetal("rose"), nx: 0.5, ny: 0.5, z: 0.5, s: 1.2, spin: 0.3, fall: 1, m: 1 },
      { make: () => Doodle.createGlassPetal("ivory"), nx: 0.74, ny: 0.1, z: -0.7, s: 1, spin: -0.26, fall: 1 },
      { make: () => Doodle.createGlassPetal("amber"), nx: 0.24, ny: 0.66, z: -1.4, s: 0.9, spin: 0.34, fall: 1, m: 1 },
      { make: () => Doodle.createGlassMarigold(1), nx: -0.8, ny: 0.5, z: -1.1, s: 0.9, spin: 0.12 }
    ] },
    { id: "reception", items: [
      { make: () => Doodle.createGlassGoblet(), nx: -0.72, ny: -0.3, z: 0.7, s: 1.4, spin: 0.06, m: 1 },
      { make: () => Doodle.createGlassGoblet(), nx: -0.56, ny: -0.44, z: 0.2, s: 1.1, spin: -0.05 },
      { make: () => Doodle.createHangingLight(), nx: 0.5, ny: 0.66, z: 0.1, s: 1.3, spin: 0.04, m: 1 },
      { make: () => Doodle.createHangingLight(), nx: 0.8, ny: 0.44, z: -1, s: 1, spin: -0.04, m: 1 },
      { make: () => Doodle.createGlassLotus(), nx: 0.66, ny: -0.4, z: 0.3, s: 1.3, spin: 0.1, m: 1 },
      { make: () => Doodle.createMandalaShard(), nx: -0.3, ny: 0.6, z: -1.6, s: 1.4, spin: 0.1 }
    ] }
  ];

  /* Builders return objects of every size, so each one is measured and
     fitted to a real world size before it is placed. */
  const BASE = () => (env.mobile ? 0.5 : 0.62);

  function fit(node, size) {
    const box = new THREE.Box3().setFromObject(node);
    const centre = box.getCenter(new THREE.Vector3());
    const span = box.getSize(new THREE.Vector3());
    const max = Math.max(span.x, span.y, span.z) || 1;
    node.children.forEach((child) => child.position.sub(centre));
    node.scale.multiplyScalar(size / max);
    return node;
  }

  /* how far the stage reaches at DIST, so arrangements fit any screen */
  function measure() {
    const cam = world.camera;
    const half = Math.tan((cam.fov * Math.PI / 180) / 2) * DIST;
    layoutH = half * 0.86;
    layoutW = half * cam.aspect * 0.92;
  }

  /* On a phone the caption owns the middle of the screen, so the arrangement
     moves into the clear bands above and below it rather than hiding behind. */
  function place(item, node, i) {
    let nx = item.nx, ny = item.ny;
    if (env.mobile && !item.keep) {
      nx = item.nx * 0.6;
      const side = ny >= 0 ? 1 : -1;
      ny = side * Math.max(Math.abs(ny), 0.66 + (i % 2) * 0.16);
    }
    node.position.set(nx * layoutW, ny * layoutH, item.z);
    node.userData.home = node.position.clone();
  }

  /* Materials are shared for speed, but a scene has to fade on its own —
     so each scene takes private clones while still sharing all geometry. */
  function isolate(node, store) {
    node.traverse((o) => {
      if (!o.material) return;
      const many = Array.isArray(o.material);
      const list = many ? o.material : [o.material];
      const cloned = list.map((m) => {
        if (!store.has(m)) {
          const c = m.clone();
          c.userData.o0 = m.opacity !== undefined ? m.opacity : 1;
          if (c.uniforms && c.uniforms.uStrength) c.userData.s0 = c.uniforms.uStrength.value;
          store.set(m, c);
        }
        return store.get(m);
      });
      o.material = many ? cloned : cloned[0];
    });
  }

  function build(def) {
    const group = new THREE.Group();
    group.visible = false;
    const store = new Map();
    const budget = env.mobile ? 3 : (env.reduced ? 3 : 6);
    const chosen = env.mobile || env.reduced
      ? def.items.filter((i) => i.m).slice(0, budget)
      : def.items.slice(0, budget);

    const items = chosen.map((item, i) => {
      const node = item.make();
      /* a composed shrine needs its own size on a narrow screen */
      const size = env.mobile && item.sm ? BASE() * item.sm : BASE() * item.s;
      fit(node, size);
      node.userData.baseScale = node.scale.x;
      node.rotation.y = item.yaw !== undefined ? item.yaw : (i % 2 ? 0.38 : -0.34);
      node.rotation.x = item.pitch !== undefined ? item.pitch : -0.22;
      if (item.tilt) node.rotation.z = item.tilt;
      place(item, node, i);
      node.userData.phase = i * 1.9 + Math.random() * 2;
      node.userData.def = item;
      isolate(node, store);
      group.add(node);
      return node;
    });

    group.userData.items = items;
    stage.add(group);
    return { group, items, def };
  }

  /* a thin scatter of glass that lives behind every section */
  function buildAmbient() {
    ambient = new THREE.Group();
    const ambientStore = new Map();
    const n = env.reduced ? 5 : (env.mobile ? 6 : 11);
    const makers = [
      () => Doodle.createGlassPetal("rose"), () => Doodle.createGlassPetal("amber"),
      () => Doodle.createGlassLeaf(), () => Doodle.createMandalaShard(),
      () => Doodle.createGlassFlower(5, "ivory", 0.7), () => Doodle.createGlassDiya(false)
    ];
    for (let i = 0; i < n; i++) {
      const node = makers[i % makers.length]();
      const depth = -2 - Math.random() * 5;
      fit(node, (env.mobile ? 0.16 : 0.22) + Math.random() * 0.16);
      node.position.set(
        (Math.random() - 0.5) * layoutW * 3.4,
        (Math.random() - 0.5) * layoutH * 3.2,
        depth
      );
      node.userData.phase = Math.random() * 6.28;
      node.userData.spin = (Math.random() - 0.5) * 0.16;
      node.userData.rise = 0.12 + Math.random() * 0.2;
      node.userData.home = node.position.clone();
      isolate(node, ambientStore);
      node.traverse((o) => { if (o.material && o.material.transparent) o.renderOrder = -1; });
      ambient.add(node);
    }
    stage.add(ambient);
  }

  /* entrance: from behind, slightly small and clear, into place */
  function reveal(scene) {
    const { group, items } = scene;
    if (scene.hide) { scene.hide.kill(); scene.hide = null; }
    group.visible = true;
    if (!env.gsap) { group.traverse((o) => { if (o.material) o.material.opacity = o.userData.o0 ?? o.material.opacity; }); return; }
    items.forEach((node, i) => {
      const home = node.userData.home;
      gsap.killTweensOf(node.position);
      gsap.killTweensOf(node.scale);
      gsap.fromTo(node.position,
        { z: home.z - 3.4, y: home.y - 0.5 },
        { z: home.z, y: home.y, duration: 1.5, ease: "power3.out", delay: i * 0.08 });
      gsap.fromTo(node.scale,
        { x: node.userData.baseScale * 0.8, y: node.userData.baseScale * 0.8, z: node.userData.baseScale * 0.8 },
        { x: node.userData.baseScale, y: node.userData.baseScale, z: node.userData.baseScale,
          duration: 1.5, ease: "back.out(1.6)", delay: i * 0.08 });
      fade(node, 1, 1.2, i * 0.08);
    });
  }

  /* exit: drift back and fade, but keep every object for next time */
  function retire(scene) {
    const { group, items } = scene;
    if (!env.gsap) { group.visible = false; return; }
    if (scene.hide) scene.hide.kill();
    items.forEach((node, i) => {
      const home = node.userData.home;
      gsap.to(node.position, { z: home.z - 2.2, duration: 1.1, ease: "power2.in", delay: i * 0.03 });
      fade(node, 0, 0.9, i * 0.03);
    });
    scene.hide = gsap.delayedCall(1.2 + items.length * 0.03, () => { group.visible = false; });
  }

  /* every material in a doodle fades together */
  function fade(node, to, duration, delay) {
    const mats = [];
    node.traverse((o) => {
      if (!o.material) return;
      const list = Array.isArray(o.material) ? o.material : [o.material];
      list.forEach((m) => {
        if (m.userData.o0 === undefined) m.userData.o0 = m.opacity !== undefined ? m.opacity : 1;
        mats.push(m);
      });
    });
    mats.forEach((m) => {
      m.transparent = true;
      if (m.uniforms && m.uniforms.uStrength) {
        gsap.to(m.uniforms.uStrength, { value: (m.userData.s0 || 0.5) * to, duration, delay, ease: "power2.out" });
      } else {
        gsap.to(m, { opacity: m.userData.o0 * to, duration, delay, ease: "power2.out" });
      }
    });
  }

  function show(id) {
    if (active === id) return;
    if (active && scenes[active]) retire(scenes[active]);
    active = id;
    if (!id) return;
    if (!scenes[id]) {
      const def = RITUALS.find((r) => r.id === id);
      if (!def) return;
      scenes[id] = build(def);
      /* start hidden so the reveal has something to animate from */
      scenes[id].items.forEach((n) => fade(n, 0, 0, 0));
    }
    reveal(scenes[id]);
  }

  /* per-frame: float everything, and let depth drive the parallax */
  function update(t, dt, pointer, scrollY) {
    if (!stage) return;
    const cam = world.camera;
    stage.position.set(cam.position.x, cam.position.y, cam.position.z - DIST);

    if (ambient) {
      ambient.children.forEach((n) => {
        const u = n.userData;
        n.position.y += u.rise * dt * 0.35;
        n.position.x = u.home.x + Math.sin(t * 0.22 + u.phase) * 0.5;
        n.rotation.y += u.spin * dt;
        n.rotation.z = Math.sin(t * 0.16 + u.phase) * 0.22;
        if (n.position.y > layoutH * 1.9) n.position.y = -layoutH * 1.9;
      });
    }

    const sc = scenes[active];
    if (sc) {
      const calm = env.reduced ? 0.25 : 1;      // reduced motion: present, but barely moving
      sc.items.forEach((n) => {
        const u = n.userData, d = u.def, home = u.home;
        const bob = Math.sin(t * 0.42 + u.phase) * (0.22 + (d.z + 2) * 0.04) * calm;
        /* deeper objects drift less: real layered depth */
        const depth = 1 - (home.z + 2.4) / 8;
        n.position.x = home.x + (pointer.x * depth * 0.7 + Math.sin(t * 0.3 + u.phase) * 0.12) * calm;
        n.position.y = home.y + bob + pointer.y * depth * 0.4 * calm;

        if (d.spin) n.rotation.y += d.spin * dt;
        if (d.pitch !== undefined) n.rotation.x = d.pitch;
        if (d.swing) n.rotation.z = Math.sin(t * 0.5 + u.phase) * 0.12;
        if (d.sway) n.rotation.z = Math.sin(t * 0.7) * 0.05;
        if (d.breathe) n.scale.setScalar(u.baseScale * (1 + Math.sin(t * 1.1) * 0.014));
        if (d.rise) {
          n.position.y = home.y + ((t * 0.35 + u.phase) % 3) - 0.6;
          n.rotation.z = Math.sin(t * 0.6 + u.phase) * 0.2;
        }
        if (d.fall) {
          n.position.y = home.y - ((t * 0.4 + u.phase) % 3) + 1;
          n.rotation.x += dt * 0.5;
        }
        if (d.orbit) {
          const a = t * 0.16 * d.orbit + u.phase;
          n.position.x = home.x + Math.sin(a) * 0.55;
          n.position.z = home.z + Math.cos(a) * 0.55;
          n.rotation.y = -a;
        }
        if (d.shrine) {
          n.rotation.y = Math.sin(t * 0.16) * 0.06;
          n.traverse((child) => {
            if (child.name === "lamp") child.rotation.z = Math.sin(t * 0.7 + child.userData.phase) * 0.09;
            if (child.name === "bloom") child.rotation.y = t * 0.18 + child.userData.phase;
            if (child.name === "ganesha" || child.name === "lakshmi") {
              const lift = child.name === "ganesha" ? 0 : 1.1;
              child.position.y = -1.25 + Math.sin(t * 0.5 + lift) * 0.06;
            }
          });
        }
        if (d.orbitPair) {
          n.children.forEach((child) => {
            if (child.name !== "orbitA" && child.name !== "orbitB") return;
            const dir = child.name === "orbitA" ? 1 : -1;
            const a = t * 0.2 * dir + (dir > 0 ? 0 : Math.PI);
            child.position.x = Math.sin(a) * 1.6;
            child.position.z = Math.cos(a) * 1.6;
            child.rotation.y = -a + Math.PI;
            child.rotation.x = -(d.pitch || 0);      // stand upright inside a tilted composition
          });
        }
        n.traverse((child) => {
          if (child.name === "flame") {
            child.scale.y = 1.9 + Math.sin(t * 9 + (child.userData.phase || 0)) * 0.35;
          }
          if (child.name === "coin") {
            const k = child.userData.index;
            child.position.y = 0.5 - ((t * 0.5 + k * 0.35) % 1.5);
            child.rotation.y = t * 1.4 + k;
          }
          if (child.name === "vow") {
            const k = child.userData.index;
            child.scale.setScalar(0.8 + Math.abs(Math.sin(t * 1.2 - k * 0.7)) * 0.9);
          }
        });
      });
    }
  }

  return {
    get active() { return active; },

    init(w) {
      if (!w || !w.renderer || typeof THREE.MeshPhysicalMaterial !== "function") return false;
      world = w;
      GlassKit.environment(w.renderer);
      w.scene.environment = GlassKit.envMap;

      stage = new THREE.Group();
      w.scene.add(stage);
      measure();
      buildAmbient();

      /* glass needs something to catch: a warm key and a cool rim, close in */
      const key = new THREE.PointLight(0xFFC98A, 1.5, 26, 2);
      key.position.set(3.5, 2.5, 3);
      const rim = new THREE.PointLight(0xE7A8C0, 0.9, 24, 2);
      rim.position.set(-4, -1, 1.5);
      stage.add(key, rim);

      w.attach(update);
      return true;
    },

    resize() { if (stage) measure(); },
    show
  };
})();

/* ------------------------------------------------------------
   8. THREE.JS SCENE — royal palace doors, dust, petals
   ------------------------------------------------------------ */
const Scene3D = (() => {
  let renderer, scene, camera, clock, raf = 0;
  let doorGroup, leftPivot, rightPivot, leftHandle, rightHandle;
  let gapGlow, hallGlow, rays = [];
  let dust, petals, bokeh, floor;
  let sanctum, mandalas = [], diyas = [], garland;
  let petalState = null, dustState = null;
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const hooks = [];              // other modules ride this one loop
  let running = false, entered = false;
  let scrollY = 0;

  const COUNTS = () => {
    if (env.reduced) return { dust: 160, petals: 40, bokeh: 14 };
    return env.mobile ? { dust: 300, petals: 54, bokeh: 18 }
                      : { dust: 820, petals: 130, bokeh: 40 };
  };

  /* ---- procedural textures (no external image files needed) ---- */
  function makeCanvas(w, h) {
    const c = document.createElement("canvas");
    c.width = w; c.height = h;
    return { c, x: c.getContext("2d") };
  }

  function mandala(x, cx, cy, r, color) {
    x.strokeStyle = color;
    x.lineWidth = 2;
    for (let ring = 0; ring < 3; ring++) {
      x.beginPath();
      x.arc(cx, cy, r * (1 - ring * 0.22), 0, Math.PI * 2);
      x.stroke();
    }
    const petalsN = 12;
    for (let i = 0; i < petalsN; i++) {
      const a = (i / petalsN) * Math.PI * 2;
      x.beginPath();
      x.ellipse(cx + Math.cos(a) * r * 0.62, cy + Math.sin(a) * r * 0.62,
        r * 0.2, r * 0.09, a, 0, Math.PI * 2);
      x.stroke();
    }
    x.beginPath();
    x.arc(cx, cy, r * 0.16, 0, Math.PI * 2);
    x.fillStyle = color;
    x.fill();
  }

  function doorTexture() {
    const { c, x } = makeCanvas(512, 1024);
    const g = x.createLinearGradient(0, 0, 0, 1024);
    g.addColorStop(0, "#54142A"); g.addColorStop(0.5, "#2E0B16"); g.addColorStop(1, "#43101F");
    x.fillStyle = g; x.fillRect(0, 0, 512, 1024);

    /* wood grain */
    x.globalAlpha = 0.16;
    for (let i = 0; i < 120; i++) {
      x.fillStyle = i % 2 ? "#1A050B" : "#63182F";
      x.fillRect(Math.random() * 512, 0, Math.random() * 3 + 0.6, 1024);
    }
    x.globalAlpha = 1;

    /* borders */
    x.strokeStyle = "#D9B65A"; x.lineWidth = 6;
    x.strokeRect(16, 16, 480, 992);
    x.strokeStyle = "rgba(217,182,90,0.6)"; x.lineWidth = 2.5;
    x.strokeRect(40, 40, 432, 944);

    /* lattice */
    x.strokeStyle = "rgba(217,182,90,0.16)"; x.lineWidth = 1.4;
    for (let i = -12; i < 24; i++) {
      x.beginPath(); x.moveTo(i * 44, 40); x.lineTo(i * 44 + 944, 984); x.stroke();
      x.beginPath(); x.moveTo(i * 44, 984); x.lineTo(i * 44 + 944, 40); x.stroke();
    }

    /* carved medallions */
    mandala(x, 256, 210, 118, "rgba(230,205,140,0.92)");
    mandala(x, 256, 512, 150, "rgba(242,226,182,0.96)");
    mandala(x, 256, 814, 118, "rgba(230,205,140,0.92)");

    /* arched top motif */
    x.strokeStyle = "rgba(217,182,90,0.7)"; x.lineWidth = 3;
    x.beginPath(); x.arc(256, 120, 92, Math.PI, 0); x.stroke();

    const t = new THREE.CanvasTexture(c);
    t.anisotropy = 4;
    return t;
  }

  function sprite(draw, size = 128) {
    const { c, x } = makeCanvas(size, size);
    draw(x, size);
    const t = new THREE.CanvasTexture(c);
    return t;
  }

  const dustSprite = () => sprite((x, s) => {
    const g = x.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, "rgba(255,241,205,1)");
    g.addColorStop(0.28, "rgba(226,190,104,0.7)");
    g.addColorStop(1, "rgba(226,190,104,0)");
    x.fillStyle = g; x.fillRect(0, 0, s, s);
  }, 64);

  const petalSprite = () => sprite((x, s) => {
    const g = x.createLinearGradient(s * 0.2, 0, s * 0.85, s);
    g.addColorStop(0, "#FFD9E2"); g.addColorStop(0.45, "#F08BA6"); g.addColorStop(1, "#B23A5B");
    x.fillStyle = g;
    x.beginPath();
    x.moveTo(s * 0.5, s * 0.06);
    x.bezierCurveTo(s * 0.98, s * 0.3, s * 0.9, s * 0.82, s * 0.5, s * 0.96);
    x.bezierCurveTo(s * 0.1, s * 0.82, s * 0.02, s * 0.3, s * 0.5, s * 0.06);
    x.fill();
    x.strokeStyle = "rgba(120,20,44,0.4)"; x.lineWidth = 2;
    x.beginPath(); x.moveTo(s * 0.5, s * 0.12); x.lineTo(s * 0.5, s * 0.9); x.stroke();
  }, 96);

  function wallTexture() {
    const { c, x } = makeCanvas(256, 256);
    x.fillStyle = "#1A0610"; x.fillRect(0, 0, 256, 256);
    x.strokeStyle = "rgba(120,24,47,0.55)"; x.lineWidth = 2;
    for (let i = -1; i < 5; i++) {
      x.beginPath(); x.moveTo(i * 64, 0); x.lineTo(i * 64 + 256, 256); x.stroke();
      x.beginPath(); x.moveTo(i * 64, 256); x.lineTo(i * 64 + 256, 0); x.stroke();
    }
    x.strokeStyle = "rgba(201,162,39,0.18)"; x.lineWidth = 1.4;
    for (let gy = 0; gy < 2; gy++) for (let gx = 0; gx < 2; gx++) {
      const cx = 64 + gx * 128, cy = 64 + gy * 128;
      x.beginPath(); x.arc(cx, cy, 26, 0, Math.PI * 2); x.stroke();
      for (let k = 0; k < 8; k++) {
        const a = (k / 8) * Math.PI * 2;
        x.beginPath();
        x.ellipse(cx + Math.cos(a) * 34, cy + Math.sin(a) * 34, 11, 5, a, 0, Math.PI * 2);
        x.stroke();
      }
    }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(6, 6);
    return t;
  }

  const glowSprite = () => sprite((x, s) => {
    const g = x.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, "rgba(255,238,196,0.95)");
    g.addColorStop(0.35, "rgba(240,190,90,0.45)");
    g.addColorStop(1, "rgba(240,190,90,0)");
    x.fillStyle = g; x.fillRect(0, 0, s, s);
  }, 256);

  /* ---- geometry builders ---- */
  function buildDoors() {
    doorGroup = new THREE.Group();

    const gold = new THREE.MeshStandardMaterial({
      color: 0xC9A227, metalness: 0.92, roughness: 0.26, emissive: 0x2E2105
    });
    const wood = new THREE.MeshStandardMaterial({ color: 0x38101D, metalness: 0.25, roughness: 0.68 });
    const tex = doorTexture();
    const face = new THREE.MeshStandardMaterial({
      map: tex, bumpMap: tex, bumpScale: 0.035,
      metalness: 0.34, roughness: 0.52, color: 0xffffff
    });

    const W = 1.55, H = 4.0, D = 0.17;
    const panelGeo = new THREE.BoxGeometry(W, H, D);
    /* BoxGeometry material order: +x, -x, +y, -y, +z, -z */
    const mats = [wood, wood, wood, wood, face, wood];

    const makeLeaf = (dir) => {
      const pivot = new THREE.Group();
      pivot.position.set(dir * (W), H / 2, 0);

      const leaf = new THREE.Mesh(panelGeo, mats);
      leaf.position.x = -dir * (W / 2);
      leaf.castShadow = !env.mobile;
      pivot.add(leaf);

      /* handle ring */
      const handle = new THREE.Group();
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.028, 8, 26), gold);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = -0.12;
      const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.05, 14), gold);
      plate.rotation.x = Math.PI / 2;
      handle.add(ring, plate);
      handle.position.set(-dir * (W - 0.22), 0, D / 2 + 0.02);
      pivot.add(handle);

      /* hinges on the outer edge */
      [1.15, -1.15].forEach((y) => {
        const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.34, 10), gold);
        hinge.position.set(0, y, 0);
        pivot.add(hinge);
      });

      /* raised ornamental studs */
      const studGeo = new THREE.SphereGeometry(0.035, 8, 8);
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j += 2) {
          const stud = new THREE.Mesh(studGeo, gold);
          stud.position.set(-dir * (W * 0.5 + j * W * 0.32), i * 1.4, D / 2 + 0.01);
          pivot.add(stud);
        }
      }
      return { pivot, handle };
    };

    const L = makeLeaf(-1);
    const R = makeLeaf(1);
    leftPivot = L.pivot; rightPivot = R.pivot;
    leftHandle = L.handle; rightHandle = R.handle;
    doorGroup.add(leftPivot, rightPivot);

    /* frame posts + lintel */
    const post = new THREE.BoxGeometry(0.26, H + 0.62, 0.42);
    [-1, 1].forEach((d) => {
      const p = new THREE.Mesh(post, gold);
      p.position.set(d * (W + 0.14), (H + 0.62) / 2 - 0.1, 0);
      doorGroup.add(p);
    });
    const lintel = new THREE.Mesh(new THREE.BoxGeometry(W * 2 + 0.56, 0.26, 0.46), gold);
    lintel.position.set(0, H + 0.2, 0);
    doorGroup.add(lintel);

    /* palace arch, seated on the lintel */
    const archY = H + 0.33;
    const archR = W + 0.34;

    const tympanum = new THREE.Mesh(
      new THREE.CircleGeometry(archR - 0.06, 40, 0, Math.PI),
      new THREE.MeshStandardMaterial({ map: tex, bumpMap: tex, bumpScale: 0.03, roughness: 0.6, metalness: 0.3 })
    );
    tympanum.position.set(0, archY, -0.05);
    doorGroup.add(tympanum);

    const arch = new THREE.Mesh(new THREE.TorusGeometry(archR, 0.15, 12, 52, Math.PI), gold);
    arch.position.set(0, archY, 0.02);
    doorGroup.add(arch);

    const archInner = new THREE.Mesh(new THREE.TorusGeometry(archR * 0.72, 0.06, 8, 44, Math.PI), gold);
    archInner.position.set(0, archY, 0.1);
    doorGroup.add(archInner);

    /* kalash finials tracing the arch */
    for (let i = 0; i <= 9; i++) {
      const a = (i / 9) * Math.PI;
      const f = new THREE.Mesh(new THREE.SphereGeometry(0.085, 10, 10), gold);
      f.position.set(Math.cos(a) * (archR + 0.2), archY + Math.sin(a) * (archR + 0.2), 0);
      doorGroup.add(f);
    }

    /* a crowning kalash */
    const crown = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.42, 12), gold);
    crown.position.set(0, archY + archR + 0.42, 0);
    doorGroup.add(crown);

    /* surrounding palace wall so light only escapes through the doorway */
    const wallTex = wallTexture();
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x8C4A5E, map: wallTex, bumpMap: wallTex, bumpScale: 0.02,
      roughness: 0.92, metalness: 0.08
    });
    const wallParts = [
      [new THREE.BoxGeometry(16, 22, 0.5), -9.9, 5],
      [new THREE.BoxGeometry(16, 22, 0.5), 9.9, 5],
      [new THREE.BoxGeometry(38, 14, 0.5), 0, 14.2]
    ];
    wallParts.forEach(([geo, x, y]) => {
      const m = new THREE.Mesh(geo, wallMat);
      m.position.set(x, y, -0.1);
      doorGroup.add(m);
    });

    /* brass lamp stands flanking the gate */
    [-1, 1].forEach((d) => {
      const stand = new THREE.Group();
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.09, 1.5, 10), gold);
      shaft.position.y = 0.75;
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.32, 0.12, 14), gold);
      base.position.y = 0.06;
      const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.14, 0.16, 14), gold);
      bowl.position.y = 1.56;
      const flame = new THREE.Mesh(
        new THREE.SphereGeometry(0.075, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0xFFD79A })
      );
      flame.position.y = 1.72;
      flame.scale.set(0.85, 2.1, 0.85);
      const halo = new THREE.Mesh(
        new THREE.PlaneGeometry(1.5, 1.5),
        new THREE.MeshBasicMaterial({ map: glowSprite(), transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false })
      );
      halo.position.y = 1.7;
      const lamp = new THREE.PointLight(0xFFAE55, 1.1, 5.5, 2);
      lamp.position.y = 1.75;
      stand.add(shaft, base, bowl, flame, halo, lamp);
      stand.position.set(d * 3.15, 0, 0.5);
      doorGroup.add(stand);
    });

    /* light escaping through the door gap */
    const glowTex = glowSprite();
    gapGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(0.55, H * 1.02),
      new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    gapGlow.position.set(0, H / 2, -0.14);
    doorGroup.add(gapGlow);

    scene.add(doorGroup);
  }

  function buildHall() {
    /* warm hall behind the doors */
    hallGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(7, 7),
      new THREE.MeshBasicMaterial({ map: glowSprite(), color: 0xFFC98A, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    hallGlow.position.set(0, 2.6, -6.5);
    scene.add(hallGlow);

    const rayMat = new THREE.MeshBasicMaterial({
      map: glowSprite(), color: 0xFFB765, transparent: true, opacity: 0.0,
      blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide
    });
    for (let i = 0; i < 3; i++) {
      const ray = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 8), rayMat.clone());
      ray.position.set((i - 1) * 0.7, 2.6, -1.8);
      ray.rotation.z = (i - 1) * 0.12;
      rays.push(ray);
      scene.add(ray);
    }

    floor = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 60),
      new THREE.MeshStandardMaterial({ color: 0x0E0206, roughness: 0.62, metalness: 0.4 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = !env.mobile;
    scene.add(floor);
  }

  /* ---- particles ---- */
  function buildDust(n) {
    const pos = new Float32Array(n * 3);
    const speed = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = Math.random() * 9;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;
      speed[i] = 0.06 + Math.random() * 0.22;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    dust = new THREE.Points(geo, new THREE.PointsMaterial({
      size: env.mobile ? 0.075 : 0.055,
      map: dustSprite(),
      transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false, sizeAttenuation: true
    }));
    dustState = { pos, speed, n };
    scene.add(dust);
  }

  function buildBokeh(n) {
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = Math.random() * 7 + 0.4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 + 1;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    bokeh = new THREE.Points(geo, new THREE.PointsMaterial({
      size: 0.5, map: dustSprite(), transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true
    }));
    scene.add(bokeh);
  }

  function buildPetals(n) {
    const pos = new Float32Array(n * 3);
    const size = new Float32Array(n);
    const angle = new Float32Array(n);
    const vy = new Float32Array(n);
    const vx = new Float32Array(n);
    const spin = new Float32Array(n);
    const phase = new Float32Array(n);

    for (let i = 0; i < n; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 13;
      pos[i * 3 + 1] = Math.random() * 11;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 1;
      size[i] = 0.13 + Math.random() * 0.28;
      angle[i] = Math.random() * Math.PI * 2;
      vy[i] = 0.22 + Math.random() * 0.55;
      vx[i] = (Math.random() - 0.5) * 0.34;
      spin[i] = (Math.random() - 0.5) * 1.5;
      phase[i] = Math.random() * Math.PI * 2;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    geo.setAttribute("aAngle", new THREE.BufferAttribute(angle, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTex: { value: petalSprite() },
        uOpacity: { value: 0 },
        uScale: { value: window.innerHeight * 0.5 }
      },
      vertexShader: `
        attribute float aSize;
        attribute float aAngle;
        varying float vAngle;
        uniform float uScale;
        void main() {
          vAngle = aAngle;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * uScale / max(-mv.z, 0.5);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        uniform sampler2D uTex;
        uniform float uOpacity;
        varying float vAngle;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float s = sin(vAngle), c = cos(vAngle);
          uv = vec2(uv.x * c - uv.y * s, uv.x * s + uv.y * c) + 0.5;
          vec4 tex = texture2D(uTex, uv);
          if (tex.a < 0.06) discard;
          gl_FragColor = vec4(tex.rgb, tex.a * uOpacity);
        }`,
      transparent: true,
      depthWrite: false
    });

    petals = new THREE.Points(geo, mat);
    petalState = { pos, size, angle, vy, vx, spin, phase, n };
    scene.add(petals);
  }

  /* ---- the world you scroll through, built once the doors are behind you ---- */
  function buildSanctum() {
    sanctum = new THREE.Group();

    /* these ornaments sit far from any lamp, so they carry their own glow */
    const ornament = new THREE.MeshStandardMaterial({
      color: 0xC9A227, emissive: 0x6E5310, emissiveIntensity: 0.1,
      metalness: 0.5, roughness: 0.45
    });
    const marigold = new THREE.MeshStandardMaterial({
      color: 0xC07C1C, emissive: 0x4A2704, emissiveIntensity: 0.26, roughness: 0.9
    });
    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x7A1428, emissive: 0x2A050C, emissiveIntensity: 0.24, roughness: 0.92
    });
    const glowTex = glowSprite();

    /* everything is placed relative to where the camera came to rest */
    const camZ = camera.position.z;
    const camY = camera.userData.baseY;
    const half = (d) => Math.tan((camera.fov * Math.PI / 180) / 2) * d;
    const halfW = (d) => half(d) * Math.max(camera.aspect, 0.55);

    /* a column of mandalas: you drift past them as the page scrolls */
    const petalGeo = new THREE.TorusGeometry(0.3, 0.024, 6, 16);
    const beadGeo = new THREE.SphereGeometry(0.07, 8, 8);
    const spokes = env.mobile ? 14 : 22;

    const makeMandala = (scale) => {
      const g = new THREE.Group();
      g.add(new THREE.Mesh(new THREE.TorusGeometry(3.7, 0.05, 8, 90), ornament));
      g.add(new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.03, 8, 70), ornament));
      for (let i = 0; i < spokes; i++) {
        const a = (i / spokes) * Math.PI * 2;
        const petal = new THREE.Mesh(petalGeo, ornament);
        petal.position.set(Math.cos(a) * 3.16, Math.sin(a) * 3.16, 0);
        petal.rotation.z = a;
        petal.scale.set(1, 0.44, 1);
        g.add(petal);
        const bead = new THREE.Mesh(beadGeo, ornament);
        bead.position.set(Math.cos(a) * 4.05, Math.sin(a) * 4.05, 0);
        g.add(bead);
      }
      g.scale.setScalar(scale);
      return g;
    };

    [[0, -15.5, 1, 1], [1, -17.5, 0.78, -1], [2, -13.5, 0.62, 1]].forEach(([k, z, scale, dir], i) => {
      const m = makeMandala(scale);
      m.position.set(i === 1 ? -2.4 : (i === 2 ? 2.8 : 0), camY + 0.4 + k * 9.5, z);
      m.userData = { dir, speed: 0.03 + i * 0.012 };
      mandalas.push(m);
      sanctum.add(m);
    });

    const halo = new THREE.Mesh(
      new THREE.PlaneGeometry(11, 11),
      new THREE.MeshBasicMaterial({ map: glowTex, color: 0xFFB765, transparent: true, opacity: 0.2, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    halo.position.set(0, camY + 0.4, camZ - 17);
    sanctum.add(halo);

    /* a marigold garland strung across the top of the view */
    garland = new THREE.Group();
    const flowerGeo = new THREE.SphereGeometry(0.14, 7, 7);
    const gz = camZ - 4.4;
    const span = halfW(4.4) * 2.6;
    const beads = env.mobile ? 24 : 38;
    for (let i = 0; i <= beads; i++) {
      const t = i / beads;
      const m = new THREE.Mesh(flowerGeo, i % 4 === 3 ? leafMat : marigold);
      m.position.set((t - 0.5) * span, -Math.sin(t * Math.PI) * 0.9, 0);
      m.scale.setScalar(0.66 + Math.sin(i * 2.3) * 0.2);
      garland.add(m);
    }
    garland.position.set(0, camY + half(4.4) * 0.96, gz);
    garland.userData.baseY = garland.position.y;
    sanctum.add(garland);

    /* floating diyas, each carrying its own little halo */
    const bowlGeo = new THREE.CylinderGeometry(0.2, 0.09, 0.13, 12);
    const flameGeo = new THREE.SphereGeometry(0.065, 8, 8);
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xFFD79A });
    const count = env.reduced ? 3 : (env.mobile ? 4 : 7);
    for (let i = 0; i < count; i++) {
      const d = new THREE.Group();
      const dist = 5 + Math.random() * 6;
      const bowl = new THREE.Mesh(bowlGeo, ornament);
      const flame = new THREE.Mesh(flameGeo, flameMat);
      flame.position.y = 0.13;
      flame.scale.set(0.8, 1.9, 0.8);
      const h = new THREE.Mesh(
        new THREE.PlaneGeometry(1.4, 1.4),
        new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, opacity: 0.34, blending: THREE.AdditiveBlending, depthWrite: false })
      );
      h.position.y = 0.15;
      d.add(bowl, flame, h);
      d.scale.setScalar(0.62);
      d.position.set(
        (Math.random() - 0.5) * halfW(dist) * 1.9,
        camY + (Math.random() - 0.5) * half(dist) * 2,
        camZ - dist
      );
      d.userData = {
        phase: Math.random() * 6.28,
        drift: 0.1 + Math.random() * 0.2,
        sway: 0.3 + Math.random() * 0.5,
        top: camY + half(dist) * 1.15,
        bottom: camY - half(dist) * 1.15,
        spanX: halfW(dist) * 1.9
      };
      diyas.push(d);
      sanctum.add(d);
    }

    /* a warm lamp so the ornaments are never flat */
    const glowLight = new THREE.PointLight(0xFFC98A, 0.8, 26, 2);
    glowLight.position.set(0, camY + 1, camZ - 5);
    sanctum.add(glowLight);

    scene.add(sanctum);
  }

  /* ---- animation loop ---- */
  function tick() {
    raf = requestAnimationFrame(tick);
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;

    /* camera parallax: mouse on desktop, gentle drift on touch */
    if (!env.reduced) {
      if (env.mobile) {
        pointer.tx = Math.sin(t * 0.22) * 0.5;
        pointer.ty = Math.cos(t * 0.17) * 0.24;
      }
      pointer.x += (pointer.tx - pointer.x) * 0.045;
      pointer.y += (pointer.ty - pointer.y) * 0.045;
      camera.position.x = camera.userData.baseX + pointer.x * 0.4;
      camera.position.y = camera.userData.baseY + pointer.y * 0.22 - scrollY * 0.7;
      camera.lookAt(pointer.x * 0.18, camera.userData.baseY + pointer.y * 0.1,
        entered ? camera.position.z - 8 : 0);
    }

    if (dustState && dust.material.opacity > 0.001) {
      const p = dustState.pos;
      for (let i = 0; i < dustState.n; i++) {
        p[i * 3 + 1] += dustState.speed[i] * dt * 0.5;
        p[i * 3] += Math.sin(t * 0.4 + i) * dt * 0.05;
        if (p[i * 3 + 1] > 9) { p[i * 3 + 1] = -0.4; }
      }
      dust.geometry.attributes.position.needsUpdate = true;
    }

    if (petalState && petals.material.uniforms.uOpacity.value > 0.001) {
      const p = petalState.pos, a = petalState.angle;
      for (let i = 0; i < petalState.n; i++) {
        p[i * 3 + 1] -= petalState.vy[i] * dt;
        p[i * 3] += (petalState.vx[i] + Math.sin(t * 0.8 + petalState.phase[i]) * 0.32) * dt;
        p[i * 3 + 2] += Math.cos(t * 0.5 + petalState.phase[i]) * dt * 0.12;
        a[i] += petalState.spin[i] * dt;
        if (p[i * 3 + 1] < -0.6) {
          p[i * 3 + 1] = 9 + Math.random() * 2.5;
          p[i * 3] = (Math.random() - 0.5) * 13;
        }
      }
      petals.geometry.attributes.position.needsUpdate = true;
      petals.geometry.attributes.aAngle.needsUpdate = true;
    }

    if (sanctum) {
      sanctum.position.y = scrollY * 8.4;
      mandalas.forEach((m) => {
        m.rotation.z = (t * m.userData.speed + scrollY * 1.5) * m.userData.dir;
        m.rotation.x = Math.sin(t * 0.16) * 0.05;
      });
      garland.position.y = garland.userData.baseY + Math.sin(t * 0.3) * 0.14;
      garland.rotation.z = Math.sin(t * 0.22) * 0.012;
      diyas.forEach((d) => {
        const u = d.userData;
        d.position.y += u.drift * dt * 0.28;
        d.position.x += Math.sin(t * 0.4 + u.phase) * dt * u.sway * 0.5;
        d.rotation.y = t * 0.2 + u.phase;
        if (d.position.y > u.top) {
          d.position.y = u.bottom;
          d.position.x = (Math.random() - 0.5) * u.spanX;
        }
      });
    }

    if (bokeh) bokeh.rotation.y = t * 0.012;
    if (hallGlow) hallGlow.material.opacity = 0.45 + Math.sin(t * 1.6) * 0.09;

    for (let i = 0; i < hooks.length; i++) hooks[i](t, dt, pointer, scrollY);

    renderer.render(scene, camera);
  }

  /* frame the whole gate on any screen, portrait phones included */
  function frameCamera() {
    if (!camera || entered) return;
    const halfW = 2.45, halfH = 3.9, centerY = 3.0;
    const vFov = (camera.fov * Math.PI) / 180;
    const dV = halfH / Math.tan(vFov / 2);
    const dH = halfW / (Math.tan(vFov / 2) * camera.aspect);
    const d = Math.max(dV, dH) + 0.9;
    camera.position.set(0, centerY, d);
    camera.userData.baseX = 0;
    camera.userData.baseY = centerY;
    camera.userData.startZ = d;
    camera.lookAt(0, centerY, 0);
  }

  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, env.mobile ? 1.5 : 2));
    if (petals) petals.material.uniforms.uScale.value = h * 0.5;
    frameCamera();
    if (typeof GlassWorld !== "undefined") GlassWorld.resize();
  }

  return {
    get ok() { return running; },
    get api() {
      return { leftPivot, rightPivot, leftHandle, rightHandle, camera, gapGlow, hallGlow, rays, dust, petals, bokeh };
    },

    /* everything the glass stage needs, and a way onto the render loop */
    get world() { return running ? { scene, camera, renderer, attach: (fn) => hooks.push(fn) } : null; },

    init() {
      if (!env.webgl || !env.three) return false;
      const canvas = $("#bg-canvas");
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: !env.mobile, alpha: true, powerPreference: "high-performance" });
      } catch (e) { return false; }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, env.mobile ? 1.5 : 2));
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      renderer.setClearColor(0x0B0206, 1);
      if (!env.mobile) {
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      }

      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x140309, env.mobile ? 0.055 : 0.045);

      camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 120);
      frameCamera();

      scene.add(new THREE.AmbientLight(0x4A1424, 0.9));

      const hall = new THREE.PointLight(0xFFC170, 2.6, 7.5, 2);
      hall.position.set(0, 2.6, -3.6);
      scene.add(hall);

      const deepHall = new THREE.PointLight(0xFFB24D, 3.2, 22, 2);
      deepHall.position.set(0, 2.4, -8);
      scene.add(deepHall);

      const key = new THREE.DirectionalLight(0xFFD9A0, 0.7);
      key.position.set(4, 7, 6);
      if (!env.mobile) {
        key.castShadow = true;
        key.shadow.mapSize.set(1024, 1024);
        key.shadow.camera.near = 1; key.shadow.camera.far = 24;
      }
      scene.add(key);

      const rim = new THREE.PointLight(0xE2A0FF, 0.5, 20, 2);
      rim.position.set(-4.5, 3.2, 4);
      scene.add(rim);

      buildHall();
      buildDoors();

      const n = COUNTS();
      buildDust(n.dust);
      buildBokeh(n.bokeh);
      buildPetals(n.petals);

      clock = new THREE.Clock();
      running = true;
      this.start();

      let rt;
      window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(resize, 140); });
      window.addEventListener("orientationchange", () => setTimeout(resize, 220));

      if (!env.mobile) {
        window.addEventListener("pointermove", (e) => {
          pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
          pointer.ty = (e.clientY / window.innerHeight - 0.5) * -2;
        }, { passive: true });
      }

      document.addEventListener("visibilitychange", () => {
        if (document.hidden) this.stop(); else this.start();
      });

      return true;
    },

    start() { if (running && !raf) { clock.getDelta(); raf = requestAnimationFrame(tick); } },
    stop() { if (raf) { cancelAnimationFrame(raf); raf = 0; } },

    setScroll(v) { scrollY = v; },

    /* fold the entrance away once the visitor is inside; keeps one render loop alive */
    enterMainScene() {
      entered = true;
      if (!running) return;
      if (doorGroup) {
        scene.remove(doorGroup);
        doorGroup.traverse((o) => {
          if (o.isMesh) {
            o.geometry.dispose();
            (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => {
              if (m.map) m.map.dispose();
              m.dispose();
            });
          }
        });
        doorGroup = null;
      }
      rays.forEach((r) => { scene.remove(r); r.geometry.dispose(); r.material.dispose(); });
      rays = [];
      if (floor) { scene.remove(floor); floor.geometry.dispose(); floor.material.dispose(); floor = null; }
      renderer.setClearColor(0x000000, 0);
      scene.fog.density = env.mobile ? 0.03 : 0.022;
      if (hallGlow) { scene.remove(hallGlow); hallGlow.geometry.dispose(); hallGlow.material.dispose(); hallGlow = null; }
      camera.userData.baseY = 1.6;
      camera.userData.baseX = 0;
      buildSanctum();

      /* the floating glass stage joins the same scene and the same loop */
      if (typeof GlassWorld !== "undefined") {
        try { GlassWorld.init(this.world); }
        catch (e) { /* glass is a flourish: never let it take the invitation down */ }
      }

      /* dial the effects back: atmosphere, not confetti */
      if (env.gsap) {
        gsap.to(petals.material.uniforms.uOpacity, { value: 0.4, duration: 2.2 });
        gsap.to(dust.material, { opacity: 0.42, duration: 2.2 });
        gsap.to(bokeh.material, { opacity: 0.26, duration: 2.2 });
      } else {
        petals.material.uniforms.uOpacity.value = 0.4;
        dust.material.opacity = 0.42;
        bokeh.material.opacity = 0.26;
      }
    }
  };
})();

/* ------------------------------------------------------------
   9. CSS FALLBACK DOORS (no WebGL) — the invitation still works
   ------------------------------------------------------------ */
const FallbackDoors = (() => {
  let ready = false;

  return {
    init() {
      document.body.classList.add("no-webgl");
      if (!env.gsap) return;
      gsap.set(".css-door--left",  { xPercent: -100, yPercent: -50, rotationY: 0, transformOrigin: "left center" });
      gsap.set(".css-door--right", { xPercent: 100,  yPercent: -50, rotationY: 0, transformOrigin: "right center" });
      gsap.set(".css-glow", { xPercent: -50, yPercent: -50, scale: 0.6, opacity: 0.18 });
      gsap.set(".css-arch", { xPercent: -50, yPercent: -50 });
      ready = true;
    },

    /* 2D petals, deliberately few — no thousands of DOM nodes */
    petals() {
      if (env.reduced) return;
      const n = env.mobile ? 10 : 16;
      const frag = document.createDocumentFragment();
      for (let i = 0; i < n; i++) {
        const p = document.createElement("span");
        p.className = "petal2d";
        p.style.left = `${Math.random() * 100}vw`;
        p.style.animationDelay = `${-Math.random() * 12}s`;
        p.style.animationDuration = `${9 + Math.random() * 9}s`;
        p.style.setProperty("--drift", `${(Math.random() - 0.5) * 220}px`);
        p.style.setProperty("--psize", `${9 + Math.random() * 12}px`);
        frag.appendChild(p);
      }
      document.body.appendChild(frag);
    },

    timeline(tl, speed) {
      if (!ready) return;
      tl.to(".css-door__handle", { x: (i) => (i === 0 ? 6 : -6), duration: 0.3 * speed, yoyo: true, repeat: 1 }, 0.2 * speed)
        .to(".css-glow", { opacity: 1, scale: 1.15, duration: 1.6 * speed, ease: "power2.out" }, 0.4 * speed)
        .to(".css-door--left",  { rotationY: -82, duration: 2.1 * speed, ease: "power2.inOut" }, 0.7 * speed)
        .to(".css-door--right", { rotationY: 82,  duration: 2.1 * speed, ease: "power2.inOut" }, 0.7 * speed)
        .to(".css-stage", { scale: env.reduced ? 1.05 : 2.6, opacity: 0, duration: 1.5 * speed, ease: "power2.in" }, 1.8 * speed);
    }
  };
})();

/* ------------------------------------------------------------
   10. CINEMATIC INTRO TIMELINE
   ------------------------------------------------------------ */
const Intro = (() => {
  let played = false;

  function finish() {
    const intro = $("#intro");
    const main = $("#main-content");
    document.body.classList.remove("is-locked");
    document.body.classList.add("is-entered");
    main.setAttribute("aria-hidden", "false");
    main.setAttribute("tabindex", "-1");
    if (intro) intro.style.display = "none";
    Scene3D.enterMainScene();
    Reveal.init();
    main.focus({ preventScroll: true });
  }

  return {
    play() {
      if (played) return;
      played = true;

      const btn = $("#enter-btn");
      const main = $("#main-content");
      const content = $(".intro__content");
      btn.disabled = true;

      Music.start();

      /* No GSAP or reduced motion with no animation budget: reveal immediately */
      if (!env.gsap) {
        main.style.opacity = "1";
        finish();
        return;
      }

      const s = Scene3D.ok ? Scene3D.api : null;
      const speed = env.reduced ? 0.34 : 1;          // reduced motion keeps the beats, shortens them
      const travel = !env.reduced;                    // no big camera moves when motion is reduced

      const tl = gsap.timeline({ defaults: { ease: "power2.out" }, onComplete: finish });

      /* 0.0 — the button gives way */
      tl.to(btn, { scale: 0.94, duration: 0.24 * speed, ease: "power2.in" }, 0)
        .to(btn, { opacity: 0, y: 10, duration: 0.5 * speed }, 0.5 * speed);

      if (s) {
        /* 0.2 — handles turn */
        tl.to([s.leftHandle.rotation, s.rightHandle.rotation],
              { z: (i) => (i === 0 ? -0.5 : 0.5), duration: 0.45 * speed, ease: "back.out(2)" }, 0.2 * speed)
          .to([s.leftHandle.position, s.rightHandle.position],
              { z: "+=0.06", duration: 0.3 * speed, yoyo: true, repeat: 1 }, 0.2 * speed);

        /* 0.4 — golden light seeps through the gap */
        tl.to(s.gapGlow.material, { opacity: 1, duration: 1.1 * speed }, 0.4 * speed)
          .to(s.gapGlow.scale, { x: 3.2, duration: 2.2 * speed, ease: "power2.inOut" }, 0.6 * speed)
          .to(s.rays.map((r) => r.material), { opacity: 0.22, duration: 1.6 * speed }, 0.5 * speed);

        /* 0.7 → 1.2 — the doors swing open on their hinges */
        tl.to(s.leftPivot.rotation,  { y: 1.45, duration: 2.3 * speed, ease: "power2.inOut" }, 0.7 * speed)
          .to(s.rightPivot.rotation, { y: -1.45, duration: 2.3 * speed, ease: "power2.inOut" }, 0.7 * speed);

        /* 1.5 — golden particles */
        tl.to(s.dust.material, { opacity: 0.95, duration: 1.4 * speed }, 1.5 * speed)
          .to(s.bokeh.material, { opacity: 0.42, duration: 1.6 * speed }, 1.5 * speed);

        /* 1.7 — petals begin to fall */
        tl.to(s.petals.material.uniforms.uOpacity, { value: 1, duration: 1.5 * speed }, 1.7 * speed);

        /* 1.8 → 2.2 — the camera moves forward, then through the doorway */
        if (travel) {
          const z0 = s.camera.userData.startZ || s.camera.position.z;
          tl.to(s.camera.position, { z: z0 * 0.42, duration: 1.1, ease: "power1.inOut" }, 1.8)
            .to(s.camera.position, { z: -4.2, duration: 1.5, ease: "power2.inOut" }, 2.2)
            .to(s.camera.userData, { baseY: 2.35, duration: 1.6, ease: "sine.inOut" }, 1.9);
        } else {
          tl.to(s.camera.position, { z: "-=1.2", duration: 0.7 }, 1.0 * speed);
        }
      } else {
        FallbackDoors.timeline(tl, speed);
        tl.call(() => FallbackDoors.petals(), null, 1.7 * speed);
      }

      /* 2.5 — the names take the screen */
      tl.to(content, { scale: travel ? 1.35 : 1.05, opacity: 0, filter: "blur(6px)", duration: 1.0 * speed, ease: "power2.in" }, 2.3 * speed);

      /* 3.0 — the wedding scene is revealed */
      tl.set(main, { visibility: "visible" }, 2.6 * speed)
        .fromTo(main, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1.0 * speed, ease: "power2.out" }, 2.9 * speed);

      /* 3.5 — the overlay is gone */
      tl.to("#intro", { opacity: 0, duration: 0.6 * speed }, 3.0 * speed);
    }
  };
})();

/* ------------------------------------------------------------
   11. SCROLL EXPERIENCE
   ------------------------------------------------------------ */
const Reveal = (() => {
  let done = false;

  return {
    init() {
      if (done) return;
      done = true;

      const fill = $("#progress-fill");
      const onScroll = () => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        const p = h > 0 ? window.scrollY / h : 0;
        if (fill) fill.style.width = `${(p * 100).toFixed(2)}%`;
        Scene3D.setScroll(p * 1.1);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();

      const hasST = env.gsap && typeof ScrollTrigger !== "undefined";
      if (hasST) gsap.registerPlugin(ScrollTrigger);

      initTilt();
      initCarousel();
      initFlipCard();

      if (!hasST) return;

      /* Whichever ritual owns the middle of the screen owns the glass stage.
         Deciding it from the geometry each frame is immune to the order
         scroll callbacks happen to fire in, including big jumps and deep links. */
      const rituals = $$("[data-scene]");
      if (rituals.length && typeof GlassWorld !== "undefined") {
        let current = null, queued = false;

        const pick = () => {
          queued = false;
          const mid = window.innerHeight / 2;
          let best = null, bestGap = Infinity;
          rituals.forEach((el) => {
            const r = el.getBoundingClientRect();
            if (r.bottom < mid * 0.4 || r.top > window.innerHeight - mid * 0.4) return;
            const gap = Math.abs((r.top + r.bottom) / 2 - mid);
            if (gap < bestGap) { bestGap = gap; best = el; }
          });
          const id = best ? best.dataset.scene : null;
          if (id === current) return;
          current = id;
          rituals.forEach((el) => el.classList.toggle("is-live", el === best));
          GlassWorld.show(id);
        };

        window.addEventListener("scroll", () => {
          if (queued) return;
          queued = true;
          requestAnimationFrame(pick);
        }, { passive: true });
        window.addEventListener("resize", () => requestAnimationFrame(pick), { passive: true });
        window.addEventListener("load", () => requestAnimationFrame(pick));
        /* lazy images landing above the fold change the page height under us,
           which would otherwise leave a stale scene on the stage */
        if (typeof ResizeObserver === "function") {
          new ResizeObserver(() => { if (!queued) { queued = true; requestAnimationFrame(pick); } })
            .observe(document.body);
        }
        pick();

        /* the drawn mehndi motif */
        const mehndi = $(".mehndi");
        if (mehndi && !env.reduced) {
          const strokes = $$("path, circle", mehndi);
          strokes.forEach((el) => {
            const len = el.getTotalLength ? el.getTotalLength() : 200;
            gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
          });
          gsap.to(strokes, {
            strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut", stagger: 0.06,
            scrollTrigger: { trigger: mehndi, start: "top 78%", once: true }
          });
        }
      }

      const dist = env.reduced ? 12 : 44;
      const dur = env.reduced ? 0.4 : 0.95;

      $$(".section").forEach((section) => {
        const items = $$(".reveal", section);
        if (!items.length) return;
        const vars = {
          opacity: 0,
          y: dist,
          duration: dur,
          ease: "power3.out",
          stagger: env.reduced ? 0.04 : 0.11,
          scrollTrigger: { trigger: section, start: "top 82%", once: true }
        };
        if (!env.reduced) { vars.scale = 0.985; vars.filter = "blur(7px)"; }
        gsap.from(items, vars);
      });

      if (!env.reduced) {
        /* event cards get a touch of perspective as they arrive */
        gsap.from(".event-card", {
          rotationX: -14,
          transformOrigin: "50% 100%",
          duration: 1,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: { trigger: "#events", start: "top 76%", once: true }
        });

        /* layered hero parallax */
        $$(".hero__layer").forEach((layer) => {
          gsap.to(layer, {
            y: () => window.innerHeight * parseFloat(layer.dataset.depth || "0.05") * 3,
            ease: "none",
            scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: 0.6 }
          });
        });

        /* section titles drift gently */
        $$(".section__title").forEach((title) => {
          gsap.fromTo(title, { y: 20 }, {
            y: -20, ease: "none",
            scrollTrigger: { trigger: title, start: "top bottom", end: "bottom top", scrub: 0.8 }
          });
        });

        gsap.to(".footer__ornament", {
          rotate: 8, ease: "none",
          scrollTrigger: { trigger: ".footer", start: "top bottom", end: "bottom bottom", scrub: 1 }
        });
      }

      ScrollTrigger.refresh();
      window.addEventListener("load", () => ScrollTrigger.refresh());
    }
  };
})();

/* ------------------------------------------------------------
   BOOT
   ------------------------------------------------------------ */
(function boot() {
  bindContent();
  initCountdown();
  initGallery();
  initRsvp();
  Music.init();

  const ok = Scene3D.init();
  if (!ok) FallbackDoors.init();

  const btn = $("#enter-btn");
  btn.addEventListener("click", () => Intro.play());
  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); Intro.play(); }
  });

  /* let a visitor who lands mid-page (or arrives with a hash) reach the invitation */
  if (window.location.hash && window.location.hash !== "#hero") {
    Intro.play();
  }

  const skip = $(".skip-link");
  if (skip) skip.addEventListener("click", () => { if (!document.body.classList.contains("is-entered")) Intro.play(); });
})();
