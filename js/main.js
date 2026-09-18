/**
 * MCAFEE LAW FIRM — 2026 EDITORIAL REDESIGN
 * Vanilla JavaScript (No GSAP, No Custom Cursor, No React/jQuery)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize interactive modules
  initHeaderBehavior();
  initMobileMenu();
  initVideoPlayer();
  initConsultationForm();
  initHeroEstimateForm();
  initSmoothScroll();
  initCopyrightYear();
});

/**
 * 1. Header Scroll Behavior & Sticky Elevation
 */
function initHeaderBehavior() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * 2. Mobile Drawer Navigation & Practice Area Accordion
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-nav-drawer');
  const closeBtn = document.getElementById('mobile-drawer-close');
  const practiceBtn = document.getElementById('mobile-practice-btn');
  const practiceSub = document.getElementById('mobile-sub-list');
  const drawerLinks = drawer ? drawer.querySelectorAll('a') : [];

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', () => {
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  // Close on navigation link click
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Dropdown accordions in mobile drawer (Practice areas, Attorneys, etc.)
  const groupToggles = drawer ? drawer.querySelectorAll('.mobile-group-toggle') : [];
  groupToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const subList = btn.nextElementSibling;
      if (subList && subList.classList.contains('mobile-sub-list')) {
        subList.classList.toggle('active');
        const chevron = btn.querySelector('.drawer-chevron');
        if (chevron) {
          chevron.style.transform = subList.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
        }
      }
    });
  });

  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/**
 * 3. Cinematic Video Player Custom Overlay & Play Control
 */
function initVideoPlayer() {
  const video = document.getElementById('wreck-video');
  const overlay = document.getElementById('video-overlay');

  if (!video || !overlay) return;

  const playVideo = () => {
    overlay.classList.add('hidden');
    video.play();
  };

  overlay.addEventListener('click', playVideo);
  overlay.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      playVideo();
    }
  });

  video.addEventListener('ended', () => {
    overlay.classList.remove('hidden');
  });
}

/**
 * 4. Consultation Form Interactive Validation & Submission
 */
function initConsultationForm() {
  const form = document.getElementById('consultation-form');
  const successBanner = document.getElementById('form-success-banner');
  const submitBtn = document.getElementById('submit-form-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Fields
    const nameInput = document.getElementById('client-name');
    const phoneInput = document.getElementById('client-phone');
    const emailInput = document.getElementById('client-email');
    const detailsInput = document.getElementById('case-details');

    // Validation checks
    const validateField = (input, condition) => {
      const group = input ? input.closest('.form-group') : null;
      if (!group) return;
      if (!condition) {
        group.classList.add('has-error');
        isValid = false;
      } else {
        group.classList.remove('has-error');
      }
    };

    if (nameInput) validateField(nameInput, nameInput.value.trim().length >= 2);
    if (phoneInput) validateField(phoneInput, /^[0-9+()\s-]{7,20}$/.test(phoneInput.value.trim()));
    if (emailInput) validateField(emailInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim()));
    if (detailsInput) validateField(detailsInput, detailsInput.value.trim().length >= 5);

    if (isValid) {
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Submitting Request...';
      }

      // Smooth submission response
      setTimeout(() => {
        form.reset();
        if (successBanner) {
          successBanner.style.display = 'flex';
          successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.querySelector('span').textContent = 'Submit Free Consultation Request';
        }
      }, 500);
    }
  });

  // Clear errors on input
  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
      const group = input.closest('.form-group');
      if (group) group.classList.remove('has-error');
    });
  });
}

/**
 * 4b. Hero Banner Estimate Form Validation (landing.html)
 */
function initHeroEstimateForm() {
  const form = document.getElementById('hero-estimate-card-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const nameInput = document.getElementById('hero-name');
    const emailInput = document.getElementById('hero-email');
    const phoneInput = document.getElementById('hero-phone');
    const messageInput = document.getElementById('hero-message');
    const submitBtn = form.querySelector('.btn-estimate-submit');

    const validateField = (input, condition) => {
      const group = input ? input.closest('.form-group') : null;
      if (!group) return;
      if (!condition) {
        group.classList.add('has-error');
        isValid = false;
      } else {
        group.classList.remove('has-error');
      }
    };

    if (nameInput) validateField(nameInput, nameInput.value.trim().length >= 2);
    if (emailInput) validateField(emailInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim()));
    if (phoneInput) validateField(phoneInput, /^[0-9+()\s-]{7,20}$/.test(phoneInput.value.trim()));
    if (messageInput) validateField(messageInput, messageInput.value.trim().length >= 3);

    if (isValid) {
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Submitting...';
      }

      setTimeout(() => {
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.querySelector('span').textContent = 'Request Received!';
          setTimeout(() => {
            submitBtn.querySelector('span').textContent = 'SUBMIT NOW';
          }, 3500);
        }
      }, 500);
    }
  });

  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
      const group = input.closest('.form-group');
      if (group) group.classList.remove('has-error');
    });
  });
}

/**
 * 5. Smooth Anchor Scrolling
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const header = document.getElementById('site-header');
        const headerOffset = header ? header.offsetHeight + 10 : 80;
        const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * 6. Dynamic Year
 */
function initCopyrightYear() {
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
