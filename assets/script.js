/**
 * Simplify Custom Plugin - Frontend JavaScript
 * Author: Pritchard Zimondi
 * Description: Custom JavaScript that demonstrates how to add scripts to WordPress
 */

// Wait for the page to fully load
document.addEventListener("DOMContentLoaded", function() {

    // Log to console that plugin is active
    console.log("🚀 Simplify Custom Plugin loaded successfully!");
    console.log("👨‍💻 Developed by: Pritchard Zimondi");

    // Access data passed from PHP
    if (typeof simplifyData !== 'undefined') {
        console.log("📦 Plugin URL:", simplifyData.pluginUrl);
        console.log("💬 Message:", simplifyData.message);
    }

    // Add a custom banner to the top of the page
    addCustomBanner();

    // Enhance form submission with validation
    enhanceForms();

    // Add smooth scroll to all internal links
    addSmoothScroll();

    // Add animation to elements on scroll
    animateOnScroll();

    // Log Gravity Forms submissions
    trackGravityFormSubmissions();
});

/**
 * Add a custom banner to the page
 */
function addCustomBanner() {
    const banner = document.createElement('div');
    banner.className = 'simplify-custom-banner';
    banner.innerHTML = 'Custom styles and scripts by Pritchard Zimondi are active.';

    // Insert at the top of the body
    document.body.insertBefore(banner, document.body.firstChild);

    // Auto-hide after 5 seconds
    setTimeout(function() {
        banner.style.transition = 'all 0.5s ease';
        banner.style.transform = 'translateY(-100%)';
        banner.style.opacity = '0';

        setTimeout(function() {
            banner.remove();
        }, 500);
    }, 5000);
}

/**
 * Enhance all forms with custom validation and feedback
 */
function enhanceForms() {
    const forms = document.querySelectorAll('form');

    forms.forEach(function(form) {
        // Add submit event listener
        form.addEventListener('submit', function(e) {
            console.log('📝 Form submission detected');

            // Add loading indicator to submit button
            const submitBtn = form.querySelector('input[type="submit"], button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.value || submitBtn.textContent;
                submitBtn.disabled = true;

                if (submitBtn.tagName === 'INPUT') {
                    submitBtn.value = 'Submitting...';
                } else {
                    submitBtn.innerHTML = '<span class="simplify-loading"></span> Submitting...';
                }

                // Re-enable after 3 seconds (in case form doesn't redirect)
                setTimeout(function() {
                    submitBtn.disabled = false;
                    if (submitBtn.tagName === 'INPUT') {
                        submitBtn.value = originalText;
                    } else {
                        submitBtn.textContent = originalText;
                    }
                }, 3000);
            }
        });

        // Add real-time validation to email fields
        const emailInputs = form.querySelectorAll('input[type="email"]');
        emailInputs.forEach(function(input) {
            input.addEventListener('blur', function() {
                validateEmail(input);
            });
        });
    });
}

/**
 * Validate email input
 */
function validateEmail(input) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(input.value);

    if (input.value && !isValid) {
        input.style.borderColor = '#e74c3c';
        console.warn('⚠️ Invalid email format detected');
    } else if (isValid) {
        input.style.borderColor = '#2ecc71';
        console.log('✅ Valid email format');
    }
}

/**
 * Add smooth scrolling to all anchor links
 */
function addSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#' || href === '#!') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                console.log('🎯 Smooth scrolling to:', href);
            }
        });
    });
}

/**
 * Animate elements when they come into view
 */
function animateOnScroll() {
    // Elements to animate
    const elements = document.querySelectorAll('h2, h3, .gform_wrapper, .entry-content > p');

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(function(el) {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // Add the animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Track Gravity Forms submissions
 */
function trackGravityFormSubmissions() {
    // Listen for Gravity Forms confirmation
    jQuery(document).on('gform_confirmation_loaded', function(event, formId) {
        console.log('✅ Gravity Form #' + formId + ' submitted successfully!');
        console.log('🎉 Form submission tracked by Pritchard Zimondi\'s plugin');

        // You could send this data to analytics or your own tracking system
        // Example: Send to your webhook or analytics
        if (typeof simplifyData !== 'undefined' && simplifyData.ajaxUrl) {
            // This is where you could make an AJAX call to track the submission
            console.log('📊 Ready to send analytics data');
        }
    });
}

/**
 * jQuery-based enhancements (since WordPress includes jQuery)
 */
jQuery(document).ready(function($) {
    console.log('💎 jQuery is ready and loaded');

    // Add hover effect to all buttons
    $('button, input[type="submit"], .button').hover(
        function() {
            $(this).css('transform', 'scale(1.05)');
        },
        function() {
            $(this).css('transform', 'scale(1)');
        }
    );

    // Log all Gravity Form interactions
    $('.gform_wrapper input, .gform_wrapper textarea, .gform_wrapper select').on('focus', function() {
        console.log('📝 User interacting with form field:', $(this).attr('name') || 'unnamed field');
    });
});