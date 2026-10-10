import { ResultSetHeader, RowDataPacket } from "mysql2";
import { businessmodel } from "../../business/model/cart";
import { pool } from "../../util/database";
import { CartCrudInterface } from "./CartCrudInterface";

export class MysqlCartInterface implements CartCrudInterface {
	public async createCart(userEmail: string): Promise<void> {
		await pool
			.promise()
			.execute(
				"INSERT INTO Shoppingcarts (userEmail) VALUES (?) ON DUPLICATE KEY UPDATE userEmail = VALUES(userEmail)",
				[userEmail]
			);
	}

	public async createCartProduct(product: businessmodel.CartProduct): Promise<boolean> {
		try {
			await pool
				.promise()
				.execute(
					"INSERT INTO ShoppingcartProducts (productName, productCategory, shoppingCartUserEmail) VALUES (?, ?, ?)",
					[product.productName, product.productCategory, product.shoppingCartUserEmail]
				);
			return true;
		} catch (error) {
			const mysqlError = error as { code?: string };
			if (mysqlError.code === "ER_DUP_ENTRY") {
				return false;
			}
			throw error;
		}
	}

	public async deleteCartProduct(
		productName: string,
		productCategory: string,
		userEmail: string
	): Promise<boolean> {
		const [result] = await pool
			.promise()
			.execute<ResultSetHeader>(
				"DELETE FROM ShoppingcartProducts WHERE productName = ? AND productCategory = ? AND shoppingCartUserEmail = ?",
				[productName, productCategory, userEmail]
			);

		return result.affectedRows > 0;
	}

	public async readCart(userEmail: string): Promise<businessmodel.CartProduct[]> {
		const [rows] = await pool.promise().execute<RowDataPacket[]>(
			`SELECT scp.productName,
                    scp.productCategory,
                    scp.shoppingCartUserEmail,
                    scp.createdAt,
                    p.price,
                    p.imgPath
             FROM ShoppingcartProducts scp
             JOIN Products p
               ON p.name = scp.productName AND p.category = scp.productCategory
            WHERE scp.shoppingCartUserEmail = ?
            ORDER BY scp.createdAt DESC`,
			[userEmail]
		);

		return rows.map(
			(row) =>
				new businessmodel.CartProduct(
					String(row.productName),
					String(row.productCategory),
					String(row.shoppingCartUserEmail),
					row.price ? Number(row.price) : undefined,
                    row.imgPath ? String(row.imgPath) : undefined,
					row.createdAt ? new Date(row.createdAt) : undefined
				)
		);
	}
}