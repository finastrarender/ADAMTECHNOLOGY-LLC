document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', (e) => {
        navLinks.classList.remove('open');
        const href = link.getAttribute('href') || '';

        if (href.endsWith('services.html') || href.endsWith('about.html') || href.endsWith('contact.html')) {
          e.preventDefault();
          window.location.href = href;
        }
      });
    });
  }

  const sections = document.querySelectorAll('section[id], header[id]');
  const navItems = document.querySelectorAll('.nav-links a');
  const hashNavItems = [...navItems].filter((item) => {
    const href = item.getAttribute('href') || '';
    return href.startsWith('#');
  });

  if (hashNavItems.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            hashNavItems.forEach((item) => {
              item.classList.toggle('active', item.getAttribute('href') === `#${entry.target.id}`);
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
  }
});
