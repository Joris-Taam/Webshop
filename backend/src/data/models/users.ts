import { pool } from "../../util/database";
import { RowDataPacket } from "mysql2";
import { UserEntity } from "../Interface/usersInterface";
import mysql from "mysql2/promise";

export class UserModel {
	/**
	 * Creates a new user in the database
	 * @param email - User's email address
	 * @param password - Hashed password
	 * @param firstname - User's first name
	 * @param infix - User's middle name/infix (optional)
	 * @param lastname - User's last name
	 * @returns Promise resolving to UserEntity or null if creation fails
	 */
	async createUser(
		email: string,
		password: string,
		firstname: string,
		infix: string,
		lastname: string
	): Promise<UserEntity | null> {
		let returnValue: UserEntity | null = null;

		try {
			// Start a transaction to ensure all related records are created atomically
			const connection = await pool.promise().getConnection();
			await connection.beginTransaction();

			try {
				// 1. Ensure the 'user' role exists (create if it doesn't)
				await connection.execute(
					"INSERT IGNORE INTO Roles (title, description) VALUES ('user', 'Standard user role')"
				);

				// 2. Create ShoppingCart entry (required by foreign key)
				// Use INSERT IGNORE to avoid errors if it already exists
				await connection.execute("INSERT IGNORE INTO ShoppingCarts (userEmail) VALUES (:email)", {
					email,
				});

				// 3. Create Wishlist entry (required by foreign key)
				// Use INSERT IGNORE to avoid errors if it already exists
				await connection.execute("INSERT IGNORE INTO Wishlists (UserEmail) VALUES (:email)", { email });

				// 4. Create the User
				await connection.execute(
					"INSERT INTO USERS (email, password, firstname, infix, lastname, createdAt, roleTitle) VALUES (:email, :password, :firstname, :infix, :lastname, NOW(), 'user')",
					{ email, password, firstname, infix, lastname }
				);

				// Commit the transaction
				await connection.commit();

				// Fetch the created user to return complete data
				const [userResults] = await pool
					.promise()
					.execute<RowDataPacket[]>("SELECT * FROM USERS WHERE email = :email", { email });

				if (userResults && userResults.length > 0) {
					const userData = userResults[0];
					returnValue = {
						email: userData.email,
						password: userData.password,
						firstname: userData.firstname,
						lastname: userData.lastname,
						infix: userData.infix,
						createdAt: userData.createdAt,
						roleTitle: userData.roleTitle,
					};
				}
			} catch (error) {
				// Rollback the transaction on error
				await connection.rollback();
				throw error;
			} finally {
				// Release the connection
				connection.release();
			}
		} catch (error) {
			console.error("Error creating user:", error);
		}

		return returnValue;
	}

	async readUser(email: string) {
		const db: mysql.Connection = await mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "",
			database: "3webshop",
		});

		// Query to select all information about the user with the filled in email
		const query = "SELECT * FROM Users WHERE email = ?";
		// Variable rows to wait till the query is finished
		const [rows] = await db.execute(query, [email]);

		console.log("User fetched from DB ", rows);
		// return user and null if no user is available
		return (rows as any[])[0] || null;
	}
}
