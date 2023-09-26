<script lang="ts">
import {defineComponent, ref} from 'vue'
import InputDate from "@components/utils/form/InputDate.vue";
import BaseNotion from "@components/utils/ui/BaseNotion.vue";
import TimeSelect from "@components/utils/selects/TimeSelect.vue";
// import AddressSelect from "@components/utils/selects/AddressSelect.vue";
import {useBasketStore} from "@scripts/hooks/stateHooks/useBasketStore";
import InputText from "@components/utils/form/InputText.vue";
import {helpers, maxLength, minLength, minValue, required, requiredIf} from "@vuelidate/validators";
import {errorMessages} from "@scripts/consts/validation";
import useVuelidate from "@vuelidate/core";
import {useModalsStore} from "@scripts/hooks/stateHooks/useModalsStore";
import {useOrdersStore} from "@scripts/hooks/stateHooks/useOrdersStore";
import NotionModal from "@components/modals/NotionModal.vue";
import {RouteNames} from "@scripts/router/types";
import {useBaseStore} from "@scripts/hooks/stateHooks/useBaseStore";

export default defineComponent({
	name: "OrderForm",
	components: {NotionModal, InputText, TimeSelect, BaseNotion, InputDate},
	mixins: [useBasketStore, useModalsStore, useOrdersStore, useBaseStore],
	props: {
		deliveryTypeId: {
			type: Number,
			required: true,
			default: 1,
		}
	},
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
				date: null as Date | null,
				time: null as string | null,
				address: null as string | null,
			}
		}
	},
	validations() {
		return {
			formData: {
				date: {
					required: this.withMessage(this.errorMessages.required, required),
					minValue: this.withMessage(this.errorMessages.minDate(new Date()), minValue(new Date())),
				},
				time: {
					requiredIf: this.withMessage(this.errorMessages.required, requiredIf(() => this.deliveryTypeId === 1)),
				},
				address: {
					requiredIf: this.withMessage(this.errorMessages.required, requiredIf(() => this.deliveryTypeId === 2)),
					minLength: this.withMessage(this.errorMessages.minLength(2), minLength(2)),
					maxLength: this.withMessage(this.errorMessages.maxLength(250), maxLength(250)),
				},
			}
		}
	},
	computed: {
		getOrderTotalPriceFormatted(): string {
			return this.getBasketTotalPrice.toLocaleString('ru-RU', {
				style: 'currency',
				currency: 'RUB',
				minimumFractionDigits: 0,
				maximumFractionDigits: 2,
			})
		}
	},
	watch: {
		'formData.date': {
			handler() {
				this.formData.time = null;
			},
		}
	},
	methods: {
		submitForm() {
			this.v$.$validate().then((result) => {
				if (!result) return;

				this.requestCreateOrder({
					date: this.formData.date,
					...(this.deliveryTypeId === 1 && {
						time: this.formData.time,
					}),
					...(this.deliveryTypeId === 2 && {
						address: this.formData.address,
					}),
					deliveryTypeId: this.deliveryTypeId,
				}).then(() => {
					this.$emit('submit');
					this.openModal('order-success-notion');
				}).catch((error) => {
					this.externalError = error;
					this.openModal('order-error-notion');
				})
			})
		}
	}
})
</script>

<template>
	<form class="order__block" @submit.prevent="submitForm">
		<h4 class="order__title">Когда вам будет удобно забрать заказ?</h4>

		<div class="order__form form">
			<div class="form__inputs form__inputs--4">
				<div v-if="deliveryTypeId === 2" class="form__input form__input--2" >
<!--					TODO: Добавить выбор адреса -->
<!--					<AddressSelect v-model="formData.address"/>-->
					<InputText id="order-address" v-model="formData.address" :errors="v$.formData.address.$errors" placeholder="Введите адрес" label="Адрес доставки" />
				</div>
				<div class="form__input">
					<InputDate id="order-date" v-model="formData.date" :errors="v$.formData.date.$errors" label="Дата" placeholder="ДД.ММ.ГГГГ" :min-date="new Date()"/>
				</div>
				<div v-if="deliveryTypeId === 1" class="form__input">
					<TimeSelect id="order-time" v-model="formData.time" :errors="v$.formData.time.$errors" :disabled="!formData.date" :is-today="formData.date?.toLocaleDateString() === new Date().toLocaleDateString()"/>
				</div>
			</div>
		</div>

		<BaseNotion class="order__notion">
			Обратите внимание, что оплата заказа производится при получении.

			<template #text>
				Обратите внимание, что оплата заказа производится наличными или картой курьеру или при получении по адресу
				г. Копейск, ул. Кемеровская, д. 3а.
			</template>
		</BaseNotion>

		<div class="order__bottom">
			<div class="order__total">
				<span class="order__total-title">Итого</span>
				<span class="order__total-value">{{ getOrderTotalPriceFormatted }}</span>
			</div>

			<button class="order__button btn btn--color-secondary" type="submit" :disabled="(v$.$error && v$.$dirty) || isAppLoading">
				<span class="btn__text">Оформить заказ</span>
			</button>

		</div>

		<NotionModal id="order-success-notion" title="Ваш заказ успешно оформлен!" text="Ваш заказ был успешно оформлен. Вы всегда можете найти его в личном кабинете. Если у вас остались вопросы свяжитесь с нами по телефону <a href='tel:8 900 000 00 00'>8 900 000 00 00</a>." @close="$router.push({name: RouteNames.MAIN_PAGE})"/>
		<NotionModal id="order-error-notion" title="Что-то пошло не так" :text="externalError"/>
	</form>
</template>

<style scoped lang="sass">

</style>
