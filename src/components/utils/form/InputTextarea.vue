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
	min-height: calc((2 * var(--di-border-width) + var(--di-font-size) * var(--di-line-height) + 2 * var(--di-py)) * 3)
		max-height: rem(350)
	padding: var(--di-py) var(--di-px)

	font-size: var(--di-font-size)
	line-height: var(--di-line-height)
	color: var(--di-color)

	border-style: solid
	border-width: var(--di-border-width)
	border-color: var(--di-border-color)
	border-radius: var(--di-border-radius)
	background-color: var(--color-neutral-100)

	resize: vertical
	transition: border-color .3s ease, background-color .3s ease

	+placeholder
		color: var(--di-placeholder-color)

	+hover
		border-color: var(--di-border-color-hover)

	&:focus
		border-color: var(--di-border-color-active)

	&:disabled
		background-color: var(--di-bg-disabled)
		border-color: var(--di-border-color-disabled)
		color: var(--di-color-disabled)
		cursor: not-allowed

		+placeholder
			color: var(--di-color-disabled)

	&:read-only:not(:disabled)
		cursor: help

	&.error
		border-color: var(--di-border-color-error)

		+placeholder
			color: var(--di-color-error)
</style>
