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

        // Add click event listeners to gallery images
        const galleryImageElements = document.querySelectorAll('.gallery-image');
        galleryImageElements.forEach((img, index) => {
            // Multiple event types for better browser compatibility
            ['click', 'touchend'].forEach(eventType => {
                img.addEventListener(eventType, function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Gallery image clicked:', eventType, index); // Debug log
                    openLightbox(this);
                }, { passive: false });
            });
            
            // Also add to gallery items for better click area
            const galleryItem = img.closest('.gallery-item');
            if (galleryItem) {
                ['click', 'touchend'].forEach(eventType => {
                    galleryItem.addEventListener(eventType, function(e) {
                        // Only trigger if we didn't click on the overlay text
                        if (e.target === galleryItem || e.target === img) {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('Gallery item clicked:', eventType, index); // Debug log
                            openLightbox(img);
                        }
                    }, { passive: false });
                });
            }
        });

        // Fallback: Add global click handler for images with gallery-image class
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('gallery-image')) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Fallback click handler triggered'); // Debug log
                openLightbox(e.target);
            }
        });

        // Form submission handling with Formspree
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                try {
                    const formData = new FormData(this);
                    const formStatus = document.getElementById('form-status');
                    const submitBtn = this.querySelector('.submit-btn');
                    
                    // Show loading state
                    submitBtn.textContent = 'Sending...';
                    submitBtn.disabled = true;
                    formStatus.style.display = 'block';
                    formStatus.className = 'form-status loading';
                    formStatus.textContent = 'Sending your message...';
                    
                    // Submit to Formspree
                    fetch(this.action, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    })
                    .then(response => {
                        if (response.ok) {
                            // Success
                            formStatus.className = 'form-status success';
                            formStatus.textContent = 'Thank you! Your message has been sent. We\'ll contact you within 24 hours to discuss your project.';
                            this.reset();
                        } else {
                            // Error from server
                            throw new Error('Server error');
                        }
                    })
                    .catch(error => {
                        // Network or other error
                        console.error('Form submission error:', error);
                        formStatus.className = 'form-status error';
                        formStatus.textContent = 'Sorry, there was an error sending your message. Please try again or call us directly at (360) 508-3816.';
                    })
                    .finally(() => {
                        // Reset button state
                        submitBtn.textContent = 'Get Free Estimate';
                        submitBtn.disabled = false;
                        
                        // Hide status message after 10 seconds
                        setTimeout(() => {
                            formStatus.style.display = 'none';
                        }, 10000);
                    });
                    
                } catch (error) {
                    console.error('Form handling error:', error);
                    const formStatus = document.getElementById('form-status');
                    formStatus.style.display = 'block';
                    formStatus.className = 'form-status error';
                    formStatus.textContent = 'There was an error processing your request. Please try again.';
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
    try {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxTitle = document.getElementById('lightbox-title');
        const lightboxDescription = document.getElementById('lightbox-description');
        
        if (!lightbox || !lightboxImg || !lightboxTitle || !lightboxDescription) {
            console.error('Lightbox elements not found');
            return;
        }
        
        // Find the index of the clicked image
        const clickedSrc = imgElement.src;
        console.log('Clicked image src:', clickedSrc); // Debug log
        
        currentImageIndex = galleryImages.findIndex(img => {
            const imgFilename = img.src.split('/').pop();
            const clickedFilename = clickedSrc.split('/').pop();
            return imgFilename === clickedFilename;
        });
        
        if (currentImageIndex === -1) {
            console.warn('Image not found in gallery array, defaulting to 0');
            currentImageIndex = 0;
        }
        
        console.log('Opening lightbox for image index:', currentImageIndex); // Debug log
        
        // Set the image and content
        updateLightboxContent();
        
        // Show the lightbox
        lightbox.classList.add('active');
        lightbox.style.display = 'flex';
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        console.log('Lightbox opened successfully'); // Debug log
    } catch (error) {
        console.error('Error opening lightbox:', error);
    }
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
