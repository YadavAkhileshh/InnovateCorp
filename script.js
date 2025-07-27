function updateGreeting() {
  const now = new Date();
  const hour = now.getHours();
  const greetingElement = document.querySelector(".welcome-content h2");
  let greeting;

  if (hour < 12) {
    greeting = "Good morning, Jack! 🌅";
  } else if (hour < 17) {
    greeting = "Good afternoon, Jack! ☀️";
  } else {
    greeting = "Good evening, Jack! 🌙";
  }

  if (greetingElement) {
    greetingElement.textContent = greeting;
  }
}

// Update clock/date
function updateDateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
  });

  //live clock to the header if we want
  const clockElement = document.getElementById("live-clock");
  if (clockElement) {
    clockElement.textContent = timeString;
  }
}

// Animate statistics on load
function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number");

  statNumbers.forEach((stat) => {
    const finalValue = parseInt(stat.textContent);
    let currentValue = 0;
    const increment = Math.ceil(finalValue / 50);

    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= finalValue) {
        currentValue = finalValue;
        clearInterval(timer);
      }
      stat.textContent = currentValue;
    }, 30);
  });
}

// click handlers for quick action buttons
function setupQuickActions() {
  const quickButtons = document.querySelectorAll(".quick-btn");

  quickButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const action = this.textContent.trim();

      // Add a subtle animation
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);

      // In a real app, these would navigate to different pages
      console.log(`Clicked: ${action}`);

      // Show a temporary notification
      showNotification(`${action} clicked!`);
    });
  });
}

// Show temporary notifications
function showNotification(message) {
  const notification = document.createElement("div");
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4C9AFF;
        color: white;
        padding: 12px 20px;
        border-radius: 5px;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = "1";
  }, 100);

  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 2000);
}

// hover effects to widgets
function setupWidgetInteractions() {
  const widgets = document.querySelectorAll(".widget");

  widgets.forEach((widget) => {
    widget.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
      this.style.boxShadow = "0 6px 16px rgba(0,0,0,0.15)";
    });

    widget.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
    });
  });
}

// Simulate real-time updates for announcements
function simulateRealTimeUpdates() {
  const announcements = document.querySelectorAll(".announcement-item");

  // subtle pulse to important announcements
  announcements.forEach((announcement) => {
    if (announcement.classList.contains("priority-high")) {
      setInterval(() => {
        announcement.style.boxShadow = "0 0 10px rgba(255, 171, 0, 0.3)";
        setTimeout(() => {
          announcement.style.boxShadow = "none";
        }, 1000);
      }, 3000);
    }
  });
}

// Add click handlers for resource links
function setupResourceLinks() {
  const resourceLinks = document.querySelectorAll(".resource-link");

  resourceLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const resourceName = this.querySelector("span").textContent;
      showNotification(`Opening ${resourceName}...`);
    });
  });
}

// celebration animation
function celebrationAnimation() {
  const celebrations = document.querySelectorAll(".celebration-item");

  celebrations.forEach((celebration) => {
    celebration.addEventListener("click", function () {
      const emoji = this.querySelector(".celebration-type").textContent;

      // Create floating emoji animation
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          createFloatingEmoji(emoji, this);
        }, i * 200);
      }
    });
  });
}

function createFloatingEmoji(emoji, element) {
  const floatingEmoji = document.createElement("span");
  floatingEmoji.textContent = emoji;
  floatingEmoji.style.cssText = `
        position: absolute;
        font-size: 24px;
        pointer-events: none;
        z-index: 100;
        animation: float 2s ease-out forwards;
    `;

  const rect = element.getBoundingClientRect();
  floatingEmoji.style.left = rect.left + Math.random() * rect.width + "px";
  floatingEmoji.style.top = rect.top + "px";

  document.body.appendChild(floatingEmoji);

  setTimeout(() => {
    document.body.removeChild(floatingEmoji);
  }, 2000);
}

// CSS animation for floating emoji
function addFloatingAnimation() {
  const style = document.createElement("style");
  style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);
}

// Initialize everything when the page loads
document.addEventListener("DOMContentLoaded", function () {
  updateGreeting();
  updateDateTime();
  setupQuickActions();
  setupWidgetInteractions();
  setupResourceLinks();
  celebrationAnimation();
  addFloatingAnimation();
  simulateRealTimeUpdates();

  // Animate stats after a short delay
  setTimeout(animateStats, 500);

  // Update time every minute
  setInterval(updateDateTime, 60000);

  // Update greeting every hour
  setInterval(updateGreeting, 3600000);
});

// some keyboard shortcuts for power users
document.addEventListener("keydown", function (e) {
  if (e.ctrlKey || e.metaKey) {
    switch (e.key) {
      case "n":
        e.preventDefault();
        showNotification("New Project shortcut activated!");
        break;
      case "m":
        e.preventDefault();
        showNotification("Schedule Meeting shortcut activated!");
        break;
      case "u":
        e.preventDefault();
        showNotification("Upload File shortcut activated!");
        break;
    }
  }
});

//smooth scrolling for any internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});
