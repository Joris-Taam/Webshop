import { Request, Response } from "express";
import { OrderService } from "../business/service/OrderService";

export class OrderController {
	public constructor(private readonly orderService: OrderService) {}

	public async list(req: Request, res: Response): Promise<Response> {
		try {
			const { status, from, to } = req.query;
			const filters = {
				status: typeof status === "string" && status.trim() ? status.trim() : undefined,
				from: from ? new Date(String(from)) : undefined,
				to: to ? new Date(String(to)) : undefined,
			};

			const orders = await this.orderService.getOrders(filters);
			return res.status(200).json(orders);
		} catch (error) {
			console.error("OrderController#list", error);
			return res.status(500).json({ message: "Kon bestellingen niet ophalen." });
		}
	}

	public async getOne(req: Request, res: Response): Promise<Response> {
		try {
			const { userEmail, createdAt } = req.params;
			if (!userEmail || !createdAt) {
				return res.status(400).json({ message: "userEmail en createdAt zijn verplicht." });
			}

			const order = await this.orderService.getOrder(userEmail, new Date(createdAt));
			if (!order) {
				return res.status(404).json({ message: "Bestelling niet gevonden." });
			}

			return res.status(200).json(order);
		} catch (error) {
			console.error("OrderController#getOne", error);
			return res.status(500).json({ message: "Kon bestelling niet ophalen." });
		}
	}

	public async updateStatus(req: Request, res: Response): Promise<Response> {
		try {
			const { userEmail, createdAt } = req.params;
			const { status } = req.body ?? {};

			if (!userEmail || !createdAt || !status) {
				return res.status(400).json({ message: "userEmail, createdAt en status zijn verplicht." });
			}

			const updated = await this.orderService.updateStatus(userEmail, new Date(createdAt), status);
			if (!updated) {
				return res.status(404).json({ message: "Bestelling niet gevonden." });
			}

			return res.status(204).send();
		} catch (error) {
			console.error("OrderController#updateStatus", error);
			return res.status(500).json({ message: "Kon status niet bijwerken." });
		}
	}
}
