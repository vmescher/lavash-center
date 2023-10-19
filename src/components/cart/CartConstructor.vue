<script lang="ts">
import {defineComponent, PropType} from 'vue'
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import BaseTable from "@components/utils/templates/table/BaseTable.vue";
import {cartConstructorTableHead} from "@scripts/consts/tables";
import {ChangeProductQuantityPayload, ProductInBasket} from "@scripts/api/basket/types";
import CartConstructorItem from "@components/cart/CartConstructorItem.vue";
import {useProductsStore} from "@scripts/hooks/stateHooks/useProductsStore";
import {ErrorObject} from "@vuelidate/core";

export default defineComponent({
	name: "CartConstructor",
	components: {CartConstructorItem, BaseTable, IconSVG},
	mixins: [useProductsStore],
	props: {
		products: {
			type: Array as unknown as PropType<ProductInBasket[]>,
			default: () => [],
		},
		viewMode: {
			type: String as PropType<'viewing' | 'editing'>,
			default: 'viewing'
		},
		errors: {
			type: Array as PropType<string[] | ErrorObject[]>,
			default: () => [],
		},
	},
	emits: ['add', 'remove', 'changeQuantity'],
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
			return this.getProducts.every((product) => this.products.findIndex(item => item.id === product.id) !== -1);
		},
		getExcludedProducts() {
			return this.products.map((product) => product.id);
		}
	},
	watch: {
		viewMode: {
			handler(newValue) {
				if (newValue === 'viewing') {
					this.newItem = null;
				}
			},
			immediate: true
		}
	},
	created() {
		if (this.getProducts.length === 0) {
			this.requestProducts();
		}

		if (this.products.length === 0) {
			this.addItem();
		}

		this.$watch('products', (newValue) => {
			if (newValue.length === 0) {
				this.addItem();
			}
		})
	},
	methods: {
		addItem() {
			if (this.newItem) return;
			this.newItem = {
				id: undefined,
				name: '',
				price: 0,
				quantity: 1
			}
		},
		addNewProduct(id: number) {
			this.newItem = null;
			this.$emit('add', id);
		},
		removeProduct(id: number | null) {
			if (!id) {
				this.newItem = null;
				return;
			}
			this.$emit('remove', id);
		},
		changeQuantity({productId, quantity}: ChangeProductQuantityPayload) {
			this.$emit('changeQuantity', {productId, quantity});
		}
	}
})
</script>

<template>
	<section class="cart-constructor">
		<div class="cart-constructor__top">
			<h4 class="cart-constructor__title">Товары в заказе</h4>
			<div v-if="viewMode === 'editing'" class="cart-constructor__actions">
				<button class="btn btn--color-secondary" :disabled="!!newItem || isAllProductsSelected" :title="!!newItem ? 'У вас есть невыбранный товар' : isAllProductsSelected ? 'Все товары выбраны' : ''" @click.prevent="addItem">
					<span class="btn__text">Добавить товар</span>
					<IconSVG name="plus" class="btn__icon"/>
				</button>
			</div>
		</div>
		<div class="cart-constructor__products">
			<BaseTable :table-head="cartConstructorTableHead" :with-actions="viewMode === 'editing'">
				<CartConstructorItem v-if="newItem" :product-data="newItem" :editable="viewMode === 'editing'" :excluded-products="getExcludedProducts" :errors="errors" :can-remove="Boolean(products.length)" @add="addNewProduct" @remove="removeProduct"/>
				<CartConstructorItem v-for="item in products" :key="item.id" :editable="viewMode === 'editing'" :product-data="item" @remove="removeProduct" @change-quantity="changeQuantity"/>
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
		flex-wrap: wrap
		gap: rem(32)

		&:not(:last-child)
			margin-bottom: rem(40)

			+while-mob-xl
				margin-bottom: rem(24)

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

		+while-mob-xl
			font-weight: 500

</style>
