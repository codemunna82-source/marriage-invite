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
   7.  Music
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
  const KEY = "wedding-music-pref";
  const VOL = 0.42;

  let audio, btn, label;
  let ac = null, gain = null, src = null;
  let wanted = true, on = false, loading = false;

  const store = (v) => { try { localStorage.setItem(KEY, v ? "on" : "off"); } catch (e) { /* private mode */ } };
  const read = () => { try { return localStorage.getItem(KEY); } catch (e) { return null; } };

  const paint = (v) => {
    on = v;
    if (!btn) return;
    btn.setAttribute("aria-pressed", String(v));
    btn.classList.toggle("is-on", v);
    label.textContent = v ? "ON" : "OFF";
  };

  const ramp = (to, secs) => {
    if (!gain) return;
    const t = ac.currentTime;
    gain.gain.cancelScheduledValues(t);
    gain.gain.setValueAtTime(gain.gain.value, t);
    gain.gain.linearRampToValueAtTime(to, t + secs);
  };

  /* the conch, once, over the opening doors — the bhajan swells in behind it */
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
    /* the first fade is slow so the shankh is heard on its own */
    ramp(VOL, first ? 4.5 : 1.2);
    return true;
  }

  /* fallback: the plain audio element (also covers file:// where fetch is blocked) */
  function playElement() {
    if (!audio) return Promise.reject();
    audio.volume = 0;
    const p = audio.play();
    return (p && p.then ? p : Promise.resolve()).then(() => {
      if (env.gsap) gsap.to(audio, { volume: VOL, duration: 2.4 });
      else audio.volume = VOL;
    });
  }

  async function play() {
    try {
      if (await playWebAudio()) { paint(true); return; }
      throw new Error("no web audio");
    } catch (e) {
      try { await playElement(); paint(true); }
      catch (err) { paint(false); }          /* no file yet, or the browser refused */
    }
  }

  function pause() {
    if (src && ac) {
      ramp(0, 0.6);
      setTimeout(() => { if (!on && ac && ac.state === "running") ac.suspend(); }, 700);
    }
    if (audio && !audio.paused) {
      if (env.gsap) gsap.to(audio, { volume: 0, duration: 0.6, onComplete: () => audio.pause() });
      else audio.pause();
    }
    paint(false);
  }

  return {
    init() {
      audio = $("#bg-music");
      btn = $("#music-btn");
      if (!btn) return;
      label = $(".music-btn__text", btn);
      wanted = read() !== "off";        /* music is on unless this guest turned it off */
      paint(false);

      btn.addEventListener("click", () => {
        if (on) { wanted = false; store(false); pause(); }
        else { wanted = true; store(true); play(); }
      });

      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          if (ac && ac.state === "running") ac.suspend();
          if (audio && !audio.paused) audio.pause();
        } else if (on && wanted) {
          if (ac && ac.state === "suspended") ac.resume();
          else if (audio && audio.paused && audio.currentTime) audio.play().catch(() => {});
        }
      });
    },

    /* called from the ENTER WEDDING gesture, which is what unlocks audio on mobile */
    start() {
      if (!btn) return;
      btn.hidden = false;
      if (wanted) play();
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
      color: 0xC9A227, emissive: 0x6E5310, emissiveIntensity: 0.3,
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
  }

  return {
    get ok() { return running; },
    get api() {
      return { leftPivot, rightPivot, leftHandle, rightHandle, camera, gapGlow, hallGlow, rays, dust, petals, bokeh };
    },

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
