const del = require('del')

module.exports = class Killer {
  static killOutput () {
    return del(process.env.PUBLIC_PATH)
  }

  static killAssets () {
    return del(`${process.env.PUBLIC_PATH}/${process.env.ASSETS_DIR}`)
  }

  static killImages () {
    return del(`${process.env.PUBLIC_PATH}/${process.env.ASSETS_DIR}/${process.env.IMG_DIR}`)
  }
}
