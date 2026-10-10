import { Router } from "express";
import { OrderController } from "../controllers/OrderController";
import { OrderService } from "../business/service/OrderService";
import { MysqlOrderInterface } from "../data/Interface/mysqlOrderInterface";

const router = Router();

const orderInterface = new MysqlOrderInterface();
const orderService = new OrderService(orderInterface);
const orderController = new OrderController(orderService);

router.get("/", (req, res) => void orderController.list(req, res));
router.get("/:userEmail/:createdAt", (req, res) => void orderController.getOne(req, res));
router.patch("/:userEmail/:createdAt/status", (req, res) => void orderController.updateStatus(req, res));

export default router;
