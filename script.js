/* ================================================
   SCRIPT.JS – AKHIN.GO Landing Page
   JavaScript sederhana tanpa library eksternal
   ================================================ */

/* ------------------------------------------------
   1. HAMBURGER MENU (Mobile)
   ------------------------------------------------
   Membuka dan menutup menu navigasi di mobile
   saat tombol hamburger diklik.
------------------------------------------------ */
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navMenu      = document.getElementById('navMenu');

if (hamburgerBtn && navMenu) {
  hamburgerBtn.addEventListener('click', function () {
    // Toggle class 'active' dan 'open'
    hamburgerBtn.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  // Tutup menu saat salah satu link diklik
  const navLinks = navMenu.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      hamburgerBtn.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });
}

/* ------------------------------------------------
   2. NAVBAR SCROLLED
   ------------------------------------------------
   Menambahkan class 'scrolled' ke navbar
   saat halaman discroll ke bawah.
------------------------------------------------ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function () {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ------------------------------------------------
   3. SMOOTH SCROLL (Navigasi ke Section)
   ------------------------------------------------
   Saat link navbar diklik, halaman akan
   bergulir mulus ke section yang dituju.
   (Didukung CSS scroll-behavior: smooth,
    tetapi ini sebagai fallback manual.)
------------------------------------------------ */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');

    // Abaikan jika hanya "#"
    if (targetId === '#') return;

    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      e.preventDefault();
      // Hitung posisi dengan offset untuk navbar
      const navbarHeight = navbar ? navbar.offsetHeight : 64;
      const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: targetPos,
        behavior: 'smooth'
      });
    }
  });
});

/* ------------------------------------------------
   4. ACTIVE NAV LINK saat Scroll
   ------------------------------------------------
   Menandai link navbar yang aktif sesuai
   section yang sedang terlihat di layar.
------------------------------------------------ */
const sections  = document.querySelectorAll('section[id]');
const allLinks  = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  const scrollPos = window.scrollY + 100; // Offset sedikit

  sections.forEach(function (section) {
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < bottom) {
      // Hapus semua active, lalu tambahkan ke link yang sesuai
      allLinks.forEach(function (link) {
        link.classList.remove('active');
      });
      const activeLink = document.querySelector('.nav-link[href="#' + id + '"]');
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}

window.addEventListener('scroll', updateActiveLink);

/* ------------------------------------------------
   5. ANIMASI FADE IN saat Scroll
   ------------------------------------------------
   Elemen dengan class 'fade-in' akan muncul
   dengan efek animasi saat terlihat di layar.
   Menggunakan IntersectionObserver API.
------------------------------------------------ */
const fadeElements = document.querySelectorAll('.fade-in');

// Buat observer untuk memantau elemen
const fadeObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      // Tambah class 'visible' saat elemen terlihat
      entry.target.classList.add('visible');
      // Hentikan pengamatan setelah animasi berjalan
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15, // Elemen terlihat 15% baru animasi berjalan
  rootMargin: '0px 0px -40px 0px'
});

// Daftarkan semua elemen fade-in ke observer
fadeElements.forEach(function (el) {
  fadeObserver.observe(el);
});

/* ------------------------------------------------
   6. PENANGANAN GAMBAR GAGAL DIMUAT
   ------------------------------------------------
   Jika gambar tidak bisa dimuat (broken link),
   tampilkan fallback yang sudah disiapkan di HTML.
   (Sebagian sudah ditangani via onerror di HTML,
    ini sebagai lapisan tambahan.)
------------------------------------------------ */
function handleBrokenImages() {
  const allImages = document.querySelectorAll('img');

  allImages.forEach(function (img) {
    img.addEventListener('error', function () {
      // Cari wrapper terdekat dan tambahkan class error
      const wrapper = this.closest(
        '.hero-img-wrapper, .solusi-img-wrapper, .tim-foto-wrapper, .img-error-wrapper'
      );
      if (wrapper) {
        wrapper.classList.add('img-error');
      }
      // Sembunyikan gambar yang error
      this.style.display = 'none';
    });
  });
}

// Jalankan fungsi saat DOM siap
handleBrokenImages();

/* ------------------------------------------------
   7. SIDEBAR BELAJAR.HTML (LMS Mini)
   ------------------------------------------------
   Navigasi sidebar untuk halaman belajar.html:
   - Buka/tutup sub-bab saat judul bab diklik
   - Tampilkan konten yang relevan
   - Toggle sidebar di mobile
------------------------------------------------ */

// Cek apakah elemen LMS ada (hanya berjalan di belajar.html)
const lmsSidebar = document.querySelector('.lms-sidebar');

if (lmsSidebar) {

  /* -- a. Toggle sub-bab saat judul bab diklik -- */
  const babTitles = document.querySelectorAll('.sidebar-bab-title');

  babTitles.forEach(function (title) {
    title.addEventListener('click', function () {
      const parentBab  = this.closest('.sidebar-bab');
      const subbabList = parentBab.querySelector('.sidebar-subbab');

      // Tutup semua sub-bab lain
      document.querySelectorAll('.sidebar-subbab').forEach(function (s) {
        s.classList.remove('open');
      });
      document.querySelectorAll('.sidebar-bab-title').forEach(function (t) {
        t.classList.remove('active');
      });

      // Buka sub-bab yang diklik (toggle)
      if (subbabList) {
        subbabList.classList.toggle('open');
        this.classList.toggle('active');
      }
    });
  });

  /* -- b. Tampilkan konten bab yang dipilih -- */
  const subbabLinks   = document.querySelectorAll('.sidebar-subbab a');
  const materiSections = document.querySelectorAll('.materi-section');

  subbabLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-target');

      // Sembunyikan semua section
      materiSections.forEach(function (sec) {
        sec.classList.remove('active');
      });

      // Tampilkan section yang sesuai
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add('active');
      }

      // Tandai link aktif
      subbabLinks.forEach(function (l) {
        l.classList.remove('active');
      });
      this.classList.add('active');

      // Scroll ke atas konten di mobile
      const lmsContent = document.querySelector('.lms-content');
      if (lmsContent && window.innerWidth <= 900) {
        lmsContent.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* -- c. Toggle sidebar di mobile -- */
  const sidebarToggleBtn = document.querySelector('.sidebar-toggle-mobile');

  if (sidebarToggleBtn) {
    sidebarToggleBtn.addEventListener('click', function () {
      lmsSidebar.classList.toggle('open');
      this.textContent = lmsSidebar.classList.contains('open')
        ? '✕ Tutup Menu'
        : '☰ Daftar Materi';
    });
  }

  /* -- d. Buka bab pertama secara otomatis -- */
  const firstBabTitle  = document.querySelector('.sidebar-bab-title');
  const firstSubbab    = document.querySelector('.sidebar-subbab');
  const firstSubLink   = document.querySelector('.sidebar-subbab a');
  const firstMateri    = document.querySelector('.materi-section');

  if (firstBabTitle)  firstBabTitle.classList.add('active');
  if (firstSubbab)    firstSubbab.classList.add('open');
  if (firstSubLink)   firstSubLink.classList.add('active');
  if (firstMateri)    firstMateri.classList.add('active');
}

/* ------------------------------------------------
   8. TAHUN OTOMATIS DI FOOTER (opsional)
   ------------------------------------------------
   Jika ada elemen dengan id "tahunSekarang",
   isi dengan tahun saat ini secara otomatis.
------------------------------------------------ */
const tahunEl = document.getElementById('tahunSekarang');
if (tahunEl) {
  tahunEl.textContent = new Date().getFullYear();
}