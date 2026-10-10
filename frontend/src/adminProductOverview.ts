import { productService } from "./service/productService.js";
import { Product } from "./types/Product.js";

export function loadSidebar(): void {
	const sidebar = document.getElementById("sidebar");
	if (!sidebar) return;

	fetch("/shared/sidebar.html")
		.then((res) => res.text())
		.then((html) => (sidebar.innerHTML = html))
		.catch((err) => console.error("Kon de sidebar niet laden:", err));
}

function createProductRow(product: Product): HTMLTableRowElement {
	const template = document.getElementById("productRowTemplate") as HTMLTemplateElement;
	const rowNode = template.content.cloneNode(true) as HTMLElement;
	const row = rowNode.querySelector("tr") as HTMLTableRowElement;

	(row.querySelector(".p-name") as HTMLElement).textContent = product.name;
	(row.querySelector(".p-price") as HTMLElement).textContent =`€ ${formatPrice(product.price)}`;
	(row.querySelector(".p-category") as HTMLElement).textContent = product.category;
	(row.querySelector(".p-description") as HTMLElement).textContent = product.description ?? "-";

	const editBtn = row.querySelector(".edit-btn") as HTMLButtonElement;
	const deleteBtn = row.querySelector(".delete-btn") as HTMLButtonElement;

	editBtn.addEventListener("click", () => {
		window.location.href = `/adminEditProduct.html?name=${encodeURIComponent(
			product.name
		)}&category=${encodeURIComponent(product.category)}`;
	});

	deleteBtn.addEventListener("click", () => {
		const confirmed = confirmDelete(product);
		if (!confirmed) return;
		void handleDelete(product);
	});

	return row;
}

function formatPrice(price: number | null): string {
	if (price === null) return "-";

	return price.toFixed(2).replace(".", ",");
}

function renderProducts(products: Product[]): void {
	const tableBody = document.getElementById("productTableBody");
	if (!tableBody) return;
	tableBody.innerHTML = "";

	products.forEach((product) => {
		const row = createProductRow(product);
		tableBody.appendChild(row);
	});
}

function confirmDelete(product: Product): boolean {
	return confirm(`Weet je zeker dat je "${product.name}" wilt verwijderen?`);
}

async function handleDelete(product: Product): Promise<void> {
	try {
		await productService.deleteProduct(product.name, product.category);
		alert("Product verwijderd!");
		await loadProducts();
	} catch (err) {
		console.error(err);
		alert("Kon product niet verwijderen!");
	}
}

export async function loadProducts(): Promise<void> {
	try {
		const products = await productService.getProducts();
		renderProducts(products);
	} catch (err) {
		console.error(err);
		alert("Kon producten niet laden!");
	}
}

document.addEventListener("DOMContentLoaded", () => {
	loadSidebar();
	void loadProducts();
});
