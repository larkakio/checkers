/** Checkers Clash — English/American Checkers rules (8×8, mandatory captures) */

import type { Board, Move, Piece, PieceColor, Position } from './types'
import { BOARD_SIZE } from './types'

function isValidSquare(row: number, col: number): boolean {
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE
}

function isDarkSquare(row: number, col: number): boolean {
  return (row + col) % 2 === 1
}

function getPiece(board: Board, pos: Position): Piece | null {
  if (!isValidSquare(pos.row, pos.col)) return null
  return board[pos.row][pos.col]
}

export function createInitialBoard(): Board {
  const board: Board = Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(null))

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (!isDarkSquare(row, col)) continue
      if (row < 3) {
        board[row][col] = { color: 'cyan', isKing: false, position: { row, col } }
      } else if (row > 4) {
        board[row][col] = { color: 'magenta', isKing: false, position: { row, col } }
      }
    }
  }
  return board
}

function getDirections(piece: Piece): number[][] {
  if (piece.isKing) return [[-1, -1], [-1, 1], [1, -1], [1, 1]]
  // Cyan at top (rows 0–2) moves DOWN toward center. Magenta at bottom (rows 5–7) moves UP toward center.
  return piece.color === 'cyan' ? [[1, -1], [1, 1]] : [[-1, -1], [-1, 1]]
}

function getJumpMoves(
  board: Board,
  position: Position,
  piece: Piece,
  capturedSoFar: Position[]
): Move[] {
  const moves: Move[] = []
  const directions = getDirections(piece)

  for (const [dr, dc] of directions) {
    const midRow = position.row + dr
    const midCol = position.col + dc
    const landRow = position.row + dr * 2
    const landCol = position.col + dc * 2

    if (!isValidSquare(landRow, landCol) || !isDarkSquare(landRow, landCol)) continue
    const midPiece = getPiece(board, { row: midRow, col: midCol })
    const landCell = getPiece(board, { row: landRow, col: landCol })

    if (!midPiece || midPiece.color === piece.color || landCell) continue
    if (capturedSoFar.some((c) => c.row === midRow && c.col === midCol)) continue

    const newCaptures = [...capturedSoFar, { row: midRow, col: midCol }]
    const move: Move = { from: position, to: { row: landRow, col: landCol }, captures: newCaptures }

    const boardAfter = applyMoveToBoard(board, move)
    const furtherJumps = getJumpMoves(boardAfter, move.to, { ...piece, position: move.to }, newCaptures)

    if (furtherJumps.length > 0) {
      moves.push(...furtherJumps)
    } else {
      moves.push(move)
    }
  }
  return moves
}

export function getValidMoves(board: Board, position: Position): Move[] {
  const piece = getPiece(board, position)
  if (!piece) return []

  const jumpMoves = getJumpMoves(board, position, piece, [])
  if (jumpMoves.length > 0) return jumpMoves

  const directions = getDirections(piece)
  const simpleMoves: Move[] = []

  for (const [dr, dc] of directions) {
    const newRow = position.row + dr
    const newCol = position.col + dc
    if (isValidSquare(newRow, newCol) && isDarkSquare(newRow, newCol) && !board[newRow][newCol]) {
      simpleMoves.push({ from: position, to: { row: newRow, col: newCol }, captures: [] })
    }
  }
  return simpleMoves
}

export function hasMandatoryCapture(board: Board, currentTurn: PieceColor): boolean {
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const piece = board[row][col]
      if (piece && piece.color === currentTurn) {
        const jumps = getJumpMoves(board, { row, col }, piece, [])
        if (jumps.length > 0) return true
      }
    }
  }
  return false
}

export function applyMoveToBoard(board: Board, move: Move): Board {
  const next = board.map((r) => r.map((p) => (p ? { ...p } : null)))
  const piece = next[move.from.row][move.from.col]
  if (!piece) return board

  next[move.from.row][move.from.col] = null
  for (const cap of move.captures) next[cap.row][cap.col] = null

  const newPiece: Piece = {
    ...piece,
    position: move.to,
    isKing: piece.isKing || (piece.color === 'cyan' && move.to.row === BOARD_SIZE - 1) || (piece.color === 'magenta' && move.to.row === 0),
  }
  next[move.to.row][move.to.col] = newPiece
  return next
}

export function countPieces(board: Board, color: PieceColor): number {
  let n = 0
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const p = board[row][col]
      if (p && p.color === color) n++
    }
  }
  return n
}

export function getPhase(board: Board, currentTurn: PieceColor): 'playing' | 'cyan_wins' | 'magenta_wins' | 'draw' {
  const cyanCount = countPieces(board, 'cyan')
  const magentaCount = countPieces(board, 'magenta')
  if (cyanCount === 0) return 'magenta_wins'
  if (magentaCount === 0) return 'cyan_wins'

  const indices = Array.from({ length: BOARD_SIZE }, (_, i) => i)
  const currentHasMove = indices.some((row) =>
    indices.some((col) => {
      const p = board[row][col]
      return p && p.color === currentTurn && getValidMoves(board, { row, col }).length > 0
    })
  )
  const phaseResult = !currentHasMove ? (currentTurn === 'cyan' ? 'magenta_wins' : 'cyan_wins') : 'playing'
  // #region agent log
  if (typeof fetch !== 'undefined') {
    const sampleMoves = currentTurn === 'cyan' ? (() => { let n = 0; indices.forEach((r) => indices.forEach((c) => { if (board[r][c]?.color === 'cyan') n += getValidMoves(board, { row: r, col: c }).length; })); return n; })() : -1;
    fetch('http://127.0.0.1:7251/ingest/e829058a-c7c8-4091-bc5c-2b6c202e49cd', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'rules.ts:getPhase', message: 'getPhase result', data: { cyanCount, magentaCount, currentTurn, currentHasMove, cyanTotalValidMoves: sampleMoves, phaseResult }, timestamp: Date.now(), hypothesisId: 'H1' }) }).catch(() => {});
  }
  // #endregion
  if (!currentHasMove) return currentTurn === 'cyan' ? 'magenta_wins' : 'cyan_wins'
  return 'playing'
}
