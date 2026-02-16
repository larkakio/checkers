'use client'

import { useCallback, useEffect, useState } from 'react'

type MiniAppSDK = {
  actions?: {
    ready?: (opts?: unknown) => Promise<void>
    openUrl?: (url: string | { url: string }) => Promise<void>
  }
}

/** Wrapper for @farcaster/miniapp-sdk — dynamic import to avoid SSR issues */
export function useFarcasterSDK() {
  const [sdk, setSdk] = useState<MiniAppSDK | null>(null)

  useEffect(() => {
    import('@farcaster/miniapp-sdk')
      .then((mod) => setSdk((mod as { default: MiniAppSDK }).default ?? mod as unknown as MiniAppSDK))
      .catch(() => {})
  }, [])

  const ready = useCallback(() => {
    sdk?.actions?.ready?.().catch(() => {})
  }, [sdk])

  const openUrl = useCallback(
    (url: string) => {
      if (sdk?.actions?.openUrl) sdk.actions.openUrl(url).catch(() => window.open(url, '_blank'))
      else window.open(url, '_blank')
    },
    [sdk]
  )

  return { sdk, ready, openUrl }
}
