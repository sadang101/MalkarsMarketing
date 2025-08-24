// Intersection Observer for scroll animations
const animateOnScroll = () => {
    // Reveal elements with .reveal class when they come into view
    const revealElements = document.querySelectorAll('.reveal');
    const textRevealElements = document.querySelectorAll('.text-reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Unobserve after animation
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all reveal elements
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Special handling for text reveal animation
    textRevealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Animate elements with data-animate attribute
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animationType = entry.target.getAttribute('data-animate');
                const delay = entry.target.getAttribute('data-delay') || '0';
                
                // Apply the animation with delay
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Add specific animation classes based on data-animate value
                    if (animationType === 'fadeInUp') {
                        entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                    } else if (animationType === 'fadeIn') {
                        entry.target.style.animation = 'fadeIn 1s ease-out forwards';
                    } else if (animationType === 'slideInLeft') {
                        entry.target.style.animation = 'slideInLeft 0.8s ease-out forwards';
                    } else if (animationType === 'slideInRight') {
                        entry.target.style.animation = 'slideInRight 0.8s ease-out forwards';
                    }
                    
                    // Unobserve after animation
                    animationObserver.unobserve(entry.target);
                }, parseInt(delay));
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all animated elements
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll animations
    animateOnScroll();
    
    // Re-run animations when window is resized
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            animateOnScroll();
        }, 250);
    });
});

// Export for use in other files if needed
window.animateOnScroll = animateOnScroll;
