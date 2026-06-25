import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Tinta / oscuros
        ink: '#16120e',
        charcoal: '#231f1a',
        // Neutros cálidos / lienzo
        canvas: '#f7f2ec',
        cream: '#fbf9f5',
        sand: '#efe6da',
        beige: '#e5d7c6',
        nude: '#d9c1ab',
        taupe: '#b6a18c',
        stone: '#8c7c6c',
        // Blush / rose
        blush: '#ecd5cd',
        rose: '#d9aaa0',
        mauve: '#c6968d',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.28em',
        wide2: '0.18em',
      },
      maxWidth: {
        container: '1280px',
      },
      transitionTimingFunction: {
        lux: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
