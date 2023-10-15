<script lang="ts">
import {defineComponent} from 'vue'
import BackHeader from "@components/structural/BackHeader.vue";
import {RouteNames} from "@scripts/router/types";
import SectionTitle from "@components/utils/templates/structural/SectionTitle.vue";
import OrderCheckout from "@components/order/OrderCheckout.vue";
import ConfirmModal from "@components/modals/ConfirmModal.vue";

export default defineComponent({
	name: "QuickOrderView",
	components: {ConfirmModal, OrderCheckout, SectionTitle, BackHeader},
	beforeRouteLeave() {
		if (this.isFormSubmitted) {
			return true;
		}

		const confirmLeaveModal = this.$refs.confirmLeave as typeof ConfirmModal;
		if (!confirmLeaveModal) return true;

		return confirmLeaveModal.show().then(() => true).catch(() => false);
	},
	setup() {
		return {
			RouteNames
		}
	},
	data() {
		return {
			isFormSubmitted: false,
		}
	}
})
</script>

<template>
	<main class="page">
		<BackHeader :back-target="RouteNames.MAIN_PAGE">Вернуться в каталог</BackHeader>
		<SectionTitle>Быстрое Оформление заказа</SectionTitle>
		<OrderCheckout editable-basket @submit="isFormSubmitted = true"/>

		<ConfirmModal id="order-leave-confirm" ref="confirmLeave" title="Вы уверены, что хотите прервать оформление заказа?" text="Все заполненные вами данные будут безвозвратно утеряны." confirm-button="Да, прервать" cancel-button="Вернуться к оформлению"/>
	</main>
</template>

<style scoped lang="sass">

</style>
