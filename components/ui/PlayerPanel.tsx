'use client'

import { motion } from 'framer-motion'
import type { PieceColor } from '@/lib/game/types'

interface PlayerPanelProps {
  color: PieceColor
  label: string
  capturedCount: number
  isActive: boolean
}

export function PlayerPanel({ color, label, capturedCount, isActive }: PlayerPanelProps) {
  const isCyan = color === 'cyan'
  const bg = isCyan ? 'from-cyan/20 to-cyan/5' : 'from-magenta/20 to-magenta/5'
  const border = isActive ? (isCyan ? 'border-cyan shadow-glow' : 'border-magenta shadow-glow-magenta') : 'border-secondary'

  return (
    <motion.div
      className={`
        flex items-center gap-3 rounded-xl border-2 bg-gradient-to-br ${bg} px-4 py-2 backdrop-blur-md ${border}
      `}
      animate={isActive ? { boxShadow: isCyan ? '0 0 20px rgba(0,243,255,0.4)' : '0 0 20px rgba(255,0,102,0.4)' } : {}}
      transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
    >
      <div
        className={`h-8 w-8 rounded-full ${isCyan ? 'bg-cyan' : 'bg-magenta'}`}
        aria-hidden
      />
      <span className="font-exo text-sm font-medium text-white">{label}</span>
      <span className="font-exo text-xs text-white/70">Captured: {capturedCount}</span>
    </motion.div>
  )
}
