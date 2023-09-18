import {defineStore} from 'pinia';
import {UsersState} from '@scripts/store/users/types';
import {
	AuthPayload,
	RecoveryPasswordConfirmPayload,
	RecoveryPasswordPayload,
	RegisterPayload, UpdatePasswordPayload,
	UpdatePayload,
	User
} from '@scripts/api/users/types';
import useBaseStore from '@scripts/store/base';
import {usersApi} from '@scripts/api/users';
import {AxiosError} from 'axios';
import {ErrorResponse} from '@scripts/api/types';

const useUsersStore = defineStore('users', {
	state: (): UsersState => ({
		isLoggedIn: false,
		userData: null,
	}),
	actions: {
		requestLogIn(data: AuthPayload): Promise<User> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestLogIn');

			return new Promise((resolve, reject) => {
				usersApi
					.logIn(data)
					.then((response) => {
						this.isLoggedIn = true;
						this.userData = response.data;
						resolve(response.data);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						reject(useMainStore.getError(error));
					})
					.finally(() => {
						useMainStore.stopLoading('requestLogIn');
					});
			});
		},
		requestLogOut(): Promise<null> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestLogOut');

			return new Promise((resolve, reject) => {
				usersApi
					.logOut()
					.then((response) => {
						this.isLoggedIn = false;
						this.userData = null;
						resolve(response.data);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						reject(useMainStore.getError(error));
					})
					.finally(() => {
						useMainStore.stopLoading('requestLogOut');
					});
			});
		},
		requestRegister(data: RegisterPayload): Promise<true> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestRegister');

			return new Promise((resolve, reject) => {
				usersApi
					.create(data)
					.then((response) => {
						resolve(response.data);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						reject(useMainStore.getError(error));
					})
					.finally(() => {
						useMainStore.stopLoading('requestRegister');
					});
			});
		},
		requestUserData(): Promise<User> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestUser');

			return new Promise((resolve, reject) => {
				usersApi
					.read()
					.then((response) => {
						this.isLoggedIn = true;
						this.userData = response.data;
						resolve(response.data);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						this.isLoggedIn = false;
						reject(useMainStore.getError(error));
					})
					.finally(() => {
						useMainStore.stopLoading('requestUser');
					});
			});
		},
		requestUpdateUserData(data: UpdatePayload): Promise<User> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestUpdateUser');

			return new Promise((resolve, reject) => {
				usersApi
					.update(data)
					.then((response) => {
						this.userData = response.data;
						resolve(response.data);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						reject(useMainStore.getError(error));
					})
					.finally(() => {
						useMainStore.stopLoading('requestUpdateUser');
					});
			});
		},
		requestRecoveryPassword(data: RecoveryPasswordPayload): Promise<true> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestRecoveryPassword');

			return new Promise((resolve, reject) => {
				usersApi
					.recoverPassword(data)
					.then((response) => {
						resolve(response.data);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						reject(useMainStore.getError(error));
					})
					.finally(() => {
						useMainStore.stopLoading('requestRecoveryPassword');
					});
			});
		},
		requestResetPassword(data: RecoveryPasswordConfirmPayload): Promise<true> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestResetPassword');

			return new Promise((resolve, reject) => {
				usersApi
					.resetPassword(data)
					.then((response) => {
						resolve(response.data);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						reject(useMainStore.getError(error));
					})
					.finally(() => {
						useMainStore.stopLoading('requestResetPassword');
					});
			});
		},
		requestUpdatePassword(data: UpdatePasswordPayload): Promise<true> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestUpdatePassword');

			return new Promise((resolve, reject) => {
				usersApi
					.updatePassword(data)
					.then((response) => {
						resolve(response.data);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						reject(useMainStore.getError(error));
					})
					.finally(() => {
						useMainStore.stopLoading('requestUpdatePassword');
					});
			})
		}
	},
	getters: {
		getUserId(): number | null {
			return this.userData?.id || null;
		},
		isAdmin(): boolean {
			return this.userData?.role === 'admin' || this.userData?.role === 'manager';
		}
	},
});

export default useUsersStore;
