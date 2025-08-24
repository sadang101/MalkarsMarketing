// Countdown Timer
function updateCountdown() {
    // Set the date we're counting down to (48 hours from now)
    const countDownDate = new Date();
    countDownDate.setHours(countDownDate.getHours() + 48);
    
    // Update the countdown every 1 second
    const x = setInterval(function() {
        // Get today's date and time
        const now = new Date().getTime();
        
        // Find the distance between now and the countdown date
        const distance = countDownDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
        
        // If the countdown is finished, clear the interval
        if (distance < 0) {
            clearInterval(x);
            if (daysElement) daysElement.textContent = '00';
            if (hoursElement) hoursElement.textContent = '00';
            if (minutesElement) minutesElement.textContent = '00';
            if (secondsElement) secondsElement.textContent = '00';
        }
    }, 1000);
}

// Initialize the countdown when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    updateCountdown();
    
    // Add animation classes for scroll reveal
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach((card, index) => {
        card.classList.add('reveal');
        card.setAttribute('data-animate', 'fadeInUp');
        card.setAttribute('data-delay', (index * 100).toString());
    });
});
