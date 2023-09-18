<script lang="ts">
import {defineComponent, PropType} from 'vue';
import InputTemplate from "@components/utils/templates/form/InputTemplate.vue";
import {ErrorObject} from "@vuelidate/core";

export default defineComponent({
	name: 'InputSearch',
	components: {InputTemplate},
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
		label: {
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
		errors: {
			type: Array as PropType<string[] | ErrorObject[]>,
			default: () => [],
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
	<InputTemplate :id="id" :label="label" :errors="errors">
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value="labelValue"></slot>
		</template>

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

		<template v-if="$slots.action" #action>
			<slot name="action"></slot>
		</template>

		<template v-if="$slots.underInput" #underInput>
			<slot name="underInput"></slot>
		</template>

	</InputTemplate>
</template>

<style lang="sass">
.input-search
	position: relative

	flex: 1 1 auto
	width: 100%

	&__wrapper
		position: relative
		display: flex
		min-width: rem(400)


	&__input
		flex: 1 1 auto
		width: 100%
		min-height: calc(2 * var(--di-border-width) + var(--di-font-size) * var(--di-line-height) + 2 * var(--di-py))
		padding: var(--di-py) calc(var(--di-icon-size) * 2 + var(--di-px) / 2 + var(--di-px)) var(--di-py) var(--di-px)

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
			--di-border-color: var(--di-border-color-error)
			--di-placeholder-color: var(--di-color-error)

	&__icons
		position: absolute
		top: calc(50% - var(--di-icon-size) / 2)
		right: var(--di-px)

		display: flex
		align-items: center
		gap: calc(var(--di-px) / 4)

	&__lens,
	&__clear
		flex-shrink: 0
		flex-grow: 0
		size: var(--di-icon-size)
		cursor: pointer

		transition: color .3s ease

		&-icon
			display: inline-block
			size: 100%

			background-color: currentColor
			mask-size: contain
			mask-repeat: no-repeat

	&__lens
		color: var(--di-color)

		&-icon
			mask-image: url('@img/icons/search.svg')

		+hover
			color: var(--color-secondary)

		&.disabled
			cursor: not-allowed
			color: var(--di-color-disabled)

	&__clear
		color: var(--di-color-disabled)

		&-icon
			mask-image: url('@/assets/icons/close.svg')

		+hover
			color: var(--di-color)

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
		max-height: rem(298)

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
			background-color: var(--color-secondary)

		&:focus
			outline: none

		&:focus-visible
			outline: 2px solid var(--color-tertiary)
			outline-offset: 2px
</style>
