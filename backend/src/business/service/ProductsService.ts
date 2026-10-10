import { ProductDataInterface } from "../../data/Interface/ProductCrudInterface";
import { businessmodel } from "../model/Product";

export class ProductService {
	constructor(private productData: ProductDataInterface) {}

	public async getProduct(name: string, category: string) {
		return this.productData.readProduct(name, category);
	}

	public async getProducts() {
		return this.productData.readProducts();
	}

	public async createProduct(product: businessmodel.Product) {
		return this.productData.createProduct(product);
	}

	public async updateProduct(name: string, category: string, product: businessmodel.Product) {
		return this.productData.updateProduct(name, category, product);
	}

	public async deleteProduct(name: string, category: string) {
		return this.productData.deleteProduct(name, category);
	}
}
