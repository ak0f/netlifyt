import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        base: '#07070f',
        surface: '#0d0d1c',
        card: '#0a0a18',
        raised: '#111128',
        accent: '#6366f1',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'DM Sans', 'sans-serif'],
        hg:   ['var(--font-hg)', 'Host Grotesk', 'sans-serif'],
        mono: ['var(--font-ibm-mono)', 'monospace'],
        ui:   ['var(--font-hg)', 'Host Grotesk', 'sans-serif'],
      },
      keyframes: {
        orbFloat: {
          '0%,100%': { transform: 'translate(0,0) scale(1)',     opacity: '0.6' },
          '33%':     { transform: 'translate(-25px,-30px) scale(1.08)', opacity: '0.8' },
          '66%':     { transform: 'translate(15px,-18px) scale(0.95)',  opacity: '0.5' },
        },
        orbFloat2: {
          '0%,100%': { transform: 'translate(0,0) scale(1)',     opacity: '0.5' },
          '33%':     { transform: 'translate(20px,-25px) scale(1.06)', opacity: '0.7' },
          '66%':     { transform: 'translate(-10px,-15px) scale(0.92)',opacity: '0.4' },
        },
        scrollLine: {
          '0%,100%': { opacity: '0.4', transform: 'scaleY(1)' },
          '50%':     { opacity: '0.9', transform: 'scaleY(1.15)' },
        },
      },
      animation: {
        orb1: 'orbFloat 10s ease-in-out infinite',
        orb2: 'orbFloat2 13s ease-in-out infinite',
        scrollLine: 'scrollLine 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
