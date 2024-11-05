/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors: {
          'red-main': '#EF2A39',
          'gray': '#979797',
          'black-gray': '#808080',
          'gray-line': '#E1E1E1',
          'dark-brown': '#3c2f2f',
          'gray-chat': 'F3F4F6',
          'white-80': 'rgba(255, 255, 255, 0.8)'
        },
      }
    },
    plugins: [],
  }