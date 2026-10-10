import * as mysql2 from "mysql2";
import "dotenv/config";

export const pool = mysql2.createPool({
	host: "localhost",
	user: "root",
	password: process.env.DB_PASSWORD,
	database: "3webshop",
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
	debug: false,
	namedPlaceholders: true,
	dateStrings: true,
	timezone: "Z",
});
