import BaseAPI from '@scripts/api';
import { AxiosResponse } from 'axios';
import { BaseResponse } from '@scripts/api/types';
import {
	CreateManagerOrderPayload,
	CreateOrderPayload,
	Delivery, Order,
	ReadOrdersParams,
	ReadOrdersResponse,
	Status, UpdateManagerOrderPayload, UpdateOrderStatusPayload
} from "@scripts/api/orders/types";
import {objectToFormData} from "@scripts/utils/objectToFormData";

class OrdersApi extends BaseAPI {
	protected endpoint = 'orders';

	readOrder(orderId: number): Promise<BaseResponse<Order>> {
		return new Promise((resolve, reject) => {
			this.http
				.get<BaseResponse<Order>>(`${this.endpoint}/item/${orderId}/`)
				.then((response: AxiosResponse<BaseResponse<Order>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		})
	}

	readManagerOrder(orderId: number): Promise<BaseResponse<Order>> {
		return new Promise((resolve, reject) => {
			this.http
				.get<BaseResponse<Order>>(`${this.endpoint}/manager/item/${orderId}/`)
				.then((response: AxiosResponse<BaseResponse<Order>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		})
	}

	readOrders(params: ReadOrdersParams): Promise<BaseResponse<ReadOrdersResponse>> {
		return new Promise((resolve, reject) => {
			this.http
				.get<BaseResponse<ReadOrdersResponse>>(`${this.endpoint}/list/`, {
					params
				})
				.then((response: AxiosResponse<BaseResponse<ReadOrdersResponse>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		})
	}

	readManagerOrders(params: ReadOrdersParams): Promise<BaseResponse<ReadOrdersResponse>> {
		return new Promise((resolve, reject) => {
			this.http
				.get<BaseResponse<ReadOrdersResponse>>(`${this.endpoint}/manager/list/`, {
					params
				})
				.then((response: AxiosResponse<BaseResponse<ReadOrdersResponse>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		})
	}

	createOrder(data: CreateOrderPayload): Promise<BaseResponse<true>> {
		const body = objectToFormData(data);

		return new Promise((resolve, reject) => {
			this.http
				.post<BaseResponse<true>>(`${this.endpoint}/create/`, body)
				.then((response: AxiosResponse<BaseResponse<true>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		})
	}

	createManagerOrder(data: CreateManagerOrderPayload): Promise<BaseResponse<true>> {
		const body = objectToFormData(data);

		return new Promise((resolve, reject) => {
			this.http
				.post<BaseResponse<true>>(`${this.endpoint}/manager/create/`, body)
				.then((response: AxiosResponse<BaseResponse<true>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		})
	}

	updateManagerOrder(data: UpdateManagerOrderPayload, orderId: number): Promise<BaseResponse<true>> {
		const body = objectToFormData(data);

		return new Promise((resolve, reject) => {
			this.http
				.post<BaseResponse<true>>(`${this.endpoint}/manager/${orderId}/update/`, body)
				.then((response: AxiosResponse<BaseResponse<true>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		})
	}

	updateManagerOrderStatus(data: UpdateOrderStatusPayload, orderId: number): Promise<BaseResponse<Partial<Order>>> {
		const body = objectToFormData(data);

		return new Promise((resolve, reject) => {
			this.http
				.post<BaseResponse<Partial<Order>>>(`${this.endpoint}/manager/${orderId}/update/order-status/`, body)
				.then((response: AxiosResponse<BaseResponse<Partial<Order>>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		})
	}

	updateManagerOrderPaymentStatus(data: UpdateOrderStatusPayload, orderId: number): Promise<BaseResponse<Partial<Order>>> {
		const body = objectToFormData(data);

		return new Promise((resolve, reject) => {
			this.http
				.post<BaseResponse<Partial<Order>>>(`${this.endpoint}/manager/${orderId}/update/payment-status/`, body)
				.then((response: AxiosResponse<BaseResponse<Partial<Order>>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		})
	}

	readDeliveryTypes(): Promise<BaseResponse<Delivery[]>> {
		return new Promise((resolve, reject) => {
			this.http
				.get<BaseResponse<Delivery[]>>(`${this.endpoint}/delivery-types/list/`)
				.then((response: AxiosResponse<BaseResponse<Delivery[]>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		})
	}

	readPaymentStatuses(): Promise<BaseResponse<Status[]>> {
		return new Promise((resolve, reject) => {
			this.http
				.get<BaseResponse<Status[]>>(`${this.endpoint}/payment-statuses/list/`)
				.then((response: AxiosResponse<BaseResponse<Status[]>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		})
	}

	readOrderStatuses(): Promise<BaseResponse<Status[]>> {
		return new Promise((resolve, reject) => {
			this.http
				.get<BaseResponse<Status[]>>(`${this.endpoint}/order-statuses/list/`)
				.then((response: AxiosResponse<BaseResponse<Status[]>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		})
	}
}

export const ordersApi = new OrdersApi();
