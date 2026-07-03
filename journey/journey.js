document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll(".bg-video");
    let currentVideoIndex = 0;

    if (videos.length > 0) {
        videos[currentVideoIndex].play();

        videos.forEach((video, index) => {
            video.addEventListener("ended", () => {
                video.classList.remove("active");
                currentVideoIndex = (index + 1) % videos.length;
                
                const nextVideo = videos[currentVideoIndex];
                nextVideo.currentTime = 0; 
                nextVideo.classList.add("active");
                nextVideo.play();
            });
        });
    }
});

// Скрол логика: Различен третман за втората слика
document.addEventListener("scroll", () => {
    const sections = document.querySelectorAll(".second-section");
    
    sections.forEach((section) => {
        const image = section.querySelector("img");
        const overlay = section.querySelector(".overlay-dark");
        
        if (!image || !overlay) return;

        const rect = section.getBoundingClientRect();
        const maxScroll = window.innerHeight; 

        if (rect.top <= 0 && rect.bottom >= 0) {
            let scrollAmount = Math.abs(rect.top);
            let progress = Math.min(scrollAmount / maxScroll, 1);
            
            if (image.id === "scrollImage") {
                // ВТОРА СЛИКА: Без заматување, само малку затемнување (0.4 макс)
                let opacityAmount = progress * 0.8; 
                image.style.filter = `blur(0px)`;
                overlay.style.backgroundColor = `rgba(0, 0, 0, ${opacityAmount})`;
            } else {
                // ОСТАНАТИ СЛИКИ (Последната): Со заматување и нормално затемнување
                let blurAmount = progress * 18; 
                let opacityAmount = progress * 0.6; 
                image.style.filter = `blur(${blurAmount}px)`;
                overlay.style.backgroundColor = `rgba(0, 0, 0, ${opacityAmount})`;
            }

        } else if (rect.top > 0) {
            image.style.filter = "blur(0px)";
            overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
        }
    });
});


// Код за третата секција (Слајдерот)
document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".slider-track");
    const originalSlides = document.querySelectorAll(".slide");
    const indicators = document.querySelectorAll(".indicator");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    if (!track || originalSlides.length === 0) return;

    const firstClone = originalSlides[originalSlides.length - 1].cloneNode(true);
    const lastClone = originalSlides[0].cloneNode(true);

    firstClone.classList.remove("active-slide");
    lastClone.classList.remove("active-slide");

    track.insertBefore(firstClone, originalSlides[0]);
    track.appendChild(lastClone);

    const allSlides = document.querySelectorAll(".slider-track .slide");
    const totalOriginalSlides = originalSlides.length;
    let sliderIndex = 0; 

    function updateSlider() {
        allSlides.forEach(slide => slide.classList.remove("active-slide"));
        indicators.forEach(ind => ind.classList.remove("active"));

        allSlides[sliderIndex + 1].classList.add("active-slide");
        indicators[sliderIndex].classList.add("active");

        const moveAmount = (sliderIndex + 1) * 60.5;
        track.style.transform = `translateX(-${moveAmount}vw)`;
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener("click", () => {
            if (sliderIndex < totalOriginalSlides - 1) {
                sliderIndex++;
            } else {
                sliderIndex = 0; 
            }
            updateSlider();
        });

        prevBtn.addEventListener("click", () => {
            if (sliderIndex > 0) {
                sliderIndex--;
            } else {
                sliderIndex = totalOriginalSlides - 1; 
            }
            updateSlider();
        });
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
            sliderIndex = index;
            updateSlider();
        });
    });

    track.style.transition = "none";
    updateSlider();
    
    setTimeout(() => {
        track.style.transition = "";
    }, 50);
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