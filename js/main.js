const typedElement = document.getElementById("typed");
const typerWords = ["AI.", "cybersecurity.", "self-hosting.", "Linux."];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const word = typerWords[wordIndex];
  typedElement.textContent = word.slice(0, charIndex);

  if (!deleting && charIndex < word.length) {
    charIndex++;
    setTimeout(typeLoop, 90);
  } else if (!deleting && charIndex === word.length) {
    deleting = true;
    setTimeout(typeLoop, 1600);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeLoop, 50);
  } else {
    deleting = false;
    wordIndex = (wordIndex + 1) % typerWords.length;
    setTimeout(typeLoop, 400);
  }
}

const cursor = document.createElement("span");
cursor.className = "typed-cursor";
cursor.textContent = "|";
typedElement.insertAdjacentElement("afterend", cursor);
typeLoop();

const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open);
  const spans = navToggle.querySelectorAll("span");
  spans.forEach((span, i) => {
    span.style.opacity = i === (open ? 0 : 1) ? span.style.opacity : (open && i === 1 ? 0 : 1);
  });
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
} else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
  document.documentElement.setAttribute("data-theme", "light");
}

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "light" ? "" : "light";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".section-title, .skill-card, .project-card, .about-card, .hero-actions").forEach((el) => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");

const scrollSpy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active"));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add("active");
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);

sections.forEach((section) => scrollSpy.observe(section));

document.getElementById("year").textContent = new Date().getFullYear();