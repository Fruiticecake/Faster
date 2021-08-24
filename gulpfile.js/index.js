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
 * 1. Delete `/out` if you set `ON_START_CLEAN_UP=true` in `.env`
 * 2. Generate `/out`
 * 3. Start local server
 * 4. Watch changes of `/src/pug`, `/src/sass`, `/src/js` and `/src/images`
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
 * 1. Delete `/wp/themes/your-theme/assets` if you set `ON_START_CLEAN_UP=true` in `.env`
 * 2. Generate `/wp/themes/your-theme/assets`
 * 3. Watch changes of `/src/pug`, `/src/sass`, `/src/js` and `/src/images`
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
 * 1. Make `/wp/themes/your-theme` folder
 * 2. Generate base files in `/wp/themes/your-theme`
 * 3. Copy `/out/assets` to `/wp/themes/your-theme/assets`
 */
const genWp = async () => {
  await mkdirTheme()
  await genWpBaseFiles()
  await cpAssetsToWp()
}

/**
 * yarn wp:regen
 *
 * 1. Delete `/wp/themes/your-theme`
 * 2. Run `yarn wp:gen`
 */
const regenWp = async () => {
  console.log('Your theme will be deleted and regenerated if you run.')

  const res = await prompts({
    type: 'text',
    name: 'isRun',
    message: 'Do you run seriously? (y/N): '
  })

  if (res.isRun === 'y') {
    await killTheme()
    await genWp()
  } else {
    console.log('Canceled.')
  }
}

exports.default = start
exports.startWp = startWp
exports.genWp = genWp
exports.regenWp = regenWp
