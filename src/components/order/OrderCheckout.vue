<script lang="ts">
import {defineComponent} from 'vue'
import OrderCart from "@components/order/OrderCart.vue";
import OrderForm from "@components/order/OrderForm.vue";
import OrderDelivery from "@components/order/OrderDelivery.vue";
import CartConstructor from "@components/cart/CartConstructor.vue";
import {useBasketStore} from "@scripts/hooks/stateHooks/useBasketStore";
import {ChangeProductQuantityPayload} from "@scripts/api/basket/types";
import debounce from "@scripts/utils/debounce";

export default defineComponent({
	name: "OrderCheckout",
	components: {CartConstructor, OrderDelivery, OrderForm, OrderCart},
	mixins: [useBasketStore],
	props: {
		editableBasket: {
			type: Boolean,
			default: false
		}
	},
	emits: ['submit'],
	data() {
		return {
			deliveryTypeId: 1,
			changeQuantityHandler: debounce<(data: ChangeProductQuantityPayload) => void>(this.changeQuantity, 500),
		}
	},
	created() {
		if (!this.getBasket.length) {
			this.requestBasket()
		}
	},
	methods: {
		addItem(val: number) {
			this.requestAddToBasket({
				productId: val
			})
		},
		removeItem(val: number) {
			this.requestDeleteFromBasket({
				productId: val
			})
		},
		changeQuantity({productId, quantity}: ChangeProductQuantityPayload): void {
			this.requestChangeQuantity({
				productId,
				quantity
			})
		},
	}
})
</script>

<template>
	<section class="order">
		<div class="order__wrapper wrapper">
			<OrderCart v-if="!editableBasket"/>
			<CartConstructor v-else :products="getBasket" class="order__block order__block--wide" @add="addItem" @remove="removeItem" @change-quantity="changeQuantityHandler"/>
			<OrderDelivery v-model="deliveryTypeId"/>
			<OrderForm :delivery-type-id="deliveryTypeId" @submit="$emit('submit')"/>
		</div>
	</section>
</template>

<style lang="sass">
.order
	&__wrapper
		display: grid
		grid-template-columns: repeat(12, minmax(0, 1fr))
		grid-gap: rem(80) rem(24)

	&__block
		grid-column: span 8

		&--wide
			grid-column: 1 / -1

	&__title
		font-family: var(--font-secondary)
		font-size: var(--fontSizeH4)
		font-weight: 700
		line-height: var(--lineHeightH3)
		text-transform: uppercase

		&:not(:last-child)
			margin-bottom: rem(48)

	&__products
		position: relative

		display: flex
		flex-direction: column
		gap: rem(28)
		padding-bottom: rem(30)

		&::before
			content: ''

			position: absolute
			bottom: 0
			left: 0

			width: 100%
			height: 2px

			background-color: var(--color-neutral-fifth)
			border-radius: var(--radius-divider)

	&__bottom
		position: relative

		padding-top: rem(18)
		display: flex
		justify-content: space-between
		align-items: center
		gap: rem(24)

		&:not(:first-child)
			margin-top: rem(40)

		&::before
			content: ''
			position: absolute
			top: 0
			left: 0

			display: block
			width: 100%
			height: 2px

			border-radius: var(--radius-divider)
			background-color: var(--color-primary)

	&__form
		&:not(:last-child)
			margin-bottom: rem(80)

	&__notion
		&:not(:last-child)
			margin-bottom: rem(40)

	&__total
		flex: 1 1 auto
		display: flex
		justify-content: space-between
		align-items: center
		gap: rem(24)

		&-title,
		&-value
			font-family: var(--font-secondary)
			font-size: var(--fontSizeH4)
			font-weight: 700
			line-height: var(--lineHeightH3)
			text-transform: uppercase

</style>
