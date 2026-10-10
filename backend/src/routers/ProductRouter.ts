import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { ProductService } from "../business/service/ProductsService";
import { MysqlProductInterface } from "../data/Interface/mysqlProductInterface";

import multer from "multer";
import fs from "fs";
import path from "path";

const router = Router();

// Auto-create uploads folders if missing
const uploadImgPath = path.join(process.cwd(), "uploads", "img");
const uploadFilePath = path.join(process.cwd(), "uploads", "files");

[uploadImgPath, uploadFilePath].forEach((dir) => {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
		console.log(`'${dir}' folder created automatically.`);
	}
});

// Multer storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		if (file.fieldname === "img") {
			cb(null, uploadImgPath);
		} else if (file.fieldname === "file") {
			cb(null, uploadFilePath);
		} else {
			cb(null, uploadFilePath);
		}
	},
	filename: (req, file, cb) => {
		const uniqueName = Date.now() + "-" + file.originalname;
		cb(null, uniqueName);
	},
});

const upload = multer({ storage });

const mysqlProductData = new MysqlProductInterface();
const productService = new ProductService(mysqlProductData);
const productController = new ProductController(productService);

// GET all products
router.get("/", (req, res) => productController.getProducts(req, res));

// GET single product
router.get("/:name/:category", (req, res) => productController.getProduct(req, res));

// POST create product
router.post(
	"/",
	upload.fields([
		{ name: "file", maxCount: 1 },
		{ name: "img", maxCount: 1 },
	]),
	(req, res) => productController.createProduct(req, res)
);

// PUT update product
router.put(
	"/:name/:category",
	upload.fields([
		{ name: "file", maxCount: 1 },
		{ name: "img", maxCount: 1 },
	]),
	(req, res) => productController.updateProduct(req, res)
);

// DELETE product
router.delete("/:name/:category", (req, res) => productController.deleteProduct(req, res));




export default router;
