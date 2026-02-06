// Smooth scroll
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Typing effect
const text = "Web Developer · Networking · UI Design";
let index = 0;

function typeEffect() {
  if (index < text.length) {
    document.getElementById("typing").textContent += text.charAt(index);
    index++;
    setTimeout(typeEffect, 70);
  }
}

// Theme toggle
function toggleTheme() {
  document.body.classList.toggle("light");

  const isLight = document.body.classList.contains("light");
  document.querySelector(".theme-toggle").textContent = isLight ? "☀️" : "🌙";

  localStorage.setItem("theme", isLight ? "light" : "dark");
}

// Load saved theme
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
  document.querySelector(".theme-toggle").textContent = "☀️";
}

// GSAP animations
gsap.registerPlugin(ScrollTrigger);

// ACTIVE NAV INDICATOR
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

function activateNav() {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 160;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", activateNav);

// On load
window.onload = () => {
  typeEffect();

  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
  }

  // HERO ANIMATION
  gsap.from(".hero-image", {
    opacity: 0,
    y: 80,
    duration: 1.2,
    ease: "power4.out"
  });

  gsap.from(".hero-text > *", {
    opacity: 0,
    y: 30,
    duration: 0.9,
    stagger: 0.15,
    delay: 0.3,
    ease: "power3.out"
  });

  // SECTION SCROLL ANIMATIONS
  document.querySelectorAll("section").forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
      },
      opacity: 0,
      y: 60,
      duration: 1,
      ease: "power3.out"
    });
  });
};
