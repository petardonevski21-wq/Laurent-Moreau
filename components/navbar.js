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
        // Елементи за Watches
        const watchesLink = nav.querySelector('.js-watches-link');
        const watchesMenu = nav.querySelector('.js-mega-menu'); 
        
        // Елементи за Collections
        const collectionsLink = nav.querySelector('.js-collections-link');
        const collectionsMenu = nav.querySelector('.js-mega-menu-collections'); 
        
        // Универзална функција за контрола
        function handleMenuClick(e, clickedLink, menuToToggle, otherLink, otherMenu) {
            e.preventDefault();
            
            // Ако другото мени е отворено, затвори го веднаш
            if (otherMenu && otherMenu.classList.contains('active')) {
                otherMenu.classList.remove('active');
                if (otherLink) otherLink.classList.remove('active-menu-link');
            }
            
            // Отвори го или затвори го кликнатото мени
            const isActive = menuToToggle.classList.toggle('active');
            clickedLink.classList.toggle('active-menu-link', isActive);
            
            // Контрола на позадината и скролањето
            if (isActive) {
                nav.classList.add('mega-active');
                document.body.style.overflow = 'hidden'; 
                if (typeof lenis !== 'undefined') lenis.stop();
            } else {
                nav.classList.remove('mega-active');
                document.body.style.overflow = ''; 
                if (typeof lenis !== 'undefined') lenis.start();
            }
        }

        // Клик на Watches
        if (watchesLink && watchesMenu) {
            watchesLink.addEventListener('click', (e) => handleMenuClick(e, watchesLink, watchesMenu, collectionsLink, collectionsMenu));
        }
        
        // Клик на Collections
        if (collectionsLink && collectionsMenu) {
            collectionsLink.addEventListener('click', (e) => handleMenuClick(e, collectionsLink, collectionsMenu, watchesLink, watchesMenu));
        }
        
        // Гасење на менијата ако се кликне некаде надвор
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target)) {
                let closedAny = false;
                
                if (watchesMenu && watchesMenu.classList.contains('active')) {
                    watchesMenu.classList.remove('active');
                    if (watchesLink) watchesLink.classList.remove('active-menu-link');
                    closedAny = true;
                }
                
                if (collectionsMenu && collectionsMenu.classList.contains('active')) {
                    collectionsMenu.classList.remove('active');
                    if (collectionsLink) collectionsLink.classList.remove('active-menu-link');
                    closedAny = true;
                }
                
                if (closedAny) {
                    nav.classList.remove('mega-active');
                    document.body.style.overflow = ''; 
                    if (typeof lenis !== 'undefined') lenis.start();
                }
            }
        });
    });
}