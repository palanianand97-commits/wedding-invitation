/**
 * ============================================
 * Wedding Invitation - Interactive Script
 * ============================================
 * - Front cover open transition
 * - Countdown timer to wedding date
 * - Scroll fade-in animations
 * - Google Maps location
 * - WhatsApp sharing
 * ============================================
 */

(function () {
    'use strict';

    /* ============================================
       CONFIGURATION
       ============================================ */

    // Google Maps URL - exact venue location
    const GOOGLE_MAPS_URL = 'https://www.google.com/maps/place/9%C2%B043\'58.6%22N+77%C2%B016\'58.6%22E/@9.7329408,77.2829363,817m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d9.7329408!4d77.2829363?entry=ttu';

    // Wedding date & time (Marriage ceremony)
    const WEDDING_DATE = new Date('2026-09-13T10:30:00+05:30');

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
    function openInvitation() {
        frontCover.classList.add('hidden');
        invitationContent.classList.add('visible');
        invitationContent.setAttribute('aria-hidden', 'false');

        setTimeout(function () {
            frontCover.style.display = 'none';
            window.scrollTo({ top: 0, behavior: 'smooth' });
            checkFadeElements();
        }, 850);
    }

    if (openBtn) {
        openBtn.addEventListener('click', openInvitation);
    }

    /* ============================================
       COUNTDOWN TIMER
       ============================================ */
    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const secondsEl = document.getElementById('countdown-seconds');
    const timerContainer = document.getElementById('countdown-timer');

    function updateCountdown() {
        var now = new Date().getTime();
        var distance = WEDDING_DATE.getTime() - now;

        // If wedding date has passed
        if (distance < 0) {
            if (timerContainer) {
                timerContainer.innerHTML = '<p class="countdown-complete">🎊 திருமணம் நடைபெற்றது! 🎊</p>';
            }
            return;
        }

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Pad with leading zeros
        if (daysEl) daysEl.textContent = days < 10 ? '0' + days : days;
        if (hoursEl) hoursEl.textContent = hours < 10 ? '0' + hours : hours;
        if (minutesEl) minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
        if (secondsEl) secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
    }

    // Update immediately then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);

    /* ============================================
       SCROLL FADE-IN ANIMATIONS
       ============================================ */
    function checkFadeElements() {
        var fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(function (el) {
            var rect = el.getBoundingClientRect();
            var windowHeight = window.innerHeight || document.documentElement.clientHeight;
            if (rect.top <= windowHeight * 0.88) {
                el.classList.add('visible');
            }
        });
    }

    // Use IntersectionObserver for performance
    if ('IntersectionObserver' in window) {
        var fadeObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        fadeObserver.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: '0px 0px -12% 0px', threshold: 0.1 }
        );

        document.querySelectorAll('.fade-in').forEach(function (el) {
            fadeObserver.observe(el);
        });
    } else {
        window.addEventListener('scroll', checkFadeElements, { passive: true });
        window.addEventListener('resize', checkFadeElements, { passive: true });
    }

    /* ============================================
       GOOGLE MAPS
       ============================================ */
    if (mapsBtn) {
        mapsBtn.href = GOOGLE_MAPS_URL;
    }

    /* ============================================
       WHATSAPP SHARING
       ============================================ */
    function shareOnWhatsApp() {
        var currentURL = window.location.href;
        var fullMessage = WHATSAPP_MESSAGE + currentURL;
        var encodedMessage = encodeURIComponent(fullMessage);
        var whatsappURL = 'https://api.whatsapp.com/send?text=' + encodedMessage;
        window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    }

    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', shareOnWhatsApp);
    }

    /* ============================================
       TOUCH FEEDBACK
       ============================================ */
    var allButtons = document.querySelectorAll('.open-btn, .maps-btn, .whatsapp-btn');
    allButtons.forEach(function (btn) {
        btn.addEventListener('touchstart', function () {
            this.style.transform = 'scale(0.97)';
        }, { passive: true });
        btn.addEventListener('touchend', function () {
            this.style.transform = '';
        }, { passive: true });
    });

})();
