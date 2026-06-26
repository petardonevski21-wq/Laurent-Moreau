// Иницијализација на премиум мазно скролање на цела страна
const lenis = new Lenis();

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);


document.addEventListener("DOMContentLoaded", () => {
    const videoA = document.getElementById("bg-video");
    const playPauseBtn = document.getElementById("play-pause-btn");

    const videoB = document.createElement("video");
    videoB.style.position       = "absolute";
    videoB.style.top            = "0";
    videoB.style.left           = "0";
    videoB.style.width          = "100%";
    videoB.style.height         = "100%";
    videoB.style.objectFit      = "cover";
    videoB.style.zIndex         = "1";
    videoB.style.opacity        = "0";
    videoA.style.zIndex         = "2";
    videoB.muted                = true;
    videoB.playsInline          = true;
    videoB.preload              = "auto";
    videoA.parentNode.insertBefore(videoB, videoA);

    const pauseIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
    const playIcon  = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;

    playPauseBtn.addEventListener("click", () => {
        const active = getActiveVideo();
        if (active.paused) {
            active.play();
            playPauseBtn.innerHTML = pauseIcon;
        } else {
            active.pause();
            playPauseBtn.innerHTML = playIcon;
        }
    });

    const playlistUrls = ["./videa/prvovideo.mp4", "./videa/vtorovideo.mp4", "./videa/tretovideo.mp4"];
    let currentVideoIndex = 0;
    let isVideoA = true;

    function getActiveVideo()  { return isVideoA ? videoA : videoB; }
    function getStandbyVideo() { return isVideoA ? videoB : videoA; }

    function preloadIntoStandby(index) {
        const standby = getStandbyVideo();
        standby.src = playlistUrls[index];
        standby.load();
    }

    function swapToNext() {
        const nextIndex = (currentVideoIndex + 1) % playlistUrls.length;

        const incoming = getStandbyVideo();
        const outgoing = getActiveVideo();
        incoming.style.zIndex  = "2";
        incoming.style.opacity = "1";
        outgoing.style.zIndex  = "1";
        outgoing.style.opacity = "0";

        incoming.currentTime = 0;
        incoming.play();

        currentVideoIndex = nextIndex;
        isVideoA = !isVideoA;

        playPauseBtn.innerHTML = pauseIcon;

        const afterNextIndex = (currentVideoIndex + 1) % playlistUrls.length;
        preloadIntoStandby(afterNextIndex);
    }

    videoA.addEventListener("ended", swapToNext);
    videoB.addEventListener("ended", swapToNext);

    preloadIntoStandby(1);
});

// --- GSAP ScrollTrigger Анимации за "Built to Perfection" ---
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Анимација на текстот (влегува од долу)
    gsap.to(".built-content", {
        scrollTrigger: {
            trigger: ".built-section",
            start: "top 75%", // Се активира кога секцијата ќе влезе 75% во екранот
        },
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out"
    });

    // 2. Видеото се пушта само кога ќе влезе во екранот
    const builtVideo = document.getElementById("built-video");
    ScrollTrigger.create({
        trigger: ".built-video-container",
        start: "top 75%",
        onEnter: () => {
            // Обид за пуштање на видеото и појавување (fade-in) преку сивата позадина
            let playPromise = builtVideo.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    builtVideo.style.opacity = 1;
                }).catch(error => {
                    console.log("Auto-play was prevented:", error);
                });
            }
        }
    });

    // 3. Анимација на зголемување на видеото (Scale & Pin)
    gsap.to(".built-video-inner", {
        scrollTrigger: {
            trigger: ".built-video-container",
            start: "center center", // Започнува кога контејнерот ќе дојде на средина од екранот
            end: "+=50%", // Времетраење на скролањето (простор за зголемување)
            scrub: true, // Врзано директно за твоето движење на скролот
            pin: true, // Го заклучува (pin) на место додека не заврши зголемувањето
        },
        width: "100%",
        height: "100vh",
        ease: "none"
    });
});