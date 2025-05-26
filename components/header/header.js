/**
 * HEADER COMPONENT - JAVASCRIPT
 * Professional Navigation & Mobile Menu
 * Senior .NET Developer Portfolio
 */

class HeaderComponent {
  constructor() {
    this.header = null;
    this.mobileMenuToggle = null;
    this.mobileNavOverlay = null;
    this.mobileNavClose = null;
    this.navLinks = null;
    this.mobileNavLinks = null;
    this.isScrolled = false;
    this.isMobileMenuOpen = false;
    this.lastScrollTop = 0;

    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () =>
        this.initializeHeader()
      );
    } else {
      this.initializeHeader();
    }
  }

  initializeHeader() {
    // Get DOM elements
    this.header = document.getElementById("main-header");
    this.mobileMenuToggle = document.getElementById("mobileMenuToggle");
    this.mobileNavOverlay = document.getElementById("mobileNavOverlay");
    this.mobileNavClose = document.getElementById("mobileNavClose");
    this.navLinks = document.querySelectorAll(".nav-link");
    this.mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
    this.resumeBtn = document.getElementById("resumeBtn");

    if (!this.header) {
      console.warn("Header element not found");
      return;
    }

    this.setupEventListeners();
    this.setupScrollEffects();
    this.setupActiveNavigation();
    this.setupResumeDownload();

    console.log("✅ Header component initialized successfully");
  }

  setupEventListeners() {
    // Mobile menu toggle
    if (this.mobileMenuToggle) {
      this.mobileMenuToggle.addEventListener("click", (e) => {
        e.preventDefault();
        this.toggleMobileMenu();
      });
    }

    // Mobile menu close
    if (this.mobileNavClose) {
      this.mobileNavClose.addEventListener("click", (e) => {
        e.preventDefault();
        this.closeMobileMenu();
      });
    }

    // Mobile overlay click to close
    if (this.mobileNavOverlay) {
      this.mobileNavOverlay.addEventListener("click", (e) => {
        if (e.target === this.mobileNavOverlay) {
          this.closeMobileMenu();
        }
      });
    }

    // Navigation links - Desktop
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        this.handleNavClick(e, link);
      });
    });

    // Navigation links - Mobile
    this.mobileNavLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        this.handleMobileNavClick(e, link);
      });
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isMobileMenuOpen) {
        this.closeMobileMenu();
      }
    });

    // Window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024 && this.isMobileMenuOpen) {
        this.closeMobileMenu();
      }
    });
  }

  setupScrollEffects() {
    let ticking = false;

    const updateHeader = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const isScrollingDown = scrollTop > this.lastScrollTop;

      // Add/remove scrolled class
      if (scrollTop > 50 && !this.isScrolled) {
        this.isScrolled = true;
        this.header.classList.add("scrolled");
        this.animateHeaderScroll(true);
      } else if (scrollTop <= 50 && this.isScrolled) {
        this.isScrolled = false;
        this.header.classList.remove("scrolled");
        this.animateHeaderScroll(false);
      }

      // Hide/show header on scroll
      if (scrollTop > 100) {
        if (isScrollingDown && scrollTop > this.lastScrollTop + 5) {
          this.header.classList.add("header-hidden");
        } else if (!isScrollingDown && scrollTop < this.lastScrollTop - 5) {
          this.header.classList.remove("header-hidden");
        }
      }

      this.lastScrollTop = scrollTop;
      ticking = false;
    };

    const requestScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    // Throttled scroll listener
    window.addEventListener("scroll", requestScroll, { passive: true });
  }

  setupActiveNavigation() {
    const sections = document.querySelectorAll("section[id]");
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            this.updateActiveNavigation(sectionId);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-50px 0px -50px 0px",
      }
    );

    sections.forEach((section) => {
      navObserver.observe(section);
    });
  }

  setupResumeDownload() {
    if (this.resumeBtn) {
      this.resumeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.downloadResume();
      });
    }

    // Mobile resume button
    const mobileResumeBtn = document.querySelector(".mobile-resume-link");
    if (mobileResumeBtn) {
      mobileResumeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.downloadResume();
        this.closeMobileMenu();
      });
    }
  }

  toggleMobileMenu() {
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    this.isMobileMenuOpen = true;
    this.mobileNavOverlay.classList.add("active");
    this.mobileMenuToggle.classList.add("active");
    document.body.classList.add("mobile-menu-open");

    // Animate menu items
    this.animateMobileMenuItems(true);

    // Disable scroll
    document.body.style.overflow = "hidden";

    // Focus management
    this.mobileNavClose.focus();
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.mobileNavOverlay.classList.remove("active");
    this.mobileMenuToggle.classList.remove("active");
    document.body.classList.remove("mobile-menu-open");

    // Animate menu items
    this.animateMobileMenuItems(false);

    // Enable scroll
    document.body.style.overflow = "";

    // Return focus
    this.mobileMenuToggle.focus();
  }

  handleNavClick(e, link) {
    e.preventDefault();

    const targetId = link.getAttribute("href");
    const section = link.getAttribute("data-section");

    this.smoothScrollToSection(targetId);
    this.updateActiveNavigation(section + "-component");

    // Track navigation
    this.trackNavigation(section);
  }

  handleMobileNavClick(e, link) {
    e.preventDefault();

    const targetId = link.getAttribute("href");
    const section = link.getAttribute("data-section");

    this.smoothScrollToSection(targetId);
    this.updateActiveNavigation(section + "-component");
    this.closeMobileMenu();

    // Track navigation
    this.trackNavigation(section);
  }

  smoothScrollToSection(targetId) {
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    const headerHeight = this.header.offsetHeight;
    const offsetTop = targetElement.offsetTop - headerHeight - 20;

    // Use GSAP if available, otherwise fallback to native
    if (typeof gsap !== "undefined") {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: offsetTop },
        ease: "power2.inOut",
      });
    } else {
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  }

  updateActiveNavigation(activeSectionId) {
    // Update desktop navigation
    this.navLinks.forEach((link) => {
      const section = link.getAttribute("data-section") + "-component";
      link.classList.toggle("active", section === activeSectionId);
    });

    // Update mobile navigation
    this.mobileNavLinks.forEach((link) => {
      const section = link.getAttribute("data-section") + "-component";
      link.classList.toggle("active", section === activeSectionId);
    });

    // Update side navigation dots if they exist
    const sideDots = document.querySelectorAll(".nav-dot");
    sideDots.forEach((dot) => {
      const href = dot.getAttribute("href");
      dot.classList.toggle("active", href === "#" + activeSectionId);
    });
  }

  animateHeaderScroll(isScrolled) {
    if (typeof gsap === "undefined") return;

    if (isScrolled) {
      gsap.to(this.header, {
        duration: 0.3,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        ease: "power2.out",
      });
    } else {
      gsap.to(this.header, {
        duration: 0.3,
        backgroundColor: "transparent",
        backdropFilter: "blur(0px)",
        boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
        ease: "power2.out",
      });
    }
  }

  animateMobileMenuItems(isOpening) {
    if (typeof gsap === "undefined") return;

    const items = document.querySelectorAll(".mobile-nav-item");

    if (isOpening) {
      gsap.fromTo(
        items,
        {
          opacity: 0,
          x: -50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.2,
        }
      );
    }
  }

  downloadResume() {
    // Show notification
    if (window.portfolioApp) {
      window.portfolioApp.showNotification(
        "Resume download will be available soon! 📄",
        "info"
      );
    }

    // Track download attempt
    this.trackEvent("resume_download_attempt");

    // TODO: Replace with actual resume file URL
    // const resumeUrl = 'path/to/Kavya_Manchireddy_Resume.pdf';
    // const link = document.createElement('a');
    // link.href = resumeUrl;
    // link.download = 'Kavya_Manchireddy_Senior_NET_Developer.pdf';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  }

  trackNavigation(section) {
    this.trackEvent("navigation_click", {
      section: section,
      timestamp: new Date().toISOString(),
    });
  }

  trackEvent(eventName, eventData = {}) {
    // Google Analytics tracking
    if (typeof gtag !== "undefined") {
      gtag("event", eventName, eventData);
    }

    // Console logging for development
    console.log("📊 Header Event:", eventName, eventData);
  }

  // Public API
  highlightSection(sectionId) {
    this.updateActiveNavigation(sectionId);
  }

  hideHeader() {
    this.header.classList.add("header-hidden");
  }

  showHeader() {
    this.header.classList.remove("header-hidden");
  }

  destroy() {
    // Cleanup event listeners and observers
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleResize);

    console.log("Header component destroyed");
  }
}

// Initialize header component
let headerComponent;

// Initialize when DOM is ready or if already loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeHeaderComponent);
} else {
  // Small delay to ensure the HTML is loaded from the component system
  setTimeout(initializeHeaderComponent, 100);
}

function initializeHeaderComponent() {
  headerComponent = new HeaderComponent();

  // Make it globally accessible
  window.headerComponent = headerComponent;
}

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = HeaderComponent;
}
