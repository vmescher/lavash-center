<script lang="ts">
import {defineComponent, PropType} from 'vue'
import InputSelect from "@components/utils/form/InputSelect.vue";
import Multiselect from "@vueform/multiselect";
import {ErrorObject} from "@vuelidate/core";
import {useOrdersStore} from "@scripts/hooks/stateHooks/useOrdersStore";

export default defineComponent({
	name: "DeliveryTypeSelect",
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
			default: 'Способ получения',
		},
		placeholder: {
			type: String,
			default: 'Выберите способ получения',
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
			get(): number | null {
				return this.modelValue;
			},
			set(value: number | null) {
				this.$emit('update:modelValue', value);
			}
		},
		optionsList() {
			return this.getDeliveryTypes;
		}
	},
	created() {
		if (!this.getDeliveryTypes.length) {
			this.requestDeliveryTypes();
		}
	},
})
</script>

<template>
	<InputSelect :id="id" :label="label" :errors="errors">
		<Multiselect v-model="value" class="input-select" value-prop="id" label="name" no-results-text="Способ получения не найден" no-options-text="Нет доступных способов получения" :placeholder="placeholder" :can-clear="canClear" :disabled="disabled || readOnly" :options="optionsList" :class="[{ 'is-error': errors.length }, { 'is-readonly': readOnly }]" :can-deselect="canDeselect" />
	</InputSelect>
</template>

<style scoped lang="sass">

</style>
