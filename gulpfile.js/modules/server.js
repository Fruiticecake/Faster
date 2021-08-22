'use strict'

const browserSync = require('browser-sync')

const upServer = () => {
  browserSync.init({
    port: Number(process.env.STATIC_PORT),
    notify: false,
    server: {
      baseDir: './out',
      index: 'index.html'
    }
  })
}

const reloadServer = (done) => {
  browserSync.reload()
  done()
}

exports.upServer = upServer
exports.reloadServer = reloadServer
