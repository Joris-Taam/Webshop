import { Request, Response, NextFunction } from "express";
import { UserService } from "../business/service/userService";
import * as bcrypt from "bcryptjs";
import validator from "validator";
import { User } from "../business/model/user";

export class UserController {
	constructor(private userService: UserService) {}

	public async handleLogin(req: Request, res: Response, next: NextFunction) {
		try {
			// Collecting his filled in Email and password
			const { email, password } = req.body;

			// Finding the right user from our database based on our Primary Key
			const user: User | null = await this.userService.getUserByEmail(email);

			// Check if the user exists. If not, return error 400 with message
			if (!user) {
				return res.status(400).json({ error: "Gebruiker niet gevonden" });
			}

			console.log(password, user.password);

			// Validating the code with the hashed code
			const match = await bcrypt.compare(password, user.password);

			// If users password filled doesn't matches with the hashed password then error message
			if (!match) {
				return res.status(400).json({ error: "Ongeldig wachtwoord" });
			}

			// Else user exist return the mentioned information to front-end
			return res.status(200).json({
				message: "Login Succesvol",
				user: {
					email: user.email,
					firstname: user.firstname,
					infix: user.infix,
					lastname: user.lastname,
					role: user.roleTitle,
				},
			});
		} catch (error: any) {
			console.error(error);
			next(error);
		}
	}

	/**
	 * Create a new user (signup endpoint).
	 * Expected body: { email, password, firstname, infix, lastname }
	 */
	public async createUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password, firstname, infix, lastname } = req.body;

			// Validation
			if (!email || !password || !firstname || !lastname) {
				return res.status(400).json({
					error: "Missing required fields: email, password, firstname, and lastname are required",
				});
			}

			if (!validator.isEmail(email)) {
				return res.status(400).json({ error: "Invalid email format" });
			}

			if (password.length < 6) {
				return res.status(400).json({ error: "Password must be at least 6 characters long" });
			}

			// Hash the password before storing
			const hashedPassword = await bcrypt.hash(password, 10);

			// Create user through service layer
			const newUser = await this.userService.createUser(
				email,
				hashedPassword,
				firstname,
				infix || "",
				lastname
			);

			if (!newUser) {
				return res.status(500).json({ error: "Failed to create user" });
			}

			// Return user data (without password)
			res.status(201).json({
				message: "User created successfully",
				user: {
					email: newUser.email,
					firstname: newUser.firstname,
					lastname: newUser.lastname,
					infix: newUser.infix,
					roleTitle: newUser.roleTitle,
					createdAt: newUser.createdAt,
				},
			});
		} catch (error) {
			console.error("Error in createUser:", error);
			next(error);
		}
	}
}
