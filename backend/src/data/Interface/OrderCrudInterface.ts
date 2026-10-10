import { Order } from "../../business/model/Order";

export interface OrderCrudInterface {
	readOrders(filters?: { status?: string; from?: Date; to?: Date }): Promise<Order[]>;
	readOrder(userEmail: string, createdAt: Date): Promise<Order | null>;
	updateStatus(userEmail: string, createdAt: Date, status: string): Promise<boolean>;
}
