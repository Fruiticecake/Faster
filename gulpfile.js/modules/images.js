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

const minify = (destPath) => {
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

const minifyImages = () => minify('./out/assets/images')

const minifyWpImages = () => minify(`./wp/themes/${process.env.WP_THEME_NAME}/assets/images`)

const watchImages = () => {
  watch(`${srcPath}/**/*.{jpg,jpeg,png,gif,svg}`, series(minifyImages, reloadServer))
}

const watchWpImages = () => {
  watch(`${srcPath}/**/*.{jpg,jpeg,png,gif,svg}`, minifyWpImages)
}

exports.minifyImages = minifyImages
exports.minifyWpImages = minifyWpImages
exports.watchImages = watchImages
exports.watchWpImages = watchWpImages
