/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/theme");

module.exports = {
  content: [
    "./src/**/*.{html,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/button.js",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui()],
};
