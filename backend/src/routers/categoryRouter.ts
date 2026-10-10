import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";
import { CategoryService } from "../business/service/categoriesService";
import { MysqlCategoryInterface } from "../data/Interface/mysqlCategoriesInterface";

import multer from "multer";
import fs from "fs";
import path from "path";

const router = Router();

const uploadCategoryPath = path.join(process.cwd(), "uploads", "categories");

if (!fs.existsSync(uploadCategoryPath)) {
	fs.mkdirSync(uploadCategoryPath, { recursive: true });
	console.log(`[UPLOADS] Created directory: ${uploadCategoryPath}`);
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadCategoryPath);
	},
	filename: (req, file, cb) => {
		const uniqueName = Date.now() + "-" + file.originalname;
		cb(null, uniqueName);
	},
});

const upload = multer({ storage });

const mysqlCategoryData = new MysqlCategoryInterface();
const categoryService = new CategoryService(mysqlCategoryData);
const categoryController = new CategoryController(categoryService);


// GET all
router.get("/", (req, res) => categoryController.getCategories(req, res));

// GET one by name
router.get("/:name", (req, res) => categoryController.getCategory(req, res));

// CREATE category
router.post(
	"/",
	upload.single("img"),   
	(req, res) => categoryController.createCategory(req, res)
);

// UPDATE category
router.put(
	"/:name",
	upload.single("img"),   
	(req, res) => categoryController.updateCategory(req, res)
);

// DELETE category
router.delete("/:name", (req, res) => categoryController.deleteCategory(req, res));

export default router;
