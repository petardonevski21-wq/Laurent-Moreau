document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll(".bg-video");
    let currentVideoIndex = 0;

    if (videos.length > 0) {
        // Започни го првото видео
        videos[currentVideoIndex].play();

        videos.forEach((video, index) => {
            video.addEventListener("ended", () => {
                // Тргни ја класата од моменталното видео
                video.classList.remove("active");
                
                // Премини на следното видео (ако е последно, врати се на првото)
                currentVideoIndex = (index + 1) % videos.length;
                
                // Пушти го следното видео
                const nextVideo = videos[currentVideoIndex];
                nextVideo.currentTime = 0; // Ресетирај го од почеток
                nextVideo.classList.add("active");
                nextVideo.play();
            });
        });
    }
});


// vtora sekcija
document.addEventListener("scroll", () => {
    const image = document.getElementById("scrollImage");
    const overlay = document.querySelector(".overlay-dark");
    const section = document.querySelector(".second-section");
    
    if (!image || !section || !overlay) return;

    // Земање на димензиите и позицијата на втората секција
    const rect = section.getBoundingClientRect();
    const maxScroll = window.innerHeight; // Колку максимум треба да се скрола за ефектот

    // Проверуваме дали сме стигнале до втората секција
    if (rect.top <= 0) {
        let scrollAmount = Math.abs(rect.top);
        
        // Пресметуваме прогрес од 0 до 1
        let progress = Math.min(scrollAmount / maxScroll, 1);
        
        // Заматување до максимум 15px
        let blurAmount = progress * 15; 
        
        // Затемнување до максимум 0.6 opacity (за да биде читлив текстот)
        let opacityAmount = progress * 0.6; 
        
        image.style.filter = `blur(${blurAmount}px)`;
        overlay.style.backgroundColor = `rgba(0, 0, 0, ${opacityAmount})`;
    } else {
        // Ресетирање ако се вратиме горе кон видеата
        image.style.filter = "blur(0px)";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
    }
});