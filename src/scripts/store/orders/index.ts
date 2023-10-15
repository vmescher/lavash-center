import { defineStore } from 'pinia';
import useBaseStore from "@scripts/store/base";
import {ordersApi} from "@scripts/api/orders";
import {AxiosError} from "axios";
import {ErrorResponse, Pagination} from "@scripts/api/types";
import {
	CreateManagerOrderPayload,
	CreateOrderPayload, Delivery,
	Order, OrdersFilter, ReadManagerOrdersParams,
	ReadOrdersParams,
	Status, UpdateManagerOrderPayload, UpdateOrderStatusPayload
} from "@scripts/api/orders/types";
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
		filter: {
			query: null,
			period: null,
			deliveryType: null,
			orderStatus: null,
			paymentStatus: null
		},
		orderStatuses: [],
		deliveryTypes: [],
		paymentStatuses: [],
	}),
	actions: {
		setOrdersPagination(pagination: Partial<Pagination>) {
			Object.assign(this.pagination, pagination);
		},

		setOrdersFilterKey(filterKey: keyof OrdersFilter, filterValue: OrdersFilter[keyof OrdersFilter] | null) {
			Object.assign(this.filter, {
				[filterKey]: filterValue
			})
		},

		hydrateOrderData(orderData: Partial<Order>) {
			if (this.currentOrder) {
				Object.assign(this.currentOrder, orderData);
			}

			const orderIndex = this.orders.findIndex((order) => order.id === orderData.id);
			if (orderIndex !== -1) {
				Object.assign(this.orders[orderIndex], orderData);
			}
		},

		requestOrder(orderId: number): Promise<Order> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestOrder');

			return new Promise((resolve, reject) => {
				ordersApi
					.readOrder(orderId)
					.then((response) => {
						this.currentOrder = response.data;
						resolve(response.data);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						this.currentOrder = null;
						reject(useMainStore.getError(error));
					})
					.finally(() => {
						useMainStore.stopLoading('requestOrder');
					});
			})
		},

		requestManagerOrder(orderId: number): Promise<Order> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestManagerOrder');

			return new Promise((resolve, reject) => {
				ordersApi
					.readManagerOrder(orderId)
					.then((response) => {
						this.currentOrder = response.data;
						resolve(response.data);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						this.currentOrder = null;
						reject(useMainStore.getError(error));
					})
					.finally(() => {
						useMainStore.stopLoading('requestManagerOrder');
					});
			})
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
							...params
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

		requestManagerOrders(params: ReadManagerOrdersParams): Promise<Order[]> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestManagerOrders');

			return new Promise((resolve, reject) => {
				ordersApi
					.readManagerOrders(params)
					.then((response) => {
						this.orders = response.data.orders;
						this.setOrdersPagination({
							total: response.data.total,
							...params
						})
						resolve(response.data.orders);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						reject(useMainStore.getError(error));
					})
					.finally(() => {
						useMainStore.stopLoading('requestManagerOrders');
					});
			})
		},

		requestCreateOrder(data: CreateOrderPayload): Promise<true> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestCreateOrder');

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
						useMainStore.stopLoading('requestCreateOrder');
					});
			})
		},

		requestCreateManagerOrder(data: CreateManagerOrderPayload): Promise<Order> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestCreateManagerOrder');

			return new Promise((resolve, reject) => {
				ordersApi
					.createManagerOrder(data)
					.then((response) => {
						resolve(response.data);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						reject(useMainStore.getError(error));
					})
					.finally(() => {
						useMainStore.stopLoading('requestCreateManagerOrder');
					});
			})
		},

		requestUpdateManagerOrder(data: UpdateManagerOrderPayload, orderId: number): Promise<Order> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestUpdateManagerOrder');

			return new Promise((resolve, reject) => {
				ordersApi
					.updateManagerOrder(data, orderId)
					.then((response) => {
						this.hydrateOrderData(response.data);
						resolve(response.data);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						reject(useMainStore.getError(error));
					})
					.finally(() => {
						useMainStore.stopLoading('requestUpdateManagerOrder');
					});
			})
		},

		requestUpdateManagerOrderStatus(data: UpdateOrderStatusPayload, orderId: number): Promise<Partial<Order>> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestUpdateManagerOrderStatus');

			return new Promise((resolve, reject) => {
				ordersApi
					.updateManagerOrderStatus(data, orderId)
					.then((response) => {
						this.hydrateOrderData(response.data);
						resolve(response.data);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						reject(useMainStore.getError(error));
					})
					.finally(() => {
						useMainStore.stopLoading('requestUpdateManagerOrderStatus');
					});
			})
		},

		requestUpdateManagerOrderPaymentStatus(data: UpdateOrderStatusPayload, orderId: number): Promise<Partial<Order>> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestUpdateManagerOrderPaymentStatus');

			return new Promise((resolve, reject) => {
				ordersApi
					.updateManagerOrderPaymentStatus(data, orderId)
					.then((response) => {
						this.hydrateOrderData(response.data);
						resolve(response.data);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						reject(useMainStore.getError(error));
					})
					.finally(() => {
						useMainStore.stopLoading('requestUpdateManagerOrderPaymentStatus');
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

			if (useMainStore.isActionPending('requestDeliveryTypes')) {
				return new Promise((resolve) => {
					const interval = setInterval(() => {
						if (!useMainStore.isActionPending('requestDeliveryTypes')) {
							clearInterval(interval);
							resolve(this.deliveryTypes);
						}
					}, 200);
				})
			}

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
	getters: {
		getDeliveryType(): (id: number) => Delivery | null {
			return (id) => this.deliveryTypes.find((deliveryType) => deliveryType.id === id) || null;
		},
		getFilterByKey(): (key: keyof OrdersFilter) => OrdersFilter[keyof OrdersFilter] {
			return (key) => this.filter[key];
		}
	}
});

export default useOrdersStore;

