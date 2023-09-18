<script lang="ts">
import {defineComponent} from 'vue'
import BaseTable from "@components/utils/templates/table/BaseTable.vue";
import {userHistoryTableHead} from "@scripts/consts/tables";
import UserHistoryItem from "@components/history/UserHistoryItem.vue";
import BasePagination from "@components/utils/ui/BasePagination.vue";

export default defineComponent({
	name: "UserHistory",
	components: {BasePagination, UserHistoryItem, BaseTable},
	setup() {
		return {
			userHistoryTableHead
		}
	}
})
</script>

<template>
	<BaseTable :table-head="userHistoryTableHead">

		<template #default>
			<UserHistoryItem v-for="item in Array(10)" :key="item" />
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
