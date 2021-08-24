# Faster

Faster is template which makes coding static website and WordPress theme faster.

Use Pug, Sass, Webpack, Linter, Gulp and Docker.

Optimize images automatically.

## Motivation

I often code static website and WordPress theme.

I'm developing Faster to resolve the following problems.

・Built development environment takes a lot of time and dull.

・Making WordPress theme contains a lot of routine works like embedding WordPress tags.

## Prerequisites

Available in Node.js 14.

Use Visual Studio Code.

Recommend installing the following plugins in VSCode.

・pug

・Sass

・StandardJS

・ESLint

・EditorConfig for VS Code

・DotENV

・GULP

・Docker

## Table of contents

1. [Installation](#installation)

2. [Configuration](#configuration)

3. [Linter](#linter)

4. [Static website](#static-website)

5. [WordPress](#wordpress)

6. [Commands](#commands)

7. [Deploy](#deploy)

8. [Packages](#packages)

## Installation

Click `Use this template` button and then create your repository.

```zsh
yarn install
```

## Configuration

```zsh
yarn genenv
```

## `.env`

### STATIC_PORT: `number`

Local server port number.

### WP_PORT: `number`

Local WordPress port number.

### PHP_MY_ADMIN_PORT: `number`

Local phpMyAdmin port number.

### ON_START_CLEAN_UP: `boolean`

#### e.g. `true`

Delete `/out/assets` once at first when you run `yarn start`

Delete `/wp/themes/your-theme/assets` once at first when you run `yarn wp:start`

### ON_START_GENERATE: `boolean`

#### e.g. `true`

Generate `/out/assets` at first when you run `yarn start`

Generate `/wp/themes/your-theme/assets` at first when you run `yarn wp:start`

### WP_THEME_NAME: `string`

WordPress theme name.

### HTML_INDENT_SIZE: `number`

Indent size of HTML compiled.

### JS_BUNDLE_MODE: `development | production`

Webpack bundle mode.

Set `development` when you develop.

Set `production` when you deploy.

### JPG_QUALITY: `number`

Quality of jpeg images optimized.

### PNG_QUALITY_MIN: `number`

Min quality of png images optimized.

### PNG_QUALITY_MAX: `number`

Max quality of png images optimized.

### GIF_QUALITY: `number`

Quality of gif images optimized.

## `/src/pug/config/_index.pug`

### isWp: boolean

Set `false` when you develop static website.

Set `true` when you develop WordPress theme.

#### e.g. `true`

Embed WordPress tags into HTML compiled.

### onlyBody: boolean

Set `false` when you develop static website.

Set `true` when you develop WordPress theme.

#### e.g. `true`

Compile only body pug.

You need to code `header.php` and `footer.php`.

### lang: string

lang attribute of html tag.

### meta: object

```pug
/src/pug/config/_index.pug
const meta = {
  ...
  page-name: {
    title: "page title",
    description: "page description"
  },
}
```

```pug
/src/pug/*.pug excluding index.pug
extends ./layouts/_index

block page
  - const page = "page-name"

block main
  //- #code...
```

`page-name` must be same as `page` variable in `/src/pug/*.pug` excluding `index.pug`.

`page-name` is embedded into body class and used to include meta variable from `/src/pug/config/_index.pug`.

## `/webpack.config.js`

```js
const entries = {
  common: `${srcPath}/common.js`
}
```

## Limits

```pug
/src/pug/config/_index.pug
const meta = {
  home: {
    title: "home title",
    description: "home description"
  },
}
```

```pug
/src/pug/index.pug
extends ./layouts/_index

block page
  - const page = "home"

block main
  //- #code...
```

You must set `home` in `/src/pug/config/_index.pug` and `/src/pug/index.pug`.

You need to set bundle JavaScript file paths in `entries`.

## Linter

I show linter setting file paths.

### Puglint

`/.pug-lintrc`

### Stylelint

`/.stylelintrc`

### ESLint

`/.eslintrc`

### Editorconfig

`/.editorconfig`

## Docker

`/docker-compose.yml`.

## Static website

```zsh
yarn start
```

Visit [http://localhost:8080](http://localhost:8080).

## WordPress

You don't need to run the following command if you don't use WordPress.

### Set theme name

```node
.env
WP_THEME_NAME=theme-name
```

### Build local WordPress, local MariaDB and local phpMyAdmin

```node
yarn wp:up
```

### Set up local WordPress

Visit [http://localhost:8081](http://localhost:8081).

phpMyAdmin is [here](http://localhost:8082).

### Generate base files

```zsh
yarn wp:gen
```

### Start WordPress assets generator

Set `isWp = true` in `/src/pug/config/_index.pug`.

```node
yarn wp:start
```

### Run `yarn wp` *from the second time

You can run the above command now.

Run `yarn wp:up` in the background.

And then run `yarn wp:start`.

You should run `yarn wp:stop` when you stop Docker.

## Commands

### `yarn install`

Install all packages.

### `yarn start`

Local server for static website is started.

You should set `isWp=false` when you develop static website.

The following assets will be generated.

They are generated automatically when you change source files.

・`/out/*.html`

・`/out/assets/css/*.css`

・`/out/assets/js/*.js`

・`/out/assets/images/*.{jpg,jpeg,png,gif,svg}`

### `yarn wp`

Run `yarn wp:up` in the background.

And then run `yarn wp:start`.

*You can't run if you haven't run `yarn wp:up` and `yarn wp:gen`.

### `yarn wp:up`

`docker-compose up` is run internally.

Local WordPress, MariaDB and phpMyAdmin will be started.

It takes a minutes at first.

### `yarn wp:stop`

`docker-compose stop` is run internally.

Local WordPress, MariaDB and phpMyAdmin will be stopped.

### `yarn wp:start`

The following assets will be generated.

They are generated automatically when you change source files.

・`/wp/themes/your-theme/*.php`

・`/wp/themes/your-theme/assets/css/*.css`

・`/wp/themes/your-theme/assets/js/*.js`

・`/wp/themes/your-theme/assets/images/*.{jpg,jpeg,png,gif,svg}`

### `yarn wp:gen`

WordPress base files are generated.

You can't run the above command if you have `/wp/themes/your-theme`

You should run `yarn wp:regen` if you regenerate base files.

The following files will be generated in `/wp/themes/your-theme`.

・functions.php

・index.php

・header.php

・footer.php

・front-page.php

・page-*.php

・style.css

・assets/**/*

### `yarn wp:regen`

Run `yarn wp:gen` again.

## Deploy

### Static website

Deploy `/out` to production path.

### WordPress

Deploy `/wp/themes/your-theme` to production themes folder.

I recommend you use [All-in-One WP Migration](https://wordpress.org/plugins/all-in-one-wp-migration/) to deploy.

## Packages

・[Pug](https://github.com/pugjs/pug)

・[Puglint](https://github.com/pugjs/pug-lint)

・[Sass](https://github.com/sass/sass)

・[Stylelint](https://github.com/stylelint/stylelint)

・[Webpack](https://github.com/webpack/webpack)

・[ESLint](https://github.com/eslint/eslint)

・Our ESLint extends [JavaScript Standard Style](https://standardjs.com/).

・[Editorconfig](https://editorconfig.org/)

・[Imagemin](https://github.com/imagemin/imagemin)

・[Gulp](https://github.com/gulpjs/gulp)

・[Docker compose](https://github.com/docker/compose)

・[WordPress](https://github.com/WordPress/WordPress)

・[phpMyAdmin](https://github.com/phpmyadmin/phpmyadmin)
