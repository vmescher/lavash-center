<script lang="ts">
import {defineComponent} from 'vue'
import BaseTable from "@components/utils/templates/table/BaseTable.vue";
import {managerHistoryTableHead} from "@scripts/consts/tables";
import BasePagination from "@components/utils/ui/BasePagination.vue";
import ManagerHistoryItem from "@components/history/ManagerHistoryItem.vue";
import {useOrdersStore} from "@scripts/hooks/stateHooks/useOrdersStore";

export default defineComponent({
	name: "ManagerHistory",
	components: {ManagerHistoryItem, BasePagination, BaseTable},
	mixins: [useOrdersStore],
	setup() {
		return {
			managerHistoryTableHead
		}
	},
	created() {
		this.requestManagerOrders();
		if (!this.getOrderStatuses.length) {
			this.requestOrderStatuses();
		}
		if (!this.getPaymentStatuses.length) {
			this.requestPaymentStatuses();
		}
	}
})
</script>

<template>
	<BaseTable :table-head="managerHistoryTableHead">

		<template v-if="getOrders.length" #default>
			<ManagerHistoryItem v-for="order in getOrders" :key="order.id" :order-data="order"/>
		</template>

		<template #emptyText>
			<p>Заказов еще не поступало</p>
		</template>

		<template v-if="getOrdersPagination.total > getOrdersPagination.limit" #pagination>
			<BasePagination :total="getOrdersPagination.total" :limit="getOrdersPagination.limit"/>
		</template>

	</BaseTable>
</template>

<style scoped lang="sass">

</style>
