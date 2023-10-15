<script lang="ts">
import {defineComponent, PropType} from 'vue'
import InputSelect from "@components/utils/form/InputSelect.vue";
import Multiselect from "@vueform/multiselect";
import {ErrorObject} from "@vuelidate/core";
import {useOrdersStore} from "@scripts/hooks/stateHooks/useOrdersStore";

export default defineComponent({
	name: "PaymentStatusSelect",
	components: {InputSelect, Multiselect},
	mixins: [useOrdersStore],
	props: {
		modelValue: {
			type: Number as PropType<number | null>,
			default: null,
		},
		id: {
			type: String,
			default: '',
		},
		label: {
			type: String,
			default: 'Статус оплаты',
		},
		placeholder: {
			type: String,
			default: 'Выберите статус оплаты',
		},
		readOnly: {
			type: Boolean,
			default: () => false,
		},
		disabled: {
			type: Boolean,
			default: () => false,
		},
		canClear: {
			type: Boolean,
			default: () => false,
		},
		canDeselect: {
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
		optionsList() {
			return this.getPaymentStatuses;
		}
	},
	created() {
		if (!this.getPaymentStatuses.length) {
			this.requestPaymentStatuses();
		}
	},
})
</script>

<template>
	<InputSelect :id="id" :label="label" :errors="errors">
		<Multiselect v-model="value" class="input-select" value-prop="id" label="name" no-results-text="Статус оплаты не найден" no-options-text="Нет доступных статусов" :placeholder="placeholder" :can-clear="canClear" :disabled="disabled || readOnly" :options="optionsList" :class="[{ 'is-error': errors.length }, { 'is-readonly': readOnly }]" :can-deselect="canDeselect" />
	</InputSelect>
</template>

<style scoped lang="sass">

</style>
