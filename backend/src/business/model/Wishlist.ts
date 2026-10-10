export namespace businessmodel {
	export class wishlist {
		public constructor(public UserEmail: string) {}
	}

	export class WishlistProduct {
		public constructor(
			public productName: string,
			public productCategory: string,
			public wishlistUserEmail: string,
			public price?: number,
			public createdAt?: Date
		) {}
	}
}
