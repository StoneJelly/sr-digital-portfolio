// ===== NAVBAR SCROLL STATE =====
const navbar = document.getElementById('navbar');

function updateNavbar() {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
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
  mobileMenu.classList.toggle('active', open);
  document.body.classList.toggle('menu-open', open);
}

hamburger.addEventListener('click', () => {
  setMenu(hamburger.getAttribute('aria-expanded') !== 'true');
});

mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    hamburger.focus();
  }
});

// Close the mobile menu if the viewport grows to desktop size while it is open.
window.matchMedia('(min-width: 961px)').addEventListener('change', (e) => {
  if (e.matches) setMenu(false);
});

// ===== TIMETABLE: DAY TABS (MOBILE) =====
const tabList = document.querySelector('.tt-tabs');
const tabs = Array.from(document.querySelectorAll('.tt-tab'));
const panels = Array.from(document.querySelectorAll('.tt-day'));
const mobileQuery = window.matchMedia('(max-width: 960px)');

// Start on today's weekday (Date#getDay: 0 = Sunday).
let activeIndex = (new Date().getDay() + 6) % 7;

function selectTab(index, moveFocus) {
  activeIndex = index;
  tabs.forEach((tab, i) => {
    const selected = i === index;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    tab.classList.toggle('is-active', selected);
  });
  panels.forEach((panel, i) => {
    panel.classList.toggle('is-active', i === index);
  });
  if (moveFocus) tabs[index].focus();
}

function applyTimetableMode() {
  if (mobileQuery.matches) {
    tabList.setAttribute('role', 'tablist');
    tabs.forEach((tab) => tab.setAttribute('role', 'tab'));
    panels.forEach((panel) => {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', panel.dataset.tab);
    });
    selectTab(activeIndex, false);
  } else {
    // Desktop shows the full week grid, so drop the tab semantics.
    tabList.removeAttribute('role');
    tabs.forEach((tab) => {
      tab.removeAttribute('role');
      tab.removeAttribute('aria-selected');
    });
    panels.forEach((panel) => {
      panel.removeAttribute('role');
      panel.removeAttribute('aria-labelledby');
    });
  }
}

tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectTab(i, false));
  tab.addEventListener('keydown', (e) => {
    let next = null;
    if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
    if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = tabs.length - 1;
    if (next !== null) {
      e.preventDefault();
      selectTab(next, true);
    }
  });
});

mobileQuery.addEventListener('change', applyTimetableMode);
applyTimetableMode();

// ===== TIMETABLE: CLASS-TYPE FILTER =====
const chips = Array.from(document.querySelectorAll('.chip'));

// Each day gets a placeholder shown when the filter leaves it empty.
panels.forEach((panel) => {
  const empty = document.createElement('li');
  empty.className = 'tt-none';
  empty.textContent = 'No classes of this type';
  empty.hidden = true;
  panel.querySelector('.tt-list').appendChild(empty);
});

function applyFilter(type) {
  chips.forEach((chip) => {
    const active = chip.dataset.filter === type;
    chip.classList.toggle('is-active', active);
    chip.setAttribute('aria-pressed', String(active));
  });
  panels.forEach((panel) => {
    let visible = 0;
    panel.querySelectorAll('.tt-class').forEach((item) => {
      const show = type === 'all' || item.dataset.type === type;
      item.hidden = !show;
      if (show) visible += 1;
    });
    panel.querySelector('.tt-none').hidden = visible > 0;
  });
}

chips.forEach((chip) => {
  chip.addEventListener('click', () => applyFilter(chip.dataset.filter));
});

// ===== ENQUIRY FORM -> WHATSAPP =====
const form = document.getElementById('enquiryForm');
const formError = document.getElementById('formError');
const WHATSAPP_NUMBER = '60199403681';

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.elements.name.value.trim();
  if (!name) {
    formError.hidden = false;
    form.elements.name.setAttribute('aria-invalid', 'true');
    form.elements.name.focus();
    return;
  }
  formError.hidden = true;
  form.elements.name.removeAttribute('aria-invalid');

  const lines = [
    `Hi, I'm ${name} and I'd like to book a free trial class at Ironbloom Fitness Studio.`,
    `Goal: ${form.elements.goal.value}`,
    `Preferred time: ${form.elements.time.value}`,
  ];
  const note = form.elements.message.value.trim();
  if (note) lines.push(`Note: ${note}`);

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  window.open(url, '_blank', 'noopener');
});

// ===== SCROLL REVEAL =====
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealElements.forEach((el) => revealObserver.observe(el));
}

// ===== SMOOTH SCROLL FOR IN-PAGE LINKS =====
document.querySelectorAll('a[href^="#"]:not(.skip-link)').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href');
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight;
    window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
  });
});
