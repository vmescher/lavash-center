<script lang="ts">
import {defineComponent} from 'vue'
import InputText from "@components/utils/form/InputText.vue";
import {useAddressesStore} from "@scripts/hooks/stateHooks/useAddressesStore";
import {helpers, maxLength, minLength, required} from "@vuelidate/validators";
import {errorMessages} from "@scripts/consts/validation";
import useVuelidate from "@vuelidate/core";

export default defineComponent({
	name: "AddressesForm",
	components: {InputText},
	mixins: [useAddressesStore],
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
						name: {
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
				this.formData.addresses = [{id: 1, name: ''}]
			}
		},
		submitForm() {
			this.v$.$validate().then((result) => {
				if (!result) return;

				this.requestSaveAddresses({
					addresses: this.formData.addresses.map((address) => address.name)
				}).then(() => {

				}).catch((error) => {

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
			<div v-for="(address, index) in formData.addresses" :key="address.id" class="form__input">
				<InputText v-model="address.name" :errors="v$.formData.addresses.$errors.length ? v$.formData.addresses.$each.$response.$errors[index].name : []" :label="`Адрес доставки #${index + 1}`" placeholder="Введите адрес">
					<template v-if="index === 0 && !getAddresses.length" #underInput>
						<span class="form__underhint">Заполните поле, чтобы мы знали куда доставлять ваш заказ.</span>
					</template>
				</InputText>
			</div>
		</div>
		<div class="form__bottom">
			<div class="form__submit">
				<button class="btn btn--color-secondary" type="submit">
					<span class="btn__text">сохранить изменения</span>
				</button>
			</div>
		</div>
	</form>
</template>

<style scoped lang="sass">

</style>
