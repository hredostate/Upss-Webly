/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          50: '#fdf2f2',
          100: '#fde3e3',
          200: '#fbd0d0',
          300: '#f6aaaa',
          400: '#ef7a7a',
          500: '#e54d4d',
          600: '#d12e2e',
          700: '#b01e1e',
          800: '#800000', // UPSS Primary
          900: '#7a0b0b',
          950: '#430202',
        },
        gold: {
          100: '#FFF9E6',
          200: '#FFECB3',
          300: '#FFDF80',
          400: '#FFD24D',
          500: '#D4AF37', // Academic Gold
          600: '#AA8C2C',
          700: '#806921',
          800: '#554616',
          900: '#2B230B',
        },
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'zoom-slow': 'zoomSlow 20s linear infinite alternate',
      },
      keyframes: {
        zoomSlow: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        }
      }
    },
  },
  plugins: [],
}