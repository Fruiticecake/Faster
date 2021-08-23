'use strict'

const { src, dest, watch, series } = require('gulp')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const stylelint = require('gulp-stylelint')
const { reloadServer } = require('./server')

const srcPath = './src/sass'

const lintSass = () => {
  return src(`${srcPath}/**/*.scss`)
    .pipe(plumber())
    .pipe(stylelint({
      reporters: [{ formatter: 'verbose', console: true }],
      fix: true
    }))
}

const compileSass = (destPath) => {
  return src([`${srcPath}/**/*.scss`, `!${srcPath}/**/_*.scss`])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(destPath))
}

const compileSassToCSS = () => compileSass('./out/assets/css')

const compileSassToWp = () => compileSass(`./wp/themes/${process.env.WP_THEME_NAME}/assets/css`)

const watchSass = () => {
  watch(`${srcPath}/**/*.scss`, series(lintSass, compileSassToCSS, reloadServer))
}

const watchWpSass = () => {
  watch(`${srcPath}/**/*.scss`, series(lintSass, compileSassToWp))
}

exports.lintSass = lintSass
exports.compileSassToCSS = compileSassToCSS
exports.compileSassToWp = compileSassToWp
exports.watchSass = watchSass
exports.watchWpSass = watchWpSass
