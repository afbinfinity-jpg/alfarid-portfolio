/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00C2FF',
        'primary-dark': '#009ACC',
        'primary-light': '#66D9FF',
        accent: '#7B61FF',
        'accent-dark': '#6249E8',
        background: '#0A0A0F',
        surface: '#13131A',
        ink: '#F2F2F7',
        muted: '#8A8A9A',
        divider: '#1E1E2A',
        deep: '#07070C',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
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
