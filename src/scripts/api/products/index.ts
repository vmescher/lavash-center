import BaseAPI from '@scripts/api';
import { AxiosResponse } from 'axios';
import { BaseResponse } from '@scripts/api/types';
import { Product, ProductCategory } from "@scripts/api/products/types";

class ProductsApi extends BaseAPI {
	protected endpoint = 'products';

	read(): Promise<BaseResponse<Product[]>> {
		return new Promise((resolve, reject) => {
			this.http
				.get<BaseResponse<Product[]>>(`${this.endpoint}/list/`)
				.then((response: AxiosResponse<BaseResponse<Product[]>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		})
	}

	readCategories(): Promise<BaseResponse<ProductCategory[]>> {
		return new Promise((resolve, reject) => {
			this.http
				.get<BaseResponse<ProductCategory[]>>(`${this.endpoint}/categories/list/`)
				.then((response: AxiosResponse<BaseResponse<ProductCategory[]>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		})
	}
}

export const productsApi = new ProductsApi();
