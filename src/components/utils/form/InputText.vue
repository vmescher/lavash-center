<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {MaskType} from '@scripts/consts/masks';
import {getMask} from '@scripts/mixins/getMask';
import {ErrorObject} from '@vuelidate/core';
import InputTemplate from '@components/utils/templates/form/InputTemplate.vue';

export default defineComponent({
	name: 'InputText',
	components: {InputTemplate},
	mixins: [getMask],
	props: {
		modelValue: {
			type: [String, Number],
			default: () => null,
		},
		unmaskAsNumber: {
			type: Boolean,
			default: () => false,
		},
		type: {
			type: String as PropType<'text' | 'email' | 'tel' | 'numeric'>,
			default: () => 'text',
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
		maskType: {
			type: String as PropType<MaskType>,
			default: () => null,
		},
		errors: {
			type: Array as PropType<string[] | ErrorObject[]>,
			default: () => [],
		},
	},
	emits: ['update:modelValue'],
	computed: {
		value: {
			get(): string | number {
				return this.modelValue;
			},
			set(value: string) {
				if (this.unmaskAsNumber) {
					this.$emit('update:modelValue', parseFloat(value || '0'));
				} else {
					this.$emit('update:modelValue', value);
				}
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

		<input
			:id="id"
			v-model="value"
			v-mask:[getMask(maskType)]
			:placeholder="placeholder"
			:disabled="disabled"
			:readonly="readOnly"
			:required="required"
			:inputmode="type"
			:title="title"
			:name="name"
			type="text"
			class="input-text"
			:class="{ error: errors.length }"/>

		<template v-if="$slots.action" #action>
			<slot name="action"></slot>
		</template>
	</InputTemplate>
</template>

<style lang="sass">
.input-text
	flex: 1 1 auto
	width: 100%
	min-height: calc(2 * var(--di-border-width) + var(--di-font-size) * var(--di-line-height) + 2 * var(--di-py))
	padding: var(--di-py) var(--di-px)

	font-size: var(--di-font-size)
	line-height: var(--di-line-height)
	color: var(--di-color)

	border-style: solid
	border-width: var(--di-border-width)
	border-color: var(--di-border-color)
	border-radius: var(--di-border-radius)
	background-color: var(--color-neutral-100)

	white-space: nowrap
	overflow: hidden
	text-overflow: ellipsis
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
