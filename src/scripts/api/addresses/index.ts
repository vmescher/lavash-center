import BaseAPI from '@scripts/api';
import {AxiosResponse} from 'axios';
import {BaseResponse} from '@scripts/api/types';
import {objectToFormData} from "@scripts/utils/objectToFormData";
import {Address, SaveAddressesPayload} from "@scripts/api/addresses/types";

class AddressesApi extends BaseAPI {
	protected endpoint = 'addresses';

	read(): Promise<BaseResponse<Address[]>> {
		return new Promise((resolve, reject) => {
			this.http
				.get<BaseResponse<Address[]>>(`${this.endpoint}/list/`)
				.then((response: AxiosResponse<BaseResponse<Address[]>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		})
	}

	create(data: SaveAddressesPayload): Promise<BaseResponse<Address[]>> {
		const body = objectToFormData(data)

		return new Promise((resolve, reject) => {
			this.http
				.post<BaseResponse<Address[]>>(`${this.endpoint}/save/`, body)
				.then((response: AxiosResponse<BaseResponse<Address[]>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		})
	}
}

export const addressesApi = new AddressesApi();
