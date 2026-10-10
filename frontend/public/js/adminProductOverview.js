import { productService } from "./service/productService.js";
export function loadSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar)
        return;
    fetch("/shared/sidebar.html")
        .then((res) => res.text())
        .then((html) => (sidebar.innerHTML = html))
        .catch((err) => console.error("Kon de sidebar niet laden:", err));
}
function createProductRow(product) {
    const template = document.getElementById("productRowTemplate");
    const rowNode = template.content.cloneNode(true);
    const row = rowNode.querySelector("tr");
    row.querySelector(".p-name").textContent = product.name;
    row.querySelector(".p-price").textContent = `€ ${formatPrice(product.price)}`;
    row.querySelector(".p-category").textContent = product.category;
    row.querySelector(".p-description").textContent = product.description ?? "-";
    const editBtn = row.querySelector(".edit-btn");
    const deleteBtn = row.querySelector(".delete-btn");
    editBtn.addEventListener("click", () => {
        window.location.href = `/adminEditProduct.html?name=${encodeURIComponent(product.name)}&category=${encodeURIComponent(product.category)}`;
    });
    deleteBtn.addEventListener("click", () => {
        const confirmed = confirmDelete(product);
        if (!confirmed)
            return;
        void handleDelete(product);
    });
    return row;
}
function formatPrice(price) {
    if (price === null)
        return "-";
    return price.toFixed(2).replace(".", ",");
}
function renderProducts(products) {
    const tableBody = document.getElementById("productTableBody");
    if (!tableBody)
        return;
    tableBody.innerHTML = "";
    products.forEach((product) => {
        const row = createProductRow(product);
        tableBody.appendChild(row);
    });
}
function confirmDelete(product) {
    return confirm(`Weet je zeker dat je "${product.name}" wilt verwijderen?`);
}
async function handleDelete(product) {
    try {
        await productService.deleteProduct(product.name, product.category);
        alert("Product verwijderd!");
        await loadProducts();
    }
    catch (err) {
        console.error(err);
        alert("Kon product niet verwijderen!");
    }
}
export async function loadProducts() {
    try {
        const products = await productService.getProducts();
        renderProducts(products);
    }
    catch (err) {
        console.error(err);
        alert("Kon producten niet laden!");
    }
}
document.addEventListener("DOMContentLoaded", () => {
    loadSidebar();
    void loadProducts();
});
