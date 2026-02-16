/** Checkers Clash — AI opponent (minimax with alpha-beta pruning) */

import type { Board, Move, PieceColor } from './types'
import {
  applyMoveToBoard,
  getPhase,
  getValidMoves,
  hasMandatoryCapture,
} from './rules'

const KING_VALUE = 3
const PIECE_VALUE = 1
const BACK_ROW_BONUS = 0.2

function evaluateBoard(board: Board, forColor: PieceColor): number {
  let score = 0
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const p = board[row][col]
      if (!p) continue
      const mult = p.color === forColor ? 1 : -1
      const value = p.isKing ? KING_VALUE : PIECE_VALUE
      const backBonus = (p.color === 'cyan' && row === 0) || (p.color === 'magenta' && row === 7) ? BACK_ROW_BONUS : 0
      score += mult * (value + backBonus)
    }
  }
  return score
}

function getMovesForColor(board: Board, color: PieceColor): Move[] {
  const mandatory = hasMandatoryCapture(board, color)
  const moves: Move[] = []
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col]
      if (!piece || piece.color !== color) continue
      const valid = getValidMoves(board, { row, col })
      for (const m of valid) {
        if (mandatory && m.captures.length === 0) continue
        moves.push(m)
      }
    }
  }
  return moves
}

function minimax(
  board: Board,
  depth: number,
  alpha: number,
  beta: number,
  maximizing: boolean,
  aiColor: PieceColor
): number {
  const phase = getPhase(board, maximizing ? aiColor : (aiColor === 'cyan' ? 'magenta' : 'cyan'))
  if (phase !== 'playing' || depth <= 0) {
    return evaluateBoard(board, aiColor)
  }

  const currentColor = maximizing ? aiColor : (aiColor === 'cyan' ? 'magenta' : 'cyan')
  const moves = getMovesForColor(board, currentColor)
  if (moves.length === 0) return evaluateBoard(board, aiColor)

  if (maximizing) {
    let best = -Infinity
    for (const move of moves) {
      const next = applyMoveToBoard(board, move)
      const score = minimax(next, depth - 1, alpha, beta, false, aiColor)
      best = Math.max(best, score)
      alpha = Math.max(alpha, score)
      if (beta <= alpha) break
    }
    return best
  } else {
    let best = Infinity
    for (const move of moves) {
      const next = applyMoveToBoard(board, move)
      const score = minimax(next, depth - 1, alpha, beta, true, aiColor)
      best = Math.min(best, score)
      beta = Math.min(beta, score)
      if (beta <= alpha) break
    }
    return best
  }
}

export type AIDifficulty = 'easy' | 'medium' | 'hard'

const DEPTH: Record<AIDifficulty, number> = { easy: 2, medium: 4, hard: 6 }

export function getAIMove(
  board: Board,
  aiColor: PieceColor,
  difficulty: AIDifficulty
): Move | null {
  const moves = getMovesForColor(board, aiColor)
  if (moves.length === 0) return null

  const depth = DEPTH[difficulty]
  let bestMove: Move | null = null
  let bestScore = -Infinity

  for (const move of moves) {
    const next = applyMoveToBoard(board, move)
    const score = minimax(next, depth - 1, -Infinity, Infinity, false, aiColor)
    if (score > bestScore) {
      bestScore = score
      bestMove = move
    }
  }
  return bestMove
}
