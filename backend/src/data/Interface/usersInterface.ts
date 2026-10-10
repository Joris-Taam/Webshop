export type Role = "user" | "admin";

export class UserEntity {
	email!: string;
	password!: string;
	firstname!: string;
	lastname!: string;
	infix!: string;
	createdAt!: Date;
	roleTitle!: Role;
}
