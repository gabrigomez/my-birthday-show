/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'unbounded': ['Unbounded', 'cursive'],
        'permanent': ['Permanent Marker', 'cursive'],
      },
      backgroundImage: {
        'paper': "url('./assets/paper.png')",
      },
      screens: {
        'xs': '550px',
      },
      fontSize: {
        'md': '0.9rem',
      }
    },
  },
  plugins: [],
}
