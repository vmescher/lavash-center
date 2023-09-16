<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {ErrorObject} from '@vuelidate/core';
import InputTemplate from '@components/utils/templates/form/InputTemplate.vue';

export default defineComponent({
	name: 'InputTextarea',
	components: {InputTemplate},
	props: {
		modelValue: {
			type: String,
			default: () => null,
		},
		id: {
			type: String,
			default: () => '',
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
		name: {
			type: String,
			default: () => '',
		},
		errors: {
			type: Array as PropType<string[] | ErrorObject[]>,
			default: () => [],
		},
	},
	emits: ['update:modelValue'],
	computed: {
		value: {
			get(): string {
				return this.modelValue;
			},
			set(value: string) {
				this.$emit('update:modelValue', value);
			},
		},
	},
});
</script>

<template>
	<InputTemplate :id="id" :label="label" :errors="errors">
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value="labelValue"></slot>
		</template>

		<textarea
			:id="id"
			v-model="value"
			:placeholder="placeholder"
			:disabled="disabled"
			:readonly="readOnly"
			:required="required"
			:title="title"
			:name="name"
			class="input-textarea"
			:class="{ error: errors.length }"/>

		<template v-if="$slots.action" #action>
			<slot name="action"></slot>
		</template>
	</InputTemplate>
</template>

<style lang="sass">
.input-textarea
	flex: 1 1 auto
	width: 100%
	min-height: calc((2 * var(--di-border-width) + var(--di-font-size) * var(--di-line-height) + 2 * var(--di-py)) * 2)
	max-height: rem(350)
	padding: var(--di-py) var(--di-px)

	font-size: var(--di-font-size)
	font-weight: var(--di-font-weight)
	line-height: var(--di-line-height)
	color: var(--di-color)

	border-style: solid
	border-width: var(--di-border-width)
	border-color: var(--di-border-color)
	border-radius: rem(35)

	background-color: var(--di-bg)

	resize: vertical
	transition: border-color .3s ease, background-color .3s ease, color .3s ease

	+placeholder
		color: var(--di-placeholder-color)

		transition: color .3s ease

	&:not(:read-only)
		+hover
			--di-color: var(--di-color-hover)
			--di-border-color: var(--di-border-color-hover)
			--di-bg: var(--di-bg-hover)
			--di-placeholder-color: var(--di-color-hover)

		&:focus
			--di-color: var(--di-color-focus)
			--di-border-color: var(--di-border-color-focus)
			--di-bg: var(--di-bg-focus)
			--di-placeholder-color: var(--di-color-focus)

	&:disabled
		--di-color: var(--di-color-disabled)
		--di-border-color: var(--di-border-color-disabled)
		--di-bg: var(--di-bg-disabled)
		--di-placeholder-color: var(--di-color-disabled)

		cursor: not-allowed

	&:read-only:not(:disabled)
		--di-color: var(--di-color-readonly)
		--di-border-color: var(--di-border-color-readonly)
		--di-bg: var(--di-bg-readonly)

		cursor: help

	&.error
		border-color: var(--di-border-color-error)

		+placeholder
			color: var(--di-color-error)
</style>
