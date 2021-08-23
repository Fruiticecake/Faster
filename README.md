# Faster

Faster is template which makes coding static website and WordPress faster.

## Motivation

I often code static website and WordPress website and use a lot of packages to make it easy.

Built development environment and coding WordPress theme contains a lot of routine works.

But I don't like routine works to death.

So I decided to create template which resolves the above problem.

## Features

I use the following great packages.

・Pug

[https://github.com/pugjs/pug](https://github.com/pugjs/pug)

・Puglint

[https://github.com/pugjs/pug-lint](https://github.com/pugjs/pug-lint)

・Sass

[https://github.com/sass/sass](https://github.com/sass/sass)

・Stylelint

[https://github.com/stylelint/stylelint](https://github.com/stylelint/stylelint)

・Webpack

[https://github.com/webpack/webpack](https://github.com/webpack/webpack)

・ESLint

[https://github.com/eslint/eslint](https://github.com/eslint/eslint)

・Editorconfig

[https://editorconfig.org/](https://editorconfig.org/)

・Gulp

[https://github.com/gulpjs/gulp](https://github.com/gulpjs/gulp)

・Docker compose

[https://github.com/docker/compose](https://github.com/docker/compose)

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

Open [http://localhost:8080](http://localhost:8080).

Assets will be generated in /out folder.

They are generated automatically when you change source files.

### WordPress

You don't need to run the following command if you don't use WordPress.

#### 1. Set theme name

```node
  .env
  WP_THEME_NAME=theme-name
```

#### 2. Up local WordPress

```node
  yarn wp:up
```

This command runs `docker-compose up` internally to build local WordPress.

/wp folder will be generated.

#### 3. Open local WordPress

Open [http://localhost:8081](http://localhost:8081).

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

You should set `isWp = true` when you generate WordPress assets.

```pug
  /src/pug/config/_index.pug
  const isWp = true
```

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

## Settings

### Pug

### Puglint

### Sass

### Stylelint

### Webpack

### ESLint

### Editorconfig

### Optimizing images

### Docker compose
