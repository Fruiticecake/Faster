'use strict'

const { src, dest, watch, series } = require('gulp')
const plumber = require('gulp-plumber')
const pug = require('gulp-pug')
const rename = require('gulp-rename')
const beautify = require('gulp-beautify')
const pugLinter = require('gulp-pug-linter')
const Server = require('./server')

const options = {
  indent_size: Number(process.env.HTML_INDENT_SIZE),
  max_preserve_newlines: false,
  wrap_attributes: false,
  unformatted: ['b', 'em'],
  end_with_newline: true
}

module.exports = class Pug {
  static compile () {
    return src([`${process.env.SRC_PATH}/${process.env.PUG_DIR}/**/*.pug`, `!${process.env.SRC_PATH}/${process.env.PUG_DIR}/**/_*.pug`])
      .pipe(plumber())
      .pipe(pug({
        pretty: true
      }))
      .pipe(rename({ extname: '.html' }))
      .pipe(beautify.html(options))
      .pipe(dest(process.env.PUBLIC_PATH))
  }

  static compileToPHP () {
    return src([`${process.env.SRC_PATH}/${process.env.PUG_DIR}/**/*.pug`, `!${process.env.SRC_PATH}/${process.env.PUG_DIR}/**/_*.pug`])
      .pipe(plumber())
      .pipe(pug({
        pretty: true
      }))
      .pipe(rename((path) => {
        if (path.basename === 'index') {
          path.basename = 'front-page'
        } else {
          path.basename = `page-${path.basename}`
        }

        path.extname = '.php'
      }))
      .pipe(beautify.html(options))
      .pipe(dest(`${process.env.WP_PATH}/themes/${process.env.WP_THEME_NAME}`))
  }

  static lint () {
    return src([`${process.env.SRC_PATH}/${process.env.PUG_DIR}/**/*.pug`, `!${process.env.SRC_PATH}/${process.env.PUG_DIR}/**/_*.pug`])
      .pipe(plumber())
      .pipe(pugLinter({ reporter: 'default' }))
  }

  static watch () {
    return watch(`${process.env.SRC_PATH}/${process.env.PUG_DIR}/**/*.pug`, series(this.compile, this.lint, Server.reload()))
  }
}
