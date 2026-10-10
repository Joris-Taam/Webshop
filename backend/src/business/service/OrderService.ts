import { Order } from "../model/Order";
import { OrderCrudInterface } from "../../data/Interface/OrderCrudInterface";

export class OrderService {
	public constructor(private readonly orderData: OrderCrudInterface) {}

	public getOrders(filters?: { status?: string; from?: Date; to?: Date }): Promise<Order[]> {
		return this.orderData.readOrders(filters);
	}

	public getOrder(userEmail: string, createdAt: Date): Promise<Order | null> {
		return this.orderData.readOrder(userEmail, createdAt);
	}

	public updateStatus(userEmail: string, createdAt: Date, status: string): Promise<boolean> {
		return this.orderData.updateStatus(userEmail, createdAt, status);
	}
}
