import { productService } from "./service/productService.js";
import { Product } from "./types/Product.js";
import { loadSidebar } from "./AdminAddProduct.js";

let originalName = "";
let originalCategory = "";

// Load product for editing
async function loadProductForEdit(): Promise<void> {
	const params = new URLSearchParams(window.location.search);

	originalName = params.get("name") ?? "";
	originalCategory = params.get("category") ?? "";

	if (!originalName || !originalCategory) {
		alert("Geen product gegevens gevonden!");
		return;
	}

	try {
		const product = await productService.getProduct(originalName, originalCategory);

		if (!product) {
			alert("Product niet gevonden!");
			return;
		}

		fillForm(product);
	} catch (error: unknown) {
		console.error(error);
		alert("Fout bij ophalen van product!");
	}
}

// Fill form with product data
function fillForm(product: Product): void {
	const name = document.getElementById("name") as HTMLInputElement | null;
	const desc = document.getElementById("description") as HTMLTextAreaElement | null;
	const price = document.getElementById("price") as HTMLInputElement | null;
	const cat = document.getElementById("category") as HTMLInputElement | null;
	const width = document.getElementById("sizeWidth") as HTMLInputElement | null;
	const height = document.getElementById("sizeHeight") as HTMLInputElement | null;
	const length = document.getElementById("sizeLength") as HTMLInputElement | null;

	if (name) name.value = product.name;
	if (desc) desc.value = product.description ?? "";
	if (price) price.value = product.price !== null ? product.price.toString() : "";
	if (cat) cat.value = product.category;
	if (width) width.value = product.sizeWidth?.toString() ?? "";
	if (height) height.value = product.sizeHeight?.toString() ?? "";
	if (length) length.value = product.sizeLength?.toString() ?? "";

	const img = document.getElementById("currentImg") as HTMLImageElement | null;
	if (img) {
		if (product.imgPath) {
			img.src = product.imgPath;
			img.style.display = "block";
		} else {
			img.style.display = "none";
		}
	}

	const file = document.getElementById("currentFile") as HTMLDivElement | null;
	if (file) {
		if (product.filePath) {
			const fileName = product.filePath.split("/").pop() ?? "bestand";
			file.innerHTML = `<a href="${product.filePath}" target="_blank">${fileName}</a>`;
		} else {
			file.innerHTML = "Geen bestand geüpload";
		}
	}
}

// Save product updates
async function saveProduct(): Promise<void> {
	let values;
	try {
		// Safe getFormValues
		const nameEl = document.getElementById("name") as HTMLInputElement | null;
		const descEl = document.getElementById("description") as HTMLTextAreaElement | null;
		const priceEl = document.getElementById("price") as HTMLInputElement | null;
		const catEl = document.getElementById("category") as HTMLInputElement | null;
		const widthEl = document.getElementById("sizeWidth") as HTMLInputElement | null;
		const heightEl = document.getElementById("sizeHeight") as HTMLInputElement | null;
		const lengthEl = document.getElementById("sizeLength") as HTMLInputElement | null;
		const fileEl = document.getElementById("file") as HTMLInputElement | null;
		const imgEl = document.getElementById("img") as HTMLInputElement | null;

		if (!nameEl || !descEl || !priceEl || !catEl || !widthEl || !heightEl || !lengthEl || !fileEl || !imgEl) {
			throw new Error("Some form elements are missing!");
		}

		values = {
			name: nameEl.value,
			description: descEl.value,
			price: priceEl.value ? parseFloat(priceEl.value) : null,
			category: catEl.value,
			sizeWidth: widthEl.value ? parseFloat(widthEl.value) : null,
			sizeHeight: heightEl.value ? parseFloat(heightEl.value) : null,
			sizeLength: lengthEl.value ? parseFloat(lengthEl.value) : null,
			fileElement: fileEl,
			imgElement: imgEl,
		};


	} catch (err) {
		console.error("Error getting form values:", err);
		alert("Kon formulierwaarden niet ophalen!");
		return;
	}

	try {
		const formData = new FormData();

		formData.append("name", values.name);
		formData.append("description", values.description || "");
		formData.append("price", values.price !== null ? values.price.toString() : "");
		formData.append("category", values.category);
		formData.append("sizeWidth", values.sizeWidth?.toString() ?? "");
		formData.append("sizeHeight", values.sizeHeight?.toString() ?? "");
		formData.append("sizeLength", values.sizeLength?.toString() ?? "");

		if (values.fileElement.files?.length) formData.append("file", values.fileElement.files[0]);
		if (values.imgElement.files?.length) formData.append("img", values.imgElement.files[0]);

		await productService.updateProduct(originalName, originalCategory, formData);

		alert("Product succesvol bewerkt!");
		window.location.href = "/adminProductOverview.html";
	} catch (error: unknown) {
		console.error(error);
		let message = "Kon product niet opslaan!";
		if (error && typeof error === "object" && "message" in error) {
			message += ` ${(error as { message: string }).message}`;
		}
		alert(message);
	}
}


document.addEventListener("DOMContentLoaded", (): void => {
	loadSidebar();
	void loadProductForEdit();

	const form = document.getElementById("productForm") as HTMLFormElement | null;
	if (!form) return;

	form.addEventListener("submit", (e: Event) => {
		e.preventDefault();
		void saveProduct();
	});
});

