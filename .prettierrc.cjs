/** @type {import('prettier').Config} */
module.exports = {
  printWidth: 80,
  endOfLine: "auto",
  semi: false,
  plugins: [require("prettier-plugin-tailwindcss")],
}
