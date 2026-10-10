// Een order heeft items met naam, categorie, prijs en aantal.
interface OrderItem {
	productName: string;
	productCategory: string;
	price: number;
	quantity: number;
}

// Een order bevat klantinfo, totaalbedrag en een lijst items.
interface Order {
	userEmail: string;
	createdAt: string;
	total: number;
	status: string;
	items: OrderItem[];
}

// Pak de API-url uit de pagina (fallback naar localhost) en zoek de UI elementen.
const API_BASE = (document.body?.dataset.apiBase || "http://localhost:4001/api/orders").trim();
const container = document.getElementById("orders-grid") as HTMLDivElement | null;
const errorEl = document.getElementById("orders-error") as HTMLParagraphElement | null;
const refreshBtn = document.getElementById("orders-refresh") as HTMLButtonElement | null;

// Start alleen als de benodigde elementen aanwezig zijn.
if (container && errorEl) {
	document.addEventListener("DOMContentLoaded", () => {
		// Refresh-knop laadt opnieuw; initieel meteen laden.
		refreshBtn?.addEventListener("click", () => void loadOrders());
		void loadOrders();
	});
}

async function loadOrders(): Promise<void> {
	if (!container || !errorEl) return;

	// Toon laadstatus en verberg fouten tijdens het ophalen.
	container.innerHTML = '<p class="orders-loading">Bezig met laden...</p>';
	errorEl.hidden = true;
	if (refreshBtn) refreshBtn.disabled = true;

	try {
		// Haal orders op en render direct.
		renderOrders(await fetchOrders());
	} catch (error) {
		// Toon nette foutmelding in de UI en log naar console.
		console.error("Orders ophalen mislukt", error);
		errorEl.textContent =
			error instanceof Error && error.message
				? `Kon orders niet ophalen (${error.message}). Controleer of de server draait.`
				: "Kon orders niet ophalen. Controleer of de server draait.";
		errorEl.hidden = false;
		container.innerHTML = "";
	}

	if (refreshBtn) refreshBtn.disabled = false;
}

async function fetchOrders(): Promise<Order[]> {
	// Eenvoudige GET; faalt op non-OK status.
	const response = await fetch(API_BASE);
	if (!response.ok) throw new Error(`Server status ${response.status}`);
	return (await response.json()) as Order[];
}

function renderOrders(orders: Order[]): void {
	if (!container) return;
	// Bouw alle kaarten in één HTML-string (snel en simpel).
	container.innerHTML = orders.length
		? orders
				.map((order) => {
					// Zet alle orderregels om naar HTML (geen extra DOM-nodes maken).
					const items = (order.items ?? [])
						.map(
							(item) => `
								<div class="order-item">
									<div class="order-item__name">${escapeHtml(item.productName)}</div>
									<div class="order-item__meta">${escapeHtml(item.productCategory)}</div>
									<div class="order-item__price">${formatCurrency(item.price)}</div>
									<div class="order-item__qty">x${item.quantity}</div>
								</div>
							`,
						)
						.join("");

					// Complete kaart met kop (email, datum, status, totaal) en items.
					return `
						<article class="order-card">
							<header class="order-card__header">
								<div><span class="label">Email</span><strong>${escapeHtml(order.userEmail)}</strong></div>
								<div><span class="label">Datum</span><strong>${formatDate(order.createdAt)}</strong></div>
								<div><span class="label">Status</span><span class="pill">${escapeHtml(order.status)}</span></div>
								<div><span class="label">Totaal</span><strong>${formatCurrency(order.total)}</strong></div>
							</header>
							<div class="order-card__items">${items}</div>
						</article>
					`;
				})
				.join("")
		: '<p class="orders-empty">Geen orders gevonden.</p>';
}

function formatCurrency(value: number): string {
	// Toon bedrag in euro's; fallback naar 0 bij ontbrekende waarde.
	return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(
		value ?? 0
	);
}

function formatDate(value: string): string {
	// Leesbare datum/tijd; bij ongeldige datum het originele veld laten zien.
	const date = new Date(value);
	return isNaN(date.getTime()) ? value : date.toLocaleString("nl-NL");
}

function escapeHtml(value: string): string {
	// Minimalistische HTML-escaper om tekst veilig te tonen.
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}
export {};
