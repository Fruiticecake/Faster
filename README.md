# Faster

Faster is template which makes coding static website and WordPress website faster.

Use Pug, Sass, Webpack, Linter, Gulp, Docker and so on.

## Motivation

I often code static website and WordPress website and use a lot of packages to make it easy.

Built development environment and coding WordPress theme contains a lot of routine works.

But I don't like routine works to death.

So I decided to create template which resolves it.

## Table of contents

1. [Installation](#installation)

2. [Configuration](#configuration)

3. [Static website](#static-website)

4. [WordPress](#wordpress)

5. [Commands](#commands)

6. [Packages](#packages)

## Installation

Click `Use this template` green button and then create your repository.

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

Delete `/out` when run `yarn start`.

Delete `/wp/themes/your-theme/assets` when run `yarn wp:start`.

### ON_START_GENERATE: `boolean`

#### e.g. `true`

Assets are generated when run `yarn start` or `yarn wp:start`.

### WP_THEME_NAME: `string`

WordPress theme name.

### HTML_INDENT_SIZE: `number`

Indent size of HTML compiled.

### JS_BUNDLE_MODE: `development | production`

Webpack bundle mode.

Set `development` when develop.

Set `production` when deploy.

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

#### e.g. `true`

Embed WordPress tags when compile pug.

### onlyBody: boolean

#### e.g. `true`

Compile only body pug.

### lang: string

lang attribute of html tag.

### meta: object

```pug
const meta = {
  page-name: {
    title: "page title",
    description: "page description"
  },
}
```

#### Limits

```pug
/src/pug/*.pug
extends ./layouts/_index

block page
  - const page = "page-name"

block main
  //- #code...
```

`page-name` must be same as `- const page` in `/src/pug/*.pug`.

`page-name` is a variable which is embedded into body class and is used to include the above meta data.

## `/webpack.config.js`

```js
const entries = {
  common: `${srcPath}/common.js`
}
```

You need to set bundle JavaScript file paths in `entries` variable.

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

### Start local WordPress

```node
yarn wp:up
```

### Set up local WordPress

Visit [http://localhost:8081](http://localhost:8081).

### Generate base files

```zsh
yarn wp:gen
```

### Start WordPress assets generator

Set `isWp = true` in `/src/pug/config/_index.pug`.

```node
yarn wp:start
```

## Commands

### `yarn install`

Install all packages.

### `yarn start`

Local server for static website is started.

You should set `isWp=false` when develop static website.

Assets will be generated in /out/assets.

They are generated automatically when you change source files.

### `yarn wp:up`

`docker-compose up` is run internally.

Local WordPress, MariaDB and phpMyAdmin will be started.

It takes a minutes at first.

### `yarn wp:stop`

`docker-compose stop` is run internally.

Local WordPress, MariaDB and phpMyAdmin will be stopped.

### `yarn wp:start`

Assets will be generated in `/wp/themes/your-theme/assets`.

They are generated automatically when you change source files.

### `yarn wp:gen`

WordPress base files are generated.

You can't run if you have `/wp/themes/your-theme`

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

Run `yarn wp:gen` after delete `/wp/themes/your-theme`.

## Packages

・[Pug](https://github.com/pugjs/pug)

・[Puglint](https://github.com/pugjs/pug-lint)

・[Sass](https://github.com/sass/sass)

・[Stylelint](https://github.com/stylelint/stylelint)

・[Webpack](https://github.com/webpack/webpack)

・[ESLint](https://github.com/eslint/eslint)

・Our ESLint extends [JavaScript Standard Style](https://standardjs.com/).

・[Editorconfig](https://editorconfig.org/)

・[Gulp](https://github.com/gulpjs/gulp)

・[Docker compose](https://github.com/docker/compose)

・[WordPress](https://github.com/WordPress/WordPress)

・[phpMyAdmin](https://github.com/phpmyadmin/phpmyadmin)
