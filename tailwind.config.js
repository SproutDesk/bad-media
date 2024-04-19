// See default config https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        bm_black: '#191919',
        bm_grey: '#202221',
        bm_white: '#ebe7de',
        bm_blue: '#518f82',
        bm_yellow: '#f4b45c',
        bm_pink: '#e383a9',
        bm_green: '#518f82',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line global-require
    require('tailwindcss-debug-screens'),
  ],
  content: [
    'src/**/*.html',
  ],
};
