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
        'paper-happy': "url('./assets/paper_happy.png')",
        'paper-psychadelic': "url('./assets/paper_psychadelic.png')",
        'paper-black': "url('./assets/paper_black.png')",        
      },
      screens: {
        'xs': '550px',
      },
      fontSize: {
        'xxs': '0.7rem',
        'md': '0.9rem',
      }
    },
  },
  plugins: [],
}
