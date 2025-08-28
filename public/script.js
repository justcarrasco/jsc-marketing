// Password Protection
const PASSWORD = 'jason2025'; // Change this to your desired password

// Check if user is already authenticated
function checkAuth() {
    const isAuthenticated = localStorage.getItem('portfolio_authenticated');
    if (isAuthenticated === 'true') {
        showContent();
    }
}

// Show main content
function showContent() {
    const passwordOverlay = document.getElementById('password-overlay');
    const mainContent = document.getElementById('main-content');
    
    if (passwordOverlay && mainContent) {
        passwordOverlay.style.display = 'none';
        mainContent.style.display = 'block';
        setTimeout(() => {
            mainContent.classList.add('show');
        }, 100);
    }
}

// Handle password submission
function handlePasswordSubmit() {
    const passwordInput = document.getElementById('password-input');
    const passwordError = document.getElementById('password-error');
    
    if (!passwordInput) return;
    
    const enteredPassword = passwordInput.value.trim();
    
    if (enteredPassword === PASSWORD) {
        localStorage.setItem('portfolio_authenticated', 'true');
        showContent();
        if (passwordError) passwordError.textContent = '';
    } else {
        if (passwordError) passwordError.textContent = 'Incorrect password. Please try again.';
        passwordInput.value = '';
        passwordInput.focus();
    }
}

// Main content functionality
document.addEventListener('DOMContentLoaded', function() {
    // Password protection setup
    const passwordOverlay = document.getElementById('password-overlay');
    const mainContent = document.getElementById('main-content');
    const passwordInput = document.getElementById('password-input');
    const passwordSubmit = document.getElementById('password-submit');
    const passwordError = document.getElementById('password-error');

    // Event listeners for password protection
    if (passwordSubmit) {
        passwordSubmit.addEventListener('click', handlePasswordSubmit);
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handlePasswordSubmit();
            }
        });
    }

    // Check authentication on page load
    checkAuth();

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Add animation on scroll for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.case-study-card, .client-logo, .stat-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add hover effects for buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}); 