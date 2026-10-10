import { getPromotionById, updatePromotion } from "./service/promotionService.js";
let originalTitle = "";
async function loadPromotionForEdit() {
    const params = new URLSearchParams(window.location.search);
    originalTitle = params.get("title") ?? "";
    if (!originalTitle) {
        alert("No promotion title found!");
        return;
    }
    try {
        const promotion = await getPromotionById(originalTitle);
        if (!promotion) {
            alert("Promotion not found!");
            return;
        }
        fillForm(promotion);
    }
    catch (err) {
        console.error(err);
        alert("Error loading promotion!");
    }
}
function fillForm(promotion) {
    document.getElementById("title").value = promotion.title ?? "";
    document.getElementById("description").value = promotion.description ?? "";
    document.getElementById("percentage").value =
        promotion.percentage?.toString() ?? "";
}
async function savePromotion(event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const percentage = parseFloat(document.getElementById("percentage").value);
    if (!title || !description || isNaN(percentage)) {
        alert("Please fill in all fields!");
        return;
    }
    try {
        await updatePromotion(originalTitle, title, description, percentage);
        alert("Promotion successfully updated!");
        window.location.href = "/adminPromotions.html";
    }
    catch (err) {
        console.error(err);
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        alert("Failed to update promotion! " + errorMessage);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    void loadPromotionForEdit();
    const form = document.getElementById("promotionForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            void savePromotion(e);
        });
    }
});
