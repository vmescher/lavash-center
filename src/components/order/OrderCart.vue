<script lang="ts">
import {defineComponent} from 'vue'
import CartItem from "@components/cart/CartItem.vue";

export default defineComponent({
	name: "OrderCart",
	components: {CartItem}
})
</script>

<template>
	<div class="order__block">
		<h4 class="order__title">товары в заказе</h4>

		<div class="order__products">
			<CartItem v-for="item in Array(12)" :key="item" theme="big"/>
		</div>
	</div>
</template>

<style lang="sass">

</style>
