/** Base Mini App manifest config — see https://docs.base.org/mini-apps/quickstart/create-new-miniapp */

const ROOT_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://checkers-zeta-seven.vercel.app'

export const minikitConfig = {
  accountAssociation: {
    header: 'eyJmaWQiOjI3OTkwNjUsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhkM2FCQWJjMDU2ODg5OEZGNEIwMjA1NTMzNTc3NmFDYzEwMWQ0N0ZDIn0',
    payload: 'eyJkb21haW4iOiJjaGVja2Vycy16ZXRhLXNldmVuLnZlcmNlbC5hcHAifQ',
    signature: '+HPJujvKyU9FjUFUfruCY+Tey1dYMxXPBlvulXvTs9ti+xVhPuJkf1QlzFXkbV83BfgyrwRBSVf3oOR6Ukf/NRs=',
  },
  miniapp: {
    version: '1',
    name: 'Checkers Clash',
    subtitle: 'Futuristic Checkers on Base',
    description: 'Play classic Checkers with stunning neon visuals on Base Network. Swipe to move, compete with AI or friends!',
    screenshotUrls: [
      `${ROOT_URL}/hero-image.png`,
      `${ROOT_URL}/hero-image.png`,
      `${ROOT_URL}/hero-image.png`,
    ],
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/hero-image.png`,
    splashBackgroundColor: '#0a0e1a',
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: 'games',
    tags: ['checkers', 'board-game', 'strategy', 'base'],
    heroImageUrl: `${ROOT_URL}/hero-image.png`,
    tagline: 'Neon Checkers on Base',
    ogTitle: 'Checkers Clash',
    ogDescription: 'Futuristic Checkers game on Base Network with stunning neon design',
    ogImageUrl: `${ROOT_URL}/hero-image.png`,
    buttonTitle: 'Play Now',
    imageUrl: `${ROOT_URL}/hero-image.png`,
    noindex: false,
    requiredChains: ['eip155:8453'],
  },
} as const
