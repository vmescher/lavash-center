<script lang="ts">
import {defineComponent, reactive} from 'vue'
import BaseModal from "@components/utils/modals/BaseModal.vue";
import InputText from "@components/utils/form/InputText.vue";
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import {useModalsStore} from "@scripts/hooks/stateHooks/useModalsStore";
import {useUsersStore} from "@scripts/hooks/stateHooks/useUsersStore";
import {useContentsStore} from "@scripts/hooks/stateHooks/useContentsStore";
import {useBaseStore} from "@scripts/hooks/stateHooks/useBaseStore";
import {email, helpers, maxLength, required} from "@vuelidate/validators";
import {errorMessages} from "@scripts/consts/validation";
import useVuelidate from "@vuelidate/core";
import NotionModal from "@components/modals/NotionModal.vue";

export default defineComponent({
	name: "RecoverPasswordModal",
	components: {NotionModal, IconSVG, InputText, BaseModal},
	mixins: [useModalsStore, useUsersStore, useContentsStore, useBaseStore],
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
			}
		}
	},
	methods: {
		submitForm() {
			this.v$.$validate().then((result) => {
				if (!result) return;

				this.requestRecoveryPassword({
					...this.formData,
				}).then(() => {
					this.openModal('recovery-password-notion');
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
	<BaseModal id="recover-password-modal" v-slot="{close}">
		<section class="modal">

			<button class="modal__close link link--size-large link--color-tertiary" data-dialog-close aria-label="закрыть" @click="close">
				<IconSVG name="close" class="link__icon"/>
			</button>

			<h3 class="modal__title">Восстановление пароля</h3>

			<p class="modal__text">Введите свою почту, которую вы использовали при регистрации, мы отправим вам ссылку для восстановления пароля.</p>

			<div class="modal__divider"></div>

			<form class="modal__form form" @submit.prevent="submitForm">
				<div class="form__inputs">
					<div class="form__input">
						<InputText id="recover-password-email" v-model="formData.email" :errors="v$.formData.$errors" label="E-mail" type="email" placeholder="Введите почту"/>
					</div>
				</div>
				<div class="form__bottom">
					<p class="form__policy form__policy--grey">
						Нажимая кнопку «Отправить», Вы&nbsp;<a :href="getLegalDocs.processingPersonal" target="_blank">соглашаетесь</a> с&nbsp;условиями <a :href="getLegalDocs.privacyPolicy" target="_blank">политики обработки персональных данных</a>.
					</p>
					<div class="form__submit form__submit--rtl">
						<button class="btn btn--color-secondary" type="submit" :disabled="(v$.$error && v$.$dirty) || isAppLoading">
							<span class="btn__text">Отправить</span>
						</button>
					</div>
				</div>
			</form>

			<NotionModal id="recovery-password-notion" title="Проверьте электронную почту" text="На вашу почту была отправлена ссылка для восстановления пароля. Перейдите по ней, чтобы восстановить пароль." @close="close"/>

		</section>
	</BaseModal>
</template>

<style scoped lang="sass">

</style>
