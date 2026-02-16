import type { Metadata } from 'next'
import { Orbitron, Exo_2 } from 'next/font/google'
import './globals.css'
import { GameProvider } from '@/context/GameContext'
import { FarcasterReady } from '@/components/FarcasterReady'

const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })
const exo = Exo_2({ subsets: ['latin'], variable: '--font-exo' })

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://checkers-clash.vercel.app'

const FC_EMBED = {
  version: '1' as const,
  imageUrl: `${APP_URL}/hero-image.png`,
  button: {
    title: 'Play Checkers',
    action: {
      type: 'launch_frame' as const,
      name: 'Checkers Clash',
      url: APP_URL,
      splashImageUrl: `${APP_URL}/hero-image.png`,
      splashBackgroundColor: '#0a0e1a',
    },
  },
}

export const metadata: Metadata = {
  title: 'Checkers Clash - Play on Base',
  description: 'Futuristic Checkers game on Base Network. Swipe to move, compete with AI or friends!',
  openGraph: {
    title: 'Checkers Clash',
    description: 'Play Checkers on Base Network',
    images: [{ url: `${APP_URL}/hero-image.png`, width: 1200, height: 630 }],
  },
  other: {
    viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0',
    'theme-color': '#0a0e1a',
    'fc:miniapp': JSON.stringify(FC_EMBED),
    'fc:frame': JSON.stringify(FC_EMBED),
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${orbitron.variable} ${exo.variable} font-exo`}>
        <FarcasterReady />
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  )
}
