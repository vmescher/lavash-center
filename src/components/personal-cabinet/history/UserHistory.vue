<script lang="ts">
import {defineComponent} from 'vue'
import BaseTable from "@components/utils/templates/table/BaseTable.vue";
import {userHistoryTableHead} from "@scripts/consts/tables";
import UserHistoryItem from "@components/personal-cabinet/history/UserHistoryItem.vue";
import BasePagination from "@components/utils/ui/BasePagination.vue";
import {useOrdersStore} from "@scripts/hooks/stateHooks/useOrdersStore";

export default defineComponent({
	name: "UserHistory",
	components: {BasePagination, UserHistoryItem, BaseTable},
	mixins: [useOrdersStore],
	setup() {
		return {
			userHistoryTableHead
		}
	},
	computed: {
		currentPage: {
			get() {
				return this.$route.query.page ? Number(this.$route.query.page) : 1;
			},
			set(value: number) {
				this.$router.push({query: {page: value}});
				this.requestOrders({ offset: (value - 1) * this.getOrdersPagination.limit, limit: this.getOrdersPagination.limit })
			}
		}
	},
	created() {
		this.loadOrders();
		if (!this.getOrderStatuses.length) {
			this.requestOrderStatuses();
		}
	},
	methods: {
		loadOrders() {
			this.requestOrders({ offset: (this.currentPage - 1) * this.getOrdersPagination.limit, limit: this.getOrdersPagination.limit });
		}
	}
})
</script>

<template>
	<BaseTable :table-head="userHistoryTableHead">

		<template v-if="getOrders.length" #default>
			<UserHistoryItem v-for="order in getOrders" :key="order.id" :order-data="order"/>
		</template>

		<template #emptyText>
			<p>У вас пока нет заказов</p>
		</template>

		<template v-if="getOrdersPagination.total > getOrdersPagination.limit" #pagination>
			<BasePagination v-model="currentPage" :total="getOrdersPagination.total" :limit="getOrdersPagination.limit"/>
		</template>

	</BaseTable>
</template>

<style scoped lang="sass">

</style>
