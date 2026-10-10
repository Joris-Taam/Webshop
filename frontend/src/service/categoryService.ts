import { category } from "../types/category.js"; 

const API_URL = "http://localhost:4001/api/categories";
const BASE_API_URL = "http://localhost:4001";

export const categoryService = {
    // GET all categories
    getCategories: async (): Promise<category[]> => {
        const response = await fetch(API_URL, { method: "GET" });
        if (!response.ok) throw new Error("Failed to fetch categories");

        const categories = (await response.json()) as category[];
        return categories.map(addFullPaths);
    },

    // GET single category by name
    getCategory: async (name: string): Promise<category | null> => {
        const response = await fetch(`${API_URL}/${encodeURIComponent(name)}`);
        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error("Failed to fetch category");
        }

        const category = (await response.json()) as category;
        return addFullPaths(category);
    },

    // CREATE category with optional image
    createCategory: async (formData: FormData): Promise<string> => {
        const response = await fetch(API_URL, { method: "POST", body: formData });
        if (!response.ok) throw new Error("Failed to create category");

        const data = (await response.json()) as { id: string };
        return data.id;
    },

    // UPDATE category with optional image
    updateCategory: async (name: string, formData: FormData): Promise<void> => {
        const url = `${API_URL}/${encodeURIComponent(name)}`;
        const response = await fetch(url, { method: "PUT", body: formData });
        if (!response.ok) throw new Error("Failed to update category");
    },

    // DELETE category by name
    deleteCategory: async (name: string): Promise<void> => {
        const url = `${API_URL}/${encodeURIComponent(name)}`;
        const response = await fetch(url, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete category");
    },
};

function addFullPaths(category: category): category {
    return {
        ...category,
        imgPath: category.imgPath ? `${BASE_API_URL}${category.imgPath}` : undefined,
    };
}
