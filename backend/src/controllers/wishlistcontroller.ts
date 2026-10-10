import { Request, Response } from "express";
import { WishlistService } from "../business/service/WishlistService";

export class WishlistController {
	public constructor(private readonly wishlistService: WishlistService) {}

	public async getWishlist(req: Request, res: Response): Promise<Response> {
		try {
			const { userEmail } = req.params;

			if (!userEmail) {
				return res.status(400).json({ message: "userEmail is verplicht." });
			}

			const wishlist = await this.wishlistService.getWishlist(userEmail);
			return res.status(200).json(wishlist);
		} catch (error) {
			console.error("WishlistController#getWishlist", error);
			return res.status(500).json({ message: "Kon wishlist niet ophalen." });
		}
	}

	public async addProduct(req: Request, res: Response): Promise<Response> {
		try {
			const { productName, productCategory, userEmail } = req.body ?? {};

			if (!productName || !productCategory || !userEmail) {
				return res.status(400).json({
					message: "productName, productCategory en userEmail zijn verplicht.",
				});
			}

			const result = await this.wishlistService.addProduct(productName, productCategory, userEmail);

			if (!result.created) {
				return res.status(409).json({ message: "Product staat al op de wishlist." });
			}

			return res.status(201).json(result.product);
		} catch (error) {
			console.error("WishlistController#addProduct", error);
			return res.status(500).json({ message: "Kon product niet toevoegen aan wishlist." });
		}
	}

	public async removeProduct(req: Request, res: Response): Promise<Response> {
		try {
			const { productName, productCategory, userEmail } = req.body ?? {};

			if (!productName || !productCategory || !userEmail) {
				return res.status(400).json({
					message: "productName, productCategory en userEmail zijn verplicht.",
				});
			}

			const removed = await this.wishlistService.removeProduct(
				productName,
				productCategory,
				userEmail
			);

			if (!removed) {
				return res.status(404).json({ message: "Product niet gevonden op wishlist." });
			}

			return res.status(204).send();
		} catch (error) {
			console.error("WishlistController#removeProduct", error);
			return res.status(500).json({ message: "Kon product niet verwijderen van wishlist." });
		}
	}
}
