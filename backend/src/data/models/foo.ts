import { pool } from "../../util/database";
import { RowDataPacket } from "mysql2";
import { businessmodel } from "../../business/model/foo";
import { SingletonFoo } from "../../util/singletonfoo";
import { FooData } from "../../util/JSONObjects";
import { Bar } from "./bar";

export namespace mysqlData {
	export class Foo {
		bars: Bar[];

		constructor() {
			this.bars = [];
		}

		public async getFooById(id: string): Promise<businessmodel.Foo | null> {
			let returnValue: businessmodel.Foo | null = null;

			try {
				const [results, _field] = await pool
					.promise()
					.execute<RowDataPacket[]>("SELECT * FROM `Foo` where id = " + id, [id]);
				returnValue = SingletonFoo.initializer().createFoo(results[0] as FooData);
			} catch (error) {
				console.log(error);
			}

			return returnValue;
		}

		public async getFoos(): Promise<businessmodel.Foo[] | null> {
			let returnValueArray: businessmodel.Foo[] | null = null;

			try {
				const [results, _field] = await pool.promise().execute<RowDataPacket[]>("SELECT * FROM `Foo`");
				returnValueArray = SingletonFoo.initializer().createFoos(results as FooData[]);
			} catch (error) {}
			return returnValueArray;
		}
	}
}
