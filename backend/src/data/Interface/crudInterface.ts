import { businessmodel } from "../../business/model/foo";

export interface crudInterface {
	createFoo(): string;
	readFoo(id: string): Promise<businessmodel.Foo | null>;
	updateFoo(): void;
	deleteFoo(): void;
}
