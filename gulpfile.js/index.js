'use strict'

require('dotenv').config()
const prompts = require('prompts')
const { upServer } = require('./modules/server')
const { lintPug, compilePugToHTML, watchPug, compilePugToWp, watchWpPug } = require('./modules/pug')
const { lintSass, compileSassToCSS, watchSass, compileSassToWp, watchWpSass } = require('./modules/sass')
const { bundleJS, watchJS, bundleWpJS, watchWpJS } = require('./modules/bundle')
const { minifyImages, watchImages, minifyWpImages, watchWpImages } = require('./modules/images')
const { killOut, killTheme, killThemeAssets } = require('./modules/kill')
const { mkdirTheme, genWpBaseFiles, cpAssetsToWp } = require('./modules/fs')

/**
 * yarn start
 *
 * 1. delete /out
 * 2. generate assets in /out
 * 3. up local server
 * 4. watch source files
 */
const start = async () => {
  if (process.env.ON_START_GENERATE === 'true') {
    process.env.ON_START_CLEAN_UP === 'true' && await killOut()
    await lintPug()
    await compilePugToHTML()
    await lintSass()
    await compileSassToCSS()
    await bundleJS()
    await minifyImages()
  }

  await upServer()
  await watchPug()
  await watchSass()
  await watchJS()
  await watchImages()
}

/**
 * yarn wp:start
 *
 * 1. delete /wp/themes/theme/assets
 * 2. generate assets in /wp/themes/theme
 * 3. watch source files
 */
const startWp = async () => {
  if (process.env.ON_START_GENERATE === 'true') {
    process.env.ON_START_CLEAN_UP === 'true' && await killThemeAssets()
    await lintPug()
    await compilePugToWp()
    await lintSass()
    await compileSassToWp()
    await bundleWpJS()
    await minifyWpImages()
  }

  await watchWpPug()
  await watchWpSass()
  await watchWpJS()
  await watchWpImages()
}

/**
 * yarn wp:gen
 *
 * 1. make theme folder
 * 2. generate theme base files
 * 3. copy assets from /out
 */
const genWp = async () => {
  await mkdirTheme()
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
exports.startWp = startWp
exports.genWp = genWp
exports.regenWp = regenWp
