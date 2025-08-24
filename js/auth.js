document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const authForms = document.querySelectorAll('.auth-form');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and forms
            tabBtns.forEach(b => b.classList.remove('active'));
            authForms.forEach(form => form.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Show corresponding form
            const formId = `${btn.dataset.tab}-form`;
            document.getElementById(formId).classList.add('active');
        });
    });

    // Form submissions
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Here you would typically make an API call to your backend
            console.log('Login attempt with:', { email });
            // handleLogin(email, password);
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('full-name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // Here you would typically make an API call to your backend
            console.log('Registration attempt with:', { name, email });
            // handleRegister(name, email, password);
        });
    }

    // Google Sign In/Register
    const googleBtns = document.querySelectorAll('.btn-google');
    googleBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            // This would be replaced with actual Google OAuth implementation
            console.log('Google authentication initiated');
            // handleGoogleAuth();
        });
    });

    // Forgot password
    const forgotPassword = document.querySelector('.forgot-password');
    if (forgotPassword) {
        forgotPassword.addEventListener('click', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            if (email) {
                alert(`Password reset link will be sent to: ${email}`);
                // handleForgotPassword(email);
            } else {
                alert('Please enter your email address first');
                document.getElementById('login-email').focus();
            }
        });
    }
});

// These functions would be implemented to interact with your backend
/*
async function handleLogin(email, password) {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            // Store the token and redirect
            localStorage.setItem('token', data.token);
            window.location.href = '/dashboard';
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login');
    }
}

async function handleRegister(name, email, password) {
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await response.json();
        if (response.ok) {
            alert('Registration successful! Please check your email to verify your account.');
            // Switch to login tab
            document.querySelector('[data-tab="login"]').click();
        } else {
            alert(data.message || 'Registration failed');
        }
    } catch (error) {
        console.error('Registration error:', error);
        alert('An error occurred during registration');
    }
}

function handleGoogleAuth() {
    // This would be implemented using Google OAuth
    // window.location.href = '/api/auth/google';
}
*/
