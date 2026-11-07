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

// Restore the original sound-wave motif behind the introduction.
const waveCanvas = document.getElementById('waveCanvas');
const waveContext = waveCanvas?.getContext('2d');

if (waveContext) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let waveWidth = 0;
    let waveHeight = 0;
    let waveFrame = null;
    let heroVisible = true;

    const drawWaves = (timestamp) => {
        waveFrame = null;
        const phase = reducedMotion.matches ? 0 : timestamp / 1000;
        const amplitude = Math.min(65, waveHeight * .12);
        waveContext.clearRect(0, 0, waveWidth, waveHeight);
        waveContext.lineWidth = 2;

        ['rgba(220, 222, 230, .35)', 'rgba(193, 197, 210, .24)'].forEach((color, index) => {
            waveContext.beginPath();
            waveContext.strokeStyle = color;
            for (let x = 0; x <= waveWidth + 3; x += 3) {
                const y = waveHeight / 2
                    + Math.sin(x * .01 + phase * 1.2 + index * 1.8) * amplitude
                    + Math.sin(x * .02 + phase * .6) * amplitude * .5;
                if (x === 0) waveContext.moveTo(x, y);
                else waveContext.lineTo(x, y);
            }
            waveContext.stroke();
        });

        if (!reducedMotion.matches && !document.hidden && heroVisible) {
            waveFrame = requestAnimationFrame(drawWaves);
        }
    };

    const refreshWaves = () => {
        if (waveFrame !== null) cancelAnimationFrame(waveFrame);
        drawWaves(performance.now());
    };

    const resizeWaves = () => {
        waveWidth = waveCanvas.clientWidth;
        waveHeight = waveCanvas.clientHeight;
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        waveCanvas.width = Math.round(waveWidth * pixelRatio);
        waveCanvas.height = Math.round(waveHeight * pixelRatio);
        waveContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        refreshWaves();
    };

    new ResizeObserver(resizeWaves).observe(waveCanvas.parentElement);
    new IntersectionObserver(([entry]) => {
        heroVisible = entry.isIntersecting;
        refreshWaves();
    }).observe(waveCanvas.parentElement);
    window.addEventListener('resize', resizeWaves);
    document.addEventListener('visibilitychange', refreshWaves);
    reducedMotion.addEventListener('change', refreshWaves);
    resizeWaves();
}
