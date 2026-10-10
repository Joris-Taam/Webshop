import { ProductDataInterface } from "./ProductCrudInterface";
import { businessmodel } from "../../business/model/Product";
import { ProductModel } from "../models/ProductModel";

export class MysqlProductInterface implements ProductDataInterface {
	private productModel: ProductModel = new ProductModel();

	public createProduct(product: businessmodel.Product): Promise<string> {
		return this.productModel.createProduct(product);
	}

	public readProduct(name: string, category: string): Promise<businessmodel.Product | null> {
		return this.productModel.getProduct(name, category);
	}

	public readProducts(): Promise<businessmodel.Product[]> {
		return this.productModel.getProducts();
	}

	public updateProduct(
		name: string,
		category: string,
		product: businessmodel.Product
	): Promise<boolean> {
		return this.productModel.updateProduct(name, category, product);
	}

	public deleteProduct(name: string, category: string): Promise<boolean> {
		return this.productModel.deleteProduct(name, category);
	}
}
