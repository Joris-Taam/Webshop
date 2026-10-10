import { pool } from "../../util/database";
import { RowDataPacket } from "mysql2";
import { businessmodel } from "../../business/model/contactRequest";

export namespace mysqlData {
	export class ContactRequest {
		// ➤ Haal één contact request op via composite key (email + created_at)
		public async getContactByKey(
			email: string,
			created_at: string
		): Promise<businessmodel.ContactRequest | null> {
			try {
				const mysqlDate = created_at.replace("T", " ").replace(".000Z", "");
				const [rows] = await pool
					.promise()
					.execute<RowDataPacket[]>("SELECT * FROM contactRequests WHERE email = ? AND createdAt = ?", [
						email,
						mysqlDate,
					]);

				if (rows.length === 0) return null;

				const row = rows.at(0);
				if (!row) return null;

				return new businessmodel.ContactRequest(
					row.name,
					row.email,
					row.subject,
					row.message,
					row.status,
					row.note,
					row.createdAt
				);
			} catch (err) {
				console.error(err);
				return null;
			}
		}

		// ➤ Haal ALLE contact requests op
		public async getAllContacts(): Promise<businessmodel.ContactRequest[]> {
			try {
				const [rows] = await pool.promise().execute<RowDataPacket[]>("SELECT * FROM contactRequests");

				return rows.map(
					(row) =>
						new businessmodel.ContactRequest(
							row.name,
							row.email,
							row.subject,
							row.message,
							row.status,
							row.note,
							row.createdAt
						)
				);
			} catch (err) {
				console.error(err);
				return [];
			}
		}

		// ➤ Maak een nieuw contact request
		public async createContact(model: businessmodel.ContactRequest): Promise<void> {
			try {
				await pool.promise().execute(
					`INSERT INTO contactRequests
                    (name, email, subject, message, status, note, createdAt)
                    VALUES (?, ?, ?, ?, ?, ?, ?)`,
					[
						model.name,
						model.email,
						model.subject,
						model.message,
						model.status,
						model.note,
						model.createdAt,
					]
				);
			} catch (err) {
				console.error("CreateContact error:", err);
				throw new Error("Failed to create contact request");
			}
		}

		// ➤ Update existing contact request
		public async updateContact(
			email: string,
			created_at: string,
			updates: Partial<businessmodel.ContactRequest>
		): Promise<void> {
			try {
				const fields: string[] = [];
				const values: any[] = [];

				if (updates.name !== undefined) {
					fields.push("name = ?");
					values.push(updates.name);
				}
				if (updates.subject !== undefined) {
					fields.push("subject = ?");
					values.push(updates.subject);
				}
				if (updates.message !== undefined) {
					fields.push("message = ?");
					values.push(updates.message);
				}
				if (updates.status !== undefined) {
					fields.push("status = ?");
					values.push(updates.status);
				}
				if (updates.note !== undefined) {
					fields.push("note = ?");
					values.push(updates.note);
				}

				if (fields.length === 0) return;

				const mysqlDate = created_at.replace("T", " ").replace(".000Z", "");

				const query = `UPDATE contactRequests SET ${fields.join(
					", "
				)} WHERE email = ? AND createdAt = ?`;
				values.push(email, mysqlDate);

				await pool.promise().execute(query, values);
			} catch (err) {
				console.error("UpdateContact error:", err);
				throw new Error("Failed to update contact request");
			}
		}

		// ➤ Delete contact request
		public async deleteContact(email: string, created_at: string): Promise<void> {
			try {
				const mysqlDate = created_at.replace("T", " ").replace(".000Z", "");

				await pool
					.promise()
					.execute("DELETE FROM contactRequests WHERE email = ? AND createdAt = ?", [email, mysqlDate]);
			} catch (err) {
				console.error("DeleteContact error:", err);
				throw new Error("Failed to delete contact request");
			}
		}
	}
}
