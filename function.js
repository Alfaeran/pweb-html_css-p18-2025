// Tony Stark Portfolio - JavaScript Functionality
// Iron Man Superior Theme with Modern Futuristic Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initThemeToggle();
    initMobileMenu();
    initSmoothScrolling();
    initPortfolioFilter();
    initScrollAnimations();
    initSkillBars();
    initFormHandling();
    initInteractiveEffects();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const html = document.documentElement;
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });
    
    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update theme icons with animation
        const moonIcon = themeIcon.querySelector('.moon-icon');
        const sunIcon = themeIcon.querySelector('.sun-icon');
        
        themeIcon.style.transform = 'scale(0)';
        setTimeout(() => {
            if (theme === 'light') {
                moonIcon.style.display = 'block';
                sunIcon.style.display = 'none';
            } else {
                moonIcon.style.display = 'none';
                sunIcon.style.display = 'block';
            }
            themeIcon.style.transform = 'scale(1)';
        }, 150);
        
        // Add glitch effect to logo when switching themes
        const logo = document.querySelector('.logo-text');
        logo.classList.add('glitch');
        setTimeout(() => {
            logo.classList.remove('glitch');
        }, 300);
    }
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const mobileOverlay = document.getElementById('mobileMenuOverlay');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!mobileToggle || !navMenu || !mobileOverlay) return;
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
            navMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            navMenu.classList.add('active');
            mobileOverlay.classList.add('active');
            mobileToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        navMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Event listeners
    mobileToggle.addEventListener('click', toggleMobileMenu);
    mobileOverlay.addEventListener('click', closeMobileMenu);
    
    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// Smooth Scrolling Navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    
    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 100;
        
        // Add/remove navbar background on scroll
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                navbar.style.background = 'rgba(26, 26, 26, 0.98)';
            }
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            }
        }
        
        // Update active nav link
        navLinks.forEach(link => {
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const sectionTop = targetSection.offsetTop;
                const sectionBottom = sectionTop + targetSection.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });
    
    // Smooth scroll to sections
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Portfolio Filter Functionality
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter portfolio items with animation
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.6s ease-out';
                } else {
                    item.style.animation = 'fadeOut 0.3s ease-out';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Scroll-based Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('hero-avatar')) {
                    entry.target.classList.add('floating');
                }
                
                if (entry.target.classList.contains('stat')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .hero-content,
        .about-content,
        .portfolio-item,
        .skill-item,
        .contact-item,
        .award-item,
        .stat,
        .hero-avatar
    `);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Animated Counter for Statistics
function animateCounter(element) {
    const statNumber = element.querySelector('.stat-number');
    if (!statNumber || statNumber.hasAttribute('data-animated')) return;
    
    const finalNumber = statNumber.textContent;
    const numericValue = parseInt(finalNumber.replace(/\D/g, ''));
    const suffix = finalNumber.replace(/\d/g, '');
    
    statNumber.setAttribute('data-animated', 'true');
    
    let currentNumber = 0;
    const increment = numericValue / 50;
    
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= numericValue) {
            currentNumber = numericValue;
            clearInterval(timer);
        }
        statNumber.textContent = Math.floor(currentNumber) + suffix;
    }, 40);
}

// Skill Bar Animations
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 200);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Form Handling
function initFormHandling() {
    const form = document.querySelector('.form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = form.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.style.opacity = '0.7';
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                showNotification('Message sent successfully! Tony will get back to you soon.', 'success');
                
                // Reset form
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.style.opacity = '1';
            }, 2000);
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: var(--bg-secondary);
        border: 2px solid var(--text-accent);
        border-radius: 10px;
        color: var(--text-primary);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 4px 20px var(--shadow-color);
        max-width: 400px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    `;
    
    const closeBtn = notification.querySelector('button');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: var(--text-accent);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Interactive Effects
function initInteractiveEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroAvatar = document.querySelector('.hero-avatar');
        
        if (heroAvatar) {
            const speed = scrolled * 0.5;
            heroAvatar.style.transform = `translateY(${speed}px)`;
        }
    });
    
    // Mouse follow effect for cursor
    let cursor = null;
    
    document.addEventListener('mousemove', (e) => {
        if (!cursor) {
            cursor = document.createElement('div');
            cursor.className = 'custom-cursor';
            cursor.style.cssText = `
                position: fixed;
                width: 20px;
                height: 20px;
                background: var(--bg-accent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.1s ease;
                opacity: 0.7;
                mix-blend-mode: difference;
            `;
            document.body.appendChild(cursor);
        }
        
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Enhanced hover effects for interactive elements
    const interactiveElements = document.querySelectorAll(`
        .btn,
        .portfolio-item,
        .skill-tag,
        .award-item,
        .contact-item
    `);
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            if (cursor) {
                cursor.style.transform = 'scale(2)';
            }
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            if (cursor) {
                cursor.style.transform = 'scale(1)';
            }
        });
    });
    
    // Typing effect for hero text
    const heroRole = document.querySelector('.hero-role');
    if (heroRole) {
        const text = heroRole.textContent;
        heroRole.textContent = '';
        
        let i = 0;
        const typeTimer = setInterval(() => {
            heroRole.textContent += text.charAt(i);
            i++;
            if (i > text.length) {
                clearInterval(typeTimer);
            }
        }, 100);
    }
    
    // Glow effect on scroll for navigation
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 2px 20px var(--shadow-color)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
}

// Additional CSS animations via JavaScript
const additionalStyles = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(0.8);
        }
    }
    
    @keyframes slideOutRight {
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--nav-bg);
        backdrop-filter: blur(10px);
        padding: 2rem;
        border-top: 1px solid var(--border-color);
        animation: slideInDown 0.3s ease-out;
    }
    
    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll-heavy functions
const debouncedScrollHandler = debounce(() => {
    // Scroll-based logic here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Preload fonts for better performance
const fontPreload = document.createElement('link');
fontPreload.rel = 'preload';
fontPreload.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@300;400;500;600;700&display=swap';
fontPreload.as = 'style';
document.head.appendChild(fontPreload);

// Add loading indicator
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add sparkle effect to the hero section
    createSparkleEffect();
});

function createSparkleEffect() {
    const hero = document.querySelector('.hero');
    const sparkleContainer = document.createElement('div');
    sparkleContainer.className = 'sparkle-container';
    sparkleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        overflow: hidden;
    `;
    
    hero.appendChild(sparkleContainer);
    
    // Create sparkles
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createSparkle(sparkleContainer);
        }, i * 100);
    }
}

function createSparkle(container) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--primary-gold);
        border-radius: 50%;
        animation: sparkleFloat 3s linear infinite;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: 0;
    `;
    
    const sparkleAnimation = `
        @keyframes sparkleFloat {
            0% {
                opacity: 0;
                transform: translateY(0) scale(0);
            }
            50% {
                opacity: 1;
                transform: translateY(-50px) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-100px) scale(0);
            }
        }
    `;
    
    if (!document.querySelector('#sparkle-styles')) {
        const sparkleStyleSheet = document.createElement('style');
        sparkleStyleSheet.id = 'sparkle-styles';
        sparkleStyleSheet.textContent = sparkleAnimation;
        document.head.appendChild(sparkleStyleSheet);
    }
    
    container.appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => {
        if (sparkle.parentElement) {
            sparkle.remove();
        }
    }, 3000);
    
    // Create new sparkle
    setTimeout(() => {
        if (container.parentElement) {
            createSparkle(container);
        }
    }, Math.random() * 2000 + 1000);
}

console.log('Tony Stark Portfolio Initialized - Iron Man Superior Theme Active!');
