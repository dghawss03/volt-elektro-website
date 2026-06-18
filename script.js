document.addEventListener('DOMContentLoaded', function () {

  // ── Header scroll ──
  var header = document.getElementById('header');

  function updateHeader() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // ── Mobile menu ──
  var toggle = document.getElementById('menu-toggle');
  var nav = document.getElementById('nav');

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('open');
    toggle.classList.toggle('active');
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  var navLinks = nav.querySelectorAll('.nav-link, .nav-cta');
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', function () {
      nav.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  }

  // ── Scroll animations ──
  var fadeElements = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      for (var j = 0; j < entries.length; j++) {
        if (entries[j].isIntersecting) {
          entries[j].target.classList.add('visible');
          observer.unobserve(entries[j].target);
        }
      }
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    for (var k = 0; k < fadeElements.length; k++) {
      observer.observe(fadeElements[k]);
    }
  } else {
    for (var l = 0; l < fadeElements.length; l++) {
      fadeElements[l].classList.add('visible');
    }
  }

  // ── Cookie banner ──
  var banner = document.getElementById('cookie-banner');
  var acceptBtn = document.getElementById('cookie-accept');
  var declineBtn = document.getElementById('cookie-decline');

  function hideBanner() {
    banner.classList.remove('visible');
  }

  if (!localStorage.getItem('cookie-consent')) {
    setTimeout(function () {
      banner.classList.add('visible');
    }, 1200);
  }

  acceptBtn.addEventListener('click', function () {
    localStorage.setItem('cookie-consent', 'accepted');
    hideBanner();
  });

  declineBtn.addEventListener('click', function () {
    localStorage.setItem('cookie-consent', 'declined');
    hideBanner();
  });
});
