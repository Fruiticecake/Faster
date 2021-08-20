const browserSync = require('browser-sync')

exports.buildServer = () => browserSync.init({
  port: process.env.PORT,
  notify: false,
  server: {
    baseDir: process.env.PUBLIC_PATH,
    index: process.env.INDEX_FILE
  },
  reloadOnRestart: true
})

exports.reloadServer = (done) => {
  browserSync.reload()
  done()
}
