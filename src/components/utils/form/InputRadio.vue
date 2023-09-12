<script lang="ts">
import {defineComponent, PropType} from 'vue';
import InputTemplate from '@components/utils/templates/form/InputTemplate.vue';
import {ErrorObject} from '@vuelidate/core';

export default defineComponent({
	name: 'InputRadio',
	components: {InputTemplate},
	props: {
		modelValue: {
			type: [String, Number],
			default: () => '',
		},
		radioValue: {
			type: [String, Number],
			required: true,
			default: () => null,
		},
		id: {
			type: String,
			default: () => '',
		},
		name: {
			type: String,
			required: true,
			default: () => '',
		},
		label: {
			type: String,
			default: () => '',
		},
		text: {
			type: String,
			default: () => null,
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
			set(value: string | number): void {
				this.$emit('update:modelValue', value);
			},
		},
	},
});
</script>

<template>
	<InputTemplate :label="label" :errors="errors" tag="span">
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value="labelValue"></slot>
		</template>

		<label
			class="input-radio"
			:title="title"
			:class="[
				{ active: value === radioValue },
				{ error: errors.length },
				{ disabled: disabled },
				{ readonly: readOnly },
			]">
			<input
				:id="id"
				v-model="value"
				type="radio"
				:disabled="disabled || readOnly"
				:required="required"
				:readonly="readOnly"
				:name="name"
				:value="radioValue"
				class="input-radio__input"/>
			<span class="input-radio__checkmark"></span>
			<span class="input-radio__value">
				{{ text || radioValue }}
			</span>
		</label>

		<template v-if="$slots.action" #action>
			<slot name="action"></slot>
		</template>
	</InputTemplate>
</template>

<style scoped lang="sass">
.input-radio
	position: relative

	flex: 1 1 auto
	width: 100%
	display: flex
	align-items: center

	&__checkmark
		display: flex
		align-items: center
		justify-content: center
		size: fluid(20, 40)
		margin-right: rem(16)

		color: var(--color-neutral-100)
		border-width: 2px
		border-style: solid
		border-color: var(--di-border-color)
		border-radius: 50%
		background-color: var(--di-bg)

		transition: border-color .3s ease, background-color .3s ease

		&::before
			content: ''
			position: relative
			z-index: 10

			flex-shrink: 0
			flex-grow: 0
			display: none
			size: 40%

			border-radius: 50%
			background-color: currentColor

	&__value
		font-size: var(--di-font-size)
		line-height: var(--di-line-height)
		color: var(--di-color)

	&__input
		appearance: none
		position: absolute
		top: 0
		left: 0
		width: 0
		height: 0
		opacity: 0

		&:focus-visible:not(&:checked)
			& + .input-radio
				&__checkmark
					border-color: var(--di-border-color-active)
					background-color: var(--di-bg-focus)

		&:checked:focus-visible
			& + .input-radio
				&__checkmark
					outline: 2px solid var(--di-bg-focus)
					outline-offset: rem(2)


	+hover
		& .input-radio
			&__checkmark
				border-color: var(--di-border-color-hover)

	&.disabled
		cursor: not-allowed

		& .input-radio
			&__checkmark
				border-color: var(--di-border-color-disabled)

			&__value
				color: var(--di-color-disabled)

	&.readonly:not(.disabled)
		cursor: help

	&.error
		& .input-radio
			&__checkmark
				border-color: var(--di-border-color-error)

	&.active
		& .input-radio
			&__checkmark
				background-color: var(--di-border-color-active)
				border-color: transparent

				&::before
					display: block

		+hover
			& .input-radio
				&__checkmark
					background-color: var(--di-border-color-hover)

		&.disabled
			& .input-radio
				&__checkmark
					background-color: var(--di-border-color-disabled)
					border-color: transparent
</style>
