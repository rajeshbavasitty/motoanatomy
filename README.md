# MotoAnatomy — Panigale V4 Navigation Build

## Latest behavior
- Home and Brands use brand logo icons instead of letter fallbacks.
- Home hero keeps the motorcycle image contained inside the right-hand panel so it does not overlap the headline/content column.
- Exploded View supports `−`, `+`, mouse-wheel zoom, percentage readout, Reset, and Fullscreen.
- Video Anatomy autoplay is enabled and muted for browser autoplay compatibility.
- **Left ANATOMY SYSTEMS** buttons are navigation: selecting one switches to System Anatomy and updates the URL/query state.
- **System buttons below the video** are contextual controls: selecting Engine, Transmission, Braking, etc. keeps the user on Video Anatomy and only updates the right-side Knowledge Card.

## Run
```powershell
npm install
npm run dev
```

## Note
Brand logos currently load from Simple Icons CDN. For a fully self-contained production deployment, these SVG logos can later be bundled into `public/assets/brands/`.
