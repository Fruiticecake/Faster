const fs = require('fs')
const fse = require('fs-extra')
const contents = require('./contents')

const mkdirTheme = () => {
  if (fs.existsSync('./wp/themes')) {
    try {
      fs.mkdirSync(`./wp/themes/${process.env.WP_THEME_NAME}`)
    } catch (err) {
      console.error(err)
    }
  } else {
    console.error('Can not find /wp/themes folder.')
    console.error('Try `yarn wp:up`.')
  }
}

const genWpBaseFiles = () => {
  const destPath = `./wp/themes/${process.env.WP_THEME_NAME}`

  if (fs.existsSync(destPath)) {
    try {
      fs.writeFileSync(`${destPath}/functions.php`, String(contents.functions))
      fs.writeFileSync(`${destPath}/index.php`, String(contents.index))
      fs.writeFileSync(`${destPath}/header.php`, String(contents.header))
      fs.writeFileSync(`${destPath}/footer.php`, String(contents.footer))
      fs.writeFileSync(`${destPath}/style.css`, String(contents.style))
    } catch (err) {
      console.error(err)
    }
  } else {
    console.error(`Can not find /wp/themes/${process.env.WP_THEME_NAME} folder.`)
  }
}

const cpAssetsToWp = () => {
  if (fs.existsSync('./out/assets')) {
    try {
      fse.copySync('./out/assets', `./wp/themes/${process.env.WP_THEME_NAME}/assets`)
    } catch (err) {
      console.error(err)
    }
  } else {
    console.error('Can not find /out/assets folder.')
    console.error('Try `yarn start` to generate /out/assets folder.')
  }
}

exports.mkdirTheme = mkdirTheme
exports.genWpBaseFiles = genWpBaseFiles
exports.cpAssetsToWp = cpAssetsToWp
