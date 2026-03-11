// Theme toggle functionality
console.log("Nothing to see here, Bitchhhhh...");

document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("themeToggle");
  const mobileDarkMode = document.getElementById("mobileDarkMode");
  const htmlElement = document.documentElement;
  const moonIcon = document.querySelector(".moon-icon");
  const sunIconCircle = document.querySelector(".sun-icon-circle");
  const sunIconLines = document.querySelectorAll(".sun-icon-line");
  const mobileMoonIcon = document.querySelector(".mobile-moon-icon");
  const mobileSunIconCircle = document.querySelector(".mobile-sun-icon-circle");
  const mobileSunIconLines = document.querySelectorAll(".mobile-sun-icon-line");

  // Scroll Reveal Animation
  const revealSections = document.querySelectorAll(".reveal-section");

  // Intersection Observer for scroll reveal animations - updated for earlier triggering
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.05, // Reduced threshold - trigger when just 5% of the element is visible
      rootMargin: "0px 0px -10% 0px", // Adjusted to trigger before elements fully enter the viewport
    }
  );

  // Observe all reveal sections
  revealSections.forEach((section) => {
    revealObserver.observe(section);
  });

  // Hamburger Menu Functionality
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeMenu = document.querySelector(".close-menu");
  const mobileMenuItems = document.querySelectorAll(".mobile-menu-item");
  const body = document.body;

  // Create overlay element
  const overlay = document.createElement("div");
  overlay.className = "menu-overlay";
  document.body.appendChild(overlay);

  // Open mobile menu
  hamburgerMenu.addEventListener("click", function () {
    mobileMenu.classList.add("active");
    overlay.classList.add("active");
    body.classList.add("menu-open");
  });

  // Close mobile menu
  function closeMenuFunction() {
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
    body.classList.remove("menu-open");
  }

  closeMenu.addEventListener("click", closeMenuFunction);
  overlay.addEventListener("click", closeMenuFunction);

  // Mobile menu items - close menu on click and smooth scroll
  mobileMenuItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();

      closeMenuFunction();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        setTimeout(() => {
          window.scrollTo({
            top: targetSection.offsetTop - 20,
            behavior: "smooth",
          });
        }, 300); // Slight delay to allow menu to close first
      }
    });
  });

  // Check if user has a saved preference for theme
  const savedTheme = localStorage.getItem("theme") || "light";
  htmlElement.setAttribute("data-theme", savedTheme);
  updateIcon(savedTheme);
  updateMobileIcon(savedTheme);

  function toggleTheme() {
    const currentTheme = htmlElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    htmlElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    updateIcon(newTheme);
    updateMobileIcon(newTheme);
  }

  themeToggle.addEventListener("click", toggleTheme);
  mobileDarkMode.addEventListener("click", toggleTheme);

  function updateIcon(theme) {
    if (theme === "dark") {
      moonIcon.style.display = "none";
      sunIconCircle.style.display = "block";
      sunIconLines.forEach((line) => (line.style.display = "block"));
    } else {
      moonIcon.style.display = "block";
      sunIconCircle.style.display = "none";
      sunIconLines.forEach((line) => (line.style.display = "none"));
    }
  }

  function updateMobileIcon(theme) {
    if (theme === "dark") {
      mobileMoonIcon.style.display = "none";
      mobileSunIconCircle.style.display = "block";
      mobileSunIconLines.forEach((line) => (line.style.display = "block"));
    } else {
      mobileMoonIcon.style.display = "block";
      mobileSunIconCircle.style.display = "none";
      mobileSunIconLines.forEach((line) => (line.style.display = "none"));
    }
  }

  // Skills Carousel - Infinite scrolling functionality
  const track = document.getElementById("skillsTrack");
  const items = track.querySelectorAll(".skill_item");

  // Calculate item dimensions
  const itemWidth = items[0].offsetWidth;
  const gap = parseInt(window.getComputedStyle(track).gap) || 16;

  // Set initial position
  let position = 0;

  // Number of original items (before duplication)
  const originalItemCount = items.length / 2;

  // Function to animate the carousel
  function animateCarousel() {
    // Increment position slowly
    position += 1.5; // Adjust this value for slower/faster scrolling

    // Apply the transform
    track.style.transform = `translateX(-${position}px)`;

    // Check if we need to reset
    if (position >= (itemWidth + gap) * originalItemCount) {
      // Reset position to beginning for seamless loop
      position = 0;
      // Apply the transform instantly (no transition)
      track.style.transition = "none";
      track.style.transform = `translateX(0)`;

      // Force reflow to ensure the transition is removed before adding it back
      void track.offsetWidth;

      // Restore the transition
      track.style.transition = "transform 1.5s ease";
    }

    // Continue animation
    requestAnimationFrame(animateCarousel);
  }

  // Start the animation
  requestAnimationFrame(animateCarousel);

  // Smooth scrolling for navigation links
  const taskbarLinks = document.querySelectorAll(".taskbar__item");

  taskbarLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Adding smooth scroll behavior
        window.scrollTo({
          top: targetSection.offsetTop - 60, // Offset to account for the fixed taskbar
          behavior: "smooth",
        });
      }
    });
  });

  // Active section highlighting in navigation
  // Get all sections that we want to track
  const sections = document.querySelectorAll(
    "#home, #skills, #work, #story, #contact"
  );
  const navItems = {
    "#home": document.querySelector('a[href="#home"]'),
    "#skills": document.querySelector('a[href="#skills"]'),
    "#work": document.querySelector('a[href="#work"]'),
    "#story": document.querySelector('a[href="#story"]'),
    "#contact": document.querySelector('a[href="#contact"]'),
  };

  const mobileNavItems = {
    "#home": document.querySelector('.mobile-menu-item[href="#home"]'),
    "#skills": document.querySelector('.mobile-menu-item[href="#skills"]'),
    "#work": document.querySelector('.mobile-menu-item[href="#work"]'),
    "#story": document.querySelector('.mobile-menu-item[href="#story"]'),
    "#contact": document.querySelector('.mobile-menu-item[href="#contact"]'),
  };

  // Options for the Intersection Observer - adjusted for better section detection
  const options = {
    threshold: [0.2, 0.3, 0.4, 0.5, 0.6], // Multiple thresholds for smoother transitions
    rootMargin: "-80px 0px -80px 0px", // Account for taskbar height
  };

  function resetActiveLinks() {
    // Remove active class from all taskbar items
    taskbarLinks.forEach((link) => link.classList.remove("active"));

    // Remove active class from all mobile menu items
    mobileMenuItems.forEach((item) => item.classList.remove("active"));
  }

  function setActiveLink(sectionId) {
    // Reset all active states
    resetActiveLinks();

    // Set active class for the taskbar item
    if (navItems[sectionId]) {
      navItems[sectionId].classList.add("active");
    }

    // Set active class for the mobile menu item
    if (mobileNavItems[sectionId]) {
      mobileNavItems[sectionId].classList.add("active");
    }
  }

  // Create a map to store intersection ratios
  const sectionVisibility = new Map();

  // Create the Intersection Observer with improved detection
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Store the intersection ratio for each section
      sectionVisibility.set(entry.target.id, entry.intersectionRatio);
    });

    // Find the section with the highest visibility
    let maxRatio = 0;
    let maxSection = null;

    sectionVisibility.forEach((ratio, sectionId) => {
      // Special handling for work section - require higher visibility
      if (sectionId === "work") {
        // Only consider work section if it has significant visibility
        if (ratio > 0.4 && ratio > maxRatio) {
          maxRatio = ratio;
          maxSection = sectionId;
        }
      } else if (ratio > maxRatio) {
        maxRatio = ratio;
        maxSection = sectionId;
      }
    });

    // Only update active link if we have a visible section
    if (maxSection) {
      setActiveLink(`#${maxSection}`);
    }
  }, options);

  // Observe all sections
  sections.forEach((section) => {
    observer.observe(section);
    // Initialize the visibility map
    sectionVisibility.set(section.id, 0);
  });

  // Set initial active state based on scroll position
  function setInitialActiveSection() {
    let currentSectionId = "#home"; // Default to home
    let maxVisibility = 0;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate how much of the section is visible
      const visibleHeight =
        Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);

      // Avoid negative values
      if (visibleHeight <= 0) return;

      // Calculate percentage of section height that's visible
      const visibilityPercentage = visibleHeight / section.offsetHeight;

      // Special handling for work section to prevent incorrect highlighting
      if (section.id === "work") {
        // For work section, require more visibility and a higher position in the viewport
        const isNearTop = rect.top < viewportHeight * 0.4;
        if (visibilityPercentage > maxVisibility && isNearTop) {
          maxVisibility = visibilityPercentage;
          currentSectionId = `#${section.id}`;
        }
      } else if (visibilityPercentage > maxVisibility) {
        maxVisibility = visibilityPercentage;
        currentSectionId = `#${section.id}`;
      }
    });

    setActiveLink(currentSectionId);
  }

  // Set initial active section when the page loads
  setInitialActiveSection();

  // Add fallback for scroll event in case IntersectionObserver doesn't work well
  window.addEventListener("scroll", () => {
    // Use debouncing to avoid performance issues
    if (!window.requestAnimationFrame) {
      setTimeout(setInitialActiveSection, 300);
    } else {
      window.requestAnimationFrame(setInitialActiveSection);
    }
  });

  // Typewriter effect for credits
  const creditsElement = document.getElementById("creditsText");
  const creditsText = "< Code by Tanish />";
  let index = 0;
  let isDeleting = false;
  let textInterval;

  function typeWriter() {
    if (!isDeleting && index <= creditsText.length) {
      creditsElement.textContent = creditsText.substring(0, index);
      index++;
      if (index > creditsText.length) {
        // Wait before starting to delete
        setTimeout(() => {
          isDeleting = true;
        }, 2000);
      }
    } else if (isDeleting && index >= 0) {
      creditsElement.textContent = creditsText.substring(0, index);
      index--;
      if (index === 0) {
        isDeleting = false;
        // Wait before typing again
        setTimeout(() => {
          // Add random "hacking" effect occasionally
          if (Math.random() > 0.7) {
            hackingEffect();
          }
        }, 1000);
      }
    }

    // Variable typing speed for more natural effect
    const typeSpeed = isDeleting ? 80 : Math.random() * 180 + 100;
    textInterval = setTimeout(typeWriter, typeSpeed);
  }

  function hackingEffect() {
    clearTimeout(textInterval);
    const hackingTexts = [
      "< Debugging Reality />",
      "< 01010100 01100001 01101110 01101001 01110011 01101000 />",
      "< function codeByTanish() { return awesome; } />",
      "< while(true) { createAwesomeCode(); } />",
    ];

    const randomText =
      hackingTexts[Math.floor(Math.random() * hackingTexts.length)];
    let tempIndex = 0;

    function typeHack() {
      if (tempIndex <= randomText.length) {
        creditsElement.textContent = randomText.substring(0, tempIndex);
        tempIndex++;
        setTimeout(typeHack, 50);
      } else {
        // Wait a bit then go back to normal typing
        setTimeout(() => {
          index = 0;
          isDeleting = false;
          typeWriter();
        }, 1500);
      }
    }

    typeHack();
  }

  // Start the typewriter effect
  setTimeout(typeWriter, 1000);

  // Interactive effect on credits wrapper with new animation
  const creditsWrapper = document.querySelector(".credits-wrapper");

  // Ripple effect on credits click
  creditsWrapper.addEventListener("click", function (e) {
    const creditsEffects = document.querySelector(".credits-effects");

    // Create a ripple element
    const ripple = document.createElement("div");
    ripple.classList.add("credits-ripple");

    // Position the ripple at click coordinates
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";

    // Add glow effect to the wrapper
    this.classList.add("credits-glow");

    // Add the ripple to the effects container
    creditsEffects.appendChild(ripple);

    // Remove ripple after animation completes
    setTimeout(() => {
      ripple.remove();
      this.classList.remove("credits-glow");
    }, 800);
  });
});
