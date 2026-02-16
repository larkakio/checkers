'use client'

import { motion } from 'framer-motion'
import { useGameContext } from '@/context/GameContext'
import { hapticMedium } from '@/lib/utils/haptics'

export function ControlPanel() {
  const { game } = useGameContext()

  return (
    <motion.div
      className="flex flex-wrap items-center justify-center gap-3 rounded-xl bg-secondary/80 px-4 py-3 backdrop-blur-md"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <button
        type="button"
        className="min-h-[44px] min-w-[44px] rounded-lg bg-cyan px-4 font-exo text-sm font-medium text-primary transition hover:bg-cyan/90 active:scale-95"
        onClick={() => {
          hapticMedium()
          game.newGame()
        }}
      >
        New Game
      </button>
    </motion.div>
  )
}
