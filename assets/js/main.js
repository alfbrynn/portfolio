// Efek navbar saat scroll
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");
  if (!nav) return;
  if (window.scrollY > 30) {
    nav.style.backdropFilter = "blur(5px)";
    nav.style.boxShadow = "0 4px 14px rgba(0,0,0,0.08)";
  } else {
    nav.style.backdropFilter = "none";
    nav.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
  }
});
