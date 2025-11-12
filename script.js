// Bu, "kaydırdıkça animasyonla gelme" işini yapan koddur.

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Animasyon uygulanacak tüm elemanları seç
    // (HTML'de 'animate-on-scroll' sınıfını verdiğimiz her şey)
    const sections = document.querySelectorAll('.animate-on-scroll');

    // 2. Bir "gözetmen" (Observer) oluştur.
    // Bu gözetmen, elemanların ekrana girip girmediğini izler.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Eğer eleman ekrana girmişse...
            if (entry.isIntersecting) {
                // Ona 'is-visible' (artık-görünür) sınıfını ekle.
                // CSS'teki animasyon tetiklenecek!
                entry.target.classList.add('is-visible');
                
                // Animasyon bir kez çalıştığı için artık bu elemanı izlemeyi bırak
                // (Performans için iyidir)
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Elemanın %10'u göründüğü an animasyonu başlat
    });

    // 3. Gözetmene, seçtiğimiz tüm elemanları izlemesini söyle
    sections.forEach(section => {
        observer.observe(section);
    });

});