/**
 * Dipu Academy — Global Shikho-Style Scroll & Box Animation Engine
 * Inspired by Shikho Academic Program: https://shikho.com/academic-program/c6-ssc-31
 *
 * Core Behaviors:
 *  - Every card, box, section, stat, and feature across the entire website
 *    slides in smoothly from outside (Left, Right, Bottom) and settles
 *    into its designated position upon scrolling into view.
 *  - Staggered timing for siblings in grids so cards stream in one by one.
 *  - Interactive 3D perspective tilt & cursor spotlight when hovering settled cards.
 *  - Word-by-word text cascaded reveals for headlines and titles.
 */

(function () {
  'use strict';

  // --- 0. Enforce Official Dipu Academy Favicon on Active Tab ---
  (function enforceDipuAcademyFavicon() {
    try {
      const faviconUrl = '/images/dipu-logo.png?v=5';
      let links = document.querySelectorAll("link[rel*='icon']");
      if (!links || links.length === 0) {
        const link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/png';
        link.href = faviconUrl;
        document.head.appendChild(link);
      } else {
        links.forEach((l) => {
          l.type = 'image/png';
          l.href = faviconUrl;
        });
      }
    } catch (e) {}
  })();

  // --- 1. Interactive 3D Perspective Tilt on Hover ---
  const CARD_HOVER_SELECTORS = [
    '.course-card',
    '.da-course-card',
    '.book-card',
    '.book-preview-card',
    '.feature-card',
    '.stat-card',
    '.shop-stat-card',
    '.shop-category-card',
    '.category-card',
    '.exam-card',
    '.dashboard-card',
    '.da-stat-card',
    '.da-subject-card',
    '.da-live-card',
    '.da-routine-card',
    '.da-card',
    '.pricing-card',
    '.plan-card',
    '.review-card',
    '.testimonial-card',
    '.testimonial-spotlight',
    '.trust-feature-card',
    '.trust-visual-card',
    '.step-card',
    '.interactive-box',
    '.mockup-pill-box',
    '.ai-anim-box',
    '.card',
    '.dipu-feat-result-card'
  ].join(',');

  function setupCardInteractions(container) {
    const cards = (container || document).querySelectorAll(CARD_HOVER_SELECTORS);

    cards.forEach((card) => {
      if (card.dataset.tiltInitialized) return;
      card.dataset.tiltInitialized = 'true';

      let isHovered = false;
      let rafId = null;

      card.addEventListener('pointerenter', () => {
        isHovered = true;
      });

      card.addEventListener('pointermove', (e) => {
        if (!isHovered) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Radial spotlight gradient position
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Subtle 3D tilt calculation
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -5.0;
          const rotateY = ((x - centerX) / centerX) * 5.0;

          card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-5px) scale3d(1.015, 1.015, 1.015)`;
        });
      });

      card.addEventListener('pointerleave', () => {
        isHovered = false;
        if (rafId) cancelAnimationFrame(rafId);
        card.style.transform = '';
      });
    });
  }

  // --- 2. High-Performance IntersectionObserver Scroll Reveals ---
  let scrollObserver = null;

  function getScrollObserver() {
    if (scrollObserver) return scrollObserver;
    if (!('IntersectionObserver' in window)) return null;

    scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.classList.add('reveal-visible');
            scrollObserver.unobserve(el);

            // Once the entrance transition completes (850ms), add 'reveal-settled'
            // so hover effects and 3D tilts operate with complete freedom
            setTimeout(() => {
              el.classList.add('reveal-settled');
            }, 850);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -35px 0px',
        threshold: 0.05
      }
    );

    return scrollObserver;
  }

  // Text Elements Selector
  const TEXT_SELECTORS = [
    'h1:not(.no-reveal)',
    'h2:not(.no-reveal)',
    'h3:not(.no-reveal)',
    '.section-title:not(.no-reveal)',
    '.section-headline:not(.no-reveal)',
    '.hero-desc:not(.no-reveal)',
    '.shop-banner-title:not(.no-reveal)',
    '.shop-banner-sub:not(.no-reveal)',
    '.course-hero-title:not(.no-reveal)',
    '.book-hero-title:not(.no-reveal)'
  ].join(',');

  // Comprehensive Box / Card Selectors across the entire website
  const BOX_SELECTORS = [
    // Course cards & pages
    '.course-card',
    '.da-course-card',
    '.course-section-card',
    '.content-section-card',
    '.checkout-sticky-card',
    '.routine-banner-card',
    '.mentor-profile-wrap',
    '.chapter-accordion-item',
    '.faq-accordion-item',
    '.feature-point-box',
    '.includes-checklist > li',
    '.helpline-box',

    // Features Section
    '.dipu-feat-box-btn',
    '.dipu-feat-result-card',
    '.dipu-feat-mobile-card',
    '.feature-card',
    '.feature-item-box',

    // Books & Shop
    '.book-card',
    '.book-preview-card',
    '.shop-stat-card',
    '.shop-category-card',
    '.card',
    '.filter-card',

    // Exams
    '.exam-card',
    '.exam-stat-card',
    '.test-item-card',
    '.leaderboard-card',

    // Trust & Testimonials
    '.trust-feature-card',
    '.trust-visual-card',
    '.testimonial-card',
    '.testimonial-spotlight',
    '.review-card',

    // Dashboard & Profile
    '.da-hero-card',
    '.da-stat-card',
    '.da-subject-card',
    '.da-live-card',
    '.da-routine-card',
    '.da-class-card',
    '.da-card',
    '.dashboard-card',
    '.profile-card',

    // General, Hero & Auth
    '.stat-card',
    '.stat-box',
    '.hero-stat-box',
    '.hero-video-box',
    '.interactive-box',
    '.ai-anim-box',
    '.auth-box',
    '.auth-card',
    '.login-card',
    '.step-card',
    '.pricing-card',
    '.plan-card',
    '.author-card'
  ].join(',');

  function setupScrollReveals() {
    const observer = getScrollObserver();
    if (!observer) return;

    // A. Text Elements: Reveal with subtle vertical fade & optional shimmer
    const headings = document.querySelectorAll(TEXT_SELECTORS);
    headings.forEach((el) => {
      if (el.closest('#home-hero-root') || el.classList.contains('no-reveal')) return;

      if (!el.classList.contains('reveal-visible') && !el.dataset.textAnimBound) {
        el.dataset.textAnimBound = 'true';
        el.classList.add('reveal-init');

        if (!el.classList.contains('no-shimmer') && !el.querySelector('.hero-gradient-text')) {
          if (el.tagName === 'H1' || el.classList.contains('section-title') || el.classList.contains('course-hero-title')) {
            el.classList.add('anim-text-shimmer');
          }
        }
        observer.observe(el);
      }
    });

    // B. Boxes & Cards: Outside-to-Inside Slide (Left, Right, Bottom)
    // "sob golo box and ja ase sobe animison and bahir take asbe and tar jaiga moto bose jabe"
    const boxes = document.querySelectorAll(BOX_SELECTORS);

    boxes.forEach((box, globalIdx) => {
      if (box.classList.contains('reveal-visible') || box.dataset.boxAnimBound) return;
      box.dataset.boxAnimBound = 'true';

      // 1. Determine incoming direction based on element context:
      let directionClass = 'reveal-up';

      if (box.classList.contains('dipu-feat-box-btn')) {
        // Feature buttons on the left glide in from the Left
        directionClass = 'reveal-left';
      } else if (box.classList.contains('dipu-feat-result-card') || box.classList.contains('trust-visual-card') || box.classList.contains('checkout-sticky-card')) {
        // Result panel and right sticky cards glide in from the Right
        directionClass = 'reveal-right';
      } else if (box.classList.contains('course-section-card') || box.classList.contains('routine-banner-card')) {
        // Big full-width section cards glide up from Bottom
        directionClass = 'reveal-up';
      } else {
        // In grids and card rails: Alternate Left, Bottom, Right
        const cycle = globalIdx % 3;
        if (cycle === 0) {
          directionClass = 'reveal-left';
        } else if (cycle === 1) {
          directionClass = 'reveal-up';
        } else {
          directionClass = 'reveal-right';
        }
      }

      box.classList.add(directionClass);

      // 2. Stagger delay based on sibling index within its parent container
      const parent = box.parentElement;
      if (parent) {
        const siblings = Array.from(parent.children).filter((c) => c.dataset.boxAnimBound);
        const sibIdx = siblings.indexOf(box);
        if (sibIdx >= 0) {
          const delaySec = ((sibIdx % 6) * 0.08).toFixed(2);
          box.style.transitionDelay = `${delaySec}s`;
        }
      }

      observer.observe(box);
    });

    // C. Footer Entrance: Smooth appearance
    const footer = document.querySelector('.master-footer');
    if (footer && !footer.classList.contains('footer-visible')) {
      const footerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              footer.classList.add('footer-visible');
              footerObserver.unobserve(footer);
            }
          });
        },
        { rootMargin: '100px 0px 0px 0px' }
      );
      footerObserver.observe(footer);
    }
  }

  // --- 3. MutationObserver for Dynamically Mounted React Components ---
  let mutationTimeout = null;

  function observeDynamicElements() {
    const observer = new MutationObserver((mutations) => {
      let shouldScan = false;
      for (const m of mutations) {
        if (m.addedNodes && m.addedNodes.length > 0) {
          shouldScan = true;
          break;
        }
      }
      if (shouldScan) {
        if (mutationTimeout) clearTimeout(mutationTimeout);
        mutationTimeout = setTimeout(() => {
          setupCardInteractions();
          setupScrollReveals();
          setupWordReveal();
        }, 50);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // --- 4. Word-by-Word Cascading Text Reveal Animation ---
  function setupWordReveal() {
    if (!('IntersectionObserver' in window)) return;

    const wordRevealEls = document.querySelectorAll('.word-reveal:not([data-wr-bound])');

    wordRevealEls.forEach((el) => {
      el.dataset.wrBound = 'true';
      if (el.querySelector('.wr-word')) return;

      const textContent = el.textContent.trim();
      if (!textContent) return;

      const words = textContent.split(/\s+/);
      el.innerHTML = words
        .map((word) => `<span class="wr-word">${word}</span>`)
        .join('');
    });

    const wrObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('wr-active');
            wrObserver.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -30px 0px',
        threshold: 0.1
      }
    );

    document.querySelectorAll('.word-reveal:not(.wr-active)').forEach((el) => {
      wrObserver.observe(el);
    });
  }

  // --- 5. Initialization ---
  function init() {
    setupCardInteractions();
    setupScrollReveals();
    setupWordReveal();
    observeDynamicElements();

    // Secondary scan after React hydration/rendering settle
    setTimeout(() => {
      setupCardInteractions();
      setupScrollReveals();
    }, 200);

    setTimeout(() => {
      setupCardInteractions();
      setupScrollReveals();
    }, 600);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
