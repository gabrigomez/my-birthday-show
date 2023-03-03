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
        'default': "url('./assets/paper.png')",
        'happy': "url('./assets/paper_happy.png')",
        'psychadelic': "url('./assets/paper_psychadelic.png')",
        'black': "url('./assets/paper_black.png')",        
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
