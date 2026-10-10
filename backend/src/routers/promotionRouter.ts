import { Router } from "express";
import { Container } from "../util/container";

const router = Router();

router.get("/", (req, res, next) => {
	const promotionController = Container.getPromotionController();
	promotionController.getAllPromotions(req, res, next);
});

router.get("/:title", (req, res, next) => {
	const promotionController = Container.getPromotionController();
	promotionController.getPromotion(req, res, next);
});

router.post("/", (req, res, next) => {
	const promotionController = Container.getPromotionController();
	promotionController.createPromotion(req, res, next);
});

router.put("/:title", (req, res, next) => {
	const promotionController = Container.getPromotionController();
	promotionController.updatePromotion(req, res, next);
});

router.delete("/:title", (req, res, next) => {
	const promotionController = Container.getPromotionController();
	promotionController.deletePromotion(req, res, next);
});

export default router;
