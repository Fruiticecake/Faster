'use strict'

const { src, dest, watch, series } = require('gulp')
const plumber = require('gulp-plumber')
const pug = require('gulp-pug')
const rename = require('gulp-rename')
const beautify = require('gulp-beautify')
const pugLinter = require('gulp-pug-linter')
const Server = require('./server')

const srcPath = './src/pug'
const destPath = './out'
const wpDestPath = `./wp/themes/${process.env.WP_THEME_NAME}`

const options = {
  indent_size: Number(process.env.HTML_INDENT_SIZE),
  max_preserve_newlines: false,
  wrap_attributes: false,
  unformatted: ['b', 'em'],
  end_with_newline: true
}

module.exports = class Pug {
  static compile () {
    return src([`${srcPath}/**/*.pug`, `!${srcPath}/**/_*.pug`])
      .pipe(plumber())
      .pipe(pugLinter({ reporter: 'default' }))
      .pipe(pug({
        pretty: true
      }))
      .pipe(rename({ extname: '.html' }))
      .pipe(beautify.html(options))
      .pipe(dest(destPath))
  }

  static compileToPHP () {
    return src([`${srcPath}/**/*.pug`, `!${srcPath}/**/_*.pug`])
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
      .pipe(dest(wpDestPath))
  }

  static lint () {
    return src(`${srcPath}/**/*.pug`)
      .pipe(plumber())
      .pipe(pugLinter({ reporter: 'default' }))
  }

  static watch () {
    return watch(`${srcPath}/**/*.pug`, series(this.lint, this.compile, Server.reload()))
  }
}
