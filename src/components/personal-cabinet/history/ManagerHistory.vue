<script lang="ts">
import {defineComponent} from 'vue'
import BaseTable from "@components/utils/templates/table/BaseTable.vue";
import {managerHistoryTableHead} from "@scripts/consts/tables";
import BasePagination from "@components/utils/ui/BasePagination.vue";
import ManagerHistoryItem from "@components/personal-cabinet/history/ManagerHistoryItem.vue";
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
	computed: {
		currentPage: {
			get() {
				return this.$route.query.page ? Number(this.$route.query.page) : 1;
			},
			set(value) {
				this.$router.push({query: {page: value}});
				this.requestManagerOrders({ offset: (value - 1) * this.getOrdersPagination.limit, limit: this.getOrdersPagination.limit })
			}
		}
	},
	created() {
		this.loadOrders();
		if (!this.getOrderStatuses.length) {
			this.requestOrderStatuses();
		}
		if (!this.getPaymentStatuses.length) {
			this.requestPaymentStatuses();
		}
	},
	methods: {
		loadOrders() {
			this.requestManagerOrders({ offset: (this.currentPage - 1) * this.getOrdersPagination.limit, limit: this.getOrdersPagination.limit });
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
			<BasePagination v-model="currentPage" :total="getOrdersPagination.total" :limit="getOrdersPagination.limit"/>
		</template>

	</BaseTable>
</template>

<style scoped lang="sass">

</style>
