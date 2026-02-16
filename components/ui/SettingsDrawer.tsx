'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameContext } from '@/context/GameContext'
import type { AIDifficulty } from '@/lib/game/ai'

export function SettingsDrawer() {
  const [open, setOpen] = useState(false)
  const { playAsCyan, setPlayAsCyan, vsAI, setVsAI, aiDifficulty, setAIDifficulty } = useGameContext()

  const difficulties: AIDifficulty[] = ['easy', 'medium', 'hard']

  return (
    <>
      <button
        type="button"
        className="min-h-[44px] min-w-[44px] rounded-lg bg-secondary px-3 font-exo text-sm text-white"
        onClick={() => setOpen(true)}
        aria-label="Settings"
      >
        ⚙️
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-primary/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="absolute bottom-0 left-0 right-0 rounded-t-2xl border-t border-cyan/30 bg-secondary p-6"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-orbitron text-lg text-cyan">Settings</h3>
              <div className="mt-4 space-y-4">
                <label className="flex items-center gap-2 font-exo text-sm text-white">
                  <input
                    type="checkbox"
                    checked={vsAI}
                    onChange={(e) => setVsAI(e.target.checked)}
                    className="rounded"
                  />
                  Play vs AI
                </label>
                {vsAI && (
                  <div>
                    <p className="mb-2 font-exo text-xs text-white/70">AI difficulty</p>
                    <div className="flex gap-2">
                      {difficulties.map((d) => (
                        <button
                          key={d}
                          type="button"
                          className={`min-h-[44px] rounded-lg px-3 font-exo text-sm capitalize ${aiDifficulty === d ? 'bg-cyan text-primary' : 'bg-secondary text-white'}`}
                          onClick={() => setAIDifficulty(d)}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <label className="flex items-center gap-2 font-exo text-sm text-white">
                  <input
                    type="checkbox"
                    checked={playAsCyan}
                    onChange={(e) => setPlayAsCyan(e.target.checked)}
                    className="rounded"
                  />
                  Play as Cyan (top)
                </label>
              </div>
              <button
                type="button"
                className="mt-4 w-full min-h-[44px] rounded-lg bg-cyan font-exo text-primary"
                onClick={() => setOpen(false)}
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
