import { getPromotionById, updatePromotion } from "./service/promotionService.js";
import { Promotion } from "./types/promotion.js";

let originalTitle = "";

async function loadPromotionForEdit(): Promise<void> {
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
	} catch (err) {
		console.error(err);
		alert("Error loading promotion!");
	}
}

function fillForm(promotion: Promotion): void {
	(document.getElementById("title") as HTMLInputElement).value = promotion.title ?? "";
	(document.getElementById("description") as HTMLInputElement).value = promotion.description ?? "";
	(document.getElementById("percentage") as HTMLInputElement).value =
		promotion.percentage?.toString() ?? "";
}

async function savePromotion(event: Event): Promise<void> {
	event.preventDefault();

	const title = (document.getElementById("title") as HTMLInputElement).value;
	const description = (document.getElementById("description") as HTMLInputElement).value;
	const percentage = parseFloat((document.getElementById("percentage") as HTMLInputElement).value);

	if (!title || !description || isNaN(percentage)) {
		alert("Please fill in all fields!");
		return;
	}

	try {
		await updatePromotion(originalTitle, title, description, percentage);

		alert("Promotion successfully updated!");
		window.location.href = "/adminPromotions.html";
	} catch (err) {
		console.error(err);
		const errorMessage = err instanceof Error ? err.message : "Unknown error";
		alert("Failed to update promotion! " + errorMessage);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	void loadPromotionForEdit();

	const form = document.getElementById("promotionForm") as HTMLFormElement;
	if (form) {
		form.addEventListener("submit", (e) => {
			void savePromotion(e);
		});
	}
});
