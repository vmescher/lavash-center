<script lang="ts">
import {defineComponent, PropType, ref, inject} from 'vue'
import TimeSelect from "@components/utils/selects/TimeSelect.vue";
import InputDate from "@components/utils/form/InputDate.vue";
import AddressSelect from "@components/utils/selects/AddressSelect.vue";
import NotionModal from "@components/modals/NotionModal.vue";
import {helpers, maxLength, minLength, required, requiredIf} from "@vuelidate/validators";
import {RouteNames} from "@scripts/router/types";
import {errorMessages} from "@scripts/consts/validation";
import useVuelidate from "@vuelidate/core";
import {getFormattedPrice} from "@scripts/mixins/getFormattedPrice";
import {useModalsStore} from "@scripts/hooks/stateHooks/useModalsStore";
import {useOrdersStore} from "@scripts/hooks/stateHooks/useOrdersStore";
import {useBaseStore} from "@scripts/hooks/stateHooks/useBaseStore";
import InputText from "@components/utils/form/InputText.vue";
import DeliveryTypeSelect from "@components/utils/selects/DeliveryTypeSelect.vue";
import CartConstructor from "@components/cart/CartConstructor.vue";
import {Order, OrderProduct} from "@scripts/api/orders/types";
import {useProductsStore} from "@scripts/hooks/stateHooks/useProductsStore";
import {ChangeProductQuantityPayload, ProductInBasket} from "@scripts/api/basket/types";

