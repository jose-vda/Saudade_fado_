import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C19A6B',
          luminous: '#E8C896',
          soft: '#D4B58A',
          dark: '#78582F',
          deep: '#4D320C',
        },
        'gold-dark': '#78582F',
        noir: {
          DEFAULT: '#272422',
          deep: '#1E1B18',
          ink: '#232120',
          ember: '#302C28',
          soft: '#353230',
          mist: '#3D3935',
        },
        cream: {
          DEFAULT: '#F2EAD9',
          mute: '#A89B89',
          dim: '#7A6F5F',
        },
        charcoal: {
          DEFAULT: '#1A1A1A',
          deep: '#0D0D0D',
          soft: '#2A2A2A',
        },
        offwhite: '#FDFDFD',
        surface: '#F9F9F9',
        'on-surface': '#1A1C1C',
        primary: '#78582F',
        'primary-container': '#C19A6B',
        'on-primary': '#FFFFFF',
        'on-primary-container': '#4D320C',
        'surface-container-low': '#F3F3F3',
        'surface-container': '#EEEEEE',
        'surface-container-high': '#E8E8E8',
        'on-surface-variant': '#4F453B',
        'outline-variant': '#D2C4B7',
        outline: '#817569',
        'inverse-surface': '#2F3131',
        'surface-bright': '#F9F9F9',
      },
      fontFamily: {
        headline: ['var(--font-playfair)', 'ui-serif', 'Georgia', 'serif'],
        display: ['var(--font-playfair)', 'ui-serif', 'Georgia', 'serif'],
        body: ['var(--font-montserrat)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        label: ['var(--font-montserrat)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'cinema-sm': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'cinema': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        'cinema-lg': ['clamp(4rem, 11vw, 9rem)', { lineHeight: '0.92', letterSpacing: '-0.035em' }],
        'cinema-xl': ['clamp(5rem, 14vw, 12rem)', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
        '1600': '1600ms',
        '2000': '2000ms',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.76, 0, 0.24, 1)',
        silk: 'cubic-bezier(0.4, 0, 0.2, 1)',
        cinema: 'cubic-bezier(0.83, 0, 0.17, 1)',
        curtain: 'cubic-bezier(0.87, 0, 0.13, 1)',
        anticipate: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
      },
      maxWidth: {
        editorial: '1440px',
        reading: '68ch',
        cinema: '1680px',
      },
      boxShadow: {
        'soft-sm': '0 1px 2px rgba(26, 26, 26, 0.04), 0 1px 3px rgba(26, 26, 26, 0.06)',
        soft: '0 4px 12px -2px rgba(26, 26, 26, 0.06), 0 2px 6px -1px rgba(26, 26, 26, 0.04)',
        'soft-lg': '0 20px 45px -15px rgba(26, 26, 26, 0.12), 0 8px 20px -10px rgba(26, 26, 26, 0.08)',
        'soft-xl': '0 35px 80px -25px rgba(13, 13, 13, 0.25), 0 12px 30px -12px rgba(13, 13, 13, 0.12)',
        gold: '0 10px 30px -10px rgba(193, 154, 107, 0.35)',
        'gold-glow': '0 0 40px -5px rgba(193, 154, 107, 0.45), 0 0 80px -20px rgba(193, 154, 107, 0.25)',
        'cinema': '0 30px 80px -20px rgba(0, 0, 0, 0.75), 0 10px 30px -10px rgba(0, 0, 0, 0.5)',
        'inner-hairline': 'inset 0 0 0 1px rgba(255, 255, 255, 0.06)',
        'inner-gold': 'inset 0 0 0 1px rgba(193, 154, 107, 0.22)',
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'grain-noise':
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.65'/></svg>\")",
        'vignette-radial':
          'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)',
        'vignette-soft':
          'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.4) 100%)',
        'noir-gradient':
          'linear-gradient(180deg, #1A1A1A 0%, #141414 50%, #1F1D1B 100%)',
        'gold-shimmer':
          'linear-gradient(110deg, transparent 30%, rgba(232, 200, 150, 0.4) 50%, transparent 70%)',
      },
      keyframes: {
        'marquee-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'marquee-slow': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translate3d(0, 24px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '50%': { transform: 'scale(1.08) translate(-1%, -1.5%)' },
          '100%': { transform: 'scale(1) translate(0, 0)' },
        },
        'gold-pulse': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.92' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.9s cubic-bezier(0.4, 0, 0.2, 1) both',
        shimmer: 'shimmer 2.2s linear infinite',
        'ken-burns': 'ken-burns 40s ease-in-out infinite',
        'gold-pulse': 'gold-pulse 3.6s ease-in-out infinite',
        flicker: 'flicker 4.2s ease-in-out infinite',
        'marquee-slow': 'marquee-slow 60s linear infinite',
        'marquee-scroll': 'marquee-scroll 50s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
