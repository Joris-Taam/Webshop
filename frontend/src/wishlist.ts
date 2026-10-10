interface WishlistItem {
	productName: string;
	productCategory: string;
	wishlistUserEmail: string;
	price?: number | string;
	imgPath?: string;
}

// API endpoints + user context (pagina levert deze via data-attributen).
const CONFIG_URL = (document.body?.dataset.apiBase || "http://localhost:4001/api/wishlist").trim();
const API_ROOT = CONFIG_URL.replace(/\/wishlist\/?$/, "");
const WISH_API_URL = `${API_ROOT}/wishlist`;
const CART_API_URL = `${API_ROOT}/cart`;
const USER_EMAIL = (document.body?.dataset.userEmail || "").trim();
const SHARE_BASE_URL = (document.body?.dataset.shareBase || "").trim();

const tokenParam = new URLSearchParams(window.location.search).get("token");
const SHARED_EMAIL = tokenParam ? decodeShareToken(tokenParam) : null; // mail uit share-link
const IS_VIEW_ONLY = Boolean(SHARED_EMAIL); // gedeelde link = alleen kijken
const ACTIVE_EMAIL = (SHARED_EMAIL ?? USER_EMAIL).trim(); // huidige gebruiker of gedeelde

interface WishlistDom {
	grid: HTMLDivElement;
	empty: HTMLElement;
	error: HTMLElement;
}

let wishlistDom: WishlistDom | null = null;

document.addEventListener("DOMContentLoaded", () => {
	const grid = document.querySelector<HTMLDivElement>(".wishlist-grid");
	const empty = document.getElementById("wishlist-empty");
	const error = document.getElementById("wishlist-error");
	if (!grid || !empty || !error) return;

	wishlistDom = { grid, empty, error }; // bundel referenties voor eenvoud
	setupShareUI(); // Sharing modal/buttons
	grid.addEventListener("click", onGridClick); // Delegateer alle card-acties
	void loadWishlist(wishlistDom); // Haal data op en render
});

async function loadWishlist(dom: WishlistDom): Promise<void> {
	// Reset UI-states en laad de lijst voor de juiste gebruiker.
	dom.error.hidden = true;
	dom.empty.hidden = true;
	dom.grid.classList.remove("is-empty");

	if (!ACTIVE_EMAIL) {
		dom.error.hidden = false;
		dom.error.textContent = "Geen gebruiker gevonden voor de wishlist.";
		return;
	}

	try {
		const res = await fetch(`${WISH_API_URL}/${encodeURIComponent(ACTIVE_EMAIL)}`);
		if (!res.ok) throw new Error(`Server status ${res.status}`);
		const data = (await res.json()) as unknown;
		renderWishlist(dom, Array.isArray(data) ? data.filter(isWishlistItem) : []);
	} catch (error) {
		console.error("Wishlist laden mislukt:", error);
		dom.error.hidden = false;
		dom.error.textContent = "Het ophalen van je wishlist is mislukt. Probeer het later opnieuw.";
	}
}

function onGridClick(event: Event): void {
	// Reageer op klikken in de grid (delete of naar winkelmand).
	if (IS_VIEW_ONLY || !wishlistDom) return;
	const target = event.target as HTMLElement;
	const card = target.closest<HTMLDivElement>(".product");
	if (!card) return;

	if (target.closest(".delete")) {
		void removeFromWishlist(wishlistDom, card);
		return;
	}

	const cartButton = target.closest<HTMLButtonElement>(".wishlist-btn");
	if (cartButton) {
		event.preventDefault();
		const feedback = card.querySelector<HTMLParagraphElement>(".feedback");
		if (feedback) void addToCart(card, feedback, cartButton);
	}
}

function renderWishlist(dom: WishlistDom, items: WishlistItem[]): void {
	// Bouw alle kaarten in één string of toon de leeg-staat.
	if (!items.length) {
		dom.grid.innerHTML = "";
		dom.empty.hidden = false;
		dom.grid.classList.add("is-empty");
		return;
	}

	dom.empty.hidden = true;
	dom.grid.classList.remove("is-empty");
	dom.grid.innerHTML = items.map(renderCard).join("");
}

