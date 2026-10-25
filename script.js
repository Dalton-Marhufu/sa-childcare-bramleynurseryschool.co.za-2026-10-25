// Bramley Nursery School — redesign interactions
(function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // Current year
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Sticky header shadow on scroll
  var header = document.querySelector('.site-header');
  window.addEventListener('scroll', function () {
    if (!header) return;
    header.style.boxShadow = window.scrollY > 10 ? '0 10px 30px -18px rgba(20,40,30,.4)' : 'none';
  });

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.card, .gallery img, .about__media, .enrichment__media, .trust');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity .6s ease, transform .6s ease';
      io.observe(el);
    });
  }

  // Lightbox for gallery
  var galleryImgs = document.querySelectorAll('.gallery img');
  galleryImgs.forEach(function (img) {
    img.addEventListener('click', function () {
      var overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(10,15,12,.92);display:flex;align-items:center;justify-content:center;z-index:999;padding:24px;cursor:zoom-out';
      var big = document.createElement('img');
      big.src = img.src;
      big.style.cssText = 'max-width:92vw;max-height:88vh;border-radius:14px;box-shadow:0 30px 80px -20px rgba(0,0,0,.7)';
      overlay.appendChild(big);
      overlay.addEventListener('click', function () { document.body.removeChild(overlay); });
      document.body.appendChild(overlay);
    });
  });
})();

// Contact form (demo handler — replace with real endpoint on launch)
function handleSubmit(e) {
  e.preventDefault();
  var note = document.getElementById('formNote');
  if (note) {
    note.textContent = 'Thank you! Your message has been noted — we\u2019ll be in touch shortly.';
  }
  e.target.reset();
  return false;
}
