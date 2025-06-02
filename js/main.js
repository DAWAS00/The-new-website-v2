// Email Subscription Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const subscribeBtn = document.getElementById('subscribeBtn');
    const emailInput = document.getElementById('subscribeEmail');
    const feedbackElement = document.getElementById('subscriptionFeedback');
    
    if (subscribeBtn && emailInput && feedbackElement) {
        subscribeBtn.addEventListener('click', function() {
            // Reset previous feedback
            feedbackElement.style.display = 'none';
            feedbackElement.className = 'mt-2';
            emailInput.classList.remove('is-invalid');
            
            // Get email value and trim whitespace
            const email = emailInput.value.trim();
            
            // Check if empty
            if (email === '') {
                showError('Please enter your email address');
                return;
            }
            
            // Validate email format using regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('Please enter a valid email address');
                return;
            }
            
            // If validation passes, show success message
            showSuccess('Thank you! Your subscription has been confirmed.');
            
            // Clear the input field
            emailInput.value = '';
        });
    }
    
    function showError(message) {
        emailInput.classList.add('is-invalid');
        feedbackElement.innerHTML = message;
        feedbackElement.className = 'mt-2 text-danger';
        feedbackElement.style.display = 'block';
    }
    
    function showSuccess(message) {
        feedbackElement.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i>${message}`;
        feedbackElement.className = 'mt-2 text-success';
        feedbackElement.style.display = 'block';
    }
});