import {mapActions, mapState} from 'pinia';
import baseStore from '@scripts/store/base';

export const useBaseStore = {
	computed: {
		...mapState(baseStore, {
			isAppLoading: 'isLoading',
			isActionPending: 'isActionPending',
		}),
	},
	methods: {
		...mapActions(baseStore, {
			startAppLoading: 'startLoading',
			stopAppLoading: 'stopLoading',
			showSuccessMessage: 'successMessage',
			showErrorMessage: 'errorMessage',
			showWarningMessage: 'warningMessage',
			showInfoMessage: 'infoMessage',
		}),
	},
};
