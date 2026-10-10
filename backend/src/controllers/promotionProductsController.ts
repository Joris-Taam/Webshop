import { Request, Response, NextFunction } from "express";
import { PromotionProductsService } from "../business/service/promotionProductsService";

export class PromotionProductsController {
	constructor(private promotionProductsService: PromotionProductsService) {}
	public async getAllPromotionProducts(req: Request, res: Response, next: NextFunction) {
		try {
			const promotionProducts = await this.promotionProductsService.getAllPromotionProducts();
			return res.status(200).json(promotionProducts);
		} catch (error: any) {
			next(error);
		}
	}
	public async getPromotionProduct(req: Request, res: Response, next: NextFunction) {
		try {
			const { productName, productCategory, promotionTitle } = req.params;
			const promotionProduct = await this.promotionProductsService.getPromotionProduct(
				productName,
				productCategory,
				promotionTitle
			);
			return res.status(200).json(promotionProduct);
		} catch (error: any) {
			next(error);
		}
	}
	public async createPromotionProduct(req: Request, res: Response, next: NextFunction) {
		try {
			// Check if request body exists
			if (!req.body || Object.keys(req.body).length === 0) {
				return res.status(400).json({
					error: "Request body is missing or empty",
				});
			}

			const { productName, productCategory, promotionTitle, startingDate, endingDate } = req.body;

			// Validation: Check required fields
			if (!productName || !productCategory || !promotionTitle || !startingDate || !endingDate) {
				return res.status(400).json({
					error:
						"Missing required fields: productName, productCategory, promotionTitle, startingDate, and endingDate are required",
				});
			}

			const promotionProduct = await this.promotionProductsService.createPromotionProduct(
				productName,
				productCategory,
				promotionTitle,
				startingDate,
				endingDate
			);
			return res.status(200).json(promotionProduct);
		} catch (error: any) {
			next(error);
		}
	}
	public async updatePromotionProduct(req: Request, res: Response, next: NextFunction) {
		try {
			// Check if request body exists
			if (!req.body || Object.keys(req.body).length === 0) {
				return res.status(400).json({
					error: "Request body is missing or empty",
				});
			}

			const { productName, productCategory, promotionTitle, startingDate, endingDate } = req.body;

			// Validation: Check required fields
			if (!productName || !productCategory || !promotionTitle || !startingDate || !endingDate) {
				return res.status(400).json({
					error:
						"Missing required fields: productName, productCategory, promotionTitle, startingDate, and endingDate are required",
				});
			}

			const promotionProduct = await this.promotionProductsService.updatePromotionProduct(
				productName,
				productCategory,
				promotionTitle,
				startingDate,
				endingDate
			);
			return res.status(200).json(promotionProduct);
		} catch (error: any) {
			next(error);
		}
	}
	public async deletePromotionProduct(req: Request, res: Response, next: NextFunction) {
		try {
			const { productName, productCategory, promotionTitle } = req.params;
			await this.promotionProductsService.deletePromotionProduct(
				productName,
				productCategory,
				promotionTitle
			);
			return res.status(200).json({ message: "Promotion product deleted successfully" });
		} catch (error: any) {
			next(error);
		}
	}
}
