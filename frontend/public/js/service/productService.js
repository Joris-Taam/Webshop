const API_URL = "http://localhost:4001/api/products";
const BASE_API_URL = "http://localhost:4001";
export const productService = {
    getProducts: async () => {
        const response = await fetch(API_URL, { method: "GET" });
        if (!response.ok)
            throw new Error("Failed to fetch products");
        const products = (await response.json());
        return products.map((p) => addFullPaths(p));
    },
    getProduct: async (name, category) => {
        const response = await fetch(`${API_URL}/${encodeURIComponent(name)}/${encodeURIComponent(category)}`);
        if (!response.ok) {
            if (response.status === 404)
                return null;
            throw new Error("Failed to fetch product");
        }
        const product = (await response.json());
        return addFullPaths(product);
    },
    createProduct: async (formData) => {
        const response = await fetch(API_URL, { method: "POST", body: formData });
        if (!response.ok)
            throw new Error("Failed to create product");
        const data = (await response.json());
        return data.id;
    },
    updateProduct: async (name, category, formData) => {
        const url = `${API_URL}/${encodeURIComponent(name)}/${encodeURIComponent(category)}`;
        const response = await fetch(url, { method: "PUT", body: formData });
        if (!response.ok)
            throw new Error("Failed to update product");
    },
    deleteProduct: async (name, category) => {
        const url = `${API_URL}/${encodeURIComponent(name)}/${encodeURIComponent(category)}`;
        const response = await fetch(url, { method: "DELETE" });
        if (!response.ok)
            throw new Error("Failed to delete product");
    },
};
function addFullPaths(product) {
    return {
        ...product,
        imgPath: product.imgPath ? `${BASE_API_URL}${product.imgPath}` : undefined,
        filePath: product.filePath ? `${BASE_API_URL}${product.filePath}` : undefined,
    };
}
