/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // UPSS Primary - Maroon (used across ALL sections)
        primary: {
          50: '#fdf2f2',
          100: '#fde3e3',
          200: '#fbd0d0',
          300: '#f6aaaa',
          400: '#ef7a7a',
          500: '#e54d4d',
          600: '#d12e2e',
          700: '#b01e1e',
          800: '#800000', // Main brand color
          900: '#7a0b0b',
          950: '#430202',
        },
        // Accent - Gold
        accent: {
          50: '#fffbeb',
          100: '#FFF9E6',
          200: '#FFECB3',
          300: '#FFDF80',
          400: '#FFD24D',
          500: '#c9a227', // Main accent
          600: '#AA8C2C',
          700: '#806921',
          800: '#554616',
          900: '#2B230B',
        },
        // Keep maroon and gold as aliases for backward compatibility
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
          50: '#fffbeb',
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
        // Alumni colors
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a5f', // Navy Blue (Alumni Primary)
          950: '#172554',
        },
        yellow: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#c9a227', // Gold (Alumni Accent)
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
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