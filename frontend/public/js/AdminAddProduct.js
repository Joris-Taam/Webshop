import { productService } from "./service/productService.js";
import { categoryService } from "./service/categoryService.js";
export function loadSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar)
        return;
    fetch("/shared/sidebar.html")
        .then((res) => res.text())
        .then((html) => (sidebar.innerHTML = html))
        .catch((err) => console.error("Kon de sidebar niet laden:", err));
}
export async function getFormValues() {
    const name = document.getElementById("name");
    const description = document.getElementById("description");
    const price = document.getElementById("price");
    const categorySelect = document.getElementById("category");
    const sizeWidth = document.getElementById("sizeWidth");
    const sizeHeight = document.getElementById("sizeHeight");
    const sizeLength = document.getElementById("sizeLength");
    const fileElement = document.getElementById("file");
    const imgElement = document.getElementById("img");
    // validate category against existing list
    const categories = await categoryService.getCategories();
    const selectedCategory = categorySelect.value.trim();
    const validCategory = categories.find((c) => c.name.trim() === selectedCategory);
    if (!validCategory)
        throw new Error("Geselecteerde categorie is ongeldig");
    return {
        name: name.value.trim(),
        description: description.value.trim(),
        price: price.value ? parseFloat(price.value) : null,
        category: validCategory.name.trim(),
        sizeWidth: parseFloat(sizeWidth.value),
        sizeHeight: parseFloat(sizeHeight.value),
        sizeLength: parseFloat(sizeLength.value),
        fileElement,
        imgElement
    };
}
export function validateFormValues(values) {
    let isValid = true;
    // Reset errors
    document.querySelectorAll(".error-message").forEach((el) => (el.textContent = ""));
    const fields = [
        { id: "name", value: values.name, message: "Naam is verplicht" },
        { id: "description", value: values.description, message: "Beschrijving is verplicht" },
        { id: "price", value: values.price, message: "Prijs is verplicht" },
        { id: "category", value: values.category, message: "Categorie is verplicht" },
        { id: "sizeWidth", value: values.sizeWidth, message: "Breedte is verplicht" },
        { id: "sizeHeight", value: values.sizeHeight, message: "Hoogte is verplicht" },
        { id: "sizeLength", value: values.sizeLength, message: "Lengte is verplicht" },
        { id: "file", value: values.fileElement.files?.length, message: "Upload een productbestand" },
        { id: "img", value: values.imgElement.files?.length, message: "Upload een afbeelding" }
    ];
    for (const field of fields) {
        const inputEl = document.getElementById(field.id);
        const errorEl = inputEl?.parentElement?.querySelector(".error-message");
        if (!field.value || (typeof field.value === "number" && isNaN(field.value))) {
            if (errorEl)
                errorEl.textContent = field.message;
            isValid = false;
        }
    }
    return isValid;
}
export async function populateCategoryDropdown() {
    const categorySelect = document.getElementById("category");
    if (!categorySelect)
        return;
    try {
        const categories = await categoryService.getCategories();
        categories.forEach((cat) => {
            const option = document.createElement("option");
            option.value = cat.name.trim();
            option.textContent = cat.name.trim();
            categorySelect.appendChild(option);
        });
    }
    catch (err) {
        console.error("Kon categorieën niet laden:", err);
        const option = document.createElement("option");
        option.value = "";
        option.textContent = "Categorieën konden niet geladen worden";
        categorySelect.appendChild(option);
    }
}
export async function submitProduct(event) {
    event.preventDefault();
    let values;
    try {
        values = await getFormValues();
    }
    catch (err) {
        console.error(err);
        alert("Formulier kon niet worden gelezen!");
        return;
    }
    if (!validateFormValues(values))
        return;
    try {
        const { name, description, price, category, sizeWidth, sizeHeight, sizeLength, fileElement, imgElement } = values;
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description || "");
        formData.append("price", price?.toString() || "0");
        formData.append("category", category);
        formData.append("sizeWidth", (sizeWidth ?? 0).toString());
        formData.append("sizeHeight", (sizeHeight ?? 0).toString());
        formData.append("sizeLength", (sizeLength ?? 0).toString());
        if (fileElement.files?.length)
            formData.append("file", fileElement.files[0]);
        if (imgElement.files?.length)
            formData.append("img", imgElement.files[0]);
        await productService.createProduct(formData);
        alert("Product succesvol toegevoegd!");
        document.getElementById("productForm")?.reset();
    }
    catch (err) {
        console.error(err);
        alert("Fout bij uploaden!");
    }
}
document.addEventListener("DOMContentLoaded", () => {
    loadSidebar();
    void populateCategoryDropdown();
    const submitBtn = document.getElementById("submitBtn");
    if (submitBtn) {
        submitBtn.addEventListener("click", (event) => {
            void submitProduct(event);
        });
    }
});
