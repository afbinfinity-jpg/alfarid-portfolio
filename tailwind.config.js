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
        // Editorial serif for statements, a quiet modern sans for everything
        // you actually have to read, mono for the small tracked labels.
        display: ['Geist', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body:    ['Geist', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif:   ['"Instrument Serif"', 'Georgia', 'serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        // An editorial measure: the page column stays narrow so the margins
        // do the work, and prose sits on a comfortable line length.
        shell: '1000px',
        col:   '600px',
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
