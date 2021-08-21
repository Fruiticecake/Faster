const fs = require('fs')
const fse = require('fs-extra')
const content = require('./content')

exports.createWpBaseDirectories = async () => {
  try {
    await fs.mkdirSync(process.env.WP_PATH)
    await fs.mkdirSync(`${process.env.WP_PATH}/themes`)
    await fs.mkdirSync(`${process.env.WP_PATH}/themes/${process.env.WP_THEME_NAME}`)
  } catch (err) {
    console.error(err)
  }
}

exports.addWpBaseFiles = () => {
  const destPath = `${process.env.WP_PATH}/themes/${process.env.WP_THEME_NAME}`

  try {
    fs.writeFileSync(`${destPath}/functions.php`, String(content.functions))
    fs.writeFileSync(`${destPath}/index.php`, String(content.index))
    fs.writeFileSync(`${destPath}/header.php`, String(content.header))
    fs.writeFileSync(`${destPath}/footer.php`, String(content.footer))
    fs.writeFileSync(`${destPath}/style.css`, String(content.style))
  } catch (err) {
    console.error(err)
  }
}

exports.cpAssetsToWp = () => {
  const srcPath = `${process.env.PUBLIC_PATH}/${process.env.ASSETS_DIR}`
  const destPath = `${process.env.WP_PATH}/themes/${process.env.WP_THEME_NAME}/${process.env.ASSETS_DIR}`

  try {
    fse.copySync(srcPath, destPath)
  } catch (err) {
    console.error(err)
  }
}
