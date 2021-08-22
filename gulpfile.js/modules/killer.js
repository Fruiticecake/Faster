const del = require('del')

module.exports = class Killer {
  static killOut () {
    return del('./out')
  }
}
