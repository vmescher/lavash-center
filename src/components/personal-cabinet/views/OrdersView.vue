<script lang="ts">
import {defineComponent} from 'vue'
import HistorySection from "@components/personal-cabinet/history/HistorySection.vue";
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import HistoryFilter from "@components/personal-cabinet/history/HistoryFilter.vue";
import ManagerHistory from "@components/personal-cabinet/history/ManagerHistory.vue";
import SlideInTransition from "@components/utils/transitions/SlideInTransition.vue";
import {useOrdersStore} from "@scripts/hooks/stateHooks/useOrdersStore";
import {RouteNames} from "@scripts/router/types";

export default defineComponent({
	name: "OrdersView",
	components: {SlideInTransition, ManagerHistory, HistoryFilter, IconSVG, HistorySection},
	mixins: [useOrdersStore],
	setup() {
		return {
			RouteNames
		}
	},
	created() {
		if (!this.getDeliveryTypes.length) this.requestDeliveryTypes();
	},
	methods: {
		reloadOrders() {
			this.requestManagerOrders({ offset: this.getOrdersPagination.offset, limit: this.getOrdersPagination.limit, filter: {...this.getOrdersFilter} });
		}
	}
})
</script>

<template>
	<router-view v-slot="{Component}">
		<SlideInTransition mode="out-in">
			<component :is="Component" v-if="Component" />
			<HistorySection v-else>
				<template #title>Все заказы</template>

				<template #actions>
					<button class="btn" @click.prevent="reloadOrders">
						<IconSVG name="reload" class="btn__icon"/>
						<span class="btn__text">Обновить статусы заказов</span>
					</button>
					<router-link class="btn btn--color-secondary" :to="{name: RouteNames.ORDER_CREATE_PAGE}">
						<span class="btn__text">Создать заказ</span>
					</router-link>
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
