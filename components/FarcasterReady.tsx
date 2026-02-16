'use client'

import { useEffect } from 'react'
import { useFarcasterSDK } from '@/hooks/useFarcasterSDK'

/** Calls sdk.actions.ready() so Farcaster/Base embed shows "Ready" */
export function FarcasterReady() {
  const { ready } = useFarcasterSDK()
  useEffect(() => {
    ready()
  }, [ready])
  return null
}
