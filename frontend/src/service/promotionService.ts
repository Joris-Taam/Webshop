import type { Promotion } from "../types/promotion.js";

const API_URL = "http://localhost:4001/api/promotion";

// Get all promotions
export const getPromotions = async (): Promise<Promotion[]> => {
	const response = await fetch(API_URL, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (!response.ok) {
		throw new Error(`Failed to fetch promotions: ${response.statusText}`);
	}
	const data = (await response.json()) as Promotion[];
	return data;
};

// Get a single promotion by id
export const getPromotionById = async (title: string): Promise<Promotion> => {
	const response = await fetch(`${API_URL}/${title}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (!response.ok) {
		throw new Error(`Failed to fetch promotion: ${response.statusText}`);
	}
	const data = (await response.json()) as Promotion;
	return data;
};

// Create a new promotion
export const createPromotion = async (promotion: Promotion): Promise<Promotion> => {
	const response = await fetch(API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(promotion),
	});
	if (!response.ok) {
		throw new Error(`Failed to create promotion: ${response.statusText}`);
	}
	const data = (await response.json()) as Promotion;
	return data;
};

// Update a promotion
export const updatePromotion = async (
	title: string,
	newTitle: string,
	description: string,
	percentage: number
): Promise<Promotion> => {
	const response = await fetch(`${API_URL}/${title}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ title, newTitle, description, percentage }),
	});
	if (!response.ok) {
		throw new Error(`Failed to update promotion: ${response.statusText}`);
	}
	const data = (await response.json()) as Promotion;
	return data;
};

// Delete a promotion
export const deletePromotion = async (title: string): Promise<void> => {
	const response = await fetch(`${API_URL}/${title}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (!response.ok) {
		throw new Error(`Failed to delete promotion: ${response.statusText}`);
	}
};
