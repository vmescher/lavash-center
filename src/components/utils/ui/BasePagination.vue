<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {VueAwesomePaginate} from 'vue-awesome-paginate';
import IconSVG from '@components/utils/templates/ui/IconSVG.vue';

export default defineComponent({
	name: 'BasePagination',
	components: {IconSVG, VueAwesomePaginate},
	props: {
		modelValue: {
			type: Number,
			default: () => null,
		},
		total: {
			type: Number,
			required: true,
		},
		limit: {
			type: Number,
			default: () => 10,
		},
		maxButtons: {
			type: Number,
			default: () => 5,
		},
		type: {
			type: String as PropType<'button' | 'link'>,
			default: () => 'button',
		},
		hideButtons: {
			type: Boolean,
			default: () => false,
		},
		arrowsStyle: {
			type: String as PropType<'default'>,
			default: () => 'default',
		},
		colorScheme: {
			type: String as PropType<'default'>,
			default: () => 'default',
		},
	},
	emits: ['update:modelValue', 'change'],
	data() {
		return {
			activePage: 1,
		};
	},
	computed: {
		value: {
			get(): number {
				return this.modelValue ?? this.activePage;
			},
			set(value: number) {
				this.activePage = value;
				this.$emit('update:modelValue', value);
				this.$emit('change', value);
			},
		},
		getArrowIcons() {
			return (direction: 'left' | 'right') => {
				switch (this.arrowsStyle) {
					case 'default':
						return direction === 'left' ? 'chevron-left' : 'chevron-right';
					default:
						return direction === 'left' ? 'chevron-left' : 'chevron-right';
				}
			};
		},
	},
});
</script>

<template>
	<vue-awesome-paginate
		v-model="value"
		:total-items="total"
		:items-per-page="limit"
		:show-ending-buttons="false"
		:max-pages-shown="maxButtons"
		:type="type"
		:hide-prev-next="hideButtons"
		pagination-container-class="pagination"
		:paginate-buttons-class="`pagination__button pagination__button--color-${colorScheme}`"
		disabled-paginate-buttons-class="disabled"
		number-buttons-class="pagination__button--number"
		active-page-class="active"
		back-button-class="pagination__button--back"
		next-button-class="pagination__button--next"
		last-button-class="pagination__button--number"
		first-button-class="pagination__button--number">
		<template #prev-button>
			<IconSVG class="pagination__button-icon" :name="getArrowIcons('left')"/>
		</template>
		<template #next-button>
			<IconSVG class="pagination__button-icon" :name="getArrowIcons('right')"/>
		</template>
	</vue-awesome-paginate>
</template>

<style lang="sass">
@import 'vue-awesome-paginate/dist/style.css'

.pagination
	display: flex
	justify-content: center
	align-items: center
	gap: rem(2)

	&__button
		display: inline-flex
		align-items: center
		justify-content: center
		size: rem(36)

		font-family: var(--font-secondary)
		font-size: var(--fontSizeP2)
		line-height: 1
		font-weight: 600

		border-radius: 50%
		border: none
		background-color: transparent

		transition: color .3s ease, background-color .3s ease

		&:focus
			outline: none

		&:focus-visible
			outline-width: 2px
			outline-style: solid
			outline-offset: 0

		&.disabled,
		&:disabled
			pointer-events: none

		&--back,
		&--next
			padding: rem(4)

			&:focus-visible
				outline-offset: -4px

		&--color
			&-default

				&:focus-visible
					outline-color: var(--color-tertiary)

				&.pagination__button
					&--number
						color: var(--color-primary)

						+hover
							background-color: var(--color-neutral-tertiary)

						&:active
							background-color: var(--color-secondary)
							color: var(--color-neutral-tertiary)

						&.disabled,
						&:disabled
							color: var(--color-neutral-secondary)
							background-color: var(--color-neutral-fifth)

						&.active
							background-color: var(--color-secondary)
							color: var(--color-neutral-tertiary)

							pointer-events: none

							&:focus-visible
								outline: none

					&--back,
					&--next
						color: var(--color-primary)

						+hover
							color: var(--color-secondary)

						&.disabled,
						&:disabled
							color: var(--color-neutral-secondary)

	&__button-icon
		display: block
		size: rem(24)

		color: currentColor

</style>
