export class PromotionProduct {
	constructor(
		public productName: string,
		public productCategory: string,
		public promotionTitle: string,
		public startingDate: Date,
		public endingDate: Date,
		public percentage: number
	) {}
}
