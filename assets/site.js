document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.getElementById('main-navigation');

if (menuButton && navigation) {
    menuButton.hidden = false;
    const closeMenu = () => {
        navigation.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
    };
    menuButton.addEventListener('click', () => {
        const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
        menuButton.setAttribute('aria-expanded', String(expanded));
        navigation.classList.toggle('is-open', expanded);
    });
    navigation.addEventListener('click', (event) => {
        if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
            closeMenu();
            menuButton.focus();
        }
    });
    window.matchMedia('(min-width: 681px)').addEventListener('change', closeMenu);
}

document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = new Date().getFullYear();
});
