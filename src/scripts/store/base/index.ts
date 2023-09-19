import {defineStore} from 'pinia';
import {useToast} from 'vue-toastification';
import {AxiosError} from 'axios';
import {ErrorResponse} from '@scripts/api/types';
import {BaseState} from '@scripts/store/base/types';

const toast = useToast();
const useBaseStore = defineStore('main', {
	state: (): BaseState => ({
		loadingPool: new Set(),
	}),
	actions: {
		startLoading(actionName: string) {
			this.loadingPool.add(actionName);
		},
		stopLoading(actionName: string) {
			if (!this.loadingPool.has(actionName))
				console.error(`${actionName} : не найдено в пуле загрузки`);
			this.loadingPool.delete(actionName);
		},
		errorMessage(message: string) {
			toast.error(message);
		},
		warningMessage(message: string) {
			toast.warning(message);
		},
		infoMessage(message: string) {
			toast.info(message);
		},
		successMessage(message: string) {
			toast.success(message);
		},
		getError(error: string | AxiosError<ErrorResponse>, shouldToast = false): string {
			let message;

			if (error instanceof AxiosError) {
				message = error.response?.data.message || error.message;
			} else {
				message = error;
			}

			message = message.replaceAll(/<br>/g, ' ');
			message = message.replaceAll(/<\/br>/g, ' ');
			message = message.replaceAll(/\n/g, ' ');

			if (shouldToast) {
				this.errorMessage(message);
			}

			return message;
		},
	},
	getters: {
		isLoading(): boolean {
			return this.loadingPool.size > 0;
		},
		isActionPending(): (actionName: string) => boolean {
			return (actionName) => this.loadingPool.has(actionName);
		},
	},
});

export default useBaseStore;
