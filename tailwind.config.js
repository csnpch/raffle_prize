/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx}'
  ],
  theme: {
    screens: {
      'fullXl': '1920px'
    },
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
  important: true,
}