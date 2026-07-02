// Proveruvame dali sme vo 'journey' papkata preku URL-to
const isJourneyPage = window.location.pathname.includes('/journey/');

// Ja podesuvame patekata do HTML fajlot vo zavisnost od toa kade sme
const navbarUrl = isJourneyPage ? "../components/navbar.html" : "components/navbar.html";

fetch(navbarUrl)
  .then(res => res.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;

    // Ako sme vo journey, gi popravame patekite na slikite vo menito
    if (isJourneyPage) {
        const navbarImages = document.querySelectorAll('#navbar img');
        navbarImages.forEach(img => {
            let currentSrc = img.getAttribute('src');
            // Go pretvorame './sliki/' vo '../sliki/' za da izleze od papkata
            if (currentSrc && currentSrc.startsWith('./')) {
                img.setAttribute('src', '.' + currentSrc);
            }
        });
    }

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
        // Elementi za Watches
        const watchesLink = nav.querySelector('.js-watches-link');
        const watchesMenu = nav.querySelector('.js-mega-menu'); 
        
        // Elementi za Collections
        const collectionsLink = nav.querySelector('.js-collections-link');
        const collectionsMenu = nav.querySelector('.js-mega-menu-collections'); 
        
        // Univerzalna funkcija za kontrola
        function handleMenuClick(e, clickedLink, menuToToggle, otherLink, otherMenu) {
            e.preventDefault();
            
            // Ako drugoto meni e otvoreno, zatvori go vednas
            if (otherMenu && otherMenu.classList.contains('active')) {
                otherMenu.classList.remove('active');
                if (otherLink) otherLink.classList.remove('active-menu-link');
            }
            
            // Otvori go ili zatvori go kliknatoto meni
            const isActive = menuToToggle.classList.toggle('active');
            clickedLink.classList.toggle('active-menu-link', isActive);
            
            // Kontrola na pozadinata i skrolanjeto
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

        // Klik na Watches
        if (watchesLink && watchesMenu) {
            watchesLink.addEventListener('click', (e) => handleMenuClick(e, watchesLink, watchesMenu, collectionsLink, collectionsMenu));
        }
        
        // Klik na Collections
        if (collectionsLink && collectionsMenu) {
            collectionsLink.addEventListener('click', (e) => handleMenuClick(e, collectionsLink, collectionsMenu, watchesLink, watchesMenu));
        }
        
        // Gasenje na menijata ako se klikne nekade nadvor
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