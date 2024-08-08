/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'main': '#EEEEEE',
      'a-main': '#DDDDDD',
      'second': '#4F4F4F',      
      'third': '#8E0092',

      
      'd-main': '#111111',
      'd-a-main': '#25282C',
      'd-second': '#A9ABB3',
      'd-third': '#FF8C00',

    },
    extend: {},
  },
  plugins: [],
  // darkMode: 'media',
  // darkMode: 'class',
}

