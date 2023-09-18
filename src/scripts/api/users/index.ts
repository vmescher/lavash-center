import BaseAPI from '@scripts/api';
import {
	AuthPayload,
	RecoveryPasswordConfirmPayload,
	RecoveryPasswordPayload,
	RegisterPayload, UpdatePasswordPayload,
	UpdatePayload,
	User
} from '@scripts/api/users/types';
import {objectToFormData} from '@scripts/utils/objectToFormData';
import {BaseResponse} from '@scripts/api/types';
import {AxiosResponse} from 'axios';

class UsersApi extends BaseAPI {
	protected endpoint = 'users';

	create(data: RegisterPayload): Promise<BaseResponse<true>> {
		const body = objectToFormData(data);

		return new Promise((resolve, reject) => {
			this.http
				.post<BaseResponse<true>>(`${this.endpoint}/register/`, body)
				.then((response: AxiosResponse<BaseResponse<true>>) => {
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
				.post<BaseResponse<User>>(`${this.endpoint}/update/`, body)
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
				.post<BaseResponse<User>>(`${this.endpoint}/login/`, body)
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
				.post<BaseResponse<null>>(`${this.endpoint}/logout/`)
				.then((response: AxiosResponse<BaseResponse<null>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	recoverPassword(data: RecoveryPasswordPayload): Promise<BaseResponse<true>> {
		const body = objectToFormData(data);

		return new Promise((resolve, reject) => {
			this.http
				.post<BaseResponse<true>>(`${this.endpoint}/recovery-password/`, body)
				.then((response: AxiosResponse<BaseResponse<true>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	resetPassword(data: RecoveryPasswordConfirmPayload): Promise<BaseResponse<true>> {
		const body = objectToFormData(data);

		return new Promise((resolve, reject) => {
			this.http
				.post<BaseResponse<true>>(`${this.endpoint}/reset-password-confirm/`, body)
				.then((response: AxiosResponse<BaseResponse<true>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	updatePassword(data: UpdatePasswordPayload): Promise<BaseResponse<true>> {
		const body = objectToFormData(data);

		return new Promise((resolve, reject) => {
			this.http
				.post<BaseResponse<true>>(`${this.endpoint}/update/password/`, body)
				.then((response: AxiosResponse<BaseResponse<true>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		})
	}
}

export const usersApi = new UsersApi();
