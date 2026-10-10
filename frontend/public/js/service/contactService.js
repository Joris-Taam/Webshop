const API_URL = "http://localhost:4001/api/contact";
export const contactService = {
    // Get all contacts
    getAllContacts: async (email, createdAt) => {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch contacts");
        }
        const data = await response.json();
        return data;
    },
    // Get a single contact by email
    getContact: async (email, createdAt) => {
        const response = await fetch(`${API_URL}/${email}/${createdAt}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            if (response.status === 404)
                return null;
            throw new Error("Failed to fetch contact");
        }
        const data = await response.json();
        return data;
    },
    // Create a new contact
    createContact: async (contact) => {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contact),
        });
        if (!response.ok) {
            throw new Error("Failed to create contact");
        }
        const data = await response.json();
        return data.insertId;
    },
    // Update a new contactRequest
    updateContact: async (email, createdAt, contact) => {
        const response = await fetch(`${API_URL}/${email}/${createdAt}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contact),
        });
        if (!response.ok) {
            throw new Error("Failed to create contact");
        }
    },
    // Delete contactRequest
    deleteContact: async (email, createdAt) => {
        const response = await fetch(`${API_URL}/${email}/${createdAt}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) {
            throw new Error("Failed to delete contact");
        }
    }
};
