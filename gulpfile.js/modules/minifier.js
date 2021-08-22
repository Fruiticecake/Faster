'use strict'

const { src, dest, watch, series } = require('gulp')
const plumber = require('gulp-plumber')
const changed = require('gulp-changed')
const imagemin = require('gulp-imagemin')
const mozjpeg = require('imagemin-mozjpeg')
const pngquant = require('imagemin-pngquant')
const imageminGiflossy = require('imagemin-giflossy')
const imageminSvgo = require('imagemin-svgo')
const { reloadServer } = require('./server')

const srcPath = './src/images'
const destPath = './out/assets/images'

module.exports = class Minifier {
  static execute () {
    return src(`${srcPath}/**/*.{jpg,jpeg,png,gif,svg}`)
      .pipe(plumber())
      .pipe(changed(destPath))
      .pipe(imagemin([
        mozjpeg({
          quality: Number(process.env.JPG_QUALITY)
        }),
        pngquant({
          quality: [Number(process.env.PNG_QUALITY_MIN), Number(process.env.PNG_QUALITY_MAX)]
        }),
        imageminGiflossy({
          lossy: Number(process.env.GIF_QUALITY)
        }),
        imageminSvgo()
      ]))
      .pipe(dest(destPath))
  }

  static watch () {
    return watch(`${srcPath}/**/*.{jpg,jpeg,png,gif,svg}`, series(this.execute, reloadServer))
  }
}
