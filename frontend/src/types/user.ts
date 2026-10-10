export type Role = "user" | "admin";
export interface User {
	email: string;
	firstname: string;
	lastname: string;
	infix: string;
	createdAt: Date;
	roleTitle: Role;
}
