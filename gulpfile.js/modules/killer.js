const del = require('del')

module.exports = class Killer {
  static execute () {
    return del(process.env.PUBLIC_PATH)
  }
}
