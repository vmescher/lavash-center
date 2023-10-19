<script lang="ts">
import {defineComponent, inject} from 'vue'
import CartItem from "@components/cart/CartItem.vue";
import {Order} from "@scripts/api/orders/types";
import BaseNotion from "@components/utils/ui/BaseNotion.vue";
import {getFormattedPrice} from "@scripts/mixins/getFormattedPrice";

export default defineComponent({
	name: "OrderDetailCart",
	components: {BaseNotion, CartItem},
	mixins: [getFormattedPrice],
	setup() {
		const orderData = inject('orderData') as Order;
		return {
			orderData
		}
	},
})
</script>

<template>
	<div class="order-cart">
		<h4 class="order-cart__title">товары в заказе</h4>

		<div class="order-cart__products">
			<CartItem v-for="product in orderData.items" :key="product.id" :product-data="product" :editable="false" theme="medium"/>
		</div>

		<BaseNotion class="order-cart__notion">
			Обратите внимание, что оплата заказа производится при получении.

			<template #text>
				Обратите внимание, что оплата заказа производится наличными или картой курьеру или при получении по адресу
				г. Копейск, ул. Кемеровская, д. 3а.
			</template>
		</BaseNotion>

		<div class="order-cart__bottom">
			<div class="order-cart__total">
				<span class="order-cart__total-title">Итого</span>
				<span class="order-cart__total-value">{{ getFormattedPrice(orderData.sum) }}</span>
			</div>
		</div>
	</div>
</template>

<style lang="sass">
.order-cart
	&__title
		font-family: var(--font-secondary)
		font-size: var(--fontSizeH4)
		font-weight: 700
		line-height: var(--lineHeightH3)
		text-transform: uppercase

		+while-mob-xl
			font-weight: 500

		&:not(:last-child)
			margin-bottom: rem(40)

			+while-mob-xl
				margin-bottom: rem(24)

	&__products
		position: relative

		display: flex
		flex-direction: column
		gap: rem(24)
		padding-bottom: rem(26)

		+until-laptop
			padding-bottom: rem(18)
			gap: rem(16)

		&:not(:last-child)
			margin-bottom: rem(80)

			+until-laptop
				margin-bottom: rem(40)

			+while-mob-xl
				margin-bottom: rem(32)

		&::before
			content: ''

			position: absolute
			bottom: 0
			left: 0

			width: 100%
			height: 2px

			background-color: var(--color-neutral-fifth)
			border-radius: var(--radius-divider)

	&__notion
		margin-bottom: rem(40)

		+while-mob-xl
			margin-bottom: rem(24)

	&__bottom
		position: relative

		padding-top: rem(18)
		display: flex
		justify-content: space-between
		align-items: center
		gap: rem(24)

		+while-mob-xl
			flex-direction: column
			align-items: stretch
			gap: rem(24)
			padding-top: rem(12)

		&:not(:first-child)
			margin-top: rem(40)

			+while-mob-xl
				margin-top: rem(24)

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
