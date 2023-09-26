<script lang="ts">
import {defineComponent, PropType} from 'vue'
import InputSelect from "@components/utils/form/InputSelect.vue";
import Multiselect from "@vueform/multiselect";
import {ErrorObject} from "@vuelidate/core";

export default defineComponent({
	name: "AddressSelect",
	components: {InputSelect, Multiselect},
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
			// const addresses = await this.requestAddressesList({ address: query });
			//
			// if (Array.isArray(addresses)) return addresses;

			return query ? [] : [];
		},

	}
})
</script>

<template>
	<InputSelect :id="id" :label="label" :errors="errors">
		<Multiselect
				v-model="value"
				class="input-select"
				:delay="700"
				:min-chars="1"
				:hide-selected="false"
				searchable
				no-options-text="Ничего не найдено"
				no-results-text="Ничего не найдено"
				:placeholder="placeholder"
				:disabled="disabled || readOnly"
				:options="getAddress"
				:class="[{ 'is-error': errors.length }, { 'is-readonly': readOnly }]" />
	</InputSelect>
</template>

<style scoped lang="sass">

</style>
