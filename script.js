document.addEventListener("DOMContentLoaded", () => {

    // --- 1. ABARTILI ANİMASYON ---
    const sections = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    sections.forEach(section => observer.observe(section));

    // --- 2. KARANLIK MOD BUTONU ---
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        themeToggle.innerHTML = currentTheme === 'dark' ? "☀️" : "🌙";
    }
    themeToggle.addEventListener('click', () => {
        let current = document.documentElement.getAttribute('data-theme');
        if (current === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = "🌙";
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = "☀️";
        }
    });

    // --- 3. CAROUSEL ---
    const track = document.querySelector('.carousel-track');
    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.next-button');
        const prevButton = document.querySelector('.prev-button');
        let slideWidth = slides[0].getBoundingClientRect().width;
        let currentIndex = 0;
        const updateSlide = () => track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
        nextButton.addEventListener('click', () => { currentIndex = (currentIndex + 1) % slides.length; updateSlide(); });
        prevButton.addEventListener('click', () => { currentIndex = (currentIndex - 1 + slides.length) % slides.length; updateSlide(); });
        window.addEventListener('resize', () => {
            slideWidth = slides[0].getBoundingClientRect().width;
            track.style.transition = 'none';
            updateSlide();
            setTimeout(() => track.style.transition = 'transform 0.5s ease-in-out', 50);
        });
    }

    // --- 4. KAR ANİMASYONU (Tüm Site, Arka Plan) ---
    const body = document.body;
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0'; // Yazıların altında
    body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const numFlakes = 150;
    const flakes = [];
    for (let i = 0; i < numFlakes; i++) {
        flakes.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            r: Math.random() * 3 + 1,
            d: Math.random() * numFlakes
        });
    }

    function drawFlakes() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.beginPath();
        for (let i = 0; i < numFlakes; i++) {
            let f = flakes[i];
            ctx.moveTo(f.x, f.y);
            ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
        }
        ctx.fill();
        moveFlakes();
    }

    let angle = 0;
    function moveFlakes() {
        angle += 0.01;
        for (let i = 0; i < numFlakes; i++) {
            let f = flakes[i];
            f.y += Math.cos(angle + f.d) + 1 + f.r / 2;
            f.x += Math.sin(angle) * 2;

            if (f.y > canvas.height) { f.y = -5; f.x = Math.random() * canvas.width; }
            if (f.x > canvas.width) f.x = 0;
            if (f.x < 0) f.x = canvas.width;
        }
    }

    function animateSnow() {
        drawFlakes();
        requestAnimationFrame(animateSnow);
    }
    animateSnow();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // --- 5. INSTAGRAM TAKİPÇİ SAYISI (Fake API / Örnek) ---
    const instaLink = document.querySelector('.social-links a');
    if (instaLink) {
        // Örnek olarak takipçi sayısı ekledik
        const followers = '1.2k'; // Gerçek API ile değiştirilebilir
        instaLink.innerHTML = `Instagram Hesabımız (@dikmenrasathanesi) - ${followers} Takipçi`;
    }

});
