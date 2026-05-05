/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['"Playfair Display"', 'ui-serif', 'Georgia', 'serif']
      },
      colors: {
        forest: { DEFAULT: '#1B4332', light: '#2D6A4F', dark: '#081C15' },
        gold: { DEFAULT: '#D4AF37', hover: '#C5A028' },
        cream: '#FDFDFB',
        sand: '#F4EFE6'
      }
    }
  },
  plugins: [],
}
