import { defineStore } from 'pinia';
import useBaseStore from "@scripts/store/base";
import {addressesApi} from "@scripts/api/addresses";
import {AxiosError} from "axios";
import {ErrorResponse} from "@scripts/api/types";
import {AddressesState} from "@scripts/store/addresses/types";
import {Address, SaveAddressesPayload} from "@scripts/api/addresses/types";

const useAddressesStore = defineStore('addresses', {
	state: (): AddressesState => ({
		addresses: [],
	}),
	actions: {
		requestAddresses(): Promise<Address[]> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestAddresses');

			return new Promise((resolve, reject) => {
				addressesApi
					.read()
					.then((response) => {
						this.addresses = response.data;
						resolve(response.data);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						reject(useMainStore.getError(error));
					})
					.finally(() => {
						useMainStore.stopLoading('requestAddresses');
					});
			})
		},

		requestSaveAddresses(data: SaveAddressesPayload): Promise<Address[]> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestSaveAddresses');

			return new Promise((resolve, reject) => {
				addressesApi
					.create(data)
					.then((response) => {
						this.addresses = response.data;
						resolve(response.data);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						reject(useMainStore.getError(error));
					})
					.finally(() => {
						useMainStore.stopLoading('requestSaveAddresses');
					});
			})
		}

	},
});

export default useAddressesStore;

