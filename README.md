# TAQA Distribution Web

Static website for TAQA Distribution covering the two service regions, ADDC (Abu Dhabi) and AADC (Al Ain), in English and Arabic.

Built with Next.js 14 (App Router) and exported as a fully static site.

## Routes

Pages follow the pattern `/{region}/{language}/{section}/...`

- Regions: `addc`, `aadc`
- Languages: `en-us`, `ar-ae` (Arabic pages render right to left)
- Sections: `residential`, `business`, `partners` (ADDC only), plus `sitemap`, `search`, `privacy-policy`, `terms-of-use`

The root URL redirects to `/addc/en-us/residential/overview`.

## Run locally

```bash
yarn install
yarn dev
```

Open http://localhost:3000/addc/en-us/residential/overview/index

## Build

```bash
yarn build
```

The static output is written to `out/`. To preview it locally run `yarn run-build`.

## Deploy

Deployed on Vercel. The framework preset is detected as Next.js and no extra settings are needed.
