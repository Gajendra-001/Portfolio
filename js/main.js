// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animation observers
    initAnimations();
    
    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize scroll progress bar
    initScrollProgress();
    
    // Initialize contact form
    initContactForm();
});

// Handle fade-in animations on scroll
function initAnimations() {
    const animatedElements = document.querySelectorAll('.animate-fade-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach((element) => {
        observer.observe(element);
    });
    
    // Manually trigger animations that are already visible on page load
    setTimeout(() => {
        animatedElements.forEach((element) => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                element.classList.add('visible');
            }
        });
    }, 100);
}

// Custom cursor implementation
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    
    if (!cursor || !cursorDot) return;
    
    // Show cursors after a short delay
    setTimeout(() => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    }, 1000);
    
    document.addEventListener('mousemove', (e) => {
        // Main cursor follows with some delay
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Dot cursor follows instantly
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
    
    // Handle hover effects
    const hoverElements = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-badge');
    
    hoverElements.forEach((element) => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.borderColor = 'var(--accent)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderColor = 'var(--accent)';
        });
    });
    
    // Hide cursor when leaving the window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });
}

// Scroll progress bar
function initScrollProgress() {
    const progressBar = document.getElementById('progressBar');
    
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        progressBar.style.width = scrolled + '%';
    });
}

// Typing effect for hero section
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-effect');
    
    if (!typingElement) return;
    
    // Get the text to type
    const text = typingElement.textContent;
    typingElement.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, 100);
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate form data
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Here you would typically send the data to your backend
        // For demonstration, we'll just show a success message
        alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
        
        // Reset the form
        contactForm.reset();
    });
}