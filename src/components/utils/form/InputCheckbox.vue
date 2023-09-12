<script lang="ts">
import {defineComponent, PropType} from 'vue';
import InputTemplate from '@components/utils/templates/form/InputTemplate.vue';
import {ErrorObject} from '@vuelidate/core';

export default defineComponent({
	name: 'InputCheckbox',
	components: {InputTemplate},
	props: {
		modelValue: {
			type: Boolean,
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
		name: {
			type: String,
			default: () => '',
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
	data() {
		return {
			isChecked: false,
		};
	},
	computed: {
		value: {
			get(): boolean {
				return this.modelValue ?? this.isChecked;
			},
			set(value: boolean): void {
				this.isChecked = value;
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
			class="input-checkbox"
			:title="title"
			:class="[
				{ active: value },
				{ error: errors.length },
				{ disabled: disabled },
				{ readonly: readOnly },
			]">
			<input
				:id="id"
				v-model="value"
				type="checkbox"
				:disabled="disabled || readOnly"
				:required="required"
				:name="name"
				:readonly="readOnly"
				class="input-checkbox__input"/>
			<span class="input-checkbox__checkmark"></span>
			<span class="input-checkbox__value">
				{{ text }}
			</span>
		</label>

		<template v-if="$slots.action" #action>
			<slot name="action"></slot>
		</template>
	</InputTemplate>
</template>

<style scoped lang="sass">
.input-checkbox
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
		border-radius: var(--di-border-radius)
		border-width: 2px
		border-style: solid
		border-color: var(--di-border-color)
		background-color: var(--di-bg)

		transition: border-color .3s ease, background-color .3s ease

		&::before
			content: ''
			position: relative
			z-index: 10

			flex-shrink: 0
			flex-grow: 0
			display: none
			size: 50%

			mask-image: url("@/assets/icons/checkmark.svg")
			mask-position: center
			mask-size: contain
			background-color: currentColor
			pointer-events: none

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
			& + .input-checkbox
				&__checkmark
					border-color: var(--di-border-color-active)
					background-color: var(--di-bg-focus)

		&:checked:focus-visible
			& + .input-checkbox
				&__checkmark
					outline: 2px solid var(--di-bg-focus)
					outline-offset: rem(2)


	+hover
		& .input-checkbox
			&__checkmark
				border-color: var(--di-border-color-hover)

	&.disabled
		cursor: not-allowed

		& .input-checkbox
			&__checkmark
				border-color: var(--di-border-color-disabled)

			&__value
				color: var(--di-color-disabled)

	&.readonly:not(.disabled)
		cursor: help

	&.error
		& .input-checkbox
			&__checkmark
				border-color: var(--di-border-color-error)

	&.active
		& .input-checkbox
			&__checkmark
				background-color: var(--di-border-color-active)
				border-color: transparent

				&::before
					display: block

		+hover
			& .input-checkbox
				&__checkmark
					background-color: var(--di-border-color-hover)

		&.disabled
			& .input-checkbox
				&__checkmark
					background-color: var(--di-border-color-disabled)
					border-color: transparent
</style>
