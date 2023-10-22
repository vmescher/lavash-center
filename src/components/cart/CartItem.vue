<script lang="ts">
import {defineComponent, inject, PropType} from 'vue'
import InputCounter from "@components/utils/form/InputCounter.vue";
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import {ProductInBasket} from "@scripts/api/basket/types";
import debounce from "@scripts/utils/debounce";
import {useBasketStore} from "@scripts/hooks/stateHooks/useBasketStore";
import {imageLoadHandler} from "@scripts/mixins/imageLoadHandler";
import {getFormattedPrice} from "@scripts/mixins/getFormattedPrice";
import {ViewportNames} from "@scripts/hooks/useViewportHandler/types";

export default defineComponent({
	name: "CartItem",
	components: {IconSVG, InputCounter},
	mixins: [useBasketStore, imageLoadHandler, getFormattedPrice],
	props: {
		productData: {
			type: Object as PropType<ProductInBasket>,
			required: true,
			default: () => ({}),
		},
		editable: {
			type: Boolean,
			default: true,
		},
		theme: {
			type: String as PropType<'big' | 'default'>,
			default: 'default',
		},
	},
	emits: ['delete'],
	setup() {
		const viewportUntil = inject('viewportUntil') as (viewportName: ViewportNames) => boolean;
		return {
			viewportUntil
		}
	},
	data() {
		return {
			changeQuantityHandler: debounce<() => void>(this.changeQuantity, 500),
		}
	},
	methods: {
		deleteFromBasket(): void {
			this.requestDeleteFromBasket({
				productId: this.productData.id,
			})
		},
		changeQuantity(value: number): void {
			this.requestChangeQuantity({
				productId: this.productData.id,
				quantity: value,
			})
		},
	}
})
</script>

<template>
	<article class="cart-item" :class="`cart-item--theme-${theme}`">
		<div class="cart-item__picture" :class="{'cart-item__picture--empty' : imageLoadError || !productData.picture}">
			<img v-if="!imageLoadError && productData.picture" class="cart-item__image" :src="productData.picture" :alt="`Фото ${productData.name}`" @error="imageErrorHandler">
		</div>
		<div class="cart-item__body">
			<div v-if="editable" class="cart-item__clear">
				<button class="link link--color-secondary" :class="{'link--size-small': viewportUntil('mobile-xl')}" @click="deleteFromBasket">
					<IconSVG name="close" class="link__icon"/>
				</button>
			</div>

			<div class="cart-item__info">
				<p class="cart-item__name">{{ productData.name }}</p>
				<span class="cart-item__text">{{ productData.unit }}</span>
			</div>
			<div class="cart-item__total">
				<span class="cart-item__price">{{ getFormattedPrice(productData.price) }} <span v-if="!editable" class="cart-item__quantity">{{ productData.quantity }} шт</span></span>
				<InputCounter v-if="editable" :model-value="productData.quantity" class="cart-item__counter" :theme="theme === 'default' ? 'light' : 'bright'" :size="theme === 'default' ? 'small' : viewportUntil('mobile-xl') ? 'small' : 'default'"  @increment="changeQuantity" @decrement="changeQuantity" @change="changeQuantityHandler"/>
			</div>
		</div>
	</article>
</template>

<style scoped lang="sass">
.cart-item
	position: relative

	display: flex
	gap: rem(20)

	+while-mob-xl
		gap: rem(16)

	& + .cart-item
		padding-top: rem(26)

		+until-laptop
			padding-top: rem(18)

		&::before
			content: ''

			position: absolute
			top: 0
			left: 0

			width: 100%
			height: 2px

			background-color: var(--color-neutral-fifth)
			border-radius: var(--radius-divider)

	+hover
		.cart-item
			&__clear
				opacity: 1

	&__picture
		position: relative

		size: rem(120)
		padding: rem(8)
		flex-shrink: 0

		background-color: var(--color-neutral-primary)
		border-radius: var(--radius-picture)
		color: var(--color-neutral-tertiary)

		+until-laptop
			size: rem(100)

		+while-mob-xl
			size: rem(80)
			padding: rem(6)

		&--empty
			&::before
				content: ''
				position: absolute
				top: 50%
				left: 0

				width: 100%
				height: 22.5%

				background-color: currentColor

				mask-image: url("@img/base-pattern.svg")
				mask-repeat: repeat-x
				mask-position: 6% 50%
				mask-size: auto 100%

				transform: translateY(-50%)

	&__image
		width: 100%
		height: 100%

		object-fit: contain

	&__body
		position: relative

		flex: 1 1 auto
		display: flex
		flex-direction: column

	&__clear
		position: absolute
		right: 0
		top: 0

		opacity: 0
		transition: opacity .3s ease

		@media (hover: none)
			opacity: 1

	&__info
		max-width: rem(235)
		display: flex
		align-items: flex-start
		flex-direction: column
		gap: rem(8)

		+while-mob-xl
			max-width: rem(180)
			gap: rem(4)

	&__name
		font-size: var(--fontSizeP2)
		font-weight: 500
		line-height: var(--lineHeightP1)

		+cutString(2)

	&__text
		font-size: var(--fontSizeP3)
		font-weight: 500
		line-height: var(--lineHeightP1)
		color: var(--color-neutral-secondary)

	&__total
		margin-top: auto
		display: flex
		align-items: center
		justify-content: flex-end
		gap: rem(20)

		+while-mob-xl
			gap: rem(12)

	&__price
		display: inline-flex
		align-items: center
		gap: rem(8)

		font-family: var(--font-secondary)
		font-size: var(--fontSizeH4)
		font-weight: 700
		line-height: var(--lineHeightH3)
		text-transform: uppercase
		text-align: center

		+until-laptop
			font-size: var(--fontSizeH5)

	&__quantity
		font-family: var(--font-primary)
		font-size: var(--fontSizeP2)
		font-weight: 500
		line-height: var(--lineHeightP1)
		text-transform: lowercase

		&::before
			content: 'x'

			margin-right: rem(6)

	&--theme
		&-big
			gap: rem(24)

			+while-mob-xl
				gap: rem(16)

			& .cart-item
				&__picture
					size: rem(148)
					padding: rem(24)

					background-color: var(--color-neutral-fourth)

					+until-laptop
						size: rem(128)
						padding: rem(16)

					+while-mob-xl
						size: rem(80)
						padding: rem(6)

				&__name
					font-size: var(--fontSizePBig)

					+while-mob-xl
						font-size: var(--fontSizeP2)

				&__info
					max-width: rem(360)
					gap: rem(12)

					+while-mob-xl
						max-width: rem(180)
						gap: rem(4)

				&__text
					font-size: var(--fontSizeP2)

					+while-mob-xl
						font-size: var(--fontSizeP3)

				&__clear
					opacity: 1

		&-medium
			gap: rem(24)

			+while-mob-xl
				gap: rem(16)

			& .cart-item
				&__picture
					size: rem(128)
					padding: rem(16)

					background-color: var(--color-neutral-fourth)

					+until-laptop
						size: rem(100)
						padding: rem(8)

				&__name
					font-size: var(--fontSizeP1)

					+while-mob-xl
						font-size: var(--fontSizeP2)

				&__info
					max-width: rem(360)
					gap: rem(10)

					+while-mob-xl
						max-width: rem(180)
						gap: rem(4)

				&__text
					font-size: var(--fontSizeP2)

					+while-mob-xl
						font-size: var(--fontSizeP3)

				&__clear
					opacity: 1
</style>
