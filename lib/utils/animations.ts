/** Checkers Clash — Framer Motion variants (neon glow, spring) */

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
}

export const scaleIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.9, opacity: 0 },
  transition: { type: 'spring', stiffness: 300, damping: 24 },
}

export const slideUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 20, opacity: 0 },
  transition: { duration: 0.35 },
}

export const pieceMove = {
  transition: { type: 'spring', stiffness: 400, damping: 30 },
}

export const glowPulse = {
  animate: {
    boxShadow: [
      '0 0 12px rgba(0, 243, 255, 0.4)',
      '0 0 24px rgba(0, 243, 255, 0.6)',
      '0 0 12px rgba(0, 243, 255, 0.4)',
    ],
    transition: { duration: 1.5, repeat: Infinity },
  },
}

export const victoryBurst = {
  initial: { scale: 0.5, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { type: 'spring', stiffness: 200, damping: 20 },
}
