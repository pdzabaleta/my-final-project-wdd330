// Normalize strings for case and accent insensitive search
function normalizeString(str) {
    return str
        .toLowerCase()
        .normalize("NFD") 
        .replace(/[\u0300-\u036f]/g, ""); 
}

// Function to measure similarity (Levenshtein distance)
function levenshteinDistance(a, b) {
    const dp = Array.from({ length: a.length + 1 }, (_, i) =>
        Array(b.length + 1).fill(i)
    );
    for (let j = 1; j <= b.length; j++) dp[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1, 
                dp[i][j - 1] + 1, 
                dp[i - 1][j - 1] + cost 
            );
        }
    }
    return dp[a.length][b.length];
}

// Main search function
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

            // Partial or similarity matches
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
