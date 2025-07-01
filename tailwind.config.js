/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#E6F6FF',
          200: '#BAE3FF',
          300: '#7CC4FA',
          400: '#47A3F3',
          500: '#2186EB',
          600: '#0967D2',
          700: '#0552B5',
          800: '#03449E',
          900: '#01337D',
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
      }
    },
  },
  plugins: [],
}
