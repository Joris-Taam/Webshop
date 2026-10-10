import { businessmodel } from "../model/Wishlist";
import { WishlistCrudInterface } from "../../data/Interface/WishlistCrudInterface";

export class WishlistService {
	public constructor(private readonly wishlistData: WishlistCrudInterface) {}

	public async getWishlist(userEmail: string): Promise<businessmodel.WishlistProduct[]> {
		return this.wishlistData.readWishlist(userEmail);
	}

	public async addProduct(
		productName: string,
		productCategory: string,
		userEmail: string
	): Promise<{ created: boolean; product: businessmodel.WishlistProduct }> {
		await this.wishlistData.createWishlist(userEmail);

		const product = new businessmodel.WishlistProduct(productName, productCategory, userEmail);
		const created = await this.wishlistData.createWishlistProduct(product);

		return { created, product };
	}

	public async removeProduct(
		productName: string,
		productCategory: string,
		userEmail: string
	): Promise<boolean> {
		return this.wishlistData.deleteWishlistProduct(productName, productCategory, userEmail);
	}
}
