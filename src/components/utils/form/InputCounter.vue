<script lang="ts">
import {defineComponent, PropType} from 'vue'
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";

export default defineComponent({
	name: "InputCounter",
	components: {IconSVG},
	props: {
		modelValue: {
			type: Number as PropType<number | null>,
			default: null,
		},
		min: {
			type: Number,
			default: 1,
		},
		max: {
			type: Number,
			default: 999,
		},
		theme: {
			type: String as PropType<'dark' | 'light' | 'bright'>,
			default: 'dark',
		},
		size: {
			type: String as PropType<'small' | 'default'>,
			default: 'default',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['update:modelValue', 'increment', 'decrement', 'change'],
	data() {
		return {
			currentValue: 1,
		}
	},
	computed: {
		value: {
			get(): number {
				return this.modelValue ?? this.currentValue;
			},
			set(value: number) {

				let newValue = value;

				if (value < this.min) {
					newValue = this.min;
				}

				if (value > this.max) {
					newValue = this.max;
				}

				this.currentValue = newValue;
				this.$emit('update:modelValue', newValue);
			},
		},
	},
	methods: {
		increment() {
			if (this.value < this.max) {
				this.$emit('increment', this.value + 1);
				this.value += 1;
			}
		},
		decrement() {
			if (this.value > this.min) {
				this.$emit('decrement', this.value - 1);
				this.value -= 1;
			}
		},
		inputHandler(e: Event) {
			const target = e.target as HTMLInputElement;
			let value = Number(target.value);

			if (value < this.min) {
				value = this.min;
			}

			if (value > this.max) {
				value = this.max;
			}

			this.$emit('change', value);
		}
	},
})
</script>

<template>
<article class="counter" :class="[`counter--theme-${theme}`, `counter--size-${size}`]">
	<div class="counter__wrapper">
		<button class="counter__button" :disabled="disabled" @click.prevent="decrement">
			<IconSVG name="minus" class="counter__button-icon"/>
		</button>

		<input v-model="value" class="counter__input" type="number" :disabled="disabled" :min="min" :max="max" @input="inputHandler"/>

		<button class="counter__button" :disabled="disabled" @click.prevent="increment">
			<IconSVG name="plus" class="counter__button-icon"/>
		</button>
	</div>
</article>
</template>

<style scoped lang="sass">
.counter
	--counter-px: #{rem(22)}
	--counter-py: #{rem(14)}
	--counter-gap: #{rem(8)}
	--counter-width: #{rem(128)}

	--counter-font-family: var(--font-secondary)
	--counter-font-size: var(--fontSizeP1)
	--counter-line-height: var(--lineHeightP1)
	--counter-font-weight: 600
	--counter-text-transform: uppercase

	--counter-color: var(--color-primary)

	--counter-bg: var(--color-neutral-primary)

	--counter-border-size: 2px
	--counter-border-color: transparent

	--counter-radius: var(--radius-btn)

	--counter-icon-size: #{rem(20)}

	padding: var(--counter-py) var(--counter-px)
	min-height: calc(var(--counter-font-size) * var(--counter-line-height) + var(--counter-py) * 2 + var(--counter-border-size) * 2)
	min-width: var(--counter-width)

	color: var(--counter-color)
	background-color: var(--counter-bg)
	border: var(--counter-border-size) solid var(--counter-border-color)
	border-radius: var(--counter-radius)

	transition: color .3s ease, border-color .3s ease, background-color .3s ease

	&__wrapper
		max-width: 100%
		display: flex
		align-items: center
		justify-content: space-between
		gap: var(--counter-gap)

	&__input
		display: block
		min-width: rem(44)
		height: calc(var(--counter-font-size) * var(--counter-line-height))
		flex: 1 1 auto

		font-family: var(--counter-font-family)
		font-size: var(--counter-font-size)
		line-height: 1
		font-weight: var(--counter-font-weight)
		color: currentColor
		text-transform: var(--counter-text-transform)
		text-align: center
		text-overflow: ellipsis
		overflow: hidden
		white-space: nowrap

		border: none
		outline: none
		appearance: none
		-moz-appearance: textfield

		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button
			-webkit-appearance: none
			margin: 0

	&__button
		display: block
		size: var(--counter-icon-size)
		flex: none

		&-icon
			size: 100%
			color: currentColor

	&--theme
		&-dark
			--counter-color: var(--color-neutral-tertiary)
			--counter-bg: var(--color-secondary)

		&-bright
			--counter-bg: var(--color-neutral-tertiary)


	&--size
		&-small
			--counter-py: #{rem(10)}

</style>
