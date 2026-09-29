// Serai & Silk Beauty Studio — concept demo (vanilla JS, no dependencies)
document.documentElement.classList.add('js');

const WHATSAPP_NUMBER = '60199403681';
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ===== NAVBAR SCROLL STATE =====
const navbar = document.getElementById('navbar');

function updateNavbar() {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}

window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function setMenu(open) {
  hamburger.classList.toggle('active', open);
  hamburger.setAttribute('aria-expanded', String(open));
  hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  mobileMenu.hidden = !open;
  document.body.classList.toggle('menu-open', open);
}

hamburger.addEventListener('click', () => {
  setMenu(hamburger.getAttribute('aria-expanded') !== 'true');
});

mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !mobileMenu.hidden) {
    setMenu(false);
    hamburger.focus();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 860 && !mobileMenu.hidden) setMenu(false);
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealElements.forEach((el) => el.classList.add('visible'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach((el) => revealObserver.observe(el));
}

// ===== BEFORE / AFTER COMPARISON SLIDERS =====
document.querySelectorAll('.compare-frame').forEach((frame) => {
  const range = frame.querySelector('.compare-range');
  const update = () => {
    frame.style.setProperty('--pos', range.value + '%');
    range.setAttribute('aria-valuetext', range.value + '% before, ' + (100 - range.value) + '% after');
  };
  range.addEventListener('input', update);
  update();
});

// ===== BOOKING HELPER → WHATSAPP =====
const form = document.getElementById('bookingForm');
const serviceEl = document.getElementById('bkService');
const dateEl = document.getElementById('bkDate');
const timeEl = document.getElementById('bkTime');
const nameEl = document.getElementById('bkName');
const errorEl = document.getElementById('bkError');
const resultEl = document.getElementById('bkResult');

function toISODate(d) {
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return d.getFullYear() + '-' + mm + '-' + dd;
}

function parseISODate(value) {
  const [y, m, d] = value.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function formatTime(minutes) {
  const h24 = Math.floor(minutes / 60);
  const mins = String(minutes % 60).padStart(2, '0');
  const suffix = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return h12 + ':' + mins + ' ' + suffix;
}

// Opening hours: Tue–Fri 10:00–20:00, Sat–Sun 9:30–19:00, Mon closed.
// Last bookable slot is one hour before closing. Slots starting less than
// 30 minutes from now are hidden when the chosen date is today.
function slotsFor(date) {
  const day = date.getDay();
  if (day === 1) return [];
  const weekend = day === 0 || day === 6;
  const start = weekend ? 9 * 60 + 30 : 10 * 60;
  const lastSlot = weekend ? 18 * 60 : 19 * 60;
  const now = new Date();
  const earliest = toISODate(date) === toISODate(now)
    ? now.getHours() * 60 + now.getMinutes() + 30
    : 0;
  const slots = [];
  for (let t = start; t <= lastSlot; t += 30) {
    if (t >= earliest) slots.push(formatTime(t));
  }
  return slots;
}

// Recomputed on every use so a tab left open past midnight stays correct.
function refreshDateBounds() {
  const today = new Date();
  const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 60);
  dateEl.min = toISODate(today);
  dateEl.max = toISODate(maxDate);
}

function populateTimes() {
  refreshDateBounds();
  const previous = timeEl.value;
  // Before a date is picked, preview a regular weekday's slots.
  const date = dateEl.value ? parseISODate(dateEl.value) : new Date(2026, 0, 6);
  const slots = slotsFor(date);

  timeEl.length = 1; // keep the placeholder option
  slots.forEach((label) => timeEl.add(new Option(label, label)));
  timeEl.disabled = slots.length === 0;
  let placeholder = 'Select a time';
  if (!slots.length) placeholder = date.getDay() === 1 ? 'Closed on Mondays' : 'No slots left today';
  timeEl.options[0].textContent = placeholder;
  if (slots.includes(previous)) timeEl.value = previous;
}

populateTimes();

function showError(message, field) {
  [serviceEl, dateEl, timeEl].forEach((el) => el.removeAttribute('aria-invalid'));
  errorEl.textContent = message;
  if (field) {
    field.setAttribute('aria-invalid', 'true');
    field.focus();
  }
}

dateEl.addEventListener('change', () => {
  populateTimes();
  if (dateEl.value && parseISODate(dateEl.value).getDay() === 1) {
    showError('We are closed on Mondays — please choose another day.', dateEl);
  } else {
    showError('');
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  resultEl.textContent = '';

  if (!serviceEl.value) return showError('Please choose a service.', serviceEl);
  if (!dateEl.value) return showError('Please choose a preferred date.', dateEl);

  populateTimes(); // refresh date bounds and drop slots that have passed
  const chosen = parseISODate(dateEl.value);
  if (dateEl.value < dateEl.min || dateEl.value > dateEl.max) {
    return showError('Please choose a date within the next 60 days.', dateEl);
  }
  if (chosen.getDay() === 1) {
    return showError('We are closed on Mondays — please choose another day.', dateEl);
  }
  if (!timeEl.value) return showError('Please choose a preferred time.', timeEl);
  showError('');

  const niceDate = chosen.toLocaleDateString('en-MY', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });
  const name = nameEl.value.trim();

  const lines = [
    'Hi, I\'d like to book an appointment at Serai & Silk.',
    '',
    'Service: ' + serviceEl.value,
    'Preferred date: ' + niceDate,
    'Preferred time: ' + timeEl.value
  ];
  if (name) lines.push('Name: ' + name);
  lines.push('', 'Is this slot available?');

  const url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
  // Note: with 'noopener' window.open() always returns null, so we don't inspect it.
  window.open(url, '_blank', 'noopener');

  resultEl.append("Your message is ready in WhatsApp. Didn't open? ");
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener';
  link.textContent = 'Tap here to open WhatsApp';
  resultEl.append(link);
});
