/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    colors: {
      'main': '#FFFFFF',
      'a-main': '#A9ABB3',
      'second': '#000000',
      'a-second': '#111111',
      'third': '#00F7FF',
      'a-third': '#4AA5A0',
      'd-main': '#111111',
      'd-a-main': '#25282C',
      'd-second': '#FFFFFF',
      'd-a-second': '#A9ABB3',
      'd-third': 'darkorange',
      'd-a-third': 'darkorange',
    },
    extend: {},
  },
  plugins: [],
  // darkMode: 'media'
  darkMode: 'class'
}

