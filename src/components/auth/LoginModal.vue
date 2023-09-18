<script lang="ts">
import {defineComponent, reactive} from 'vue'
import InputText from "@components/utils/form/InputText.vue";
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import {useModalsStore} from "@scripts/hooks/stateHooks/useModalsStore";
import {helpers, required, email, maxLength} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {errorMessages} from "@scripts/consts/validation";
import {useUsersStore} from "@scripts/hooks/stateHooks/useUsersStore";
import {useContentsStore} from "@scripts/hooks/stateHooks/useContentsStore";
import {useBaseStore} from "@scripts/hooks/stateHooks/useBaseStore";

export default defineComponent({
	name: "LoginModal",
	components: {IconSVG, InputText},
	mixins: [useModalsStore, useUsersStore, useContentsStore, useBaseStore],
	emits: ['close'],
	setup() {
		const externalResults = reactive({});
		const { withMessage } = helpers;

		return {
			errorMessages,
			withMessage,
			externalResults,
			v$: useVuelidate({ $externalResults: externalResults }),
		};
	},
	data() {
		return {
			formData: {
				email: '',
				password: '',
			}
		}
	},
	validations() {
		return {
			formData: {
				email: {
					required: this.withMessage(this.errorMessages.required, required),
					email: this.withMessage(this.errorMessages.email, email),
					maxLength: this.withMessage(this.errorMessages.maxLength(50), maxLength(50)),
				},
				password: {
					required: this.withMessage(this.errorMessages.required, required),
					maxLength: this.withMessage(this.errorMessages.maxLength(50), maxLength(250)),
				},
			}
		}
	},
	methods: {
		submitForm() {
			this.v$.$validate().then((result) => {
				if (!result) return;

				this.requestLogIn({
					...this.formData,
				}).then(() => {
					this.$emit('close');
				}).catch((error) => {
					const externalError = {
						formData: {
							email: error,
						},
					};
					Object.assign(this.externalResults, externalError);
					const clearTrigger = this.$watch(
						'formData',
						() => {
							this.v$.$clearExternalResults();
							clearTrigger();
						},
						{ deep: true }
					);

				})
			})
		}
	}

})
</script>

<template>
	<section class="modal">

		<button class="modal__close link link--size-large link--color-tertiary" data-dialog-close aria-label="закрыть" @click="$emit('close')">
			<IconSVG name="close" class="link__icon"/>
		</button>

		<h3 class="modal__title">Войти или зарегистрироваться</h3>

		<slot name="tabs"></slot>

		<div class="modal__divider"></div>

		<form class="modal__form form" @submit.prevent="submitForm">
			<div class="form__inputs">
				<div class="form__input">
					<InputText id="auth-login" v-model="formData.email" :errors="v$.formData.email.$errors" label="E-mail" type="email" placeholder="Введите почту"/>
				</div>
				<div class="form__input">
					<InputText id="auth-password" v-model="formData.password" :errors="v$.formData.password.$errors" label="Пароль" placeholder="Введите пароль" password>
						<template #underInput>
							<span class="form__underhint">Забыли пароль? <button class="link link--secondary link--size-small link--color-fourth" type="button" @click="openModal('recover-password-modal')">Восстановить</button></span>
						</template>
					</InputText>
				</div>
			</div>
			<div class="form__bottom">
				<p class="form__policy form__policy--grey">
					Нажимая кнопку «Войти», Вы&nbsp;<a :href="getLegalDocs.processingPersonal" target="_blank">соглашаетесь</a> с&nbsp;условиями <a :href="getLegalDocs.privacyPolicy" target="_blank">политики обработки персональных данных</a>.
				</p>
				<div class="form__submit form__submit--rtl">
					<button class="btn btn--color-secondary" type="submit" :disabled="(v$.$error && v$.$dirty) || isAppLoading">
						<span class="btn__text">Войти</span>
					</button>
				</div>
			</div>
		</form>

	</section>
</template>

<style scoped lang="sass">

</style>
