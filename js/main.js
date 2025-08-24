// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navContent = document.querySelector('.nav-content');
const navLinks = document.querySelector('.nav-links');
const userTypeRadios = document.querySelectorAll('input[name="userType"]');
const studentField = document.getElementById('studentField');
const professionalField = document.getElementById('professionalField');
const enrollmentForm = document.getElementById('enrollmentForm');

// Mobile Menu Toggle
if (hamburger && navContent) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navContent.classList.toggle('active');
        document.body.style.overflow = navContent.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-links a, .nav-actions a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navContent.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Toggle between Student and Professional fields
userTypeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        if (e.target.value === 'student') {
            studentField.style.display = 'block';
            professionalField.style.display = 'none';
            document.getElementById('program').setAttribute('required', '');
            document.getElementById('designation').removeAttribute('required');
        } else {
            studentField.style.display = 'none';
            professionalField.style.display = 'block';
            document.getElementById('program').removeAttribute('required');
            document.getElementById('designation').setAttribute('required', '');
        }
    });
});

// Form Validation and Submission
if (enrollmentForm) {
    enrollmentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            fullName: document.getElementById('fullName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            age: document.getElementById('age').value,
            userType: document.querySelector('input[name="userType"]:checked').value,
            program: document.getElementById('program').value,
            designation: document.getElementById('designation').value.trim()
        };

        // Basic validation
        if (!formData.fullName || !formData.email || !formData.phone || !formData.age) {
            showAlert('Please fill in all required fields', 'error');
            return;
        }

        if (!isValidEmail(formData.email)) {
            showAlert('Please enter a valid email address', 'error');
            return;
        }

        if (!isValidPhone(formData.phone)) {
            showAlert('Please enter a valid 10-digit phone number', 'error');
            return;
        }

        if (formData.userType === 'student' && !formData.program) {
            showAlert('Please select your program', 'error');
            return;
        }

        if (formData.userType === 'professional' && !formData.designation) {
            showAlert('Please enter your designation', 'error');
            return;
        }

        // If validation passes, proceed to payment
        await processPayment(formData);
    });
}

// Email validation helper
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Phone validation helper
function isValidPhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
}

// Show alert message
function showAlert(message, type = 'success') {
    // Remove any existing alerts
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // Add styles
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.padding = '15px 25px';
    alertDiv.style.borderRadius = '6px';
    alertDiv.style.color = 'white';
    alertDiv.style.fontWeight = '500';
    alertDiv.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    alertDiv.style.zIndex = '1000';
    alertDiv.style.animation = 'slideIn 0.3s ease-out';
    
    if (type === 'error') {
        alertDiv.style.backgroundColor = '#ef4444'; // Red for errors
    } else {
        alertDiv.style.backgroundColor = '#10b981'; // Green for success
    }
    
    document.body.appendChild(alertDiv);
    
    // Remove alert after 5 seconds
    setTimeout(() => {
        alertDiv.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            alertDiv.remove();
        }, 300);
    }, 5000);
}

// Process Payment (Integration with Razorpay)
async function processPayment(formData) {
    try {
        // In a real application, you would make an API call to your backend
        // to create a Razorpay order. For this example, we'll simulate it.
        
        showAlert('Redirecting to payment gateway...', 'success');
        
        // Simulate API call to create order
        const orderData = await createRazorpayOrder(formData);
        
        // Initialize Razorpay
        const options = {
            key: 'YOUR_RAZORPAY_KEY', // Replace with your Razorpay key
            amount: orderData.amount, // Amount in paise (e.g., 1000 = ₹10)
            currency: 'INR',
            name: 'Malkars Marketing', // Your business name
            description: 'Advanced Course in Sales & Marketing',
            order_id: orderData.id,
            handler: function (response) {
                // Handle successful payment
                showAlert('Payment successful! Redirecting to dashboard...', 'success');
                
                // In a real app, you would verify the payment signature here
                // and then submit the form data to your server
                setTimeout(() => {
                    // Redirect to dashboard or success page
                    window.location.href = 'student/dashboard.html';
                }, 2000);
            },
            prefill: {
                name: formData.fullName,
                email: formData.email,
                contact: formData.phone
            },
            theme: {
                color: '#2563eb'
            },
            modal: {
                ondismiss: function() {
                    // Handle when user closes the payment modal
                    showAlert('Payment was cancelled', 'error');
                }
            }
        };
        
        const rzp = new Razorpay(options);
        rzp.open();
        
    } catch (error) {
        console.error('Payment error:', error);
        showAlert('Error processing payment. Please try again later.', 'error');
    }
}

// Simulated function to create a Razorpay order
async function createRazorpayOrder(formData) {
    // In a real app, this would be an API call to your backend
    return new Promise((resolve) => {
        // Simulate API delay
        setTimeout(() => {
            resolve({
                id: 'order_' + Math.random().toString(36).substr(2, 9),
                amount: 99900, // ₹999 in paise
                currency: 'INR',
                status: 'created'
            });
        }, 1000);
    });
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.card, .feature, .highlight-cards');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
window.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card, .feature');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger initial animation check
    animateOnScroll();
});

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);
