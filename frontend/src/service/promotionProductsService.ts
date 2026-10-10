import type { PromotionProduct } from "../types/promotionProduct.js";

const API_URL = "http://localhost:4001/api/promotion-products";

export interface CreatePromotionProductRequest {
	productName: string;
	productCategory: string;
	promotionTitle: string;
	startingDate: string;
	endingDate: string;
}

export const promotionProductsService = {
	getAllPromotionProducts: async (): Promise<PromotionProduct[]> => {
		const response = await fetch(API_URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			throw new Error(`apiError: Failed to fetch promotion products: ${response.statusText}`);
		}
		const data = (await response.json()) as PromotionProduct[];
		return data;
	},

	createPromotionProduct: async (
		request: CreatePromotionProductRequest
	): Promise<PromotionProduct> => {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(request),
		});
		if (!response.ok) {
			throw new Error(`apiError: Failed to create promotion product: ${response.statusText}`);
		}
		const data = (await response.json()) as PromotionProduct;
		return data;
	},
};
