'use client'

import { useGameContext } from '@/context/GameContext'
import { Board } from '@/components/game/Board'
import { PlayerPanel } from '@/components/ui/PlayerPanel'
import { ControlPanel } from '@/components/ui/ControlPanel'
import { MoveHistory } from '@/components/ui/MoveHistory'
import { GameOverModal } from '@/components/ui/GameOverModal'
import { SettingsDrawer } from '@/components/ui/SettingsDrawer'
import { ShareButton } from '@/components/ui/ShareButton'

export default function Home() {
  const { game, vsAI } = useGameContext()
  const {
    board,
    currentTurn,
    phase,
    moveHistory,
    capturedCyan,
    capturedMagenta,
  } = game

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-4 pb-safe">
      <header className="flex w-full max-w-md items-center justify-between">
        <h1 className="font-orbitron text-lg font-bold text-cyan">Checkers Clash</h1>
        <div className="flex items-center gap-2">
          <SettingsDrawer />
          <ShareButton />
        </div>
      </header>

      {/* Top player (Magenta / AI) */}
      <PlayerPanel
        color="magenta"
        label={vsAI ? 'AI' : 'Magenta'}
        capturedCount={capturedMagenta}
        isActive={currentTurn === 'magenta' && phase === 'playing'}
      />

      <div className="flex w-full max-w-md flex-1 flex-col items-center gap-4 overflow-auto">
        <Board />
        <ControlPanel />
        <MoveHistory moves={moveHistory} />
      </div>

      {/* Bottom player (Cyan / Human) */}
      <PlayerPanel
        color="cyan"
        label="You"
        capturedCount={capturedCyan}
        isActive={currentTurn === 'cyan' && phase === 'playing'}
      />

      <GameOverModal />
    </main>
  )
}
