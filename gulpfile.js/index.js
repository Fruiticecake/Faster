'use strict'

require('dotenv').config()
const prompts = require('prompts')
const { upServer } = require('./modules/server')
const { lintPug, compilePugToHTML, watchPug, compilePugToWp, watchWpPug } = require('./modules/pug')
const { lintSass, compileSassToCSS, watchSass, compileSassToWp, watchWpSass } = require('./modules/sass')
const { bundleJS, watchJS, bundleWpJS, watchWpJS } = require('./modules/bundle')
const { minifyImages, watchImages, minifyWpImages, watchWpImages } = require('./modules/images')
const { killOut, killTheme } = require('./modules/kill')
const { mkdirMyThemeFolder, genWpBaseFiles, cpAssetsToWp } = require('./modules/fs')

/**
 * yarn start
 *
 * 1. generate assets in /out
 * 2. up local server
 * 3. watch source files
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
 *
 * 1. delete /out
 * 2. generate assets in /out
 * 3. up local server
 * 4. watch source files
 */
const restart = async () => {
  await killOut()
  await start()
}

/**
 * yarn wp:start
 *
 * 1. generate assets in /wp/themes/theme
 * 2. watch source files
 */
const startWp = () => {
  if (process.env.ON_START_COMPILE === 'true') {
    lintPug()
    compilePugToWp()
    lintSass()
    compileSassToWp()
    bundleWpJS()
    minifyWpImages()
  }

  watchWpPug()
  watchWpSass()
  watchWpJS()
  watchWpImages()
}

/**
 * yarn wp:gen
 *
 * 1. make theme folder
 * 2. generate theme base files
 * 3. copy assets from /out
 */
const genWp = async () => {
  await mkdirMyThemeFolder()
  await genWpBaseFiles()
  await cpAssetsToWp()
}

/**
 * yarn wp:regen
 *
 * 1. delete /wp/themes/theme
 * 2. make theme folder
 * 3. generate theme base files
 * 4. copy assets from /out
 */
const regenWp = async () => {
  const res = await prompts({
    type: 'text',
    name: 'isRun',
    message: 'Your theme will be deleted and regenerated if you run this command. Run command? (y/N): '
  })

  if (res.isRun === 'y') {
    await killTheme()
    await genWp()
  } else {
    console.log('Canceled command.')
  }
}

exports.default = start
exports.restart = restart
exports.startWp = startWp
exports.genWp = genWp
exports.regenWp = regenWp
