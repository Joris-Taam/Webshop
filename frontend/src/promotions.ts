interface PromotionProduct {
    productName: string;
    productCategory: string;
    promotionTitle: string;
    percentage: number;
    startingDate: string;
    endingDate: string;
    imgPath?: string; 
}

interface Category {
    name: string;
}

// Config
const API_BASE = (document.body?.dataset.apiBase || "http://localhost:4001/api").trim();
const BACKEND_URL = "http://localhost:4001";

// DOM
const container = document.getElementById("promotion-products-container") as HTMLElement;
const categorySelect = document.getElementById("category-select") as HTMLSelectElement;

// State
let allPromotionProducts: PromotionProduct[] = [];

// Init
document.addEventListener("DOMContentLoaded", () => {
    void init();
});

async function init() {
    try {
        await Promise.all([loadCategories(), loadPromotionProducts()]);
    } catch (error) {
        console.error("Initialization error:", error);
    }
}


async function loadCategories() {
    try {
        const response = await fetch(`${API_BASE}/categories`);
        if (!response.ok) throw new Error("Categories fetch failed");
        
        const categories = await response.json() as Category[];
        
        categories.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat.name;
            option.textContent = cat.name;
            categorySelect.appendChild(option);
        });

        categorySelect.addEventListener("change", () => {
            filterAndRender(categorySelect.value);
        });

    } catch (error) {
        console.error("Error loading categories:", error);
    }
}

async function loadPromotionProducts() {
    try {
        const response = await fetch(`${API_BASE}/promotion-products`);
        if (!response.ok) throw new Error("Promotion products fetch failed");

        allPromotionProducts = await response.json() as PromotionProduct[];
        
        // render
        renderPromotionProducts(allPromotionProducts);

    } catch (error) {
        console.error("Error loading promotion products:", error);
        if (container) {
            container.innerHTML = `<p class="error-message">Er ging iets mis bij het laden van de acties.</p>`;
        }
    }
}


function filterAndRender(categoryFilter: string) {
    if (!categoryFilter) {
        renderPromotionProducts(allPromotionProducts);
        return;
    }
	/*
	Filtered alle producten op basis van de geselecteerde categorie
	Het vergelijkt de productCategory veld van elk product met de categoryFilter waarde
	en rendert alleen de producten die overeenkomen met die categorie.
	*/

    const filtered = allPromotionProducts.filter(p => 
        p.productCategory.toLowerCase() === categoryFilter.toLowerCase()
    );
    renderPromotionProducts(filtered);
}


function renderPromotionProducts(products: PromotionProduct[]): void {
    if (!container) return;
    container.innerHTML = "";

    if (products.length === 0) {
        container.innerHTML = '<p class="empty-message">Geen promoties gevonden in deze categorie.</p>';
        return;
    }

    products.forEach((product) => {
        const card = createPromotionProductCard(product);
        container.appendChild(card);
    });
}

function createPromotionProductCard(product: PromotionProduct): HTMLElement {
    const card = document.createElement("a");
    card.className = "promotion-product-card";

	// Linkt naar productpagina met gegeven product params
    card.href = `productsPage.html?name=${encodeURIComponent(product.productName)}&category=${encodeURIComponent(product.productCategory)}`;

    let imageUrl = `https://placehold.co/300x250?text=${encodeURIComponent(product.productName)}`; 
    
    if (product.imgPath) {
        if (product.imgPath.startsWith("http")) {
            imageUrl = product.imgPath;
        } else {
            const cleanPath = product.imgPath.startsWith("/") ? product.imgPath.slice(1) : product.imgPath;
            imageUrl = `${BACKEND_URL}/${cleanPath}`;
        }
    }

    const imageContainer = document.createElement("div");
    imageContainer.className = "product-image-container";

    const img = document.createElement("img");
    img.className = "product-image";
    img.src = imageUrl;
    img.alt = product.productName;
    img.onerror = () => { 
        img.src = `https://placehold.co/300x250?text=${encodeURIComponent(product.productName)}`; 
    };

    imageContainer.appendChild(img);

    const infoContainer = document.createElement("div");
    infoContainer.className = "product-info-container";

    const nameEl = document.createElement("div");
    nameEl.className = "product-name";
    nameEl.textContent = product.productName;

    const catEl = document.createElement("div");
    catEl.className = "product-category";
    catEl.textContent = product.productCategory;

    const promoTitleEl = document.createElement("div");
    promoTitleEl.className = "promotion-title";
    promoTitleEl.textContent = product.promotionTitle;

    const percentEl = document.createElement("div");
    percentEl.className = "percentage";
    percentEl.textContent = `-${product.percentage}% Korting`;

    const dateEl = document.createElement("div");
    dateEl.className = "date-range";
    dateEl.textContent = `Geldig: ${formatDate(product.startingDate)} t/m ${formatDate(product.endingDate)}`;

    infoContainer.append(nameEl, catEl, promoTitleEl, percentEl, dateEl);
    
    card.append(imageContainer, infoContainer);

    return card;
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("nl-NL", {
        day: "numeric",
        month: "short",
        year: "numeric"
    }).format(date);
}

export {};