fetch("components/navbar.html")
  .then(res => res.text())
  .then(data => {
    // Вчитување на оригиналното мени
    document.getElementById("navbar").innerHTML = data;

    const originalNavbar = document.querySelector('.navbar');
    
    if (originalNavbar) {
        const whiteNavbar = originalNavbar.cloneNode(true);
        whiteNavbar.classList.add('navbar-white');
        document.body.appendChild(whiteNavbar);

        // Го зачувуваме последното место на скролање
        let lastScroll = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;

            // 1. Ако си скроз најгоре (до 50px), задолжително се гаси белото мени
            if (currentScroll <= 50) {
                whiteNavbar.classList.remove('show');
            } 
            // 2. Ако скролаш НАДОЛУ, се гаси белото мени со smooth анимација
            else if (currentScroll > lastScroll) {
                whiteNavbar.classList.remove('show');
            } 
            // 3. Ако скролаш НАГОРЕ, мазно се појавува белото мени
            else if (currentScroll < lastScroll) {
                whiteNavbar.classList.add('show');
            }

            // Го ажурираме последното скролање
            lastScroll = currentScroll;
        });
    }
  });