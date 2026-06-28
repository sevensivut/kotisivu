# Musician Site

Personal musician website — built for GitHub Pages. No build step, no framework, no dependencies beyond Google Fonts.

## File structure

```
├── index.html          ← all content lives here
├── css/
│   └── style.css       ← all styles + design tokens
├── js/
│   └── app.js          ← scroll progress, active nav, year
└── assets/
    └── covers/         ← drop album art images here
```

## Deploy to GitHub Pages

1. Create a new public repo on GitHub (e.g. `yourname.github.io` for a root site, or any name for a project site)
2. Push these files to the `main` branch
3. Go to **Settings → Pages → Source** → select `main` branch, root `/`
4. Your site is live at `https://yourusername.github.io/` (or `.../repo-name/`)

## Customizing content

### Artist name + tagline
In `index.html`, find the `<h1 class="hero__name">` and `<p class="hero__tagline">` elements and replace the placeholder text.

### Nav initials
Replace `AN` in `<a href="#home" class="nav__logo">AN</a>` with your initials.

### Music cards
Duplicate the `<article class="music-card">` block for each release. Fill in:
- Song/album title
- Meta (Single / EP / Album · year)
- Streaming links (`href="#"` → your actual URL)
- Cover art: place image in `assets/covers/`, uncomment the `<img>` tag

### Videos
Replace `VIDEO_ID_1`, `VIDEO_ID_2` etc. with the YouTube video ID (the part after `?v=` in the URL). Add or remove `<div class="video-wrap">` blocks as needed.

### Bio
Replace the placeholder text inside `<p class="bio__text">`.

### Footer socials
Replace the `href="#"` values with your actual profile URLs. Add or remove links as needed.

### Accent colour
In `css/style.css`, change `--accent: #C4A46A;` to any colour you like. Everything highlights derive from this single variable.

## Adding more music cards or videos

Just duplicate the relevant block in `index.html`. The CSS grid handles layout automatically.
