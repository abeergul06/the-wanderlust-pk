// 1. COUNT UP ANIMATION FOR STATS
function animateCounter(el, target) {
  let count = 0;
  const speed = target / 100;
  const update = () => {
    count += speed;
    if(count < target) {
      el.innerText = Math.ceil(count) + "+";
      requestAnimationFrame(update);
    } else {
      el.innerText = target + "+";
    }
  };
  update();
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      const numbers = entry.target.querySelectorAll('strong');
      numbers.forEach(num => {
        const target = +num.innerText.replace(/\D/g, '');
        animateCounter(num, target);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, {threshold: 0.5});

const statsSection = document.querySelector('.stats');
if(statsSection) statsObserver.observe(statsSection);

// 2. TYPING ANIMATION FOR ABOUT SECTION
const aboutTitle = document.querySelector('.about-copy h2');
if(aboutTitle) {
  aboutTitle.classList.add('typing-title');
}

// 3. SCROLL REVEAL + ZOOM FOR IMAGES
const zoomElements = document.querySelectorAll('.about-media, .dest-card, .dp-card, .ceo-portrait');
zoomElements.forEach(el => el.classList.add('zoom-reveal'));

const zoomObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {threshold: 0.2});

zoomElements.forEach(el => zoomObserver.observe(el));