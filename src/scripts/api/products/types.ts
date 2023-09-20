export type Product = {
	id: number;
	name: string;
	price: number;
	unit: string;
	picture: string | null;
	categoryId: number;
}

export type ProductCategory = {
	id: number;
	name: string;
}
