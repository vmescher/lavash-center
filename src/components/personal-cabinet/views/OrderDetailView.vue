<script lang="ts">
import {defineComponent, provide} from 'vue'
import OrderDetail from "@components/personal-cabinet/order/OrderDetail.vue";
import useOrdersStore from "@scripts/store/orders";
import OrderInfo from "@components/personal-cabinet/order/OrderInfo.vue";
import {useUsersStore} from "@scripts/hooks/stateHooks/useUsersStore";
import OrderCart from "@components/personal-cabinet/order/OrderCart.vue";
import OrderForm from "@components/personal-cabinet/order/OrderForm.vue";

export default defineComponent({
	name: "OrderDetailView",
	components: {OrderForm, OrderCart, OrderInfo, OrderDetail},
	mixins: [useUsersStore],
	setup() {
		const ordersStore = useOrdersStore();
		provide('orderData', ordersStore.currentOrder);
	}
})
</script>

<template>
	<OrderDetail>
		<OrderInfo class="order-detail__block"/>

		<OrderCart v-if="!isAdmin" class="order-detail__block"/>
		<OrderForm v-else/>
	</OrderDetail>
</template>

<style scoped lang="sass">


</style>
