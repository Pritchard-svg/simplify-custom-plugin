<?php
/**
 * Plugin Name: Simplify Custom Plugin
 * Plugin URI:  https://pritchard-zimondi.sblik.com
 * Description: Custom plugin by Pritchard Zimondi demonstrating how to add scripts and styles to WordPress
 * Version:     1.0.1
 * Author:      Pritchard Zimondi
 * Author URI:  https://pritchard-zimondi.sblik.com
 * License:     GPL v2 or later
 * Text Domain: simplify-custom-plugin
 */

// Prevent direct file access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Enqueue custom styles and scripts on the frontend
 * This function hooks into WordPress to load your CSS and JavaScript files
 */
function simplify_custom_enqueue_assets() {
    // Enqueue CSS stylesheet
    wp_enqueue_style(
        'simplify-custom-style',                    // Handle (unique identifier)
        plugin_dir_url(__FILE__) . 'assets/style.css',  // Path to CSS file
        array(),                                     // Dependencies (none)
        '1.0.1',                                     // Version number
        'all'                                        // Media type
    );

    // Enqueue JavaScript file
    wp_enqueue_script(
        'simplify-custom-script',                   // Handle (unique identifier)
        plugin_dir_url(__FILE__) . 'assets/script.js',  // Path to JS file
        array('jquery'),                            // Dependencies (requires jQuery)
        '1.0.1',                                    // Version number
        true                                        // Load in footer (true) or header (false)
    );

    // Pass data from PHP to JavaScript
    wp_localize_script('simplify-custom-script', 'simplifyData', array(
        'pluginUrl' => plugin_dir_url(__FILE__),
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'message' => 'Plugin loaded successfully by Pritchard Zimondi!'
    ));
}
// Hook into WordPress to load assets on frontend pages
add_action('wp_enqueue_scripts', 'simplify_custom_enqueue_assets');


/**
 * Enqueue admin styles and scripts (optional - for WordPress dashboard)
 */
function simplify_custom_enqueue_admin_assets($hook) {
    // Only load on specific admin pages if needed
    // For now, load on all admin pages for demonstration

    wp_enqueue_style(
        'simplify-custom-admin-style',
        plugin_dir_url(__FILE__) . 'assets/admin-style.css',
        array(),
        '1.0.1'
    );

    wp_enqueue_script(
        'simplify-custom-admin-script',
        plugin_dir_url(__FILE__) . 'assets/admin-script.js',
        array('jquery'),
        '1.0.1',
        true
    );
}
add_action('admin_enqueue_scripts', 'simplify_custom_enqueue_admin_assets');


/**
 * Add custom functionality - Example function
 * This adds a custom class to the body tag
 */
function simplify_add_body_class($classes) {
    $classes[] = 'simplify-custom-plugin-active';
    return $classes;
}
add_filter('body_class', 'simplify_add_body_class');


/**
 * Display activation message
 */
function simplify_activation_notice() {
    ?>
    <div class="notice notice-success is-dismissible">
        <p><strong>Simplify Custom Plugin</strong> by Pritchard Zimondi is now active! Your custom styles and scripts are loading.</p>
    </div>
    <?php
}
// Show notice after activation
add_action('admin_notices', 'simplify_activation_notice');








add_action('gform_after_submission', 'my_custom_plugin_gravity_webhook', 10, 2);

function my_custom_plugin_gravity_webhook($entry, $form) {
    $target_form_id = 1;
    if ($form['id'] != $target_form_id) {
        return;
    }

    // Map all fields with their actual IDs as in WordPress
    $data = array(
        'name'                      => rgar($entry, '1'),   // Your Name (First + Last)
        'name_first'                => rgar($entry, '1.3'), // First name only
        'name_last'                 => rgar($entry, '1.6'), // Last name only
        'email'                     => rgar($entry, '2'),   // Your Email Address
        'message'                   => rgar($entry, '3'),   // Paragraph text/message
    );

    // Convert to JSON
    $body = wp_json_encode($data);

    // Send to Webhook.site
    $response = wp_remote_post('https://webhook.site/56188e3e-52d1-4729-84dc-7ca8e380225d', array(
        'method'    => 'POST',
        'headers'   => array('Content-Type' => 'application/json; charset=utf-8'),
        'body'      => $body,
        'timeout'   => 15,
    ));

    // Logging for debugging
    if (is_wp_error($response)) {
        error_log('Gravity Form webhook error: ' . $response->get_error_message());
    } else {
        error_log('Gravity Form webhook response: ' . print_r($response, true));
    }
}