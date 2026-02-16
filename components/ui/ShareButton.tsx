'use client'

import { useFarcasterSDK } from '@/hooks/useFarcasterSDK'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://checkers-zeta-seven.vercel.app')

export function ShareButton() {
  const { openUrl } = useFarcasterSDK()
  const shareUrl = `${APP_URL}?ref=share`
  const castUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent('Play Checkers Clash on Base!')}&embeds[]=${encodeURIComponent(shareUrl)}`

  return (
    <button
      type="button"
      className="min-h-[44px] min-w-[44px] rounded-lg bg-highlight px-4 font-exo text-sm text-white"
      onClick={() => openUrl(castUrl)}
      aria-label="Share"
    >
      Share
    </button>
  )
}
