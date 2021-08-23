# Faster

Faster is template which makes coding static website and wordpress faster.

## Motivation

I often code static website and wordpress website and use a lot of great packages to make it easy.

Built development environment and coding wordpress theme contains a lot of routine works.

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

And then generate wordpress theme.

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

They are generated automatically when you change them.

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

This command runs `docker-compose up` internally to build local wordpress.

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

They are generated automatically when you change them.

## Settings

## Pug

## Sass

## Stylelint

## Webpack

## Eslint

## Editorconfig

## Gulp

## Docker
