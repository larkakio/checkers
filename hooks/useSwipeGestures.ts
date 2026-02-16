'use client'

import { useCallback, useRef, useState } from 'react'
import type { Position } from '@/lib/game/types'
import { hapticLight } from '@/lib/utils/haptics'

export function useSwipeGestures(onSwipe: (from: Position, to: Position) => void) {
  const [isDragging, setIsDragging] = useState(false)
  const startSquare = useRef<Position | null>(null)

  const handleTouchStart = useCallback(
    (_e: React.TouchEvent, position: Position) => {
      startSquare.current = position
      setIsDragging(true)
      hapticLight()
    },
    []
  )

  const handleTouchEnd = useCallback(
    (_e: React.TouchEvent, position: Position) => {
      if (!startSquare.current) {
        setIsDragging(false)
        return
      }
      const from = startSquare.current
      if (from.row !== position.row || from.col !== position.col) {
        onSwipe(from, position)
      }
      startSquare.current = null
      setIsDragging(false)
    },
    [onSwipe]
  )

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (isDragging) e.preventDefault()
  }, [isDragging])

  return { handleTouchStart, handleTouchMove, handleTouchEnd, isDragging }
}
