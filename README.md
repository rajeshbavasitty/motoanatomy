# MotoAnatomy — Ducati 9-Model Edition

Interactive motorcycle anatomy learning platform built with React, Vite and Three.js.

## Ducati models included
- Panigale V4
- Streetfighter V4
- Streetfighter V2
- Monster 937
- Diavel V4
- Multistrada V4
- Hypermotard 950
- Scrambler Icon
- DesertX

Each model has its own exploded-view image, anatomy video and GLB model.

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Asset structure
`public/assets/ducati/<model>/exploded.png`
`public/assets/ducati/<model>/video.mp4`
`public/assets/ducati/<model>/model.glb`

See `DEPLOYMENT-NOTE.md` for the Cloudflare GLB hosting limitation.
