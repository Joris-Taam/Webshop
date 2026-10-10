import { categoryService } from "./service/categoryService.js";
function getFormValues() {
    const nameEl = document.getElementById("name");
    const descriptionEl = document.getElementById("description");
    const imgElement = document.getElementById("img");
    if (!nameEl || !descriptionEl || !imgElement) {
        throw new Error("Some form elements are missing!");
    }
    return {
        name: nameEl.value.trim(),
        description: descriptionEl.value.trim(),
        imgElement,
    };
}
function validateFormValues(values) {
    let isValid = true;
    document.querySelectorAll(".error-message").forEach(el => el.textContent = "");
    if (!values.name) {
        const errorEl = document.querySelector("#name + .error-message");
        if (errorEl)
            errorEl.textContent = "Naam is verplicht";
        isValid = false;
    }
    if (!values.description) {
        const errorEl = document.querySelector("#description + .error-message");
        if (errorEl)
            errorEl.textContent = "Beschrijving is verplicht";
        isValid = false;
    }
    return isValid;
}
export async function submitCategory(event) {
    event.preventDefault();
    let values;
    try {
        values = getFormValues();
    }
    catch (err) {
        console.error(err);
        alert("Formulier kon niet worden gelezen!");
        return;
    }
    if (!validateFormValues(values))
        return;
    try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        if (values.imgElement.files?.length) {
            formData.append("img", values.imgElement.files[0]);
        }
        await categoryService.createCategory(formData);
        alert(`Categorie succesvol toegevoegd!`);
        document.getElementById("categoryForm")?.reset();
    }
    catch (err) {
        console.error("Error submitting category:", err);
        alert("Fout bij uploaden!");
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("categoryForm");
    if (form) {
        form.addEventListener("submit", (event) => {
            void submitCategory(event);
        });
    }
});
