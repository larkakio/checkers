import { NextResponse } from 'next/server'
import { minikitConfig } from '@/minikit.config'

/** Serves Farcaster/Base Mini App manifest at /.well-known/farcaster.json */
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://checkers-zeta-seven.vercel.app'
  const manifest = {
    accountAssociation: minikitConfig.accountAssociation,
    miniapp: {
      ...minikitConfig.miniapp,
      homeUrl: baseUrl,
      webhookUrl: `${baseUrl}/api/webhook`,
      iconUrl: `${baseUrl}/icon.png`,
      imageUrl: `${baseUrl}/hero-image.png`,
      splashImageUrl: `${baseUrl}/hero-image.png`,
      heroImageUrl: `${baseUrl}/hero-image.png`,
      ogImageUrl: `${baseUrl}/hero-image.png`,
      screenshotUrls: minikitConfig.miniapp.screenshotUrls,
    },
  }
  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
