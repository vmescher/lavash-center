<script lang="ts">
import {defineComponent, PropType} from 'vue';

export default defineComponent({
	name: 'InputSearch',
	props: {
		modelValue: {
			type: String,
			default: () => '',
		},
		id: {
			type: String,
			default: () => '',
		},
		tooltips: {
			type: Array as PropType<string[]>,
			default: () => [],
		},
		name: {
			type: String,
			default: () => '',
		},
		placeholder: {
			type: String,
			default: () => '',
		},
		disabled: {
			type: Boolean,
			default: () => false,
		},
		title: {
			type: String,
			default: () => '',
		},
	},
	emits: ['update:modelValue', 'search'],
	data() {
		return {
			isFocus: false,
		};
	},
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
	methods: {
		setValue(value: string): void {
			this.value = value;
		},
		handleFocusOut(): void {
			this.isFocus = false;
		},
		handleFocusIn(): void {
			if (this.disabled) return;
			this.isFocus = true;
		},
		handleSearch(): void {
			if (this.disabled) return;
			this.$emit('search', this.value);
		},
	},
});
</script>

<template>
	<div v-click-outside="handleFocusOut" class="input-search" @focusin="handleFocusIn">
		<div class="input-search__wrapper">
			<input
				:id="id"
				v-model="value"
				:placeholder="placeholder"
				:disabled="disabled"
				inputmode="text"
				:title="title"
				:name="name"
				type="text"
				class="input-search__input"/>

			<div class="input-search__icons">
				<span
					v-if="value"
					aria-hidden="true"
					tabindex="0"
					role="button"
					class="input-search__clear"
					@click="setValue('')"
					@keydown.enter="setValue('')">
					<span class="input-search__clear-icon"></span>
				</span>
				<span
					v-if="isFocus"
					aria-hidden="true"
					tabindex="0"
					role="button"
					class="input-search__confirm"
					@click="handleSearch"
					@keydown.enter="handleSearch">
					<span class="input-search__confirm-icon"></span>
				</span>
				<span
					v-else
					aria-hidden="true"
					tabindex="0"
					role="button"
					class="input-search__lens"
					:class="{ disabled: disabled }"
					@click="handleSearch"
					@keydown.enter="handleSearch">
					<span class="input-search__lens-icon"></span>
				</span>
			</div>
		</div>
		<div v-show="tooltips.length && isFocus" class="input-search__dropdown">
			<ul class="input-search__tooltips">
				<li
					v-for="tooltip in tooltips"
					:key="tooltip"
					tabindex="0"
					role="button"
					class="input-search__tooltip"
					@click="setValue(tooltip)"
					@keydown.enter="setValue(tooltip)">
					{{ tooltip }}
				</li>
			</ul>
		</div>
	</div>
</template>

<style lang="sass">
.input-search
	position: relative

	--search-lens-size: #{rem(20)}
	--search-clear-size: #{rem(20)}
	--search-confirm-size: #{rem(20)}

	&__wrapper
		position: relative
		display: flex
		min-width: rem(250)

	&__input
		flex: 1 1 auto
		width: 100%
		min-height: calc(2 * var(--di-border-width) + var(--di-font-size) * var(--di-line-height) + 2 * var(--di-py))
		padding: var(--di-py) calc(var(--search-confirm-size) + var(--search-clear-size) + var(--di-px) / 2 + var(--di-px)) var(--di-py) var(--di-px)

		font-size: var(--di-font-size)
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

	&__icons
		position: absolute
		top: 50%
		right: var(--di-px)

		display: flex
		align-items: center
		gap: calc(var(--di-px) / 4)

		transform: translateY(-50%)

	&__lens,
	&__clear,
	&__confirm
		flex-shrink: 0
		flex-grow: 0
		cursor: pointer

		transition: color .3s ease

		&-icon
			display: inline-block
			size: 100%
			mask-size: contain
			mask-repeat: no-repeat

	&__lens
		size: var(--search-lens-size)
		color: var(--di-border-color)

		&-icon
			background-color: currentColor
			mask-image: url('@/assets/icons/lens.svg')

		+hover
			color: var(--di-border-color-active)

		&.disabled
			cursor: not-allowed
			color: var(--di-border-color-disabled)

	&__clear
		size: var(--search-clear-size)
		color: var(--di-border-color)

		&-icon
			background-color: currentColor
			mask-image: url('@/assets/icons/close.svg')

		+hover
			color: var(--di-border-color-active)

	&__confirm
		size: var(--search-clear-size)
		color: var(--di-border-color-hover)

		&-icon
			background-color: currentColor
			mask-image: url('@/assets/icons/arrow-right.svg')

		+hover
			color: var(--di-border-color-active)

	&__dropdown
		position: absolute
		left: calc(var(--di-border-width) * -1)
		right: calc(var(--di-border-width) * -1)
		bottom: 0
		z-index: 100

		display: flex
		flex-direction: column
		padding: fluid(4, 8)
		margin-top: calc(var(--di-border-width, 1px) * -1)
		outline: none
		max-height: rem(225)

		border-radius: var(--di-border-radius)
		background: var(--di-bg, #FFFFFF)
		transform: translateY(calc(100% + rem(6)))

	&__tooltips
		display: flex
		flex-direction: column
		padding-right: fluid(12, 16)
		gap: rem(2)
		max-height: 100%

		-webkit-overflow-scrolling: touch
		overflow-y: scroll
		+Vscroll

	&__tooltip
		padding: fluid(10, 14.5) fluid(12, 16)
		display: flex
		align-items: center
		justify-content: flex-start

		font-size: var(--di-font-size)
		line-height: var(--di-line-height)
		text-decoration: none
		text-align: left

		border-radius: var(--di-border-radius)
		cursor: pointer

		+hover
			background-color: var(--color-primary-trans-100)

		&:focus
			outline: none

		&:focus-visible
			background-color: var(--color-primary-trans-100)
</style>
