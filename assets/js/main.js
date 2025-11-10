/* =========================================
   SCROLL-SPY DENGAN INTERSECTION OBSERVER
   ========================================= */

// Kita menunggu sampai seluruh dokumen HTML dimuat
document.addEventListener("DOMContentLoaded", () => {
  // 1. Pilih semua 'section' yang ingin kita amati
  // Di HTML kita, ini adalah semua elemen dengan class 'konten-section'
  const sections = document.querySelectorAll(".konten-section");

  // 2. Pilih semua link navigasi di sidebar
  const navLinks = document.querySelectorAll(".navigasi-halaman a");

  if (sections.length === 0 || navLinks.length === 0) {
    console.log("Tidak menemukan section atau link navigasi untuk scroll-spy.");
    return;
  }

  // 3. Tentukan "pilihan" untuk observer kita
  const observerOptions = {
    root: null, // 'null' berarti mengamati relatif terhadap viewport browser

    // Ini adalah triknya:
    // Kita membuat 'margin' imajiner di dalam viewport.
    // '-20% 0px -80% 0px' berarti:
    // - 'active' akan terpicu saat section berada di 20% ATAS layar.
    // - Ini menciptakan "garis" pemicu imajiner.
    rootMargin: "-20% 0px -80% 0px",

    threshold: 0, // Memicu callback segera setelah piksel pertama masuk ke 'rootMargin'
  };

  // 4. Buat fungsi yang akan dijalankan setiap kali sebuah section 'terlihat'
  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      // entry.isIntersecting = boolean (apakah section terlihat?)
      if (entry.isIntersecting) {
        // Ambil 'id' dari section yang sedang terlihat (misal: "about", "experience")
        const id = entry.target.getAttribute("id");

        // --- UPDATE NAVIGASI ---

        // 1. Hapus class 'active' dari SEMUA link
        navLinks.forEach((link) => {
          link.classList.remove("active");
        });

        // 2. Tambahkan class 'active' hanya ke link yang TEPAT
        // Kita gunakan querySelector untuk mencari link yang 'href'-nya
        // cocok dengan ID section (misal: a[href="#about"])
        const activeLink = document.querySelector(`.navigasi-halaman a[href="#${id}"]`);

        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  };

  // 5. Buat observer baru
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // 6. Minta observer untuk 'mengamati' setiap section
  sections.forEach((section) => {
    observer.observe(section);
  });

  const spotlight = document.querySelector(".spotlight");

  // 2. Pastikan elemennya ada sebelum menjalankan
  if (spotlight) {
    // 3. Tambahkan listener untuk 'mousemove' di seluruh jendela
    window.addEventListener("mousemove", (e) => {
      // 4. Ambil posisi X dan Y kursor
      const x = e.clientX;
      const y = e.clientY;

      // 5. Perbarui style 'background-image' secara dinamis
      spotlight.style.backgroundImage = `
                radial-gradient(
                    600px circle at ${x}px ${y}px, 
                    var(--warna-aksen-transparan), 
                    transparent 40%
                )
            `;
    });
  }
});
