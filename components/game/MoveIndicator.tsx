'use client'

import { motion } from 'framer-motion'

/** Small dot or ring to show a valid move target */
export function MoveIndicator() {
  return (
    <motion.span
      className="h-3 w-3 rounded-full bg-green-400/80"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 24 }}
      aria-hidden
    />
  )
}
