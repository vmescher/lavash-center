<script lang="ts">
import {defineComponent, provide} from 'vue'
import OrderDetail from "@components/personal-cabinet/order-detail/OrderDetail.vue";
import useOrdersStore from "@scripts/store/orders";
import OrderDetailInfo from "@components/personal-cabinet/order-detail/OrderDetailInfo.vue";
import {useUsersStore} from "@scripts/hooks/stateHooks/useUsersStore";
import OrderDetailCart from "@components/personal-cabinet/order-detail/OrderDetailCart.vue";
import OrderDetailForm from "@components/personal-cabinet/order-detail/OrderDetailForm.vue";

export default defineComponent({
	name: "OrderDetailView",
	components: {OrderDetailForm, OrderDetailCart, OrderDetailInfo, OrderDetail},
	mixins: [useUsersStore],
	setup() {
		const ordersStore = useOrdersStore();
		provide('orderData', ordersStore.currentOrder);
	},
	data() {
		return {
			viewMode: 'viewing' as 'viewing' | 'editing'
		}
	}
})
</script>

<template>
	<OrderDetail v-model:view-mode="viewMode">
		<OrderDetailInfo class="order-detail__block"/>

		<OrderDetailCart v-if="!isAdmin" class="order-detail__block"/>
		<OrderDetailForm v-else :view-mode="viewMode" @submit="viewMode = 'viewing'" @cancel="viewMode = 'viewing'"/>
	</OrderDetail>
</template>

<style scoped lang="sass">


</style>
