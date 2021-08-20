require('dotenv').config()

const { Server } = require('./modules/server')
const { Pug } = require('./modules/pug')

exports.default = () => {
  Server.start()

  // Pug
  Pug.compile()
  Pug.lint()
  Pug.watch()
}
