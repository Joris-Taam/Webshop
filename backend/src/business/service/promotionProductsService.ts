import { PromotionProductsCrudInterface } from "../../data/Interface/promotionProductsCrudInterface";
import { PromotionProduct } from "../model/promotionProduct";

export class PromotionProductsService {
	constructor(private promotionProductsCrudInterface: PromotionProductsCrudInterface) {}

	private validateDates(startingDate: Date, endingDate: Date): void {
		const start = new Date(startingDate);
		const end = new Date(endingDate);

		if (start > end) {
			throw new Error("Starting date cannot be later than ending date");
		}
	}

	public async getAllPromotionProducts(): Promise<PromotionProduct[]> {
		return await this.promotionProductsCrudInterface.readAllPromotionProducts();
	}

	public async getPromotionProduct(
		productName: string,
		productCategory: string,
		promotionTitle: string
	): Promise<PromotionProduct | null> {
		return await this.promotionProductsCrudInterface.readPromotionProduct(
			productName,
			productCategory,
			promotionTitle
		);
	}

	public async createPromotionProduct(
		productName: string,
		productCategory: string,
		promotionTitle: string,
		startingDate: Date,
		endingDate: Date
	): Promise<PromotionProduct | null> {
		this.validateDates(startingDate, endingDate);

		return await this.promotionProductsCrudInterface.createPromotionProduct(
			productName,
			productCategory,
			promotionTitle,
			startingDate,
			endingDate
		);
	}

	public async updatePromotionProduct(
		productName: string,
		productCategory: string,
		promotionTitle: string,
		startingDate: Date,
		endingDate: Date
	): Promise<PromotionProduct | null> {
		this.validateDates(startingDate, endingDate);

		return await this.promotionProductsCrudInterface.updatePromotionProduct(
			productName,
			productCategory,
			promotionTitle,
			startingDate,
			endingDate
		);
	}

	public async deletePromotionProduct(
		productName: string,
		productCategory: string,
		promotionTitle: string
	): Promise<void> {
		return await this.promotionProductsCrudInterface.deletePromotionProduct(
			productName,
			productCategory,
			promotionTitle
		);
	}
}
