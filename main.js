// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // ===== PRELOADER =====
  window.addEventListener("load", function () {
    const preloader = document.querySelector(".preloader");
    setTimeout(function () {
      preloader.classList.add("hide");
    }, 800);
  });

  // ===== HEADER SCROLL EFFECT =====
  const header = document.querySelector(".header");
  const headerHeight = header.offsetHeight;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // ===== MOBILE MENU TOGGLE =====
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("show");
      const icon = this.querySelector("i");
      if (icon.classList.contains("fa-bars")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });

    // Close mobile menu when clicking on a nav item
    const navLinks = document.querySelectorAll(".nav-menu a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        navMenu.classList.remove("show");
        const icon = menuToggle.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      });
    });
  }

  // ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Update active menu item
        document.querySelectorAll(".nav-menu a").forEach((navLink) => {
          navLink.classList.remove("active");
        });

        this.classList.add("active");
      }
    });
  });

  // ===== UPDATE ACTIVE MENU ITEM ON SCROLL =====
  const sections = document.querySelectorAll("section[id]");
  const navLinksAll = document.querySelectorAll('.nav-menu a[href^="#"]');

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - headerHeight - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinksAll.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });

    // Set home as active if at the top
    if (window.scrollY < 200) {
      navLinksAll.forEach((link) => link.classList.remove("active"));
      const homeLink = document.querySelector('.nav-menu a[href="#home"]');
      if (homeLink) homeLink.classList.add("active");
    }
  });

  // ===== SKILLS TABS FUNCTIONALITY =====
  const skillTabs = document.querySelectorAll(".skill-tab");
  const skillContents = document.querySelectorAll(".skill-content");

  skillTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab");

      // Remove active class from all tabs and contents
      skillTabs.forEach((t) => t.classList.remove("active"));
      skillContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked tab and corresponding content
      this.classList.add("active");
      const targetContent = document.getElementById(`${targetTab}-skills`);
      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  });

  // ===== PROJECTS FILTER FUNCTIONALITY =====
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filterValue = this.getAttribute("data-filter");

      // Remove active class from all filter buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Filter projects
      projectItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category");

        if (filterValue === "all" || itemCategory === filterValue) {
          item.style.display = "block";
          item.style.animation = "fadeIn 0.5s ease-in-out";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // ===== SKILL PROGRESS BARS ANIMATION =====
  const animateSkillBars = () => {
    const skillBars = document.querySelectorAll(".skill-progress");

    skillBars.forEach((bar) => {
      const rect = bar.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible && !bar.classList.contains("animated")) {
        const width = bar.style.width;
        bar.style.width = "0%";
        bar.classList.add("animated");

        setTimeout(() => {
          bar.style.width = width;
          bar.style.transition = "width 2s ease-in-out";
        }, 100);
      }
    });
  };

  // ===== SCROLL ANIMATIONS =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.8s ease-out forwards";

        // Animate skill bars when skills section is visible
        if (entry.target.classList.contains("skills-section")) {
          setTimeout(animateSkillBars, 300);
        }
      }
    });
  }, observerOptions);

  // Observe all sections for scroll animations
  sections.forEach((section) => {
    observer.observe(section);
  });

  // ===== BACK TO TOP BUTTON =====
  const backToTop = document.querySelector(".back-to-top");

  if (backToTop) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    });

    backToTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ===== CONTACT FORM HANDLING =====
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const name = formData.get("name");
      const email = formData.get("email");
      const subject = formData.get("subject");
      const message = formData.get("message");

      // Simple validation
      if (!name || !email || !subject || !message) {
        showNotification("Please fill in all fields", "error");
        return;
      }

      if (!isValidEmail(email)) {
        showNotification("Please enter a valid email address", "error");
        return;
      }

      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      setTimeout(() => {
        // Reset form
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        showNotification(
          "Message sent successfully! I'll get back to you soon.",
          "success"
        );
      }, 2000);
    });
  }

  // ===== UTILITY FUNCTIONS =====

  // Email validation
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Show notification
  function showNotification(message, type = "info") {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll(".notification");
    existingNotifications.forEach((notification) => notification.remove());

    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style the notification
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;

    // Set background color based on type
    switch (type) {
      case "success":
        notification.style.backgroundColor = "#22c55e";
        break;
      case "error":
        notification.style.backgroundColor = "#ef4444";
        break;
      case "warning":
        notification.style.backgroundColor = "#eab308";
        break;
      default:
        notification.style.backgroundColor = "#3b82f6";
    }

    // Add to DOM
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 5000);
  }

  // ===== TYPING EFFECT FOR HERO SECTION =====
  const heroSubtitle = document.querySelector(".hero-text h2");
  if (heroSubtitle) {
    const titles = [
      "Senior .NET Full Stack Developer",
      "Cloud Solutions Architect",
      "Microservices Expert",
      "Azure & AWS Specialist",
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentTitle = titles[titleIndex];

      if (isDeleting) {
        heroSubtitle.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
      } else {
        heroSubtitle.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentTitle.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 500; // Pause before next title
      }

      setTimeout(typeEffect, typeSpeed);
    }

    // Start typing effect after a delay
    setTimeout(typeEffect, 1000);
  }

  // ===== PARALLAX EFFECT FOR HERO SHAPES =====
  const heroShapes = document.querySelectorAll(".hero-shapes .shape");

  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;

    heroShapes.forEach((shape, index) => {
      const speed = parallaxSpeed * (index + 1);
      shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // ===== PROJECT CARD TILT EFFECT =====
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    });
  });

  // ===== ANIMATE TIMELINE ITEMS =====
  const timelineItems = document.querySelectorAll(".timeline-item");

  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "slideInLeft 0.6s ease-out forwards";
        }
      });
    },
    { threshold: 0.2 }
  );

  timelineItems.forEach((item) => {
    timelineObserver.observe(item);
  });

  // ===== ADD CUSTOM CSS ANIMATIONS =====
  const style = document.createElement("style");
  style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .project-card {
            transition: transform 0.3s ease;
        }
        
        .skill-progress {
            transition: width 2s ease-in-out;
        }
    `;
  document.head.appendChild(style);

  // ===== INITIALIZE GSAP ANIMATIONS (if GSAP is loaded) =====
  if (typeof gsap !== "undefined") {
    // Hero section animations
    gsap.from(".hero-text h1", {
      duration: 1,
      y: 50,
      opacity: 0,
      delay: 0.2,
    });

    gsap.from(".hero-text h2", {
      duration: 1,
      y: 30,
      opacity: 0,
      delay: 0.4,
    });

    gsap.from(".hero-text p", {
      duration: 1,
      y: 30,
      opacity: 0,
      delay: 0.6,
    });

    gsap.from(".hero-buttons", {
      duration: 1,
      y: 30,
      opacity: 0,
      delay: 0.8,
    });

    gsap.from(".developer-card", {
      duration: 1,
      x: 100,
      opacity: 0,
      delay: 1,
    });
  }
});

// ===== PERFORMANCE OPTIMIZATION =====

// Debounce function for scroll events
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction() {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Optimize scroll events
const optimizedScroll = debounce(function () {
  // Any scroll-heavy operations can be placed here
}, 10);

window.addEventListener("scroll", optimizedScroll);

// ===== LAZY LOADING FOR IMAGES =====
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}
