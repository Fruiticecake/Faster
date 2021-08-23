<!DOCTYPE html>
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
