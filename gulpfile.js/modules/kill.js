const del = require('del')

const killOut = () => del('./out')
const killTheme = () => del(`./wp/themes/${process.env.WP_THEME_NAME}`)
const killThemeAssets = () => del(`./wp/themes/${process.env.WP_THEME_NAME}/assets`)

exports.killOut = killOut
exports.killTheme = killTheme
exports.killThemeAssets = killThemeAssets
