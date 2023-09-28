import BaseAPI from '@scripts/api';
import { AxiosResponse } from 'axios';
import { BaseResponse } from '@scripts/api/types';
import {
	AddProductPayload,
	ChangeProductQuantityPayload,
	ProductInBasket,
	DeleteProductPayload
} from "@scripts/api/basket/types";
import {objectToFormData} from "@scripts/utils/objectToFormData";

class BasketApi extends BaseAPI {
	protected endpoint = 'baskets';

	read(): Promise<BaseResponse<ProductInBasket[]>> {
		return new Promise((resolve, reject) => {
			this.http
				.get<BaseResponse<ProductInBasket[]>>(`${this.endpoint}/list/`)
				.then((response: AxiosResponse<BaseResponse<ProductInBasket[]>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		})
	}

	addToBasket(data: AddProductPayload): Promise<BaseResponse<ProductInBasket[]>> {
		const body = objectToFormData(data);

		return new Promise((resolve, reject) => {
			this.http
				.post<BaseResponse<ProductInBasket[]>>(`${this.endpoint}/add/`, body)
				.then((response: AxiosResponse<BaseResponse<ProductInBasket[]>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		})
	}

	deleteFromBasket(data: DeleteProductPayload): Promise<BaseResponse<ProductInBasket[]>> {
		const body = objectToFormData(data);

		return new Promise((resolve, reject) => {
			this.http
				.post<BaseResponse<ProductInBasket[]>>(`${this.endpoint}/delete/`, body)
				.then((response: AxiosResponse<BaseResponse<ProductInBasket[]>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		})
	}

	changeQuantity(data: ChangeProductQuantityPayload): Promise<BaseResponse<ProductInBasket[]>> {
		const body = objectToFormData(data);

		return new Promise((resolve, reject) => {
			this.http
				.post<BaseResponse<ProductInBasket[]>>(`${this.endpoint}/change-quantity/`, body)
				.then((response: AxiosResponse<BaseResponse<ProductInBasket[]>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		})
	}

	clearBasket(): Promise<BaseResponse<true>> {
		return new Promise((resolve, reject) => {
			this.http
				.post<BaseResponse<true>>(`${this.endpoint}/clear/`)
				.then((response: AxiosResponse<BaseResponse<true>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		})
	}
}

export const basketApi = new BasketApi();
