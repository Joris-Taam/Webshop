import { Router } from "express";
import { Container } from "../util/container";

const router = Router();

router.post("/signup", (req, res, next) => {
	const userController = Container.getUserController();
	userController.createUser(req, res, next);
});

router.post("/login", (req, res, next) => {
	const userController = Container.getUserController();
	userController.handleLogin(req, res, next);
});

export default router;
