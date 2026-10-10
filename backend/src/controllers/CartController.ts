import { Request, Response } from "express";
import { CartService } from "../business/service/CartService";

export class CartController {
	public constructor(private readonly cartService: CartService) {}

	public async getCart(req: Request, res: Response): Promise<Response> {
		try {
			const { userEmail } = req.params;

			if (!userEmail) {
				return res.status(400).json({ message: "userEmail is verplicht." });
			}

			const cart = await this.cartService.getCart(userEmail);
			return res.status(200).json(cart);
		} catch (error) {
			console.error("CartController#getCart", error);
			return res.status(500).json({ message: "Kon winkelmand niet ophalen." });
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

			const result = await this.cartService.addProduct(productName, productCategory, userEmail);

			if (!result.created) {
				return res.status(409).json({ message: "Product zit al in de winkelmand." });
			}

			return res.status(201).json(result.product);
		} catch (error) {
			console.error("CartController#addProduct", error);
			return res.status(500).json({ message: "Kon product niet toevoegen aan winkelmand." });
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

			const removed = await this.cartService.removeProduct(
				productName,
				productCategory,
				userEmail
			);

			if (!removed) {
				return res.status(404).json({ message: "Product niet gevonden in winkelmand." });
			}

			return res.status(204).send();
		} catch (error) {
			console.error("CartController#removeProduct", error);
			return res.status(500).json({ message: "Kon product niet verwijderen uit winkelmand." });
		}
	}
}