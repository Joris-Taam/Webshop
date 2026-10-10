import { getPromotions, deletePromotion } from "./service/promotionService.js";

async function init(): Promise<void> {
	const promotions = await getPromotions();
	console.log(promotions);
	// fill the table

	const table = document.getElementById("promotionsTable") as HTMLTableElement | null;

	if (!table) return;

	promotions.forEach((promotion) => {
		const editLink = document.createElement("a");
		editLink.classList.add("btn");
		editLink.href = `adminEditPromotion.html?title=${promotion.title}`;
		editLink.textContent = "Edit";

		const deleteButton = document.createElement("button");
		deleteButton.classList.add("btn");
		deleteButton.classList.add("destructivebtn");
		deleteButton.textContent = "Delete";
		deleteButton.addEventListener("click", () => {
			if (confirm(`Are you sure you want to delete the promotion "${promotion.title}"?`)) {
				deletePromotion(promotion.title)
					.then(() => {
						// Reload the page to refresh the table
						window.location.reload();
					})
					.catch((error) => {
						console.error("Failed to delete promotion:", error);
						alert("Failed to delete promotion. Please try again.");
					});
			}
		});

		const actionsCell = document.createElement("td");
		actionsCell.appendChild(editLink);
		actionsCell.appendChild(deleteButton);

		const row = table.insertRow();
		row.insertCell().textContent = promotion.title;
		row.insertCell().textContent = promotion.description;
		row.insertCell().textContent = `${promotion.percentage}%`;
		row.appendChild(actionsCell);
	});
}

init().catch(console.error);
