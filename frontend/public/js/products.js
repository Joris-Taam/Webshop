// Constants & DOM
const API_BASE = (document.body?.dataset.apiBase || "http://localhost:4001/api/products").trim();
const BACKEND_URL = "http://localhost:4001";
const container = document.getElementById("products-grid");
const titleElement = document.getElementById("page-title");
// Init
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFilter = urlParams.get("category");
    if (categoryFilter && titleElement) {
        titleElement.textContent = categoryFilter;
    }
    void loadProducts(API_BASE, categoryFilter);
});
// Flow
async function loadProducts(url, categoryFilter) {
    if (!container)
        return;
    try {
        const allProducts = await fetchProducts(url);
        const filteredProducts = categoryFilter
            ? allProducts.filter(p => p.category.toLowerCase() === categoryFilter.toLowerCase())
            : allProducts;
        renderProducts(container, filteredProducts);
    }
    catch (error) {
        console.error("Error loading products:", error);
        container.innerHTML = '<span class="error-msg">Kon producten niet laden.</span>';
    }
}
async function fetchProducts(url) {
    const response = await fetch(url);
    if (!response.ok)
        throw new Error(`Server status ${response.status}`);
    return (await response.json());
}
// Render
function renderProducts(container, products) {
    if (!products.length) {
        container.innerHTML = '<span style="grid-column: 1/-1; text-align: center;">Geen producten gevonden in deze categorie.</span>';
        return;
    }
    container.innerHTML = "";
    products.forEach((product) => {
        const card = document.createElement("article");
        card.className = "product-card";
        /*
        Voor homepage carrousel met promoties om direct naar productpagina te gaan: copy paste deze event listener per card om direct naar de productpagina te gaan.
        */
        card.addEventListener("click", () => {
            window.location.href = `productsPage.html?name=${encodeURIComponent(product.name)}&category=${encodeURIComponent(product.category)}`;
        });
        let imageUrl = `https://placehold.co/275x370?text=${encodeURIComponent(product.name)}`;
        if (product.imgPath) {
            if (product.imgPath.startsWith("http")) {
                imageUrl = product.imgPath;
            }
            else {
                const cleanPath = product.imgPath.startsWith("/") ? product.imgPath.slice(1) : product.imgPath;
                imageUrl = `${BACKEND_URL}/${cleanPath}`;
            }
        }
        const img = document.createElement("img");
        img.className = "product-img";
        img.src = imageUrl;
        img.alt = product.name;
        img.width = 275;
        img.height = 370;
        img.onerror = () => {
            img.src = `https://placehold.co/275x370?text=${encodeURIComponent(product.name)}`;
        };
        const name = document.createElement("div");
        name.className = "product-name";
        name.textContent = product.name;
        const price = document.createElement("div");
        price.className = "product-price";
        price.textContent = formatCurrency(product.price);
        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(price);
        container.appendChild(card);
    });
}
// Formatteerd Euro
function formatCurrency(value) {
    return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(value ?? 0);
}
export {};
