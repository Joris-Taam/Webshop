const API_URL = "http://localhost:4001/api/promotion";
// Get all promotions
export const getPromotions = async () => {
    const response = await fetch(API_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch promotions: ${response.statusText}`);
    }
    const data = (await response.json());
    return data;
};
// Get a single promotion by id
export const getPromotionById = async (title) => {
    const response = await fetch(`${API_URL}/${title}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch promotion: ${response.statusText}`);
    }
    const data = (await response.json());
    return data;
};
// Create a new promotion
export const createPromotion = async (promotion) => {
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
    const data = (await response.json());
    return data;
};
// Update a promotion
export const updatePromotion = async (title, newTitle, description, percentage) => {
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
    const data = (await response.json());
    return data;
};
// Delete a promotion
export const deletePromotion = async (title) => {
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
