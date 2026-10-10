import { User } from "../../business/model/user";
import { UserModel } from "../models/users";

export interface UsersCrudInterface {
	createUser(
		email: string,
		password: string,
		firstname: string,
		infix: string,
		lastname: string
	): Promise<User | null>;
	readUser(id: string): Promise<User | null>;
	updateUser(): void;
	deleteUser(): void;
}

export class MysqlUserCrudInterface implements UsersCrudInterface {
	private user!: UserModel;

	public constructor() {
		this.user = new UserModel();
	}

	/**
	 * Creates a new user in the database
	 * @param email - User's email address
	 * @param password - Hashed password
	 * @param firstname - User's first name
	 * @param infix - User's middle name/infix
	 * @param lastname - User's last name
	 * @returns Promise resolving to User business model or null if creation fails
	 */
	public async createUser(
		email: string,
		password: string,
		firstname: string,
		infix: string,
		lastname: string
	): Promise<User | null> {
		let returnValue: User | null = null;

		const userEntity = await this.user
			.createUser(email, password, firstname, infix, lastname)
			.then((result) => {
				return result;
			});

		if (userEntity) {
			// Convert UserEntity to business model User
			returnValue = new User(
				userEntity.email,
				userEntity.firstname,
				userEntity.lastname,
				userEntity.password,
				userEntity.infix,
				userEntity.createdAt,
				userEntity.roleTitle
			);
		}

		return returnValue;
	}

	public async readUser(email: string): Promise<User | null> {
		const userEntity = await this.user.readUser(email).then((result) => {
			return result;
		});

		return userEntity;
	}

	updateUser(): void {
		throw new Error("Method not implemented.");
	}

	deleteUser(): void {
		throw new Error("Method not implemented.");
	}
}
