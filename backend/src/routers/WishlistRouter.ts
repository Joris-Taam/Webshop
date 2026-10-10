import { Router } from "express";
import { WishlistController } from "../controllers/wishlistcontroller";
import { WishlistService } from "../business/service/WishlistService";
import { MysqlWishlistInterface } from "../data/Interface/mysqlWishlistInterface";

const router = Router();

const wishlistInterface = new MysqlWishlistInterface();
const wishlistService = new WishlistService(wishlistInterface);
const wishlistController = new WishlistController(wishlistService);

router.get("/:userEmail", (req, res) => void wishlistController.getWishlist(req, res));
router.post("/", (req, res) => void wishlistController.addProduct(req, res));
router.delete("/", (req, res) => void wishlistController.removeProduct(req, res));

export default router;
