import {mapActions, mapState} from 'pinia';
import addressesStore from '@scripts/store/addresses';

export const useAddressesStore = {
	computed: {
		...mapState(addressesStore, {
			getAddresses: 'addresses',
		}),
	},
	methods: {
		...mapActions(addressesStore, {
			requestAddresses: 'requestAddresses',
			requestSaveAddresses: 'requestSaveAddresses',
		}),
	},
};
