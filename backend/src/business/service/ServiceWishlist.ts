import { mysqlData } from "../../data/models/wistlist";
import { businessmodel } from "../model/Wishlist";

export class ServiceWishlist {
	public constructor(private readonly wishlistData: mysqlData.Wishlist) {}

	public async getWishlistByEmail(userEmail: string): Promise<businessmodel.wishlist[]> {
		return this.wishlistData.getWishlistByUserEmail(userEmail);
	}

	public async getAllWishlist(): Promise<businessmodel.wishlist[]> {
		return this.wishlistData.getWishlist();
	}
}
