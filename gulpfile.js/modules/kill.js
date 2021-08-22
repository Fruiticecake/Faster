const del = require('del')

const killOut = () => del('./out')
const killTheme = () => del(`./wp/themes/${process.env.WP_THEME_NAME}`)

exports.killOut = killOut
exports.killTheme = killTheme
