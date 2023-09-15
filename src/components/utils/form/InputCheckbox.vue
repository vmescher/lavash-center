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
	--checkbox-size: #{rem(24)}

	--checkbox-color: var(--color-neutral-tertiary)
	--checkbox-color-focus: var(--color-neutral-tertiary)
	--checkbox-color-hover: var(--color-neutral-tertiary)
	--checkbox-color-active: var(--color-neutral-tertiary)
	--checkbox-color-hover-active: var(--color-neutral-tertiary)
	--checkbox-color-disabled: #FAF6EE
	--checkbox-color-disabled-active: var(--color-neutral-tertiary)

	--checkbox-bg: var(--color-neutral-tertiary)
	--checkbox-bg-focus: var(--color-neutral-tertiary)
	--checkbox-bg-hover: var(--color-neutral-tertiary)
	--checkbox-bg-active: var(--color-secondary)
	--checkbox-bg-hover-active: #BC4500
	--checkbox-bg-disabled: #FAF6EE
	--checkbox-bg-disabled-active: #E29D6E

	--checkbox-border-color: var(--color-neutral-tertiary)
	--checkbox-border-color-focus: var(--color-tertiary)
	--checkbox-border-color-hover: var(--color-secondary)
	--checkbox-border-color-active: var(--color-secondary)
	--checkbox-border-color-hover-active: #BC4500
	--checkbox-border-color-disabled: #FAF6EE
	--checkbox-border-color-disabled-active: #E29D6E

	--checkbox-border-width: 2px
	--checkbox-border-radius: #{rem(8)}


	position: relative

	flex: 1 1 auto
	width: 100%
	display: flex
	align-items: center

	&__checkmark
		display: flex
		align-items: center
		justify-content: center
		size: var(--checkbox-size)
		margin-right: rem(12)

		color: var(--checkbox-color)
		border-radius: var(--checkbox-border-radius)
		border-width: var(--checkbox-border-width)
		border-style: solid
		border-color: var(--checkbox-border-color)
		background-color: var(--checkbox-bg)

		transition: border-color .3s ease, background-color .3s ease

		&::before
			content: ''
			position: relative
			z-index: 10

			flex-shrink: 0
			flex-grow: 0
			display: none
			size: 75%

			mask-image: url("@img/icons/check.svg")
			mask-position: center
			mask-size: contain
			background-color: currentColor
			pointer-events: none

	&__value
		font-size: var(--di-font-size)
		font-weight: var(--di-font-weight)
		line-height: var(--di-line-height)

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
					--checkbox-border-color: var(--checkbox-border-color-focus)
					--checkbox-bg: var(--checkbox-bg-focus)
					--checkbox-color: var(--checkbox-color-focus)

		&:checked:focus-visible
			& + .input-checkbox
				&__checkmark
					outline: 2px solid var(--checkbox-border-color-focus)
					outline-offset: 2px

	+hover
		--checkbox-border-color: var(--checkbox-border-color-hover)
		--checkbox-bg: var(--checkbox-bg-hover)
		--checkbox-color: var(--checkbox-color-hover)

	&.disabled
		--checkbox-border-color: var(--checkbox-border-color-disabled)
		--checkbox-bg: var(--checkbox-bg-disabled)
		--checkbox-color: var(--checkbox-color-disabled)

		cursor: not-allowed

	&.readonly:not(.disabled)
		--checkbox-border-color: var(--checkbox-border-color-readonly)
		--checkbox-bg: var(--checkbox-bg-readonly)
		--checkbox-color: var(--checkbox-color-readonly)

		cursor: help

	&.error
		--checkbox-border-color: var(--checkbox-border-color-error)
		--checkbox-bg: var(--checkbox-bg-error)
		--checkbox-color: var(--checkbox-color-error)

	&.active
		--checkbox-color: var(--checkbox-color-active)
		--checkbox-bg: var(--checkbox-bg-active)
		--checkbox-border-color: var(--checkbox-border-color-active)

		& .input-checkbox
			&__checkmark

				&::before
					display: block

		+hover
			--checkbox-color: var(--checkbox-color-hover-active)
			--checkbox-bg: var(--checkbox-bg-hover-active)
			--checkbox-border-color: var(--checkbox-border-color-hover-active)

		&.disabled
			--checkbox-border-color: var(--checkbox-border-color-disabled-active)
			--checkbox-bg: var(--checkbox-bg-disabled-active)
			--checkbox-color: var(--checkbox-color-disabled-active)

			cursor: not-allowed
</style>
