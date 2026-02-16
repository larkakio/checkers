'use client'

import { motion } from 'framer-motion'
import type { Piece as PieceType } from '@/lib/game/types'
import { pieceMove } from '@/lib/utils/animations'

interface PieceProps {
  piece: PieceType
  isSelected: boolean
}

export function Piece({ piece, isSelected }: PieceProps) {
  const isCyan = piece.color === 'cyan'
  const bg = isCyan ? 'bg-cyan' : 'bg-magenta'
  const shadow = isCyan ? 'shadow-glow' : 'shadow-glow-magenta'

  return (
    <motion.div
      layout
      className={`
        relative flex h-[80%] w-[80%] items-center justify-center rounded-full ${bg} ${isSelected ? shadow : ''}
        ${isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-boardLight' : ''}
      `}
      {...pieceMove}
      style={{
        boxShadow: isSelected ? (isCyan ? '0 0 20px rgba(0,243,255,0.6)' : '0 0 20px rgba(255,0,102,0.6)') : undefined,
      }}
    >
      {piece.isKing && (
        <span
          className="absolute inset-0 flex items-center justify-center text-[0.5em] font-bold text-primary"
          aria-hidden
        >
          ♔
        </span>
      )}
    </motion.div>
  )
}
