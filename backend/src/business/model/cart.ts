export namespace businessmodel {
	export class Cart {
		public constructor(public userEmail: string) {}
	}

	export class CartProduct {
		public constructor(
			public productName: string,
			public productCategory: string,
			public shoppingCartUserEmail: string,
			public price?: number,
            public imgPath?: string, 
			public createdAt?: Date
		) {}
	}
}