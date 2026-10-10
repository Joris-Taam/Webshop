import { pool } from "../../util/database";
import { RowDataPacket } from "mysql2";
import { businessmodel } from "../../business/model/category";

export class CategoryModel {

    // GET single category
    public async getCategory(name: string): Promise<businessmodel.category | null> {
        try {
            const [rows] = await pool.promise().execute<RowDataPacket[]>(
                "SELECT * FROM categories WHERE name = ?",
                [name]
            );

            if (!rows.length) return null;
            const row = rows[0];

            return {
                name: row.name,
                description: row.description,
                imgPath: row.imgPath
            };

        } catch (err) {
            console.error("getCategory error:", err);
            return null;
        }
    }

    // GET all categories
    public async getCategories(): Promise<businessmodel.category[]> {
        try {
            const [rows] = await pool.promise().execute<RowDataPacket[]>(
                "SELECT * FROM categories"
            );

            return rows.map(row => ({
                name: row.name,
                description: row.description,
                imgPath: row.imgPath
            }));

        } catch (err) {
            console.error("getCategories error:", err);
            return [];
        }
    }

    // CREATE category
    public async createCategory(category: businessmodel.category): Promise<string> {
        try {
            await pool.promise().execute(
                `INSERT INTO categories (name, description,imgPath) VALUES (?, ?, ?)`,
                [
                    category.name,
                    category.description ?? null,
                    category.imgPath ?? null
                ]
            );

            return category.name;
        } catch (err) {
            console.error("createCategory error:", err);
            throw new Error("Failed to create category");
        }
    }

    // UPDATE category
    public async updateCategory(oldName: string, category: businessmodel.category): Promise<boolean> {
        try {
            const [result]: any = await pool.promise().execute(
                `UPDATE categories SET name = ?, description = ?, imgPath = ? WHERE name = ?`,
                [
                    category.name,
                    category.description ?? null,
                    category.imgPath ?? null,
                    oldName
                ]
            );

            return result.affectedRows > 0;
        } catch (err) {
            console.error("updateCategory error:", err);
            return false;
        }
    }

    // DELETE category
    public async deleteCategory(name: string): Promise<boolean> {
        try {
            const [result]: any = await pool.promise().execute(
                "DELETE FROM categories WHERE name = ?",
                [name]
            );

            return result.affectedRows > 0;
        } catch (err) {
            console.error("deleteCategory error:", err);
            return false;
        }
    }
}
