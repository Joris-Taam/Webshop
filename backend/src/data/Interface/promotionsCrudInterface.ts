import { Promotion } from "../../business/model/promotion";
import { PromotionModel } from "../models/promotions";

export interface PromotionsCrudInterface {
	readAllPromotions(): Promise<Promotion[]>;
	createPromotion(title: string, description: string, percentage: number): Promise<Promotion | null>;
	readPromotion(title: string): Promise<Promotion | null>;
	updatePromotion(title: string, description: string, percentage: number): Promise<Promotion | null>;
	deletePromotion(title: string): Promise<void>;
}

export class MysqlPromotionsCrudInterface implements PromotionsCrudInterface {
	private promotion!: PromotionModel;

	public constructor() {
		this.promotion = new PromotionModel();
	}

	public async createPromotion(
		title: string,
		description: string,
		percentage: number
	): Promise<Promotion | null> {
		try {
			const promotionEntity = await this.promotion.createPromotion(title, description, percentage);

			if (!promotionEntity) {
				return null;
			}

			return new Promotion(
				promotionEntity.title,
				promotionEntity.description,
				promotionEntity.percentage
			);
		} catch (error) {
			throw error;
		}
	}

	public async readAllPromotions(): Promise<Promotion[]> {
		try {
			const promotionEntities = await this.promotion.readAllPromotions();

			return promotionEntities.map(
				(entity) => new Promotion(entity.title, entity.description, entity.percentage)
			);
		} catch (error) {
			throw error;
		}
	}

	public async readPromotion(title: string): Promise<Promotion | null> {
		try {
			const promotionEntity = await this.promotion.readPromotion(title);

			if (!promotionEntity) {
				return null;
			}

			return new Promotion(
				promotionEntity.title,
				promotionEntity.description,
				promotionEntity.percentage
			);
		} catch (error) {
			throw error;
		}
	}

	public async updatePromotion(
		title: string,
		description: string,
		percentage: number
	): Promise<Promotion | null> {
		try {
			const promotionEntity = await this.promotion.updatePromotion(title, description, percentage);

			if (!promotionEntity) {
				return null;
			}

			return new Promotion(
				promotionEntity.title,
				promotionEntity.description,
				promotionEntity.percentage
			);
		} catch (error) {
			throw error;
		}
	}

	public async deletePromotion(title: string): Promise<void> {
		try {
			await this.promotion.deletePromotion(title);
		} catch (error) {
			throw error;
		}
	}
}
