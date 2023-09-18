<script lang="ts">
import {defineComponent} from 'vue'
import HistorySection from "@components/history/HistorySection.vue";
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import HistoryFilter from "@components/history/HistoryFilter.vue";
import ManagerHistory from "@components/history/ManagerHistory.vue";

export default defineComponent({
	name: "OrdersView",
	components: {ManagerHistory, HistoryFilter, IconSVG, HistorySection},
})
</script>

<template>
	<HistorySection>
		<template #title>Все заказы</template>

		<template #actions>
			<button class="btn">
				<IconSVG name="reload" class="btn__icon"/>
				<span class="btn__text">Обновить статусы заказов</span>
			</button>
			<button class="btn btn--color-secondary">
				<span class="btn__text">Создать заказ</span>
			</button>
		</template>

		<template #filter>
			<HistoryFilter/>
		</template>

		<ManagerHistory/>

	</HistorySection>
</template>

<style scoped lang="sass">

</style>
