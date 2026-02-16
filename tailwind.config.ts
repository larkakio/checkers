import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0a0e1a',
        secondary: '#1a2332',
        cyan: '#00f3ff',
        magenta: '#ff0066',
        highlight: '#0066ff',
        boardDark: '#0d1520',
        boardLight: '#1a2332',
      },
      fontFamily: {
        orbitron: ['var(--font-orbitron)', 'sans-serif'],
        exo: ['var(--font-exo)', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 243, 255, 0.5)',
        'glow-magenta': '0 0 20px rgba(255, 0, 102, 0.5)',
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
export default config
