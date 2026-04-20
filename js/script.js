// script.js - Ciência e Cultura Interactive Features

// Smooth scroll already handled by CSS html { scroll-behavior: smooth; }

// Fade-in animations on scroll using Intersection Observer
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

  // Observe all fade-in elements
  const fadeElements = document.querySelectorAll('.fade-in, .content-block, .sobre-container, .highlight-box');
  fadeElements.forEach(el => observer.observe(el));
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', function () {
    navMenu.classList.toggle('open');
  });
}

// Dropdown toggle por clique em todas as telas
document.querySelectorAll('.nav-dropdown').forEach(function (dropdown) {
  const link = dropdown.querySelector('.nav-link');
  if (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const isActive = dropdown.classList.contains('active');
      // Fecha todos os dropdowns abertos
      document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('active'));
      // Abre o clicado (se estava fechado)
      if (!isActive) dropdown.classList.add('active');
    });
  }
});

// Fechar menu e dropdown ao clicar fora
document.addEventListener('click', function (e) {
  if (!e.target.closest('.nav-dropdown')) {
    document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('active'));
  }
  if (navMenu && hamburger && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
    navMenu.classList.remove('open');
  }
});

// Carrossel de Registros
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
  indicators[currentRegistro].classList.add('active');

  const activeVideo = items[currentRegistro].querySelector('video');
  if (activeVideo) activeVideo.play();
}

function changeRegistros(dir) { showRegistros(currentRegistro + dir); }
function goRegistros(index) { showRegistros(index); }

// Carrossel de Imagens
let currentSlide = 0;

function showCarousel(index) {
  const items = document.querySelectorAll('.carousel-item');
  const indicators = document.querySelectorAll('.indicator');

  if (index >= items.length) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = items.length - 1;
  } else {
    currentSlide = index;
  }

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

function changeCarousel(direction) {
  showCarousel(currentSlide + direction);
}

function currentCarousel(index) {
  showCarousel(index);
}
