/**
 * KAVYA'S PORTFOLIO - SIMPLIFIED JAVASCRIPT
 * Senior .NET Developer Portfolio
 * Optimized for Performance & Smooth Experience
 */

// ===================================
// GLOBAL VARIABLES & CONFIGURATION
// ===================================
const CONFIG = {
  // Typing animation settings
  typing: {
    titles: [
      "Senior .NET Full Stack Developer",
      "Cloud Solutions Architect",
      "Microservices Expert",
      "Enterprise Software Engineer",
      "Azure & AWS Specialist",
    ],
    typeSpeed: 100,
    deleteSpeed: 50,
    pauseTime: 2000,
  },

  // Animation settings
  animation: {
    observerOptions: {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
    skillAnimationDelay: 300,
  },

  // Theme settings
  theme: {
    storageKey: "portfolio-theme",
    default: "light",
  },
};

// Global state
let currentTheme =
  localStorage.getItem(CONFIG.theme.storageKey) || CONFIG.theme.default;
let isScrolling = false;
let scrollTimeout;

// ===================================
// UTILITY FUNCTIONS
// ===================================

/**
 * Debounce function to limit function calls
 */
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

/**
 * Throttle function for scroll events
 */
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Smooth scroll to element
 */
function smoothScrollTo(target, offset = 80) {
  const element = document.querySelector(target);
  if (!element) return;

  const elementPosition = element.offsetTop - offset;

  window.scrollTo({
    top: elementPosition,
    behavior: "smooth",
  });
}

/**
 * Add animation class when element is visible
 */
function animateOnScroll(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-fade-up");
      observer.unobserve(entry.target);
    }
  });
}

/**
 * Show notification message
 */
