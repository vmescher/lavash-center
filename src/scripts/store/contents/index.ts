import { defineStore } from 'pinia';
import useBaseStore from "@scripts/store/base";
import {contentsApi} from "@scripts/api/contents";
import {DocumentLinks} from "@scripts/api/contents/types";
import {ContentsState} from "@scripts/store/contents/types";
import {AxiosError} from "axios";
import {ErrorResponse} from "@scripts/api/types";

const useContentsStore = defineStore('contents', {
	state: (): ContentsState => ({
		legalDocs: {
			privacyPolicy: '',
			processingPersonal: ''
		},
	}),
	actions: {
		requestLegalDocs(): Promise<DocumentLinks> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestLegalDocs');

			return new Promise((resolve, reject) => {
				contentsApi
					.readDocuments()
					.then((response) => {
						this.legalDocs = {
							privacyPolicy: response.data['privacy-policy'],
							processingPersonal: response.data['processing-personal-data']
						};
						resolve(response.data);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						reject(useMainStore.getError(error));
					})
					.finally(() => {
						useMainStore.stopLoading('requestLegalDocs');
					});
			})
		},
	},
});

export default useContentsStore;

