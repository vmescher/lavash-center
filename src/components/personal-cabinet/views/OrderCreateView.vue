<script lang="ts">
import {defineComponent} from 'vue'
import OrderDetail from "@components/personal-cabinet/order-detail/OrderDetail.vue";
import OrderDetailForm from "@components/personal-cabinet/order-detail/OrderDetailForm.vue";
import {RouteNames} from "@scripts/router/types";

export default defineComponent({
	name: "OrderCreateView",
	components: {OrderDetailForm, OrderDetail},
	setup() {
		return {
			RouteNames
		}
	},
})
</script>

<template>
	<OrderDetail view-mode="editing" new-order>
		<OrderDetailForm view-mode="editing" new-order @submit="$router.push({name: RouteNames.ORDER_EDIT_PAGE, params: {id: $event}})" @cancel="$router.push({name: RouteNames.ORDERS_PAGE})"/>
	</OrderDetail>
</template>

<style scoped lang="sass">


</style>
