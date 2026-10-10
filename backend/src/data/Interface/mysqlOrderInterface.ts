import { Order } from "../../business/model/Order";
import { OrderCrudInterface } from "./OrderCrudInterface";
import { OrderModel } from "../models/OrderModel";

export class MysqlOrderInterface implements OrderCrudInterface {
	private readonly model: OrderModel;

	public constructor() {
		this.model = new OrderModel();
	}

	public readOrders(filters?: { status?: string; from?: Date; to?: Date }): Promise<Order[]> {
		return this.model.getOrders(filters);
	}

	public readOrder(userEmail: string, createdAt: Date): Promise<Order | null> {
		return this.model.getOrder(userEmail, createdAt);
	}

	public updateStatus(userEmail: string, createdAt: Date, status: string): Promise<boolean> {
		return this.model.updateStatus(userEmail, createdAt, status);
	}
}
