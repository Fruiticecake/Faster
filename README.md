# Website template

This template is for static website and WordPress.

## Motivation

I often make static website and WordPress website.

I use a lot of packages like Pug, Sass and so on to make it easy.

But building development environment takes a lot of time especially you do it for the first time.

I want to make coding website faster using this template.

## Features

・Pug

・Puglint

・Dart Sass

・Stylelint

・Webpack

・ESLint

・Gulp

・Docker

## Getting started

### Static website

First of all, let's make static website.

This template uses Pug, Sass, Webpack and linter to make static website.

#### 1. Install packages

```node
  yarn install
```

#### 2. Generate dotenv

```node
  yarn genenv
```

You can run the following command even if you don't edit .env file.

#### 3. Start your local server

```node
  yarn start
```

All assets will be generated in ./out folder.

### WordPress

Let's build local WordPress using Docker.

You don't need to run the following command if you don't use WordPress.

#### 1. Set theme name

```node
# .env
WP_THEME_NAME=write theme name here
```

#### 2. Build local WordPress

```node
  yarn wp:up
```

This command runs `docker-compose up` to build local WordPress.

You can change docker settings in ./docker-compose.yml.

#### 3. Generate base files of theme

```node
  yarn wp:gen
```

The following files will be generated.

・functions.php
・index.php
・header.php
・footer.php
・style.css

#### 4. Watch pug to generate wordpress
