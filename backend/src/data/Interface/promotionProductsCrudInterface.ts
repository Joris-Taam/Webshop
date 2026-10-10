import { PromotionProduct } from "../../business/model/promotionProduct";
import { PromotionProductModel } from "../models/promotionProducts";
import { PromotionProductEntity } from "./promotionProductsInterface";

export interface PromotionProductsCrudInterface {
	readAllPromotionProducts(): Promise<PromotionProduct[]>;
	createPromotionProduct(
		productName: string,
		productCategory: string,
		promotionTitle: string,
		startingDate: Date,
		endingDate: Date
	): Promise<PromotionProduct | null>;
	readPromotionProduct(
		productName: string,
		productCategory: string,
		promotionTitle: string
	): Promise<PromotionProduct | null>;
	updatePromotionProduct(
		productName: string,
		productCategory: string,
		promotionTitle: string,
		startingDate: Date,
		endingDate: Date
	): Promise<PromotionProduct | null>;
	deletePromotionProduct(
		productName: string,
		productCategory: string,
		promotionTitle: string
	): Promise<void>;
}

export class MysqlPromotionProductsCrudInterface implements PromotionProductsCrudInterface {
	private promotionProduct!: PromotionProductModel;

	public constructor() {
		this.promotionProduct = new PromotionProductModel();
	}

	public async readAllPromotionProducts(): Promise<PromotionProduct[]> {
		try {
			const promotionProductEntities = await this.promotionProduct.readAllPromotionProducts();

			return promotionProductEntities.map(
				(entity: PromotionProductEntity) =>
					new PromotionProduct(
						entity.productName,
						entity.productCategory,
						entity.promotionTitle,
						entity.startingDate,
						entity.endingDate,
						entity.percentage
					)
			);
		} catch (error) {
			throw error;
		}
	}

	public async createPromotionProduct(
		productName: string,
		productCategory: string,
		promotionTitle: string,
		startingDate: Date,
		endingDate: Date
	): Promise<PromotionProduct | null> {
		try {
			const promotionProductEntity = await this.promotionProduct.createPromotionProduct(
				productName,
				productCategory,
				promotionTitle,
				startingDate,
				endingDate
			);

			if (!promotionProductEntity) {
				return null;
			}

			return new PromotionProduct(
				promotionProductEntity.productName,
				promotionProductEntity.productCategory,
				promotionProductEntity.promotionTitle,
				promotionProductEntity.startingDate,
				promotionProductEntity.endingDate,
				promotionProductEntity.percentage
			);
		} catch (error) {
			throw error;
		}
	}

	public async readPromotionProduct(
		productName: string,
		productCategory: string,
		promotionTitle: string
	): Promise<PromotionProduct | null> {
		try {
			const promotionProductEntity = await this.promotionProduct.readPromotionProduct(
				productName,
				productCategory,
				promotionTitle
			);

			if (!promotionProductEntity) {
				return null;
			}

			return new PromotionProduct(
				promotionProductEntity.productName,
				promotionProductEntity.productCategory,
				promotionProductEntity.promotionTitle,
				promotionProductEntity.startingDate,
				promotionProductEntity.endingDate,
				promotionProductEntity.percentage
			);
		} catch (error) {
			throw error;
		}
	}

	public async updatePromotionProduct(
		productName: string,
		productCategory: string,
		promotionTitle: string,
		startingDate: Date,
		endingDate: Date
	): Promise<PromotionProduct | null> {
		try {
			const promotionProductEntity = await this.promotionProduct.updatePromotionProduct(
				productName,
				productCategory,
				promotionTitle,
				startingDate,
				endingDate
			);

			if (!promotionProductEntity) {
				return null;
			}

			return new PromotionProduct(
				promotionProductEntity.productName,
				promotionProductEntity.productCategory,
				promotionProductEntity.promotionTitle,
				promotionProductEntity.startingDate,
				promotionProductEntity.endingDate,
				promotionProductEntity.percentage
			);
		} catch (error) {
			throw error;
		}
	}

	public async deletePromotionProduct(
		productName: string,
		productCategory: string,
		promotionTitle: string
	): Promise<void> {
		await this.promotionProduct.deletePromotionProduct(productName, productCategory, promotionTitle);
	}
}
