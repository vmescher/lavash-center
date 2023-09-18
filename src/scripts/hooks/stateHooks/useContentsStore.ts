import { mapActions, mapState } from 'pinia';
import contentsStore from '@scripts/store/contents';

export const useContentsStore = {
	computed: {
		...mapState(contentsStore, {
			getLegalDocs: 'legalDocs',
		}),
	},
	methods: {
		...mapActions(contentsStore, {
			requestLegalDocs: 'requestLegalDocs',
		}),
	},
};
