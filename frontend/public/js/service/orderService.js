const API_URL = "http://localhost:4001/api/orders";
export const orderService = {
    async getOrders() {
        const res = await fetch(API_URL);
        if (!res.ok)
            throw new Error(`Kon bestellingen niet ophalen (${res.status}).`);
        return (await res.json());
    },
    async updateStatus(userEmail, createdAt, status) {
        const url = `${API_URL}/${encodeURIComponent(userEmail)}/${encodeURIComponent(createdAt)}/status`;
        const res = await fetch(url, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        });
        if (!res.ok)
            throw new Error(`Kon status niet bijwerken (${res.status}).`);
    },
};
