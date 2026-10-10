import { createPromotion as createPromotionService } from "./service/promotionService.js";
import { Promotion } from "./types/promotion.js";

const addPromotionForm = document.getElementById("addPromotionForm") as HTMLFormElement;

addPromotionForm.addEventListener("submit", (event: Event) => {
	event.preventDefault();

	const title = (document.getElementById("title") as HTMLInputElement).value;
	const description = (document.getElementById("description") as HTMLInputElement).value;
	const percentage = parseFloat((document.getElementById("percentage") as HTMLInputElement).value);

	if (!title || !description || isNaN(percentage)) {
		alert("Please fill in all fields!");
		return;
	}

	const promotion: Promotion = {
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
