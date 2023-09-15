<script lang="ts">
import {defineComponent} from 'vue'
import BaseTabs from "@components/utils/ui/BaseTabs.vue";
import ProductCard from "@components/catalog/ProductCard.vue";
import CartBlock from "@components/cart/CartBlock.vue";

export default defineComponent({
	name: "MainCatalog",
	components: {CartBlock, ProductCard, BaseTabs},
	computed: {
		catalogTabs() {
			return [
				{
					label: 'Все',
					value: 'all',
					disabled: false,
					tag: 'button',
				},
				{
					label: 'Лаваш',
					value: 'lavash',
					disabled: false,
					tag: 'button',
				},
				{
					label: 'Булочки',
					value: 'buns',
					disabled: false,
					tag: 'button',
				}
			]
		}
	}
})
</script>

<template>
	<section class="catalog">
		<div class="catalog__wrapper wrapper">
			<div class="catalog__filter">
				<BaseTabs :tabs="catalogTabs"/>
			</div>
			<div class="catalog__items">
				<ProductCard v-for="card in Array(9)" :key="card"/>
			</div>
			<CartBlock class="catalog__cart"/>
		</div>
	</section>
</template>

<style scoped lang="sass">
.catalog
	&__wrapper
		display: grid
		grid-template-columns: repeat(12, minmax(0, 1fr))
		grid-gap: rem(48) rem(24)
		align-items: flex-start

	&__filter
		grid-column: 1 / -1

	&__items
		grid-column: 1 / span 7
		display: grid
		grid-template-columns: repeat(3, minmax(0, 1fr))
		grid-auto-rows: minmax(0, 1fr)
		grid-gap: rem(40) rem(24)
		align-items: flex-start

	&__cart
		position: sticky
		top: rem(32)

		grid-column: 8 / -1
		max-height: calc(var(--window-height) - rem(32) * 2)
		min-height: calc(var(--window-height) - rem(32) * 2)
		max-width: rem(605)
		width: 100%
		justify-self: flex-end

		will-change: scroll-position

</style>
