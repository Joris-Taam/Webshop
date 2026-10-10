import { getPromotions } from "./service/promotionService.js";
import { productService } from "./service/productService.js";
import { promotionProductsService } from "./service/promotionProductsService.js";
import type { Promotion } from "./types/promotion.js";
import type { Product } from "./types/Product.js";
import type { PromotionProduct } from "./types/promotionProduct.js";

const addPromotionProductForm = document.getElementById(
	"addPromotionProductForm"
) as HTMLFormElement;
const promotionSelect = document.getElementById("promotion") as HTMLSelectElement;
const productsContainer = document.getElementById("productsContainer") as HTMLDivElement;
const startingDateInput = document.getElementById("startingDate") as HTMLInputElement;
const endingDateInput = document.getElementById("endingDate") as HTMLInputElement;

let promotions: Promotion[] = [];
let products: Product[] = [];

// Load promotions and products on page load
async function loadData(): Promise<void> {
	try {
		[promotions, products] = await Promise.all([getPromotions(), productService.getProducts()]);

		// Populate promotion dropdown
		promotionSelect.innerHTML = '<option value="">-- Select a promotion --</option>';
		promotions.forEach((promotion) => {
			const option = document.createElement("option");
			option.value = promotion.title;
			option.textContent = `${promotion.title} (${promotion.percentage}% off)`;
			promotionSelect.appendChild(option);
		});

		// Populate products checkboxes
		productsContainer.innerHTML = "";
		if (products.length === 0) {
			productsContainer.innerHTML = "<p>No products available.</p>";
			return;
		}

		products.forEach((product) => {
			const productDiv = document.createElement("div");
			productDiv.className = "product-checkbox";

			const checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			checkbox.id = `product-${product.name}-${product.category}`;
			checkbox.value = `${product.name}|${product.category}`;
			checkbox.name = "products";

			const label = document.createElement("label");
			label.htmlFor = checkbox.id;
			label.textContent = `${product.name} (${product.category})`;

			productDiv.appendChild(checkbox);
			productDiv.appendChild(label);
			productsContainer.appendChild(productDiv);
		});
	} catch (error: unknown) {
		console.error("Error loading data:", error);
		const errorMessage = error instanceof Error ? error.message : "Unknown error";
		alert(`Failed to load data: ${errorMessage}`);
	}
}

// Handle form submission
addPromotionProductForm.addEventListener("submit", (event: Event): void => {
	event.preventDefault();
	void (async (): Promise<void> => {
		const promotionTitle = promotionSelect.value;
		const startingDate = startingDateInput.value;
		const endingDate = endingDateInput.value;

		// Validation
		if (!promotionTitle) {
			alert("Please select a promotion!");
			return;
		}

		if (!startingDate || !endingDate) {
			alert("Please select both starting and ending dates!");
			return;
		}

		if (new Date(startingDate) >= new Date(endingDate)) {
			alert("Ending date must be after starting date!");
			return;
		}

		const selectedProducts = Array.from(
			document.querySelectorAll<HTMLInputElement>('input[name="products"]:checked')
		);

		if (selectedProducts.length === 0) {
			alert("Please select at least one product!");
			return;
		}

		// Create promotion products for each selected product
		try {
			const promises = selectedProducts.map((checkbox): Promise<PromotionProduct> => {
				const [productName, productCategory] = checkbox.value.split("|");
				return promotionProductsService.createPromotionProduct({
					productName,
					productCategory,
					promotionTitle,
					startingDate,
					endingDate,
				});
			});

			await Promise.all(promises);
			alert(`Successfully added ${selectedProducts.length} product(s) to promotion!`);
			window.location.href = "/adminPromotions.html";
		} catch (error: unknown) {
			console.error("Error creating promotion products:", error);
			const errorMessage = error instanceof Error ? error.message : "Unknown error";
			alert(`Failed to create promotion products: ${errorMessage}`);
		}
	})();
});

// Load data when page loads
void loadData();
