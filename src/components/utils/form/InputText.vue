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

		<template v-if="$slots.underInput" #underInput>
			<slot name="underInput"></slot>
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
	font-weight: var(--di-font-weight)
	line-height: var(--di-line-height)
	color: var(--di-color)

	border-style: solid
	border-width: var(--di-border-width)
	border-color: var(--di-border-color)
	border-radius: var(--di-border-radius)

	background-color: var(--di-bg)

	white-space: nowrap
	overflow: hidden
	text-overflow: ellipsis
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
