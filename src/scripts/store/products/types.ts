import {Product, ProductCategory} from "@scripts/api/products/types";

export type ProductsState = {
	categories: ProductCategory[];
	products: Product[];
}
