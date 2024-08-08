/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'main': '#EEEEEE',
      'a-main': '#DDDDDD',
      'second': '#000000',
      'a-second': '#111111',
      'third': '#8e0092',
      'a-third': '#8e0092',
      'd-main': '#111111',
      'd-a-main': '#25282C',
      'd-second': '#FFFFFF',
      'd-a-second': '#A9ABB3',
      'd-third': '#FF8C00',
      'd-a-third': '#FF8C00',
    },
    extend: {},
  },
  plugins: [],
  // darkMode: 'media',
  // darkMode: 'class',
}

