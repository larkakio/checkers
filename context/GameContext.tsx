'use client'

import { createContext, useContext, useMemo, useState } from 'react'
import type { AIDifficulty } from '@/lib/game/ai'
import { useGameLogic } from '@/hooks/useGameLogic'

interface GameContextValue {
  playAsCyan: boolean
  setPlayAsCyan: (v: boolean) => void
  vsAI: boolean
  setVsAI: (v: boolean) => void
  aiDifficulty: AIDifficulty
  setAIDifficulty: (v: AIDifficulty) => void
  game: ReturnType<typeof useGameLogic>
}

const GameContext = createContext<GameContextValue | null>(null)

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [playAsCyan, setPlayAsCyan] = useState(true)
  const [vsAI, setVsAI] = useState(true)
  const [aiDifficulty, setAIDifficulty] = useState<AIDifficulty>('medium')

  const game = useGameLogic({ playAsCyan, vsAI, aiDifficulty })

  const value = useMemo(
    () => ({
      playAsCyan,
      setPlayAsCyan,
      vsAI,
      setVsAI,
      aiDifficulty,
      setAIDifficulty,
      game,
    }),
    [playAsCyan, vsAI, aiDifficulty, game]
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGameContext() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGameContext must be used within GameProvider')
  return ctx
}
