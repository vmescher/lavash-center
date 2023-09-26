<script lang="ts">
import {defineComponent} from 'vue'
import CartItem from "@components/cart/CartItem.vue";
import {useBasketStore} from "@scripts/hooks/stateHooks/useBasketStore";
import {RouteNames} from "@scripts/router/types";

export default defineComponent({
	name: "OrderCart",
	components: {CartItem},
	mixins: [useBasketStore],
	setup() {
		return {
			RouteNames
		}
	},
	watch: {
		getBasket(newValue) {
			if (newValue.length === 0) {
				this.$router.push({name: RouteNames.MAIN_PAGE});
			}
		}
	}
})
</script>

<template>
	<div class="order__block">
		<h4 class="order__title">товары в заказе</h4>

		<div class="order__products">
			<CartItem v-for="product in getBasket" :key="product.id" :product-data="product" theme="big"/>
		</div>
	</div>
</template>

<style lang="sass">

</style>
