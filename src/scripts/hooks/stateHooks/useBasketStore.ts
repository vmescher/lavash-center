import {mapActions, mapState} from 'pinia';
import basketStore from '@scripts/store/basket';

export const useBasketStore = {
	computed: {
		...mapState(basketStore, {
			getBasket: 'basket',
			getBasketProductById: 'getBasketProductById',
			getBasketProductsByCategoryId: 'getBasketProductsByCategoryId',
			isProductInBasket: 'isProductInBasket',
			getBasketTotalPrice: 'getBasketTotalPrice',
		}),
	},
	methods: {
		...mapActions(basketStore, {
			clearBasket: 'clearBasket',
			requestBasket: 'requestBasket',
			requestAddToBasket: 'requestAddToBasket',
			requestDeleteFromBasket: 'requestDeleteFromBasket',
			requestChangeQuantity: 'requestChangeQuantity',
			requestClearBasket: 'requestClearBasket',
		}),
	},
};
