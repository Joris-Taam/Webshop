import { UsersCrudInterface } from "../../data/Interface/usersCrudInterface";
import { User } from "../model/user";

export class UserService {
	public constructor(private usersCrudInterface: UsersCrudInterface) {}

	/**
	 * Creates a new user
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
		let result: User | null = await this.usersCrudInterface
			.createUser(email, password, firstname, infix, lastname)
			.then((user: User | null) => {
				return user;
			});
		return result;
	}

	public async getUserByEmail(email: string): Promise<User | null> {
		let result: User | null = await this.usersCrudInterface
			.readUser(email)
			.then((user: User | null) => {
				return user;
			});
		return result;
	}
}
