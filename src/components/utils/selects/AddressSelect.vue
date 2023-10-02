<script lang="ts">
import {defineComponent, PropType} from 'vue'
import InputSelect from "@components/utils/form/InputSelect.vue";
import Multiselect from "@vueform/multiselect";
import {ErrorObject} from "@vuelidate/core";
import {useAddressesStore} from "@scripts/hooks/stateHooks/useAddressesStore";

export default defineComponent({
	name: "AddressSelect",
	components: {InputSelect, Multiselect},
	mixins: [useAddressesStore],
	props: {
		modelValue: {
			type: String as PropType<string | null>,
			default: null,
		},
		id: {
			type: String,
			default: '',
		},
		label: {
			type: String,
			default: 'Адрес доставки',
		},
		placeholder: {
			type: String,
			default: 'Введите адрес',
		},
		withUserAddresses: {
			type: Boolean,
			default: () => true,
		},
		readOnly: {
			type: Boolean,
			default: () => false,
		},
		disabled: {
			type: Boolean,
			default: () => false,
		},
		errors: {
			type: Array as PropType<string[] | ErrorObject[]>,
			default: () => [],
		},
	},
	emits: ['update:modelValue'],
	computed: {
		value: {
			get(): string | null {
				return this.modelValue;
			},
			set(value: string | null) {
				this.$emit('update:modelValue', value);
			}
		},
	},
	methods: {
		async getAddress(query: string) {
			if (!query) {
				if (this.withUserAddresses) {
					if (this.getAddresses.length) {
						return this.getAddresses.map((address) => address.address);
					}

					await this.requestAddresses();
					if (this.getAddresses.length) {
						return this.getAddresses.map((address) => address.address);
					}
				}
				return [];
			}
			const addresses = await this.requestFindAddress({ query });
			if (Array.isArray(addresses)) return addresses;
			return [];
		},
		handleSelect(value: string) {
			if (this.getAddresses.find((address) => address.address === value)) {
				return;
			}

			const multiSelect = this.$refs.multiselect as typeof Multiselect & { search: string };

			if (multiSelect) {
				multiSelect.search = value;
			}
		}
	}
})
</script>

<template>
	<InputSelect :id="id" :label="label" :errors="errors">
		<Multiselect
				ref="multiselect"
				v-model="value"
				class="input-select"
				:delay="700"
				:min-chars="1"
				:hide-selected="false"
				searchable
				:caret="!disabled && !readOnly"
				:filter-results="false"
				:allow-absent="true"
				:close-on-select="false"
				no-options-text="Ничего не найдено"
				no-results-text="Ничего не найдено"
				:placeholder="placeholder"
				:disabled="disabled || readOnly"
				:options="getAddress"
				:class="[{ 'is-error': errors.length }, { 'is-readonly': readOnly }]"
				@select="handleSelect"
		/>

		<template v-if="$slots.action" #action>
			<slot name="action"></slot>
		</template>

		<template v-if="$slots.underInput" #underInput>
			<slot name="underInput"></slot>
		</template>
	</InputSelect>
</template>

<style scoped lang="sass">

</style>
