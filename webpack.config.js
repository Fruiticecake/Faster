require('dotenv').config()
const path = require('path')

const srcPath = `${process.env.SRC_PATH}/${process.env.JS_DIR}`
const destPath = `${process.env.PUBLIC_PATH}/assets/${process.env.JS_DIR}`

/**
 * Please set script file paths you need to bundle
 */
const entries = {
  common: `${srcPath}/common.js`
}

module.exports = {
  mode: process.env.JS_BUNDLE_MODE,
  entry: entries,
  output: {
    path: path.join(__dirname, destPath),
    filename: '[name].min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ]
            }
          }
        ]
      }
    ]
  },
  target: ['web', 'es5']
}
