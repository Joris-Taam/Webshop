import { createPromotion as createPromotionService } from "./service/promotionService.js";
const addPromotionForm = document.getElementById("addPromotionForm");
addPromotionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const percentage = parseFloat(document.getElementById("percentage").value);
    if (!title || !description || isNaN(percentage)) {
        alert("Please fill in all fields!");
        return;
    }
    const promotion = {
        title,
        description,
        percentage,
    };
    createPromotionService(promotion)
        .then(() => {
        alert("Promotion successfully created!");
        window.location.href = "/adminPromotions.html";
    })
        .catch((error) => {
        console.error("Error creating promotion:", error);
        alert(`Failed to create promotion: ${error instanceof Error ? error.message : "Unknown error"}`);
    });
});
