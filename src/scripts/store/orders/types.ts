import {Delivery, Order, Status} from "@scripts/api/orders/types";
import {Pagination} from "@scripts/api/types";

export type OrdersState = {
	currentOrder: Order | null;
	orders: Order[];
	pagination: Pagination;
	orderStatuses: Status[];
	deliveryTypes: Delivery[];
	paymentStatuses: Status[];
}
