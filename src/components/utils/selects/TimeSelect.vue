<script lang="ts">
import {defineComponent, PropType} from 'vue'
import InputSelect from "@components/utils/form/InputSelect.vue";
import Multiselect from "@vueform/multiselect";
import {ErrorObject} from "@vuelidate/core";

export type TimeSelectOption = {
	label: string
	value: string
	disabled?: boolean
}

export default defineComponent({
	name: "TimeSelect",
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
			default: 'Время',
		},
		placeholder: {
			type: String,
			default: 'Выберите время',
		},
		readOnly: {
			type: Boolean,
			default: () => false,
		},
		isToday: {
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
		optionsList() {
			const options = [] as TimeSelectOption[];
			for (let i = 9; i <= 18; i+=1) {

				const valueFirst = `${i}:00`.padStart(5, '0');
				const valueSecond = `${i + 1}:00`.padStart(5, '0');
				const value = `${valueFirst} - ${valueSecond}`;
				const disabled = this.isToday && i < new Date().getHours() + 1;

				options.push({
					label: value,
					value,
					disabled
				});
			}
			return options;
		}
	}
})
</script>

<template>
	<InputSelect :id="id" :label="label" :errors="errors">
		<Multiselect v-model="value" class="input-select" :placeholder="placeholder" :can-clear="false" :disabled="disabled || readOnly" :options="optionsList" :class="[{ 'is-error': errors.length }, { 'is-readonly': readOnly }]" :can-deselect="false" />
	</InputSelect>
</template>

<style scoped lang="sass">

</style>
