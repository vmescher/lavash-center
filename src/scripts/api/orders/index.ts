import BaseAPI from '@scripts/api';
import { AxiosResponse } from 'axios';
import { BaseResponse } from '@scripts/api/types';
import {CreateOrderPayload, Delivery, ReadOrdersParams, ReadOrdersResponse, Status} from "@scripts/api/orders/types";
import {objectToFormData} from "@scripts/utils/objectToFormData";

class OrdersApi extends BaseAPI {
	protected endpoint = 'orders';

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
