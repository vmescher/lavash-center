<script lang="ts">
import {defineComponent, provide} from 'vue'
import OrderDetail from "@components/personal-cabinet/order/OrderDetail.vue";
import useOrdersStore from "@scripts/store/orders";
import OrderInfo from "@components/personal-cabinet/order/OrderInfo.vue";
import {useUsersStore} from "@scripts/hooks/stateHooks/useUsersStore";

export default defineComponent({
	name: "OrderDetailView",
	components: {OrderInfo, OrderDetail},
	mixins: [useUsersStore],
	setup() {
		const ordersStore = useOrdersStore();
		provide('orderData', ordersStore.currentOrder);
	}
})
</script>

<template>
	<OrderDetail>
		<OrderInfo v-if="!isAdmin"/>
	</OrderDetail>
</template>

<style scoped lang="sass">


</style>
