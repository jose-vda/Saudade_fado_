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
          soft: '#D4B58A',
          dark: '#78582F',
          deep: '#4D320C',
        },
        'gold-dark': '#78582F',
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
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.76, 0, 0.24, 1)',
        silk: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      maxWidth: {
        editorial: '1440px',
        reading: '68ch',
      },
      boxShadow: {
        'soft-sm': '0 1px 2px rgba(26, 26, 26, 0.04), 0 1px 3px rgba(26, 26, 26, 0.06)',
        soft: '0 4px 12px -2px rgba(26, 26, 26, 0.06), 0 2px 6px -1px rgba(26, 26, 26, 0.04)',
        'soft-lg': '0 20px 45px -15px rgba(26, 26, 26, 0.12), 0 8px 20px -10px rgba(26, 26, 26, 0.08)',
        'soft-xl': '0 35px 80px -25px rgba(13, 13, 13, 0.25), 0 12px 30px -12px rgba(13, 13, 13, 0.12)',
        gold: '0 10px 30px -10px rgba(193, 154, 107, 0.35)',
        'inner-hairline': 'inset 0 0 0 1px rgba(255, 255, 255, 0.06)',
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'grain-noise':
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.65'/></svg>\")",
      },
      keyframes: {
        'marquee-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translate3d(0, 24px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.9s cubic-bezier(0.4, 0, 0.2, 1) both',
        shimmer: 'shimmer 2.2s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
