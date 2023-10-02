import { mapActions } from 'pinia';
import formsStore from '@scripts/store/forms';

export const useFormsStore = {
	methods: {
		...mapActions(formsStore, {
			requestSendFeedbackForm: 'requestSendFeedbackForm',
		}),
	},
};
