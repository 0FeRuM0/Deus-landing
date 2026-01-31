(function () {
  const burger = document.getElementById("burger");
  const menu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("menuOverlay");

  // year
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  function lockScroll(lock) {
    document.documentElement.classList.toggle("no-scroll", lock);
    document.body.classList.toggle("no-scroll", lock);
  }

  function closeMenu() {
    if (!menu || !overlay || !burger) return;
    menu.hidden = true;
    overlay.hidden = true;
    burger.setAttribute("aria-expanded", "false");
    lockScroll(false);
  }

  function openMenu() {
    if (!menu || !overlay || !burger) return;
    menu.hidden = false;
    overlay.hidden = false;
    burger.setAttribute("aria-expanded", "true");
    lockScroll(true);
  }

  function toggleMenu() {
    if (!menu) return;
    if (menu.hidden) openMenu();
    else closeMenu();
  }

  burger?.addEventListener("click", toggleMenu);
  overlay?.addEventListener("click", closeMenu);

  // close on ESC
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // close on nav click + smooth scroll
  menu?.querySelectorAll("a[href^='#']").forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href) return;

      // close first for nicer UX
      closeMenu();

      // smooth scroll
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", href);
      }
    });
  });

  // desktop smooth scroll too
  document.querySelectorAll(".nav a[href^='#']").forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href) return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", href);
      }
    });
  });

  // contact form mock
  const contactForm = document.getElementById("contactForm");
  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Спасибо! Сообщение отправлено (mock).");
    contactForm.reset();
  });
})();
