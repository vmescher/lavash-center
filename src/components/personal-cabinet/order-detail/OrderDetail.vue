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
		newOrder: {
			type: Boolean,
			default: false
		}
	},
	emits: ['update:viewMode'],
	setup(props) {
		const orderData = props.newOrder ? null : inject<Order>('orderData');
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
			}, Number(this.$route.params.id));
		},
		updatePaymentStatus(statusId: number) {
			this.requestUpdateManagerOrderPaymentStatus({
				statusId
			}, Number(this.$route.params.id));
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
				<h3 class="order-detail__title">{{ newOrder ? 'Новый заказ' : `№${orderData?.id || '-'}` }}</h3>
				<div v-if="!newOrder" class="order-detail__statuses">
					<template v-if="isAdmin">
						<StatusToggler :model-value="orderData?.orderStatusId" is-editable :statuses="getOrderStatuses" @update:model-value="updateOrderStatus"/>
						<StatusToggler :model-value="orderData?.paymentStatusId" is-editable :statuses="getPaymentStatuses" @update:model-value="updatePaymentStatus"/>
					</template>
					<template v-else>
						<StatusToggler :model-value="orderData?.orderStatusId" :statuses="getOrderStatuses"/>
					</template>
				</div>

				<div v-if="viewMode !== 'editing' && isAdmin && !newOrder" class="order-detail__actions">
					<button class="btn btn--color-secondary" type="button" @click.prevent="$emit('update:viewMode', 'editing')">
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

<style lang="sass">
.order-detail
	&__back
		display: flex
		align-items: center
		gap: rem(16)
		&:not(:last-child)
			margin-bottom: rem(64)

			+until-laptop
				margin-bottom: rem(48)

			+while-mob-xl
				margin-bottom: rem(32)

	&__top
		display: flex
		justify-content: flex-start
		align-items: center
		flex-wrap: wrap
		gap: rem(16)

		+while-mob-xl
			gap: rem(24)
			justify-content: space-between

		&:not(:last-child)
			margin-bottom: rem(48)

			+until-laptop
				margin-bottom: rem(32)

			+while-mob-xl
				margin-bottom: rem(24)

	&__title
		font-family: var(--font-secondary)
		font-size: var(--fontSizeH3)
		font-weight: 500
		line-height: var(--lineHeightH2)
		text-transform: uppercase

		+until-laptop
			font-size: var(--fontSizeH4)
			line-height: var(--lineHeightH3)

	&__statuses
		display: flex
		align-items: center
		gap: rem(8)

	&__actions
		display: flex
		align-items: center
		gap: rem(8)

		&:not(:first-child)
			margin-left: auto

			+while-mob-xl
				margin-left: 0

	&__body
		display: grid
		grid-template-columns: repeat(12, minmax(0, 1fr))
		grid-gap: rem(80) rem(24)

		+until-laptop
			grid-gap: rem(40) rem(24)

		+while-mob-xl
			grid-gap: rem(32) rem(8)

	&__block
		grid-column: span 8

		+until-pc
			grid-column: span 10

		+until-laptop
			grid-column: 1 / -1

		&--wide
			grid-column: 1 / -1

	&__form
		&:not(:last-child)
			margin-bottom: rem(80)

			+until-laptop
				margin-bottom: rem(40)

			+while-mob-xl
				margin-bottom: rem(32)

	&__cart
		&:not(:last-child)
			margin-bottom: rem(32)

			+while-mob-xl
				margin-bottom: rem(24)

	&__bottom
		position: relative

		padding-top: rem(18)

		+while-mob-xl
			flex-direction: column
			align-items: stretch
			gap: rem(24)
			padding-top: rem(12)

		&:not(:first-child)
			margin-top: rem(32)

			+while-mob-xl
				margin-top: rem(24)

		&::before
			content: ''
			position: absolute
			top: 0
			left: 0

			display: block
			width: 100%
			height: 2px

			border-radius: var(--radius-divider)
			background-color: var(--color-primary)

	&__total
		width: 100%
		display: flex
		justify-content: space-between
		align-items: center
		gap: rem(24)

		&:not(:last-child)
			margin-bottom: rem(40)

		&-title,
		&-value
			font-family: var(--font-secondary)
			font-size: var(--fontSizeH4)
			font-weight: 700
			line-height: var(--lineHeightH3)
			text-transform: uppercase

	&__submit
		display: flex
		align-items: center
		justify-content: flex-end
		gap: rem(8)

</style>
