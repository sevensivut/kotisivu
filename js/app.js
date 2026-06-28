/* ─── app.js ─────────────────────────────────────────────
   Handles:
   - Nav scroll progress bar (the "playhead")
   - Active state on nav links based on scroll position
   - Auto-fill copyright year/* ─── app.js ─────────────────────────────────────────────
   - Nav scroll progress bar (the "playhead")
   - Active state on nav links
   - Auto-fill copyright year
   - Album art marquee from data/playlist.json
────────────────────────────────────────────────────────── */

const progressBar = document.querySelector('.nav__progress');
const navLinks    = document.querySelectorAll('.nav__link');
const sections    = document.querySelectorAll('section[id]');

// ── Copyright year ─────────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Scroll: playhead + active nav ──────────────────────
function onScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  if (progressBar) {
    progressBar.style.width = `${docHeight > 0 ? (scrollTop / docHeight) * 100 : 0}%`;
  }

  let current = '';
  sections.forEach(s => {
    if (s.offsetTop - 80 <= scrollTop) current = s.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('is-active', link.getAttribute('href').replace('#', '') === current);
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── Album art marquee ──────────────────────────────────
async function loadArtStrip() {
  const strip = document.getElementById('artTrack');
  const wrapper = strip?.closest('.art-strip');
  if (!strip || !wrapper) return;

  let tracks;
  try {
    const res = await fetch('data/playlist.json');
    if (!res.ok) return;           // file not yet generated — strip stays hidden
    tracks = await res.json();
    if (!tracks.length) return;
  } catch {
    return;                        // fetch failed silently (local dev, etc.)
  }

  // Deduplicate by art URL (multiple tracks share the same album art)
  const unique = tracks.filter((t, i, arr) => arr.findIndex(x => x.art === t.art) === i);

  // Need enough items to fill the viewport. Repeat until we have ≥ 30 images.
  const repeated = [];
  while (repeated.length < 30) repeated.push(...unique);

  // Double the array — the animation runs translateX(-50%) for seamless loop
  const doubled = [...repeated, ...repeated];

  doubled.forEach(t => {
    const img = document.createElement('img');
    img.src       = t.art;
    img.alt       = t.album;
    img.className = 'art-strip__img';
    img.loading   = 'lazy';
    strip.appendChild(img);
  });

  wrapper.classList.add('is-loaded');
}

loadArtStrip();

────────────────────────────────────────────────────────── */

const progressBar = document.querySelector('.nav__progress');
const navLinks    = document.querySelectorAll('.nav__link');
const sections    = document.querySelectorAll('section[id]');

// ── Copyright year ─────────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Scroll handler ─────────────────────────────────────
function onScroll() {
  const scrollTop  = window.scrollY;
  const docHeight  = document.documentElement.scrollHeight - window.innerHeight;

  // Playhead progress
  if (progressBar) {
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${pct}%`;
  }

  // Active nav link — whichever section's top is nearest above the fold
  const offset = 80; // a little below the nav
  let current  = '';

  sections.forEach(section => {
    if (section.offsetTop - offset <= scrollTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    const href = link.getAttribute('href').replace('#', '');
    link.classList.toggle('is-active', href === current);
  });
}

window.addEventListener('scroll', onScroll, { passive: true });

// Run once on load to set initial state
onScroll();
