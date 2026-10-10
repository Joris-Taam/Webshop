import { PromotionsCrudInterface } from "../../data/Interface/promotionsCrudInterface";
import { Promotion } from "../model/promotion";

export class PromotionService {
	public constructor(private promotionCrudInterface: PromotionsCrudInterface) {}

	public async getPromotion(title: string): Promise<Promotion | null> {
		return await this.promotionCrudInterface.readPromotion(title);
	}

	public async getAllPromotions(): Promise<Promotion[]> {
		return await this.promotionCrudInterface.readAllPromotions();
	}

	public async createPromotion(
		title: string,
		description: string,
		percentage: number
	): Promise<Promotion | null> {
		return await this.promotionCrudInterface.createPromotion(title, description, percentage);
	}

	public async updatePromotion(
		title: string,
		description: string,
		percentage: number
	): Promise<Promotion | null> {
		return await this.promotionCrudInterface.updatePromotion(title, description, percentage);
	}

	public async deletePromotion(title: string): Promise<void> {
		return await this.promotionCrudInterface.deletePromotion(title);
	}
}
