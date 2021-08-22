require('dotenv').config()
const path = require('path')

const srcPath = './src/js'
const destPath = './out/assets/js'

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
