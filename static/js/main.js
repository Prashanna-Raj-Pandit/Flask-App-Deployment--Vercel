// Contact form submission
document.getElementById('contact-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    alert(result.message);
});

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.scrollY;
    hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
});

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-card');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-card, .project-card, .publication-card, .resume-item').forEach(item => {
    observer.observe(item);
});