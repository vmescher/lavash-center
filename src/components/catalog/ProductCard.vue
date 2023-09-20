<script lang="ts">
import {defineComponent, PropType} from 'vue'
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import InputCounter from "@components/utils/form/InputCounter.vue";
import {Product} from "@scripts/api/products/types";
import {useBasketStore} from "@scripts/hooks/stateHooks/useBasketStore";
import debounce from "@scripts/utils/debounce";
import {imageLoadHandler} from "@scripts/mixins/imageLoadHandler";

export default defineComponent({
	name: "ProductCard",
	components: {InputCounter, IconSVG},
	mixins: [useBasketStore, imageLoadHandler],
	props: {
		productData: {
			type: Object as PropType<Product>,
			required: true,
			default: () => ({}),
		}
	},
	data() {
		return {
			changeQuantityHandler: debounce(this.changeQuantity, 500),
		}
	},
	computed: {
		getProductPrice(): string {
			return this.productData.price.toLocaleString('ru-RU', {
				style: 'currency',
				currency: 'RUB',
				minimumFractionDigits: 0,
				maximumFractionDigits: 2,
			})
		},
		productQuantity() {
			return this.getBasketProductById(this.productData.id)?.quantity || 0;
		}
	},
	methods: {
		addToBasket(): void {
			this.requestAddToBasket({
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
	<div class="product-card">
		<div class="product-card__body">
			<div class="product-card__picture">
				<img class="product-card__image" :class="{'product-card__image--hidden' : !imageLoadError || !productData.picture }" :src="productData.picture" :alt="`Фото ${productData.name}`" @error="imageErrorHandler">
			</div>
			<div class="product-card__content">
				<div class="product-card__info">
					<h3 class="product-card__name">{{ productData.name }}</h3>
					<p class="product-card__text">{{ productData.unit }}</p>
				</div>
				<span class="product-card__price">{{ getProductPrice }}</span>
			</div>
		</div>
		<div class="product-card__actions">
			<button v-if="!isProductInBasket(productData.id)" class="product-card__action btn" @click="addToBasket">
				<span class="btn__text">В корзину</span>
				<IconSVG name="plus" class="btn__icon"/>
			</button>
			<InputCounter v-else :model-value="productQuantity" class="product-card__action" @increment="changeQuantity" @decrement="changeQuantity" @change="changeQuantityHandler"/>
		</div>
	</div>
</template>

<style scoped lang="sass">
.product-card
	display: grid
	grid-template-columns: 100%
	grid-template-rows: minmax(0, 1fr) auto
	grid-gap: rem(16)

	+hover
		.product-card
			&__body
				background-color: var(--color-tertiary)

			&__picture
				color: var(--color-neutral-tertiary)

	&__body
		padding: rem(32) 0

		background-color: var(--color-neutral-fourth)
		border-radius: var(--radius-product)

		cursor: pointer
		transition: background-color .3s ease

	&__picture
		position: relative
		z-index: 0

		padding: rem(20) rem(56)
		width: 100%

		color: var(--color-neutral-primary)

		transition: color .3s ease

		&::before
			content: ''
			position: absolute
			top: 50%
			left: 0
			z-index: -1

			width: 100%
			height: 22.5%

			background-color: currentColor

			mask-image: url("@img/base-pattern.svg")
			mask-repeat: repeat-x
			mask-position: 6% 50%
			mask-size: auto 100%

			transform: translateY(-50%)

	&__image
		display: block
		width: 100%
		height: auto
		aspect-ratio: 28 / 25

		object-fit: contain

		&--hidden
			visibility: hidden

	&__content
		padding: rem(8) rem(32) rem(0)
		display: flex
		flex-direction: column
		align-items: center
		gap: rem(24)

	&__info
		display: flex
		flex-direction: column
		align-items: center
		gap: rem(8)

	&__name
		font-size: var(--fontSizeP1)
		font-weight: 600
		line-height: var(--lineHeightP1)
		text-align: center

	&__text
		font-size: var(--fontSizeP3)
		font-weight: 500
		line-height: var(--fontSizeP1)
		color: var(--color-neutral-secondary)
		text-align: center

	&__price
		font-family: var(--font-secondary)
		font-size: var(--fontSizeH4)
		font-weight: 700
		line-height: var(--lineHeightH3)
		text-transform: uppercase
		text-align: center

	&__actions
		display: flex
		align-items: center
		justify-content: center
		gap: rem(8)

	&__action
		width: 100%
		max-width: rem(162)

</style>
