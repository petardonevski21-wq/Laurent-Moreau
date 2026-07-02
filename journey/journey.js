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