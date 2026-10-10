import { Request, Response } from "express";
import { ProductService } from "../business/service/ProductsService";
import { businessmodel } from "../business/model/Product";

export class ProductController {
    constructor(private productService: ProductService) {}

    public async getProducts(req: Request, res: Response) {
        try {
            const products = await this.productService.getProducts();
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json({ error: "Failed to fetch products" });
        }
    }

    public async getProduct(req: Request, res: Response) {
        try {
            const { name, category } = req.params;
            const product = await this.productService.getProduct(name, category);
            if (!product) return res.status(404).json({ error: "Product not found" });
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json({ error: "Failed to fetch product" });
        }
    }

    public async createProduct(req: Request, res: Response) {
        try {
            const body = req.body;

            let imgPath: string | undefined;
            if (req.files && "img" in req.files) {
                const file = (req.files as any).img[0];
                imgPath = "/uploads/img/" + file.filename;
            }

            let filePath: string | undefined;
            let fileExtension: string | undefined;

            if (req.files && "file" in req.files) {
                const file = (req.files as any).file[0];
                filePath = "/uploads/files/" + file.filename;
                fileExtension = file.originalname.split(".").pop();
            }

            const product = new businessmodel.Product(
                body.name?.trim(),
                Number(body.price),
                body.category?.trim(),
                body.description?.trim(),
                body.sizeWidth ? Number(body.sizeWidth) : undefined,
                body.sizeHeight ? Number(body.sizeHeight) : undefined,
                body.sizeLength ? Number(body.sizeLength) : undefined,
                filePath,
                fileExtension,
                imgPath
            );

            const newId = await this.productService.createProduct(product);
            res.status(201).json({ id: newId, message: "Product created" });
        } catch (err) {
            res.status(500).json({ error: "Failed to create product" });
        }
    }

    public async updateProduct(req: Request, res: Response) {
        try {
            const { name, category } = req.params;
            const body = req.body;

            const existingProduct = await this.productService.getProduct(name, category);
            if (!existingProduct) return res.status(404).json({ error: "Product not found" });

            let imgPath = existingProduct.imgPath;
            let filePath = existingProduct.filePath;
            let fileExtension = existingProduct.fileExtension;

            if (req.files && "img" in req.files) {
                const file = (req.files as any).img[0];
                imgPath = "/uploads/img/" + file.filename;
            }

            if (req.files && "file" in req.files) {
                const file = (req.files as any).file[0];
                filePath = "/uploads/files/" + file.filename;
                fileExtension = file.originalname.split(".").pop();
            }

            const product = new businessmodel.Product(
                body.name?.trim(),
                Number(body.price),
                body.category?.trim(),
                body.description?.trim(),
                body.sizeWidth ? Number(body.sizeWidth) : undefined,
                body.sizeHeight ? Number(body.sizeHeight) : undefined,
                body.sizeLength ? Number(body.sizeLength) : undefined,
                filePath,
                fileExtension,
                imgPath
            );

            const updated = await this.productService.updateProduct(name, category, product);
            if (!updated) return res.status(404).json({ error: "Product not found" });

            res.status(200).json({ message: "Product updated" });
        } catch (err) {
            res.status(500).json({ error: "Failed to update product" });
        }
    }

    public async deleteProduct(req: Request, res: Response) {
        try {
            const { name, category } = req.params;
            const deleted = await this.productService.deleteProduct(name, category);
            if (!deleted) return res.status(404).json({ error: "Product not found" });
            res.status(200).json({ message: "Product deleted" });
        } catch (err) {
            res.status(500).json({ error: "Failed to delete product" });
        }
    }
}
