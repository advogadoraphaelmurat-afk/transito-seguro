document.addEventListener('DOMContentLoaded', () => {
    
    // Intersection Observer for slide animations and nav updates
    const slides = document.querySelectorAll('.slide');
    const navItems = document.querySelectorAll('.slide-nav li');
    const presentation = document.querySelector('.presentation');

    const observerOptions = {
        root: presentation,
        rootMargin: '0px',
        threshold: 0.5 // trigger when 50% of the slide is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger CSS animations
                entry.target.classList.add('is-visible');
                
                // Update navigation
                const slideId = entry.target.getAttribute('id');
                const slideNum = slideId.split('-')[1];
                
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if(item.getAttribute('data-slide') === slideNum) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    slides.forEach(slide => {
        observer.observe(slide);
    });

    // Navigation Click Handler
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const slideNum = item.getAttribute('data-slide');
            const targetSlide = document.getElementById(`slide-${slideNum}`);
            
            targetSlide.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Simple Particle System for Background
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const particlesContainer = document.getElementById('particles');
    particlesContainer.appendChild(canvas);

    let width, height;
    let particles = [];

    function initParticles() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        particles = [];
        
        const numParticles = Math.floor(window.innerWidth / 15); // responsive amount
        
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 2 + 0.5,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                alpha: Math.random() * 0.5 + 0.1
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
            ctx.fill();
        });
        
        requestAnimationFrame(drawParticles);
    }

    window.addEventListener('resize', initParticles);
    
    initParticles();
    drawParticles();
});
