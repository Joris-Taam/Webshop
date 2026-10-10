import { businessmodel } from "../../business/model/Wishlist";
import { WishlistCrudInterface } from "./WishlistCrudInterface";
import { WishlistModel } from "../models/WishlistModel";

export class MysqlWishlistInterface implements WishlistCrudInterface {
	private readonly wishlistModel: WishlistModel;

	public constructor() {
		this.wishlistModel = new WishlistModel();
	}

	public async createWishlist(userEmail: string): Promise<void> {
		await this.wishlistModel.ensureWishlist(userEmail);
	}

	public async createWishlistProduct(product: businessmodel.WishlistProduct): Promise<boolean> {
		return await this.wishlistModel.addProduct(product);
	}

	public async readWishlist(userEmail: string): Promise<businessmodel.WishlistProduct[]> {
		return await this.wishlistModel.getWishlist(userEmail);
	}

	public async deleteWishlistProduct(
		productName: string,
		productCategory: string,
		userEmail: string
	): Promise<boolean> {
		return await this.wishlistModel.removeProduct(productName, productCategory, userEmail);
	}
}
