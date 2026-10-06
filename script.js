document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     PRELOADER
  ========================= */

  const preloader = document.querySelector(".preloader");

  let preloaderHidden = false;

  function hidePreloader() {
    if (preloaderHidden) return;
    preloaderHidden = true;
    preloader.classList.add("hide");
  }

  // hide after the page loads (min 900ms so the logo is seen) ...
  window.addEventListener("load", () => setTimeout(hidePreloader, 900));

  // ... but never keep visitors waiting on slow mobile networks
  setTimeout(hidePreloader, 3500);


  /* =========================
     HEADER
  ========================= */

  const header = document.querySelector(".header");

  function handleHeader() {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleHeader, { passive: true });
  handleHeader();


  /* =========================
     MOBILE MENU
  ========================= */

  const menuBtn = document.querySelector(".menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-menu a");

  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("open");
    mobileMenu.classList.toggle("open");
    document.body.classList.toggle("no-scroll");
  });

  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("open");
      mobileMenu.classList.remove("open");
      document.body.classList.remove("no-scroll");
    });
  });


  window.addEventListener("resize", () => {
    if (window.innerWidth > 1000) {
      menuBtn.classList.remove("open");
      mobileMenu.classList.remove("open");
      document.body.classList.remove("no-scroll");
    }
  });


  /* =========================
     REVEAL ANIMATIONS
  ========================= */

  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  /* =========================
     PROJECT FILTER
  ========================= */

  const filters = document.querySelectorAll(".filter");
  const projects = document.querySelectorAll(".project");

  filters.forEach(filter => {

    filter.addEventListener("click", () => {

      filters.forEach(item => {
        item.classList.remove("active");
      });

      filter.classList.add("active");

      const category = filter.dataset.filter;

      projects.forEach(project => {

        const projectCategory = project.dataset.category;

        if (category === "all" || projectCategory === category) {
          project.classList.remove("hidden");
        } else {
          project.classList.add("hidden");
        }

      });

    });

  });


  /* =========================
     IMAGE LIGHTBOX
  ========================= */

  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = document.querySelector(".lightbox img");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxCategory = document.querySelector(".lightbox-caption span");
  const lightboxTitle = document.querySelector(".lightbox-caption strong");

  const expandButtons = document.querySelectorAll(".image-expand");

  expandButtons.forEach(button => {

    button.addEventListener("click", event => {

      event.preventDefault();
      event.stopPropagation();

      const project = button.closest(".project");
      const image = project.querySelector("img");

      const category = project.querySelector(".project-info span");
      const title = project.querySelector(".project-info h3");

      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;

      lightboxCategory.textContent = category.textContent;
      lightboxTitle.textContent = title.textContent;

      lightbox.classList.add("open");
      document.body.classList.add("no-scroll");

    });

  });


  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.classList.remove("no-scroll");

    setTimeout(() => {
      lightboxImage.src = "";
    }, 300);
  }

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });


  /* =========================
     SMOOTH ANCHOR OFFSET
  ========================= */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(event) {

      const targetId = this.getAttribute("href");

      if (targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const headerHeight = header.offsetHeight;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    });

  });


  /* =========================
     ACTIVE NAV
  ========================= */

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".desktop-nav a");

  const sectionObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        navLinks.forEach(link => {
          link.classList.remove("active");

          if (link.getAttribute("href") === `#${entry.target.id}`) {
            link.classList.add("active");
          }
        });

      });

    },
    {
      rootMargin: "-35% 0px -55% 0px"
    }
  );

  sections.forEach(section => {
    sectionObserver.observe(section);
  });


  /* =========================
     HERO PARALLAX
  ========================= */

  const heroImage = document.querySelector(".hero-image");

  window.addEventListener("scroll", () => {

    if (window.innerWidth > 700 && window.scrollY < window.innerHeight) {

      const movement = window.scrollY * 0.08;

      heroImage.style.translate = `0 ${movement}px`;

    }

  });


  /* =========================
     IMAGE LOAD FADE
  ========================= */

  document.querySelectorAll("img").forEach(image => {

    if (image.complete) {
      image.classList.add("loaded");
    } else {
      image.addEventListener("load", () => {
        image.classList.add("loaded");
      });
    }

  });

});