// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
    
    // Testimonial Slider
    initTestimonialSlider();
    
    // Image Sliders for Destinations
    initImageSliders();
    
    // FAQ Toggles
    initFAQToggles();
});

// Testimonial Slider
function initTestimonialSlider() {
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    
    if (testimonials.length === 0) return;
    
    // Auto slide every 5 seconds
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Initialize dots click events
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });
}

// Show specific testimonial
function showTestimonial(index) {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
}

// Function to be called from HTML
function currentTestimonial(index) {
    showTestimonial(index);
}

// Image Sliders for Destinations
function initImageSliders() {
    // Initialize all image sliders on the page
    const sliders = document.querySelectorAll('.image-slider');
    
    sliders.forEach((slider, sliderIndex) => {
        const slides = slider.querySelectorAll('img');
        if (slides.length === 0) return;
        
        // Set initial state
        slides[0].classList.add('active');
    });
}

// Change slide function (called from HTML)
function changeSlide(direction, sliderIndex) {
    const sliders = document.querySelectorAll('.image-slider');
    if (!sliders[sliderIndex]) return;
    
    const slides = sliders[sliderIndex].querySelectorAll('img');
    if (slides.length === 0) return;
    
    // Find current active slide
    let currentIndex = 0;
    slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            currentIndex = index;
        }
    });
    
    // Remove active class from current slide
    slides[currentIndex].classList.remove('active');
    
    // Calculate new index
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = slides.length - 1;
    if (newIndex >= slides.length) newIndex = 0;
    
    // Add active class to new slide
    slides[newIndex].classList.add('active');
}

// // FAQ Toggle
// function initFAQToggles() {
//     const faqItems = document.querySelectorAll('.faq-item');
    
//     faqItems.forEach(item => {
//         const question = item.querySelector('.faq-question');
//         if (question) {
//             question.addEventListener('click', () => {
//                 // Close all other FAQs
//                 faqItems.forEach(otherItem => {
//                     if (otherItem !== item) {
//                         otherItem.classList.remove('active');
//                     }
//                 });
                
//                 // Toggle current FAQ
//                 item.classList.toggle('active');
//             });
//         }
//     });
// }

// // Toggle FAQ function (called from HTML)
// function toggleFAQ(element) {
//     const faqItem = element.closest('.faq-item');
//     faqItem.classList.toggle('active');
// }

// Form Validation
function validateForm() {
    let isValid = true;
    
    // Reset error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(message => {
        message.textContent = '';
    });
    
    // Validate name
    const name = document.getElementById('name');
    if (!name.value.trim()) {
        document.getElementById('nameError').textContent = 'Please enter your name';
        isValid = false;
    }
    
    // Validate email
    const email = document.getElementById('email');
    if (!email.value.trim()) {
        document.getElementById('emailError').textContent = 'Please enter your email';
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    }
    
    // Validate phone (optional but must be valid if provided)
    const phone = document.getElementById('phone');
    if (phone.value.trim() && !isValidPhone(phone.value)) {
        document.getElementById('phoneError').textContent = 'Please enter a valid phone number';
        isValid = false;
    }
    
    // Validate message
    const message = document.getElementById('message');
    if (!message.value.trim()) {
        document.getElementById('messageError').textContent = 'Please enter your message';
        isValid = false;
    }
    
    // Show success message if valid
    if (isValid) {
        const successMessage = document.getElementById('formSuccess');
        successMessage.style.display = 'block';
        successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
    
    return false; // Prevent form submission (would be true in a real application)
}

// Email validation helper
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Phone validation helper
function isValidPhone(phone) {
    const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return re.test(String(phone));
}