function renderCard(item: WishlistItem): string {
	const disabled = IS_VIEW_ONLY ? " disabled" : "";
	// HTML voor één kaart; data-attributen voor snelle lookups.
	return `
		<div class="product" data-product-name="${item.productName}" data-product-category="${item.productCategory}">
			<img alt="${item.productName}" src="${resolveImageUrl(item)}">
			<h2 class="product-name">${item.productName}</h2>
			<p class="product-price">${formatCurrency(item.price)}</p>
			<div class="product-actions">
				<button type="button" class="delete"${disabled}>Verwijderen</button>
				<button type="button" class="wishlist-btn"${disabled}>Voeg toe aan winkelmandje</button>
			</div>
			<p class="feedback" style="display:none; margin-top:0.5rem; font-weight:bold;"></p>
		</div>
	`;
}

function itemFromCard(card: HTMLDivElement): WishlistItem {
	// Haal item-gegevens uit de data-attributen van de kaart.
	return {
		productName: card.dataset.productName ?? "",
		productCategory: card.dataset.productCategory ?? "",
		wishlistUserEmail: ACTIVE_EMAIL,
	};
}

async function addToCart(
	card: HTMLDivElement,
	feedback: HTMLParagraphElement,
	button: HTMLButtonElement,
): Promise<void> {
	// Post het item naar de cart-API en toon feedback naast het product.
	const item = itemFromCard(card);
	if (!USER_EMAIL) {
		feedback.textContent = "Je moet ingelogd zijn.";
		feedback.style.color = "#c41e3a";
		showFeedback(feedback);
		return;
	}

	button.disabled = true;
	try {
		const response = await fetch(CART_API_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				productName: item.productName,
				productCategory: item.productCategory,
				userEmail: USER_EMAIL,
			}),
		});

		if (response.status === 201) {
			feedback.textContent = "Toegevoegd aan winkelmandje!";
			feedback.style.color = "#155724";
		} else if (response.status === 409) {
			feedback.textContent = "Zit al in winkelmandje.";
			feedback.style.color = "#856404";
		} else {
			feedback.textContent = `Fout: ${await response.text()}`;
			feedback.style.color = "#c41e3a";
		}
		showFeedback(feedback);
	} catch (error) {
		console.error("Cart API Error:", error);
		feedback.textContent = "Verbindingsfout.";
		feedback.style.color = "#c41e3a";
		showFeedback(feedback);
	} finally {
		button.disabled = false;
	}
}

async function removeFromWishlist(dom: WishlistDom, card: HTMLDivElement): Promise<void> {
	// Verwijder item via API en werk de lege-staat bij.
	const item = itemFromCard(card);
	try {
		const response = await fetch(WISH_API_URL, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				productName: item.productName,
				productCategory: item.productCategory,
				userEmail: ACTIVE_EMAIL,
			}),
		});

		if (!response.ok && response.status !== 204) {
			throw new Error(`Server status ${response.status}`);
		}

		card.remove();
		if (dom.grid.children.length === 0) {
			dom.empty.hidden = false;
			dom.grid.classList.add("is-empty");
		}
	} catch (error) {
		console.error("Verwijderen uit wishlist mislukt", error);
		alert("Kon product niet verwijderen. Probeer het later opnieuw.");
	}
}

function showFeedback(feedback: HTMLParagraphElement): void {
	// Laat feedback kort zien en verberg daarna weer.
	feedback.style.display = "block";
	setTimeout(() => {
		feedback.style.display = "none";
	}, 1500);
}

function formatCurrency(amount?: number | string): string {
	// Toon bedrag of placeholder als het geen geldig getal is.
	const val = Number(amount);
	if (!Number.isFinite(val)) return "€ --,--";
	return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(val);
}

