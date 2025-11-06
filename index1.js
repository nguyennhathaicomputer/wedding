// Opening Card Animation Sequence with Card Opening Effect
document.addEventListener('DOMContentLoaded', () => {
    // Get all elements
    const openingOverlay = document.getElementById('openingOverlay');
    const cardClosedWrapper = document.getElementById('cardClosedWrapper');
    const cardOpenedWrapper = document.getElementById('cardOpenedWrapper');
    const flyingPhoto1 = document.getElementById('flyingPhoto1');
    const flyingPhoto2 = document.getElementById('flyingPhoto2');
    
    // Disable body scroll during opening animation
    document.body.style.overflow = 'hidden';
    
    // Animation sequence with card opening effect
    setTimeout(() => {
        // Step 1: Closed card appears (automatic via CSS animation)
    }, 500);
    
    setTimeout(() => {
        // Step 2: Hide closed card with fade out
        cardClosedWrapper.classList.add('hide');
    }, 2200);
    
    setTimeout(() => {
        // Step 3: Show opened card (still closed position)
        cardOpenedWrapper.classList.add('show');
    }, 2800);
    
    setTimeout(() => {
        // Step 4: Start opening the card slowly (split effect)
        cardOpenedWrapper.classList.add('opening');
    }, 3200);
    
    setTimeout(() => {
        // Step 5: Fly out the photos from the center after card opens
        flyingPhoto1.classList.add('fly-out');
        flyingPhoto2.classList.add('fly-out');
    }, 5200);
    
    setTimeout(() => {
        // Step 6: Hide overlay and show main content
        openingOverlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
        
        // Scroll to hero section smoothly
        const heroSection = document.getElementById('heroSection');
        if (heroSection) {
            heroSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 7500);
    
    // Initialize other animations
    initScrollAnimations();
});

// Smooth scroll animation observer for sections
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const fadeInSections = document.querySelectorAll('.fade-in-section');
    fadeInSections.forEach(section => {
        observer.observe(section);
    });
}

// Parallax effect for hero section
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const heroSection = document.querySelector('.hero-section');
            
            if (heroSection) {
                // Only apply parallax if we haven't scrolled past the hero section
                if (scrolled < window.innerHeight) {
                    heroSection.style.transform = `translateY(${scrolled * 0.4}px)`;
                    heroSection.style.opacity = Math.max(1 - scrolled / 700, 0);
                }
            }
            
            ticking = false;
        });
        
        ticking = true;
    }
});

// Smooth scroll for anchor links
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

// Add floating animation to gallery items when they become visible
const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.animation = `fadeInUp 0.6s ease forwards`;
            }, index * 100);
            galleryObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

// Observe gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    galleryObserver.observe(item);
});

// Add heart animation on scroll
const heartElement = document.querySelector('.heart');
if (heartElement) {
    window.addEventListener('scroll', () => {
        const scrollPercentage = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercentage > 5 && scrollPercentage < 95) {
            heartElement.style.animation = 'heartbeat 1s ease-in-out infinite';
        }
    });
}

// Handle window resize to ensure responsive layout
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Force recalculation of viewport-based units
        document.body.style.height = 'auto';
        setTimeout(() => {
            document.body.style.height = '';
        }, 10);
    }, 250);
});