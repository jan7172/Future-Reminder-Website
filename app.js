/* ============================================
   Future Reminder — app.js
   Language detection, i18n, theme toggle
   Storage key: "lang" (Future Reminder language)
   ============================================ */

const LANG_KEY = 'lang';
const THEME_KEY = 'theme';

let translations = {};
let currentLang = 'en';

// ── Load translations ──
async function loadTranslations() {
  const res = await fetch('translations.json');
  translations = await res.json();
}

// ── Detect language ──
function detectLanguage() {
  const saved = localStorage.getItem(LANG_KEY);
  if (saved && ['en', 'de'].includes(saved)) return saved;
  const browser = navigator.language || navigator.userLanguage || 'en';
  if (browser.startsWith('de')) return 'de';
  return 'en';
}

// ── Apply translations to DOM ──
function applyTranslations(lang) {
  currentLang = lang;
  const t = translations[lang];
  if (!t) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = getNestedValue(t, key);
    if (value !== undefined) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = value;
      } else {
        el.textContent = value;
      }
    }
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  document.documentElement.lang = lang;
  localStorage.setItem(LANG_KEY, lang);
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => acc && acc[key], obj);
}

// ── Switch language ──
function switchLang(lang) {
  applyTranslations(lang);
}

// ── Theme ──
function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  setTheme(theme);
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
}

// ── Scroll animations ──
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ── Nav scroll effect ──
function initNavScroll() {
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.style.borderBottomColor = window.scrollY > 10
      ? 'var(--nav-border)'
      : 'transparent';
  }, { passive: true });
}

// ── Init ──
document.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  await loadTranslations();
  const lang = detectLanguage();
  applyTranslations(lang);
  initScrollAnimations();
  initNavScroll();

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => switchLang(btn.dataset.lang));
  });

  document.querySelector('.theme-toggle')?.addEventListener('click', toggleTheme);
});