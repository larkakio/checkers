/** Checkers Clash — Algebraic notation (e.g. E3-D4, C3xE5xG7) */

import type { Move, Position } from './types'

const COL_LETTERS = 'ABCDEFGH'

export function positionToNotation(pos: Position): string {
  return `${COL_LETTERS[pos.col]}${pos.row + 1}`
}

export function notationToPosition(notation: string): Position | null {
  const col = COL_LETTERS.indexOf(notation[0]?.toUpperCase() ?? '')
  const row = parseInt(notation.slice(1), 10) - 1
  if (col < 0 || row < 0 || row > 7) return null
  return { row, col }
}

export function moveToNotation(move: Move): string {
  const from = positionToNotation(move.from)
  const to = positionToNotation(move.to)
  if (move.captures.length === 0) return `${from}-${to}`
  const steps = [from, ...move.captures.map((c) => positionToNotation(c)), to]
  return steps.join('x')
}

export function notationToMove(notation: string): Move | null {
  const parts = notation.split(/[-x]/i)
  if (parts.length < 2) return null
  const from = notationToPosition(parts[0])
  const to = notationToPosition(parts[parts.length - 1])
  if (!from || !to) return null
  const captures: Position[] = []
  for (let i = 1; i < parts.length - 1; i++) {
    const p = notationToPosition(parts[i])
    if (p) captures.push(p)
  }
  return { from, to, captures }
}
