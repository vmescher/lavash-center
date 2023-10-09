<script lang="ts">
import {defineComponent, inject} from 'vue'
import {Order} from "@scripts/api/orders/types";

export default defineComponent({
	name: "OrderInfo",
	setup() {
		const orderData = inject('orderData') as Order;
	}
})
</script>

<template>
	<article class="order-info">
		<ul class="order-info__list">
			<li class="order-info__item">
				<span class="order-info__label">Дата заказа</span>
				<span class="order-info__value"></span>
			</li>
			<li class="order-info__item">
				<span class="order-info__label">Способ получения</span>
				<span class="order-info__value"></span>
			</li>
			<li class="order-info__item">
				<span class="order-info__label">Дата получения</span>
				<span class="order-info__value"></span>
			</li>
			<li class="order-info__item">
				<span class="order-info__label">Адрес доставки</span>
				<span class="order-info__value"></span>
			</li>
		</ul>
	</article>
</template>

<style scoped lang="sass">

</style>
