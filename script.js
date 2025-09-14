// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'linear-gradient(135deg, #ff843d 0%, #f9b994 100%)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'linear-gradient(135deg, #ff843d 0%, #f9b994 100%)';
        header.style.boxShadow = 'none';
    }
});

// Form submission handling
const appointmentForm = document.querySelector('.appointment-form');
if (appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.phone || !data.service) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Veuillez entrer une adresse email valide.');
            return;
        }
        
        // Phone validation
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(data.phone)) {
            alert('Veuillez entrer un numéro de téléphone valide.');
            return;
        }
        
        // Simulate form submission (replace with actual backend integration)
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Envoi en cours...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Merci pour votre demande de rendez-vous ! Nous vous contacterons dans les plus brefs délais.');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Lazy loading for images
const images = document.querySelectorAll('img[loading="lazy"]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .about-content, .contact-content');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Service cards hover effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Testimonial cards hover effect
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.01)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Contact form field focus effects
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(field => {
    field.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    field.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Phone number formatting
const phoneInput = document.querySelector('input[name="phone"]');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value.length <= 2) {
                value = value;
            } else if (value.length <= 4) {
                value = value.slice(0, 2) + ' ' + value.slice(2);
            } else if (value.length <= 6) {
                value = value.slice(0, 2) + ' ' + value.slice(2, 4) + ' ' + value.slice(4);
            } else if (value.length <= 8) {
                value = value.slice(0, 2) + ' ' + value.slice(2, 4) + ' ' + value.slice(4, 6) + ' ' + value.slice(6);
            } else {
                value = value.slice(0, 2) + ' ' + value.slice(2, 4) + ' ' + value.slice(4, 6) + ' ' + value.slice(6, 8) + ' ' + value.slice(8, 10);
            }
        }
        
        e.target.value = value;
    });
}

