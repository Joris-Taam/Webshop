import { categoryService } from "./service/categoryService.js";
import { category } from "./types/category.js";

export function loadSidebar(): void {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) return;

    fetch("/shared/sidebar.html")
        .then(res => res.text())
        .then(html => (sidebar.innerHTML = html))
        .catch(err => console.error("Sidebar kon niet geladen worden:", err));
}

function createCategoryRow(cat: category): HTMLTableRowElement {
    const template = document.getElementById("categoryRowTemplate") as HTMLTemplateElement | null;
    if (!template) throw new Error("Category row template not found");

    const rowNode = template.content.cloneNode(true) as DocumentFragment;
    const row = rowNode.querySelector("tr") as HTMLTableRowElement;

    (row.querySelector(".p-name") as HTMLElement).textContent = cat.name;
    (row.querySelector(".p-beschrijving") as HTMLElement).textContent = cat.description ?? "-";

    const editBtn = row.querySelector(".edit-btn") as HTMLButtonElement;
    const deleteBtn = row.querySelector(".delete-btn") as HTMLButtonElement;

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
        if (!confirmed) return;
        void handleDelete(cat);
    });

    return row;
}

function renderCategories(categories: category[]): void {
    const tableBody = document.getElementById("categoryTableBody") as HTMLTableSectionElement | null;
    if (!tableBody) return;

    tableBody.innerHTML = "";
    categories.forEach(cat => {
        const row = createCategoryRow(cat);
        tableBody.appendChild(row);
    });
}

async function handleDelete(cat: category): Promise<void> {
    try {
        await categoryService.deleteCategory(cat.name);
        alert("Categorie verwijderd!");
        await loadCategories();
    } catch (err) {
        console.error(err);
        alert("Kon categorie niet verwijderen!");
    }
}

export async function loadCategories(): Promise<void> {
    try {
        const categories = await categoryService.getCategories();
        renderCategories(categories);
    } catch (err) {
        console.error("Kon categorieën niet laden:", err);
        alert("Fout bij laden categorieën!");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadSidebar();
    void loadCategories();
});
