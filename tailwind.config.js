/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'rock-salty': ['Rock Salt', 'cursive'],
        'unbounded': ['Unbounded', 'cursive']
      },
      backgroundImage: {
        'paper': "url('./assets/paper.png')",
      },
    },
  },
  plugins: [],
}
