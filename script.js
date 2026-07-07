const themeCss = document.getElementById("theme-css");
const themeToggle = document.getElementById("theme-toggle");
let theme = localStorage.getItem("theme") === "brutal" ? "brutal" : "glass";

const applyTheme = () => {
  themeCss.href = theme === "brutal" ? "./layout-brutal.css" : "./layout.css";
  themeToggle.textContent = theme === "brutal" ? "Glass" : "Brutal";
  localStorage.setItem("theme", theme);
};
applyTheme();

themeToggle.addEventListener("click", () => {
  theme = theme === "brutal" ? "glass" : "brutal";
  applyTheme();
});

const nav = document.querySelector("nav");
const scrollHint = document.querySelector(".scroll-hint");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = [...navLinks].map((a) => document.querySelector(a.hash));

const onScroll = () => {
  const scrolled = window.scrollY > 40;
  nav.classList.toggle("scrolled", scrolled);
  scrollHint.classList.toggle("hidden", scrolled);

  const probe = window.scrollY + window.innerHeight * 0.25;
  const atBottom =
    window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
  let current = null;
  for (const section of sections) {
    if (section.offsetTop <= probe) current = section;
  }
  if (atBottom) current = sections[sections.length - 1];
  navLinks.forEach((a) =>
    a.classList.toggle("active", !!current && a.hash === "#" + current.id)
  );
};
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll, { passive: true });
onScroll();

const moreTile = document.getElementById("show-older");
moreTile.addEventListener("click", () => {
  document.querySelectorAll(".card.older").forEach((el) => (el.hidden = false));
  moreTile.remove();
});

const reveals = document.querySelectorAll(".reveal");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
if ("IntersectionObserver" in window && !reduceMotion) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.1 }
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("visible"));
}
