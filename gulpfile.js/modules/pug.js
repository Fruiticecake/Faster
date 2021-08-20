const { src, dest, watch, series } = require('gulp')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const pug = require('gulp-pug')
const rename = require('gulp-rename')
const beautify = require('gulp-beautify')
const pugLinter = require('gulp-pug-linter')
const { Server } = require('./server')

class Pug {
  static compile () {
    return src([`${process.env.SRC_PATH}/${process.env.PUG_DIR}/**/*.pug`, `!${process.env.SRC_PATH}/${process.env.PUG_DIR}/**/_*.pug`])
      .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
      .pipe(pug({
        pretty: true
      }))
      .pipe(rename({ extname: '.html' }))
      .pipe(beautify.html({
        indent_size: process.env.HTML_INDENT_SIZE,
        max_preserve_newlines: false,
        wrap_attributes: false,
        unformatted: ['b', 'em'],
        end_with_newline: true
      }))
      .pipe(dest(process.env.PUBLIC_PATH))
      .pipe(notify('pug'))
  }

  static lint () {
    return src([`${process.env.SRC_PATH}/${process.env.PUG_DIR}/**/*.pug`, `!${process.env.SRC_PATH}/${process.env.PUG_DIR}/**/_*.pug`])
      .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
      .pipe(pugLinter({ reporter: 'default' }))
  }

  static watch () {
    return watch(`${process.env.SRC_PATH}/${process.env.PUG_DIR}/**/*.pug`, series(this.compile, this.lint, Server.reload()))
  }
}

exports.Pug = Pug
