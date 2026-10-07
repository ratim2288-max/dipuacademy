/**
 * Dipu's Edu — Global Depus AI Style Text & Box Animation Engine
 * Features:
 *  - 3D Interactive Perspective Tilt on Cards/Boxes
 *  - Mouse Spotlight Cursor Reflection (--mouse-x, --mouse-y)
 *  - High-performance IntersectionObserver Scroll Reveals for Headings & Cards
 *  - Staggered Entrance Animations
 */

(function () {
  'use strict';

  // --- 1. Dynamic Mouse Spotlight & 3D Tilt on Cards ---
  const CARD_SELECTORS = [
    '.course-card',
    '.book-card',
    '.feature-card',
    '.stat-card',
    '.shop-stat-card',
    '.shop-category-card',
    '.category-card',
    '.exam-card',
    '.dashboard-card',
    '.pricing-card',
    '.plan-card',
    '.review-card',
    '.testimonial-card',
    '.step-card',
    '.interactive-box',
    '.mockup-pill-box',
    '.ai-anim-box'
  ].join(',');

  function setupCardInteractions(container) {
    const cards = (container || document).querySelectorAll(CARD_SELECTORS);

    cards.forEach((card) => {
      if (card.dataset.animInitialized) return;
      card.dataset.animInitialized = 'true';

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

        // Set CSS variables for radial gradient spotlight
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Calculate subtle 3D tilt (max 7 degrees)
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -5.5;
          const rotateY = ((x - centerX) / centerX) * 5.5;

          card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale3d(1.015, 1.015, 1.015)`;
        });
      });

      card.addEventListener('pointerleave', () => {
        isHovered = false;
        if (rafId) cancelAnimationFrame(rafId);
        card.style.transform = '';
      });
    });
  }

  // --- 2. Smooth Scroll-Triggered Reveal for Texts & Alternating Direction Boxes ---
  function setupScrollReveals() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.05
      }
    );

    // 1. Text elements: Headings, section titles, subtitles across all pages
    const textSelectors = [
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

    const headings = document.querySelectorAll(textSelectors);
    headings.forEach((el) => {
      // Skip anything inside the dedicated React home hero or elements marked no-reveal
      if (el.closest('#home-hero-root') || el.classList.contains('no-reveal')) return;

      if (!el.classList.contains('reveal-visible') && !el.dataset.textAnimBound) {
        el.dataset.textAnimBound = 'true';
        el.classList.add('reveal-init');
        // Add shimmering gradient only if not marked no-shimmer and has no nested gradient children
        if (!el.classList.contains('no-shimmer') && !el.querySelector('.hero-gradient-text')) {
          if (el.tagName === 'H1' || el.classList.contains('section-title') || el.classList.contains('course-hero-title')) {
            el.classList.add('anim-text-shimmer');
          }
        }
        observer.observe(el);
      }
    });

    // 2. Boxes & Cards: Slide in from alternating sides (Left, Right, Bottom)
    // "webstie a sobe box golo akek side teke asbe animison akare"
    const boxSelectors = [
      '.course-card',
      '.book-card',
      '.card',
      '.feature-card',
      '.feature-point-box',
      '.feature-item-box',
      '.stat-card',
      '.shop-stat-card',
      '.shop-category-card',
      '.category-card',
      '.exam-card',
      '.dashboard-card',
      '.pricing-card',
      '.plan-card',
      '.review-card',
      '.testimonial-card',
      '.step-card',
      '.interactive-box',
      '.chapter-accordion-item',
      '.checkout-sticky-card',
      '.content-section-card',
      '.course-section-card',
      '.faq-item',
      '.author-card',
      '.ai-anim-box'
    ].join(',');

    const boxes = document.querySelectorAll(boxSelectors);
    boxes.forEach((box, index) => {
      if (!box.classList.contains('reveal-visible') && !box.dataset.boxAnimBound) {
        box.dataset.boxAnimBound = 'true';

        // Alternate incoming direction based on index:
        // Even indices slide in from the Left, Odd indices slide in from the Right, multiples of 3 slide from Bottom
        const mod = index % 3;
        if (mod === 0) {
          box.classList.add('reveal-left');
        } else if (mod === 1) {
          box.classList.add('reveal-right');
        } else {
          box.classList.add('reveal-up');
        }

        const parent = box.parentElement;
        if (parent && (parent.classList.contains('grid') || parent.classList.contains('row') || parent.classList.contains('rail') || parent.classList.contains('features-grid') || parent.classList.contains('courses-grid') || parent.classList.contains('cards-grid'))) {
          parent.classList.add('reveal-stagger');
        }

        observer.observe(box);
      }
    });
  }

  // --- 3. MutationObserver to handle dynamically rendered React components ---
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
        setupCardInteractions();
        setupScrollReveals();
        setupWordReveal();
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

    // Select elements marked for word-by-word reveal
    const wordRevealEls = document.querySelectorAll('.word-reveal:not([data-wr-bound])');

    wordRevealEls.forEach((el) => {
      el.dataset.wrBound = 'true';

      // Skip if already processed (e.g. by React re-render)
      if (el.querySelector('.wr-word')) return;

      // Get text content, preserving any existing child structure
      const textContent = el.textContent.trim();
      if (!textContent) return;

      // Split into words and wrap each in a span
      const words = textContent.split(/\s+/);
      el.innerHTML = words
        .map((word) => `<span class="wr-word">${word}</span>`)
        .join('');
    });

    // IntersectionObserver to trigger word reveal when in view
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
