const navbarBurger = document.getElementById('navbarBurger');
    const navMenu = document.getElementById('navMenu');
    const html = document.getElementsByTagName('html')[0];
  
    navbarBurger.addEventListener('click', () => {
      navbarBurger.classList.toggle('is-active');
      navMenu.classList.toggle('is-active');
      html.classList.toggle('is-clipped');
    });

    const header = document.getElementById('mainHeader');
    const headerHeight = header.offsetHeight;
  
    window.addEventListener('scroll', () => {
      if (window.scrollY > headerHeight) {
        header.classList.add('has-shadow');
        
      } else {
        header.classList.remove('has-shadow');
        
      }
    });
