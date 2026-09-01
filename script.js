/**
 * ==========================================================================
 * அம்சானந் & சரண்யா திருமண அழைப்பிதழ் - Interactive Logic
 * ==========================================================================
 */

(function () {
    'use strict';

    /* ----------------------------------------------------------------------
       1. CONSTANTS & CONFIGURATION
       ---------------------------------------------------------------------- */

    // Exact Google Maps Venue Link provided by the user
    const GOOGLE_MAPS_URL = 'https://www.google.com/maps/place/9%C2%B043\'58.6%22N+77%C2%B016\'58.6%22E/@9.7329408,77.2829363,817m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d9.7329408!4d77.2829363?entry=ttu';

    // Wedding Muhurtham Date & Time: 13 September 2026, 10:30 AM IST
    const WEDDING_TARGET_DATE = new Date('2026-09-13T10:30:00+05:30');

    /* ----------------------------------------------------------------------
       2. DOM ELEMENTS
       ---------------------------------------------------------------------- */
    const frontCoverScreen   = document.getElementById('front-cover');
    const openInvitationBtn  = document.getElementById('open-invitation-btn');
    const invitationMain     = document.getElementById('invitation-content');
    const mapsBtn            = document.getElementById('maps-btn');
    const whatsappBtn        = document.getElementById('whatsapp-share-btn');
    const mainInvitationImg  = document.getElementById('main-invitation-img');
    const lightboxModal      = document.getElementById('image-lightbox');
    const lightboxImg        = document.getElementById('lightbox-img');
    const closeLightboxBtn   = document.getElementById('close-lightbox');

    /* Countdown Elements */
    const daysEl    = document.getElementById('count-days');
    const hoursEl   = document.getElementById('count-hours');
    const minutesEl = document.getElementById('count-minutes');
    const secondsEl = document.getElementById('count-seconds');
    const timerGrid = document.getElementById('countdown-grid');

    /* ----------------------------------------------------------------------
       3. FRONT COVER OPEN TRANSITION
       ---------------------------------------------------------------------- */
    function openInvitation() {
        if (!frontCoverScreen || !invitationMain) return;

        // Animate cover out
        frontCoverScreen.classList.add('cover-opened');

        // Reveal main content
        invitationMain.classList.add('content-visible');
        invitationMain.setAttribute('aria-hidden', 'false');

        setTimeout(function () {
            frontCoverScreen.style.display = 'none';
            window.scrollTo({ top: 0, behavior: 'smooth' });
            triggerScrollAnimations();
        }, 800);
    }

    if (openInvitationBtn) {
        openInvitationBtn.addEventListener('click', openInvitation);
    }

    /* ----------------------------------------------------------------------
       4. LIVE COUNTDOWN & DURATION TIMER
       ---------------------------------------------------------------------- */
    function updateCountdown() {
        const now = new Date().getTime();
        const difference = WEDDING_TARGET_DATE.getTime() - now;

        if (difference <= 0) {
            if (timerGrid) {
                timerGrid.innerHTML = '<div style="color: #FFE57F; font-size: 1.3rem; font-weight: bold; padding: 10px;">🎊 திருமண விழா இனிதே நடைபெற்றது! 🎊</div>';
            }
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        if (daysEl) daysEl.textContent = days < 10 ? '0' + days : days;
        if (hoursEl) hoursEl.textContent = hours < 10 ? '0' + hours : hours;
        if (minutesEl) minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
        if (secondsEl) secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    /* ----------------------------------------------------------------------
       5. WHATSAPP INVITATION SHARING (Formatted with Timings & Venue)
       ---------------------------------------------------------------------- */
    function shareOnWhatsApp() {
        const siteUrl = window.location.href.split('?')[0];

        const messageText = 
`💐 *அன்புடன் அழைக்கின்றோம்!* 💐

*அம்சானந் ❤️ சரண்யா*
திருமண அழைப்பிதழ் (Wedding Invitation)

🎊 *வரவேற்பு:* 12.09.2026 (மாலை 7:00 PM - 8:00 PM)
💍 *திருமணம்:* 13.09.2026 (காலை 10:30 AM - 11:30 AM)
🏛️ *இடம்:* குலாலர் சமுதாய திருமண மண்டபம், கம்பம், தேனி மாவட்டம்.

👇 *அழைப்பிதழை முழுமையாக காண இங்கே click செய்யவும்:*
${siteUrl}`;

        const encodedMessage = encodeURIComponent(messageText);
        const waUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;
        window.open(waUrl, '_blank', 'noopener,noreferrer');
    }

    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', shareOnWhatsApp);
    }

    /* ----------------------------------------------------------------------
       6. GOOGLE MAPS LINK ASSIGNMENT
       ---------------------------------------------------------------------- */
    if (mapsBtn) {
        mapsBtn.href = GOOGLE_MAPS_URL;
    }

    /* ----------------------------------------------------------------------
       7. IMAGE LIGHTBOX / TAP TO ZOOM
       ---------------------------------------------------------------------- */
    if (mainInvitationImg && lightboxModal && lightboxImg) {
        mainInvitationImg.addEventListener('click', function () {
            lightboxImg.src = this.src;
            lightboxModal.classList.add('active');
            lightboxModal.setAttribute('aria-hidden', 'false');
        });
    }

    if (closeLightboxBtn && lightboxModal) {
        closeLightboxBtn.addEventListener('click', function () {
            lightboxModal.classList.remove('active');
            lightboxModal.setAttribute('aria-hidden', 'true');
        });

        lightboxModal.addEventListener('click', function (e) {
            if (e.target === lightboxModal) {
                lightboxModal.classList.remove('active');
                lightboxModal.setAttribute('aria-hidden', 'true');
            }
        });
    }

    /* ----------------------------------------------------------------------
       8. SCROLL FADE-IN ANIMATIONS
       ---------------------------------------------------------------------- */
    function triggerScrollAnimations() {
        const animatedElements = document.querySelectorAll('.anim-fade');

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

            animatedElements.forEach(function (el) {
                observer.observe(el);
            });
        } else {
            animatedElements.forEach(function (el) {
                el.classList.add('is-revealed');
            });
        }
    }

    /* ----------------------------------------------------------------------
       9. FLOATING ROSE / AUSPICIOUS PETALS
       ---------------------------------------------------------------------- */
    function createFloatingPetals() {
        const container = document.getElementById('petals-container');
        if (!container) return;

        const petalSymbols = ['🌸', '🌺', '🌼', '✨'];
        const petalCount = 12;

        for (let i = 0; i < petalCount; i++) {
            const petal = document.createElement('span');
            petal.className = 'petal';
            petal.textContent = petalSymbols[Math.floor(Math.random() * petalSymbols.length)];
            petal.style.left = Math.random() * 95 + '%';
            petal.style.animationDuration = (6 + Math.random() * 8) + 's';
            petal.style.animationDelay = (Math.random() * 6) + 's';
            petal.style.fontSize = (0.9 + Math.random() * 0.7) + 'rem';
            container.appendChild(petal);
        }
    }

    // Initialize floating petals
    createFloatingPetals();

})();
