import { Router } from "express";
import { Container } from "../util/container";

const router = Router();

router.get("/", (req, res, next) => {
	const promotionProductsController = Container.getPromotionProductsController();
	promotionProductsController.getAllPromotionProducts(req, res, next);
});

router.post("/", (req, res, next) => {
	const promotionProductsController = Container.getPromotionProductsController();
	promotionProductsController.createPromotionProduct(req, res, next);
});

router.get("/:productName/:productCategory/:promotionTitle", (req, res, next) => {
	const promotionProductsController = Container.getPromotionProductsController();
	promotionProductsController.getPromotionProduct(req, res, next);
});

router.put("/:productName/:productCategory/:promotionTitle", (req, res, next) => {
	const promotionProductsController = Container.getPromotionProductsController();
	promotionProductsController.updatePromotionProduct(req, res, next);
});

router.delete("/:productName/:productCategory/:promotionTitle", (req, res, next) => {
	const promotionProductsController = Container.getPromotionProductsController();
	promotionProductsController.deletePromotionProduct(req, res, next);
});
export default router;
