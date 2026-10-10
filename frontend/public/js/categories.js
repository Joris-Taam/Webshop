// Constants & DOM
const API_BASE = (document.body?.dataset.apiBase || "http://localhost:4001/api/categories").trim();
const BACKEND_URL = "http://localhost:4001";
const container = document.getElementById("categories-grid");
// Init
document.addEventListener("DOMContentLoaded", () => {
    void loadCategories(API_BASE);
});
// Flow
async function loadCategories(API_BASE) {
    if (!container)
        return;
    try {
        const categories = await fetchCategories(API_BASE);
        renderCategories(container, categories);
    }
    catch (error) {
        console.error("Error loading categories:", error);
        container.innerHTML = '<span class="error-msg">Er was een fout bij het laden van de categorieën.</span>';
    }
}
async function fetchCategories(API_BASE) {
    const response = await fetch(API_BASE);
    if (!response.ok)
        throw new Error(`Server status ${response.status}`);
    return (await response.json());
}
// Render
function renderCategories(container, categories) {
    if (!categories.length) {
        container.innerHTML = '<span class="categories-empty">Geen categorieën gevonden.</span>';
        return;
    }
    container.innerHTML = "";
    categories.forEach((category) => {
        const card = document.createElement("article");
        card.className = "categorie-kaart";
        /*
        Voor homepage category carrousel: Copy paste deze event listener per card om direct naar de products per category te gaan
        */
        card.addEventListener("click", () => {
            window.location.href = `products.html?category=${encodeURIComponent(category.name)}`;
        });
        // Placeholder image url als we niks kunnen vinden
        let imageUrl = "https://placehold.co/275x370?text=Geen+Afbeelding";
        if (category.imgPath) {
            if (category.imgPath.startsWith("http")) {
                imageUrl = category.imgPath;
            }
            else {
                const cleanPath = category.imgPath.startsWith("/") ? category.imgPath.slice(1) : category.imgPath;
                imageUrl = `${BACKEND_URL}/${cleanPath}`;
            }
        }
        const img = document.createElement("img");
        img.className = "afbeelding";
        img.width = 275;
        img.height = 370;
        img.src = imageUrl;
        img.alt = category.name;
        img.onerror = () => { img.src = "https://placehold.co/275x370?text=Error"; };
        // Afbeelding size
        img.width = 275;
        img.height = 370;
        img.src = imageUrl;
        img.alt = category.name;
        img.onerror = () => {
            img.src = "https://placehold.co/275x370?text=Error";
        };
        const name = document.createElement("span");
        name.className = "categorie-naam";
        name.textContent = category.name;
        card.appendChild(img);
        card.appendChild(name);
        container.appendChild(card);
    });
}
export {};
