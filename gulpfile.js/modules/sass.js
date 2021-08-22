'use strict'

const { src, dest, watch, series } = require('gulp')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const stylelint = require('gulp-stylelint')
const Server = require('./server')

const srcPath = './src/sass'
const destPath = './out/assets/css'

module.exports = class Sass {
  static compile () {
    return src([`${srcPath}/**/*.scss`, `!${srcPath}/**/_*.scss`])
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(sass({ outputStyle: 'compressed' }))
      .pipe(autoprefixer())
      .pipe(rename({ extname: '.min.css' }))
      .pipe(sourcemaps.write('.'))
      .pipe(dest(destPath))
  }

  static lint () {
    return src(`${srcPath}/**/*.scss`)
      .pipe(plumber())
      .pipe(stylelint({
        reporters: [{ formatter: 'verbose', console: true }],
        fix: true
      }))
  }

  static watch () {
    return watch(`${srcPath}/**/*.scss`, series(this.lint, this.compile, Server.reload()))
  }
}
