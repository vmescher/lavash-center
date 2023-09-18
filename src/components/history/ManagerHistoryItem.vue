<script lang="ts">
import {defineComponent} from 'vue'
import BaseTableRow from "@components/utils/templates/table/BaseTableRow.vue";
import BaseTableColumnText from "@components/utils/templates/table/table-columns/BaseTableColumnText.vue";
import BaseTableColumnActions from "@components/utils/templates/table/table-columns/BaseTableColumnActions.vue";
import StatusToggler, {Status} from "@components/utils/ui/StatusToggler.vue";
import BaseTableColumnList from "@components/utils/templates/table/table-columns/BaseTableColumnList.vue";

export default defineComponent({
	name: "ManagerHistoryItem",
	components: {BaseTableColumnList, StatusToggler, BaseTableColumnActions, BaseTableColumnText, BaseTableRow},
	data() {
		return {
			statuses: [
				{
					"id": 1,
					"name": "Новый",
					xmlId: 'new'

				},
				{
					"id": 2,
					"name": "В обработке",
					xmlId: 'in_progress'
				},
				{
					"id": 3,
					"name": "На доставке",
					xmlId: 'on_delivery'
				},
				{
					"id": 4,
					"name": "Готов",
					xmlId: 'ready'
				},
				{
					"id": 5,
					"name": "Отменен",
					xmlId: 'canceled'
				}
			] as Status[],
			payStatuses: [
				{
					"id": 1,
					"name": "Не оплачен",
					xmlId: 'unpaid'

				},
				{
					"id": 2,
					"name": "Оплачен",
					xmlId: 'paid'
				}
			] as Status[],
		}
	},
})
</script>

<template>
	<BaseTableRow>
		<BaseTableColumnText>1234567890</BaseTableColumnText>

		<BaseTableColumnText type="grey">21.05.2024, 14:56</BaseTableColumnText>

		<BaseTableColumnList type="grey">
			<li class="table-list__item">
				<span>Лаваш острый</span>
				<span>1 шт</span>
			</li>
			<li class="table-list__item">
				<span>Лаваш итальянский</span>
				<span>3 шт</span>
			</li>
			<li class="table-list__item">
				<span>Лаваш классический</span>
				<span>100 шт</span>
			</li>
		</BaseTableColumnList>

		<BaseTableColumnText>
			ООО Люблю лаваш очень сильно <br>
			<a href="#" class="link link--secondary link--size-small link--color-fourth">8 900 000 00 00</a>
		</BaseTableColumnText>

		<BaseTableColumnText>г. Челябинск, ул. Лавашная, д 13, офис 123</BaseTableColumnText>

		<BaseTableColumnText no-wrap>24.05.2024, 18:00</BaseTableColumnText>

		<BaseTableColumnText type="bold" no-wrap>1 680 ₽</BaseTableColumnText>

		<BaseTableColumnActions>
			<StatusToggler :model-value="2" is-editable :statuses="statuses"/>
		</BaseTableColumnActions>

		<BaseTableColumnActions>
			<StatusToggler :model-value="2" is-editable :statuses="payStatuses"/>
		</BaseTableColumnActions>
	</BaseTableRow>
</template>

<style scoped lang="sass">

</style>
