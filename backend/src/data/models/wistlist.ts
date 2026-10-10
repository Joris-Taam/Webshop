// Legacy wishlist data access used by older parts of the project
import { pool } from "../../util/database";
import { RowDataPacket, OkPacket } from "mysql2";
import { businessmodel } from "../../business/model/Wishlist";

export namespace mysqlData {
	export class Wishlist {
		public async getWishlist(): Promise<businessmodel.wishlist[]> {
			try {
				const [rows] = await pool.promise().execute<RowDataPacket[]>("SELECT UserEmail FROM Wishlists");

				return rows.map((row: RowDataPacket) => new businessmodel.wishlist(String(row.UserEmail)));
			} catch (err) {
				console.error("Wishlist query failed", err);
				return [];
			}
		}

		public async getWishlistByUserEmail(userEmail: string): Promise<businessmodel.wishlist[]> {
			try {
				const [rows] = await pool
					.promise()
					.execute<RowDataPacket[]>("SELECT UserEmail FROM Wishlists WHERE UserEmail = ?", [userEmail]);

				return rows.map((row: RowDataPacket) => new businessmodel.wishlist(String(row.UserEmail)));
			} catch (err) {
				console.error(`Wishlist user query failed for ${userEmail}`, err);
				return [];
			}
		}

		public async createWishlistItem(item: businessmodel.wishlist): Promise<string> {
			const [result] = await pool
				.promise()
				.execute<OkPacket>("INSERT INTO Wishlists (UserEmail) VALUES (?)", [item.UserEmail]);

			return result.insertId?.toString() ?? "";
		}
	}
}
