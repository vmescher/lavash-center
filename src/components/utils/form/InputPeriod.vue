<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {DatePicker} from 'v-calendar';
import {ErrorObject} from '@vuelidate/core';
import InputTemplate from '@components/utils/templates/form/InputTemplate.vue';

export type PeriodValueType = {
	start: number | string | Date | null;
	end: number | string | Date | null;
} | null


export default defineComponent({
	name: 'InputPeriod',
	components: {
		InputTemplate,
		DatePicker,
	},
	props: {
		modelValue: {
			type: Object as unknown as PropType<PeriodValueType>,
			default: () => null,
		},
		id: {
			type: String,
			default: () => '',
		},
		dateMask: {
			type: String,
			default: () => 'DD.MM.YYYY',
		},
		label: {
			type: String,
			default: () => '',
		},
		placeholderStart: {
			type: String,
			default: () => 'дд.мм.гггг',
		},
		placeholderEnd: {
			type: String,
			default: () => 'дд.мм.гггг',
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
		maxDate: {
			type: Object as PropType<Date>,
			default: () => null,
		},
		minDate: {
			type: Object as PropType<Date>,
			default: () => null,
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
			range: {
				start: null,
				end: null,
			} as PeriodValueType,
		};
	},
	computed: {
		getInputMask() {
			return {
				mask: this.dateMask.replaceAll(/\w/gi, '#'),
			};
		},
		getDatePickerMasks() {
			return {
				input: this.dateMask,
			};
		},
		value: {
			get(): PeriodValueType {
				return this.modelValue ?? this.range;
			},
			set(value: PeriodValueType) {
				this.range = value;
				this.$emit('update:modelValue', value);
			},
		},
	},
});
</script>

<template>
	<InputTemplate :id="id" :label="label" tag="span" :errors="errors">
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value="labelValue"></slot>
		</template>

		<DatePicker
			v-model.range="value"
			color="orange"
			:masks="getDatePickerMasks"
			:max-date="maxDate"
			:min-date="minDate">

			<template #default="{ inputValue, inputEvents }">
				<div class="input-period">
					<div class="input-period__body" :class="[{ error: errors.length }, { disabled: disabled }, {'read-only': readOnly}]">
						<div class="input-period__item">
							<input
									:id="id"
									v-mask:[getInputMask]
									:value="inputValue.start"
									:placeholder="placeholderStart"
									:disabled="disabled"
									:readonly="readOnly"
									:required="required"
									:title="title"
									type="text"
									class="input-period__input"
									v-on="(!readOnly && !disabled && inputEvents.start) || {}"
							/>
						</div>
						<span class="input-period__divider">-</span>
						<div class="input-period__item">
							<input
									v-mask:[getInputMask]
									:value="inputValue.end"
									:placeholder="placeholderEnd"
									:disabled="disabled"
									:readonly="readOnly"
									:required="required"
									:title="title"
									type="text"
									class="input-period__input"
									v-on="(!readOnly && !disabled && inputEvents.end) || {}"
							/>
						</div>
					</div>
					<span aria-hidden="true" class="input-period__icon">
						<span class="input-period__icon-image"></span>
					</span>
				</div>
			</template>
		</DatePicker>

		<template v-if="$slots.action" #action>
			<slot name="action"></slot>
		</template>
	</InputTemplate>
</template>

<style lang="sass">
@import 'v-calendar/dist/style.css'

.input-period
	position: relative
	width: 100%

	&__body
		flex: 1 1 auto
		display: flex
		align-items: center
		gap: rem(8)
		width: 100%
		min-height: calc(2 * var(--di-border-width) + var(--di-font-size) * var(--di-line-height) + 2 * var(--di-py))
		padding: var(--di-py) calc(var(--di-px) + var(--di-icon-size) + var(--di-px) / 2) var(--di-py) var(--di-px)

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

		&:not(.read-only)
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

		&.disabled
			--di-color: var(--di-color-disabled)
			--di-border-color: var(--di-border-color-disabled)
			--di-bg: var(--di-bg-disabled)
			--di-placeholder-color: var(--di-color-disabled)

			cursor: not-allowed

			& + .input-date__icon
				color: var(--di-border-color-disabled)

		&.read-only:not(.disabled)
			--di-color: var(--di-color-readonly)
			--di-border-color: var(--di-border-color-readonly)
			--di-bg: var(--di-bg-readonly)

			cursor: help

		&.error
			--di-border-color: var(--di-border-color-error)
			--di-placeholder-color: var(--di-color-error)

	&__item
		display: block
		flex: 0 1 rem(90)

	&__input
		border: none
		outline: none
		background-color: transparent
		width: 100%

	&__icon
		position: absolute
		top: calc(50% - var(--di-icon-size) / 2)
		right: var(--di-px)

		display: inline-block
		size: var(--di-icon-size)

		color: var(--di-color)

		transition: color .3s ease
		pointer-events: none

		&-image
			display: inline-block
			size: 100%

			mask-size: contain
			background-color: currentColor
			mask-image: url('@img/icons/calendar.svg')

	&.error
		--di-border-color: var(--di-border-color-error)
		--di-placeholder-color: var(--di-color-error)

		& .input-period
			&__icon
				color: var(--di-border-color-error)

</style>
