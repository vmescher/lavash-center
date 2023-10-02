import { defineStore } from 'pinia';
import useBaseStore from "@scripts/store/base";
import {formsApi} from "@scripts/api/forms";
import {AxiosError} from "axios";
import {ErrorResponse} from "@scripts/api/types";
import {FeedbackFormPayload} from "@scripts/api/forms/types";

const useFormsStore = defineStore('forms', {
	actions: {
		requestSendFeedbackForm(data: FeedbackFormPayload): Promise<true> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestSendFeedbackForm');

			return new Promise((resolve, reject) => {
				formsApi
					.sendFeedback(data)
					.then((response) => {
						resolve(response.data);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						reject(useMainStore.getError(error));
					})
					.finally(() => {
						useMainStore.stopLoading('requestSendFeedbackForm');
					});
			})
		},
	},
});

export default useFormsStore;

