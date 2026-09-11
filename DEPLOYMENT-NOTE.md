# MotoAnatomy Ducati deployment note

This build contains 9 Ducati models with model-specific exploded PNG, MP4 anatomy video, and GLB 3D assets.

Cloudflare Workers Static Assets currently impose a 25 MiB per-file static asset limit. The supplied Ducati GLBs are larger than that, so the GLBs should be hosted in an object store/CDN (for example Cloudflare R2 with a public/custom-domain URL) for the 3D viewer in production. The website source is already structured so each bike's GLB path is isolated under `/assets/ducati/<model>/model.glb` and can be changed to a CDN URL without redesigning the UI.
