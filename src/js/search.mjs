// Normalizar cadenas para búsqueda insensible a mayúsculas y acentos
function normalizeString(str) {
    return str
        .toLowerCase()
        .normalize("NFD") // Descompone caracteres acentuados
        .replace(/[\u0300-\u036f]/g, ""); // Elimina marcas de acento
}

// Función para medir similitud (distancia de Levenshtein)
function levenshteinDistance(a, b) {
    const dp = Array.from({ length: a.length + 1 }, (_, i) =>
        Array(b.length + 1).fill(i)
    );
    for (let j = 1; j <= b.length; j++) dp[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1, // Inserción
                dp[i][j - 1] + 1, // Eliminación
                dp[i - 1][j - 1] + cost // Sustitución
            );
        }
    }
    return dp[a.length][b.length];
}

// Función principal de búsqueda
export async function searchProducts(query, filePath = '/data/products.json') {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        const products = await response.json();

        const normalizedQuery = normalizeString(query);
        const results = products.filter(product => {
            const normalizedName = normalizeString(product.name);
            const normalizedCategory = normalizeString(product.category);

            // Coincidencias parciales o por similitud
            const isPartialMatch =
                normalizedName.includes(normalizedQuery) ||
                normalizedCategory.includes(normalizedQuery);

            const isSimilar =
                levenshteinDistance(normalizedQuery, normalizedName) <= 2;

            return isPartialMatch || isSimilar;
        });

        return results.length > 0 ? results : null;
    } catch (error) {
        console.error('Error al buscar productos:', error);
        throw error;
    }
}
