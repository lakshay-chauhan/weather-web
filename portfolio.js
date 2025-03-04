const API_URL = "https://fakestoreapi.com/products";
let products = [];
let filteredProducts = [];

async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        products = await response.json();
        filteredProducts = [...products];
        displayProducts();
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

function displayProducts() {
    const grid = document.getElementById("productGrid");
    grid.innerHTML = filteredProducts.map(product => `
        <div class="border p-4">
            <img src="${product.image}" class="h-32 mx-auto">
            <h2 class="text-lg font-bold mt-2">${product.title}</h2>
            <p class="text-gray-500">$${product.price}</p>
        </div>
    `).join("");
}

document.getElementById("searchInput").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    filteredProducts = products.filter(p => p.title.toLowerCase().includes(query));
    displayProducts();
});

document.getElementById("sortSelect").addEventListener("change", (e) => {
    const value = e.target.value;
    filteredProducts.sort((a, b) => value === "price-asc" ? a.price - b.price : b.price - a.price);
    displayProducts();
});

fetchProducts();
