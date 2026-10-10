import { categoryService } from "./service/categoryService.js";
export function loadSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar)
        return;
    fetch("/shared/sidebar.html")
        .then(res => res.text())
        .then(html => (sidebar.innerHTML = html))
        .catch(err => console.error("Sidebar kon niet geladen worden:", err));
}
function createCategoryRow(cat) {
    const template = document.getElementById("categoryRowTemplate");
    if (!template)
        throw new Error("Category row template not found");
    const rowNode = template.content.cloneNode(true);
    const row = rowNode.querySelector("tr");
    row.querySelector(".p-name").textContent = cat.name;
    row.querySelector(".p-beschrijving").textContent = cat.description ?? "-";
    const editBtn = row.querySelector(".edit-btn");
    const deleteBtn = row.querySelector(".delete-btn");
    editBtn.addEventListener("click", () => {
        if (!cat || !cat.name) {
            console.error("Categorie heeft geen naam!");
            return;
        }
        const encodedName = encodeURIComponent(cat.name);
        window.location.href = `/adminEditCategory.html?name=${encodedName}`;
    });
    deleteBtn.addEventListener("click", () => {
        const confirmed = confirm(`Weet je zeker dat je categorie "${cat.name}" wilt verwijderen?`);
        if (!confirmed)
            return;
        void handleDelete(cat);
    });
    return row;
}
function renderCategories(categories) {
    const tableBody = document.getElementById("categoryTableBody");
    if (!tableBody)
        return;
    tableBody.innerHTML = "";
    categories.forEach(cat => {
        const row = createCategoryRow(cat);
        tableBody.appendChild(row);
    });
}
async function handleDelete(cat) {
    try {
        await categoryService.deleteCategory(cat.name);
        alert("Categorie verwijderd!");
        await loadCategories();
    }
    catch (err) {
        console.error(err);
        alert("Kon categorie niet verwijderen!");
    }
}
export async function loadCategories() {
    try {
        const categories = await categoryService.getCategories();
        renderCategories(categories);
    }
    catch (err) {
        console.error("Kon categorieën niet laden:", err);
        alert("Fout bij laden categorieën!");
    }
}
document.addEventListener("DOMContentLoaded", () => {
    loadSidebar();
    void loadCategories();
});
