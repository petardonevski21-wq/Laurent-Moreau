document.addEventListener("DOMContentLoaded", () => {
    
    // 1. ПОПРАВКА НА NAVBAR-ОТ ЗА WATCH ПАПКАТА
    // Овој код чека 100ms да види дали оригиналниот navbar.js[cite: 3] успешно го вчитал менито.
    // Ако не (бидејќи сме во друга папка), го поправаме овде.
    setTimeout(() => {
        const navbarContainer = document.getElementById("navbar");
        
        if (navbarContainer && navbarContainer.innerHTML.trim() === "") {
            fetch("../components/navbar.html")
                .then(res => res.text())
                .then(data => {
                    navbarContainer.innerHTML = data;
                    
                    // Ги поправаме патеките до сликите во логото и менито (од ./ во ../)[cite: 3]
                    const navbarImages = document.querySelectorAll('#navbar img');
                    navbarImages.forEach(img => {
                        let currentSrc = img.getAttribute('src');
                        if (currentSrc && currentSrc.startsWith('./')) {
                            img.setAttribute('src', '.' + currentSrc); 
                        }
                    });
                    
                    // Ги активираме функциите за мобилно и мега мени[cite: 3]
                    if (typeof setupMobileMenu === 'function') setupMobileMenu();
                    if (typeof setupMegaMenu === 'function') setupMegaMenu();
                })
                .catch(err => console.error("Грешка при вчитување на navbar:", err));
        }
    }, 100);

    // 2. ДИНАМИЧНО ГЕНЕРИРАЊЕ НА ЧАСОВНИЦИТЕ
    const watchesGrid = document.getElementById('watchesGrid');
    
    // Еве ги измислените податоци кои ќе ги заменат сивите квадрати со премиум слики
    const watchesData = [
        { name: "L&M Heritage", desc: "Rose Gold, 41mm", img: "./sliki/prv.jpg" },
        { name: "Le Mans Racing", desc: "Titanium Chronograph", img: "./sliki/vtor.jpg" },
        { name: "Ocean Diver", desc: "Stainless Steel, 300m", img: "./sliki/tret.jpg" },
        { name: "Tourbillon Elite", desc: "Platinum Edition", img: "./sliki/cetv.jpg" },
        { name: "Summer Breeze", desc: "White Ceramic", img: "./sliki/pet.jpg" },
        { name: "Midnight Onyx", desc: "Black PVD, 42mm", img: "./sliki/ses.jpg" },
        { name: "Tourbillon Elite", desc: "Platinum Edition", img: "./sliki/sedum.jpg"  },
            { name: "Summer Breeze", desc: "White Ceramic", img: "./sliki/osum.jpg"  },
            { name: "Midnight Onyx", desc: "Black PVD, 42mm", img: "./sliki/devet.jpg"  },
        { name: "Midnight Onyx", desc: "Black PVD, 42mm", img: "./sliki/deset.jpg"  }
    ];

    if (watchesGrid) {
        watchesData.forEach(watch => {
            const card = document.createElement('div');
            card.className = 'watch-card';
            
            // Текстот е од лева страна (watch-info), сликата од десна (watch-image-container)
            card.innerHTML = `
                <div class="watch-info">
                    <h3>${watch.name}</h3>
                    <p>${watch.desc}</p>
                </div>
                <div class="watch-image-container">
                    <!-- mix-blend-mode: multiply совршено ја вклопува белата позадина на сликата со сивата картичка -->
                    <img src="${watch.img}" alt="${watch.name}" style="mix-blend-mode: multiply;">
                </div>
            `;
            watchesGrid.appendChild(card);
        });
    }
});