export default defineComponent({
	name: "OrderDetailForm",
	components: {CartConstructor, DeliveryTypeSelect, InputText, NotionModal, AddressSelect, InputDate, TimeSelect},
	mixins: [useModalsStore, useOrdersStore, useBaseStore, useProductsStore, getFormattedPrice],
	props: {
		viewMode: {
			type: String as PropType<'viewing' | 'editing'>,
			default: 'viewing'
		},
		newOrder: {
			type: Boolean,
			default: false,
		}
	},
	emits: ['submit', 'cancel'],
	setup(props) {
		const externalError = ref('');
		const { withMessage } = helpers;
		const orderData = props.newOrder ? null : inject<Order>('orderData');

		return {
			RouteNames,
			errorMessages,
			withMessage,
			externalError,
			v$: useVuelidate(),
			orderData,
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
				products: [] as ProductInBasket[],
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
		isEditing() {
			return this.viewMode === 'editing';
		},
		isCourierSelected() {
			const deliveryData = this.getDeliveryType(this.formData.deliveryTypeId);
			return deliveryData && deliveryData.xmlId === 'courier';
		},
		isPickupSelected() {
			const deliveryData = this.getDeliveryType(this.formData.deliveryTypeId);
			return deliveryData && deliveryData.xmlId === 'pickup';
		},
		getTotalPrice() {
			return this.formData.products.reduce((acc, product) => acc + product.price * product.quantity, 0);
		}
	},
	created() {
		if (!this.newOrder) {
			this.hydrateOrderData();
		}
	},
	methods: {
		hydrateOrderData() {
			if (!this.orderData) return;

			const {client, address, items, deliveryTypeId, time, date, contact} = this.orderData;
			Object.assign(this.formData, {
				name: client,
				phone: contact,
				deliveryTypeId,
				date: new Date(date),
				time,
				address,
				products: items.map(item => ({
					...item
				}))
			})
		},
		submitForm() {
			this.v$.$validate().then((result) => {
				if (!result) return;

				if (!this.newOrder) {
					if (!this.orderData) return;

					this.requestUpdateManagerOrder({
						...this.formData,
						products: this.formData.products.map(product => ({
							id: product.id,
							quantity: product.quantity,
						})),
					}, this.orderData.id).then(() => {
						this.$emit('submit');
					}).catch((error) => {
						this.externalError = error;
						this.openModal('order-error-notion');
					})
				} else {
					this.requestCreateManagerOrder({
						...this.formData,
						products: this.formData.products.map(product => ({
							id: product.id,
							quantity: product.quantity,
						})) as OrderProduct[],
					}).then((response) => {
						this.$emit('submit', response.id);
					}).catch((error) => {
						this.externalError = error;
						this.openModal('order-error-notion');
					})
				}

			});
		},
		resetForm() {
			if (!this.newOrder) this.hydrateOrderData();
			this.$emit('cancel');
		},
		addProduct(productId: number) {
			const product = this.getProductById(productId);
			if (!product) return;
			this.formData.products.unshift({
				...product,
				quantity: 1,
			})
		},
		removeProduct(productId: number) {
			this.formData.products = this.formData.products.filter(product => product.id !== productId);
		},
		changeProductQuantity({productId, quantity}: ChangeProductQuantityPayload) {
			const product = this.formData.products.find(item => item.id === productId);
			if (!product) return;
			product.quantity = quantity;
		},
	}
})
</script>

<template>
	<form class="order-detail__block order-detail__block--wide" @submit.prevent="submitForm">
		<div class="order-detail__form form">
			<div class="form__inputs form__inputs--custom">
				<div class="form__input form__input--4">
					<InputText id="order-name" v-model="formData.name" :errors="v$.formData.name.$errors" :read-only="!isEditing" label="Клиент" placeholder="Введите имя клиента"/>
				</div>
				<div class="form__input form__input--3">
					<InputText id="order-phone" v-model="formData.phone" :errors="v$.formData.phone.$errors" :read-only="!isEditing" label="Телефон" type="tel" mask-type="phoneMask" placeholder="Введите номер телефона"/>
				</div>
				<div class="form__input form__input--3">
					<DeliveryTypeSelect id="order-deliveryType" v-model="formData.deliveryTypeId" :errors="v$.formData.deliveryTypeId.$errors" :read-only="!isEditing" label="Способ получения" placeholder="Выберите способ получения"/>
				</div>
			</div>

			<div class="form__inputs form__inputs--custom">
				<div v-if="isCourierSelected" class="form__input form__input--4" >
					<AddressSelect id="order-address" v-model="formData.address" :errors="v$.formData.address.$errors" :read-only="!isEditing" placeholder="Введите адрес" label="Адрес доставки"/>
				</div>
				<div class="form__input form__input--3">
					<InputDate id="order-date" v-model="formData.date" :errors="v$.formData.date.$errors" :read-only="!isEditing" label="Дата" placeholder="ДД.ММ.ГГГГ" :min-date="new Date()"/>
				</div>
				<div v-if="isPickupSelected" class="form__input form__input--3">
					<TimeSelect id="order-time" v-model="formData.time" :errors="v$.formData.time.$errors" :read-only="!isEditing" :disabled="!formData.date" :is-today="formData.date?.toLocaleDateString() === new Date().toLocaleDateString()"/>
				</div>
			</div>
		</div>

		<CartConstructor :products="formData.products" :errors="v$.formData.products.$errors" :view-mode="viewMode" class="order-detail__cart" @add="addProduct" @remove="removeProduct" @change-quantity="changeProductQuantity"/>

		<div class="order-detail__bottom">
			<div class="order-detail__total">
				<span class="order-detail__total-title">Итого</span>
				<span class="order-detail__total-value">{{ getFormattedPrice(getTotalPrice) }}</span>
			</div>

			<div v-if="viewMode === 'editing'" class="order-detail__submit">
				<button class="btn" type="button" @click.prevent="resetForm">
					<span class="btn__text">{{ newOrder ? 'Отмена' : 'Не сохранять' }}</span>
				</button>
				<button class="btn btn--color-secondary" type="submit" :disabled="(v$.$error && v$.$dirty) || isAppLoading">
					<span class="btn__text">{{ newOrder ? 'Создать заказ' : 'Сохранить изменения' }}</span>
				</button>
			</div>
		</div>

		<NotionModal id="order-error-notion" title="Что-то пошло не так" :text="externalError"/>
	</form>
</template>

<style scoped lang="sass">

</style>
