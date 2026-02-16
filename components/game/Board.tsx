'use client'

import React, { useEffect } from 'react'
import { useGameContext } from '@/context/GameContext'
import { useSwipeGestures } from '@/hooks/useSwipeGestures'
import { BOARD_SIZE } from '@/lib/game/types'
import { Square } from './Square'
import { Piece } from './Piece'
import { MoveIndicator } from './MoveIndicator'

function isDarkSquare(row: number, col: number): boolean {
  return (row + col) % 2 === 1
}

export function Board() {
  const { game } = useGameContext()
  const {
    board,
    selectedPosition,
    validMoves,
    onSquareSelect,
    onSwipeMove,
    triggerAI,
  } = game

  const { handleTouchStart, handleTouchEnd, handleTouchMove } = useSwipeGestures(onSwipeMove)

  useEffect(() => {
    triggerAI()
  }, [triggerAI])

  const rows = Array.from({ length: BOARD_SIZE }, (_, row) => row)
  const cols = Array.from({ length: BOARD_SIZE }, (_, col) => col)

  return (
    <div className="inline-flex flex-col gap-0.5 rounded-xl bg-secondary/80 p-2 backdrop-blur-md">
      {/* Column labels */}
      <div className="flex justify-around px-1 text-xs font-medium text-cyan/80">
        {cols.map((c) => (
          <span key={c} className="w-8 text-center" aria-hidden>
            {String.fromCharCode(65 + c)}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-0.5">
        {rows.map((row) => (
          <div key={row} className="flex gap-0.5">
            <span
              className="flex w-5 items-center justify-center text-xs font-medium text-cyan/80"
              aria-hidden
            >
              {row + 1}
            </span>
            {cols.map((col) => {
              const position = { row, col }
              const piece = board[row][col]
              const isDark = isDarkSquare(row, col)
              const isSelected =
                selectedPosition?.row === row && selectedPosition?.col === col
              const isValidTarget = validMoves.some(
                (m) => m.to.row === row && m.to.col === col
              )

              return (
                <Square
                  key={`${row}-${col}`}
                  position={position}
                  isDark={isDark}
                  isSelected={!!isSelected}
                  isValidTarget={isValidTarget}
                  onSelect={() => onSquareSelect(position)}
                  onTouchStart={(e) => handleTouchStart(e, position)}
                  onTouchEnd={(e) => handleTouchEnd(e, position)}
                  onTouchMove={handleTouchMove}
                >
                  {piece && <Piece piece={piece} isSelected={isSelected} />}
                  {!piece && isValidTarget && <MoveIndicator />}
                </Square>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
