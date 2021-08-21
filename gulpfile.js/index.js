'use strict'

require('dotenv').config()
const Server = require('./modules/server')
const Pug = require('./modules/pug')
const Sass = require('./modules/sass')
const Bundler = require('./modules/bundle')
const Image = require('./modules/images')

exports.default = async () => {
  /**
   * Boot
   */
  Server.start()
  Pug.compile()
  Pug.lint()
  Sass.compile()
  Image.minify()
  Bundler.bundle()

  /**
   * Watch
   */
  Pug.watch()
  Sass.watch()
  Image.watch()
  Bundler.watch()
}
