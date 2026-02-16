'use client'

import { motion } from 'framer-motion'
import type { Position } from '@/lib/game/types'

interface SquareProps {
  position: Position
  isDark: boolean
  isSelected: boolean
  isValidTarget: boolean
  onSelect: () => void
  onTouchStart: (e: React.TouchEvent) => void
  onTouchEnd: (e: React.TouchEvent) => void
  onTouchMove: (e: React.TouchEvent) => void
  children: React.ReactNode
}

export function Square({
  position,
  isDark,
  isSelected,
  isValidTarget,
  onSelect,
  onTouchStart,
  onTouchEnd,
  onTouchMove,
  children,
}: SquareProps) {
  const colLetter = 'ABCDEFGH'[position.col]
  const rowNum = position.row + 1

  return (
    <motion.button
      type="button"
      className={`
        relative flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg
        transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan
        ${isDark ? 'bg-boardLight' : 'bg-boardDark'}
        ${isSelected ? 'ring-2 ring-cyan shadow-glow' : ''}
        ${isValidTarget ? 'ring-2 ring-green-400 ring-offset-2 ring-offset-primary' : ''}
      `}
      onClick={onSelect}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      style={{ touchAction: 'manipulation' }}
      aria-label={`Square ${colLetter}${rowNum}`}
    >
      {children}
    </motion.button>
  )
}
