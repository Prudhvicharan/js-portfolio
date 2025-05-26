/**
 * HERO COMPONENT - JAVASCRIPT
 * Dynamic Hero Section with Animations
 * Senior .NET Developer Portfolio
 */

class HeroComponent {
  constructor() {
    this.heroSection = null;
    this.typingElement = null;
    this.developerCard = null;
    this.floatingElements = null;
    this.statsElements = null;
    this.tabElements = null;
    this.currentTabIndex = 0;
    this.typingIndex = 0;
    this.typingSpeed = 100;
    this.erasingSpeed = 50;
    this.isErasing = false;
    this.currentTitleIndex = 0;

    // Job titles for typing animation
    this.jobTitles = [
      ".NET Full Stack Developer",
      "Cloud Solutions Architect",
      "Microservices Expert",
      "Enterprise Software Engineer",
      "Azure & AWS Specialist",
    ];

    this.init();
  }

  init() {
    // Wait for component to be loaded
    window.addEventListener("heroLoaded", () => {
      this.initializeHero();
    });

    // Fallback initialization
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        setTimeout(() => this.initializeHero(), 500);
      });
    } else {
      setTimeout(() => this.initializeHero(), 100);
    }
  }

  initializeHero() {
    // Get DOM elements
    this.heroSection = document.getElementById("hero-main");
    this.typingElement = document.getElementById("typingText");
    this.developerCard = document.getElementById("developerCard");
    this.floatingElements = document.querySelectorAll(".floating-icon");
    this.statsElements = document.querySelectorAll(".stat-number");
    this.tabElements = document.querySelectorAll(".tab");
    this.scrollIndicator = document.getElementById("scrollIndicator");

    if (!this.heroSection) {
      console.warn("Hero section not found");
      return;
    }

    this.setupEventListeners();
    this.initializeAnimations();
    this.setupTypingAnimation();
    this.setupTabSwitching();
    this.setupFloatingAnimations();
    this.setupStatsCountUp();
    this.setupScrollEffects();
    this.setupCodeRain();
    this.initializeInteractionEffects();

    console.log("✅ Hero component initialized successfully");
  }

  setupEventListeners() {
    // Button click handlers
    const buttons = {
      viewProjectsBtn: "#projects-component",
      hireMeBtn: "#contact-component",
      downloadResumeBtn: this.handleResumeDownload.bind(this),
    };

    Object.keys(buttons).forEach((buttonId) => {
      const button = document.getElementById(buttonId);
      if (button) {
        if (typeof buttons[buttonId] === "string") {
          button.addEventListener("click", (e) => {
            e.preventDefault();
            this.smoothScrollTo(buttons[buttonId]);
          });
        } else {
          button.addEventListener("click", buttons[buttonId]);
        }
      }
    });

    // Tab switching
    this.tabElements.forEach((tab, index) => {
      tab.addEventListener("click", () => this.switchTab(index));
    });

    // Scroll indicator
    if (this.scrollIndicator) {
      this.scrollIndicator.addEventListener("click", () => {
        this.smoothScrollTo("#about-component");
      });
    }

    // Window resize
    window.addEventListener("resize", () => {
      this.handleResize();
    });

    // Intersection observer for animations
    this.setupIntersectionObserver();
  }

  initializeAnimations() {
    // Initial animation sequence
    setTimeout(() => {
      this.animateHeroEntrance();
    }, 500);
  }

  animateHeroEntrance() {
    if (typeof gsap !== "undefined") {
      const tl = gsap.timeline();

      tl.from(".hero-greeting", {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: "power2.out",
      })
        .from(
          ".hero-name .name-highlight",
          {
            duration: 0.8,
            x: -50,
            opacity: 0,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .from(
          ".hero-name .name-primary",
          {
            duration: 0.8,
            x: 50,
            opacity: 0,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .from(
          ".hero-title-container",
          {
            duration: 0.8,
            y: 20,
            opacity: 0,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .from(
          ".hero-description",
          {
            duration: 0.8,
            y: 20,
            opacity: 0,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .from(
          ".tech-stack-container",
          {
            duration: 0.8,
            y: 20,
            opacity: 0,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .from(
          ".hero-actions .hero-btn",
          {
            duration: 0.6,
            y: 20,
            opacity: 0,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .from(
          ".developer-card",
          {
            duration: 1,
            x: 100,
            opacity: 0,
            ease: "power2.out",
          },
          "-=0.8"
        )
        .from(
          ".floating-icon",
          {
            duration: 0.8,
            scale: 0,
            opacity: 0,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.6"
        );
    }
  }

  setupTypingAnimation() {
    if (!this.typingElement) return;

    const typeText = () => {
      const currentTitle = this.jobTitles[this.currentTitleIndex];

      if (!this.isErasing) {
        // Typing
        if (this.typingIndex < currentTitle.length) {
          this.typingElement.textContent = currentTitle.substring(
            0,
            this.typingIndex + 1
          );
          this.typingIndex++;
          setTimeout(typeText, this.typingSpeed);
        } else {
          // Pause before erasing
          setTimeout(() => {
            this.isErasing = true;
            typeText();
          }, 2000);
        }
      } else {
        // Erasing
        if (this.typingIndex > 0) {
          this.typingElement.textContent = currentTitle.substring(
            0,
            this.typingIndex - 1
          );
          this.typingIndex--;
          setTimeout(typeText, this.erasingSpeed);
        } else {
          // Move to next title
          this.isErasing = false;
          this.currentTitleIndex =
            (this.currentTitleIndex + 1) % this.jobTitles.length;
          setTimeout(typeText, 500);
        }
      }
    };

    // Start typing animation
    setTimeout(typeText, 1000);
  }

  setupTabSwitching() {
    if (!this.tabElements.length) return;

    // Auto-switch tabs every 5 seconds
    setInterval(() => {
      this.currentTabIndex =
        (this.currentTabIndex + 1) % this.tabElements.length;
      this.switchTab(this.currentTabIndex);
    }, 5000);
  }

  switchTab(index) {
    this.currentTabIndex = index;

    // Update tab buttons
    this.tabElements.forEach((tab, i) => {
      tab.classList.toggle("active", i === index);
    });

    // Update tab content
    const tabContents = document.querySelectorAll(".tab-content");
    tabContents.forEach((content, i) => {
      content.classList.toggle("active", i === index);
    });

    // Animate content change
    if (typeof gsap !== "undefined") {
      const activeContent = tabContents[index];
      gsap.fromTo(
        activeContent,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }
  }

  setupFloatingAnimations() {
    if (!this.floatingElements.length) return;

    this.floatingElements.forEach((element, index) => {
      // Random initial position
      const randomX = (Math.random() - 0.5) * 200;
      const randomY = (Math.random() - 0.5) * 200;

      if (typeof gsap !== "undefined") {
        gsap.set(element, {
          x: randomX,
          y: randomY,
        });

        // Floating animation
        gsap.to(element, {
          y: randomY + (Math.random() - 0.5) * 50,
          x: randomX + (Math.random() - 0.5) * 50,
          duration: 3 + Math.random() * 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.2,
        });

        // Rotation animation
        gsap.to(element, {
          rotation: 360,
          duration: 10 + Math.random() * 5,
          ease: "none",
          repeat: -1,
        });
      }

      // Hover effect
      element.addEventListener("mouseenter", () => {
        if (typeof gsap !== "undefined") {
          gsap.to(element, {
            scale: 1.2,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });

      element.addEventListener("mouseleave", () => {
        if (typeof gsap !== "undefined") {
          gsap.to(element, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });
    });
  }

  setupStatsCountUp() {
    if (!this.statsElements.length) return;

    const animateStats = () => {
      this.statsElements.forEach((stat) => {
        const target = parseInt(stat.getAttribute("data-count"));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCount = () => {
          current += increment;
          if (current < target) {
            stat.textContent = Math.floor(current);
            requestAnimationFrame(updateCount);
          } else {
            stat.textContent =
              target + (target === 8 ? "+" : target > 10 ? "+" : "");
          }
        };

        updateCount();
      });
    };

    // Trigger when stats come into view
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsContainer = document.querySelector(".hero-stats");
    if (statsContainer) {
      statsObserver.observe(statsContainer);
    }
  }

  setupScrollEffects() {
    let lastScrollTop = 0;

    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset;
      const scrollProgress = Math.min(scrollTop / window.innerHeight, 1);

      // Parallax effect on hero content
      if (typeof gsap !== "undefined") {
        gsap.to(".hero-text-content", {
          y: scrollTop * 0.3,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(".hero-visual-content", {
          y: scrollTop * 0.1,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(".floating-elements", {
          y: scrollTop * 0.2,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      // Hide scroll indicator when scrolling
      if (this.scrollIndicator) {
        this.scrollIndicator.style.opacity = Math.max(
          0,
          1 - scrollProgress * 2
        );
      }

      lastScrollTop = scrollTop;
    });
  }

  setupCodeRain() {
    const codeRain = document.getElementById("codeRain");
    if (!codeRain) return;

    const characters =
      "01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz{}[]();,.NET#$%&*+-=<>?@^_|~";
    const drops = [];
    const columns = Math.floor(window.innerWidth / 20);

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * window.innerHeight;
    }

    const drawCodeRain = () => {
      codeRain.innerHTML = "";

      for (let i = 0; i < columns; i++) {
        const span = document.createElement("span");
        span.textContent =
          characters[Math.floor(Math.random() * characters.length)];
        span.style.cssText = `
                    position: absolute;
                    left: ${i * 20}px;
                    top: ${drops[i]}px;
                    color: rgba(102, 126, 234, 0.1);
                    font-family: monospace;
                    font-size: 14px;
                    animation: fadeOut 2s linear forwards;
                `;

        codeRain.appendChild(span);

        drops[i] += 20;
        if (drops[i] > window.innerHeight) {
          drops[i] = -20;
        }
      }
    };

    // Start code rain
    setInterval(drawCodeRain, 100);
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe hero elements
    const elementsToObserve = document.querySelectorAll(
      ".tech-badge, .hero-btn, .stat-item"
    );
    elementsToObserve.forEach((el) => observer.observe(el));
  }

  initializeInteractionEffects() {
    // Tech badge hover effects
    const techBadges = document.querySelectorAll(".tech-badge");
    techBadges.forEach((badge) => {
      badge.addEventListener("mouseenter", () => {
        if (typeof gsap !== "undefined") {
          gsap.to(badge, {
            scale: 1.1,
            y: -5,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });

      badge.addEventListener("mouseleave", () => {
        if (typeof gsap !== "undefined") {
          gsap.to(badge, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });
    });

    // Developer card 3D tilt effect
    if (this.developerCard) {
      this.developerCard.addEventListener("mousemove", (e) => {
        const rect = this.developerCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        if (typeof gsap !== "undefined") {
          gsap.to(this.developerCard, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.3,
            ease: "power2.out",
            transformPerspective: 1000,
          });
        }
      });

      this.developerCard.addEventListener("mouseleave", () => {
        if (typeof gsap !== "undefined") {
          gsap.to(this.developerCard, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });
    }
  }

  smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (!element) return;

    const headerHeight = 80;
    const offsetTop = element.offsetTop - headerHeight;

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

  handleResumeDownload(e) {
    e.preventDefault();

    // Show notification
    if (window.portfolioApp) {
      window.portfolioApp.showNotification(
        "Resume download will be available soon! 📄",
        "info"
      );
    }

    // Track event
    this.trackEvent("resume_download_attempt", {
      source: "hero_section",
      timestamp: new Date().toISOString(),
    });

    // TODO: Replace with actual resume file
    // const resumeUrl = 'path/to/Kavya_Manchireddy_Resume.pdf';
    // const link = document.createElement('a');
    // link.href = resumeUrl;
    // link.download = 'Kavya_Manchireddy_Senior_NET_Developer.pdf';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  }

  handleResize() {
    // Recalculate floating elements positions
    this.setupFloatingAnimations();

    // Refresh code rain
    this.setupCodeRain();
  }

  trackEvent(eventName, eventData = {}) {
    // Google Analytics tracking
    if (typeof gtag !== "undefined") {
      gtag("event", eventName, eventData);
    }

    // Console logging for development
    console.log("📊 Hero Event:", eventName, eventData);
  }

  // Public API methods
  startTypingAnimation() {
    this.setupTypingAnimation();
  }

  switchToTab(index) {
    if (index >= 0 && index < this.tabElements.length) {
      this.switchTab(index);
    }
  }

  animateStatsCountUp() {
    this.setupStatsCountUp();
  }

  pauseAnimations() {
    if (typeof gsap !== "undefined") {
      gsap.globalTimeline.pause();
    }
  }

  resumeAnimations() {
    if (typeof gsap !== "undefined") {
      gsap.globalTimeline.resume();
    }
  }

  destroy() {
    // Cleanup event listeners and intervals
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleResize);

    // Clear any intervals
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }

    if (this.tabSwitchInterval) {
      clearInterval(this.tabSwitchInterval);
    }

    console.log("Hero component destroyed");
  }
}

// Utility functions for hero animations
const HeroAnimations = {
  // Tech badge pulse animation
  pulseTechBadge: (element) => {
    if (typeof gsap !== "undefined") {
      gsap.to(element, {
        scale: 1.05,
        duration: 0.6,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });
    }
  },

  // Floating icon hover effect
  floatingIconHover: (element, isHover) => {
    if (typeof gsap !== "undefined") {
      gsap.to(element, {
        scale: isHover ? 1.2 : 1,
        y: isHover ? -10 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  },

  // Button press animation
  buttonPress: (element) => {
    if (typeof gsap !== "undefined") {
      gsap.to(element, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      });
    }
  },
};

// Initialize hero component
let heroComponent;

// Initialize when hero component is loaded
window.addEventListener("heroLoaded", initializeHeroComponent);

// Fallback initialization
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(initializeHeroComponent, 1000);
  });
} else {
  setTimeout(initializeHeroComponent, 500);
}

function initializeHeroComponent() {
  if (!heroComponent) {
    heroComponent = new HeroComponent();

    // Make it globally accessible
    window.heroComponent = heroComponent;

    console.log("🚀 Hero component ready!");
  }
}

// Enhanced CSS animations via JavaScript
const heroStyles = `
    @keyframes fadeOut {
        from { opacity: 0.3; }
        to { opacity: 0; }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes bounce {
        0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
        40%, 43% { transform: translateY(-10px); }
        70% { transform: translateY(-5px); }
        90% { transform: translateY(-3px); }
    }
    
    @keyframes glow {
        0%, 100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.3); }
        50% { box-shadow: 0 0 30px rgba(102, 126, 234, 0.6); }
    }
    
    .tech-badge.animate {
        animation: pulse 2s infinite;
    }
    
    .floating-icon:hover {
        animation: bounce 1s ease;
    }
    
    .hero-btn:hover .btn-hover-effect {
        animation: glow 2s infinite;
    }
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.textContent = heroStyles;
document.head.appendChild(styleSheet);

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = { HeroComponent, HeroAnimations };
}

console.log("📁 Hero.js loaded - Ready for epic animations!");
