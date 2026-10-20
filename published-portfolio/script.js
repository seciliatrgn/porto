"use strict";
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#nav");
function closeMenu(returnFocus = false) {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Open navigation");
  if (returnFocus) toggle.focus();
}
toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") !== "true";
  nav.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => closeMenu()));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && nav.classList.contains("open")) closeMenu(true);
});
document.addEventListener("click", event => {
  if (!event.target.closest(".header")) closeMenu();
});
const wideScreen = matchMedia("(min-width: 851px)");
wideScreen.addEventListener("change", event => { if (event.matches) closeMenu(); });
const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...nav.querySelectorAll('a[href^="#"]')];
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        const active = link.hash === "#" + entry.target.id;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-15% 0px -60% 0px", threshold: 0 });
  sections.forEach(section => observer.observe(section));
}
// Native details/summary keeps all case studies usable by keyboard and without JS.
