/* ─── app.js ─────────────────────────────────────────────
   Handles:
   - Nav scroll progress bar (the "playhead")
   - Active state on nav links based on scroll position
   - Auto-fill copyright year
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
