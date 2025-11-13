// Kod, sayfa yüklendiğinde çalışmaya başlar
document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. ABARTILI ANİMASYON KODU (Değişiklik yok, çalışmaya devam ediyor) ---
    const sections = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Elemanın %10'u göründüğü an animasyonu başlat
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- 2. YENİ: KARANLIK MOD BUTONU KODU ---
    const themeToggle = document.getElementById('theme-toggle');
    // Sayfa yüklenirken hafızada (localStorage) kayıtlı tema var mı diye bak
    const currentTheme = localStorage.getItem('theme');

    // Eğer hafızada tema varsa, onu uygula
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        // Eğer tema karanlıksa, butonu Güneş yap
        if (currentTheme === 'dark') {
            themeToggle.innerHTML = "☀️";
        }
    }

    // Tema değiştirme butonuna tıklandığında...
    themeToggle.addEventListener('click', () => {
        // Mevcut temanın ne olduğunu kontrol et
        let currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            // Şu an karanlıksa, AÇIK moda geç
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light'); // Seçimi hafızaya kaydet
            themeToggle.innerHTML = "🌙"; // Butonu Ay yap
        } else {
            // Şu an açık veya tanımsızsa, KARANLIK moda geç
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark'); // Seçimi hafızaya kaydet
            themeToggle.innerHTML = "☀️"; // Butonu Güneş yap
        }
    });

    // --- 3. YENİ: RESİM RULOSU (CAROUSEL) KODU ---
    const track = document.querySelector('.carousel-track');
    // Eğer 'track' diye bir şey bulamazsan (hata olmasın diye) dur
    if (!track) return; 

    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-button');
    const prevButton = document.querySelector('.prev-button');
    const slideWidth = slides[0].getBoundingClientRect().width;

    // Her slaytı doğru pozisyona yerleştir (yan yana)
    const setSlidePosition = (slide, index) => {
        // Bu kod, slaytların yan yana gelmesi için gerekli DEĞİL, CSS hallediyor
        // Sadece genişliklerini ayarlamak için tutabiliriz.
        // slide.style.left = slideWidth * index + 'px'; // CSS flex'e geçtiği için bu satıra gerek kalmadı
    };
    slides.forEach(setSlidePosition);

    // Bir slayta hareket etme fonksiyonu
    const moveToSlide = (currentSlide, targetSlide) => {
        if (!targetSlide) return; // Eğer hedef slayt yoksa (örn. son slayttan ileri gitmeye çalışmak) dur
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };
    
    // YENİ: Kaydırma Mantığı (Basitleştirilmiş)
    let currentIndex = 0; // Hangi slaytta olduğumuzu takip et

    // İleri butonuna tıklandığında
    nextButton.addEventListener('click', e => {
        if (currentIndex === slides.length - 1) {
            currentIndex = 0; // Son slayttaysan, başa dön
        } else {
            currentIndex++; // Değilse, bir sonrakine git
        }
        // 'track' elementini sola doğru kaydır
        track.style.transform = 'translateX(-' + slideWidth * currentIndex + 'px)';
    });

    // Geri butonuna tıklandığında
    prevButton.addEventListener('click', e => {
        if (currentIndex === 0) {
            currentIndex = slides.length - 1; // İlk slayttaysan, sona git
        } else {
            currentIndex--; // Değilse, bir öncekine gel
        }
        // 'track' elementini kaydır
        track.style.transform = 'translateX(-' + slideWidth * currentIndex + 'px)';
    });
    
    // Ekran boyutu değişirse slayt genişliğini yeniden hesapla (Opsiyonel ama önemli)
    window.addEventListener('resize', () => {
        const newSlideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = 'translateX(-' + newSlideWidth * currentIndex + 'px)';
    });
});