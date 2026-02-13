// ============================================
// Mobile Navigation Toggle
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ============================================
// Smooth Scrolling
// ============================================
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

// ============================================
// Scroll Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Observe cards
document.querySelectorAll('.feature-card, .pricing-card, .team-card').forEach(card => {
    card.classList.add('fade-in');
    observer.observe(card);
});

// ============================================
// Active Navigation on Scroll
// ============================================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// Counter Animation for Stats
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '%';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '%';
        }
    }, 16);
}

// Trigger counter animation when visible
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                statNumber.classList.add('animated');
                const text = statNumber.textContent;
                const number = parseInt(text);
                animateCounter(statNumber, number);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.problem-stats').forEach(stat => {
    statObserver.observe(stat);
});

// ============================================
// Pricing Card Hover Effect
// ============================================
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        if (this.classList.contains('featured')) {
            this.style.transform = 'scale(1.05)';
        } else {
            this.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// ============================================
// Form Validation (if you add a contact form)
// ============================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ============================================
// Loading Animation
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add stagger animation to hero elements
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
});

// ============================================
// Parallax Effect for Hero Section
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroIllustration = document.querySelector('.hero-illustration');
    if (heroIllustration) {
        heroIllustration.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ============================================
// Table Responsive Wrapper
// ============================================
function makeTablesResponsive() {
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
        if (!table.parentElement.classList.contains('comparison-table')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'table-responsive';
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        }
    });
}

makeTablesResponsive();

// ============================================
// Add to Calendar Functionality (Optional)
// ============================================
function addToCalendar(event) {
    // Implementation for adding events to calendar
    console.log('Add to calendar:', event);
}

// ============================================
// Cookie Consent (Optional)
// ============================================
function showCookieConsent() {
    if (!localStorage.getItem('cookieConsent')) {
        // Show cookie consent banner
        console.log('Show cookie consent');
    }
}

// ============================================
// Newsletter Subscription (Optional)
// ============================================
function subscribeNewsletter(email) {
    if (validateEmail(email)) {
        console.log('Subscribe:', email);
        return true;
    }
    return false;
}

// ============================================
// Lazy Loading Images (Optional)
// ============================================
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ============================================
// Print Functionality
// ============================================
function printPage() {
    window.print();
}

// ============================================
// Share Functionality
// ============================================
async function shareContent() {
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Calm Nest - Mental Health Support',
                text: 'Check out Calm Nest for 24/7 mental health support',
                url: window.location.href
            });
        } catch (err) {
            console.log('Error sharing:', err);
        }
    } else {
        // Fallback for browsers that don't support Web Share API
        copyToClipboard(window.location.href);
        alert('Link copied to clipboard!');
    }
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// ============================================
// Back to Top Button
// ============================================
function createBackToTopButton() {
    const button = document.createElement('button');
    button.className = 'back-to-top';
    button.innerHTML = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.5rem;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

createBackToTopButton();

// ============================================
// Console Welcome Message
// ============================================
console.log(
    '%c🧘 Welcome to Calm Nest! 🧘',
    'font-size: 20px; font-weight: bold; color: #667eea;'
);
console.log(
    '%cYour safe space for mental well-being',
    'font-size: 14px; color: #764ba2;'
);
