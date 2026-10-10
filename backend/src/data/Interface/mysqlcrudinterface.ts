import { businessmodel } from "../../business/model/foo";
import { mysqlData } from "../models/foo";
import { crudInterface } from "./crudInterface";

export class MysqlCrudInterface implements crudInterface {
	private foo!: mysqlData.Foo;

	public constructor() {
		this.foo = new mysqlData.Foo();
	}
	createFoo(): string {
		throw new Error("Method not implemented.");
	}

	/**
	 *
	 * @param id
	 * @returns
	 */
	public async readFoo(id: string): Promise<businessmodel.Foo | null> {
		let returnValue: businessmodel.Foo | null = null;
		returnValue = await this.foo.getFooById(id).then((result: businessmodel.Foo | null) => {
			return result;
		});
		return returnValue;
	}
	updateFoo(): void {
		throw new Error("Method not implemented.");
	}
	deleteFoo(): void {
		throw new Error("Method not implemented.");
	}
}
