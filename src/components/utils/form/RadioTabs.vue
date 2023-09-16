<script lang="ts">
import {defineComponent, PropType} from 'vue'

export type RadioTab = {
	title: string
	description?: string
	note?: string
	disabled?: boolean
	value: string | number
}

export default defineComponent({
	name: "RadioTabs",
	props: {
		modelValue: {
			type: [String, Number],
			default: () => null,
		},
		tabs: {
			type: Array as PropType<RadioTab[]>,
			required: true,
			default: () => [],
		}
	},
	emits: ['update:modelValue'],
	data() {
		return {
			activeTab: this.modelValue,
		}
	},
	computed: {
		value: {
			get(): number | string {
				return this.modelValue ?? this.activeTab;
			},
			set(value: string | number) {
				this.activeTab = value;
				this.$emit('update:modelValue', value);
			}
		}
	}
})
</script>

<template>
	<div class="radio-tabs">
		<ul class="radio-tabs__list">
			<li v-for="tab in tabs" :key="tab.value" class="radio-tabs__item">
				<label class="radio-tab" :class="[{disabled: tab.disabled}, {active: tab.value === value}]">
					<span class="radio-tab__title">{{ tab.title }}</span>
					<span v-if="tab.description" class="radio-tab__description">{{ tab.description }}</span>
					<span v-if="tab.note" class="radio-tab__note">{{ tab.note }}</span>
					<span class="radio-tab__checkmark"></span>
					<input v-model="value" type="radio" :value="tab.value" :disabled="tab.disabled" name="radio-tabs" class="radio-tab__input">
				</label>
			</li>
		</ul>
	</div>
</template>

<style scoped lang="sass">
.radio-tabs
	&__list
		display: grid
		grid-template-columns: repeat(2, minmax(0, 1fr))
		grid-auto-rows: minmax(0, 1fr)
		gap: rem(24)

	&__item
		display: block

.radio-tab
	position: relative

	width: 100%
	height: 100%
	display: flex
	flex-direction: column
	align-items: flex-start
	padding: rem(32)

	color: var(--color-primary)
	background-color: var(--color-neutral-tertiary)
	border-radius: var(--radius-block-secondary)
	transition: color .3s ease, background-color .3s ease

	&.active
		color: var(--color-neutral-tertiary)
		background-color: var(--color-secondary)

		&.disabled
			background-color: #FAF6EE

		& .radio-tab
			&__note
				color: inherit

			&__checkmark
				background-color: var(--color-neutral-tertiary)

				&::before
					display: block

	&.disabled
		color: #90867A
		background-color: #FAF6EE

		cursor: not-allowed

		& .radio-tab
			&__note
				color: inherit

	&__title
		font-family: var(--font-secondary)
		font-size: var(--fontSizeH5)
		font-weight: 700
		line-height: var(--lineHeightH3)
		text-transform: uppercase

		&:not(:last-child)
			margin-bottom: rem(12)

	&__note,
	&__description
		max-width: 80%
		font-size: var(--fontSizeP1)
		font-weight: 500
		line-height: var(--lineHeightP1)

	&__description
		&:not(:last-child)
			margin-bottom: rem(40)

	&__note
		margin-top: auto
		color: var(--color-neutral-secondary)

	&__checkmark

		position: absolute
		right: rem(32)
		top: rem(32)

		display: flex
		align-items: center
		justify-content: center
		size: rem(28)

		color: var(--color-primary)
		border-radius: rem(10)
		background-color: var(--color-neutral-fifth)

		transition: background-color .3s ease

		&::before
			content: ''
			position: relative
			z-index: 10

			flex-shrink: 0
			flex-grow: 0
			display: none
			size: 70%

			mask-image: url("@img/icons/check.svg")
			mask-position: center
			mask-size: contain
			background-color: currentColor
			pointer-events: none

	&__input
		appearance: none
		position: absolute
		top: 0
		left: 0
		width: 0
		height: 0
		opacity: 0


</style>
