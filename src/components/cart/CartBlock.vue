<script lang="ts">
import {defineComponent} from 'vue'
import CartItem from "@components/cart/CartItem.vue";
import {RouteNames} from "@scripts/router/types";
import {useBasketStore} from "@scripts/hooks/stateHooks/useBasketStore";
import {getFormattedPrice} from "@scripts/mixins/getFormattedPrice";

export default defineComponent({
	name: "CartBlock",
	components: {CartItem},
	mixins: [useBasketStore, getFormattedPrice],
	setup() {
		return {
			RouteNames
		}
	},
	created() {
		if (this.getBasket.length === 0) {
			this.requestBasket();
		}
	},
})
</script>

<template>
	<article class="cart">
		<div class="cart__top">
			<h4 class="cart__title">Корзина</h4>
			<button v-if="getBasket.length" class="cart__clear link" @click="requestClearBasket">
				очистить корзину
			</button>
		</div>

		<div v-if="getBasket.length" class="cart__items">
			<CartItem v-for="product in getBasket" :key="product.id" :product-data="product"/>
		</div>
		<div v-else class="cart__empty">
			<div class="cart-empty">
				<div class="cart-empty__picture">
					<img class="cart-empty__image" src="@img/cart/cart-empty.svg">
				</div>
				<span class="cart-empty__text">В вашей корзине пока пусто.</span>
			</div>
		</div>

		<div v-if="getBasket.length" class="cart__bottom">
			<router-link :to="{name: RouteNames.ORDER_PAGE}" class="cart__confirm btn btn--color-secondary">
				<span class="btn__text">оформить заказ на</span>
				<span class="btn__text cart__price">{{ getFormattedPrice(getBasketTotalPrice) }}</span>
			</router-link>
		</div>
	</article>
</template>

<style scoped lang="sass">
.cart
	display: grid
	grid-template-columns: 100%
	grid-template-rows: auto minmax(0, 1fr) auto
	grid-gap: 0

	border-radius: var(--radius-block-secondary)
	background-color: var(--color-neutral-tertiary)

	overflow: hidden
	transform: translate3d(0, 0, 1px)

	&__top
		padding: rem(32) rem(32) rem(20)
		display: flex
		justify-content: space-between
		align-items: flex-end
		gap: rem(32)

		box-shadow: var(--shadow-primary-down)

	&__title
		font-family: var(--font-secondary)
		font-size: var(--fontSizeH4)
		font-weight: 700
		line-height: var(--lineHeightH3)
		text-transform: uppercase

	&__items
		padding: rem(24) rem(32)
		display: flex
		flex-direction: column
		gap: rem(24)

		overflow-y: auto
		+Vscroll

	&__empty
		padding: rem(32) rem(48)
		display: flex
		justify-content: center
		align-items: center

	&__bottom
		padding: rem(24) rem(32)
		display: flex
		align-items: center
		gap: rem(8)

		box-shadow: var(--shadow-primary-up)

	&__confirm
		flex: 1 1 auto
		justify-content: space-between

	&__price
		font-size: var(--fontSizeH4)
		font-weight: 700

.cart-empty
	position: relative

	display: flex
	flex-direction: column
	justify-content: center
	align-items: center
	gap: rem(16)
	width: 100%
	height: 100%

	&::before
		content: ""
		position: absolute
		top: 0
		left: 0
		right: 0
		bottom: 0
		z-index: 1

		display: block
		margin: auto
		width: 100%
		height: 100%

		background-color: rgba(var(--color-neutral-fifth-rgb), 0.3)
		mask-image: url("@img/cart/cart-pattern.svg")
		mask-repeat: no-repeat
		mask-size: contain
		mask-position: center

	&__picture
		width: rem(164)
		height: rem(164)

	&__image
		display: block
		width: 100%
		height: 100%
		object-fit: contain

	&__text
		font-size: var(--fontSizePBig)
		font-weight: 600
		line-height: var(--lineHeightP1)

</style>
