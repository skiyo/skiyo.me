# skiyo.me

Personal homepage for Liqiang Dong / @Skiyo, based on the approved v8 design.

## Structure

- `index.html`: semantic page content and inline SVG illustrations.
- `assets/styles.<hash>.css`: styles and responsive layout.
- `assets/main.<hash>.js`: deferred language, theme and WeChat popover interactions; a tiny inline head script initializes the saved theme.
- `assets/painting-{640,1122}.<hash>.avif` / `.webp`: responsive painting, desktop only.
- `assets/painting-fallback.<hash>.jpg`: final painting format fallback.
- `assets/painting.<hash>.png`: original uploaded painting, retained unchanged as source.
- `assets/wechat-qr.<hash>.webp`: lossless QR, fetched eagerly with the page; original `.jpg` is the error fallback.
- `CNAME`: custom domain `skiyo.me`.
- `.nojekyll`: serve the plain static files without Jekyll processing.

No framework, package installation or build step is required. Run locally with:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/`.

## Updates and deployment

GitHub Pages uses the existing `main` branch, repository root publishing source.
Pushing a change to `main` triggers the existing Pages build and deployment.
Keep the custom domain and HTTPS settings in GitHub Pages unchanged.

Asset filenames include the first 12 hexadecimal characters of their SHA-256
content hash. When an asset changes, rename it with its new hash and update its
reference in `index.html`. The changed URL lets browsers and the CDN fetch the
new resource. GitHub Pages controls its CDN response headers; this repository
does not configure arbitrary `Cache-Control` headers.

Local `preview-v*/` directories, browser screenshots and verification records
are not part of the released site. Stage release files explicitly.

## Loading behavior

Desktop picture sources match the CSS desktop-only media condition. A data-URI
placeholder means hidden mobile, portrait and touch layouts request no painting.
The browser selects one AVIF, WebP or JPEG resource; sizes account for cover
height as well as the 30vw panel width and device pixel ratio. The painting
uses low fetch priority and appears after asynchronous decode; text and controls
do not wait for it. No framework, third-party runtime or loading animation.

Keep older hashed assets for cached HTML compatibility. Update active references
when changing content. PNG source and old files are not requested by new pages.

WeChat uses a small QR-only anchored white popover: hover/focus on desktop,
tap-to-toggle on touch, Escape/outside interaction to dismiss. The panel allows
pointer movement from the icon and remains within viewport bounds. No modal or
backdrop, and no separate QR preload; the image is eagerly requested once.
