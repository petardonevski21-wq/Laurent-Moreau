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
        
        setupMobileMenu();
        setupMegaMenu();
    }
  });

function setupMobileMenu() {
    const navbars = document.querySelectorAll('.navbar, .navbar-white');
    
    navbars.forEach(nav => {
        const hamburger = nav.querySelector('.js-hamburger');
        const mobileMenu = nav.querySelector('.js-mobile-menu');
        const closeBtn = nav.querySelector('.js-close-menu');
        
        if (hamburger && mobileMenu && closeBtn) {
            hamburger.addEventListener('click', () => {
                mobileMenu.classList.add('active');
                document.body.style.overflow = 'hidden'; 
                if (typeof lenis !== 'undefined') lenis.stop();
            });
            
            closeBtn.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = ''; 
                if (typeof lenis !== 'undefined') lenis.start();
            });
        }
    });
}

function setupMegaMenu() {
    const navbars = document.querySelectorAll('.navbar, .navbar-white');
    
    navbars.forEach(nav => {
        const watchesLink = nav.querySelector('.js-watches-link');
        const megaMenu = nav.querySelector('.js-mega-menu');
        
        if (watchesLink && megaMenu) {
            watchesLink.addEventListener('click', (e) => {
                e.preventDefault();
                
                document.querySelectorAll('.js-mega-menu').forEach(menu => {
                    if (menu !== megaMenu) {
                        menu.classList.remove('active');
                        // Ги гасиме сите други отворени менија
                        const parentNav = menu.closest('.navbar, .navbar-white');
                        if (parentNav) parentNav.classList.remove('mega-active');
                    }
                });
                
                // Ја додава/брише класата за менито и за белата позадина
                const isActive = megaMenu.classList.toggle('active');
                nav.classList.toggle('mega-active', isActive);
            });
            
            document.addEventListener('click', (e) => {
                if (!nav.contains(e.target) && megaMenu.classList.contains('active')) {
                    megaMenu.classList.remove('active');
                    nav.classList.remove('mega-active');
                }
            });
        }
    });
}