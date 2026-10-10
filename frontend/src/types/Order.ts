export interface OrderItem {
	productName: string;
	productCategory: string;
	price: number;
	quantity: number;
}

export interface Order {
	userEmail: string;
	createdAt: string;
	total: number;
	status: string;
	items: OrderItem[];
}
