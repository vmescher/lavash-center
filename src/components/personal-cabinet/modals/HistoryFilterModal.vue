<script lang="ts">
import {defineComponent} from 'vue'
import BaseModal from "@components/utils/modals/BaseModal.vue";
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import {useBaseStore} from "@scripts/hooks/stateHooks/useBaseStore";
import DeliveryTypeSelect from "@components/utils/selects/DeliveryTypeSelect.vue";
import InputPeriod, {PeriodValueType} from "@components/utils/form/InputPeriod.vue";
import PaymentStatusSelect from "@components/utils/selects/PaymentStatusSelect.vue";
import OrderStatusSelect from "@components/utils/selects/OrderStatusSelect.vue";
import {useOrdersStore} from "@scripts/hooks/stateHooks/useOrdersStore";
import {useModalsStore} from "@scripts/hooks/stateHooks/useModalsStore";
import {OrderFilterPeriod} from "@scripts/api/orders/types";

export default defineComponent({
	name: "HistoryFilterModal",
	components: {OrderStatusSelect, PaymentStatusSelect, InputPeriod, DeliveryTypeSelect, IconSVG, BaseModal},
	mixins: [useBaseStore, useModalsStore, useOrdersStore],
	emits: ['apply', 'clear'],
	data() {
		return {
			filters: {
				deliveryType: null as number | null,
				paymentStatus: null as number | null,
				orderStatus: null as number | null,
				period: null as PeriodValueType,
			},
		}
	},
	computed: {
		deliveryType: {
			get(): number | null {
				return this.getOrdersFilterKey('deliveryType') as number | null;
			},
			set(value: number | null) {
				this.setOrdersFilter('deliveryType', value);
			}
		},
		paymentStatus: {
			get(): number | null {
				return this.getOrdersFilterKey('paymentStatus') as number | null;
			},
			set(value: number | null) {
				this.setOrdersFilter('paymentStatus', value);
			}
		},
		orderStatus: {
			get(): number | null {
				return this.getOrdersFilterKey('orderStatus') as number | null;
			},
			set(value: number | null) {
				this.setOrdersFilter('orderStatus', value);
			}
		},
		period: {
			get(): OrderFilterPeriod {
				return this.getOrdersFilterKey('period') as OrderFilterPeriod;
			},
			set(value: OrderFilterPeriod) {
				if (!value) {
					this.setOrdersFilter('period', null);
					return;
				}
				this.setOrdersFilter('period', value);
			}
		},
	},
	methods: {
		hydrateFilters() {
			Object.assign(this.filters, {
				deliveryType: this.deliveryType,
				paymentStatus: this.paymentStatus,
				orderStatus: this.orderStatus,
				...(this.period ? {
					period: {
						start: this.period.from,
						end: this.period.to,
					}
				} : {period: null})
			})
		},
		applyFilters() {
			const {deliveryType, paymentStatus, orderStatus, period} = this.filters;
			this.deliveryType = deliveryType;
			this.paymentStatus = paymentStatus;
			this.orderStatus = orderStatus;
			this.period = period ? {
				from: period.start,
				to: period.end
			} : null;
			this.$emit('apply');
			this.closeModal('history-filter-modal');
		},
		clearFilters() {
			this.deliveryType = null;
			this.paymentStatus = null;
			this.orderStatus = null;
			this.period = null;

			this.$emit('clear');
			this.closeModal('history-filter-modal');
		}
	}
})
</script>

<template>
	<BaseModal id="history-filter-modal" v-slot="{close}" @open="hydrateFilters">
		<section class="modal">

			<button class="modal__close link link--size-large link--color-tertiary" data-dialog-close aria-label="закрыть" @click="close">
				<IconSVG name="close" class="link__icon"/>
			</button>

			<h3 class="modal__title">
				Фильтры
				<button class="link" @click.prevent="clearFilters">сбросить</button>
			</h3>

			<div class="modal__divider"></div>

			<form class="modal__form form" @submit.prevent="applyFilters">
				<div class="form__inputs">
					<div class="form__input">
						<DeliveryTypeSelect v-model="filters.deliveryType" placeholder="Любой" can-clear can-deselect/>
					</div>
					<div class="form__input">
						<InputPeriod v-model="filters.period" label="Период"/>
					</div>
					<div class="form__input">
						<PaymentStatusSelect v-model="filters.paymentStatus" placeholder="Любой" can-clear can-deselect/>
					</div>
					<div class="form__input">
						<OrderStatusSelect v-model="filters.orderStatus" placeholder="Любой" can-clear can-deselect/>
					</div>
				</div>
				<div class="form__bottom">
					<div class="form__submit form__submit--rtl">
						<button class="btn btn--color-secondary" type="submit">
							<span class="btn__text">Применить фильтры</span>
						</button>
					</div>
				</div>
			</form>
		</section>
	</BaseModal>
</template>

<style scoped lang="sass">

</style>
