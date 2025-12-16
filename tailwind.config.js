/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Alumni-inspired primary palette (navy & gold)
        primary: {
          50: '#eef2ff',
          100: '#e1e7ff',
          200: '#c7d3ff',
          300: '#9fb4f8',
          400: '#6e8ce9',
          500: '#4469d4',
          600: '#2f52b9',
          700: '#244198',
          800: '#1c326f',
          900: '#132349', // Deep navy anchor
          950: '#0e1935',
        },
        accent: {
          50: '#fff9e8',
          100: '#fff2cc',
          200: '#ffe399',
          300: '#ffd166',
          400: '#f7ba3f',
          500: '#c99a1f', // Heritage gold
          600: '#a27916',
          700: '#7c5b12',
          800: '#5c4310',
          900: '#4a360f',
        },
        // Keep aliases aligned to the new palette for consistency
        maroon: {
          50: '#eef2ff',
          100: '#e1e7ff',
          200: '#c7d3ff',
          300: '#9fb4f8',
          400: '#6e8ce9',
          500: '#4469d4',
          600: '#2f52b9',
          700: '#244198',
          800: '#1c326f',
          900: '#132349',
          950: '#0e1935',
        },
        gold: {
          50: '#fff9e8',
          100: '#fff2cc',
          200: '#ffe399',
          300: '#ffd166',
          400: '#f7ba3f',
          500: '#c99a1f',
          600: '#a27916',
          700: '#7c5b12',
          800: '#5c4310',
          900: '#4a360f',
        },
        blue: {
          50: '#eef2ff',
          100: '#e1e7ff',
          200: '#c7d3ff',
          300: '#9fb4f8',
          400: '#6e8ce9',
          500: '#4469d4',
          600: '#2f52b9',
          700: '#244198',
          800: '#1c326f',
          900: '#132349',
          950: '#0e1935',
        },
        yellow: {
          50: '#fff9e8',
          100: '#fff2cc',
          200: '#ffe399',
          300: '#ffd166',
          400: '#f7ba3f',
          500: '#c99a1f',
          600: '#a27916',
          700: '#7c5b12',
          800: '#5c4310',
          900: '#4a360f',
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