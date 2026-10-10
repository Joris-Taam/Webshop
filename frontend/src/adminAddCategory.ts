import { categoryService } from "./service/categoryService.js";

interface CategoryFormValues {
    name: string;
    description: string;
    imgElement: HTMLInputElement;
}

function getFormValues(): CategoryFormValues {
    const nameEl = document.getElementById("name") as HTMLInputElement | null;
    const descriptionEl = document.getElementById("description") as HTMLTextAreaElement | null;
    const imgElement = document.getElementById("img") as HTMLInputElement | null;

    if (!nameEl || !descriptionEl || !imgElement) {
        throw new Error("Some form elements are missing!");
    }

    return {
        name: nameEl.value.trim(),
        description: descriptionEl.value.trim(),
        imgElement,
    };
}

function validateFormValues(values: CategoryFormValues): boolean {
    let isValid = true;

    document.querySelectorAll(".error-message").forEach(el => el.textContent = "");

    if (!values.name) {
        const errorEl = document.querySelector("#name + .error-message");
        if (errorEl) errorEl.textContent = "Naam is verplicht";
        isValid = false;
    }

    if (!values.description) {
        const errorEl = document.querySelector("#description + .error-message");
        if (errorEl) errorEl.textContent = "Beschrijving is verplicht";
        isValid = false;
    }

    return isValid;
}

export async function submitCategory(event: Event): Promise<void> {
    event.preventDefault();

    let values: CategoryFormValues;

    try {
        values = getFormValues();
    } catch (err) {
        console.error(err);
        alert("Formulier kon niet worden gelezen!");
        return;
    }

    if (!validateFormValues(values)) return;

    try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        if (values.imgElement.files?.length) {
            formData.append("img", values.imgElement.files[0]);
        }

        await categoryService.createCategory(formData);
        alert(`Categorie succesvol toegevoegd!`);
        (document.getElementById("categoryForm") as HTMLFormElement)?.reset();
    } catch (err) {
        console.error("Error submitting category:", err);
        alert("Fout bij uploaden!");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("categoryForm") as HTMLFormElement | null;
    if (form) {
        form.addEventListener("submit", (event) => {
            void submitCategory(event);
        });
    }
});
