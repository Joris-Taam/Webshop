import { pool } from "../../util/database";
import { RowDataPacket } from "mysql2";
import { PromotionProductEntity } from "../Interface/promotionProductsInterface";

export class PromotionProductModel {
	/**
	 * Reads all promotion products from the database
	 * @returns Promise resolving to PromotionProductEntity[]
	 */
	public async readAllPromotionProducts(): Promise<PromotionProductEntity[]> {
		let returnValue: PromotionProductEntity[] = [];

		try {
			const [promotionProductResults] = await pool
				.promise()
				.execute<RowDataPacket[]>(
					"SELECT PromotionProducts.*, Promotions.percentage FROM PromotionProducts JOIN Promotions ON PromotionProducts.promotionTitle = Promotions.title"
				);

			if (promotionProductResults && promotionProductResults.length > 0) {
				returnValue = promotionProductResults.map((promotionProductData) => ({
					productName: promotionProductData.productName,
					productCategory: promotionProductData.productCategory,
					promotionTitle: promotionProductData.promotionTitle,
					startingDate: promotionProductData.startingDate,
					endingDate: promotionProductData.endingDate,
					percentage: promotionProductData.percentage,
				}));
			}
		} catch (error) {
			throw new Error("Error reading all promotion products: " + error);
		}

		return returnValue;
	}

	/**
	 * Reads a promotion product from the database
	 * @param productName - The name of the product
	 * @param productCategory - The category of the product
	 * @param promotionTitle - The title of the promotion
	 * @returns Promise resolving to PromotionProductEntity or null if reading fails
	 */
	public async readPromotionProduct(
		productName: string,
		productCategory: string,
		promotionTitle: string
	): Promise<PromotionProductEntity | null> {
		let returnValue: PromotionProductEntity | null = null;

		try {
			const [promotionProductResults] = await pool
				.promise()
				.execute<RowDataPacket[]>(
					"SELECT PromotionProducts.*, Promotions.percentage FROM PromotionProducts JOIN Promotions ON PromotionProducts.promotionTitle = Promotions.title WHERE PromotionProducts.productName = :productName AND PromotionProducts.productCategory = :productCategory AND PromotionProducts.promotionTitle = :promotionTitle",
					{ productName, productCategory, promotionTitle }
				);

			if (promotionProductResults && promotionProductResults.length > 0) {
				returnValue = {
					productName: promotionProductResults[0].productName,
					productCategory: promotionProductResults[0].productCategory,
					promotionTitle: promotionProductResults[0].promotionTitle,
					startingDate: promotionProductResults[0].startingDate,
					endingDate: promotionProductResults[0].endingDate,
					percentage: promotionProductResults[0].percentage,
				};
			}
		} catch (error) {
			throw new Error("Error reading promotion product: " + error);
		}

		return returnValue;
	}

	/**
	 * Creates a new promotion product in the database
	 * @param promotionProduct - PromotionProductEntity to create
	 * @returns Promise resolving to PromotionProductEntity or null if creation fails
	 */
	public async createPromotionProduct(
		productName: string,
		productCategory: string,
		promotionTitle: string,
		startingDate: Date,
		endingDate: Date
	): Promise<PromotionProductEntity | null> {
		let returnValue: PromotionProductEntity | null = null;

		try {
			await pool
				.promise()
				.execute<RowDataPacket[]>(
					"INSERT INTO PromotionProducts (productName, productCategory, promotionTitle, startingDate, endingDate) VALUES (:productName, :productCategory, :promotionTitle, :startingDate, :endingDate)",
					{
						productName,
						productCategory,
						promotionTitle,
						startingDate,
						endingDate,
					}
				);
			returnValue = await this.readPromotionProduct(productName, productCategory, promotionTitle);
		} catch (error) {
			throw new Error("Error creating promotion product: " + error);
		}

		return returnValue;
	}

	/**
	 * Updates a promotion product in the database
	 * @param productName - The name of the product
	 * @param productCategory - The category of the product
	 * @param promotionTitle - The title of the promotion
	 * @param startingDate - The starting date of the promotion
	 * @param endingDate - The ending date of the promotion
	 * @returns Promise resolving to PromotionProductEntity or null if updating fails
	 */
	public async updatePromotionProduct(
		productName: string,
		productCategory: string,
		promotionTitle: string,
		startingDate: Date,
		endingDate: Date
	): Promise<PromotionProductEntity | null> {
		let returnValue: PromotionProductEntity | null = null;

		try {
			await pool
				.promise()
				.execute<RowDataPacket[]>(
					"UPDATE PromotionProducts SET startingDate = :startingDate, endingDate = :endingDate WHERE productName = :productName AND productCategory = :productCategory AND promotionTitle = :promotionTitle",
					{ productName, productCategory, promotionTitle, startingDate, endingDate }
				);
			returnValue = await this.readPromotionProduct(productName, productCategory, promotionTitle);
		} catch (error) {
			throw new Error("Error updating promotion product: " + error);
		}

		return returnValue;
	}

	/**
	 * Deletes a promotion product from the database
	 * @param productName - The name of the product
	 * @param productCategory - The category of the product
	 * @param promotionTitle - The title of the promotion
	 * @returns Promise resolving to void if deleting fails
	 */
	public async deletePromotionProduct(
		productName: string,
		productCategory: string,
		promotionTitle: string
	): Promise<void> {
		try {
			await pool
				.promise()
				.execute<RowDataPacket[]>(
					"DELETE FROM PromotionProducts WHERE productName = :productName AND productCategory = :productCategory AND promotionTitle = :promotionTitle",
					{ productName, productCategory, promotionTitle }
				);
		} catch (error) {
			throw new Error("Error deleting promotion product: " + error);
		}
	}
}
