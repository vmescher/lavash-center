<script lang="ts">
import {defineComponent, inject} from 'vue'
import {Order} from "@scripts/api/orders/types";
import {getFormattedDate} from "@scripts/mixins/getFormattedDate";
import {useOrdersStore} from "@scripts/hooks/stateHooks/useOrdersStore";
import {useUsersStore} from "@scripts/hooks/stateHooks/useUsersStore";

export default defineComponent({
	name: "OrderInfo",
	mixins: [getFormattedDate, useOrdersStore, useUsersStore],
	setup() {
		const orderData = inject('orderData') as Order;
		return {
			orderData
		}
	},
	computed: {
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
	<article class="order-info">
		<ul class="order-info__list">
			<li class="order-info__item">
				<span class="order-info__label">Дата заказа</span>
				<span class="order-info__value">{{ getFormattedDate(orderData.dateCreate, false) }}</span>
			</li>
			<template v-if="!isAdmin">
				<li class="order-info__item">
					<span class="order-info__label">Способ получения</span>
					<span class="order-info__value">{{ deliveryData?.name || '-' }}</span>
				</li>
				<li class="order-info__item">
					<span class="order-info__label">Дата получения</span>
					<span class="order-info__value">{{ getFormattedDate(orderData.date) }}</span>
				</li>
				<li v-if="isPickupSelected" class="order-info__item">
					<span class="order-info__label">Время получения</span>
					<span class="order-info__value">{{ orderData.time }}</span>
				</li>
				<li v-else class="order-info__item">
					<span class="order-info__label">Адрес доставки</span>
					<span class="order-info__value">{{ orderData.address }}</span>
				</li>
			</template>
		</ul>
	</article>
</template>

<style scoped lang="sass">
.order-info
	&__list
		display: flex
		align-items: flex-start
		flex-wrap: wrap
		gap: rem(64)

	&__item
		display: flex
		flex-direction: column
		gap: rem(12)

	&__label
		font-size: var(--fontSizeP3)
		font-weight: 500
		line-height: var(--lineHeightP1)

	&__value
		font-size: var(--fontSizeP1)
		font-weight: 500
		line-height: var(--lineHeightP1)

</style>
