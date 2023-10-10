<script lang="ts">
import {defineComponent, PropType} from 'vue'
import BaseTableRow from "@components/utils/templates/table/BaseTableRow.vue";
import BaseTableColumnText from "@components/utils/templates/table/table-columns/BaseTableColumnText.vue";
import BaseTableColumnImages, {
	TableImage
} from "@components/utils/templates/table/table-columns/BaseTableColumnImages.vue";
import BaseTableColumnActions from "@components/utils/templates/table/table-columns/BaseTableColumnActions.vue";
import StatusToggler from "@components/utils/ui/StatusToggler.vue";
import {getFormattedDate} from "@scripts/mixins/getFormattedDate";
import {getFormattedPrice} from "@scripts/mixins/getFormattedPrice";
import {useOrdersStore} from "@scripts/hooks/stateHooks/useOrdersStore";
import {Order} from "@scripts/api/orders/types";
import {RouteNames} from "@scripts/router/types";

export default defineComponent({
	name: "UserHistoryItem",
	components: {StatusToggler, BaseTableColumnActions, BaseTableColumnImages, BaseTableColumnText, BaseTableRow},
	mixins: [getFormattedDate, getFormattedPrice, useOrdersStore],
	props: {
		orderData: {
			type: Object as PropType<Order>,
			required: true,
			default: () => null
		}
	},
	setup() {
		return {
			RouteNames
		}
	},
	computed: {
		getOrderItemsImages(): TableImage[] {
			return this.orderData.items.map((item) => ({
				src: item.picture,
				alt: item.name
			}))
		},
		isPickupSelected() {
			const deliveryData = this.getDeliveryType(this.orderData.deliveryTypeId);
			return deliveryData && deliveryData.xmlId === 'pickup';
		},
		deliveryData() {
			return this.getDeliveryType(this.orderData.deliveryTypeId);
		},
	}
})
</script>

<template>
	<router-link :to="{name: RouteNames.ORDER_DETAIL_PAGE, params: {id: orderData.id}}" custom v-slot="{navigate}">
		<BaseTableRow @click="navigate">
			<BaseTableColumnText>{{orderData.id}}</BaseTableColumnText>

			<BaseTableColumnText type="grey">{{ getFormattedDate(orderData.dateCreate, false) }}</BaseTableColumnText>

			<BaseTableColumnImages :images="getOrderItemsImages"/>

			<template v-if="isPickupSelected">
				<BaseTableColumnText>{{ deliveryData?.name || '-' }}</BaseTableColumnText>

				<BaseTableColumnText no-wrap>{{ getFormattedDate(orderData.date) }}, {{ orderData.time }}</BaseTableColumnText>
			</template>

			<template v-else>
				<BaseTableColumnText>{{ orderData.address }}</BaseTableColumnText>

				<BaseTableColumnText no-wrap>{{ getFormattedDate(orderData.date) }}</BaseTableColumnText>
			</template>

			<BaseTableColumnText type="bold" no-wrap>{{ getFormattedPrice(orderData.sum) }}</BaseTableColumnText>

			<BaseTableColumnActions>
				<StatusToggler :model-value="orderData.orderStatusId" :statuses="getOrderStatuses"/>
			</BaseTableColumnActions>
		</BaseTableRow>
	</router-link>
</template>

<style scoped lang="sass">

</style>
