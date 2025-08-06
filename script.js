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

        // Gallery image lazy loading and animation
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.style.opacity = '1';
                        img.style.transform = 'scale(1)';
                        imageObserver.unobserve(img);
                    }
                });
            });

            const galleryImages = document.querySelectorAll('.gallery-item img');
            galleryImages.forEach(img => {
                img.style.opacity = '0';
                img.style.transform = 'scale(0.8)';
                img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                imageObserver.observe(img);
            });
        }

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
                    const service = this.querySelector('select[name="service"]') ? this.querySelector('select[name="service"]').value : '';
                    const message = this.querySelector('textarea[name="message"]').value;
                    
                    // Basic validation
                    if (!name || !email || !message) {
                        alert('Please fill in all required fields (Name, Email, and Message).');
                        return;
                    }

                    if (this.querySelector('select[name="service"]') && !service) {
                        alert('Please select a service type.');
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
                        alert('Thank you for your interest! We\'ll contact you within 24 hours to schedule your free estimate.');
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

// Lightbox functionality
let currentImageIndex = 0;
const galleryImages = [
    {
        src: 'images/1000.6079cf372acdf9.43909082.jpg',
        title: 'Fire Pit & Outdoor Seating',
        description: 'Custom fire pit with natural stone seating area and stunning mountain views'
    },
    {
        src: 'images/1000.6079cfc29e0231.40574727.jpg',
        title: 'Water Features & Lighting',
        description: 'Custom waterfall with professional landscape lighting and natural stone work'
    },
    {
        src: 'images/1000.6131145a731bd3.82261839.jpg',
        title: 'Complete Backyard Transformation',
        description: 'Full patio installation with outdoor dining area and comprehensive landscaping'
    },
    {
        src: 'images/1000_F_288185574_0eqnHzrxeKROJxZfAbQZMHEhMvL6wnun.jpg',
        title: 'Fence Installation & Landscaping',
        description: 'Professional fence installation with integrated landscape design for privacy and beauty'
    },
    {
        src: 'images/240_F_30485307_5bH6uMOf6VaWzJaH2VTe9SLny60KVVaQ.jpg',
        title: 'Garden Design & Installation',
        description: 'Expert garden design with carefully selected plants and professional layout planning'
    }
];

function openLightbox(imgElement) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    
    // Find the index of the clicked image
    const clickedSrc = imgElement.src;
    currentImageIndex = galleryImages.findIndex(img => clickedSrc.includes(img.src.split('/').pop()));
    
    if (currentImageIndex === -1) currentImageIndex = 0;
    
    // Set the image and content
    updateLightboxContent();
    
    // Show the lightbox
    lightbox.classList.add('active');
    lightbox.style.display = 'flex';
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    lightbox.style.display = 'none';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

function changeImage(direction) {
    currentImageIndex += direction;
    
    // Wrap around if we go past the bounds
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }
    
    updateLightboxContent();
}

function updateLightboxContent() {
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    
    const currentImage = galleryImages[currentImageIndex];
    
    lightboxImg.src = currentImage.src;
    lightboxImg.alt = currentImage.title;
    lightboxTitle.textContent = currentImage.title;
    lightboxDescription.textContent = currentImage.description;
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        }
    }
});

// Prevent lightbox from closing when clicking on the image or content
document.addEventListener('DOMContentLoaded', function() {
    const lightboxContent = document.querySelector('.lightbox-content');
    if (lightboxContent) {
        lightboxContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});
