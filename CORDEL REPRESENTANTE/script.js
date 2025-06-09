// JavaScript logic to animate elements on scroll
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (!animatedElements.length) {
        return;
    }

    // Intersection Observer API to detect when an element enters the viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the element is visible
            if (entry.isIntersecting) {
                // Add 'is-visible' class to trigger the CSS animation
                entry.target.classList.add('is-visible');
                // Optional: Unobserve after the animation has run once
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15 // Animation triggers when 15% of the element is visible
    });

    // Observe each element that should be animated
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});
