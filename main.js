// Scroll-triggered fade-in animations
document.addEventListener('DOMContentLoaded', function () {
    var fadeElements = document.querySelectorAll('.fade-in');

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(function (el) {
        observer.observe(el);
    });

    // Nav background opacity on scroll
    var nav = document.querySelector('nav');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(10, 10, 11, 0.95)';
        } else {
            nav.style.background = 'rgba(10, 10, 11, 0.8)';
        }
    });
});
