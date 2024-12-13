// Define tus funciones de event listener
export function addEventListeners() {
    const logo = document.querySelector('.logo');
    const searchIcon = document.querySelector('.absolute-search');
    const searchInput = document.querySelector('#search');
    const accountIcon = document.querySelector('.user');
    const cartIcon = document.querySelector('.cart i');

    logo.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    searchIcon.addEventListener('click', () => {
        if (searchInput.value.trim() !== '') {
            searchInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        }
    });

    accountIcon.addEventListener('click', () => {
        window.location.href = 'index.html'; // Redirige a index.html
    });

    cartIcon.addEventListener('click', () => {
        window.location.href = 'index.html'; // Redirige a index.html
    });
}
