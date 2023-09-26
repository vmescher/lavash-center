import { defineStore } from 'pinia';
import useBaseStore from "@scripts/store/base";
import {basketApi} from "@scripts/api/basket";
import {AxiosError} from "axios";
import {ErrorResponse} from "@scripts/api/types";
import {BasketState} from "@scripts/store/basket/types";
import {
	AddProductPayload,
	ProductInBasket,
	DeleteProductPayload,
	ChangeProductQuantityPayload
} from "@scripts/api/basket/types";

const useBasketStore = defineStore('basket', {
	state: (): BasketState => ({
		basket: [],
	}),
	actions: {
		requestBasket(): Promise<ProductInBasket[]> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestBasket');

			return new Promise((resolve, reject) => {
				basketApi
					.read()
					.then((response) => {
						this.basket = response.data;
						resolve(response.data);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						reject(useMainStore.getError(error));
					})
					.finally(() => {
						useMainStore.stopLoading('requestBasket');
					});
			})
		},

		requestAddToBasket(data: AddProductPayload): Promise<ProductInBasket[]> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestAddToBasket');

			return new Promise((resolve, reject) => {
				basketApi
					.addToBasket(data)
					.then((response) => {
						this.basket = response.data;
						resolve(response.data);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						reject(useMainStore.getError(error));
					})
					.finally(() => {
						useMainStore.stopLoading('requestAddToBasket');
					});
			})
		},

		requestDeleteFromBasket(data: DeleteProductPayload): Promise<ProductInBasket[]> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestDeleteFromBasket');

			return new Promise((resolve, reject) => {
				basketApi
					.deleteFromBasket(data)
					.then((response) => {
						this.basket = response.data;
						resolve(response.data);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						reject(useMainStore.getError(error));
					})
					.finally(() => {
						useMainStore.stopLoading('requestDeleteFromBasket');
					});
			})
		},

		requestChangeQuantity(data: ChangeProductQuantityPayload): Promise<ProductInBasket[]> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestChangeQuantity');

			return new Promise((resolve, reject) => {
				basketApi
					.changeQuantity(data)
					.then((response) => {
						this.basket = response.data;
						resolve(response.data);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						reject(useMainStore.getError(error));
					})
					.finally(() => {
						useMainStore.stopLoading('requestChangeQuantity');
					});
			})
		},

		requestClearBasket(): Promise<ProductInBasket[]> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestClearBasket');

			return new Promise((resolve, reject) => {
				basketApi
					.clearBasket()
					.then((response) => {
						this.basket = response.data;
						resolve(response.data);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						reject(useMainStore.getError(error));
					})
					.finally(() => {
						useMainStore.stopLoading('requestClearBasket');
					});
			})
		},
	},
	getters: {
		getBasketProductById(): (id: number) => ProductInBasket | null {
			return (id) => this.basket.find((product) => product.id === id) || null;
		},
		getBasketProductsByCategoryId(): (id: number) => ProductInBasket[] {
			return (id) => this.basket.filter((product) => product.categoryId === id);
		},
		isProductInBasket(): (id: number) => boolean {
			return (id) => this.basket.some((product) => product.id === id);
		},
		getBasketTotalPrice(): number {
			return this.basket.reduce((total, product) => total + product.price * product.quantity, 0);
		},
		isDeliveryFree(): boolean {
			return this.basket.reduce((total, product) => total + product.quantity, 0) >= 20;
		}
	}
});

export default useBasketStore;

