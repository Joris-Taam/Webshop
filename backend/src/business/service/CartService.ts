import { businessmodel } from "../model/cart";
import { CartCrudInterface } from "../../data/Interface/CartCrudInterface";

export class CartService {
	public constructor(private readonly cartData: CartCrudInterface) {}

	public async getCart(userEmail: string): Promise<businessmodel.CartProduct[]> {
		return this.cartData.readCart(userEmail);
	}

	public async addProduct(
		productName: string,
		productCategory: string,
		userEmail: string
	): Promise<{ created: boolean; product: businessmodel.CartProduct }> {
		await this.cartData.createCart(userEmail);

		const product = new businessmodel.CartProduct(productName, productCategory, userEmail);
		const created = await this.cartData.createCartProduct(product);

		return { created, product };
	}

	public async removeProduct(
		productName: string,
		productCategory: string,
		userEmail: string
	): Promise<boolean> {
		return this.cartData.deleteCartProduct(productName, productCategory, userEmail);
	}
}