# skiyo.me

Personal homepage for Liqiang Dong / @Skiyo, based on the approved v8 design.

## Structure

- `index.html`: semantic page content and inline SVG illustrations.
- `assets/styles.<hash>.css`: styles and responsive layout.
- `assets/main.<hash>.js`: early theme initialization plus language, theme and WeChat dialog interactions.
- `assets/painting.<hash>.png`: original uploaded painting, unchanged.
- `assets/wechat-qr.<hash>.jpg`: original WeChat QR image, unchanged.
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
