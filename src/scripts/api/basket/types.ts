import {Product} from "@scripts/api/products/types";

export type ProductInBasket = Product & {
	quantity: number;
}

export type AddProductPayload = {
	productId: number;
}

export type DeleteProductPayload = {
	productId: number;
}

export type ChangeProductQuantityPayload = {
	productId: number;
	quantity: number;
}

