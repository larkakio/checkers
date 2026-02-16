'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameContext } from '@/context/GameContext'
import { scaleIn } from '@/lib/utils/animations'
import { hapticSuccess } from '@/lib/utils/haptics'

export function GameOverModal() {
  const { game } = useGameContext()
  const { phase, newGame, moveHistory, capturedCyan, capturedMagenta } = game
  const didHaptic = useRef(false)

  const show =
    phase === 'cyan_wins' || phase === 'magenta_wins' || phase === 'draw'
  const title =
    phase === 'draw'
      ? 'Draw'
      : phase === 'cyan_wins'
        ? 'Cyan wins!'
        : 'Magenta wins!'

  useEffect(() => {
    if (show && !didHaptic.current) {
      hapticSuccess()
      didHaptic.current = true
    }
    if (!show) didHaptic.current = false
  }, [show])

  if (!show) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-primary/90 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && newGame()}
      >
        <motion.div
          className="mx-4 max-w-sm rounded-2xl border-2 border-cyan/50 bg-secondary p-6 shadow-glow"
          {...scaleIn}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="font-orbitron text-xl font-bold text-cyan">{title}</h2>
          <p className="mt-2 font-exo text-sm text-white/80">
            Moves: {moveHistory.length} · Captured: {capturedCyan + capturedMagenta}
          </p>
          <button
            type="button"
            className="mt-4 min-h-[44px] w-full rounded-lg bg-cyan font-exo font-medium text-primary transition hover:bg-cyan/90"
            onClick={newGame}
          >
            Rematch
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
