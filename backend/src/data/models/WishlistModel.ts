import { ResultSetHeader, RowDataPacket } from "mysql2";
import { businessmodel } from "../../business/model/Wishlist";
import { pool } from "../../util/database";

export class WishlistModel {
	public async ensureWishlist(userEmail: string): Promise<void> {
		await pool
			.promise()
			.execute(
				"INSERT INTO Wishlists (UserEmail) VALUES (?) ON DUPLICATE KEY UPDATE UserEmail = VALUES(UserEmail)",
				[userEmail]
			);
	}

	public async addProduct(product: businessmodel.WishlistProduct): Promise<boolean> {
		try {
			await pool
				.promise()
				.execute(
					"INSERT INTO WishlistProducts (productName, productCategory, wishlistUserEmail) VALUES (?, ?, ?)",
					[product.productName, product.productCategory, product.wishlistUserEmail]
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

	public async removeProduct(
		productName: string,
		productCategory: string,
		userEmail: string
	): Promise<boolean> {
		const [result] = await pool
			.promise()
			.execute<ResultSetHeader>(
				"DELETE FROM WishlistProducts WHERE productName = ? AND productCategory = ? AND wishlistUserEmail = ?",
				[productName, productCategory, userEmail]
			);

		return result.affectedRows > 0;
	}

	public async getWishlist(userEmail: string): Promise<businessmodel.WishlistProduct[]> {
		const [rows] = await pool.promise().execute<RowDataPacket[]>(
			`SELECT wp.productName,
						wp.productCategory,
						wp.wishlistUserEmail,
						wp.createdAt,
						p.price
				 FROM WishlistProducts wp
				 JOIN Products p
				   ON p.name = wp.productName AND p.category = wp.productCategory
				WHERE wp.wishlistUserEmail = ?
				ORDER BY wp.createdAt DESC`,
			[userEmail]
		);

		return rows.map(
			(row) =>
				new businessmodel.WishlistProduct(
					String(row.productName),
					String(row.productCategory),
					String(row.wishlistUserEmail),
					row.price ? Number(row.price) : undefined,
					row.createdAt ? new Date(row.createdAt) : undefined
				)
		);
	}
}
