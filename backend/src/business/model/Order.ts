export class OrderItem {
	public constructor(
		public readonly productName: string,
		public readonly productCategory: string,
		public readonly price: number,
		public readonly quantity: number,
	) {}
}

export class Order {
	public constructor(
		public readonly userEmail: string,
		public readonly createdAt: Date,
		public readonly total: number,
		public status: string,
		public readonly items: OrderItem[] = [],
	) {}
}
