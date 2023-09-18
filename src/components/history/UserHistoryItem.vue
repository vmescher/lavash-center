<script lang="ts">
import {defineComponent} from 'vue'
import BaseTableRow from "@components/utils/templates/table/BaseTableRow.vue";
import BaseTableColumnText from "@components/utils/templates/table/table-columns/BaseTableColumnText.vue";
import BaseTableColumnImages, {
	TableImage
} from "@components/utils/templates/table/table-columns/BaseTableColumnImages.vue";
import BaseTableColumnActions from "@components/utils/templates/table/table-columns/BaseTableColumnActions.vue";
import StatusToggler, {Status} from "@components/utils/ui/StatusToggler.vue";

export default defineComponent({
	name: "UserHistoryItem",
	components: {StatusToggler, BaseTableColumnActions, BaseTableColumnImages, BaseTableColumnText, BaseTableRow},
	data() {
		return {
			images: [
				{
					src: '/img/products/product-1.png',
				},
				{
					src: '/img/products/product-1.png',
				},
				{
					src: '/img/products/product-1.png',
				},
				{
					src: '/img/products/product-1.png',
				},
				{
					src: '/img/products/product-1.png',
				},
			] as TableImage[],
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
			] as Status[]
		}
	},
})
</script>

<template>
	<BaseTableRow>
		<BaseTableColumnText>1234567890</BaseTableColumnText>

		<BaseTableColumnText type="grey">21.05.2024, 14:56</BaseTableColumnText>

		<BaseTableColumnImages :images="images"/>

		<BaseTableColumnText>г. Челябинск, ул. Лавашная, д 13, офис 123</BaseTableColumnText>

		<BaseTableColumnText>24.05.2024, 18:00</BaseTableColumnText>

		<BaseTableColumnText type="bold">1 680 ₽</BaseTableColumnText>

		<BaseTableColumnActions>
			<StatusToggler :model-value="2" :statuses="statuses"/>
		</BaseTableColumnActions>
	</BaseTableRow>
</template>

<style scoped lang="sass">

</style>
