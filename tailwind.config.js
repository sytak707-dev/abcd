/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-noto)', 'sans-serif'],
      },
      colors: {
        navy: {
          900: '#0A0F1E',
          800: '#0F172A',
          700: '#1E293B',
        },
      },
    },
  },
  plugins: [],
}
