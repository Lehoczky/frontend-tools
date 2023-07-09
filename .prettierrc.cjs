/** @type {import('prettier').Config} */
module.exports = {
  printWidth: 80,
  semi: false,
  endOfLine: "auto",
  plugins: [require("prettier-plugin-tailwindcss")],
}
