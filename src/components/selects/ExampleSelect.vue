<script lang="ts">
import {defineComponent, PropType} from 'vue';
import InputSelect from '@components/utils/form/InputSelect.vue';
import Multiselect from '@vueform/multiselect';
import {ErrorObject} from '@vuelidate/core';

export default defineComponent({
	name: 'ExampleSelect',
	components: {InputSelect, Multiselect},
	props: {
		modelValue: {
			type: [String, Array],
			default: () => [],
		},
		id: {
			type: String,
			default: () => '',
		},
		searchable: {
			type: Boolean,
			default: () => false
		},
		label: {
			type: String,
			default: () => '',
		},
		placeholder: {
			type: String,
			default: () => '',
		},
		readOnly: {
			type: Boolean,
			default: () => false,
		},
		disabled: {
			type: Boolean,
			default: () => false,
		},
		required: {
			type: Boolean,
			default: () => false,
		},
		title: {
			type: String,
			default: () => '',
		},
		loading: {
			type: Boolean,
			default: () => false,
		},
		labelSelect: {
			type: String,
			default: () => '',
		},
		valueProp: {
			type: String,
			default: () => '',
		},
		canClear: {
			type: Boolean,
			default: () => true,
		},
		mode: {
			type: String as PropType<'single' | 'multiple' | 'tags'>,
			default: () => 'single',
		},
		options: {
			type: Array as PropType<string[] | Array<Record<string, unknown>>>,
			default: () => [],
		},
		groups: {
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
			get(): string | unknown[] {
				return this.modelValue;
			},
			set(value: string | unknown[]): void {
				this.$emit('update:modelValue', value);
			},
		},
	},
});
</script>

<template>
	<InputSelect :id="id" :label="label" :errors="errors">
		<Multiselect
			v-model="value"
			class="input-select"
			:class="[{ 'is-error': errors.length }, { 'is-readonly': readOnly }]"
			:title="title"
			:placeholder="placeholder"
			:options="options"
			:mode="mode"
			:groups="groups"
			:hide-selected="false"
			:caret="!loading"
			:searchable="searchable"
			:disabled="disabled || readOnly"
			:loading="loading"
			:label="labelSelect"
			:value-prop="valueProp"
			:can-clear="canClear"/>
	</InputSelect>
</template>

<style scoped lang="sass"></style>
