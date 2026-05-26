// script.js - Ciência e Cultura Interactive Features

// Smooth scroll already handled by CSS html { scroll-behavior: smooth; }

// ─── Sidebar toggle ───
const hamburger    = document.getElementById('hamburger');
const navbar       = document.querySelector('.navbar');
const overlay      = document.querySelector('.sidebar-overlay');
const sidebarClose = document.getElementById('sidebarClose');

function openSidebar() {
  navbar.classList.add('open');
  if (overlay) overlay.classList.add('active');
  if (hamburger) hamburger.classList.add('hidden');
  document.body.classList.add('sidebar-open');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  navbar.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
  if (hamburger) hamburger.classList.remove('hidden');
  document.body.classList.remove('sidebar-open');
  document.body.style.overflow = '';
}

if (sidebarClose) {
  sidebarClose.addEventListener('click', closeSidebar);
}

if (hamburger && navbar) {
  hamburger.addEventListener('click', function (e) {
    e.stopPropagation();
    if (navbar.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });
}

if (overlay) {
  overlay.addEventListener('click', closeSidebar);
}

// Fechar sidebar ao clicar em links de navegação (não no toggle do dropdown)
document.querySelectorAll('.nav-menu a').forEach(function (link) {
  link.addEventListener('click', function () {
    const isDropdownToggle = link.closest('.nav-dropdown') && !link.closest('.dropdown-menu');
    if (isDropdownToggle) return;
    closeSidebar();
  });
});

// ─── Dropdown toggle ───
document.querySelectorAll('.nav-dropdown').forEach(function (dropdown) {
  const link = dropdown.querySelector('.nav-link');
  if (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const isActive = dropdown.classList.contains('active');
      document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('active'));
      if (!isActive) dropdown.classList.add('active');
    });
  }
});

// Fechar dropdown ao clicar fora
document.addEventListener('click', function (e) {
  if (!e.target.closest('.nav-dropdown')) {
    document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('active'));
  }
});

// ─── Fade-in animations on scroll (Intersection Observer) ───
document.addEventListener('DOMContentLoaded', function () {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.style.transitionDelay = '0.2s';
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll('.fade-in, .content-block, .sobre-container, .highlight-box');
  fadeElements.forEach(el => observer.observe(el));
});

// ─── Carrossel de Registros ───
let currentRegistro = 0;

function showRegistros(index) {
  const items = document.querySelectorAll('.registros-item');
  const indicators = document.querySelectorAll('.registros-indicators .indicator');
  if (!items.length) return;

  if (index >= items.length) currentRegistro = 0;
  else if (index < 0) currentRegistro = items.length - 1;
  else currentRegistro = index;

  items.forEach(item => {
    item.classList.remove('active');
    const video = item.querySelector('video');
    if (video) { video.pause(); video.currentTime = 0; }
  });
  indicators.forEach(ind => ind.classList.remove('active'));
  items[currentRegistro].classList.add('active');
  if (indicators[currentRegistro]) indicators[currentRegistro].classList.add('active');

  const activeVideo = items[currentRegistro].querySelector('video');
  if (activeVideo) activeVideo.play();
}

function changeRegistros(dir) { showRegistros(currentRegistro + dir); }
function goRegistros(index)   { showRegistros(index); }

// ─── Carrossel de Imagens ───
let currentSlide = 0;

function showCarousel(index) {
  const items = document.querySelectorAll('.carousel-item');
  const indicators = document.querySelectorAll('.indicator');

  if (index >= items.length) currentSlide = 0;
  else if (index < 0)        currentSlide = items.length - 1;
  else                       currentSlide = index;

  items.forEach(item => {
    item.classList.remove('active');
    const video = item.querySelector('video');
    if (video) { video.pause(); video.currentTime = 0; }
  });
  indicators.forEach(ind => ind.classList.remove('active'));

  items[currentSlide].classList.add('active');
  indicators[currentSlide].classList.add('active');

  const activeVideo = items[currentSlide].querySelector('video');
  if (activeVideo) activeVideo.play();
}

function changeCarousel(direction) { showCarousel(currentSlide + direction); }
function currentCarousel(index)    { showCarousel(index); }
