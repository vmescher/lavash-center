<script lang="ts">
import {defineComponent, inject, PropType} from 'vue'
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import {useUsersStore} from "@scripts/hooks/stateHooks/useUsersStore";
import {RouteNames} from "@scripts/router/types";
import {useOrdersStore} from "@scripts/hooks/stateHooks/useOrdersStore";
import StatusToggler from "@components/utils/ui/StatusToggler.vue";
import {Order} from "@scripts/api/orders/types";

export default defineComponent({
	name: "OrderDetail",
	components: {StatusToggler, IconSVG},
	mixins: [useUsersStore, useOrdersStore],
	props: {
		viewMode: {
			type: String as PropType<'viewing' | 'editing'>,
			default: 'viewing'
		},
	},
	emits: ['switchView'],
	setup() {
		const orderData = inject('orderData') as Order;
		return {
			RouteNames,
			orderData
		}
	},
	created() {
		if (!this.getOrderStatuses.length) {
			this.requestOrderStatuses();
		}
		if (!this.getPaymentStatuses.length && this.isAdmin) {
			this.requestPaymentStatuses();
		}
	},
	methods: {
		updateOrderStatus(statusId: number) {
			this.requestUpdateManagerOrderStatus({
				statusId
			}, this.$route.params.id);
		},
		updatePaymentStatus(statusId: number) {
			this.requestUpdateManagerOrderPaymentStatus({
				statusId
			}, this.$route.params.id);
		}
	}
})
</script>

<template>
	<section class="order-detail">
		<div class="order-detail__wrapper wrapper">
			<div class="order-detail__back">
				<router-link :to="{name: isAdmin ? RouteNames.ORDERS_PAGE : RouteNames.HISTORY_PAGE}" class="link">
					<IconSVG name="arrow-left" class="link__icon"/>
					<span class="link__text">Вернуться к заказам</span>
				</router-link>
			</div>

			<div class="order-detail__top">
				<h3 class="order-detail__title">№{{ orderData.id }}</h3>
				<div class="order-detail__statuses">
					<template v-if="isAdmin">
						<StatusToggler :model-value="orderData.orderStatusId" is-editable :statuses="getOrderStatuses" @update:model-value="updateOrderStatus"/>
						<StatusToggler :model-value="orderData.paymentStatusId" is-editable :statuses="getPaymentStatuses" @update:model-value="updatePaymentStatus"/>
					</template>
					<template v-else>
						<StatusToggler :model-value="orderData.orderStatusId" :statuses="getOrderStatuses"/>
					</template>
				</div>
				
				<div v-if="viewMode !== 'editing' && isAdmin" class="order-detail__actions">
					<button class="btn btn--color-secondary" type="button" @click.prevent="$emit('switchView', 'editing')">
						<span class="btn__text">Редактировать заказ</span>
						<IconSVG name="edit" class="btn__icon"/>
					</button>
				</div>
			</div>

			<div class="order-detail__body">
				<slot></slot>
			</div>
		</div>
	</section>
</template>

<style scoped lang="sass">
.order-detail
	&__back
		display: flex
		align-items: center
		gap: rem(16)
		&:not(:last-child)
			margin-bottom: rem(64)

	&__top
		display: flex
		justify-content: flex-start
		align-items: center
		flex-wrap: wrap
		gap: rem(16)
		&:not(:last-child)
			margin-bottom: rem(48)

	&__title
		font-family: var(--font-secondary)
		font-size: var(--fontSizeH3)
		font-weight: 500
		line-height: var(--lineHeightH2)
		text-transform: uppercase

	&__statuses
		display: flex
		align-items: center
		gap: rem(8)

	&__actions
		display: flex
		align-items: center
		gap: rem(8)

		&:not(:last-child)
			margin-left: auto

	&__body
		display: grid
		grid-template-columns: repeat(12, minmax(0, 1fr))
		grid-gap: rem(80) rem(24)
</style>
