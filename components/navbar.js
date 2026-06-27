fetch("components/navbar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;

    const originalNavbar = document.querySelector('.navbar');
    
    if (originalNavbar) {
        const whiteNavbar = originalNavbar.cloneNode(true);
        whiteNavbar.classList.add('navbar-white');
        document.body.appendChild(whiteNavbar);

        let lastScroll = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            if (currentScroll <= 50) {
                whiteNavbar.classList.remove('show');
            } else if (currentScroll > lastScroll) {
                whiteNavbar.classList.remove('show');
            } else if (currentScroll < lastScroll) {
                whiteNavbar.classList.add('show');
            }
            lastScroll = currentScroll;
        });
        
        // Ја повикуваме функцијата за мобилното мени откако сè е вчитано
        setupMobileMenu();
    }
  });

function setupMobileMenu() {
    // Ги фаќаме и главното и белото мени на скрол
    const navbars = document.querySelectorAll('.navbar, .navbar-white');
    
    navbars.forEach(nav => {
        const hamburger = nav.querySelector('.js-hamburger');
        const mobileMenu = nav.querySelector('.js-mobile-menu');
        const closeBtn = nav.querySelector('.js-close-menu');
        
        if (hamburger && mobileMenu && closeBtn) {
            hamburger.addEventListener('click', () => {
                mobileMenu.classList.add('active');
                // Го гасиме скролањето на позадината кога менито е отворено
                document.body.style.overflow = 'hidden'; 
                if (typeof lenis !== 'undefined') lenis.stop(); // Гасење на Lenis
            });
            
            closeBtn.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                // Го враќаме скролањето
                document.body.style.overflow = ''; 
                if (typeof lenis !== 'undefined') lenis.start();
            });
        }
    });
}