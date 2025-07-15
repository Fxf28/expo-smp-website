// Toggle menu mobile
const mobileMenu = document.getElementById("mobileMenu");
const navLinks = document.getElementById("navLinks");

mobileMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  mobileMenu.textContent = navLinks.classList.contains("active") ? "✕" : "☰";
});

// Smooth scrolling untuk anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }

    // Tutup menu mobile jika terbuka
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      mobileMenu.textContent = "☰";
    }
  });
});

// Carousel testimoni
const testimonials = document.querySelectorAll(".testimonial");
const testimonialNav = document.getElementById("testimonialNav");
let currentTestimonial = 0;

// Buat titik navigasi
testimonials.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("testimonial-dot");
  if (index === 0) dot.classList.add("active");
  dot.addEventListener("click", () => showTestimonial(index));
  testimonialNav.appendChild(dot);
});

function showTestimonial(index) {
  // Sembunyikan semua testimoni
  testimonials.forEach((testimonial) => {
    testimonial.classList.remove("active");
  });

  // Tampilkan testimoni yang dipilih
  testimonials[index].classList.add("active");

  // Update titik navigasi
  const dots = document.querySelectorAll(".testimonial-dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  currentTestimonial = index;
}

// Auto-rotate testimoni setiap 5 detik
setInterval(() => {
  const nextTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(nextTestimonial);
}, 5000);

// Penanganan submit formulir
const submitBtn = document.getElementById("submitBtn");
const loadingText = document.getElementById("formLoading");

registrationForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Tampilkan loading & disable tombol
  submitBtn.disabled = true;
  submitBtn.textContent = "Mengirim...";
  loadingText.style.display = "block";

  const formData = {
    name: document.getElementById("name").value,
    grade: document.getElementById("grade").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    program: document.getElementById("program").value,
    experience: document.getElementById("experience").value,
    timestamp: new Date().toISOString(),
  };

  fetch("https://script.google.com/macros/s/AKfycbzz56GBxvbf-OVZJMqD7efEF4sYJkNpXayXtBiat4ASZC0Qv7yPx-sV8LsOrQvl5jMAWQ/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then(() => {
      alert("Pendaftaran berhasil! Data kamu sudah tercatat.");
      registrationForm.reset();
    })
    .catch((error) => {
      console.error("Gagal mengirim data:", error);
      alert("Maaf, terjadi kesalahan saat mengirim data.");
    })
    .finally(() => {
      // Sembunyikan loading & aktifkan tombol kembali
      submitBtn.disabled = false;
      submitBtn.textContent = "Daftar Sekarang";
      loadingText.style.display = "none";
    });
});

// Animasi saat elemen muncul di viewport
function animateOnScroll() {
  const elements = document.querySelectorAll(".feature-card, .program-card");

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    } else {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
    }
  });
}

// Terapkan style awal untuk animasi
document.querySelectorAll(".feature-card, .program-card").forEach((element) => {
  element.style.opacity = "0";
  element.style.transform = "translateY(20px)";
  element.style.transition = "all 0.6s ease";
});

// Dengarkan event scroll
window.addEventListener("scroll", animateOnScroll);

// Panggil awal untuk animasi elemen yang sudah terlihat
animateOnScroll();

// Efek parallax sederhana pada hero
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Animasi ketik untuk judul hero
const heroTitle = document.querySelector(".hero h1");
const originalText = heroTitle.textContent;
heroTitle.textContent = "";

let i = 0;
function typeWriter() {
  if (i < originalText.length) {
    heroTitle.textContent += originalText.charAt(i);
    i++;
    setTimeout(typeWriter, 50);
  }
}

// Mulai animasi ketik setelah halaman dimuat
window.addEventListener("load", () => {
  setTimeout(typeWriter, 1000);
});
