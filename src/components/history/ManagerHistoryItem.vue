<script lang="ts">
import {defineComponent, PropType} from 'vue'
import BaseTableRow from "@components/utils/templates/table/BaseTableRow.vue";
import BaseTableColumnText from "@components/utils/templates/table/table-columns/BaseTableColumnText.vue";
import BaseTableColumnActions from "@components/utils/templates/table/table-columns/BaseTableColumnActions.vue";
import StatusToggler, {Status} from "@components/utils/ui/StatusToggler.vue";
import BaseTableColumnList from "@components/utils/templates/table/table-columns/BaseTableColumnList.vue";
import {Order} from "@scripts/api/orders/types";
import {getFormattedDate} from "@scripts/mixins/getFormattedDate";
import {getFormattedPrice} from "@scripts/mixins/getFormattedPrice";
import {useOrdersStore} from "@scripts/hooks/stateHooks/useOrdersStore";

export default defineComponent({
	name: "ManagerHistoryItem",
	components: {BaseTableColumnList, StatusToggler, BaseTableColumnActions, BaseTableColumnText, BaseTableRow},
	mixins: [getFormattedDate, getFormattedPrice, useOrdersStore],
	props: {
		orderData: {
			type: Object as PropType<Order>,
			required: true,
			default: () => null
		}
	},
	methods: {
		updateOrderStatus(statusId: number) {
			this.requestUpdateManagerOrderStatus({
				statusId
			}, this.orderData.id);
		},
		updatePaymentStatus(statusId: number) {
			this.requestUpdateManagerOrderPaymentStatus({
				statusId
			}, this.orderData.id);
		}
	}
})
</script>

<template>
	<BaseTableRow>
		<BaseTableColumnText>{{orderData.id}}</BaseTableColumnText>

		<BaseTableColumnText type="grey">{{ getFormattedDate(orderData.dateCreate, false) }}</BaseTableColumnText>

		<BaseTableColumnList type="grey">
			<li v-for="product in orderData.items" :key="product.id" class="table-list__item">
				<span>{{ product.name }}</span>
				<span>{{ product.quantity }} шт</span>
			</li>
		</BaseTableColumnList>

		<BaseTableColumnText>
			{{ orderData.client }}
			<template v-if="orderData.contact">
				<br>
				<a v-if="orderData.contact" :href="`tel:${orderData.contact}`" class="link link--secondary link--size-small link--color-fourth">{{ orderData.contact }}</a>
			</template>
		</BaseTableColumnText>

		<template v-if="orderData.deliveryTypeId === 1">
			<BaseTableColumnText>Самовывоз</BaseTableColumnText>

			<BaseTableColumnText no-wrap>{{ getFormattedDate(orderData.date) }}, {{ orderData.time }}</BaseTableColumnText>
		</template>

		<template v-else>
			<BaseTableColumnText>{{ orderData.address }}</BaseTableColumnText>

			<BaseTableColumnText no-wrap>{{ getFormattedDate(orderData.date) }}</BaseTableColumnText>
		</template>

		<BaseTableColumnText type="bold" no-wrap>{{ getFormattedPrice(orderData.sum) }}</BaseTableColumnText>

		<BaseTableColumnActions>
			<StatusToggler :model-value="orderData.orderStatusId" is-editable :statuses="getOrderStatuses" @update:model-value="updateOrderStatus"/>
		</BaseTableColumnActions>

		<BaseTableColumnActions>
			<StatusToggler :model-value="orderData.paymentStatusId" is-editable :statuses="getPaymentStatuses" @update:model-value="updatePaymentStatus"/>
		</BaseTableColumnActions>
	</BaseTableRow>
</template>

<style scoped lang="sass">

</style>
