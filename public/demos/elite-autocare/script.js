// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ===== SCROLL REveal =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    }
  });
});

// ===== BOOKING FORM → WHATSAPP =====
const bookingForm = document.getElementById('bookingForm');
bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(bookingForm);
  const name = formData.get('name');
  const phone = formData.get('phone');
  const vehicle = formData.get('vehicle');
  const service = formData.get('service');
  const date = formData.get('date');
  const message = formData.get('message');

  let whatsappMsg = `Hi Elite AutoCare, I'd like to request a service appointment.\n\n`;
  whatsappMsg += `*Name:* ${name}\n`;
  whatsappMsg += `*Phone:* ${phone}\n`;
  whatsappMsg += `*Vehicle:* ${vehicle}\n`;
  whatsappMsg += `*Service:* ${service}\n`;
  if (date) whatsappMsg += `*Preferred Date:* ${date}\n`;
  if (message) whatsappMsg += `*Message:* ${message}\n`;

  const encoded = encodeURIComponent(whatsappMsg);
  window.open(`https://wa.me/60199403681?text=${encoded}`, '_blank');
});
