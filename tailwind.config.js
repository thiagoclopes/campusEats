/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors: {
          'red-main': '#EF2A39',
          'gray': '#979797',
          'black-gray': '#808080',
          'black-gray-500': '#7D7D7D',
          'white-gray': '#F2F2F7',
          'gray-line': '#E1E1E1',
          'dark-brown': '#3c2f2f',
          'gray-chat': 'F3F4F6',
          'white-80': 'rgba(255, 255, 255, 0.8)',
          'white-85': 'rgba(245, 245, 245, 0.8)'
        },
      }
    },
    plugins: [],
  }