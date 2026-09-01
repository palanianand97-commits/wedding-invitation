/**
 * ============================================
 * Wedding Invitation - Interactive Script
 * ============================================
 * Handles:
 * - Front cover open transition
 * - Scroll-based fade-in animations
 * - Google Maps location link
 * - WhatsApp sharing functionality
 * ============================================
 */

(function () {
    'use strict';

    /* ============================================
       CONFIGURATION - Easy to update
       ============================================ */

    // Google Maps URL - UPDATE THIS with the actual venue location
    const GOOGLE_MAPS_URL = 'https://www.google.com/maps/search/Kulalar+Samudaya+Thirumana+Mandapam+Kambam+Theni';

    // WhatsApp pre-filled message
    const WHATSAPP_MESSAGE = `💐 அன்புடன் அழைக்கின்றோம்!

அம்சானந் & சரண்யா
திருமண அழைப்பிதழை காண கீழே உள்ள link-ஐ click செய்யவும்.

`;

    /* ============================================
       DOM ELEMENTS
       ============================================ */
    const frontCover = document.getElementById('front-cover');
    const openBtn = document.getElementById('open-invitation-btn');
    const invitationContent = document.getElementById('invitation-content');
    const mapsBtn = document.getElementById('maps-btn');
    const whatsappBtn = document.getElementById('whatsapp-share-btn');

    /* ============================================
       FRONT COVER - Open Invitation
       ============================================ */

    /**
     * Opens the wedding invitation with a smooth transition.
     * Hides the front cover and reveals the main content.
     */
    function openInvitation() {
        // Add hidden class to trigger fade-out transition
        frontCover.classList.add('hidden');

        // Show the main invitation content
        invitationContent.classList.add('visible');
        invitationContent.setAttribute('aria-hidden', 'false');

        // After cover fade-out transition completes, hide it fully
        setTimeout(function () {
            frontCover.style.display = 'none';
            // Scroll to top of invitation content
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // Trigger fade-in animations for visible sections
            checkFadeElements();
        }, 850); // Match CSS transition duration (0.8s + small buffer)
    }

    // Attach click event to the open button
    if (openBtn) {
        openBtn.addEventListener('click', openInvitation);
    }

    /* ============================================
       SCROLL FADE-IN ANIMATIONS
       ============================================ */

    /**
     * Checks all fade-in elements and makes them visible
     * when they enter the viewport.
     */
    function checkFadeElements() {
        const fadeElements = document.querySelectorAll('.fade-in');

        fadeElements.forEach(function (el) {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;

            // Element is considered visible when top is within 85% of viewport
            if (rect.top <= windowHeight * 0.88) {
                el.classList.add('visible');
            }
        });
    }

    // Use IntersectionObserver for better performance if available
    if ('IntersectionObserver' in window) {
        const fadeObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        fadeObserver.unobserve(entry.target); // Only animate once
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px 0px -12% 0px', // Trigger slightly before fully in view
                threshold: 0.1,
            }
        );

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(function (el) {
            fadeObserver.observe(el);
        });
    } else {
        // Fallback: listen to scroll events for older browsers
        window.addEventListener('scroll', checkFadeElements, { passive: true });
        window.addEventListener('resize', checkFadeElements, { passive: true });
    }

    /* ============================================
       GOOGLE MAPS LOCATION
       ============================================ */

    /**
     * Sets the Google Maps URL on the maps button.
     */
    if (mapsBtn) {
        mapsBtn.href = GOOGLE_MAPS_URL;
    }

    /* ============================================
       WHATSAPP SHARING
       ============================================ */

    /**
     * Opens WhatsApp with a pre-filled invitation message
     * including the current website URL.
     */
    function shareOnWhatsApp() {
        // Get the current page URL dynamically
        const currentURL = window.location.href;

        // Build the full message with the URL appended
        const fullMessage = WHATSAPP_MESSAGE + currentURL;

        // Encode the message for URL
        const encodedMessage = encodeURIComponent(fullMessage);

        // WhatsApp share URL (works on both mobile and desktop)
        const whatsappURL = 'https://api.whatsapp.com/send?text=' + encodedMessage;

        // Open WhatsApp in a new tab/window
        window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    }

    // Attach click event to WhatsApp share button
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', shareOnWhatsApp);
    }

    /* ============================================
       TOUCH FEEDBACK - Mobile Enhancement
       ============================================ */

    /**
     * Adds subtle touch feedback to buttons on mobile.
     */
    const allButtons = document.querySelectorAll('.open-btn, .maps-btn, .whatsapp-btn');

    allButtons.forEach(function (btn) {
        btn.addEventListener('touchstart', function () {
            this.style.transform = 'scale(0.97)';
        }, { passive: true });

        btn.addEventListener('touchend', function () {
            this.style.transform = '';
        }, { passive: true });
    });

    /* ============================================
       PREVENT DOUBLE-TAP ZOOM ON BUTTONS
       ============================================ */
    allButtons.forEach(function (btn) {
        btn.addEventListener('touchend', function (e) {
            e.preventDefault();
            this.click();
        });
    });

})();
