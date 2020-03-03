<?php
/**
 * Plugin Name:     Parallax Images
 * Description:     Example block written with ESNext standard and JSX support – build step required.
 * Version:         0.1.0
 * Author:          The WordPress Contributors
 * License:         GPL-2.0-or-later
 * Text Domain:     create-block
 *
 * @package         create-block
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function create_block_parallax_images_block_init()
{
    $dir = dirname(__FILE__);

    $script_asset_path = "$dir/build/index.asset.php";
    $frontend_asset_path = "$dir/build/front-end.asset.php";

    if (! file_exists($script_asset_path)) {
        throw new Error(
            'You need to run `npm start` or `npm run build` for the "create-block/parallax-images" block first.'
        );
    }
    $index_js     = 'build/index.js';
    $script_asset = require($script_asset_path);
    wp_register_script(
        'create-block-parallax-images-block-editor',
        plugins_url($index_js, __FILE__),
        $script_asset['dependencies'],
        $script_asset['version']
    );

    $editor_css = 'editor.css';
    wp_register_style(
        'create-block-parallax-images-block-editor',
        plugins_url($editor_css, __FILE__),
        array(),
        filemtime("$dir/$editor_css")
    );

    $style_css = 'style.css';
    wp_register_style(
        'create-block-parallax-images-block',
        plugins_url($style_css, __FILE__),
        array(),
        filemtime("$dir/$style_css")
    );

    register_block_type('create-block/parallax-images', array(
        'editor_script' => 'create-block-parallax-images-block-editor',
        'editor_style'  => 'create-block-parallax-images-block-editor',
        'style'         => 'create-block-parallax-images-block',
    ));

    $frontend_js     = 'build/front-end.js';
    $frontend_asset = require($script_asset_path);
    wp_enqueue_script(
        'create-block-parallax-images-front-end',
        plugins_url($frontend_js, __FILE__),
        $frontend_asset['dependencies'],
        $frontend_asset['version'],
        true
    );
}
add_action('init', 'create_block_parallax_images_block_init');
