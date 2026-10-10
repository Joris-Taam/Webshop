import { businessmodel } from "../business/model/foo";
import { FooData } from "./JSONObjects";

export class SingletonFoo {
	private static obj: SingletonFoo | null = null;

	private constructor() {}

	public static initializer(): SingletonFoo {
		if (SingletonFoo.obj == null) {
			SingletonFoo.obj = new SingletonFoo();
		}
		return SingletonFoo.obj;
	}

	public createFoo(fooDatabaseRow: FooData): businessmodel.Foo {
		let returnValue: businessmodel.Foo = new businessmodel.Foo(
			fooDatabaseRow.id,
			fooDatabaseRow.description
		);
		return returnValue;
	}

	public createFoos(fooDatabaseRows: FooData[]): businessmodel.Foo[] {
		let returnValueArray: businessmodel.Foo[] = [];
		for (let i = 0; i < fooDatabaseRows.length; i++) {
			let foo: businessmodel.Foo = new businessmodel.Foo(
				fooDatabaseRows[i].id,
				fooDatabaseRows[i].description
			);
			returnValueArray.push(foo);
		}
		return returnValueArray;
	}
}
