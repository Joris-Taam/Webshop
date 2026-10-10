import { Request, Response, NextFunction } from "express";
import { PromotionService } from "../business/service/promotionService";

export class PromotionController {
	constructor(private promotionService: PromotionService) {}

	public async getAllPromotions(req: Request, res: Response, next: NextFunction) {
		try {
			const promotions = await this.promotionService.getAllPromotions();
			return res.status(200).json(promotions);
		} catch (error: any) {
			next(error);
		}
	}

	public async getPromotion(req: Request, res: Response, next: NextFunction) {
		try {
			const { title } = req.params;
			const promotion = await this.promotionService.getPromotion(title);
			if (!promotion) {
				return res.status(404).json({ error: "Promotion not found" });
			}
			return res.status(200).json(promotion);
		} catch (error: any) {
			next(error);
		}
	}

	public async createPromotion(req: Request, res: Response, next: NextFunction) {
		try {
			const { title, description, percentage } = req.body;

			// Check if promotion with same title already exists
			const existingPromotion = await this.promotionService.getPromotion(title);
			if (existingPromotion) {
				return res.status(409).json({ error: "Promotion with this title already exists" });
			}

			const promotion = await this.promotionService.createPromotion(title, description, percentage);

			if (!promotion) {
				return res.status(500).json({ error: "Failed to create promotion" });
			}

			return res.status(201).json(promotion);
		} catch (error: any) {
			// Handle database duplicate key errors (in case check above didn't catch it)
			if (error.message && error.message.includes("Duplicate entry")) {
				return res.status(409).json({ error: "Promotion with this title already exists" });
			}
			next(error);
		}
	}

	public async updatePromotion(req: Request, res: Response, next: NextFunction) {
		try {
			const { title, description, percentage } = req.body;

			// Check if promotion exists before updating
			const existingPromotion = await this.promotionService.getPromotion(title);
			if (!existingPromotion) {
				return res.status(404).json({ error: "Promotion not found" });
			}

			const promotion = await this.promotionService.updatePromotion(title, description, percentage);

			if (!promotion) {
				return res.status(500).json({ error: "Failed to update promotion" });
			}

			return res.status(200).json(promotion);
		} catch (error: any) {
			next(error);
		}
	}

	public async deletePromotion(req: Request, res: Response, next: NextFunction) {
		try {
			const { title } = req.params;

			// Check if promotion exists before deleting
			const existingPromotion = await this.promotionService.getPromotion(title);
			if (!existingPromotion) {
				return res.status(404).json({ error: "Promotion not found" });
			}

			await this.promotionService.deletePromotion(title);
			return res.status(200).json({ message: "Promotion deleted successfully" });
		} catch (error: any) {
			next(error);
		}
	}
}
