<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {MaskType} from '@scripts/consts/masks';
import {getMask} from '@scripts/mixins/getMask';
import {ErrorObject} from '@vuelidate/core';
import InputTemplate from '@components/utils/templates/form/InputTemplate.vue';
import Slider from '@vueform/slider';

type FormatTooltipsObject = {
	prefix?: string;
	suffix?: string;
	decimals?: number;
	thousands?: string;
};
export default defineComponent({
	name: 'InputRange',
	components: {InputTemplate, Slider},
	mixins: [getMask],
	props: {
		modelValue: {
			type: [Number, Array] as PropType<number | [number, number]>,
			default: () => null,
		},
		min: {
			type: Number,
			default: () => 0,
		},
		max: {
			type: Number,
			default: () => 100,
		},
		step: {
			type: Number,
			default: () => 1,
		},
		tooltips: {
			type: Boolean,
			default: () => false,
		},
		tooltipMerge: {
			type: Number,
			default: () => -1,
		},
		tooltipFormat: {
			type: [Function, Object] as PropType<
				((value: number) => string | number) | FormatTooltipsObject
			>,
			default: null,
		},
		tooltipPosition: {
			type: String as PropType<'top' | 'bottom' | 'left' | 'right'>,
			default: () => 'bottom',
		},
		id: {
			type: String,
			default: () => '',
		},
		label: {
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
		leftPrefix: {
			type: String,
			default: () => 'from',
		},
		rightPrefix: {
			type: String,
			default: () => 'to',
		},
		suffix: {
			type: String,
			default: () => '',
		},
		maskType: {
			type: String as PropType<Extract<MaskType, 'integerMask' | 'decimalMask'>>,
			default: () => 'integerMask',
		},
		errors: {
			type: Array as PropType<string[] | ErrorObject[]>,
			default: () => [],
		},
	},
	emits: ['update:modelValue'],
	data() {
		return {
			currentVal: 0 as number | [number, number],
		};
	},
	computed: {
		value: {
			get(): number | [number, number] {
				return this.modelValue ?? this.currentVal;
			},
			set(value: number | [number, number]) {
				this.currentVal = value;
				this.$emit('update:modelValue', value);
			},
		},
		inputMask() {
			return {
				...this.getMask(this.maskType),
				postProcess: (rawValue: string) => {
					const value = parseFloat(rawValue);
					if (Number.isNaN(value)) {
						return 0;
					}
					if (value < this.min) {
						return this.min;
					}
					if (value > this.max) {
						return this.max;
					}
					return value;
				},
			};
		},
	},
});
</script>

<template>
	<InputTemplate :id="id" :label="label" tag="span" :errors="errors">
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value="labelValue"></slot>
		</template>

		<div
			class="input-range"
			:title="title"
			:class="[{ error: errors.length }, { disabled: disabled }, { readonly: readOnly }]">
			<div class="input-range__wrapper">
				<template v-if="Array.isArray(value)">
					<label class="input-range__input-wrapper">
						<span v-if="leftPrefix" class="input-range__prefix">{{ leftPrefix }}</span>
						<input
							:id="`${id}-1`"
							v-model="value[0]"
							v-mask:[inputMask]
							:disabled="disabled"
							:readonly="readOnly"
							:required="required"
							inputmode="numeric"
							:name="name"
							type="text"
							class="input-range__input input-range__input--left"/>
					</label>
					<label class="input-range__input-wrapper">
						<span v-if="rightPrefix" class="input-range__prefix">{{ rightPrefix }}</span>
						<input
							:id="`${id}-2`"
							v-model="value[1]"
							v-mask:[inputMask]
							:disabled="disabled"
							:readonly="readOnly"
							:required="required"
							inputmode="numeric"
							:name="name"
							type="text"
							class="input-range__input input-range__input--right"/>
						<span v-if="suffix" class="input-range__suffix">{{ suffix }}</span>
					</label>
				</template>
				<label v-else class="input-range__input-wrapper">
					<span v-if="leftPrefix" class="input-range__prefix">{{ leftPrefix }}</span>
					<input
						:id="id"
						v-model="value"
						v-mask:[inputMask]
						:disabled="disabled"
						:readonly="readOnly"
						:required="required"
						inputmode="numeric"
						:name="name"
						type="text"
						class="input-range__input input-range__input--single"/>
					<span v-if="suffix" class="input-range__suffix">{{ suffix }}</span>
				</label>
			</div>
			<Slider
				v-model="value"
				:min="min"
				:max="max"
				:tooltips="disabled ? false : tooltips"
				:step="step"
				:format="tooltipFormat"
				:merge="tooltipMerge"
				:tooltip-position="tooltipPosition"
				:disabled="disabled || readOnly"
				class="input-range__slider"/>
		</div>

		<template v-if="$slots.action" #action>
			<slot name="action"></slot>
		</template>
	</InputTemplate>
</template>

<style lang="sass">
@import '@vueform/slider/themes/default.css'

.input-range
	position: relative

	flex: 1 1 auto

	&__wrapper
		width: 100%
		min-height: calc(2 * var(--di-border-width) + var(--di-font-size) * var(--di-line-height) + 2 * var(--di-py))
		display: flex
		align-items: center
		justify-content: stretch
		gap: calc(var(--di-px) / 2)

		font-size: var(--di-font-size)
		line-height: var(--di-line-height)
		color: var(--di-color)

		border-style: solid
		border-width: var(--di-border-width)
		border-color: var(--di-border-color)
		border-radius: var(--di-border-radius)
		background-color: var(--color-neutral-100)

		transition: border-color .3s ease, background-color .3s ease

	&__input-wrapper
		display: flex
		align-items: center
		justify-content: flex-start
		flex: 1 1 auto
		gap: calc(var(--di-px) / 2)
		padding: var(--di-py) var(--di-px)

		cursor: inherit

		&:first-child:not(:only-child)
			padding-right: 0

		&:last-child:not(:only-child)
			padding-left: 0

	&__input
		flex: 1 1 75%
		width: 100%
		max-width: rem(75)
		min-width: rem(30)
		margin: 0
		padding: 0

		border: none
		border-radius: 0
		background-color: transparent

		text-align: center
		white-space: nowrap
		overflow: hidden
		text-overflow: ellipsis
		cursor: inherit

		&--single
			max-width: rem(125)

	&__prefix
		flex: 1 0 25%
		max-width: max-content

		font-size: var(--di-font-size)
		line-height: var(--di-line-height)
		color: var(--di-border-color)
		white-space: nowrap
		overflow: hidden
		text-overflow: ellipsis

	&__suffix
		flex-shrink: 0

		font-size: var(--di-font-size)
		line-height: var(--di-line-height)
		color: var(--di-border-color)
		white-space: nowrap

	&__slider
		position: absolute
		bottom: -1px
		left: var(--di-border-width)

		width: calc(100% - 2 * var(--di-border-width))

		--slider-bg: var(--color-neutral-300)
		--slider-connect-bg: var(--color-primary-500)
		--slider-connect-bg-disabled: var(--di-border-color-disabled)
		--slider-height: #{rem(8)}
		--slider-vertical-height: #{rem(300)}
		--slider-radius: var(--radius-xl)

		--slider-handle-bg: var(--color-neutral-100)
		--slider-handle-border: #{rem(6)} solid var(--color-primary-500)
		--slider-handle-width: #{rem(22)}
		--slider-handle-height: #{rem(22)}
		--slider-handle-radius: 50%
		--slider-handle-shadow: none
		--slider-handle-shadow-active: none
		--slider-handle-ring-width: 0
		--slider-handle-ring-color: transparent

		--slider-tooltip-font-size: var(--fontSizeP3)
		--slider-tooltip-line-height: var(--lineHeightP2)
		--slider-tooltip-font-weight: 700
		--slider-tooltip-min-width: #{rem(20)}
		--slider-tooltip-bg: var(--color-primary-500)
		--slider-tooltip-bg-disabled: var(--di-border-color-disabled)
		--slider-tooltip-color: var(--color-neutral-100)
		--slider-tooltip-radius: var(--radius-m)
		--slider-tooltip-py: #{rem(2)}
		--slider-tooltip-px: #{rem(6)}
		--slider-tooltip-arrow-size: #{rem(6)}
		--slider-tooltip-distance: #{rem(2)}

	+hover
		& .input-range
			&__wrapper
				border-color: var(--di-border-color-hover)

	&:focus-within
		& .input-range
			&__wrapper
				border-color: var(--di-border-color-active)

	&.disabled
		& .input-range
			&__wrapper
				background-color: var(--di-bg-disabled)
				border-color: var(--di-border-color-disabled)
				color: var(--di-color-disabled)
				cursor: not-allowed

			&__suffix,
			&__prefix
				color: var(--di-color-disabled)

			&__slider
				--slider-handle-border: #{rem(6)} solid var(--di-border-color-disabled)

	&.readonly:not(.disabled)
		& .input-range
			&__wrapper
				cursor: help

			&__slider
				--slider-handle-border: #{rem(6)} solid var(--di-border-color-disabled)
				--slider-connect-bg-disabled: var(--color-primary-500)

	&.error
		& .input-range
			&__wrapper
				border-color: var(--di-border-color-error)
				color: var(--di-color-error)

			&__suffix,
			&__prefix
				color: var(--di-color-error)
</style>
