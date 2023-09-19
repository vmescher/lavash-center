<script lang="ts">
import {defineComponent, ref} from 'vue'
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import InputText from "@components/utils/form/InputText.vue";
import {email, helpers, maxLength, minLength, required, sameAs} from "@vuelidate/validators";
import {errorMessages} from "@scripts/consts/validation";
import useVuelidate from "@vuelidate/core";
import {useModalsStore} from "@scripts/hooks/stateHooks/useModalsStore";
import {useUsersStore} from "@scripts/hooks/stateHooks/useUsersStore";
import {useContentsStore} from "@scripts/hooks/stateHooks/useContentsStore";
import {useBaseStore} from "@scripts/hooks/stateHooks/useBaseStore";
import NotionModal from "@components/modals/NotionModal.vue";

export default defineComponent({
	name: "RegisterModal",
	components: {
		NotionModal,
		InputText,
		IconSVG,
	},
	mixins: [useModalsStore, useUsersStore, useContentsStore, useBaseStore],
	emits: ['close'],
	setup() {
		const externalError = ref('');
		const { withMessage } = helpers;

		return {
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
				lastName: '',
				phone: '',
				email: '',
				password: '',
				confirmPassword: ''
			}
		}
	},
	validations() {
		return {
			formData: {
				name: {
					required: this.withMessage(this.errorMessages.required, required),
					minLength: this.withMessage(this.errorMessages.minLength(2), minLength(2)),
					maxLength: this.withMessage(this.errorMessages.maxLength(50), maxLength(50)),
				},
				lastName: {
					required: this.withMessage(this.errorMessages.required, required),
					minLength: this.withMessage(this.errorMessages.minLength(2), minLength(2)),
					maxLength: this.withMessage(this.errorMessages.maxLength(50), maxLength(50)),
				},
				phone: {
					required: this.withMessage(this.errorMessages.required, required),
					minLength: this.withMessage(this.errorMessages.phone, minLength(18)),
				},
				email: {
					required: this.withMessage(this.errorMessages.required, required),
					email: this.withMessage(this.errorMessages.email, email),
					maxLength: this.withMessage(this.errorMessages.maxLength(50), maxLength(50)),
				},
				password: {
					required: this.withMessage(this.errorMessages.required, required),
					maxLength: this.withMessage(this.errorMessages.maxLength(250), maxLength(250)),
					minLength: this.withMessage(this.errorMessages.password(6), minLength(6))
				},
				confirmPassword: {
					required: this.withMessage(this.errorMessages.required, required),
					maxLength: this.withMessage(this.errorMessages.maxLength(250), maxLength(250)),
					sameAs: this.withMessage(this.errorMessages.passwordConfirm, sameAs(this.formData.password))
				}
			}
		}
	},
	methods: {
		submitForm() {
			this.v$.$validate().then((result) => {
				if (!result) return;

				this.requestRegister({
					...this.formData,
				}).then(() => {
					this.openModal('register-success-notion');
				}).catch((error) => {
					this.externalError = error;
					this.openModal('register-error-notion');
				})
			})
		}
	}
})
</script>

<template>
	<section class="modal modal--wide">

		<button class="modal__close link link--size-large link--color-tertiary" data-dialog-close aria-label="закрыть" @click="$emit('close')">
			<IconSVG name="close" class="link__icon"/>
		</button>

		<h3 class="modal__title">Войти или зарегистрироваться</h3>

		<slot name="tabs"></slot>

		<div class="modal__divider"></div>

		<form class="modal__form form" @submit.prevent="submitForm">
			<div class="form__inputs form__inputs--2">
				<div class="form__input">
					<InputText id="register-name" v-model="formData.name" :errors="v$.formData.name.$errors" label="Имя" placeholder="Введите имя"/>
				</div>
				<div class="form__input">
					<InputText id="register-lastname" v-model="formData.lastName" :errors="v$.formData.lastName.$errors" label="Фамилия" placeholder="Введите фамилию"/>
				</div>
				<div class="form__input">
					<InputText id="register-email" v-model="formData.email" :errors="v$.formData.email.$errors" label="E-mail" type="email" placeholder="Введите почту"/>
				</div>
				<div class="form__input">
					<InputText id="register-phone" v-model="formData.phone" :errors="v$.formData.phone.$errors" label="Телефон" type="tel" mask-type="phoneMask" placeholder="Введите номер телефона"/>
				</div>
				<div class="form__input">
					<InputText id="register-password" v-model="formData.password" :errors="v$.formData.password.$errors" label="Придумайте пароль" placeholder="Введите пароль" password />
				</div>
				<div class="form__input">
					<InputText id="register-repeat-password" v-model="formData.confirmPassword" :errors="v$.formData.confirmPassword.$errors" label="Повторите пароль" placeholder="Введите пароль еще раз" password />
				</div>
			</div>
			<div class="form__bottom">
				<p class="form__policy form__policy--grey">
					Нажимая кнопку «Зарегистрироваться», Вы&nbsp;<a :href="getLegalDocs.processingPersonal" target="_blank">соглашаетесь</a> с&nbsp;условиями <a :href="getLegalDocs.privacyPolicy" target="_blank">политики обработки персональных данных</a>.
				</p>
				<div class="form__submit form__submit--rtl">
					<button class="btn btn--color-secondary" type="submit" :disabled="(v$.$error && v$.$dirty) || isAppLoading">
						<span class="btn__text">Зарегистрироваться</span>
					</button>
				</div>
			</div>
		</form>

		<NotionModal id="register-success-notion" title="Проверьте электронную почту" text="На вашу почту была отправлена ссылка для активации аккаунта. Перейдите по ней для завершения регистрации" @close="$emit('close')"/>
		<NotionModal id="register-error-notion" title="Что-то пошло не так" :text="externalError"/>

	</section>
</template>

<style scoped lang="sass">

</style>
