<script lang="ts">
import {defineComponent, ref} from 'vue'
import TimeSelect from "@components/utils/selects/TimeSelect.vue";
import InputDate from "@components/utils/form/InputDate.vue";
import AddressSelect from "@components/utils/selects/AddressSelect.vue";
import NotionModal from "@components/modals/NotionModal.vue";
import {helpers, maxLength, minLength, required, requiredIf} from "@vuelidate/validators";
import {RouteNames} from "@scripts/router/types";
import {errorMessages} from "@scripts/consts/validation";
import useVuelidate from "@vuelidate/core";
import {getFormattedPrice} from "@scripts/mixins/getFormattedPrice";
import {useBasketStore} from "@scripts/hooks/stateHooks/useBasketStore";
import {useModalsStore} from "@scripts/hooks/stateHooks/useModalsStore";
import {useOrdersStore} from "@scripts/hooks/stateHooks/useOrdersStore";
import {useBaseStore} from "@scripts/hooks/stateHooks/useBaseStore";
import InputText from "@components/utils/form/InputText.vue";
import DeliveryTypeSelect from "@components/utils/selects/DeliveryTypeSelect.vue";
import OrderCartConstructor from "@components/order/OrderCartConstructor.vue";

export default defineComponent({
	name: "OrderForm",
	components: {OrderCartConstructor, DeliveryTypeSelect, InputText, NotionModal, AddressSelect, InputDate, TimeSelect},
	mixins: [useBasketStore, useModalsStore, useOrdersStore, useBaseStore, getFormattedPrice],
	emits: ['submit'],
	setup() {
		const externalError = ref('');
		const { withMessage } = helpers;

		return {
			RouteNames,
			errorMessages,
			withMessage,
			externalError,
			v$: useVuelidate(),
		};
	},
	data() {
		return {
			formData: {
				name: '',
				phone: '',
				deliveryTypeId: 1,
				date: null as Date | null,
				time: null as string | null,
				address: null as string | null,
				products: [],
			}
		}
	},
	validations() {
		return {
			formData: {
				name: {
					required: this.withMessage(this.errorMessages.required, required),
					minLength: this.withMessage(this.errorMessages.minLength(2), minLength(2)),
					maxLength: this.withMessage(this.errorMessages.maxLength(250), maxLength(250)),
				},
				phone: {
					required: this.withMessage(this.errorMessages.required, required),
					minLength: this.withMessage(this.errorMessages.phone, minLength(18)),
				},
				date: {
					required: this.withMessage(this.errorMessages.required, required),
				},
				time: {
					requiredIf: this.withMessage(this.errorMessages.required, requiredIf(() => this.isPickupSelected)),
				},
				address: {
					requiredIf: this.withMessage(this.errorMessages.required, requiredIf(() => this.isCourierSelected)),
					minLength: this.withMessage(this.errorMessages.minLength(2), minLength(2)),
					maxLength: this.withMessage(this.errorMessages.maxLength(250), maxLength(250)),
				},
				products: {
					required: this.withMessage(this.errorMessages.required, required),
				},
				deliveryTypeId: {
					required: this.withMessage(this.errorMessages.required, required),
				},
			}
		}
	},
	computed: {
		isCourierSelected() {
			const deliveryData = this.getDeliveryType(this.formData.deliveryTypeId);
			return deliveryData && deliveryData.xmlId === 'courier';
		},
		isPickupSelected() {
			const deliveryData = this.getDeliveryType(this.formData.deliveryTypeId);
			return deliveryData && deliveryData.xmlId === 'pickup';
		},
	},
})
</script>

<template>
	<form class="order-detail__block order-detail__block--wide">
		<div class="order-detail__form form">
			<div class="form__inputs form__inputs--custom">
				<div class="form__input form__input--4">
					<InputText id="order-name" v-model="formData.name" :errors="v$.formData.name.$errors" label="Клиент" placeholder="Введите имя клиента"/>
				</div>
				<div class="form__input form__input--3">
					<InputText id="order-phone" v-model="formData.phone" :errors="v$.formData.phone.$errors" label="Телефон" type="tel" mask-type="phoneMask" placeholder="Введите номер телефона"/>
				</div>
				<div class="form__input form__input--3">
					<DeliveryTypeSelect v-model="formData.deliveryTypeId" :errors="v$.formData.deliveryTypeId.$errors" label="Способ получения" placeholder="Выберите способ получения"/>
				</div>
			</div>

			<div class="form__inputs form__inputs--custom">
				<div v-if="isCourierSelected" class="form__input form__input--4" >
					<AddressSelect id="order-address" v-model="formData.address" :errors="v$.formData.address.$errors" placeholder="Введите адрес" label="Адрес доставки"/>
				</div>
				<div class="form__input form__input--3">
					<InputDate id="order-date" v-model="formData.date" :errors="v$.formData.date.$errors" label="Дата" placeholder="ДД.ММ.ГГГГ" :min-date="new Date()"/>
				</div>
				<div v-if="isPickupSelected" class="form__input form__input--3">
					<TimeSelect id="order-time" v-model="formData.time" :errors="v$.formData.time.$errors" :disabled="!formData.date" :is-today="formData.date?.toLocaleDateString() === new Date().toLocaleDateString()"/>
				</div>
			</div>
		</div>

		<OrderCartConstructor v-model="formData.products" class="order-detail__cart"/>

		<div class="order-detail__bottom">
			<div class="order-detail__total">
				<span class="order-detail__total-title">Итого</span>
				<span class="order-detail__total-value">{{ getFormattedPrice(0) }}</span>
			</div>

			<div class="order-detail__submit">
				<button class="btn" type="submit" :disabled="(v$.$error && v$.$dirty) || isAppLoading">
					<span class="btn__text">Не сохранять</span>
				</button>
				<button class="btn btn--color-secondary" type="submit" :disabled="(v$.$error && v$.$dirty) || isAppLoading">
					<span class="btn__text">Сохранить изменения</span>
				</button>
			</div>
		</div>

		<NotionModal id="order-success-notion" title="Ваш заказ успешно оформлен!" text="Ваш заказ был успешно оформлен. Вы всегда можете найти его в личном кабинете. Если у вас остались вопросы свяжитесь с нами по телефону <a href='tel:8 900 000 00 00'>8 900 000 00 00</a>." @close="$router.push({name: RouteNames.MAIN_PAGE})"/>
		<NotionModal id="order-error-notion" title="Что-то пошло не так" :text="externalError"/>
	</form>
</template>

<style scoped lang="sass">

</style>
