(function () {
  var sectionIds = ['hero', 'about', 'skills', 'ai', 'projects', 'assistant', 'contact'];
  var topLinks = document.querySelectorAll('#toplinks a');
  var hamburger = document.getElementById('hamburger');
  var toplinks = document.getElementById('toplinks');

  // Mobile hamburger menu
  hamburger.addEventListener('click', function () {
    var isOpen = toplinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close mobile menu after choosing a link
  topLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      toplinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Active nav link highlighting on scroll
  function setActive(id) {
    topLinks.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + id);
    });
  }

  if ('IntersectionObserver' in window) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );
    sectionIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) navObserver.observe(el);
    });

    // Scroll-reveal fade-in
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('.reveal').forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: no IntersectionObserver support, just show everything
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
})();
