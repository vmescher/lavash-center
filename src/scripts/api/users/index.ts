import BaseAPI from '@scripts/api';
import {AuthPayload, RegisterPayload, UpdatePayload, User} from '@scripts/api/users/types';
import {objectToFormData} from '@scripts/utils/objectToFormData';
import {BaseResponse} from '@scripts/api/types';
import {AxiosResponse} from 'axios';

class UsersApi extends BaseAPI {
	protected endpoint = 'users';

	create(data: RegisterPayload): Promise<BaseResponse<User>> {
		const body = objectToFormData(data);

		return new Promise((resolve, reject) => {
			this.http
				.post<BaseResponse<User>>(`${this.endpoint}/register/`, body)
				.then((response: AxiosResponse<BaseResponse<User>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	read(): Promise<BaseResponse<User>> {
		return new Promise((resolve, reject) => {
			this.http
				.get<BaseResponse<User>>(`${this.endpoint}/current/`)
				.then((response: AxiosResponse<BaseResponse<User>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	update(data: UpdatePayload): Promise<BaseResponse<User>> {
		const body = objectToFormData(data);

		return new Promise((resolve, reject) => {
			this.http
				.post<BaseResponse<User>>(`${this.endpoint}/current/`, body)
				.then((response: AxiosResponse<BaseResponse<User>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	logIn(data: AuthPayload): Promise<BaseResponse<User>> {
		const body = objectToFormData(data);

		return new Promise((resolve, reject) => {
			this.http
				.post<BaseResponse<User>>(`${this.endpoint}/logIn/`, body)
				.then((response: AxiosResponse<BaseResponse<User>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	logOut(): Promise<BaseResponse<null>> {
		return new Promise((resolve, reject) => {
			this.http
				.post<BaseResponse<null>>(`${this.endpoint}/logOut/`)
				.then((response: AxiosResponse<BaseResponse<null>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}
}

export const usersApi = new UsersApi();
