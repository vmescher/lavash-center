import {mapActions, mapState} from 'pinia';
import modalsStore from '@scripts/store/modals';

export const useModalsStore = {
	computed: {
		...mapState(modalsStore, {
			isModalOpened: 'isModalOpened',
			hasActiveModals: 'hasActiveModals',
		}),
	},
	methods: {
		...mapActions(modalsStore, {
			registerModal: 'registerModal',
			unregisterModal: 'unregisterModal',
			openModal: 'openModal',
			closeModal: 'closeModal',
		}),
	},
};
