'use strict'

const { src, dest, watch, series } = require('gulp')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const stylelint = require('gulp-stylelint')
const Server = require('./server')

module.exports = class Sass {
  static compile () {
    return src([`${process.env.SRC_PATH}/${process.env.SASS_DIR}/**/*.scss`, `!${process.env.SRC_PATH}/${process.env.SASS_DIR}/sass/**/_*.scss`])
      .pipe(plumber())
      .pipe(stylelint({
        reporters: [{ formatter: 'verbose', console: true }],
        fix: true
      }))
      .pipe(sourcemaps.init())
      .pipe(sass({ outputStyle: 'compressed' }))
      .pipe(autoprefixer())
      .pipe(rename({ extname: '.min.css' }))
      .pipe(sourcemaps.write('.'))
      .pipe(dest(`${process.env.PUBLIC_PATH}/${process.env.ASSETS_DIR}/css`))
  }

  static watch () {
    return watch(`${process.env.SRC_PATH}/${process.env.SASS_DIR}/**/*.scss`, series(this.compile, Server.reload()))
  }
}
