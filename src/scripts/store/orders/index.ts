import { defineStore } from 'pinia';
import useBaseStore from "@scripts/store/base";
import {ordersApi} from "@scripts/api/orders";
import {AxiosError} from "axios";
import {ErrorResponse, Pagination} from "@scripts/api/types";
import {CreateOrderPayload, Order, ReadOrdersParams, Status} from "@scripts/api/orders/types";
import {OrdersState} from "@scripts/store/orders/types";

const useOrdersStore = defineStore('orders', {
	state: (): OrdersState => ({
		currentOrder: null,
		orders: [],
		pagination: {
			total: 0,
			offset: 0,
			limit: 10
		},
		orderStatuses: [],
		deliveryTypes: [],
		paymentStatuses: [],
	}),
	actions: {
		setOrdersPagination(pagination: Partial<Pagination>) {
			Object.assign(this.pagination, pagination);
		},

		requestOrders(params: ReadOrdersParams): Promise<Order[]> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestOrders');

			return new Promise((resolve, reject) => {
				ordersApi
					.readOrders(params)
					.then((response) => {
						this.orders = response.data.orders;
						this.setOrdersPagination({
							total: response.data.total,
						})
						resolve(response.data.orders);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						reject(useMainStore.getError(error));
					})
					.finally(() => {
						useMainStore.stopLoading('requestOrders');
					});
			})
		},

		requestCreateOrder(data: CreateOrderPayload): Promise<true> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('createOrder');

			return new Promise((resolve, reject) => {
				ordersApi
					.createOrder(data)
					.then(() => {
						resolve(true);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						reject(useMainStore.getError(error));
					})
					.finally(() => {
						useMainStore.stopLoading('createOrder');
					});
			})
		},

		requestOrderStatuses(): Promise<Status[]> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestOrderStatuses');

			return new Promise((resolve, reject) => {
				ordersApi
					.readOrderStatuses()
					.then((response) => {
						this.orderStatuses = response.data;
						resolve(response.data);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						reject(useMainStore.getError(error));
					})
					.finally(() => {
						useMainStore.stopLoading('requestOrderStatuses');
					});
			})
		},

		requestDeliveryTypes(): Promise<Status[]> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestDeliveryTypes');

			return new Promise((resolve, reject) => {
				ordersApi
					.readDeliveryTypes()
					.then((response) => {
						this.deliveryTypes = response.data;
						resolve(response.data);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						reject(useMainStore.getError(error));
					})
					.finally(() => {
						useMainStore.stopLoading('requestDeliveryTypes');
					});
			})
		},

		requestPaymentStatuses(): Promise<Status[]> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestPaymentStatuses');

			return new Promise((resolve, reject) => {
				ordersApi
					.readPaymentStatuses()
					.then((response) => {
						this.paymentStatuses = response.data;
						resolve(response.data);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						reject(useMainStore.getError(error));
					})
					.finally(() => {
						useMainStore.stopLoading('requestPaymentStatuses');
					});
			})
		}
	},
});

export default useOrdersStore;

