'use strict'

require('dotenv').config()

const { Server } = require('./modules/server')
const { Pug } = require('./modules/pug')
const { Sass } = require('./modules/sass')
const { Bundler } = require('./modules/bundle')

exports.default = () => {
  // Server
  Server.start()

  // Pug
  Pug.compile()
  Pug.lint()
  Pug.watch()

  // Sass
  Sass.compile()
  Sass.watch()

  // Bundle
  Bundler.bundle()
  Bundler.watch()
}
