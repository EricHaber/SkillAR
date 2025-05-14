document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Testimonials Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.testimonial-controls .prev');
    const nextBtn = document.querySelector('.testimonial-controls .next');
    const indicators = document.querySelectorAll('.testimonial-indicators .indicator');
    let currentIndex = 0;

    if (testimonials.length > 0 && prevBtn && nextBtn) {
        // Function to update active testimonial
        function showTestimonial(index) {
            // Hide all testimonials
            testimonials.forEach(testimonial => {
                testimonial.classList.remove('active');
            });
            
            // Remove active class from all indicators
            indicators.forEach(indicator => {
                indicator.classList.remove('active');
            });
            
            // Show the selected testimonial
            testimonials[index].classList.add('active');
            
            // Update the active indicator
            if (indicators.length > 0) {
                indicators[index].classList.add('active');
            }
            
            // Update current index
            currentIndex = index;
        }
        
        // Next testimonial
        function nextTestimonial() {
            const newIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(newIndex);
        }
        
        // Previous testimonial
        function prevTestimonial() {
            const newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(newIndex);
        }
        
        // Auto rotate testimonials
        let interval = setInterval(nextTestimonial, 5000);
        
        // Event listeners for controls
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            clearInterval(interval);
            nextTestimonial();
            interval = setInterval(nextTestimonial, 5000);
        });
        
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            clearInterval(interval);
            prevTestimonial();
            interval = setInterval(nextTestimonial, 5000);
        });
        
        // Event listeners for indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                clearInterval(interval);
                showTestimonial(index);
                interval = setInterval(nextTestimonial, 5000);
            });
        });
    }

    // Sticky Header
    const header = document.querySelector('header');
    let scrollPosition = window.scrollY;

    function toggleStickyHeader() {
        scrollPosition = window.scrollY;

        if (scrollPosition > 100) {
            header.style.padding = '10px 0';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.background = 'var(--white)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }

    window.addEventListener('scroll', toggleStickyHeader);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - header.offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('.benefit-card, .course-card, .about-content, .business-content');
    
    // Only run if IntersectionObserver is supported
    if ('IntersectionObserver' in window && animateElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    // Unobserve after animation is triggered
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        animateElements.forEach(element => {
            element.classList.add('pre-animate');
            observer.observe(element);
        });
    }

    // Add animation classes in CSS
    const style = document.createElement('style');
    style.textContent = `
        .pre-animate {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}); 