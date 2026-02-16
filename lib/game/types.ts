/** Checkers Clash — TypeScript types for English/American Checkers (8×8) */

export type PieceColor = 'cyan' | 'magenta'

export interface Position {
  row: number
  col: number
}

export interface Piece {
  color: PieceColor
  isKing: boolean
  position: Position
}

export interface Move {
  from: Position
  to: Position
  captures: Position[]
}

export type Board = (Piece | null)[][]

export type GamePhase = 'playing' | 'cyan_wins' | 'magenta_wins' | 'draw'

export interface GameState {
  board: Board
  currentTurn: PieceColor
  phase: GamePhase
  moveHistory: Move[]
  capturedCyan: number
  capturedMagenta: number
  selectedPosition: Position | null
  validMoves: Move[]
}

export const BOARD_SIZE = 8
export const ROWS_PER_PLAYER = 3
