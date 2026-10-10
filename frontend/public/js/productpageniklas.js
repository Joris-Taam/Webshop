// Static product detail page with a simple wishlist CTA.
const PRODUCT_DATA = {
    name: "Dragon 3D Model",
    category: "3D Model",
    description: "Een gedetailleerd high-poly drakenmodel dat ideaal is voor animatie of 3D-print projecten. Inclusief texturen voor een realistische look.",
    size: "120 x 100 x 150 mm",
    price: 29.99,
    images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2F3dprinters-store.com%2Fblogs%2Ffilament%2Fbest-sites-for-free-stl-files&psig=AOvVaw0WpHB1EXz6HJENhX22d6C1&ust=1764004654460000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLi1t8rjiJEDFQAAAAAdAAAAABA",
        "https://images.generate-ai.app/dragon-side.jpg",
        "https://images.generate-ai.app/dragon-closeup.jpg",
        "https://images.generate-ai.app/dragon-wireframe.jpg",
    ],
};
const API_BASE_URL = (document.body.dataset.apiBase || "http://localhost:4001/api/wishlist").trim();
const USER_EMAIL = (document.body.dataset.userEmail || "").trim();
function renderProduct(product) {
    // Populate the hero, text fields and thumbnail strip.
    const hero = document.getElementById("product-hero");
    const name = document.getElementById("product-name");
    const price = document.getElementById("product-price");
    const category = document.getElementById("product-category");
    const size = document.getElementById("product-size");
    const description = document.getElementById("product-description");
    const thumbnailStrip = document.getElementById("thumbnail-strip");
    if (!hero || !name || !category || !size || !description)
        return;
    hero.src = product.images[0] ?? "";
    hero.alt = product.name;
    name.textContent = product.name;
    if (price) {
        price.textContent = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(product.price);
    }
    category.textContent = product.category;
    size.textContent = product.size;
    description.textContent = product.description;
    if (thumbnailStrip) {
        thumbnailStrip.innerHTML = "";
        product.images.forEach((imageUrl, index) => {
            const img = document.createElement("img");
            img.src = imageUrl;
            img.alt = `${product.name} thumbnail ${index + 1}`;
            img.addEventListener("click", () => {
                hero.src = imageUrl;
            });
            thumbnailStrip.appendChild(img);
        });
    }
}
async function addToWishlist(product) {
    // Post the product to the wishlist API and surface lightweight feedback.
    const feedback = document.getElementById("wishlist-feedback");
    if (!USER_EMAIL || !feedback)
        return;
    try {
        const response = await fetch(API_BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                productName: product.name,
                productCategory: product.category,
                userEmail: USER_EMAIL,
            }),
        });
        feedback.hidden = false;
        if (response.status === 201) {
            feedback.style.color = "#176c27";
            feedback.textContent = `${product.name} is toegevoegd aan je verlanglijst.`;
            return;
        }
        if (response.status === 409) {
            feedback.style.color = "#c45c00";
            feedback.textContent = `${product.name} staat al in je verlanglijst.`;
            return;
        }
        const message = await response.text();
        feedback.style.color = "#c41e3a";
        feedback.textContent = `Fout bij toevoegen: ${message}`;
    }
    catch (error) {
        console.error("Kon product niet toevoegen aan wishlist", error);
        feedback.hidden = false;
        feedback.style.color = "#c41e3a";
        feedback.textContent = "Er ging iets mis. Probeer het later opnieuw.";
    }
}
document.addEventListener("DOMContentLoaded", () => {
    // Render the static product and wire the wishlist button.
    renderProduct(PRODUCT_DATA);
    document.getElementById("wishlist-button")?.addEventListener("click", () => {
        void addToWishlist(PRODUCT_DATA);
    });
});
export {};
