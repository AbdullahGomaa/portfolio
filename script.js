const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const links = document.querySelectorAll('.nav-links a');
const revealElements = document.querySelectorAll('.reveal');
const loader = document.getElementById('loader');

const closeMenu = () => {
  navLinks.classList.remove('is-open');
  navToggle.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
};

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

links.forEach((link) => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

const activateCurrentSection = () => {
  const fromTop = window.scrollY + 100;

  links.forEach((link) => {
    const section = document.querySelector(link.getAttribute('href'));
    if (!section) return;

    const isActive = section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop;
    link.classList.toggle('active', isActive);
  });
};

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add('is-visible');

    if (entry.target.classList.contains('skill-progress')) {
      const progressBars = entry.target.querySelectorAll('.progress-fill');
      progressBars.forEach((bar) => {
        bar.style.width = `${bar.dataset.progress || 0}%`;
      });
    }

    observer.unobserve(entry.target);
  });
}, { threshold: 0.15 });

revealElements.forEach((element) => revealObserver.observe(element));

window.addEventListener('scroll', activateCurrentSection, { passive: true });
window.addEventListener('load', () => {
  activateCurrentSection();
  if (loader) {
    loader.classList.add('loader--hidden');
  }
});
