import { crudInterface } from "../../data/Interface/crudInterface";
import { businessmodel } from "../model/foo";

export namespace business {
	export class ServiceFoo {
		public constructor(private mysqlCrudInterface: crudInterface) {}

		/**
		 * Function for getting Foo object by id
		 * @param id, string is Id of Foo object
		 * @returns null if no Foo is found else Foo (business model) object.
		 */

		public async getFooById(id: string): Promise<businessmodel.Foo | null> {
			let result: businessmodel.Foo | null = await this.mysqlCrudInterface
				.readFoo(id)
				.then((foo: businessmodel.Foo | null) => {
					return foo;
				});

			return result;
		}
	}
}
