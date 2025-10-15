// Efek navbar transparan saat di-scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255,255,255,0.95)";
    navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  } else {
    navbar.style.background = "rgba(255,255,255,0.9)";
    navbar.style.boxShadow = "none";
  }
});
