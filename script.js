document.documentElement.classList.add("js-ready");

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#primary-nav");
const navLinks = [...document.querySelectorAll(".primary-nav a")];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  nav.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
});

navLinks.forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  document.body.classList.remove("menu-open");
}));

const revealTargets = document.querySelectorAll(
  ".section-marker, .about-layout > *, .education-feature > *, .learning-row > *, .training-item, .foundation-note, .experience-entry, .project-card, .capability-card, .tools-row, .language-row, .recognition-layout > *, .contact-content > *"
);
revealTargets.forEach((element, index) => {
  element.dataset.reveal = "";
  if (index % 5 === 2) element.dataset.revealDelay = "1";
  if (index % 5 === 3) element.dataset.revealDelay = "2";
  if (index % 5 === 4) element.dataset.revealDelay = "3";
});

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  revealTargets.forEach((element) => observer.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add("is-visible"));
}

document.querySelector("[data-year]").textContent = new Date().getFullYear();

const copyButton = document.querySelector("[data-copy-email]");
const toast = document.querySelector(".contact-toast");
copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("wangxuhangabriel@outlook.com");
    toast.textContent = "Email copied to clipboard.";
  } catch {
    window.location.href = "mailto:wangxuhangabriel@outlook.com";
    toast.textContent = "Opening your email app.";
  }
  window.setTimeout(() => { toast.textContent = ""; }, 2600);
});
