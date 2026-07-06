document.addEventListener("DOMContentLoaded", () => {
    // IntersectionObserver ќе следи кога секцијата ќе влезе во екранот
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // Кога секцијата е видлива на екранот (барем 20%), додади ја класата .show
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Запира со следење откако ќе се анимира еднаш
            }
        });
    }, { threshold: 0.2 }); 

    const trainingContainer = document.querySelector('.training-container');
    if (trainingContainer) {
        observer.observe(trainingContainer);
    }

    // ДОДАДЕНО: Го следиме и контејнерот со текст
    const textContainer = document.querySelector('.text-container');
    if (textContainer) {
        observer.observe(textContainer);
    }
});

// footer
// Вчитување на футерот
document.addEventListener("DOMContentLoaded", () => {
    fetch('../footer/footer.html') /* <-- ДОДАДЕНО Е ../ */
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Грешка при вчитување на футерот:', error));
});
// footer