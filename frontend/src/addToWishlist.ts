interface WishlistRequest {
	productName: string;
	productCategory: string;
	userEmail: string;
}

const API_BASE_URL = document.body?.dataset.apiBase?.trim() ?? "http://localhost:4001/api/wishlist";
const FALLBACK_USER_EMAIL = document.body?.dataset.userEmail?.trim() ?? "";

function resolvePayload(button: HTMLButtonElement): WishlistRequest | null {
	const productName = button.dataset.productName?.trim() ?? button.dataset.productId?.trim() ?? "";
	const productCategory = button.dataset.productCategory?.trim() ?? "";
	const userEmail = button.dataset.userEmail?.trim() ?? FALLBACK_USER_EMAIL;

	if (!productName || !productCategory || !userEmail) {
		console.warn(
			"Wishlist button mist verplichte data-attributen (productName/productCategory/userEmail).",
			button
		);
		return null;
	}

	return { productName, productCategory, userEmail };
}

async function addProductToWishlist(payload: WishlistRequest): Promise<Response> {
	return fetch(API_BASE_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			productName: payload.productName,
			productCategory: payload.productCategory,
			userEmail: payload.userEmail,
		}),
	});
}

function attachWishlistButtons(): void {
	const buttons = document.querySelectorAll<HTMLButtonElement>("[data-wishlist-button]");

	if (!buttons.length) {
		return;
	}

	buttons.forEach((button) => {
		button.addEventListener("click", (event) => {
			void handleWishlistClick(button, event);
		});
	});
}

async function handleWishlistClick(button: HTMLButtonElement, event: Event): Promise<void> {
	event.preventDefault();
	const payload = resolvePayload(button);
	if (!payload) {
		return;
	}

	button.disabled = true;

	try {
		const response = await addProductToWishlist(payload);
		const feedbackTarget = button.dataset.feedbackTarget
			? document.querySelector<HTMLElement>(button.dataset.feedbackTarget)
			: null;

		if (response.status === 201) {
			const message = `${payload.productName} toegevoegd aan je verlanglijst.`;
			console.log(message);
			if (feedbackTarget) {
				feedbackTarget.textContent = message;
				feedbackTarget.removeAttribute("hidden");
			}
		} else if (response.status === 409) {
			const message = `${payload.productName} staat al in je verlanglijst.`;
			console.warn(message);
			if (feedbackTarget) {
				feedbackTarget.textContent = message;
				feedbackTarget.removeAttribute("hidden");
			}
		} else {
			const errorMessage = await response.text();
			console.error("Wishlist API-fout:", errorMessage);
		}
	} catch (error) {
		console.error("Kon product niet toevoegen aan wishlist", error);
	} finally {
		button.disabled = false;
	}
}

document.addEventListener("DOMContentLoaded", () => {
	attachWishlistButtons();
});
export {};
