const functions =
`<?php
function add_my_security () {
  // Hide WordPress version
  remove_action('wp_head', 'wp_generator');

  function redirect_author_archive () {
    if (preg_match('/author=([0-9]*)/i', $_SERVER['QUERY_STRING'])) {
      wp_redirect(esc_url(home_url('/404.php')));
      exit;
    }
  }

  // Redirect to 404 from author archive page
  add_action('init', 'redirect_author_archive');
}

add_my_security();


function get_slug_name (): string {
  $page = get_post(get_the_ID());
  return $page->post_name;
}


function add_slug_class ($classes) {
  if (is_page()) {
    $classes[] = get_slug_name();
  }

  return $classes;
}

add_filter('body_class', 'add_slug_class');


function redirect_home_from_404 () {
  if (is_404()) {
    wp_safe_redirect(home_url('/'));
    exit;
  }
}

add_action('template_redirect', 'redirect_home_from_404');


function get_update_time (string $file): string {
  date_default_timezone_set('Asia/Tokyo');
  return date('YmdHis', filemtime($file));
}


function add_my_stylesheet (string $file) {
  $file_root_path = get_template_directory() . '/assets/css/' . $file;

  if (file_exists($file_root_path)) {
    $file_path = get_theme_file_uri() . '/assets/css/' . $file;
    echo '<link rel="stylesheet" href="' . $file_path . '?' . get_update_time($file_root_path) . '">';
  }
}


function add_my_script (string $file) {
  $file_root_path = get_template_directory() . '/assets/js/' . $file;

  if (file_exists($file_root_path)) {
    $file_path = get_theme_file_uri() . '/assets/js/' . $file;
    echo '<script src="' . $file_path . '?' . get_update_time($file_root_path) . '"></script>';
  }
}


function sc_add_my_head_files () {
  if (is_home() || is_front_page()) {
    add_my_stylesheet('home.min.css');
  }

  else if (is_single()) {
    add_my_stylesheet('single.min.css');
  }

  else if (is_page()) {
    add_my_stylesheet(get_slug_name() . '.min.css');
  }
}

add_shortcode('add_my_head_files', 'sc_add_my_head_files');


function sc_add_my_footer_files () {
  if (is_page('hoge')) {
    add_my_script('hoge.min.js');
  }

  else {
    add_my_script('common.min.js');
  }
}

add_shortcode('add_my_footer_files', 'sc_add_my_footer_files');
`

const index =
`<?php
require_once('./front-page.php');
`

const header =
`<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8" />
  <title><?php wp_title('|', true, 'right') . bloginfo('name') ?></title>
  <meta name="viewport" content="initial-scale=1.0, width=device-width">
  <?php echo do_shortcode('[add_my_head_files]'); ?>
  <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
  <!-- set header here -->
`

const footer =
`  </main>
  <!-- set footer here -->
  <?php echo do_shortcode('[add_my_footer_files]'); ?>
  <?php wp_footer(); ?>
</body>

</html>
`

const style =
`/*
Theme Name: ${process.env.WP_THEME_NAME}
Author: author name
*/
`

module.exports = {
  functions: functions,
  index: index,
  header: header,
  footer: footer,
  style: style
}
