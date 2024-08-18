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
      'third': '#BD66D5',
      'about-me-background': '#DFC5FE',
      
      'd-main': '#111111',
      'd-a-main': '#25282C',
      'd-second': '#A9ABB3',
      'd-third': '#7EFFD8',
      'd-about-me-background': '#A5FFE4',
      
    },
    extend: {},
  },
  plugins: [],
  // darkMode: 'media',
  // darkMode: 'class',
}

