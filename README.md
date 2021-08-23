# Faster

Faster is template which makes coding static website and WordPress faster.

## Motivation

I often code static website and WordPress website and use a lot of great packages to make it easy.

Built development environment and coding WordPress theme contains a lot of routine works.

But I don't like routine works to death.

So I decided to create template which resolves the above problem.

## Features

・Pug

・Puglint

・Sass

・Stylelint

・Webpack

・ESLint

・Editorconfig

・Gulp

・Docker

## Getting started

You need to code static website at first.

And then generate WordPress theme.

### Static website

#### 1. Install packages

```node
  yarn install
```

#### 2. Generate dotenv

```node
  yarn genenv
```

You can run the following command even if you don't edit .env file.

#### 3. Start local server

```node
  yarn start
```

Assets will be generated in /out folder.

They are generated automatically when you change source files.

### WordPress

You don't need to run the following command if you don't use WordPress.

#### 1. Set theme name

```node
# .env
WP_THEME_NAME=theme-name
```

#### 2. Up local WordPress

```node
  yarn wp:up
```

This command runs `docker-compose up` internally to build local WordPress.

/wp folder will be generated.

#### 3. Open local WordPress

Open `http://localhost:8081`.

WordPress will be shown in your browser.

#### 4. Set up local WordPress

Set up your local WordPress in your browser.

#### 5. Generate theme base files

```node
  yarn wp:gen
```

The following files will be generated in /wp/themes/your-theme folder.

・functions.php

・index.php

・header.php

・footer.php

・front-page.php

・page-*.php

・style.css

・assets/**/*

#### 6. Start WordPress assets compiler

```node
  yarn wp:start
```

Assets will be generated in /wp/themes/your-theme folder.

They are generated automatically when you change source files.

## Directories

### /src

All source files are here.

Basically you should edit files only here.

### /out

Generated files are here.

### /gulpfile.js

Task runner is here.

## Pug

## Sass

## Stylelint

## Webpack

## Eslint

## Editorconfig

## Gulp

## Docker
