import { Product } from "../types/Product.js";

const API_URL = "http://localhost:4001/api/products";
const BASE_API_URL = "http://localhost:4001";

export const productService = {
	getProducts: async (): Promise<Product[]> => {
		const response = await fetch(API_URL, { method: "GET" });
		if (!response.ok) throw new Error("Failed to fetch products");

		const products = (await response.json()) as Product[];
		return products.map((p) => addFullPaths(p));
	},

	getProduct: async (name: string, category: string): Promise<Product | null> => {
		const response = await fetch(
			`${API_URL}/${encodeURIComponent(name)}/${encodeURIComponent(category)}`
		);
		if (!response.ok) {
			if (response.status === 404) return null;
			throw new Error("Failed to fetch product");
		}

		const product = (await response.json()) as Product;
		return addFullPaths(product);
	},

	createProduct: async (formData: FormData): Promise<string> => {
		const response = await fetch(API_URL, { method: "POST", body: formData });
		if (!response.ok) throw new Error("Failed to create product");
		const data = (await response.json()) as { id: string };
		return data.id;
	},

	updateProduct: async (name: string, category: string, formData: FormData): Promise<void> => {
		const url = `${API_URL}/${encodeURIComponent(name)}/${encodeURIComponent(category)}`;
		const response = await fetch(url, { method: "PUT", body: formData });
		if (!response.ok) throw new Error("Failed to update product");
	},

	deleteProduct: async (name: string, category: string): Promise<void> => {
		const url = `${API_URL}/${encodeURIComponent(name)}/${encodeURIComponent(category)}`;
		const response = await fetch(url, { method: "DELETE" });
		if (!response.ok) throw new Error("Failed to delete product");
	},
};

function addFullPaths(product: Product): Product {
	return {
		...product,
		imgPath: product.imgPath ? `${BASE_API_URL}${product.imgPath}` : undefined,
		filePath: product.filePath ? `${BASE_API_URL}${product.filePath}` : undefined,
	};
}