// Back to top button functionality
const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg,rgb(246, 201, 144) 50%,rgb(255, 188, 106) 0%,hsl(28, 98.80%, 66.70%) 100%);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    `;
    
    document.body.appendChild(button);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-3px) scale(1.1)';
        button.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0) scale(1)';
        button.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
    });
};

// Initialize back to top button
createBackToTopButton();

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// SEO: Add structured data for better search engine visibility
const addStructuredData = () => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "MedicalBusiness",
        "name": "Cabinet de Podologie Dr. [Votre Nom]",
        "description": "Cabinet de podologie offrant des soins professionnels des pieds",
        "url": window.location.href,
        "telephone": "[Votre Téléphone]",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "[Votre Adresse]",
            "addressLocality": "[Votre Ville]",
            "postalCode": "[Code Postal]",
            "addressCountry": "FR"
        },
        "openingHours": "Mo-Fr 09:00-18:00",
        "priceRange": "€€",
        "medicalSpecialty": "Podiatry",
        "sameAs": [
            "https://www.facebook.com/votre-page",
            "https://www.linkedin.com/in/votre-profil"
        ]
    });
    
    document.head.appendChild(script);
};

// Initialize structured data
addStructuredData();

// Performance optimization: Preload critical resources
const preloadCriticalResources = () => {
    const criticalImages = [
        'images/podologue-hero.jpg',
        'images/doctor-profile.jpg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
};

// Initialize preloading
preloadCriticalResources();

// Carousel functionality
class Carousel {
    constructor(container) {
        this.container = container;
        this.slides = container.querySelectorAll('.carousel-slide');
        this.indicators = container.querySelectorAll('.indicator');
        this.prevBtn = container.querySelector('.carousel-btn.prev');
        this.nextBtn = container.querySelector('.carousel-btn.next');
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 seconds
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.startAutoPlay();
        this.updateSlide();
    }
    
    bindEvents() {
        // Previous button
        this.prevBtn.addEventListener('click', () => {
            this.stopAutoPlay();
            this.previousSlide();
            this.startAutoPlay();
        });
        
        // Next button
        this.nextBtn.addEventListener('click', () => {
            this.stopAutoPlay();
            this.nextSlide();
            this.startAutoPlay();
        });
        
        // Indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.stopAutoPlay();
                this.goToSlide(index);
                this.startAutoPlay();
            });
        });
        
        // Pause on hover
        this.container.addEventListener('mouseenter', () => {
            this.stopAutoPlay();
        });
        
        this.container.addEventListener('mouseleave', () => {
            this.startAutoPlay();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.stopAutoPlay();
                this.previousSlide();
                this.startAutoPlay();
            } else if (e.key === 'ArrowRight') {
                this.stopAutoPlay();
                this.nextSlide();
                this.startAutoPlay();
            }
        });
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlide();
    }
    
    previousSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlide();
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlide();
    }
    
    updateSlide() {
        // Calculate transform value to show current slide
        const translateX = -this.currentSlide * 25; // Each slide is 25% of container width
        this.container.querySelector('.carousel-slides').style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        new Carousel(carouselContainer);
    }
});

const footprintContainer = document.querySelector('.footprints-background');
const section = document.getElementById('accueil');

function createFootprint(x, y, angle, isLeftFoot) {
  const paw = document.createElement('div');
  paw.classList.add('paw');
  paw.style.left = x + '%';
  paw.style.top = y + '%';

  const scale = isLeftFoot ? -1 : 1;
  paw.style.transform = `rotate(${angle}deg) scaleX(${scale})`;

  const img = document.createElement('img');
  img.src = 'images/footprint_new.svg';
  paw.appendChild(img);

  footprintContainer.appendChild(paw);

  requestAnimationFrame(() => paw.style.opacity = 1);

  setTimeout(() => {
    paw.style.opacity = 0;
    setTimeout(() => {
      if (paw.parentNode) {
        paw.remove();
      }
    }, 450); // Wait slightly longer than CSS transition (400ms) to ensure completion
  }, 600); // footprint visible duration

  return paw;
}

// Get random starting point along section border
function getRandomStartPoint(section) {
  const rect = section.getBoundingClientRect();
  const side = Math.floor(Math.random() * 4);
  let x, y;

  switch (side) {
    case 0: // top
      x = Math.random() * rect.width;
      y = 0;
      break;
    case 1: // right
      x = rect.width;
      y = Math.random() * rect.height;
      break;
    case 2: // bottom
      x = Math.random() * rect.width;
      y = rect.height;
      break;
    case 3: // left
      x = 0;
      y = Math.random() * rect.height;
      break;
  }

  return { x: (x / rect.width) * 100, y: (y / rect.height) * 100 };
}

function generateSnakePath(totalSteps, stepLength = 4) {
    const path = [];
    
    // Choose a main direction: 0=right, PI/2=down, PI=left, -PI/2=up
    const mainAngleOptions = [0, Math.PI/2, Math.PI, -Math.PI/2];
    let mainAngle = mainAngleOptions[Math.floor(Math.random() * mainAngleOptions.length)];
  
    for (let i = 0; i < totalSteps; i++) {
      // small random deviation to create snake motion
      const deviation = (Math.random() - 0.5) * (Math.PI / 6); // ±30°
      const angle = mainAngle + deviation;
  
      const dx = Math.cos(angle) * stepLength;
      const dy = Math.sin(angle) * stepLength;
  
      path.push({ dx, dy });
    }
  
    return path;
  }
  
function walkPath(path, startX, startY, stepDuration = 600) {
  const rect = section.getBoundingClientRect();
  let x = startX;
  let y = startY;
  let stepIndex = 0;

  function nextStep() {
    if (stepIndex >= path.length) return;

    const step = path[stepIndex];
    let newX = x + step.dx;
    let newY = y - step.dy;

        // Check if the next step would go outside the section
        if (newX < 0 || newX > 100 || newY < 0 || newY > 100) {
            return; // Stop the animation
          }

    // Clamp inside section
    newX = Math.max(0, Math.min(100, newX));
    newY = Math.max(0, Math.min(100, newY));

    const deltaX = newX - x;
    const deltaY = newY - y;
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;

    // Perpendicular offset
    const length = Math.sqrt(deltaX*deltaX + deltaY*deltaY) || 1;
    const normX = deltaX / length;
    const normY = deltaY / length;
    const lateralOffset = 3;

    const isLeftFoot = stepIndex % 2 === 0;
    const footX = newX + (isLeftFoot ? -normY * lateralOffset : normY * lateralOffset);
    const footY = newY + (isLeftFoot ? normX * lateralOffset : -normX * lateralOffset);

    createFootprint(footX, footY, angle, isLeftFoot);

    x = newX;
    y = newY;
    stepIndex++;

    // Stop if next step goes outside section
    if (x < 0 || x > 100 || y < 0 || y > 100) return;

    setTimeout(nextStep, stepDuration);
  }

  nextStep();
}

// Spawn multiple paths
function spawnRandomPath() {
  const pathTypes = ["snake", "sine", "parabola"];
  const type = pathTypes[Math.floor(Math.random() * pathTypes.length)];
  const path = generateSnakePath(50);

  const start = getRandomStartPoint(section);
  const stepDuration = 500 + Math.random() * 400;

  walkPath(path, start.x, start.y, stepDuration);
}

// Spawn initial path
spawnRandomPath();

// Spawn a new path every 5 seconds
setInterval(spawnRandomPath, 3000);
