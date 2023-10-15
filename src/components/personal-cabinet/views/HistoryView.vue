<script lang="ts">
import {defineComponent} from 'vue'
import HistorySection from "@components/personal-cabinet/history/HistorySection.vue";
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import UserHistory from "@components/personal-cabinet/history/UserHistory.vue";
import {useOrdersStore} from "@scripts/hooks/stateHooks/useOrdersStore";
import SlideInTransition from "@components/utils/transitions/SlideInTransition.vue";

export default defineComponent({
	name: "HistoryView",
	components: {SlideInTransition, UserHistory, IconSVG, HistorySection},
	mixins: [useOrdersStore],
	created() {
		if (!this.getDeliveryTypes.length) this.requestDeliveryTypes();
	},
	methods: {
		reloadOrders() {
			this.requestOrders({ offset: this.getOrdersPagination.offset, limit: this.getOrdersPagination.limit });
		}
	}
})
</script>

<template>
	<router-view v-slot="{Component}">
		<SlideInTransition mode="out-in">
			<component :is="Component" v-if="Component"/>
			<HistorySection v-else>
				<template #title>Мои заказы</template>

				<template #actions>
					<button class="btn" type="button" @click.prevent="reloadOrders">
						<IconSVG name="reload" class="btn__icon"/>
						<span class="btn__text">Обновить статусы заказов</span>
					</button>
				</template>

				<UserHistory/>

			</HistorySection>
		</SlideInTransition>
	</router-view>
</template>

<style scoped lang="sass">

</style>
