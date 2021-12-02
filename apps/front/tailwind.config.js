const colors = require('tailwindcss/colors')

module.exports = {
    prefix: '',
    purge: {
      content: [
        './src/**/*.{html,ts}',
      ]
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