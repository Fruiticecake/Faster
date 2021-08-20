'use strict'

require('dotenv').config()

const { Server } = require('./modules/server')
const { Pug } = require('./modules/pug')
const { Sass } = require('./modules/sass')

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
}
