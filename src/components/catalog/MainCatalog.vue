<script lang="ts">
import {defineComponent} from 'vue'
import BaseTabs, {Tab} from "@components/utils/ui/BaseTabs.vue";
import ProductCard from "@components/catalog/ProductCard.vue";
import CartBlock from "@components/cart/CartBlock.vue";
import {useProductsStore} from "@scripts/hooks/stateHooks/useProductsStore";
import {useBasketStore} from "@scripts/hooks/stateHooks/useBasketStore";

export default defineComponent({
	name: "MainCatalog",
	components: {CartBlock, ProductCard, BaseTabs},
	mixins: [useProductsStore, useBasketStore],
	data() {
		return {
			activeTab: 'all' as string | number,
		}
	},
	computed: {
		catalogTabs(): Tab[] {
			const categories = this.getCategories;
			const result: Tab[] = [
				{
					label: 'Все',
					value: 'all',
					disabled: false,
					tag: 'button',
				}
			];

			categories.forEach((category) => {
				if (this.getProductsByCategoryId(category.id).length > 0) {
					result.push({
						label: category.name,
						value: category.id,
						disabled: false,
						tag: 'button',
					})
				}
			})

			return result;
		},
		productCards() {
			if (this.activeTab === 'all' || typeof this.activeTab === 'string') {
				return this.getProducts;
			}

			return this.getProductsByCategoryId(this.activeTab);
		}
	},
	created() {
		this.requestCategories();
		this.requestProducts();
		this.requestBasket();
	}
})
</script>

<template>
	<section class="catalog">
		<div class="catalog__wrapper wrapper">
			<div class="catalog__filter">
				<BaseTabs v-model="activeTab" :tabs="catalogTabs"/>
			</div>
			<div class="catalog__items">
				<ProductCard v-for="product in productCards" :key="product.id" :product-data="product"/>
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
