// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    menuBtn.classList.toggle("active");
  });
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      menuBtn.classList.remove("active");
    });
  });
}

// Back to top button
const topBtn = document.getElementById("topBtn");
if (topBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) topBtn.classList.add("show");
    else topBtn.classList.remove("show");
  });
  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ---- Scroll-reveal animation for cards, steps, pills etc. ----
const revealTargets = document.querySelectorAll(
  ".dest-card, .trip-card, .tour-item, .service-card, .feedback-card, .tl-card, .dp-card, " +
  ".process-step, .touch-card, .info-box, .vm-box > div, .pill, .ceo-portrait, .checklist li, " +
  ".contact-form-card, .follow-box, .map-box, .filters-sidebar, " +
  ".stats > div, .about-media, .about-copy"
);
if (revealTargets.length) {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-in");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealTargets.forEach((el, i) => {
    el.classList.add("reveal-pre");
    el.style.transitionDelay = (i % 4) * 0.08 + "s";
    revealObserver.observe(el);
  });
}

// ---- Section eyebrow (.trail) draws itself in on scroll ----
const trailTargets = document.querySelectorAll(".trail");
if (trailTargets.length) {
  const trailObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("trail-in");
          trailObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  trailTargets.forEach(el => trailObserver.observe(el));
}

// ---- Animated stat counters (10+, 18+, 500+, 100%) count up when scrolled into view ----
const statEls = document.querySelectorAll(".stats strong");
if (statEls.length) {
  const statObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const raw = el.textContent.trim();
        const numMatch = raw.match(/\d+/);
        if (!numMatch) return;
        const target = parseInt(numMatch[0], 10);
        const suffix = raw.replace(numMatch[0], "");
        const duration = 1200;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        statObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  statEls.forEach(el => statObserver.observe(el));
}

// Gallery filter active on scroll
const filterLinks = document.querySelectorAll('.filter-link');
const sections = document.querySelectorAll('.destination-group');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 160) {
      current = section.getAttribute('id');
    }
  });
  filterLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});