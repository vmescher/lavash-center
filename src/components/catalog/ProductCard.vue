<script lang="ts">
import {defineComponent} from 'vue'
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import InputCounter from "@components/utils/form/InputCounter.vue";

export default defineComponent({
	name: "ProductCard",
	components: {InputCounter, IconSVG},
	data() {
		return {
			showCounter: false,
		}
	},
})
</script>

<template>
	<div class="product-card">
		<div class="product-card__body">
			<div class="product-card__picture">
				<img class="product-card__image" src="/img/products/product-1.png" alt="Фото лаваша">
			</div>
			<div class="product-card__content">
				<div class="product-card__info">
					<h3 class="product-card__name">Лаваш острый красный тонкий на огне</h3>
					<p class="product-card__text">100 г/шт</p>
				</div>
				<span class="product-card__price">168 ₽</span>
			</div>
		</div>
		<div class="product-card__actions">
			<button v-if="!showCounter" class="product-card__action btn" @click="showCounter = true">
				<span class="btn__text">В корзину</span>
				<IconSVG name="plus" class="btn__icon"/>
			</button>
			<InputCounter v-else class="product-card__action" />
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
