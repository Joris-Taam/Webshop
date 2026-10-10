import { User } from "../types/user.js";

const API_URL = "http://localhost:4001/users";

export const usersService = {
    getUsers: async (): Promise<User[]> => {
        const response = await fetch(API_URL, { method: "GET" });

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const users = await response.json() as User[];
        return users;
    },
};
