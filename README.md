# Gallery — Anime Photo Album

A full-stack anime image gallery built **entirely on Vercel** — no third-party
infrastructure. Browse a masonry gallery of anime art, star/favorite images to
your account, and pull images programmatically through a token-authenticated
public API.

**Live:** https://photo-album-self.vercel.app · **API docs:** [/docs](https://photo-album-self.vercel.app/docs)

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4**, `react-masonry-css`, `react-hot-toast`
- **Vercel Blob** — image storage
- **Vercel Postgres (Neon)** via `@vercel/postgres` — accounts, API tokens, favorites
- **sharp** — image downscaling during seeding
- Auth: custom email/password (scrypt hashing + signed session cookies, Node `crypto`)

## Features

- Masonry gallery with **infinite scroll** and lazy-loaded images
- **Click-to-view lightbox** that fits the image
- **Account-based favorites**, synced across devices (star counts shared globally)
- **Accounts + API tokens** — sign up, create/list/revoke tokens at `/account`
- **Public API** — fetch by random / category / name / your favorites / most-popular, and upload via token
- Upload from the UI; dynamic per-user avatar; category filter + search

## Local development

```bash
pnpm install

# pull env vars from the linked Vercel project (Blob + Postgres + SESSION_SECRET)
pnpm dlx vercel link
pnpm dlx vercel env pull .env.local

pnpm dev        # http://localhost:3000
```

### Environment variables

Provided automatically when the Vercel **Blob** and **Postgres** stores are
connected to the project; pull them with `vercel env pull`.

| Variable | Source | Purpose |
|---|---|---|
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob | Image storage read/write |
| `POSTGRES_URL` / `DATABASE_URL` | Neon Postgres | Accounts, tokens, favorites |
| `SESSION_SECRET` | set manually | Signs session cookies (`openssl rand -hex 48`) |

Postgres tables (`users`, `api_tokens`, `favorites`) are created automatically
on first use.

## Seeding images

Real anime artwork is sourced from [Safebooru](https://safebooru.org) (trending
series for characters + `no_humans` tags for scenery), downscaled to fit the
1 GB Blob free tier.

```bash
pnpm seed [perTag]          # full reseed (wipes existing), default 60/tag
ONLY=Travel,Space pnpm seed # subset of categories
NOWIPE=1 CONC=4 pnpm seed   # add without wiping, lower concurrency
```

## Public API

Base URL: `https://photo-album-self.vercel.app`. All `/api/images` requests need
a token (create one at `/account`) sent as `Authorization: Bearer <token>`.

### `GET /api/images`
Query params (combine freely):

| Param | Description |
|---|---|
| `count` | number to return (1–50, default 1) |
| `category` | filter by category (e.g. `Anime`) |
| `name` | substring match on image name |
| `favorites=true` | the token owner's favorited images |
| `popular=true` | globally most-favorited first |
| `random=false` | return in order instead of randomly |

```bash
curl "https://photo-album-self.vercel.app/api/images?count=3&category=Anime" \
  -H "Authorization: Bearer glr_your_token_here"
```

### `POST /api/images`
Add an image — JSON remote URL or multipart file upload.

```bash
curl -X POST "https://photo-album-self.vercel.app/api/images" \
  -H "Authorization: Bearer glr_your_token_here" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com/pic.jpg","name":"My pic","category":"Art"}'
```

### Other endpoints
- `GET /api/photos` — full collection (no token; used by the gallery)
- `POST /api/auth/signup` · `/login` · `/logout` · `GET /api/auth/me`
- `GET/POST/DELETE /api/tokens` — token management (session)
- `GET/POST/DELETE /api/favorites` — app-side favoriting (session)

## Deployment

Connected to Vercel with Git auto-deploy on push to `main`. To deploy manually:

```bash
pnpm dlx vercel --prod
```

## Categories

All · Anime · Gaming · Movies · Music · Art · Animals · Nature · Food · Travel · Space · Other
