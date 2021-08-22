const fs = require('fs')
const fse = require('fs-extra')
const contents = require('./contents')

exports.createMyThemeFolder = async () => {
  try {
    await fs.mkdirSync(`./wp/themes/${process.env.WP_THEME_NAME}`)
  } catch (err) {
    console.error(err)
  }
}

exports.addWpBaseFiles = () => {
  const destPath = `./wp/themes/${process.env.WP_THEME_NAME}`

  try {
    fs.writeFileSync(`${destPath}/functions.php`, String(contents.functions))
    fs.writeFileSync(`${destPath}/index.php`, String(contents.index))
    fs.writeFileSync(`${destPath}/header.php`, String(contents.header))
    fs.writeFileSync(`${destPath}/footer.php`, String(contents.footer))
    fs.writeFileSync(`${destPath}/style.css`, String(contents.style))
  } catch (err) {
    console.error(err)
  }
}

exports.cpAssetsToWp = () => {
  try {
    fse.copySync('./out/assets', `./wp/themes/${process.env.WP_THEME_NAME}/assets`)
  } catch (err) {
    console.error(err)
  }
}
