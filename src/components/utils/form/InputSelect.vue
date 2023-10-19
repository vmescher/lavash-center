<script lang="ts">
import {defineComponent, PropType} from 'vue';
import InputTemplate from '@components/utils/templates/form/InputTemplate.vue';
import {ErrorObject} from '@vuelidate/core';

export default defineComponent({
	name: 'InputSelect',
	components: {InputTemplate},
	props: {
		id: {
			type: String,
			default: () => '',
		},
		label: {
			type: String,
			default: () => '',
		},
		errors: {
			type: Array as PropType<string[] | ErrorObject[]>,
			default: () => [],
		},
	},
});
</script>

<template>
	<InputTemplate :id="id" :label="label" :errors="errors">
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value="labelValue"></slot>
		</template>

		<slot></slot>

		<template v-if="$slots.action" #action>
			<slot name="action"></slot>
		</template>

		<template v-if="$slots.underInput" #underInput>
			<slot name="underInput"></slot>
		</template>
	</InputTemplate>
</template>

<style lang="sass">
@import '@vueform/multiselect/themes/default.scss'

.input-select
	position: relative

	flex: 1 1 auto
	width: 100%

	&.multiselect
		--ms-font-size: var(--di-font-size)
		--ms-line-height: var(--di-line-height)
		--ms-bg: var(--di-bg)
		--ms-bg-disabled: var(--di-bg-disabled)
		--ms-border-color: var(--di-border-color)
		--ms-border-width: var(--di-border-width)
		--ms-border-color-active: var(--di-border-color-focus)
		--ms-border-width-active: var(--di-border-width)
		--ms-radius: var(--di-border-radius)
		--ms-py: var(--di-py)
		--ms-px: var(--di-px)
		--ms-ring-width: 0
		--ms-ring-color: none
		--ms-placeholder-color: var(--di-placeholder-color)
		--ms-max-height: #{rem(230)}

		--ms-spinner-color: var(--di-color)
		--ms-caret-color: var(--di-color)
		--ms-clear-color: var(--di-color-disabled)
		--ms-clear-color-hover: var(--di-color)

		--ms-tag-font-size: #{fluid(12, 14)}
		--ms-tag-line-height: #{rem(20)}
		--ms-tag-font-weight: 700
		--ms-tag-bg: var(--color-secondary)
		--ms-tag-bg-disabled: #FAF6EE
		--ms-tag-color: var(--color-neutral-tertiary)
		--ms-tag-color-disabled: var(--color-neutral-secondary)
		--ms-tag-radius: #{rem(8)}
		--ms-tag-py: #{rem(2)}
		--ms-tag-px: #{rem(8)}
		--ms-tag-my: #{rem(4)}
		--ms-tag-mx: #{rem(4)}

		--ms-tag-remove-radius: #{rem(8)}
		--ms-tag-remove-py: #{rem(4)}
		--ms-tag-remove-px: #{rem(4)}
		--ms-tag-remove-my: 0
		--ms-tag-remove-mx: #{rem(2)}

		--ms-dropdown-bg: var(--di-bg)
		--ms-dropdown-border-color: transparent
		--ms-dropdown-border-width: 0
		--ms-dropdown-radius: var(--radius-picture)

		--ms-group-label-py: #{fluid(10, 14.5)}
		--ms-group-label-px: #{fluid(12, 16)}
		--ms-group-label-line-height: var(--di-line-height)
		--ms-group-label-bg: transparent
		--ms-group-label-color: var(--di-color)
		--ms-group-label-bg-pointed: #E36821
		--ms-group-label-color-pointed: var(--color-neutral-tertiary)
		--ms-group-label-bg-disabled: #FAF6EE
		--ms-group-label-color-disabled: var(--color-neutral-secondary)
		--ms-group-label-bg-selected: var(--color-secondary)
		--ms-group-label-color-selected: var(--color-neutral-tertiary)
		--ms-group-label-bg-selected-pointed: #BC4500
		--ms-group-label-color-selected-pointed: var(--color-neutral-tertiary)
		--ms-group-label-bg-selected-disabled: #FAF6EE
		--ms-group-label-color-selected-disabled: var(--color-neutral-secondary)

		--ms-option-font-size: var(--di-font-size)
		--ms-option-line-height: var(--di-line-height)
		--ms-option-bg-pointed: #E36821
		--ms-option-color-pointed: var(--color-neutral-tertiary)
		--ms-option-bg-selected: var(--color-secondary)
		--ms-option-color-selected: var(--color-neutral-tertiary)
		--ms-option-bg-disabled: #FAF6EE
		--ms-option-color-disabled: var(--color-neutral-secondary)
		--ms-option-bg-selected-pointed: #BC4500
		--ms-option-color-selected-pointed: var(--color-neutral-tertiary)
		--ms-option-bg-selected-disabled: #FAF6EE
		--ms-option-color-selected-disabled: var(--color-neutral-secondary)
		--ms-option-py: #{fluid(10, 14.5)}
		--ms-option-px: #{fluid(12, 16)}

		--ms-empty-color: var(--di-color)

		color: var(--di-color)

		transition: border-color .3s ease

		&.is-open
			border-radius: var(--ms-radius)

		&.is-disabled:not(.is-readonly)
			--ms-border-color: var(--di-border-color-disabled)
			--ms-placeholder-color: var(--di-color-disabled)
			--ms-caret-color: var(--di-color-disabled)
			--ms-color: var(--di-color-disabled)

			& .multiselect
				&-wrapper
					cursor: not-allowed

		&.is-readonly
			--ms-bg-disabled: var(--di-bg)

			& .multiselect
				&-wrapper
					cursor: help

		&.is-error
			--ms-border-color: var(--di-border-color-error)
			--ms-placeholder-color: var(--di-color-error)
			--ms-caret-color: var(--di-color-error)

		+hover
			--ms-border-color: var(--di-border-color-hover)


		& .multiselect
			&-wrapper
				min-height: calc(var(--ms-font-size) * var(--ms-line-height) + 2 * var(--ms-py))

			&-search
				padding-right: calc(var(--ms-px) * 2.5 + var(--di-icon-size) * 2)

			&-caret
				size: var(--di-icon-size)

				mask-image: url('@img/icons/chevron-down.svg')

			&-clear
				size: var(--di-icon-size)
				padding: rem(1)
				margin: 0 calc(var(--ms-px) / 2) 0 0

				&-icon
					size: 100%

					mask-image: url('@img/icons/close.svg')

			&-spinner
				size: var(--di-icon-size)

				mask-image: url('@img/icons/spinner.svg')

			&-dropdown
				padding: fluid(4, 8)

				border-radius: var(--ms-dropdown-radius)

				transform: translateY(calc(100% + rem(6)))
				overflow: initial

			&-options
				padding-right: var(--ms-dropdown-px)
				gap: rem(2)
				max-height: 100%
				overflow-y: auto

				+Vscroll

			&-option
				border-radius: var(--ms-radius)

			&-tag
				white-space: initial

			&-group
				gap: rem(2)
				display: flex
				flex-direction: column

				&-label


					font-size: var(--ms-font-size)
					font-weight: 400

					border-radius: var(--ms-radius)

				&-options
					gap: rem(2)
					display: flex
					flex-direction: column

					& .multiselect-option
						&::before
							content: '—'
							margin-right: rem(8)
</style>
