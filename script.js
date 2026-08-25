// رابط نموذج التقديم الرسمي — يُحدَّث عند وصول الرابط
const APPLY_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdb4Q4NXcMnERyY6Mw8adtI8BINeuDI1sar7SyQTrjkjTXKfQ/viewform';

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

function openApply(event) {
  if (!APPLY_URL) return;

  event.preventDefault();
  window.open(APPLY_URL, '_blank', 'noopener,noreferrer');
}

document.querySelectorAll('.js-apply').forEach(link => {
  if (APPLY_URL) {
    link.setAttribute('href', APPLY_URL);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    link.addEventListener('click', openApply);
  }
});

const applyExternal = document.getElementById('applyExternal');
const applyNote = document.getElementById('applyNote');

if (applyExternal && !APPLY_URL && applyNote) {
  applyNote.hidden = false;
  applyExternal.addEventListener('click', (event) => {
    event.preventDefault();
    applyNote.hidden = false;
  });
}

// Side nav active state (index page only)
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.side-nav-links a[data-section]');

if (sections.length && navLinks.length) {
  function updateActiveNav() {
    const scrollY = window.scrollY + 150;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();
}

// Scroll reveal
const revealEls = document.querySelectorAll('.panel, .rows li');

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));