function showNotification(message, type = "success", duration = 4000) {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  // Create notification
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <div class="notification-content">
          <i class="fas ${getNotificationIcon(type)}"></i>
          <span>${message}</span>
          <button onclick="this.parentElement.parentElement.remove()">
            <i class="fas fa-times"></i>
          </button>
        </div>
      `;

  // Style notification
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "16px 20px",
    borderRadius: "12px",
    color: "white",
    fontWeight: "500",
    zIndex: "10000",
    transform: "translateX(400px)",
    transition: "transform 0.3s ease",
    maxWidth: "350px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    backgroundColor: getNotificationColor(type),
  });

  // Add to DOM
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Auto remove
  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => notification.remove(), 300);
  }, duration);
}

/**
 * Get notification icon based on type
 */
function getNotificationIcon(type) {
  const icons = {
    success: "fa-check-circle",
    error: "fa-exclamation-circle",
    warning: "fa-exclamation-triangle",
    info: "fa-info-circle",
  };
  return icons[type] || icons.info;
}

/**
 * Get notification color based on type
 */
function getNotificationColor(type) {
  const colors = {
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
  };
  return colors[type] || colors.info;
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ===================================
// NAVIGATION FUNCTIONALITY
// ===================================

class NavigationManager {
  constructor() {
    this.header = document.getElementById("header");
    this.navToggle = document.getElementById("nav-toggle");
    this.navMenu = document.getElementById("nav-menu");
    this.navLinks = document.querySelectorAll(".nav-link");
    this.lastScrollTop = 0;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupScrollEffects();
    this.setupActiveNavigation();
  }

  setupEventListeners() {
    // Mobile menu toggle
    if (this.navToggle) {
      this.navToggle.addEventListener("click", () => this.toggleMobileMenu());
    }

    // Navigation links
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => this.handleNavClick(e, link));
    });

    // Close mobile menu on outside click
    document.addEventListener("click", (e) => {
      if (
        !this.navMenu.contains(e.target) &&
        !this.navToggle.contains(e.target)
      ) {
        this.closeMobileMenu();
      }
    });

    // Close mobile menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeMobileMenu();
      }
    });
  }

  setupScrollEffects() {
    const handleScroll = throttle(() => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // Header background on scroll
      if (scrollTop > 50) {
        this.header.classList.add("scrolled");
      } else {
        this.header.classList.remove("scrolled");
      }

      this.lastScrollTop = scrollTop;
    }, 10);

    window.addEventListener("scroll", handleScroll, { passive: true });
  }

  setupActiveNavigation() {
    const sections = document.querySelectorAll("section[id]");

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.updateActiveNavigation(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.3,
      rootMargin: "-80px 0px -80px 0px",
    });

    sections.forEach((section) => observer.observe(section));
  }

  toggleMobileMenu() {
    this.navMenu.classList.toggle("active");
    this.navToggle.classList.toggle("active");
    document.body.classList.toggle("nav-open");
  }

  closeMobileMenu() {
    this.navMenu.classList.remove("active");
    this.navToggle.classList.remove("active");
    document.body.classList.remove("nav-open");
  }

  handleNavClick(e, link) {
    e.preventDefault();

    const targetId = link.getAttribute("href");
    smoothScrollTo(targetId);

    // Close mobile menu
    this.closeMobileMenu();

    // Track navigation
    this.trackNavigation(targetId);
  }

  updateActiveNavigation(activeSectionId) {
    this.navLinks.forEach((link) => {
      const href = link.getAttribute("href").substring(1); // Remove #
      link.classList.toggle("active", href === activeSectionId);
    });
  }

  trackNavigation(section) {
    // Analytics tracking (if implemented)
    if (typeof gtag !== "undefined") {
      gtag("event", "navigation", {
        section: section,
        timestamp: new Date().toISOString(),
      });
    }

    console.log(`Navigation: ${section}`);
  }
}

// ===================================
// TYPING ANIMATION
// ===================================

class TypingAnimation {
  constructor(elementId, titles = CONFIG.typing.titles) {
    this.element = document.getElementById(elementId);
    this.titles = titles;
    this.currentTitleIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    this.typeSpeed = CONFIG.typing.typeSpeed;
    this.deleteSpeed = CONFIG.typing.deleteSpeed;
    this.pauseTime = CONFIG.typing.pauseTime;

    if (this.element) {
      this.start();
    }
  }

  start() {
    this.type();
  }

  type() {
    const currentTitle = this.titles[this.currentTitleIndex];

    if (this.isDeleting) {
      // Deleting characters
      this.element.textContent = currentTitle.substring(
        0,
        this.currentCharIndex - 1
      );
      this.currentCharIndex--;

      if (this.currentCharIndex === 0) {
        this.isDeleting = false;
        this.currentTitleIndex =
          (this.currentTitleIndex + 1) % this.titles.length;
        setTimeout(() => this.type(), 500);
      } else {
        setTimeout(() => this.type(), this.deleteSpeed);
      }
    } else {
      // Typing characters
      this.element.textContent = currentTitle.substring(
        0,
        this.currentCharIndex + 1
      );
      this.currentCharIndex++;

      if (this.currentCharIndex === currentTitle.length) {
        setTimeout(() => {
          this.isDeleting = true;
          this.type();
        }, this.pauseTime);
      } else {
        setTimeout(() => this.type(), this.typeSpeed);
      }
    }
  }
}

// ===================================
// SKILLS ANIMATION
// ===================================

class SkillsAnimationManager {
  constructor() {
    this.skillElements = document.querySelectorAll(".skill-progress");
    this.hasAnimated = false;

    this.init();
  }

  init() {
    if (this.skillElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      { threshold: 0.5 }
    );

    const skillsSection = document.getElementById("skills");
    if (skillsSection) {
      observer.observe(skillsSection);
    }
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !this.hasAnimated) {
        this.animateSkills();
        this.hasAnimated = true;
      }
    });
  }

  animateSkills() {
    this.skillElements.forEach((skill, index) => {
      setTimeout(() => {
        const width = skill.getAttribute("data-width");
        skill.style.width = `${width}%`;
      }, index * 100);
    });
  }
}

// ===================================
// THEME MANAGER
// ===================================

class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById("theme-toggle");
    this.currentTheme = currentTheme;

    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.setupEventListeners();
  }

  setupEventListeners() {
    if (this.themeToggle) {
      this.themeToggle.addEventListener("click", () => this.toggleTheme());
    }
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === "light" ? "dark" : "light";
    this.applyTheme(this.currentTheme);
    this.saveTheme(this.currentTheme);

    // showNotification(`Switched to ${this.currentTheme} theme`, "success", 2000);
  }

  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    this.currentTheme = theme;
  }

  saveTheme(theme) {
    localStorage.setItem(CONFIG.theme.storageKey, theme);
  }
}

// ===================================
// BACK TO TOP FUNCTIONALITY
// ===================================

class BackToTopManager {
  constructor() {
    this.backToTopBtn = document.getElementById("back-to-top");
    this.init();
  }

  init() {
    if (!this.backToTopBtn) return;

    this.setupEventListeners();
    this.setupScrollListener();
  }

  setupEventListeners() {
    this.backToTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.scrollToTop();
    });
  }

  setupScrollListener() {
    const handleScroll = throttle(() => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 500) {
        this.backToTopBtn.classList.add("show");
      } else {
        this.backToTopBtn.classList.remove("show");
      }
    }, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}

// ===================================
// CONTACT FORM HANDLER
// ===================================

class ContactFormManager {
  constructor() {
    this.form = document.getElementById("contact-form");
    this.init();
  }

  init() {
    if (!this.form) return;

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  async handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(this.form);
    const data = {
      name: formData.get("name")?.trim(),
      email: formData.get("email")?.trim(),
      subject: formData.get("subject")?.trim(),
      message: formData.get("message")?.trim(),
    };

    // Validate form
    const validation = this.validateForm(data);
    if (!validation.isValid) {
      showNotification(validation.message, "error");
      return;
    }

    // Show loading state
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    submitBtn.classList.add("loading");

    try {
      // Simulate form submission (replace with actual endpoint)
      await this.submitForm(data);

      // Success
      showNotification(
        "Message sent successfully! I'll get back to you soon.",
        "success"
      );
      this.form.reset();
    } catch (error) {
      // Error
      showNotification(
        "Failed to send message. Please try again or contact me directly.",
        "error"
      );
      console.error("Form submission error:", error);
    } finally {
      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      submitBtn.classList.remove("loading");
    }
  }

  validateForm(data) {
    if (!data.name) {
      return { isValid: false, message: "Please enter your name" };
    }

    if (!data.email) {
      return { isValid: false, message: "Please enter your email address" };
    }

    if (!isValidEmail(data.email)) {
      return { isValid: false, message: "Please enter a valid email address" };
    }

    if (!data.subject) {
      return { isValid: false, message: "Please enter a subject" };
    }

    if (!data.message) {
      return { isValid: false, message: "Please enter your message" };
    }

    if (data.message.length < 10) {
      return {
        isValid: false,
        message: "Message must be at least 10 characters long",
      };
    }

    return { isValid: true };
  }

  async submitForm(data) {
    // Simulate API call - Replace with actual form submission endpoint
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success/failure
        if (Math.random() > 0.1) {
          // 90% success rate for demo
          resolve({ success: true });
        } else {
          reject(new Error("Network error"));
        }
      }, 2000);
    });

    /* 
        // Example with actual API endpoint:
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        return response.json();
        */
  }
}

// ===================================
// SCROLL ANIMATIONS
// ===================================

class ScrollAnimationManager {
  constructor() {
    this.animatedElements = document.querySelectorAll(
      ".section-header, .about-text, .expertise-item, .skill-category, .timeline-item, .project-card"
    );

    this.init();
  }

  init() {
    if (this.animatedElements.length === 0) return;

    const observer = new IntersectionObserver(
      animateOnScroll,
      CONFIG.animation.observerOptions
    );

    this.animatedElements.forEach((element) => {
      observer.observe(element);
    });
  }
}

// ===================================
// PORTFOLIO APP INITIALIZATION
// ===================================

class PortfolioApp {
  constructor() {
    this.components = {};
    this.isInitialized = false;

    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.initializeApp());
    } else {
      this.initializeApp();
    }
  }

  initializeApp() {
    try {
      console.log("🚀 Initializing Kavya's Portfolio...");

      // Initialize all components
      this.components = {
        navigation: new NavigationManager(),
        typing: new TypingAnimation("typing-text"),
        skills: new SkillsAnimationManager(),
        theme: new ThemeManager(),
        backToTop: new BackToTopManager(),
        contactForm: new ContactFormManager(),
        scrollAnimations: new ScrollAnimationManager(),
      };

      // Setup additional event listeners
      this.setupEventListeners();

      // Mark as initialized
      this.isInitialized = true;
      document.body.classList.add("portfolio-loaded");

      console.log("✅ Portfolio initialized successfully!");

      // Show welcome message after a delay
      // setTimeout(() => {
      //   showNotification("Welcome to my portfolio! 👋", "info", 3000);
      // }, 1500);
    } catch (error) {
      console.error("❌ Portfolio initialization failed:", error);
      showNotification(
        "Something went wrong. Please refresh the page.",
        "error"
      );
    }
  }

  setupEventListeners() {
    // Window load event
    window.addEventListener("load", () => {
      document.body.classList.add("loaded");
    });

    // Handle window resize
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, 250);
    });

    // Handle visibility change
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        // Page became visible again
        console.log("Portfolio is back in focus");
      }
    });

    // Global error handling
    window.addEventListener("error", (event) => {
      console.error("Global error:", event.error);
    });

    // Handle unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      console.error("Unhandled promise rejection:", event.reason);
    });
  }

  handleResize() {
    // Handle responsive adjustments if needed
    console.log("Window resized");
  }

  // Public methods for external access
  showNotification(message, type, duration) {
    showNotification(message, type, duration);
  }

  scrollToSection(sectionId) {
    smoothScrollTo(`#${sectionId}`);
  }

  getComponent(name) {
    return this.components[name];
  }
}

