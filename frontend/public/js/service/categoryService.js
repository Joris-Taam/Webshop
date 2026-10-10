const API_URL = "http://localhost:4001/api/categories";
const BASE_API_URL = "http://localhost:4001";
export const categoryService = {
    // GET all categories
    getCategories: async () => {
        const response = await fetch(API_URL, { method: "GET" });
        if (!response.ok)
            throw new Error("Failed to fetch categories");
        const categories = (await response.json());
        return categories.map(addFullPaths);
    },
    // GET single category by name
    getCategory: async (name) => {
        const response = await fetch(`${API_URL}/${encodeURIComponent(name)}`);
        if (!response.ok) {
            if (response.status === 404)
                return null;
            throw new Error("Failed to fetch category");
        }
        const category = (await response.json());
        return addFullPaths(category);
    },
    // CREATE category with optional image
    createCategory: async (formData) => {
        const response = await fetch(API_URL, { method: "POST", body: formData });
        if (!response.ok)
            throw new Error("Failed to create category");
        const data = (await response.json());
        return data.id;
    },
    // UPDATE category with optional image
    updateCategory: async (name, formData) => {
        const url = `${API_URL}/${encodeURIComponent(name)}`;
        const response = await fetch(url, { method: "PUT", body: formData });
        if (!response.ok)
            throw new Error("Failed to update category");
    },
    // DELETE category by name
    deleteCategory: async (name) => {
        const url = `${API_URL}/${encodeURIComponent(name)}`;
        const response = await fetch(url, { method: "DELETE" });
        if (!response.ok)
            throw new Error("Failed to delete category");
    },
};
function addFullPaths(category) {
    return {
        ...category,
        imgPath: category.imgPath ? `${BASE_API_URL}${category.imgPath}` : undefined,
    };
}
