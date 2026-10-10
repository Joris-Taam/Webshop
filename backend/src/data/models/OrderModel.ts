import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Order, OrderItem } from "../../business/model/Order";
import { pool } from "../../util/database";

export class OrderModel {
	public async getOrders(filters?: { status?: string; from?: Date; to?: Date }): Promise<Order[]> {
		const params: Array<string | number | Date> = [];
		const where: string[] = [];

		if (filters?.status) {
			where.push("o.status = ?");
			params.push(filters.status);
		}

		if (filters?.from) {
			where.push("o.createdAt >= ?");
			params.push(filters.from);
		}

		if (filters?.to) {
			where.push("o.createdAt <= ?");
			params.push(filters.to);
		}

		const whereClause = where.length ? `WHERE ${where.join(" AND ")}` : "";

		const [rows] = await pool
			.promise()
			.execute<RowDataPacket[]>(
				`SELECT o.userEmail,
				        o.createdAt,
				        o.total,
				        o.status,
				        op.productName,
				        op.productCategory,
				        1 as quantity,
				        p.price
				   FROM Orders o
				   LEFT JOIN OrderProducts op
				     ON op.orderUserEmail = o.userEmail AND op.orderCreatedAt = o.createdAt
				   LEFT JOIN Products p
				     ON p.name = op.productName AND p.category = op.productCategory
				   ${whereClause}
				   ORDER BY o.createdAt DESC`,
				params,
			);

		return this.groupOrders(rows);
	}

	public async getOrder(userEmail: string, createdAt: Date): Promise<Order | null> {
		const [rows] = await pool
			.promise()
			.execute<RowDataPacket[]>(
				`SELECT o.userEmail,
				        o.createdAt,
				        o.total,
				        o.status,
				        op.productName,
				        op.productCategory,
				        1 as quantity,
				        p.price
				   FROM Orders o
				   LEFT JOIN OrderProducts op
				     ON op.orderUserEmail = o.userEmail AND op.orderCreatedAt = o.createdAt
				   LEFT JOIN Products p
				     ON p.name = op.productName AND p.category = op.productCategory
				  WHERE o.userEmail = ? AND o.createdAt = ?
				  ORDER BY o.createdAt DESC`,
				[userEmail, createdAt],
			);

		const orders = this.groupOrders(rows);
		return orders[0] ?? null;
	}

	public async updateStatus(userEmail: string, createdAt: Date, status: string): Promise<boolean> {
		const [result] = await pool
			.promise()
			.execute<ResultSetHeader>(
				"UPDATE Orders SET status = ? WHERE userEmail = ? AND createdAt = ?",
				[status, userEmail, createdAt],
			);

		return result.affectedRows > 0;
	}

	private groupOrders(rows: RowDataPacket[]): Order[] {
		const map = new Map<string, Order>();

		rows.forEach((row) => {
			const key = `${row.userEmail}:${row.createdAt}`;
			if (!map.has(key)) {
				map.set(
					key,
					new Order(
						String(row.userEmail),
						new Date(row.createdAt),
						Number(row.total),
						String(row.status ?? "Pending"),
						[],
					),
				);
			}

			if (row.productName) {
				const order = map.get(key);
				order?.items.push(
					new OrderItem(
						String(row.productName),
						String(row.productCategory),
						numberOrZero(row.price),
						Number(row.quantity ?? 1),
					),
				);
			}
		});

		return Array.from(map.values());
	}
}

function numberOrZero(value: unknown): number {
	return typeof value === "number" ? value : 0;
}
