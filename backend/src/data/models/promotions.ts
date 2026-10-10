import { RowDataPacket } from "mysql2";
import { pool } from "../../util/database";
import { PromotionEntity } from "../Interface/promotionsInterface";

export class PromotionModel {
	/**
	 * Creates a new promotion in the database
	 * @param title - The title of the promotion
	 * @param description - The description of the promotion
	 * @param percentage - The percentage of the promotion
	 * @returns Promise resolving to PromotionEntity or null if creation fails
	 */
	async createPromotion(
		title: string,
		description: string,
		percentage: number
	): Promise<PromotionEntity | null> {
		let returnValue: PromotionEntity | null = null;

		try {
			// Start a transaction to ensure all related records are created atomically
			const connection = await pool.promise().getConnection();

			// Create the promotion
			await connection.execute(
				"INSERT INTO Promotions (title, description, percentage) VALUES (:title, :description, :percentage)",
				{ title, description, percentage }
			);

			returnValue = await this.readPromotion(title);
		} catch (error) {
			throw new Error("Error creating promotion: " + error);
		}

		return returnValue;
	}

	/**
	 *
	 * @param title - The title of the promotion
	 * @returns Promise resolving to PromotionEntity or null if reading fails
	 */
	async readPromotion(title: string): Promise<PromotionEntity | null> {
		let returnValue: PromotionEntity | null = null;

		try {
			const connection = await pool.promise().getConnection();

			// Read the promotion from the database
			await connection.execute("SELECT * FROM Promotions WHERE title = :title", { title });

			// Fetch the created promotion to return complete data
			const [promotionResults] = await pool
				.promise()
				.execute<RowDataPacket[]>("SELECT * FROM Promotions WHERE title = :title", { title });

			if (promotionResults && promotionResults.length > 0) {
				const promotionData = promotionResults[0];
				returnValue = {
					title: promotionData.title,
					description: promotionData.description,
					percentage: promotionData.percentage,
				};
			}
		} catch (error) {
			throw new Error("Error reading promotion: " + error);
		}

		return returnValue;
	}

	async readAllPromotions(): Promise<PromotionEntity[]> {
		let returnValue: PromotionEntity[] = [];

		try {
			const [promotionResults] = await pool
				.promise()
				.execute<RowDataPacket[]>("SELECT * FROM Promotions");

			if (promotionResults && promotionResults.length > 0) {
				returnValue = promotionResults.map((promotionData) => ({
					title: promotionData.title,
					description: promotionData.description,
					percentage: promotionData.percentage,
				}));
			}
		} catch (error) {
			throw new Error("Error reading all promotions: " + error);
		}

		return returnValue;
	}

	/**
	 *
	 * @param title
	 * @param description
	 * @param percentage
	 * @returns Promise resolving to PromotionEntity or null if updating fails
	 */
	async updatePromotion(
		title: string,
		description: string,
		percentage: number
	): Promise<PromotionEntity | null> {
		let returnValue: PromotionEntity | null = null;

		try {
			const connection = await pool.promise().getConnection();
			await connection.execute(
				"UPDATE Promotions SET description = :description, percentage = :percentage WHERE title = :title",
				{ description, percentage, title }
			);

			returnValue = await this.readPromotion(title);
		} catch (error) {
			throw new Error("Error updating promotion: " + error);
		}

		return returnValue;
	}

	/**
	 *
	 * @param title
	 * @returns Promise resolving to void if deleting fails
	 */
	async deletePromotion(title: string): Promise<void> {
		try {
			const connection = await pool.promise().getConnection();

			await connection.execute("DELETE FROM Promotions WHERE title = :title", { title });
		} catch (error) {
			throw new Error("Error deleting promotion: " + error);
		}
	}
}
