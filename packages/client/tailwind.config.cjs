/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  important: true,
  theme: {
    extend: {
      fontSize: {
        'base': '15px'
      },
      fontFamily: {
        'app': ["Nunito","Montserrat", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"]
      }
    },
  },
  plugins: [],
}
