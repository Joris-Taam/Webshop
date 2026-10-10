const API_URL = "http://localhost:4001/users";
export const usersService = {
    getUsers: async () => {
        const response = await fetch(API_URL, { method: "GET" });
        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }
        const users = await response.json();
        return users;
    },
};
