/**
 * Dependency Injection Container (Singleton Pattern)
 *
 * This container manages singleton instances of services, controllers, and data access objects.
 * It ensures only one instance of each is created and reused across all requests.
 *
 * Usage:
 *   const userService = Container.getUserService();
 */
import { UserController } from "../controllers/userController";
import { UserService } from "../business/service/userService";
import { MysqlUserCrudInterface } from "../data/Interface/usersCrudInterface";
import { PromotionController } from "../controllers/promotionController";
import {
	MysqlPromotionsCrudInterface,
	PromotionsCrudInterface,
} from "../data/Interface/promotionsCrudInterface";
import { PromotionService } from "../business/service/promotionService";
import {
	MysqlPromotionProductsCrudInterface,
	PromotionProductsCrudInterface,
} from "../data/Interface/promotionProductsCrudInterface";
import { PromotionProductsService } from "../business/service/promotionProductsService";
import { PromotionProductsController } from "../controllers/promotionProductsController";

export class Container {
	// User
	private static userCrudInterface: MysqlUserCrudInterface | null = null;
	private static userService: UserService | null = null;
	private static userController: UserController | null = null;

	// Promotion
	private static adminPromotionCrudInterface: PromotionsCrudInterface | null = null;
	private static promotionService: PromotionService | null = null;
	private static promotionController: PromotionController | null = null;

	// Promotion Products
	private static promotionProductsCrudInterface: PromotionProductsCrudInterface | null = null;
	private static promotionProductsService: PromotionProductsService | null = null;
	private static promotionProductsController: PromotionProductsController | null = null;

	// User
	public static getUserCrudInterface(): MysqlUserCrudInterface {
		if (!Container.userCrudInterface) {
			Container.userCrudInterface = new MysqlUserCrudInterface();
		}
		return Container.userCrudInterface;
	}

	public static getUserService(): UserService {
		if (!Container.userService) {
			Container.userService = new UserService(Container.getUserCrudInterface());
		}
		return Container.userService;
	}

	public static getUserController(): UserController {
		if (!Container.userController) {
			Container.userController = new UserController(Container.getUserService());
		}
		return Container.userController;
	}

	// Admin - Promotion
	public static getAdminPromotionCrudInterface(): PromotionsCrudInterface {
		if (!Container.adminPromotionCrudInterface) {
			Container.adminPromotionCrudInterface = new MysqlPromotionsCrudInterface();
		}
		return Container.adminPromotionCrudInterface;
	}

	public static getPromotionService(): PromotionService {
		if (!Container.promotionService) {
			Container.promotionService = new PromotionService(Container.getAdminPromotionCrudInterface());
		}
		return Container.promotionService;
	}

	public static getPromotionController(): PromotionController {
		if (!Container.promotionController) {
			Container.promotionController = new PromotionController(Container.getPromotionService());
		}
		return Container.promotionController;
	}

	public static getPromotionProductsCrudInterface(): PromotionProductsCrudInterface {
		if (!Container.promotionProductsCrudInterface) {
			Container.promotionProductsCrudInterface = new MysqlPromotionProductsCrudInterface();
		}
		return Container.promotionProductsCrudInterface;
	}

	public static getPromotionProductsService(): PromotionProductsService {
		if (!Container.promotionProductsService) {
			Container.promotionProductsService = new PromotionProductsService(
				Container.getPromotionProductsCrudInterface()
			);
		}
		return Container.promotionProductsService;
	}

	public static getPromotionProductsController(): PromotionProductsController {
		if (!Container.promotionProductsController) {
			Container.promotionProductsController = new PromotionProductsController(
				Container.getPromotionProductsService()
			);
		}
		return Container.promotionProductsController;
	}
}
