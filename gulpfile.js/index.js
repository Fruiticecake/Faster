'use strict'

require('dotenv').config()
const prompts = require('prompts')
const { upServer } = require('./modules/server')
const { lintPug, compilePugToHTML, watchPug, compilePugToWp, watchWpPug } = require('./modules/pug')
const { lintSass, compileSassToCSS, watchSass } = require('./modules/sass')
const { bundleJS, watchJS } = require('./modules/bundle')
const { minifyImages, watchImages } = require('./modules/images')
const { killOut, killTheme } = require('./modules/kill')
const { mkdirMyThemeFolder, genWpBaseFiles, cpAssetsToWp } = require('./modules/fs')

/**
 * yarn start
 */
const start = () => {
  if (process.env.ON_START_COMPILE === 'true') {
    lintPug()
    compilePugToHTML()
    lintSass()
    compileSassToCSS()
    bundleJS()
    minifyImages()
  }

  upServer()
  watchPug()
  watchSass()
  watchJS()
  watchImages()
}

/**
 * yarn restart
 */
const restart = async () => {
  await killOut()
  await start()
}

/**
 * yarn wp:build
 */
const buildWp = async () => {
  await mkdirMyThemeFolder()
  await genWpBaseFiles()
  await cpAssetsToWp()
}

/**
 * yarn wp:rebuild
 */
const rebuildWp = async () => {
  const res = await prompts({
    type: 'text',
    name: 'isRun',
    message: 'Your theme will be deleted and regenerated if you run this command. Run command? (y/N): '
  })

  if (res.isRun === 'y') {
    await killTheme()
    await buildWp()
  } else {
    console.log('Canceled command.')
  }
}

/**
 * yarn wp:watch
 */
const watchWp = () => {
  compilePugToWp()
  watchWpPug()
}

exports.default = () => start
exports.restart = restart
exports.buildWp = buildWp
exports.rebuildWp = rebuildWp
exports.watchWp = watchWp
