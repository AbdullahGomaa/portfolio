// Navigation Toggle
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

// Scroll Animation for Sections
const scrollReveal = () => {
    const reveals = document.querySelectorAll('.section-title, .about-content, .skill-category, .timeline-item, .project-card, .education-block');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
            // Adding a simple fade-up inline style for simplicity or toggle a class defined in CSS
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
            element.style.transition = "all 0.6s ease-out";
        }
    });
}

// Initialize
const app = () => {
    navSlide();
    
    // Set initial state for scroll elements
    const reveals = document.querySelectorAll('.section-title, .about-content, .skill-category, .timeline-item, .project-card, .education-block');
    reveals.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
    });

    window.addEventListener('scroll', scrollReveal);
    // Trigger once on load
    scrollReveal();
}

app();