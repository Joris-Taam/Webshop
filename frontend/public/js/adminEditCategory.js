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
function getCategoryNameFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("name");
}
async function loadAndFillCategory() {
    const name = getCategoryNameFromUrl();
    if (!name) {
        console.error("Geen categorie naam gevonden in de URL");
        return;
    }
    try {
        const cat = await categoryService.getCategory(name);
        if (!cat) {
            alert("Categorie niet gevonden");
            return;
        }
        const nameInput = document.getElementById("name");
        const descInput = document.getElementById("description");
        const imgPreview = document.getElementById("imgPreview");
        if (nameInput)
            nameInput.value = cat.name;
        if (descInput)
            descInput.value = cat.description ?? "";
        if (cat.imgPath && imgPreview) {
            imgPreview.src = cat.imgPath;
            imgPreview.style.display = "";
        }
    }
    catch (err) {
        console.error("Fout bij laden categorie:", err);
        alert("Fout bij het laden van de categorie");
    }
}
export function getFormValues() {
    const name = document.getElementById("name").value.trim();
    const description = document.getElementById("description").value.trim();
    const imgElement = document.getElementById("img");
    return {
        name,
        description,
        imgElement,
    };
}
export function validateFormValues(values) {
    let isValid = true;
    const fields = [
        { id: "name", value: values.name, message: "Naam is verplicht" },
        { id: "description", value: values.description, message: "Beschrijving is verplicht" },
    ];
    document.querySelectorAll(".error-message").forEach((el) => (el.textContent = ""));
    fields.forEach((field) => {
        const inputEl = document.getElementById(field.id);
        const errorEl = inputEl?.parentElement?.querySelector(".error-message");
        if (!field.value) {
            if (errorEl)
                errorEl.textContent = field.message;
            isValid = false;
        }
    });
    return isValid;
}
export async function submitCategory(event) {
    event.preventDefault();
    const originalName = getCategoryNameFromUrl();
    if (!originalName) {
        alert("Geen originele categorie naam gevonden (kan niet updaten)");
        return;
    }
    const values = getFormValues();
    if (!validateFormValues(values))
        return;
    try {
        const { name, description, imgElement } = values;
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        if (imgElement && imgElement.files?.length) {
            formData.append("img", imgElement.files[0]);
        }
        await categoryService.updateCategory(originalName, formData);
        alert("Categorie succesvol bijgewerkt!");
        if (originalName !== name) {
            history.replaceState(null, "", `/adminEditCategory.html?name=${encodeURIComponent(name)}`);
        }
    }
    catch (err) {
        console.error("Fout bij updaten categorie:", err);
        alert("Fout bij updaten!");
    }
}
document.addEventListener("DOMContentLoaded", () => {
    loadSidebar();
    void loadAndFillCategory();
    const form = document.getElementById("categoryForm");
    if (form) {
        form.addEventListener("submit", (event) => {
            void submitCategory(event);
        });
    }
    else {
        const submitBtn = document.getElementById("submitBtn");
        if (submitBtn) {
            submitBtn.addEventListener("click", (event) => {
                void submitCategory(event);
            });
        }
    }
    const imgInput = document.getElementById("img");
    const imgPreview = document.getElementById("imgPreview");
    if (imgInput && imgPreview) {
        imgInput.addEventListener("change", () => {
            const file = imgInput.files?.[0];
            if (!file) {
                imgPreview.src = "";
                imgPreview.style.display = "none";
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                imgPreview.src = reader.result;
                imgPreview.style.display = "block";
            };
            reader.readAsDataURL(file);
        });
    }
});
