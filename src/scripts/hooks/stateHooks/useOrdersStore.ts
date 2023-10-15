import {mapActions, mapState} from 'pinia';
import ordersStore from '@scripts/store/orders';
import basketStore from '@scripts/store/basket';

export const useOrdersStore = {
	computed: {
		...mapState(ordersStore, {
			getOrders: 'orders',
			getOrdersPagination: 'pagination',
			getOrdersFilter: 'filter',
			getOrdersFilterKey: 'getFilterByKey',
			getCurrentOrder: 'currentOrder',
			getOrderStatuses: 'orderStatuses',
			getDeliveryTypes: 'deliveryTypes',
			getPaymentStatuses: 'paymentStatuses',
			getDeliveryType: 'getDeliveryType',
		}),
		...mapState(basketStore, {
			isDeliveryFree: 'isDeliveryFree',
		}),
	},
	methods: {
		...mapActions(ordersStore, {
			setOrdersFilter: 'setOrdersFilterKey',
			requestOrder: 'requestOrder',
			requestManagerOrder: 'requestManagerOrder',
			requestOrders: 'requestOrders',
			requestManagerOrders: 'requestManagerOrders',
			requestCreateOrder: 'requestCreateOrder',
			requestCreateManagerOrder: 'requestCreateManagerOrder',
			requestUpdateManagerOrder: 'requestUpdateManagerOrder',
			requestUpdateManagerOrderStatus: 'requestUpdateManagerOrderStatus',
			requestUpdateManagerOrderPaymentStatus: 'requestUpdateManagerOrderPaymentStatus',
			requestDeliveryTypes: 'requestDeliveryTypes',
			requestPaymentStatuses: 'requestPaymentStatuses',
			requestOrderStatuses: 'requestOrderStatuses',
		}),
	},
};
