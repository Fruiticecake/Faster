<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <title><?php wp_title('|', true, 'right') . bloginfo('name'); ?></title>
  <meta name="description" content="about description">
  <meta name="viewport" content="initial-scale=1.0, width=device-width">
  <link rel="stylesheet" href="<?php echo get_theme_file_uri(); ?>/assets/css/about.min.css"><?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

  <header id="js-header">
    <nav>
      <ul>
        <li><a href="<?php echo esc_url(home_url('/')); ?>">Home</a></li>
        <li><a href="<?php echo esc_url(home_url('/about')); ?>">About</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <?php get_header(); ?>
    <h1 class="at-common-title-1">About page</h1>
    <div class="at-common-btn-1"><a href="<?php echo esc_url(home_url('/')); ?>">Home</a></div>
    <div class="hm">
      <div></div>
      <div></div>
      <div></div>
    </div><?php get_footer(); ?>
  </main>
  <footer id="js-footer"></footer>
  <script src="<?php echo get_theme_file_uri(); ?>/assets/js/common.min.js"></script><?php wp_footer(); ?>
</body>

</html>
