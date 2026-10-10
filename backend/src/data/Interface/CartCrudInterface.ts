import { businessmodel } from "../../business/model/cart";

export interface CartCrudInterface {
	createCart(userEmail: string): Promise<void>;
	createCartProduct(product: businessmodel.CartProduct): Promise<boolean>;
	readCart(userEmail: string): Promise<businessmodel.CartProduct[]>;
	deleteCartProduct(
		productName: string,
		productCategory: string,
		userEmail: string
	): Promise<boolean>;
}