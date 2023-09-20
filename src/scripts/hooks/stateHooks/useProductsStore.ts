import {mapActions, mapState} from 'pinia';
import productsStore from '@scripts/store/products';

export const useProductsStore = {
	computed: {
		...mapState(productsStore, {
			getProducts: 'products',
			getCategories: 'categories',
			getProductById: 'getProductById',
			getProductsByCategoryId: 'getProductsByCategoryId',
		}),
	},
	methods: {
		...mapActions(productsStore, {
			requestProducts: 'requestProducts',
			requestCategories: 'requestCategories',
		}),
	},
};
