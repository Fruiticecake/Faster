require('dotenv').config()

const { buildServer } = require('./modules/server')

exports.default = () => {
  buildServer()
}
