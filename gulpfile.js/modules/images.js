'use strict'

const { src, dest, watch, series } = require('gulp')
const plumber = require('gulp-plumber')
const changed = require('gulp-changed')
const imagemin = require('gulp-imagemin')
const mozjpeg = require('imagemin-mozjpeg')
const pngquant = require('imagemin-pngquant')
const imageminGiflossy = require('imagemin-giflossy')
const imageminSvgo = require('imagemin-svgo')
const Server = require('./server')

module.exports = class Image {
  static minify () {
    return src(`${process.env.SRC_PATH}/${process.env.IMG_DIR}/**/*.{jpg,jpeg,png,gif,svg}`)
      .pipe(plumber())
      .pipe(changed(`${process.env.PUBLIC_PATH}/${process.env.ASSETS_DIR}/${process.env.IMG_DIR}`))
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
      .pipe(dest(`${process.env.PUBLIC_PATH}/${process.env.ASSETS_DIR}/${process.env.IMG_DIR}`))
  }

  static watch () {
    return watch(`${process.env.SRC_PATH}/${process.env.IMG_DIR}/**/*.{jpg,jpeg,png,gif,svg}`, series(this.minify, Server.reload()))
  }
}
