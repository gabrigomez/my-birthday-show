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
    },
  },
  plugins: [],
}
