<script lang="ts">
import {defineComponent, PropType} from 'vue'
import InputSelect from "@components/utils/form/InputSelect.vue";
import Multiselect from "@vueform/multiselect";
import {ErrorObject} from "@vuelidate/core";
import {useProductsStore} from "@scripts/hooks/stateHooks/useProductsStore";

export default defineComponent({
	name: "ProductSelect",
	components: {InputSelect, Multiselect},
	mixins: [useProductsStore],
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
			default: 'Наименование товара',
		},
		placeholder: {
			type: String,
			default: 'Не выбрано',
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
		excludedProducts: {
			type: Array as PropType<number[]>,
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
			const options = this.getProducts;

			return options.filter((option) => !this.excludedProducts.includes(option.id));
		}
	},
	created() {
		if (!this.getProducts.length) {
			this.requestProducts();
		}
	},
})
</script>

<template>
	<InputSelect :id="id" :label="label" :errors="errors">
		<Multiselect v-model="value" class="input-select" value-prop="id" label="name" searchable no-results-text="Товар не найден" no-options-text="Список товаров пуст" :placeholder="placeholder" :can-clear="false" :disabled="disabled || readOnly" :options="optionsList" :class="[{ 'is-error': errors.length }, { 'is-readonly': readOnly }]" :can-deselect="false" />
	</InputSelect>
</template>

<style scoped lang="sass">

</style>
