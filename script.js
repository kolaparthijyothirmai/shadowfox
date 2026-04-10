// =====================================================
// PARTICLE ANIMATION BACKGROUND
// =====================================================

function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 10 + 10;
    
    particle.style.left = x + '%';
    particle.style.top = y + '%';
    particle.style.animationDelay = delay + 's';
    particle.style.animationDuration = duration + 's';
    
    particlesContainer.appendChild(particle);
  }
}

// Initialize particles on load
window.addEventListener('DOMContentLoaded', createParticles);

// =====================================================
// TYPING ANIMATION
// =====================================================

const typedWordsElement = document.getElementById('typedWords');
const words = ['Data Analyst', 'AI Enthusiast', 'ML Developer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeAnimation() {
  const currentWord = words[wordIndex];
  
  if (!isDeleting) {
    // Typing
    typedWordsElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    
    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeAnimation, 2000); // Pause before deleting
      return;
    }
  } else {
    // Deleting
    typedWordsElement.textContent = currentWord.substring(0, charIndex);
    charIndex--;
    
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeAnimation, 500); // Pause before typing next word
      return;
    }
  }
  
  const speed = isDeleting ? 50 : 100;
  setTimeout(typeAnimation, speed);
}

typeAnimation();

// =====================================================
// DARK/LIGHT MODE TOGGLE
// =====================================================

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
document.body.classList.add(savedTheme === 'light' ? 'light-mode' : '');
updateThemeIcon();

themeToggle.addEventListener('click', () => {
  const isDarkMode = document.body.classList.contains('light-mode');
  
  if (isDarkMode) {
    document.body.classList.remove('light-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.add('light-mode');
    localStorage.setItem('theme', 'light');
  }
  
  updateThemeIcon();
});

function updateThemeIcon() {
  const isDarkMode = !document.body.classList.contains('light-mode');
  themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// =====================================================
// MOBILE MENU TOGGLE
// =====================================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// =====================================================
// SCROLL ANIMATIONS
// =====================================================

function observeElements() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections and cards
  document.querySelectorAll(
    '.section, .skill-category, .project-card, .cert-card, .timeline-item'
  ).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });
}

window.addEventListener('DOMContentLoaded', observeElements);

// =====================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// =====================================================

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// =====================================================
// FORM VALIDATION & SUBMISSION
// =====================================================

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const formStatus = document.getElementById('formStatus');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm() {
  let isValid = true;
  
  // Name validation
  const nameError = document.getElementById('nameError');
  if (nameInput.value.trim().length < 2) {
    nameError.textContent = 'Name must be at least 2 characters';
    isValid = false;
  } else {
    nameError.textContent = '';
  }
  
  // Email validation
  const emailError = document.getElementById('emailError');
  if (!emailRegex.test(emailInput.value.trim())) {
    emailError.textContent = 'Please enter a valid email address';
    isValid = false;
  } else {
    emailError.textContent = '';
  }
  
  // Message validation
  const messageError = document.getElementById('messageError');
  if (messageInput.value.trim().length < 10) {
    messageError.textContent = 'Message must be at least 10 characters';
    isValid = false;
  } else {
    messageError.textContent = '';
  }
  
  return isValid;
}

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }
  
  // Show loading state
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
  submitBtn.disabled = true;
  
  try {
    // Simulate form submission (replace with actual backend URL)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Success message
    formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
    formStatus.classList.add('success');
    formStatus.classList.remove('error');
    
    // Reset form
    contactForm.reset();
    
    // Reset button
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    
    // Clear message after 5 seconds
    setTimeout(() => {
      formStatus.textContent = '';
      formStatus.classList.remove('success');
    }, 5000);
    
  } catch (error) {
    formStatus.textContent = 'Error sending message. Please try again.';
    formStatus.classList.add('error');
    formStatus.classList.remove('success');
    
    // Reset button
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
});

// Real-time validation
nameInput.addEventListener('blur', () => {
  const nameError = document.getElementById('nameError');
  if (nameInput.value.trim().length < 2) {
    nameError.textContent = 'Name must be at least 2 characters';
  } else {
    nameError.textContent = '';
  }
});

emailInput.addEventListener('blur', () => {
  const emailError = document.getElementById('emailError');
  if (!emailRegex.test(emailInput.value.trim())) {
    emailError.textContent = 'Please enter a valid email address';
  } else {
    emailError.textContent = '';
  }
});

messageInput.addEventListener('blur', () => {
  const messageError = document.getElementById('messageError');
  if (messageInput.value.trim().length < 10) {
    messageError.textContent = 'Message must be at least 10 characters';
  } else {
    messageError.textContent = '';
  }
});

// =====================================================
// SKILL BAR ANIMATION ON SCROLL
// =====================================================

function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.style.width;
        entry.target.style.width = '0';
        setTimeout(() => {
          entry.target.style.width = width;
        }, 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  skillBars.forEach(bar => {
    observer.observe(bar);
  });
}

window.addEventListener('DOMContentLoaded', animateSkillBars);

// =====================================================
// SCROLL TO TOP BUTTON (Optional Enhancement)
// =====================================================

const scrollToTopButton = document.createElement('button');
scrollToTopButton.classList.add('scroll-to-top');
scrollToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
scrollToTopButton.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #00d9ff, #a855f7);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 999;
  transition: all 0.3s ease;
  box-shadow: 0 0 30px rgba(0, 217, 255, 0.4);
`;

document.body.appendChild(scrollToTopButton);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollToTopButton.style.display = 'flex';
  } else {
    scrollToTopButton.style.display = 'none';
  }
});

scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

scrollToTopButton.addEventListener('mouseover', () => {
  scrollToTopButton.style.transform = 'scale(1.1)';
});

scrollToTopButton.addEventListener('mouseout', () => {
  scrollToTopButton.style.transform = 'scale(1)';
});

// =====================================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// =====================================================

window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section[id]');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 150) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// Add active styling
const style = document.createElement('style');
style.textContent = `
  .nav-link.active {
    color: #00d9ff;
  }
  
  .nav-link.active::after {
    width: 100%;
  }
`;
document.head.appendChild(style);

// =====================================================
// PARALLAX EFFECT (Optional Enhancement)
// =====================================================

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  parallaxElements.forEach(el => {
    const speed = el.dataset.parallax || 0.5;
    el.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// =====================================================
// PAGE LOAD ANIMATION
// =====================================================

window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.3s ease';

// Trigger opacity animation
setTimeout(() => {
  document.body.style.opacity = '1';
}, 100);