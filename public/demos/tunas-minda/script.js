// Tunas Minda Learning Centre - concept demo
// Vanilla JS: sticky nav, mobile menu, schedule filter, enquiry form -> WhatsApp.
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var WHATSAPP_NUMBER = '60199403681';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // ===== NAVBAR SHADOW ON SCROLL =====
  var navbar = document.getElementById('navbar');
  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ===== MOBILE MENU =====
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');

  function setMenu(open) {
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileMenu.hidden = !open;
    document.body.classList.toggle('menu-open', open);
  }

  hamburger.addEventListener('click', function () {
    setMenu(hamburger.getAttribute('aria-expanded') !== 'true');
  });

  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      setMenu(false);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      hamburger.focus();
    }
  });

  var desktopQuery = window.matchMedia('(min-width: 901px)');
  function onDesktopChange(e) {
    if (e.matches) setMenu(false);
  }
  if (desktopQuery.addEventListener) {
    desktopQuery.addEventListener('change', onDesktopChange);
  } else if (desktopQuery.addListener) {
    desktopQuery.addListener(onDesktopChange); // Safari < 14
  }

  // ===== SCROLL REVEAL =====
  var revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { observer.observe(el); });
  }

  // ===== SCHEDULE FILTER =====
  var filterBtns = document.querySelectorAll('.filter-btn');
  var rows = document.querySelectorAll('#scheduleBody tr');
  var scheduleCount = document.getElementById('scheduleCount');
  var levelNames = {
    all: 'all levels',
    primary: 'Primary',
    lower: 'Lower Secondary',
    upper: 'Upper Secondary (SPM)'
  };

  function applyFilter(level) {
    var shown = 0;
    rows.forEach(function (row) {
      var match = level === 'all' || row.getAttribute('data-level') === level;
      row.hidden = !match;
      if (match) shown++;
    });
    filterBtns.forEach(function (btn) {
      var active = btn.getAttribute('data-filter') === level;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    scheduleCount.textContent = level === 'all'
      ? 'Showing all ' + shown + ' weekly classes.'
      : 'Showing ' + shown + ' weekly classes for ' + levelNames[level] + '.';
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyFilter(btn.getAttribute('data-filter'));
    });
  });
  applyFilter('all');

  // ===== ENQUIRY FORM =====
  var form = document.getElementById('enquiryForm');
  var childName = document.getElementById('childName');
  var level = document.getElementById('level');
  var subjectsField = document.getElementById('subjectsField');
  var subjectsHint = document.getElementById('subjects-hint');
  var subjectLabels = subjectsField.querySelectorAll('.check');
  var parentName = document.getElementById('parentName');
  var parentPhone = document.getElementById('parentPhone');
  var notes = document.getElementById('notes');
  var success = document.getElementById('formSuccess');
  var waFallback = document.getElementById('waFallback');

  var levelLabels = {
    primary: 'Primary (Standard 1-6)',
    lower: 'Lower Secondary (Form 1-3)',
    upper: 'Upper Secondary / SPM (Form 4-5)'
  };

  function setError(field, message) {
    var errorId = field === subjectsField ? 'subjects-error' : field.id + '-error';
    document.getElementById(errorId).textContent = message;
    if (message) {
      field.setAttribute('aria-invalid', 'true');
    } else {
      field.removeAttribute('aria-invalid');
    }
  }

  function checkedSubjects() {
    return Array.prototype.slice
      .call(subjectsField.querySelectorAll('input[name="subjects"]:checked'))
      .filter(function (input) { return !input.closest('.check').hidden; })
      .map(function (input) { return input.value; });
  }

  // Show only the subjects offered for the selected level.
  function updateSubjectsForLevel() {
    var value = level.value;
    subjectLabels.forEach(function (label) {
      var levels = label.getAttribute('data-levels').split(' ');
      var available = !value || levels.indexOf(value) !== -1;
      label.hidden = !available;
      if (!available) label.querySelector('input').checked = false;
    });
    subjectsHint.textContent = value
      ? 'Tick one or more subjects.'
      : 'Choose a level to see the subjects offered for it.';
  }

  function normalisePhone(raw) {
    return raw.replace(/[\s\-().]/g, '');
  }

  // Accepts Malaysian mobile numbers: 01X-XXX XXXX (011 has 8 digits after the prefix),
  // with a leading 0, 60 or +60.
  function isValidPhone(raw) {
    return /^(\+?60|0)(11\d{8}|1[02-9]\d{7})$/.test(normalisePhone(raw));
  }

  function validateChildName() {
    var ok = childName.value.trim().length >= 2;
    setError(childName, ok ? '' : "Please enter your child's name.");
    return ok;
  }

  function validateLevel() {
    var ok = level.value !== '';
    setError(level, ok ? '' : 'Please choose a level.');
    return ok;
  }

  function validateSubjects() {
    var ok = checkedSubjects().length > 0;
    setError(subjectsField, ok ? '' : 'Please choose at least one subject.');
    return ok;
  }

  function validatePhone() {
    var value = parentPhone.value.trim();
    var message = '';
    if (!value) {
      message = 'Please enter a phone number so we can reply.';
    } else if (!isValidPhone(value)) {
      message = 'Please enter a valid Malaysian mobile number, e.g. 012-345 6789.';
    }
    setError(parentPhone, message);
    return !message;
  }

  function buildMessage() {
    var lines = [
      'Hi Tunas Minda, I would like to enquire about tuition / a free trial class.',
      '',
      "Child's name: " + childName.value.trim(),
      'Level: ' + levelLabels[level.value],
      'Subjects: ' + checkedSubjects().join(', ')
    ];
    if (parentName.value.trim()) lines.push("Parent's name: " + parentName.value.trim());
    lines.push("Parent's phone: " + parentPhone.value.trim());
    if (notes.value.trim()) lines.push('Notes: ' + notes.value.trim());
    return lines.join('\n');
  }

  level.addEventListener('change', function () {
    updateSubjectsForLevel();
    validateLevel();
    if (subjectsField.hasAttribute('aria-invalid')) validateSubjects();
  });

  childName.addEventListener('blur', validateChildName);
  parentPhone.addEventListener('blur', function () {
    if (parentPhone.value.trim()) validatePhone();
  });
  subjectsField.addEventListener('change', function () {
    if (subjectsField.hasAttribute('aria-invalid')) validateSubjects();
  });
  [childName, parentPhone].forEach(function (input) {
    input.addEventListener('input', function () {
      if (input.hasAttribute('aria-invalid')) {
        if (input === childName) validateChildName(); else validatePhone();
      }
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    success.hidden = true;

    var results = [validateChildName(), validateLevel(), validateSubjects(), validatePhone()];
    if (results.indexOf(false) !== -1) {
      var firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid === subjectsField) {
        var firstBox = subjectsField.querySelector('.check:not([hidden]) input');
        if (firstBox) firstBox.focus();
      } else if (firstInvalid) {
        firstInvalid.focus();
      }
      return;
    }

    var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(buildMessage());
    waFallback.href = url;
    success.hidden = false;
    window.open(url, '_blank', 'noopener');
    success.focus();
  });

  updateSubjectsForLevel();
})();
