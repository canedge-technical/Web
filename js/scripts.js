document.addEventListener("DOMContentLoaded", () => {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const navLinks = document.querySelector(".nav-links");
    const dropdowns = document.querySelectorAll(".dropdown");
  
    // Toggle entire nav (mobile)
    function toggleMenu() {
      const isOpen = navLinks.classList.contains("show");
      if (isOpen) {
        navLinks.classList.remove("show");
        hamburgerMenu.setAttribute("aria-expanded", "false");
      } else {
        navLinks.classList.add("show");
        hamburgerMenu.setAttribute("aria-expanded", "true");
      }
    }
  
    // Hamburger click
    hamburgerMenu.addEventListener("click", toggleMenu);
  
    // Keyboard accessibility for hamburger
    hamburgerMenu.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleMenu();
      }
    });
  
    // ESC key closes mobile menu if open
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navLinks.classList.contains("show")) {
        navLinks.classList.remove("show");
        hamburgerMenu.setAttribute("aria-expanded", "false");
      }
    });
  
    // DROPDOWN toggles on mobile only (on desktop, we do hover in CSS)
    dropdowns.forEach((dropdown) => {
      const trigger = dropdown.querySelector("a");
      const dropdownContent = dropdown.querySelector(".dropdown-content");
  
      trigger.addEventListener("click", (e) => {
        // If screen is mobile
        if (window.innerWidth <= 768) {
          e.preventDefault();
          // Close other submenus
          dropdowns.forEach((other) => {
            if (other !== dropdown) {
              other.classList.remove("active");
              const otherContent = other.querySelector(".dropdown-content");
              if (otherContent) {
                otherContent.style.display = "none";
              }
            }
          });
          // Toggle this one
          if (dropdown.classList.contains("active")) {
            dropdown.classList.remove("active");
            dropdownContent.style.display = "none";
          } else {
            dropdown.classList.add("active");
            dropdownContent.style.display = "block";
          }
        }
      });
    });
  
    // SLIDESHOW (News Section)
    let slideIndex = 1;
    showSlides(slideIndex);
  
    // Next/previous controls
    window.plusSlides = function(n) {
      showSlides(slideIndex += n);
    };
  
    // Dot controls
    window.currentSlide = function(n) {
      showSlides(slideIndex = n);
    };
  
    function showSlides(n) {
      const slides = document.getElementsByClassName("news-slide");
      const dots = document.getElementsByClassName("dot");
      if (n > slides.length) { slideIndex = 1; }
      if (n < 1) { slideIndex = slides.length; }
  
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
  
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
    }
  
    // Auto-cycle slides every 20 seconds
    setInterval(() => {
      plusSlides(1);
    }, 20000);
  });
  