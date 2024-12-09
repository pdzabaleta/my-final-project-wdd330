import { searchProducts } from './search.mjs';
document.getElementById('search').addEventListener('keydown', async function(event) {
    if (event.key === 'Enter') {
        const query = event.target.value;

        try {
            const results = await searchProducts(query);

            if (results) {
                const queryString = encodeURIComponent(JSON.stringify(results));
                window.location.href = `search.html?results=${queryString}`;
            } else {
                window.location.href = `search.html?results=not_found`;
            }
        } catch (error) {
            alert('Hubo un problema al realizar la búsqueda. Inténtalo nuevamente.');
        }
    }
});