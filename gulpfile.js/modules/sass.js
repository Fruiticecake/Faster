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
const destPath = './out/assets/css'

const lintSass = () => {
  return src(`${srcPath}/**/*.scss`)
    .pipe(plumber())
    .pipe(stylelint({
      reporters: [{ formatter: 'verbose', console: true }],
      fix: true
    }))
}

const compileSassToCSS = () => {
  return src([`${srcPath}/**/*.scss`, `!${srcPath}/**/_*.scss`])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(destPath))
}

const watchSass = () => {
  watch(`${srcPath}/**/*.scss`, series(lintSass, compileSassToCSS, reloadServer))
}

exports.lintSass = lintSass
exports.compileSassToCSS = compileSassToCSS
exports.watchSass = watchSass
