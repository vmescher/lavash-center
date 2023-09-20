import { defineStore } from 'pinia';
import useBaseStore from "@scripts/store/base";
import {productsApi} from "@scripts/api/products";
import {AxiosError} from "axios";
import {ErrorResponse} from "@scripts/api/types";
import {Product} from "@scripts/api/products/types";
import {ProductsState} from "@scripts/store/products/types";

const useProductsStore = defineStore('products', {
	state: (): ProductsState => ({
		products: [],
		categories: [],
	}),
	actions: {
		requestProducts(): Promise<Product[]> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestProducts');

			return new Promise((resolve, reject) => {
				productsApi
					.read()
					.then((response) => {
						this.products = response.data;
						resolve(response.data);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						reject(useMainStore.getError(error));
					})
					.finally(() => {
						useMainStore.stopLoading('requestProducts');
					});
			})
		},

		requestCategories(): Promise<Product[]> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestCategories');

			return new Promise((resolve, reject) => {
				productsApi
					.readCategories()
					.then((response) => {
						this.categories = response.data;
						resolve(response.data);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						reject(useMainStore.getError(error));
					})
					.finally(() => {
						useMainStore.stopLoading('requestCategories');
					});
			})
		}
	},
	getters: {
		getProductById(): (id: number) => Product | null {
			return (id) => this.products.find((product) => product.id === id) || null;
		},
		getProductsByCategoryId(): (id: number) => Product[] {
			return (id) => this.products.filter((product) => product.categoryId === id);
		}
	}
});

export default useProductsStore;

