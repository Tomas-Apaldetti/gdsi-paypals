/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  theme: {
    extend: {
      spacing:{
        '100': '25rem',
        '112': '28rem',
        '128': '32rem'
      }
    },
  },
  plugins: [],
}
