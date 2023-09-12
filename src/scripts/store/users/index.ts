import {defineStore} from 'pinia';
import {UsersState} from '@scripts/store/users/types';
import {AuthPayload, RegisterPayload, User} from '@scripts/api/users/types';
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
		requestRegister(data: RegisterPayload): Promise<User> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestRegister');

			return new Promise((resolve, reject) => {
				usersApi
					.create(data)
					.then((response) => {
						this.isLoggedIn = true;
						this.userData = response.data;
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
	},
	getters: {
		getUserId(): number | null {
			return this.userData?.id || null;
		},
	},
});

export default useUsersStore;
