'use strict'

const browserSync = require('browser-sync')

class Server {
  static start () {
    return browserSync.init({
      port: process.env.PORT,
      notify: false,
      server: {
        baseDir: process.env.PUBLIC_PATH,
        index: process.env.INDEX_FILE
      },
      reloadOnRestart: true
    })
  }

  static reload () {
    return (done) => {
      browserSync.reload()
      done()
    }
  }
}

exports.Server = Server
