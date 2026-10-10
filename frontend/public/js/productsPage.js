// Configuratie
const API_BASE = (document.body?.dataset.apiBase || "http://localhost:4001/api").trim();
const BACKEND_URL = "http://localhost:4001";
const USER_EMAIL = (document.body?.dataset.userEmail || "test@bugwriters.com").trim();
// DOM Elementen
const loadingMsg = document.getElementById("loading-msg");
const productCard = document.getElementById("product-detail");
const feedbackMsg = document.getElementById("feedback-msg");
// Elementen binnen de productkaart
const domImg = document.getElementById("product-img");
const domCategory = document.getElementById("product-category-label");
const domName = document.getElementById("product-name");
const domDesc = document.getElementById("product-description");
const domPrice = document.getElementById("product-price");
const btnCart = document.getElementById("btn-cart");
const btnWishlist = document.getElementById("btn-wishlist");
// Huidig product
let currentProduct = null;
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const nameParam = urlParams.get("name");
    const categoryParam = urlParams.get("category");
    if (!nameParam || !categoryParam) {
        showError("Geen productinformatie gevonden in de URL.");
        return;
    }
    void loadProductDetail(nameParam, categoryParam);
});
async function loadProductDetail(name, category) {
    try {
        const endpoint = `${API_BASE}/products/${encodeURIComponent(name)}/${encodeURIComponent(category)}`;
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`Product niet gevonden (Status: ${response.status})`);
        }
        const product = await response.json();
        currentProduct = Array.isArray(product) ? product[0] : product;
        if (!currentProduct)
            throw new Error("Product data is leeg.");
        renderProduct(currentProduct);
    }
    catch (error) {
        console.error(error);
        showError("Kon het product niet laden. Probeer het later opnieuw.");
    }
}
function renderProduct(product) {
    loadingMsg.style.display = "none";
    productCard.style.display = "grid";
    domName.textContent = product.name;
    domCategory.textContent = product.category;
    domDesc.textContent = product.description || "Geen beschrijving beschikbaar.";
    domPrice.textContent = formatCurrency(product.price);
    let imageUrl = `https://placehold.co/500x500?text=${encodeURIComponent(product.name)}`;
    if (product.imgPath) {
        if (product.imgPath.startsWith("http")) {
            imageUrl = product.imgPath;
        }
        else {
            const cleanPath = product.imgPath.startsWith("/") ? product.imgPath.slice(1) : product.imgPath;
            imageUrl = `${BACKEND_URL}/${cleanPath}`;
        }
    }
    domImg.src = imageUrl;
    domImg.onerror = () => {
        domImg.src = `https://placehold.co/500x500?text=${encodeURIComponent(product.name)}`;
    };
    btnWishlist.onclick = () => addToWishlist(product);
    btnCart.onclick = () => addToCart(product);
}
async function addToCart(product) {
    if (!USER_EMAIL) {
        showFeedback("Je moet ingelogd zijn (geen e-mail gevonden).", "error");
        return;
    }
    btnCart.disabled = true;
    try {
        const response = await fetch(`${API_BASE}/cart`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                productName: product.name,
                productCategory: product.category,
                userEmail: USER_EMAIL
            }),
        });
        if (response.status === 201) {
            showFeedback(`${product.name} is toegevoegd aan je winkelmand!`, "success");
        }
        else if (response.status === 409) {
            showFeedback(`${product.name} zit al in je winkelmand.`, "warning");
        }
        else {
            const msg = await response.text();
            showFeedback(`Fout: ${msg}`, "error");
        }
    }
    catch (error) {
        console.error("Cart error:", error);
        showFeedback("Er ging iets mis met de verbinding.", "error");
    }
    finally {
        btnCart.disabled = false;
    }
}
async function addToWishlist(product) {
    if (!USER_EMAIL) {
        showFeedback("Je moet ingelogd zijn (geen e-mail gevonden).", "error");
        return;
    }
    btnWishlist.disabled = true;
    try {
        const response = await fetch(`${API_BASE}/wishlist`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                productName: product.name,
                productCategory: product.category,
                userEmail: USER_EMAIL
            }),
        });
        if (response.status === 201) {
            showFeedback(`${product.name} is toegevoegd aan je verlanglijst!`, "success");
        }
        else if (response.status === 409) {
            showFeedback(`${product.name} staat al in je verlanglijst.`, "warning");
        }
        else {
            const msg = await response.text();
            showFeedback(`Fout: ${msg}`, "error");
        }
    }
    catch (error) {
        console.error("Wishlist error:", error);
        showFeedback("Er ging iets mis met de verbinding.", "error");
    }
    finally {
        btnWishlist.disabled = false;
    }
}
function formatCurrency(value) {
    return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(value ?? 0);
}
function showError(msg) {
    loadingMsg.innerHTML = `<span class="error-msg">${msg}</span>`;
    productCard.style.display = "none";
}
function showFeedback(msg, type) {
    feedbackMsg.hidden = false;
    feedbackMsg.textContent = msg;
    if (type === "success") {
        feedbackMsg.style.backgroundColor = "#d4edda";
        feedbackMsg.style.color = "#155724";
        feedbackMsg.style.border = "1px solid #c3e6cb";
    }
    else if (type === "warning") {
        feedbackMsg.style.backgroundColor = "#fff3cd";
        feedbackMsg.style.color = "#856404";
        feedbackMsg.style.border = "1px solid #ffeeba";
    }
    else {
        feedbackMsg.style.backgroundColor = "#f8d7da";
        feedbackMsg.style.color = "#721c24";
        feedbackMsg.style.border = "1px solid #f5c6cb";
    }
    setTimeout(() => {
        feedbackMsg.hidden = true;
    }, 4000);
}
export {};
