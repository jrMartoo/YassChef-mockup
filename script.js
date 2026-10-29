// Set up the Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // If the element is in the viewport, add the 'visible' class
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

// Grab all elements with the 'slide-up' class and observe them
const hiddenElements = document.querySelectorAll('.slide-up');
hiddenElements.forEach((el) => observer.observe(el));