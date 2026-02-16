'use client'

import { motion } from 'framer-motion'
import type { Move } from '@/lib/game/types'
import { moveToNotation } from '@/lib/game/notation'

interface MoveHistoryProps {
  moves: Move[]
}

export function MoveHistory({ moves }: MoveHistoryProps) {
  return (
    <motion.div
      className="max-h-32 overflow-y-auto rounded-lg bg-secondary/60 px-3 py-2 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <p className="font-exo text-xs font-medium text-cyan/80">Move history</p>
      <ul className="mt-1 space-y-0.5 font-mono text-xs text-white/80">
        {moves.map((move, i) => (
          <li key={i}>{moveToNotation(move)}</li>
        ))}
        {moves.length === 0 && <li className="text-white/50">No moves yet</li>}
      </ul>
    </motion.div>
  )
}
