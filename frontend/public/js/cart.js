const API_BASE = (document.body?.dataset.apiBase || "http://localhost:4001/api/cart").trim();
const USER_EMAIL = (document.body?.dataset.userEmail || "test@bugwriters.com").trim();
const BACKEND_URL = "http://localhost:4001";
const container = document.getElementById("cart-container");
const summarySection = document.getElementById("cart-summary");
const totalItemsEl = document.getElementById("total-items");
const totalPriceEl = document.getElementById("total-price");
document.addEventListener("DOMContentLoaded", () => {
    void loadCart();
});
async function loadCart() {
    if (!USER_EMAIL) {
        container.innerHTML = '<p class="error-msg">Niet ingelogd.</p>';
        return;
    }
    try {
        const response = await fetch(`${API_BASE}/${USER_EMAIL}`);
        if (!response.ok)
            throw new Error("Kon winkelmand niet ophalen");
        const cartItems = await response.json();
        renderCart(cartItems);
        updateSummary(cartItems);
    }
    catch (error) {
        console.error(error);
        container.innerHTML = '<p class="error-msg">Fout bij laden van winkelmand.</p>';
    }
}
function renderCart(items) {
    container.innerHTML = "";
    if (items.length === 0) {
        container.innerHTML = '<p class="empty-msg">Je winkelmand is leeg.</p>';
        summarySection.style.display = "none";
        return;
    }
    summarySection.style.display = "block";
    items.forEach(item => {
        const row = document.createElement("article");
        row.className = "cart-item";
        let imageUrl = `https://placehold.co/80x80?text=${encodeURIComponent(item.productName)}`;
        if (item.imgPath) {
            if (item.imgPath.startsWith("http")) {
                imageUrl = item.imgPath;
            }
            else {
                const cleanPath = item.imgPath.startsWith("/") ? item.imgPath.slice(1) : item.imgPath;
                imageUrl = `${BACKEND_URL}/${cleanPath}`;
            }
        }
        row.innerHTML = `
            <img src="${imageUrl}" alt="${item.productName}" class="cart-img" onerror="this.src='https://placehold.co/80x80?text=Error'">
            <div class="item-details">
                <h3>${item.productName}</h3>
                <span class="category">${item.productCategory}</span>
            </div>
            <div class="item-price">${formatCurrency(item.price || 0)}</div>
        `;
        const removeBtn = document.createElement("button");
        removeBtn.className = "btn-remove";
        removeBtn.innerHTML = "&times;";
        removeBtn.title = "Verwijderen";
        removeBtn.onclick = () => removeFromCart(item.productName, item.productCategory, row);
        row.appendChild(removeBtn);
        container.appendChild(row);
    });
}
function updateSummary(items) {
    totalItemsEl.textContent = items.length.toString();
    const total = items.reduce((sum, item) => sum + (item.price || 0), 0);
    totalPriceEl.textContent = formatCurrency(total);
}
async function removeFromCart(name, category, rowElement) {
    try {
        const response = await fetch(API_BASE, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                productName: name,
                productCategory: category,
                userEmail: USER_EMAIL
            })
        });
        if (response.ok) {
            void loadCart();
        }
        else {
            alert("Kon product niet verwijderen.");
        }
    }
    catch (error) {
        console.error("Delete error:", error);
    }
}
function formatCurrency(value) {
    return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(value);
}
export {};
