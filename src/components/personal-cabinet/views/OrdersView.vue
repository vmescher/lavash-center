<script lang="ts">
import {defineComponent} from 'vue'
import HistorySection from "@components/personal-cabinet/history/HistorySection.vue";
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import HistoryFilter from "@components/personal-cabinet/history/HistoryFilter.vue";
import ManagerHistory from "@components/personal-cabinet/history/ManagerHistory.vue";
import SlideInTransition from "@components/utils/transitions/SlideInTransition.vue";
import {useOrdersStore} from "@scripts/hooks/stateHooks/useOrdersStore";

export default defineComponent({
	name: "OrdersView",
	components: {SlideInTransition, ManagerHistory, HistoryFilter, IconSVG, HistorySection},
	mixins: [useOrdersStore],
	created() {
		if (!this.getDeliveryTypes.length) this.requestDeliveryTypes();
	},
	methods: {
		reloadOrders() {
			this.requestManagerOrders({ offset: this.getOrdersPagination.offset, limit: this.getOrdersPagination.limit });
		}
	}
})
</script>

<template>
	<router-view v-slot="{Component}">
		<SlideInTransition mode="out-in">
			<component v-if="Component" :is="Component"/>
			<HistorySection v-else>
				<template #title>Все заказы</template>

				<template #actions>
					<button class="btn" @click.prevent="reloadOrders">
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
		</SlideInTransition>
	</router-view>
</template>

<style scoped lang="sass">

</style>
