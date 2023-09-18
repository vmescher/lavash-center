<script lang="ts">
import {defineComponent} from 'vue'
import CartItem from "@components/cart/CartItem.vue";
import {RouteNames} from "@scripts/router/types";

export default defineComponent({
	name: "CartBlock",
	components: {CartItem},
	setup() {
		return {
			RouteNames
		}
	},
})
</script>

<template>
	<article class="cart">
		<div class="cart__top">
			<h4 class="cart__title">Корзина</h4>
			<button class="cart__clear link">
				очистить корзину
			</button>
		</div>
		<div class="cart__items">
			<CartItem v-for="item in Array(12)" :key="item"/>
		</div>
		<div class="cart__bottom">
			<router-link :to="{name: RouteNames.ORDER_PAGE}" class="cart__confirm btn btn--color-secondary">
				<span class="btn__text">оформить заказ на</span>
				<span class="btn__text cart__price">1 680 ₽</span>
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
</style>
