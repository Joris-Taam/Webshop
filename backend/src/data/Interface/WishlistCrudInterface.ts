import { businessmodel } from "../../business/model/Wishlist";

export interface WishlistCrudInterface {
	createWishlist(userEmail: string): Promise<void>;
	createWishlistProduct(product: businessmodel.WishlistProduct): Promise<boolean>;
	readWishlist(userEmail: string): Promise<businessmodel.WishlistProduct[]>;
	deleteWishlistProduct(
		productName: string,
		productCategory: string,
		userEmail: string
	): Promise<boolean>;
}
