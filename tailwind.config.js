/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Copper, warm enough to belong to the same light as the hero lamp.
        primary: '#C4744C',
        'primary-dark': '#A55B36',
        'primary-light': '#DB9068',
        accent: '#8A6A50',

        // Warm near-black grounds — the hero's own tone, extended to the
        // whole page so nothing reads as a separate site.
        deep: '#100C0A',
        background: '#17120F',
        surface: '#1E1815',
        raised: '#26201B',

        ink: '#F2EADF',
        'ink-2': '#D3C7B8',
        muted: '#9B8E7F',
        faint: '#6E6357',
        divider: '#2E2620',
        'divider-2': '#241E19',
      },
      fontFamily: {
        // One family for the whole site. Hierarchy comes from weight, size,
        // tracking and case — never from a second typeface. The four keys are
        // kept as aliases so existing markup keeps working; they all resolve
        // to the same grotesk.
        display: ['"Inter Tight"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'system-ui', 'sans-serif'],
        body:    ['"Inter Tight"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'system-ui', 'sans-serif'],
        serif:   ['"Inter Tight"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'system-ui', 'sans-serif'],
        mono:    ['"Inter Tight"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        // The page fills the screen on a laptop and keeps only a small margin
        // on anything wider. Prose still sits on its own comfortable measure,
        // so widening the page never widens a line of text past reading.
        shell: '1400px',
        col:   '720px',
        prose: '680px',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
