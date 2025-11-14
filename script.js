document.addEventListener("DOMContentLoaded", () => {
    
    // --- ABARTILI ANİMASYON ---
    const sections = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => { observer.observe(section); });

    // --- KARANLIK MOD ---
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') { themeToggle.innerHTML = "☀️"; }
    }
    
    themeToggle.addEventListener('click', () => {
        let currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = "🌙";
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = "☀️";
        }
    });

    // --- RESİM RULOSU (CAROUSEL) ---
    const track = document.querySelector('.carousel-track');
    if (!track) return; 
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-button');
    const prevButton = document.querySelector('.prev-button');
    const getSlideWidth = () => slides.length ? slides[0].getBoundingClientRect().width : 0;
    let slideWidth = getSlideWidth();
    let currentIndex = 0;

    nextButton.addEventListener('click', e => {
        if (!slides.length) return;
        currentIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
        track.style.transform = 'translateX(-' + slideWidth * currentIndex + 'px)';
    });
    prevButton.addEventListener('click', e => {
        if (!slides.length) return;
        currentIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
        track.style.transform = 'translateX(-' + slideWidth * currentIndex + 'px)';
    });
    
    window.addEventListener('resize', () => {
        slideWidth = getSlideWidth();
        if (!slideWidth) return;
        track.style.transition = 'none';
        track.style.transform = 'translateX(-' + slideWidth * currentIndex + 'px)';
        setTimeout(() => { track.style.transition = 'transform 0.5s ease-in-out'; }, 50);
    });
});
document.addEventListener("DOMContentLoaded", () => {
    
    // --- ABARTILI ANİMASYON ---
    const sections = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => { observer.observe(section); });

    // --- KARANLIK MOD ---
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') { themeToggle.innerHTML = "☀️"; }
    }
    
    themeToggle.addEventListener('click', () => {
        let currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = "🌙";
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = "☀️";
        }
    });

    // --- RESİM RULOSU (CAROUSEL) ---
    const track = document.querySelector('.carousel-track');
    if (!track) return; 
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-button');
    const prevButton = document.querySelector('.prev-button');
    const getSlideWidth = () => slides.length ? slides[0].getBoundingClientRect().width : 0;
    let slideWidth = getSlideWidth();
    let currentIndex = 0;

    nextButton.addEventListener('click', e => {
        if (!slides.length) return;
        currentIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
        track.style.transform = 'translateX(-' + slideWidth * currentIndex + 'px)';
    });
    prevButton.addEventListener('click', e => {
        if (!slides.length) return;
        currentIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
        track.style.transform = 'translateX(-' + slideWidth * currentIndex + 'px)';
    });
    
    window.addEventListener('resize', () => {
        slideWidth = getSlideWidth();
        if (!slideWidth) return;
        track.style.transition = 'none';
        track.style.transform = 'translateX(-' + slideWidth * currentIndex + 'px)';
        setTimeout(() => { track.style.transition = 'transform 0.5s ease-in-out'; }, 50);
    });
});
