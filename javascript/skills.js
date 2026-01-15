// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-level');

const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const level = entry.target.getAttribute('data-level');
            entry.target.style.width = level;
            observer.unobserve(entry.target); // animate only once
        }
    });
}, { threshold: 0.5 }); // 50% of element visible

skillBars.forEach(bar => skillObserver.observe(bar));

// Scroll animation for section (optional)
const animateElements = document.querySelectorAll('[data-animate]');
const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            sectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

animateElements.forEach(el => sectionObserver.observe(el));



