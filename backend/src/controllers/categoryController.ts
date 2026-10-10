import { Request, Response } from "express";
import { CategoryService } from "../business/service/categoriesService";
import { businessmodel } from "../business/model/category";

export class CategoryController {
    constructor(private service: CategoryService) {}

    public async getCategories(req: Request, res: Response) {
        try {
            const categories = await this.service.getAllCategories();
            res.status(200).json(categories);
        } catch (err) {
            res.status(500).json({ error: "Failed to fetch categories" });
        }
    }

    public async getCategory(req: Request, res: Response) {
        try {
            const { name } = req.params;
            const category = await this.service.getOneCategory(name);

            if (!category) return res.status(404).json({ error: "Category not found" });

            res.status(200).json(category);
        } catch (err) {
            res.status(500).json({ error: "Failed to fetch category" });
        }
    }

    public async createCategory(req: Request, res: Response) {
        try {
            const body = req.body;

            if (!body.name || !body.description) {
                return res.status(400).json({ error: "Name and description are required" });
            }

            let imgPath: string | undefined;
            if (req.file) {
                imgPath = "/uploads/categories/" + req.file.filename;
            }

            const category = new businessmodel.category(
                body.name,
                body.description,
                imgPath
            );

            const newId = await this.service.createCategory(category);
            res.status(201).json({ id: newId, message: "Category created" });
        } catch (err) {
            res.status(500).json({ error: "Failed to create category" });
        }
    }

    public async updateCategory(req: Request, res: Response) {
        try {
            const { name } = req.params;
            const body = req.body;

            const existingCategory = await this.service.getOneCategory(name);
            if (!existingCategory) return res.status(404).json({ error: "Category not found" });

            let imgPath = existingCategory.imgPath;

            if (req.file) {
                imgPath = "/uploads/categories/" + req.file.filename;
            }

            const updatedCategory = new businessmodel.category(
                body.name,
                body.description,
                imgPath
            );

            const updated = await this.service.updateCategory(name, updatedCategory);
            if (!updated) return res.status(404).json({ error: "Category not found" });

            res.status(200).json({ message: "Category updated" });
        } catch (err) {
            res.status(500).json({ error: "Failed to update category" });
        }
    }

    public async deleteCategory(req: Request, res: Response) {
        try {
            const { name } = req.params;
            const deleted = await this.service.deleteCategory(name);

            if (!deleted) return res.status(404).json({ error: "Category not found" });

            res.status(200).json({ message: "Category deleted" });
        } catch (err) {
            res.status(500).json({ error: "Failed to delete category" });
        }
    }
}
