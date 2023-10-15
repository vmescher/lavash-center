import {ProductInBasket} from "@scripts/api/basket/types";

export type Status = {
	id: number;
	name: string;
	xmlId: string;
}

export type Delivery = {
	id: number;
	name: string;
	xmlId: string;
	description: string;
	cost: string;
}

export type OrderItem = ProductInBasket;

export type Order = {
	id: number;
	date: string;
	time: string;
	client: string;
	contact: string;
	address: string;
	deliveryTypeId: number;
	orderStatusId: number;
	paymentStatusId: number;
	sum: number;
	dateCreate: string;
	items: OrderItem[];
}

export type ReadOrdersResponse = {
	orders: Order[];
	total: number;
}

export type ReadOrdersParams = {
	limit?: number;
	offset?: number;
}

export type OrderFilterPeriod = {
	from: number | string | Date | null;
	to: number | string | Date | null;
} | null

export type OrdersFilter = {
	query: string | null;
	period: OrderFilterPeriod;
	deliveryType: number | null;
	orderStatus: number | null;
	paymentStatus: number | null;
}

export type ReadManagerOrdersParams = ReadOrdersParams & {
	filter?: OrdersFilter;
}

export type CreateOrderPayload = {
	deliveryTypeId: number;
	date: string | Date;
	time?: string;
	address?: string;
}

export type OrderProduct = {
	id: number;
	quantity: number;
}

export type CreateManagerOrderPayload = CreateOrderPayload & {
	phone: string;
	name: string;
	products: OrderProduct[];
}

export type UpdateManagerOrderPayload = CreateManagerOrderPayload

export type UpdateOrderStatusPayload = {
	statusId: number;
}
