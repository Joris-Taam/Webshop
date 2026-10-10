import { Role } from "../../data/Interface/usersInterface";

export class User {
	constructor(
		public email: string,
		public firstname: string,
		public lastname: string,
		public password: string,
		public infix: string,
		public createdAt: Date,
		public roleTitle: Role
	) {}
}
