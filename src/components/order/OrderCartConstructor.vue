<script lang="ts">
import {defineComponent, PropType} from 'vue'
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import BaseTable from "@components/utils/templates/table/BaseTable.vue";
import {cartConstructorTableHead} from "@scripts/consts/tables";
import {ProductInBasket} from "@scripts/api/basket/types";
import {useProductsStore} from "@scripts/hooks/stateHooks/useProductsStore";
import {OrderItem} from "@scripts/api/orders/types";
import OrderCartConstructorItem from "@components/order/OrderCartConstructorItem.vue";

export default defineComponent({
	name: "OrderCartConstructor",
	components: {OrderCartConstructorItem, BaseTable, IconSVG},
	mixins: [useProductsStore],
	props: {
		modelValue: {
			type: Array as PropType<Partial<OrderItem>[]>,
			default: () => []
		}
	},
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
		value: {
			get(): Partial<OrderItem>[] {
				return this.modelValue || [];
			},
			set(value: Partial<OrderItem>[]) {
				this.$emit('update:modelValue', value);
			}
		},
		isAllProductsSelected() {
			return this.getProducts.every((product) => this.isProductInOrder(product.id));
		},
		isProductInOrder() {
			return (productId: number) => this.value.findIndex((item) => item.id === productId) !== -1;
		},
	},
	created() {
		if (this.value.length === 0) {
			this.addItem();
		}

		this.$watch('value', (newValue) => {
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
		clearAdding(value: Partial<OrderItem> | null = null) {
			if (value) {
				this.value.unshift(value);
			}
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
				<OrderCartConstructorItem v-if="newItem" :product-data="newItem" @add="clearAdding" @remove="clearAdding"/>
				<OrderCartConstructorItem v-for="item in value" :key="item.id" :product-data="item"/>
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
