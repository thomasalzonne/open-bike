const colors = require('tailwindcss/colors')
// EMPTY = BUILD 4MB 

// ['./src/**/*.{html,ts}'] = BUILD 4MB

// {
//   enabled: true,
//   content: ['./src/**/*.{html,ts}']
// } 884 bytes???


// {
//   enabled: true,
//   content: [__dirname + '/src/**/*.{html,ts}']
// }, 6.10KB !!

module.exports = {
  purge: {
    enabled: true,
    content: [__dirname + '/src/**/*.{html,ts}']
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      color: {
        'tgray': colors.trueGray
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};