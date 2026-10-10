export namespace businessmodel {
	export class Product {
		constructor(
			public name: string,
			public price: number,
			public category: string,
			public description?: string,
			public sizeWidth?: number,
			public sizeHeight?: number,
			public sizeLength?: number,
			public filePath?: string,
			public fileExtension?: string,
			public imgPath?: string
		) {}
	}
}
