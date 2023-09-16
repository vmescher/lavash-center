<script lang="ts">
import {defineComponent} from 'vue'
import BackHeader from "@components/structural/BackHeader.vue";
import {RouteNames} from "@scripts/router/types";
import SectionTitle from "@components/utils/templates/structural/SectionTitle.vue";
import OrderCheckout from "@components/order/OrderCheckout.vue";

export default defineComponent({
	name: "OrderView",
	components: {OrderCheckout, SectionTitle, BackHeader},
	setup() {
		return {
			RouteNames
		}
	},
})
</script>

<template>
	<main class="page">
		<BackHeader :back-target="RouteNames.MAIN_PAGE">Вернуться в каталог</BackHeader>
		<SectionTitle>Оформление заказа</SectionTitle>
		<OrderCheckout/>
	</main>
</template>

<style scoped lang="sass">

</style>
