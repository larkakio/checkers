# Checkers Clash

Futuristic Checkers (English/American Draughts) Mini App for **Base** and **Farcaster**.

- **Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, [@farcaster/miniapp-sdk](https://www.npmjs.com/package/@farcaster/miniapp-sdk)
- **Game:** 8×8 board, 12 pieces per side (cyan / magenta), mandatory captures, kings, AI opponent (minimax)
- **UI:** Neon theme (#0a0e1a, #00f3ff, #ff0066), swipe/tap controls, haptics, mobile-first

## Quick start

```bash
npm install
cp .env.local.example .env.local   # optional: set NEXT_PUBLIC_APP_URL
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy (Vercel)

1. Push to GitHub and [import in Vercel](https://vercel.com/new).
2. Set **NEXT_PUBLIC_APP_URL** to your deployment URL (e.g. `https://checkers-zeta-seven.vercel.app`).
3. Turn off **Deployment Protection** (Settings → Deployment Protection) so the manifest can be fetched.
4. [Base Build – Account association](https://www.base.dev/preview?tab=account): paste your app URL, submit, verify, then copy the `accountAssociation` object.
5. In `minikit.config.ts`, paste the `header`, `payload`, and `signature` into `accountAssociation`.
6. Push to `main`; Vercel will redeploy.
7. [Base Preview](https://base.dev/preview): add your app URL and test launch/metadata.
8. Publish by posting your app URL in the Base app.

## Project layout

- `app/` – layout, page, `.well-known/farcaster.json` route, webhook API
- `components/` – FarcasterReady, game (Board, Piece, Square, …), ui (PlayerPanel, ControlPanel, GameOverModal, …)
- `context/` – GameContext
- `hooks/` – useFarcasterSDK, useGameLogic, useSwipeGestures
- `lib/game/` – types, rules, AI (minimax), notation
- `lib/utils/` – animations, haptics
- `minikit.config.ts` – Base Mini App manifest (name, icon, splash, webhook, etc.)
- `public/` – icon.png, hero-image.png

## Base / Farcaster

- [Create a Mini App (Base)](https://docs.base.org/mini-apps/quickstart/create-new-miniapp)
- [Featured guidelines](https://docs.base.org/mini-apps/featured-guidelines/overview)
- Manifest: `/.well-known/farcaster.json` (served from `minikit.config.ts`)

## License

MIT
