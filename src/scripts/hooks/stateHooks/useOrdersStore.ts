import {mapActions, mapState} from 'pinia';
import ordersStore from '@scripts/store/orders';
import basketStore from '@scripts/store/basket';

export const useOrdersStore = {
	computed: {
		...mapState(ordersStore, {
			getOrders: 'orders',
			getOrdersPagination: 'pagination',
			getCurrentOrder: 'currentOrder',
			getOrderStatuses: 'orderStatuses',
			getDeliveryTypes: 'deliveryTypes',
			getPaymentStatuses: 'paymentStatuses',
		}),
		...mapState(basketStore, {
			isDeliveryFree: 'isDeliveryFree',
		}),
	},
	methods: {
		...mapActions(ordersStore, {
			requestOrders: 'requestOrders',
			requestCreateOrder: 'requestCreateOrder',
			requestDeliveryTypes: 'requestDeliveryTypes',
			requestPaymentStatuses: 'requestPaymentStatuses',
			requestOrderStatuses: 'requestOrderStatuses',
		}),
	},
};
