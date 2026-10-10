export interface Product {
	name: string;
	price: number | null;
	category: string;
	description?: string;
	sizeWidth?: number;
	sizeHeight?: number;
	sizeLength?: number;
	filePath?: string;
	fileExtension?: string;
	imgPath?: string;
}
