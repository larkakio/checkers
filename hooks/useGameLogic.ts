'use client'

import { useCallback, useMemo, useState } from 'react'
import type { Move, PieceColor, Position } from '@/lib/game/types'
import {
  applyMoveToBoard,
  createInitialBoard,
  getPhase,
  getValidMoves,
  hasMandatoryCapture,
} from '@/lib/game/rules'
import { getAIMove, type AIDifficulty } from '@/lib/game/ai'

export interface UseGameLogicOptions {
  playAsCyan: boolean
  vsAI: boolean
  aiDifficulty: AIDifficulty
}

export function useGameLogic(options: UseGameLogicOptions) {
  const { playAsCyan, vsAI, aiDifficulty } = options
  const [board, setBoard] = useState(() => createInitialBoard())
  const [currentTurn, setCurrentTurn] = useState<PieceColor>('cyan')
  const [moveHistory, setMoveHistory] = useState<Move[]>([])
  const [capturedCyan, setCapturedCyan] = useState(0)
  const [capturedMagenta, setCapturedMagenta] = useState(0)
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null)

  const phase = useMemo(() => getPhase(board, currentTurn), [board, currentTurn])

  const validMoves = useMemo(() => {
    if (!selectedPosition) return []
    return getValidMoves(board, selectedPosition)
  }, [board, selectedPosition])

  const humanColor = playAsCyan ? 'cyan' : 'magenta'
  const isHumanTurn = currentTurn === humanColor
  const mandatoryCapture = hasMandatoryCapture(board, currentTurn)

  const executeMove = useCallback(
    (move: Move) => {
      const piece = board[move.from.row][move.from.col]
      if (!piece || piece.color !== currentTurn) return

      const nextBoard = applyMoveToBoard(board, move)
      setBoard(nextBoard)
      setMoveHistory((h) => [...h, move])
      const capturedCyanCount = move.captures.filter((p) => board[p.row]?.[p.col]?.color === 'cyan').length
      const capturedMagentaCount = move.captures.filter((p) => board[p.row]?.[p.col]?.color === 'magenta').length
      setCapturedCyan((c) => c + capturedCyanCount)
      setCapturedMagenta((c) => c + capturedMagentaCount)
      setCurrentTurn((t) => (t === 'cyan' ? 'magenta' : 'cyan'))
      setSelectedPosition(null)
    },
    [board, currentTurn]
  )

  const onSquareSelect = useCallback(
    (pos: Position) => {
      const piece = board[pos.row][pos.col]
      if (piece && piece.color === humanColor && isHumanTurn) {
        const moves = getValidMoves(board, pos)
        const mustCapture = mandatoryCapture && moves.some((m) => m.captures.length > 0)
        const allowed = mustCapture ? moves.filter((m) => m.captures.length > 0) : moves
        if (allowed.length > 0) setSelectedPosition(pos)
        return
      }
      if (selectedPosition) {
        const move = validMoves.find((m) => m.to.row === pos.row && m.to.col === pos.col)
        if (move) executeMove(move)
        else setSelectedPosition(null)
      }
    },
    [board, humanColor, isHumanTurn, mandatoryCapture, selectedPosition, validMoves, executeMove]
  )

  const onSwipeMove = useCallback(
    (from: Position, to: Position) => {
      const move = getValidMoves(board, from).find((m) => m.to.row === to.row && m.to.col === to.col)
      if (move && board[from.row][from.col]?.color === humanColor && isHumanTurn) executeMove(move)
    },
    [board, humanColor, isHumanTurn, executeMove]
  )

  const newGame = useCallback(() => {
    setBoard(createInitialBoard())
    setCurrentTurn('cyan')
    setMoveHistory([])
    setCapturedCyan(0)
    setCapturedMagenta(0)
    setSelectedPosition(null)
  }, [])

  const triggerAI = useCallback(() => {
    if (!vsAI || isHumanTurn || phase !== 'playing') return
    const aiColor = playAsCyan ? 'magenta' : 'cyan'
    const move = getAIMove(board, aiColor, aiDifficulty)
    if (move) {
      setTimeout(() => executeMove(move), 400)
    }
  }, [vsAI, isHumanTurn, phase, playAsCyan, board, aiDifficulty, executeMove])

  return {
    board,
    currentTurn,
    phase,
    moveHistory,
    capturedCyan,
    capturedMagenta,
    selectedPosition,
    validMoves,
    isHumanTurn,
    humanColor,
    mandatoryCapture,
    onSquareSelect,
    onSwipeMove,
    executeMove,
    newGame,
    triggerAI,
  }
}