function isWishlistItem(value: unknown): value is WishlistItem {
	if (!value || typeof value !== "object") return false;
	const item = value as { productName?: unknown; productCategory?: unknown; wishlistUserEmail?: unknown };
	return typeof item.productName === "string" && typeof item.productCategory === "string" && typeof item.wishlistUserEmail === "string";
}

function resolveImageUrl(item: WishlistItem): string {
	// Bepaal een bruikbare afbeelding (placeholder, absolute url of lokale path).
	const imgPath = item.imgPath?.trim();
	if (!imgPath) return `https://placehold.co/275x370?text=${encodeURIComponent(item.productName)}`;
	if (imgPath.startsWith("http")) return imgPath;
	return `http://localhost:4001/${imgPath.replace(/^\//, "")}`;
}

function setupShareUI(): void {
	// Zet de share-UI op (modal openen/sluiten en copy-knop).
	const title = document.getElementById("wishlist-title");
	if (title) title.textContent = IS_VIEW_ONLY ? "Gedeelde verlanglijst" : "Mijn verlanglijst";

	const shareButton = document.getElementById("share-wishlist");
	if (IS_VIEW_ONLY) {
		if (shareButton) shareButton.setAttribute("hidden", "true");
		return;
	}

	const shareModal = document.getElementById("share-modal");
	const shareOverlay = document.getElementById("share-overlay");
	const shareInput = document.getElementById("share-link") as HTMLInputElement | null;
	const copyButton = document.getElementById("copy-share-link") as HTMLButtonElement | null;
	const closeButtons = document.querySelectorAll<HTMLElement>("[data-close-share]");

	if (!shareButton || !shareModal || !shareOverlay || !shareInput) return;

	const toggle = (hidden: boolean): void => {
		shareModal.hidden = hidden;
		shareOverlay.hidden = hidden;
	};

	shareButton.addEventListener("click", () => {
		shareInput.value = buildShareLink();
		toggle(false);
		shareInput.focus();
	});

	shareOverlay.addEventListener("click", () => toggle(true));
	for (const button of closeButtons) {
		button.addEventListener("click", () => toggle(true));
	}
	if (copyButton) {
		copyButton.addEventListener("click", () => void copyShareLink(shareInput, copyButton));
	}
}

function buildShareLink(): string {
	// Maak een deelbare link met token voor de huidige gebruiker.
	if (!USER_EMAIL) return window.location.href;
	const base = SHARE_BASE_URL
		? new URL(SHARE_BASE_URL)
		: new URL(window.location.origin + window.location.pathname);
	base.search = "";
	base.hash = "";
	base.searchParams.set("token", encodeShareToken(USER_EMAIL));
	return base.toString();
}

async function copyShareLink(input: HTMLInputElement, button?: HTMLButtonElement): Promise<void> {
	// Kopieer de link naar het klembord en toon korte bevestiging.
	try {
		const link = input.value;
		if (navigator.clipboard && navigator.clipboard.writeText) {
			await navigator.clipboard.writeText(link);
		} else {
			input.select();
			document.execCommand("copy");
		}
		if (button) {
			const original = button.textContent ?? "Kopieer";
			button.textContent = "Gekopieerd!";
			button.disabled = true;
			setTimeout(() => {
				button.textContent = original;
				button.disabled = false;
			}, 1200);
		}
	} catch (error) {
		console.error("Link kopiëren mislukt", error);
	}
}

function encodeShareToken(email: string): string {
	// Url-veilige base64 voor het delen van email.
	return btoa(email).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeShareToken(token: string): string | null {
	// Decodeer de token terug naar email; faalt stil bij ongeldige input.
	try {
		let base64 = token.replace(/-/g, "+").replace(/_/g, "/");
		const padding = base64.length % 4;
		if (padding) base64 += "=".repeat(4 - padding);
		return atob(base64);
	} catch (error) {
		console.warn("Kon share-token niet decoderen", error);
		return null;
	}
}

export {};
