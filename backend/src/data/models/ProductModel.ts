import { pool } from "../../util/database";
import { RowDataPacket } from "mysql2";
import { businessmodel } from "../../business/model/Product";

export class ProductModel {
	productService: any;

	// GET single product
	public async getProduct(name: string, category: string): Promise<businessmodel.Product | null> {
		try {
			const [rows] = await pool
				.promise()
				.execute<RowDataPacket[]>("SELECT * FROM products WHERE name = ? AND category = ?", [
					name,
					category,
				]);

			if (!rows.length) return null;
			const row = rows[0];

			return new businessmodel.Product(
				row.name,
				row.price,
				row.category,
				row.description,
				row.sizeWidth,
				row.sizeHeight,
				row.sizeLength,
				row.filePath,
				row.fileExtension,
				row.imgPath
			);
		} catch (err) {
			console.error("getProduct error:", err);
			return null;
		}
	}

	// GET all products
	public async getProducts(): Promise<businessmodel.Product[]> {
		try {
			const [rows] = await pool.promise().execute<RowDataPacket[]>("SELECT * FROM products");

			return rows.map(
				(row) =>
					new businessmodel.Product(
						row.name,
						row.price,
						row.category,
						row.description,
						row.sizeWidth,
						row.sizeHeight,
						row.sizeLength,
						row.filePath,
						row.fileExtension,
						row.imgPath
					)
			);
		} catch (err) {
			console.error("getProducts error:", err);
			return [];
		}
	}

	// CREATE product
	public async createProduct(product: businessmodel.Product): Promise<string> {
		try {
			await pool.promise().execute(
				`INSERT INTO products 
                (name, price, category, description, sizeWidth, sizeHeight, sizeLength, filePath, fileExtension, imgPath)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
				[
					product.name,
					product.price,
					product.category,
					product.description ?? null,
					product.sizeWidth ?? null,
					product.sizeHeight ?? null,
					product.sizeLength ?? null,
					product.filePath ?? null,
					product.fileExtension ?? null,
					product.imgPath ?? null,
				]
			);

			return product.name;
		} catch (err) {
			console.error("createProduct error:", err);
			throw new Error("Failed to create product");
		}
	}
	public async updateProduct(
		oldName: string,
		oldCategory: string,
		model: businessmodel.Product
	): Promise<boolean> {
		try {
			const [result]: any = await pool.promise().execute(
				`UPDATE products SET
                name = ?,
                description = ?,
                price = ?,
                sizeWidth = ?,
                sizeHeight = ?,
                sizeLength = ?,
                filePath = ?,    
                fileExtension = ?,
                imgPath = ?            
            WHERE name = ? AND category = ?`,
				[
					model.name,
					model.description ?? null,
					model.price != null ? model.price : null,
					model.sizeWidth != null ? model.sizeWidth : null,
					model.sizeHeight != null ? model.sizeHeight : null,
					model.sizeLength != null ? model.sizeLength : null,
					model.filePath ?? null,
					model.fileExtension ?? null,
					model.imgPath ?? null,
					oldName,
					oldCategory,
				]
			);

			return result.affectedRows > 0;
		} catch (err) {
			console.error("updateProduct error:", err);
			return false;
		}
	}

	// DELETE product
	public async deleteProduct(name: string, category: string): Promise<boolean> {
		try {
			const [result]: any = await pool
				.promise()
				.execute("DELETE FROM products WHERE name = ? AND category = ?", [name, category]);

			return result.affectedRows > 0;
		} catch (err) {
			console.error("deleteProduct error:", err);
			return false;
		}
	}
}
