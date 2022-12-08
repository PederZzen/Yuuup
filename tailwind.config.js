/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html}",
    "./src/js/*.js"
  ],
  theme: {
    colors: {
      "main": "#373737",
      "secondary": "#F5F5F5",
      "accent": "#FF5C00",
      "gray": "#848484",
      "dark": "#2B2B2B"
    },
    fontFamily: {
      "montserrat": ['Montserrat', 'sans-serif'],
      'open-sans': ['Open Sans', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}
