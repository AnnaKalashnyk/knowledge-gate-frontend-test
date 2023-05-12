function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger')
    const nav = document.querySelector('.nav__menu')
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active')
        nav.classList.toggle('show')
    })
}

document.addEventListener('DOMContentLoaded', () => {
    toggleMobileMenu()

    const elAnimate = document.querySelectorAll('.animate');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
      
            if (entry.isIntersecting) {
                for (let i = 0; i < elAnimate.length; i++) {
                    elAnimate[i].classList.add('fadein')
                }
            }
      
        });
    });
      
    elAnimate.forEach(el => {
        observer.observe(el)
    });
  })