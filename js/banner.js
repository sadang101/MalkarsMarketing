document.addEventListener('DOMContentLoaded', function() {
    const banner = document.querySelector('.marketing-banner');
    const closeButton = document.querySelector('.banner-close');
    
    // Check if banner was previously closed
    const isBannerClosed = localStorage.getItem('bannerClosed') === 'true';
    
    if (isBannerClosed) {
        banner.style.display = 'none';
    }
    
    // Close banner and save state
    if (closeButton) {
        closeButton.addEventListener('click', function(e) {
            e.preventDefault();
            banner.style.animation = 'slideUp 0.3s ease-out';
            
            // Wait for animation to complete before hiding
            setTimeout(() => {
                banner.style.display = 'none';
                // Save state to localStorage
                localStorage.setItem('bannerClosed', 'true');
            }, 300);
        });
    }
});

// Add slideUp animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(-100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
