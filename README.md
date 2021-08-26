# Faster

Faster makes coding static website and WordPress theme faster.

Use Pug, Sass, Webpack, Linter, Gulp and Docker.

Optimize images automatically.

## Motivation

I often code static website and WordPress theme.

I'm developing Faster to resolve the following problems.

・Built development environment takes a lot of time and dull.

・Making WordPress theme contains a lot of routine works like embedding WordPress tags.

## Table of contents

1. [Prerequisites](#prerequisites)

2. [Installation](#installation)

3. [Configuration](#configuration)

4. [Limits](#limits)

5. [Linter](#linter)

6. [Static website](#static-website)

7. [WordPress](#wordpress)

8. [Commands](#commands)

9. [Deploy](#deploy)

10. [Packages](#packages)

## Prerequisites

### My environment

・npm 6.14.13

・Node.js 14.17.3

・Docker 20.10.7

・Visual Studio Code 1.59

### Visual Studio Code Plugins

・pug

・Sass

・ESLint

・StandardJS

・EditorConfig for VS Code

・DotENV

・GULP

・Docker

### `settings.json`

```json
{

  // ...

  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "standard.autoFixOnSave": true,
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,

  // ...

}
```

## Installation

```zsh
yarn install
```

```zsh
yarn genenv
```

## Configuration

## `.env`

### STATIC_PORT: `number`

Local server port number

### WP_PORT: `number`

Local WordPress port number

### PHP_MY_ADMIN_PORT: `number`

Local phpMyAdmin port number

### ON_START_CLEAN_UP: `boolean`

#### e.g. `true`

Delete `/out/assets` once at first when you run `yarn start`.

Delete `/wp/themes/your-theme/assets` once at first when you run `yarn wp:start`.

### ON_START_GENERATE: `boolean`

#### e.g. `true`

Generate `/out/assets` at first when you run `yarn start`.

Generate `/wp/themes/your-theme/assets` at first when you run `yarn wp:start`.

### WP_THEME_NAME: `string`

WordPress theme name

### HTML_INDENT_SIZE: `number`

Indent size of HTML compiled

### JS_BUNDLE_MODE: `development | production`

Webpack bundle mode

Set `development` when you develop.

Set `production` when you deploy.

### JPG_QUALITY: `number`

Quality of jpeg images optimized

### PNG_QUALITY_MIN: `number`

Min quality of png images optimized

### PNG_QUALITY_MAX: `number`

Max quality of png images optimized

### GIF_QUALITY: `number`

Quality of gif images optimized

## `/src/pug/config/_index.pug`

### isWp: boolean

Set `false` when you develop static website.

Set `true` when you develop WordPress theme.

#### e.g. `true`

WordPress tags are embedded into HTML compiled.

### onlyBody: boolean

Set `false` when you develop static website.

Set `true` when you develop WordPress theme.

#### e.g. `true`

Only body pug is compiled.

You need to code `header.php` and `footer.php`.

### lang: string

lang attribute of html tag

### meta: object

```pug
/src/pug/config/_index.pug
const meta = {
  //- ...
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

You need to set bundle JavaScript file paths in `entries`.

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

Modify `/docker-compose.yml`.

## Static website

```zsh
yarn start
```

Local server and assets generator are started.

For example, `/out/*.html` is generated when you change `/src/pug/*.pug`.

## WordPress

You don't need to run the following command if you don't use WordPress.

### 1. Set theme name

```node
.env
WP_THEME_NAME=your-theme
```

### 2. Set `isWp=true`

```pug
/src/pug/config/_index.pug
const isWp = true
```

### 3. Build local WordPress and phpMyAdmin

```node
yarn wp:gen
```

`docker-compose up -d` is run internally and then theme basic files are generated.

#### WordPress

[http://localhost:8081](http://localhost:8081)

Set your login information.

#### phpMyAdmin

[http://localhost:8082](http://localhost:8082)

##### Username

`root`

##### Password

`secret`

### 4. Activate theme

Activate your theme in [http://localhost:8081/wp-admin/themes.php](http://localhost:8081/wp-admin/themes.php).

### 5. Start assets generator

```node
yarn wp:start
```

### 6. Stop local WordPress and phpMyAdmin

```node
yarn wp:stop
```

## Commands

### `yarn install`

Install all packages.

### `yarn start`

Local server for static website is started.

You should set `isWp=false` when you develop static website.

The following assets are generated automatically when you change source files.

・`/out/*.html`

・`/out/assets/css/*.css`

・`/out/assets/js/*.js`

・`/out/assets/images/*.{jpg,jpeg,png,gif,svg}`

Assets are generated at first if you set `ON_START_GENERATE=true`.

### `yarn wp:gen`

Local WordPress and basic theme files is generated and then start WordPress assets generator.

You need to run `yarn wp:regen` if you run `yarn wp:gen` again because of specifications.

The following files will be generated in `/wp/themes/your-theme`.

・`functions.php`

・`index.php`

・`header.php`

・`footer.php`

・`front-page.php`

・`page-*.php`

・`style.css`

・`assets`

### `yarn wp:regen`

Run `yarn wp:gen` again.

### `yarn wp:stop`

`docker-compose stop` is run internally.

Local WordPress, MariaDB and phpMyAdmin will be stopped.

### `yarn wp:start`

The following assets are generated automatically when you change source files.

・`/wp/themes/your-theme/*.php`

・`/wp/themes/your-theme/assets/css/*.css`

・`/wp/themes/your-theme/assets/js/*.js`

・`/wp/themes/your-theme/assets/images/*.{jpg,jpeg,png,gif,svg}`

Assets are generated at first if you set `ON_START_GENERATE=true`.

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
