<script lang="ts">
import {defineComponent, PropType} from 'vue'
import InputCounter from "@components/utils/form/InputCounter.vue";
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import {ProductInBasket} from "@scripts/api/basket/types";
import debounce from "@scripts/utils/debounce";
import {useBasketStore} from "@scripts/hooks/stateHooks/useBasketStore";
import {imageLoadHandler} from "@scripts/mixins/imageLoadHandler";
import {getFormattedPrice} from "../../scripts/mixins/getFormattedPrice";

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
		theme: {
			type: String as PropType<'big' | 'default'>,
			default: 'default',
		},
	},
	data() {
		return {
			changeQuantityHandler: debounce(this.changeQuantity, 500),
		}
	},
	computed: {
		productQuantity() {
			return this.getBasketProductById(this.productData.id)?.quantity || 0;
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
		<div class="cart-item__picture">
			<img v-if="!imageLoadError && productData.picture" class="cart-item__image" :src="productData.picture" :alt="`Фото ${productData.name}`" @error="imageErrorHandler">
		</div>
		<div class="cart-item__body">
			<div class="cart-item__clear">
				<button class="link link--color-secondary" @click="deleteFromBasket">
					<IconSVG name="close" class="link__icon"/>
				</button>
			</div>

			<div class="cart-item__info">
				<p class="cart-item__name">{{ productData.name }}</p>
				<span class="cart-item__text">{{ productData.unit }}</span>
			</div>
			<div class="cart-item__total">
				<span class="cart-item__price">{{ getFormattedPrice(productData.price) }}</span>
				<InputCounter :model-value="productQuantity" class="cart-item__counter" :theme="theme === 'default' ? 'light' : 'bright'" :size="theme === 'default' ? 'small' : 'default'"  @increment="changeQuantity" @decrement="changeQuantity" @change="changeQuantityHandler"/>
			</div>
		</div>
	</article>
</template>

<style scoped lang="sass">
.cart-item
	position: relative

	display: flex
	align-items: flex-start
	gap: rem(20)

	& + .cart-item
		padding-top: rem(26)

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
		size: rem(120)
		padding: rem(8)
		flex-shrink: 0

		background-color: var(--color-neutral-primary)
		border-radius: var(--radius-picture)

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

	&__info
		max-width: rem(235)
		display: flex
		align-items: flex-start
		flex-direction: column
		gap: rem(8)

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
		display: flex
		align-items: center
		justify-content: flex-end
		gap: rem(20)

	&__price
		font-family: var(--font-secondary)
		font-size: var(--fontSizeH4)
		font-weight: 700
		line-height: var(--lineHeightH3)
		text-transform: uppercase
		text-align: center

	&--theme
		&-big
			gap: rem(24)
			padding-right: rem(16)

			& .cart-item
				&__picture
					size: rem(148)
					padding: rem(24)

					background-color: var(--color-neutral-fourth)

				&__name
					font-size: var(--fontSizePBig)

				&__info
					max-width: rem(360)
					gap: rem(12)

				&__text
					font-size: var(--fontSizeP2)

				&__clear
					opacity: 1
</style>
