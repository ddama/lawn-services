// Enhanced functionality for GreenBlades Lawn Services website
// Production-ready version for GitHub Pages

document.addEventListener('DOMContentLoaded', function() {
    try {
        // Smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Active navigation highlighting
        window.addEventListener('scroll', function() {
            try {
                const sections = document.querySelectorAll('.section, #header');
                const navLinks = document.querySelectorAll('nav a');
                
                let current = 'header';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 100;
                    if (window.pageYOffset >= sectionTop) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + current) {
                        link.classList.add('active');
                    }
                });
            } catch (error) {
                console.warn('Navigation highlighting error:', error);
            }
        });

        // Form submission handling
        const contactForm = document.querySelector('form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                try {
                    // Get form data
                    const name = this.querySelector('input[name="name"]').value;
                    const email = this.querySelector('input[name="email"]').value;
                    const phone = this.querySelector('input[name="phone"]').value;
                    const message = this.querySelector('textarea[name="message"]').value;
                    
                    // Basic validation
                    if (!name || !email || !message) {
                        alert('Please fill in all required fields (Name, Email, and Message).');
                        return;
                    }
                    
                    // Email validation
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(email)) {
                        alert('Please enter a valid email address.');
                        return;
                    }
                    
                    // Simulate form submission (replace with actual form handling)
                    const submitBtn = this.querySelector('.submit-btn');
                    const originalText = submitBtn.textContent;
                    submitBtn.textContent = 'Sending...';
                    submitBtn.disabled = true;
                    
                    setTimeout(() => {
                        alert('Thank you for your message! We\'ll get back to you within 24 hours.');
                        this.reset();
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 1500);
                } catch (error) {
                    console.error('Form submission error:', error);
                    alert('There was an error submitting the form. Please try again.');
                }
            });
        }

        // Add animation on scroll with error handling
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, observerOptions);

            // Observe all service cards, pricing cards, and testimonials
            const animatedElements = document.querySelectorAll('.service-card, .pricing-card, .testimonial, .feature');
            animatedElements.forEach(el => {
                observer.observe(el);
            });
        }

        // Add loading animation for service icons
        const serviceIcons = document.querySelectorAll('.service-icon');
        serviceIcons.forEach((icon, index) => {
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
                icon.style.opacity = '1';
            }, index * 200);
        });

        // Phone number formatting
        const phoneInputs = document.querySelectorAll('input[type="tel"]');
        phoneInputs.forEach(input => {
            input.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length >= 6) {
                    value = `(${value.slice(0,3)}) ${value.slice(3,6)}-${value.slice(6,10)}`;
                } else if (value.length >= 3) {
                    value = `(${value.slice(0,3)}) ${value.slice(3)}`;
                }
                
                e.target.value = value;
            });
        });

    } catch (error) {
        console.error('JavaScript initialization error:', error);
    }
});
