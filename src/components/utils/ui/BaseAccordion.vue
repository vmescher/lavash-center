<script lang="ts">
import {defineComponent, PropType} from 'vue';
import IconSVG from '@components/utils/templates/ui/IconSVG.vue';

export default defineComponent({
	name: 'BaseAccordion',
	components: {IconSVG},
	props: {
		disabled: {
			type: Boolean,
			default: false,
		},
		pointerSide: {
			type: String as PropType<'ltl' | 'rtl'>,
			default: 'rtl',
		},
		theme: {
			type: String as PropType<'default' | 'secondary' | 'backdrop'>,
			default: 'default',
		},
	},
	data() {
		return {
			isOpen: false,
			scrollHeight: '0px',
			transitionDuration: '0.3s',
		};
	},
	methods: {
		toggleDropdown() {
			if (this.disabled) return;

			if (this.isOpen) {
				this.calculateSizes(this.$refs.dropdown as Element);
			}

			this.isOpen = !this.isOpen;
		},
		calculateSizes(el: Element): void {
			this.scrollHeight = `${el.scrollHeight}px`;
			this.transitionDuration = `${Math.max(0.3, Math.min(1.5, el.scrollHeight / 1000))}s`;
		},
	},
});
</script>

<template>
	<div
		class="accordion"
		:class="[
			{ disabled: disabled },
			{ active: isOpen },
			`accordion--${theme}`,
			`accordion--${pointerSide}`,
		]">
		<div class="accordion__header" @click="toggleDropdown">
			<p class="accordion__title">
				<slot name="title"></slot>
			</p>
			<button class="accordion__icon" :disabled="disabled">
				<slot name="icon">
					<IconSVG class="accordion__icon-image" :name="isOpen ? 'minus' : 'plus'"/>
				</slot>
			</button>
		</div>
		<transition name="accordion" @enter="calculateSizes">
			<div
				v-show="isOpen"
				ref="dropdown"
				class="accordion__dropdown"
				:style="`--accordion-dropdown-height: ${scrollHeight}; --accordion-dropdown-transition-duration: ${transitionDuration}`">
				<div class="accordion__body">
					<slot name="body"></slot>
				</div>
			</div>
		</transition>
	</div>
</template>

<style scoped lang="sass">
.accordion
	--accordion-px: 0rem
	--accordion-py: 0rem
	--accordion-bg: transparent
	--accordion-bg-hover: transparent
	--accordion-active-bg: transparent
	--accordion-bg-disabled: transparent
	--accordion-border: none
	--accordion-border-radius: 0

	--accordion-header-cursor: pointer

	--accordion-title-size: var(--fontSizeH6)
	--accordion-title-line-height: var(--lineHeightH2)
	--accordion-title-color: inherit
	--accordion-title-color-hover: inherit
	--accordion-title-color-disabled: var(--color-neutral-400)

	--accordion-icon-size: #{fluid(32, 40)}
	--accordion-icon-gap: #{fluid(16, 20)}
	--accordion-icon-color: var(--color-neutral-500)
	--accordion-icon-color-hover: var(--color-neutral-500)
	--accordion-icon-color-disabled: var(--color-neutral-trans-500)
	--accordion-icon-color-active: var(--color-neutral-100)
	--accordion-icon-background: var(--color-neutral-100)
	--accordion-icon-background-hover: var(--color-primary-trans-100)
	--accordion-icon-background-active: var(--color-primary-500)
	--accordion-icon-background-disabled: var(--color-transparent-30)
	--accordion-icon-line-color: var(--color-primary-300)
	--accordion-icon-line-size: 2px
	--accordion-icon-line-offset: #{rem(2)}

	--accordion-dropdown-height: 0px
	--accordion-dropdown-gap: #{fluid(16, 20)}
	--accordion-dropdown-px: 0rem
	--accordion-dropdown-py: 0rem
	--accordion-dropdown-transition-duration: 0.3s

	padding: var(--accordion-py) var(--accordion-px)

	background-color: var(--accordion-bg)
	border: var(--accordion-border)
	border-radius: var(--accordion-border-radius)

	transition: background-color .3s ease

	&__header
		display: flex
		justify-content: space-between
		gap: var(--accordion-icon-gap)

		cursor: var(--accordion-header-cursor)

		&:focus-within
			--accordion-icon-background: var(--accordion-icon-background-hover)

	&__title
		flex: 1 1 auto

		color: var(--accordion-title-color)
		font-size: var(--accordion-title-size)
		line-height: var(--accordion-title-line-height)

	&__icon
		display: flex
		align-items: center
		justify-content: center
		flex-shrink: 0
		size: var(--accordion-icon-size)

		color: var(--accordion-icon-color)
		border: none
		border-radius: 50%
		background-color: var(--accordion-icon-background)

		transition: color .3s ease, background-color .3s ease

		+hover
			background-color: var(--accordion-icon-background-hover)

		&:disabled
			pointer-events: none

		&:focus-visible
			background-color: var(--accordion-icon-background-hover)

		&-image
			size: 60%

	&__body
		padding: var(--accordion-dropdown-gap, var(--accordion-dropdown-py)) calc(var(--accordion-dropdown-px) + var(--accordion-icon-size) + var(--accordion-icon-gap)) var(--accordion-dropdown-py) var(--accordion-dropdown-px)

	&.disabled
		--accordion-bg: var(--accordion-bg-disabled)
		--accordion-header-cursor: not-allowed

		--accordion-title-color: var(--accordion-title-color-disabled)

		--accordion-icon-color: var(--accordion-icon-color-disabled)
		--accordion-icon-background: var(--accordion-icon-background-disabled)

	&.active
		--accordion-bg: var(--accordion-active-bg)

		--accordion-icon-color: var(--accordion-icon-color-active)
		--accordion-icon-background: var(--accordion-icon-background-active)

	&--secondary
		--accordion-px: #{rem(16)}
		--accordion-py: #{rem(24)}
		--accordion-active-bg: var(--color-primary-300)
		--accordion-border-radius: var(--radius-xl)

		--accordion-dropdown-py: #{rem(16)}

	&--backdrop
		--accordion-px: #{rem(24)}
		--accordion-py: #{rem(24)}
		--accordion-bg: var(--color-neutral-100)
		--accordion-bg-hover: var(--color-primary-trans-100)
		--accordion-bg-disabled: var(--color-transparent-30)
		--accordion-active-bg: var(--color-primary-300)
		--accordion-border-radius: var(--radius-xl)

		--accordion-icon-background: var(--color-neutral-200)

		--accordion-dropdown-py: #{rem(16)}

		&:focus-within
			--accordion-bg: var(--accordion-bg-hover)
			--accordion-icon-background: var(--accordion-icon-background-hover)

	&--ltl
		& .accordion
			&__header
				flex-direction: row-reverse

			&__body
				padding: var(--accordion-dropdown-gap, var(--accordion-dropdown-py)) var(--accordion-dropdown-px) var(--accordion-dropdown-py) calc(var(--accordion-dropdown-px) + var(--accordion-icon-size) + var(--accordion-icon-gap))

.accordion-enter-active,
.accordion-leave-active
	transition: height var(--accordion-dropdown-transition-duration) ease
	overflow: hidden

.accordion-enter-to,
.accordion-leave-from
	height: var(--accordion-dropdown-height)

.accordion-enter-from,
.accordion-leave-to
	height: 0
</style>
