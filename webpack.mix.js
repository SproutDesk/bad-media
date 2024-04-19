/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const mix = require('laravel-mix');
require('mix-html-builder');
require('@chiiya/laravel-mix-imagemin');

const SOURCE_PATH = 'src';
const BUILD_PATH = 'build';

mix.setPublicPath(BUILD_PATH);
mix.setResourceRoot(SOURCE_PATH);

mix.js(`${SOURCE_PATH}/app.js`, BUILD_PATH);

mix.postCss(`${SOURCE_PATH}/app.css`, BUILD_PATH, [require('tailwindcss')('tailwind.config.js')]);

mix.html({
  output: '.', // output relative to BUILD_PATH set in setPublicPath()
  htmlRoot: `${SOURCE_PATH}/*.html`,
  partialRoot: `${SOURCE_PATH}/partials`,
  layoutRoot: `${SOURCE_PATH}/layouts`,
  minify: !mix.inProduction() ? false : {
    removeComments: true,
    removeRedundantAttributes: false,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    collapseWhitespace: true,
    removeOptionalTags: true,
  },
});

mix.imagemin({
  patterns: [
    { from: `${SOURCE_PATH}/img`, to: 'img' },
    { from: 'public', to: '.' },
  ],
});

mix.browserSync({
  server: BUILD_PATH,
  files: `${BUILD_PATH}/`,
  proxy: false,
  open: false,
});
