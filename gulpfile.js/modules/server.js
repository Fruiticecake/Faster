'use strict'

const browserSync = require('browser-sync')

module.exports = class Server {
  static start () {
    return browserSync.init({
      port: Number(process.env.PORT),
      notify: false,
      server: {
        baseDir: process.env.PUBLIC_PATH,
        index: process.env.INDEX_FILE
      }
    })
  }

  static reload () {
    return (done) => {
      browserSync.reload()
      done()
    }
  }
}
