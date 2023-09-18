<script lang="ts">
import {defineComponent} from 'vue'
import BaseTable from "@components/utils/templates/table/BaseTable.vue";
import {managerHistoryTableHead} from "@scripts/consts/tables";
import BasePagination from "@components/utils/ui/BasePagination.vue";
import ManagerHistoryItem from "@components/history/ManagerHistoryItem.vue";

export default defineComponent({
	name: "ManagerHistory",
	components: {ManagerHistoryItem, BasePagination, BaseTable},
	setup() {
		return {
			managerHistoryTableHead
		}
	}
})
</script>

<template>
	<BaseTable :table-head="managerHistoryTableHead">

		<template #default>
			<ManagerHistoryItem v-for="item in Array(10)" :key="item" />
		</template>

		<template #emptyText>
			<p>У вас пока нет заказов</p>
		</template>

		<template #pagination>
			<BasePagination :total="100"/>
		</template>

	</BaseTable>
</template>

<style scoped lang="sass">

</style>
