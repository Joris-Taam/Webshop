import { Router } from "express";
import { CartController } from "../controllers/CartController";
import { CartService } from "../business/service/CartService";
import { MysqlCartInterface } from "../data/Interface/mysqlCartInterface";

const router = Router();

const cartInterface = new MysqlCartInterface();
const cartService = new CartService(cartInterface);
const cartController = new CartController(cartService);

router.get("/:userEmail", (req, res) => void cartController.getCart(req, res));
router.post("/", (req, res) => void cartController.addProduct(req, res));
router.delete("/", (req, res) => void cartController.removeProduct(req, res));

export default router;