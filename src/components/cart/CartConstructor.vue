<script lang="ts">
import {defineComponent} from 'vue'
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import BaseTable from "@components/utils/templates/table/BaseTable.vue";
import {cartConstructorTableHead} from "@scripts/consts/tables";
import {ProductInBasket} from "@scripts/api/basket/types";
import {useBasketStore} from "@scripts/hooks/stateHooks/useBasketStore";
import CartConstructorItem from "@components/cart/CartConstructorItem.vue";
import {useProductsStore} from "@scripts/hooks/stateHooks/useProductsStore";

export default defineComponent({
	name: "CartConstructor",
	components: {CartConstructorItem, BaseTable, IconSVG},
	mixins: [useBasketStore, useProductsStore],
	setup() {
		return {
			cartConstructorTableHead
		}
	},
	data() {
		return {
			newItem: null as Partial<ProductInBasket> | null,
		}
	},
	computed: {
		isAllProductsSelected() {
			return this.getProducts.every((product) => this.isProductInBasket(product.id));
		}
	},
	created() {
		if (this.getBasket.length === 0) {
			this.requestBasket().then((response) => {
				if (response.length === 0) {
					this.addItem();
				}
			})
		}

		this.$watch('getBasket', (newValue) => {
			if (newValue.length === 0) {
				this.addItem();
			}
		})
	},
	methods: {
		addItem() {
			if (this.newItem) return;
			this.newItem = {
				id: null,
				name: '',
				price: 0,
				quantity: 1
			}
		},
		clearAdding() {
			this.newItem = null;
		}
	}
})
</script>

<template>
	<section class="cart-constructor">
		<div class="cart-constructor__top">
			<h4 class="cart-constructor__title">Товары в заказе</h4>
			<div class="cart-constructor__actions">
				<button class="btn btn--color-secondary" :disabled="newItem || isAllProductsSelected" :title="newItem ? 'У вас есть невыбранный товар' : isAllProductsSelected ? 'Все товары выбраны' : ''" @click.prevent="addItem">
					<span class="btn__text">Добавить товар</span>
					<IconSVG name="plus" class="btn__icon"/>
				</button>
			</div>
		</div>
		<div class="cart-constructor__products">
			<BaseTable :table-head="cartConstructorTableHead" with-actions>
				<CartConstructorItem v-if="newItem" :product-data="newItem" @add="clearAdding" @remove="clearAdding"/>
				<CartConstructorItem v-for="item in getBasket" :key="item.id" :product-data="item"/>
			</BaseTable>
		</div>
	</section>
</template>

<style scoped lang="sass">
.cart-constructor
	&__top
		display: flex
		align-items: center
		justify-content: space-between

		&:not(:last-child)
			margin-bottom: rem(40)

	&__actions
		display: flex
		align-items: center
		justify-content: flex-end
		gap: rem(8)

	&__title
		font-family: var(--font-secondary)
		font-size: var(--fontSizeH4)
		font-weight: 700
		line-height: var(--lineHeightH3)
		text-transform: uppercase

</style>