// ===================================
// ADDITIONAL FEATURES
// ===================================

/**
 * Lazy loading for images (if needed)
 */
function setupLazyLoading() {
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
}

/**
 * Copy to clipboard functionality
 */
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showNotification("Copied to clipboard!", "success", 2000);
      })
      .catch(() => {
        showNotification("Failed to copy to clipboard", "error", 2000);
      });
  } else {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand("copy");
      showNotification("Copied to clipboard!", "success", 2000);
    } catch (err) {
      showNotification("Failed to copy to clipboard", "error", 2000);
    }

    document.body.removeChild(textArea);
  }
}

/**
 * Download resume functionality
 */
function downloadResume() {
  // Create a temporary link element
  const link = document.createElement("a");
  link.href = "assets/documents/Kavya_Resume.docx";
  link.download = "Kavya_Manchireddy_Senior_NET_Developer.docx";

  // Append to body, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showNotification("Resume download started!", "success", 2000);

  // Track download event
  if (typeof gtag !== "undefined") {
    gtag("event", "resume_download", {
      file_name: "Kavya_Resume.docx",
      timestamp: new Date().toISOString(),
    });
  }
}

// ===================================
// INITIALIZATION
// ===================================

// Initialize the portfolio app
let portfolioApp;

// Make sure the app initializes
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializePortfolio);
} else {
  initializePortfolio();
}

function initializePortfolio() {
  portfolioApp = new PortfolioApp();

  // Make globally accessible for debugging
  window.portfolioApp = portfolioApp;
  window.copyToClipboard = copyToClipboard;
  window.downloadResume = downloadResume;

  // Setup lazy loading
  setupLazyLoading();
}

// ===================================
// PERFORMANCE MONITORING
// ===================================

// Log performance metrics
window.addEventListener("load", () => {
  setTimeout(() => {
    if (window.performance && window.performance.timing) {
      const perfData = window.performance.timing;
      const loadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`⚡ Page load time: ${loadTime}ms`);

      // Track performance if analytics is available
      if (typeof gtag !== "undefined") {
        gtag("event", "page_load_time", {
          value: loadTime,
          custom_parameter: "portfolio_performance",
        });
      }
    }
  }, 0);
});

// ===================================
// EXPORT FOR MODULE SYSTEMS
// ===================================

// For environments that support modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    PortfolioApp,
    NavigationManager,
    TypingAnimation,
    ThemeManager,
    ContactFormManager,
  };
}

console.log("📁 Portfolio JavaScript loaded successfully!");
