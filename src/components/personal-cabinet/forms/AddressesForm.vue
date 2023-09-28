<script lang="ts">
import {defineComponent} from 'vue'
import InputText from "@components/utils/form/InputText.vue";
import {useAddressesStore} from "@scripts/hooks/stateHooks/useAddressesStore";
import {helpers, maxLength, minLength, required} from "@vuelidate/validators";
import {errorMessages} from "@scripts/consts/validation";
import useVuelidate from "@vuelidate/core";
import {Address} from "@scripts/api/addresses/types";
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import {useBaseStore} from "@scripts/hooks/stateHooks/useBaseStore";

export default defineComponent({
	name: "AddressesForm",
	components: {IconSVG, InputText},
	mixins: [useAddressesStore, useBaseStore],
	setup() {
		const { withMessage } = helpers;

		return {
			errorMessages,
			withMessage,
			v$: useVuelidate(),
		};
	},
	data() {
		return {
			formEditable: false,
			formData: {
				addresses: [] as Address[],
			}
		}
	},
	validations() {
		return {
			formData: {
				addresses: {
					$each: helpers.forEach({
						address: {
							required: this.withMessage(this.errorMessages.required, required),
							minLength: this.withMessage(this.errorMessages.minLength(2), minLength(2)),
							maxLength: this.withMessage(this.errorMessages.maxLength(50), maxLength(50)),
						},
					})
				},
			}
		}
	},
	created() {
		this.hydrateAddresses()
	},
	methods: {
		hydrateAddresses() {
			if (this.getAddresses.length) {
				this.formData.addresses = this.getAddresses
			} else {
				this.requestAddresses()
					.then((addresses) => {
						if (!addresses.length) {
							this.formData.addresses = [{id: 1, address: ''}];
						} else {
							this.formData.addresses = addresses;
						}
					})
					.catch(() => {
						this.formData.addresses = [{id: 1, address: ''}]
					})
			}
		},
		addAddress() {
			this.formData.addresses.push({id: this.formData.addresses.length + 1, address: ''})

			if (!this.formEditable) {
				this.toggleFormEditable();
			}
		},
		toggleFormEditable() {
			if (this.formEditable) {
				this.v$.formData.$reset();
			}
			this.formEditable = !this.formEditable;
		},
		submitForm() {
			this.v$.$validate().then((result) => {
				if (!result) return;

				this.requestSaveAddresses({
					addresses: this.formData.addresses.map((address) => address.address)
				}).then(() => {
					this.toggleFormEditable();
					this.requestAddresses();
				}).catch(() => {
					this.toggleFormEditable();
				})
			})
		}
	}
})
</script>

<template>
	<form class="form" @submit.prevent="submitForm">
		<div class="form__top">
			<h3 class="form__title">Адрес доставки</h3>
		</div>
		<div class="form__inputs form__inputs--2">
			<div v-for="(address, index) in formData.addresses" :key="address.id" class="form__input form__input--new-row">
				<InputText v-model="address.address" :errors="v$.formData.addresses.$errors.length ? v$.formData.addresses.$each.$response.$errors[index].address : []" :read-only="!formEditable" :label="`Адрес доставки #${index + 1}`" placeholder="Введите адрес">
					<template v-if="index === 0 && !getAddresses.length" #underInput>
						<span class="form__underhint">Заполните поле, чтобы мы знали куда доставлять ваш заказ.</span>
					</template>
					<template v-if="formData.addresses.length > 1 && formEditable" #action>
						<button class="link link--color-secondary" type="button" @click="formData.addresses.splice(index, 1)">
							<IconSVG name="close" class="link__icon" />
						</button>
					</template>
				</InputText>
			</div>
		</div>
		<div class="form__bottom">
			<div class="form__submit">
				<button v-if="!formEditable" class="btn btn--color-secondary" type="button" @click="toggleFormEditable">
					<span class="btn__text">Редактировать адреса</span>
					<IconSVG name="edit" class="btn__icon"/>
				</button>
				<button v-else class="btn btn--color-secondary" type="submit" :disabled="(v$.formData.$error && v$.formData.$dirty) || isAppLoading">
					<span class="btn__text">сохранить изменения</span>
				</button>
				<button v-if="formData.addresses.length < 15" class="btn" type="button" @click="addAddress">
					<span class="btn__text">добавить еще один адрес доставки</span>
					<IconSVG name="plus" class="btn__icon"/>
				</button>
			</div>
		</div>
	</form>
</template>

<style scoped lang="sass">

</style>
