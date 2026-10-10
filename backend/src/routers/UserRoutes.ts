
import { Router } from "express";
import { Container } from "../../util/container";

const router = Router();

// Route for user signup (POST /api/user/signup)
// Uses Container to get singleton instances - same instance reused for all requests
router.post("/signup", (req, res, next) => {
	const userController = Container.getUserController();
	userController.createUser(req, res, next);
});

router.post("/login", (req, res, next) => {
	const userController = Container.getUserController();
	userController.handleLogin(req, res);
});


export default router;