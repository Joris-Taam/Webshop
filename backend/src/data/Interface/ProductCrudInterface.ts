import { businessmodel } from "../../business/model/Product";

export interface ProductDataInterface {
	createProduct(product: businessmodel.Product): Promise<string>;
	readProduct(name: string, category: string): Promise<businessmodel.Product | null>;
	readProducts(): Promise<businessmodel.Product[]>;
	updateProduct(name: string, category: string, product: businessmodel.Product): Promise<boolean>;
	deleteProduct(name: string, category: string): Promise<boolean>;
}
