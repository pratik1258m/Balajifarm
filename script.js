// Initialize Year
document.getElementById('year').textContent = new Date().getFullYear();

// Force scroll to top on refresh and handle history restoration
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

    // Mobile CTA Bar visibility
    const mobileCtaBar = document.getElementById('mobile-cta-bar');
    window.addEventListener('scroll', () => {
      if (mobileCtaBar && window.innerWidth < 768) {
        if (window.scrollY > 800) {
          mobileCtaBar.classList.remove('translate-y-full');
        } else {
          mobileCtaBar.classList.add('translate-y-full');
        }
      }
    });

    // Navbar + Section refs
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      lerp: 0.1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Glightbox Initialization
    const lightbox = GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
      autoplayVideos: true,
      zoomable: true,
      draggable: true
    });

    // RAF Loop — Lenis only, nothing else inside
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Navbar + Active Link on Scroll
    lenis.on('scroll', () => {
      if (window.scrollY > 80) {
        navbar.classList.add('nav-glass', 'text-forest-dark', 'py-4');
        navbar.classList.remove('text-white', 'py-6');
        const navLogo = document.getElementById('nav-logo');
        if (navLogo) navLogo.classList.remove('brightness-0', 'invert');
      } else {
        navbar.classList.remove('nav-glass', 'text-forest-dark', 'py-4');
        navbar.classList.add('text-white', 'py-6');
        const navLogo = document.getElementById('nav-logo');
        if (navLogo) navLogo.classList.add('brightness-0', 'invert');
      }

      let current = '';
      sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('text-gold');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('text-gold');
        }
      });
    });


    // Mobile Menu
    const mobileBtn = document.getElementById('mobile-btn');
    const closeBtn = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
      document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
      mobileMenu.classList.add('opacity-0', 'pointer-events-none');
      document.body.style.overflow = '';
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('opacity-0', 'pointer-events-none');
        document.body.style.overflow = '';
      });
    });

    // Scroll Reveal — IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
      observer.observe(el);
    });

    // FAQ Accordion
    function toggleFaq(button) {
      const item = button.parentElement;
      const isActive = item.classList.contains('faq-active');
      document.querySelectorAll('.faq-item').forEach(faq => faq.classList.remove('faq-active'));
      if (!isActive) item.classList.add('faq-active');
    }

    // Smooth Anchor Scroll via Lenis
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          lenis.scrollTo(target, {
            offset: -80,
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });
        }
      });
    });

    // Hero Parallax — performance optimized
    const heroImage = document.querySelector('.hero-zoom');
    if (heroImage) {
      lenis.on('scroll', ({ scroll }) => {
        heroImage.style.transform = `translate3d(0, ${scroll * 0.15}px, 0) scale(${1.1 + scroll * 0.0003})`;
      });
    }

    
function filterProducts(category) {
  const items = document.querySelectorAll('.product-item');
  items.forEach(item => {
    if (category === 'all' || item.dataset.category === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// Code audit check: Verified event bindings on 2026-05-03
